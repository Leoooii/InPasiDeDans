import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAnalyticsClient, getPropertyId, isGaConfigured } from '@/lib/ga';

// GA4 Data API e Node-only (gRPC). Forțăm runtime Node, nu Edge.
export const runtime = 'nodejs';
// Mereu proaspăt — sunt date de raportare, nu cache static.
export const dynamic = 'force-dynamic';

const BodySchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  // Paginile selectate pentru overlay; gol => folosim top 5 din perioadă.
  pagePaths: z.array(z.string().max(300)).max(12).optional().default([]),
});

// ─── Helpers ──────────────────────────────────────────────────────────────

/** 'YYYYMMDD' (cum întoarce GA) → 'YYYY-MM-DD'. */
function fmtDate(d: string): string {
  return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
}

/** Fereastra precedentă, de aceeași lungime, imediat înainte de [start, end]. */
function previousRange(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);
  const days = Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;
  const prevEnd = new Date(start.getTime() - 86_400_000);
  const prevStart = new Date(prevEnd.getTime() - (days - 1) * 86_400_000);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  return { startDate: iso(prevStart), endDate: iso(prevEnd) };
}

function deltaPct(curr: number, prev: number): number | null {
  if (prev === 0) return curr === 0 ? 0 : null; // null => "nou", fără bază de comparație
  return Math.round(((curr - prev) / prev) * 1000) / 10;
}

// ─── Handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Pază simplă cu token secret (server-only, nu ajunge în bundle).
  const token = req.headers.get('x-analytics-token');
  if (!process.env.ANALYTICS_API_SECRET || token !== process.env.ANALYTICS_API_SECRET) {
    return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });
  }

  if (!isGaConfigured()) {
    // Raportăm care env-uri lipsesc la runtime (doar nume, fără valori).
    const missing = [
      'GA_PROPERTY_ID',
      'GA_OAUTH_CLIENT_ID',
      'GA_OAUTH_CLIENT_SECRET',
      'GA_OAUTH_REFRESH_TOKEN',
    ].filter(k => !process.env[k]);
    return NextResponse.json(
      { error: 'GA4 nu este configurat (lipsesc env-urile GA_*).', setup: true, missing },
      { status: 503 },
    );
  }

  let body: z.infer<typeof BodySchema>;
  try {
    body = BodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: 'Parametri invalizi' }, { status: 400 });
  }

  const { startDate, endDate, pagePaths } = body;
  const property = `properties/${getPropertyId()}`;
  const client = getAnalyticsClient();
  const prev = previousRange(startDate, endDate);

  try {
    // 1) Sumar perioadă curentă + precedentă (pentru trend %).
    const summaryMetrics = [
      { name: 'screenPageViews' },
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'averageSessionDuration' },
    ];
    const [summaryResp] = await client.runReport({
      property,
      dateRanges: [
        { startDate, endDate, name: 'curr' },
        { startDate: prev.startDate, endDate: prev.endDate, name: 'prev' },
      ],
      metrics: summaryMetrics,
    });

    // Cu 2 dateRanges, GA întoarce câte un rând per range, marcat de dimensiunea 'dateRange'.
    const sumFor = (rangeName: string) => {
      const row = summaryResp.rows?.find(r =>
        r.dimensionValues?.some(d => d.value === rangeName),
      );
      const v = (i: number) => Number(row?.metricValues?.[i]?.value ?? 0);
      return { views: v(0), users: v(1), sessions: v(2), avgDuration: v(3) };
    };
    const curr = sumFor('curr');
    const prv = sumFor('prev');
    const summary = {
      views: curr.views,
      users: curr.users,
      sessions: curr.sessions,
      avgDuration: curr.avgDuration,
      delta: {
        views: deltaPct(curr.views, prv.views),
        users: deltaPct(curr.users, prv.users),
        sessions: deltaPct(curr.sessions, prv.sessions),
      },
    };

    // 2) Top pagini.
    const [topResp] = await client.runReport({
      property,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 25,
    });
    const topPages = (topResp.rows ?? []).map(r => ({
      path: r.dimensionValues?.[0]?.value ?? '',
      title: r.dimensionValues?.[1]?.value ?? '',
      views: Number(r.metricValues?.[0]?.value ?? 0),
      users: Number(r.metricValues?.[1]?.value ?? 0),
    }));

    // 3) Surse de trafic (canale).
    const [srcResp] = await client.runReport({
      property,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 12,
    });
    const sources = (srcResp.rows ?? []).map(r => ({
      channel: r.dimensionValues?.[0]?.value || '(necunoscut)',
      sessions: Number(r.metricValues?.[0]?.value ?? 0),
      users: Number(r.metricValues?.[1]?.value ?? 0),
    }));

    // 4) Serie temporală pentru overlay. Dacă nu s-au ales pagini, luăm top 5.
    const selected =
      pagePaths.length > 0 ? pagePaths : topPages.slice(0, 5).map(p => p.path);

    let series: { dates: string[]; pages: { path: string; title: string; points: number[] }[] } = {
      dates: [],
      pages: [],
    };

    if (selected.length > 0) {
      const [tsResp] = await client.runReport({
        property,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'date' }, { name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            inListFilter: { values: selected },
          },
        },
        orderBys: [{ dimension: { dimensionName: 'date' } }],
        limit: 100_000,
      });

      const dateSet = new Set<string>();
      // path -> (date -> views)
      const byPath = new Map<string, Map<string, number>>();
      for (const r of tsResp.rows ?? []) {
        const date = fmtDate(r.dimensionValues?.[0]?.value ?? '');
        const path = r.dimensionValues?.[1]?.value ?? '';
        const views = Number(r.metricValues?.[0]?.value ?? 0);
        dateSet.add(date);
        if (!byPath.has(path)) byPath.set(path, new Map());
        byPath.get(path)!.set(date, views);
      }
      const dates = [...dateSet].sort();
      const titleOf = (p: string) =>
        topPages.find(tp => tp.path === p)?.title ?? p;
      const pages = selected.map(path => ({
        path,
        title: titleOf(path),
        points: dates.map(d => byPath.get(path)?.get(d) ?? 0),
      }));
      series = { dates, pages };
    }

    return NextResponse.json({ summary, topPages, sources, series });
  } catch (err) {
    console.error('[analytics] GA4 report error:', err);
    return NextResponse.json(
      { error: 'Eroare la interogarea GA4. Verifică accesul service account-ului.' },
      { status: 500 },
    );
  }
}
