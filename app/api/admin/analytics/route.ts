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

// Evenimente cu intenție reală (excludem page_view/scroll/etc.). Ordinea = prioritate afișare.
const CONVERSION_EVENTS = [
  'generate_lead',
  'form_start',
  'click_phone',
  'click_email',
  'click_directions',
  'click',
];

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

/** Grupează host-urile fragmentate (facebook, instagram, ...) într-o etichetă curată. */
function prettySource(sourceMedium: string): string {
  const s = sourceMedium.toLowerCase();
  if (s.includes('facebook') || s.includes('fb.')) return 'Facebook';
  if (s.includes('instagram') || s.includes('ig.')) return 'Instagram';
  if (s.includes('tiktok')) return 'TikTok';
  if (s.includes('youtube')) return 'YouTube';
  if (s.includes('chatgpt') || s.includes('openai')) return 'ChatGPT';
  if (s.startsWith('google / organic') || s.startsWith('google / trafic')) return 'Google (organic)';
  if (s.startsWith('google / cpc')) return 'Google Ads';
  if (s.startsWith('bing')) return 'Bing';
  if (s.startsWith('(direct)')) return 'Direct';
  return sourceMedium;
}

// ─── Handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Pază simplă cu token secret (server-only, nu ajunge în bundle).
  const token = req.headers.get('x-analytics-token');
  if (!process.env.ANALYTICS_API_SECRET || token !== process.env.ANALYTICS_API_SECRET) {
    return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });
  }

  if (!isGaConfigured()) {
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
  const curr = [{ startDate, endDate }];

  const num = (s?: string | null) => Number(s ?? 0);

  try {
    // Toate rapoartele rulează în paralel.
    const [
      summaryResp,
      topResp,
      prevPagesResp,
      srcResp,
      srcMediumResp,
      geoResp,
      deviceResp,
      landingResp,
      eventsResp,
      leadsBySourceResp,
    ] = await Promise.all([
      // 0) Sumar curent + precedent (trend).
      client.runReport({
        property,
        dateRanges: [
          { startDate, endDate, name: 'curr' },
          { startDate: prev.startDate, endDate: prev.endDate, name: 'prev' },
        ],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'averageSessionDuration' },
        ],
      }),
      // 1) Top pagini + engagement.
      client.runReport({
        property,
        dateRanges: curr,
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }, { name: 'engagementRate' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 25,
      }),
      // 2) Afișări pagini perioada precedentă (pentru delta per pagină).
      client.runReport({
        property,
        dateRanges: [{ startDate: prev.startDate, endDate: prev.endDate }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        limit: 500,
      }),
      // 3) Canale (high-level).
      client.runReport({
        property,
        dateRanges: curr,
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 12,
      }),
      // 4) Source / medium (detaliat).
      client.runReport({
        property,
        dateRanges: curr,
        dimensions: [{ name: 'sessionSourceMedium' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 25,
      }),
      // 5) Geografie (orașe).
      client.runReport({
        property,
        dateRanges: curr,
        dimensions: [{ name: 'city' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 12,
      }),
      // 6) Dispozitive.
      client.runReport({
        property,
        dateRanges: curr,
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 5,
      }),
      // 7) Landing pages.
      client.runReport({
        property,
        dateRanges: curr,
        dimensions: [{ name: 'landingPage' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),
      // 8) Conversii / interacțiuni cheie.
      client.runReport({
        property,
        dateRanges: curr,
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: { fieldName: 'eventName', inListFilter: { values: CONVERSION_EVENTS } },
        },
        limit: 20,
      }),
      // 9) Lead-uri (generate_lead) pe canal — ce sursă aduce clienți, nu doar vizite.
      client.runReport({
        property,
        dateRanges: curr,
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: { fieldName: 'eventName', stringFilter: { value: 'generate_lead' } },
        },
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
        limit: 12,
      }),
    ]);

    // ── Sumar ───────────────────────────────────────────────────────────────
    const sumFor = (rangeName: string) => {
      const row = summaryResp[0].rows?.find(r =>
        r.dimensionValues?.some(d => d.value === rangeName),
      );
      const v = (i: number) => num(row?.metricValues?.[i]?.value);
      return { views: v(0), users: v(1), sessions: v(2), avgDuration: v(3) };
    };
    const c = sumFor('curr');
    const p = sumFor('prev');
    const summary = {
      views: c.views,
      users: c.users,
      sessions: c.sessions,
      avgDuration: c.avgDuration,
      delta: {
        views: deltaPct(c.views, p.views),
        users: deltaPct(c.users, p.users),
        sessions: deltaPct(c.sessions, p.sessions),
      },
    };

    // ── Top pagini (+ delta vs perioada precedentă) ──────────────────────────
    const prevViews = new Map<string, number>();
    for (const r of prevPagesResp[0].rows ?? []) {
      prevViews.set(r.dimensionValues?.[0]?.value ?? '', num(r.metricValues?.[0]?.value));
    }
    const topPages = (topResp[0].rows ?? []).map(r => {
      const path = r.dimensionValues?.[0]?.value ?? '';
      const views = num(r.metricValues?.[0]?.value);
      return {
        path,
        title: r.dimensionValues?.[1]?.value ?? '',
        views,
        users: num(r.metricValues?.[1]?.value),
        engagementRate: num(r.metricValues?.[2]?.value), // 0..1
        delta: deltaPct(views, prevViews.get(path) ?? 0),
      };
    });

    // ── Surse ────────────────────────────────────────────────────────────────
    const sources = (srcResp[0].rows ?? []).map(r => ({
      channel: r.dimensionValues?.[0]?.value || '(necunoscut)',
      sessions: num(r.metricValues?.[0]?.value),
      users: num(r.metricValues?.[1]?.value),
    }));

    // Source/medium grupat pe etichete curate (Facebook, Google organic, ...).
    const smMap = new Map<string, number>();
    for (const r of srcMediumResp[0].rows ?? []) {
      const label = prettySource(r.dimensionValues?.[0]?.value ?? '');
      smMap.set(label, (smMap.get(label) ?? 0) + num(r.metricValues?.[0]?.value));
    }
    const sourceMedium = [...smMap.entries()]
      .map(([label, sessions]) => ({ label, sessions }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 10);

    // ── Geografie ──────────────────────────────────────────────────────────
    const geography = (geoResp[0].rows ?? [])
      .map(r => ({
        city: r.dimensionValues?.[0]?.value || '(necunoscut)',
        users: num(r.metricValues?.[0]?.value),
      }))
      .filter(g => g.city !== '(not set)')
      .slice(0, 8);

    // ── Dispozitive ──────────────────────────────────────────────────────────
    const devices = (deviceResp[0].rows ?? []).map(r => ({
      category: r.dimensionValues?.[0]?.value || 'necunoscut',
      users: num(r.metricValues?.[0]?.value),
    }));

    // ── Landing pages ────────────────────────────────────────────────────────
    const landingPages = (landingResp[0].rows ?? [])
      .map(r => ({
        path: r.dimensionValues?.[0]?.value || '(n/a)',
        sessions: num(r.metricValues?.[0]?.value),
      }))
      .slice(0, 8);

    // ── Conversii ────────────────────────────────────────────────────────────
    const evMap = new Map<string, number>();
    for (const r of eventsResp[0].rows ?? []) {
      evMap.set(r.dimensionValues?.[0]?.value ?? '', num(r.metricValues?.[0]?.value));
    }
    const conversions = CONVERSION_EVENTS.map(name => ({
      name,
      count: evMap.get(name) ?? 0,
    })).filter(e => e.count > 0);
    const leads = evMap.get('generate_lead') ?? 0;
    const leadRate = summary.sessions > 0
      ? Math.round((leads / summary.sessions) * 1000) / 10
      : 0;

    // ── Lead-uri pe canal ────────────────────────────────────────────────────
    const leadsBySource = (leadsBySourceResp[0].rows ?? [])
      .map(r => ({
        channel: r.dimensionValues?.[0]?.value || '(necunoscut)',
        leads: num(r.metricValues?.[0]?.value),
      }))
      .filter(x => x.leads > 0);

    // ── Serie temporală pentru overlay ───────────────────────────────────────
    const selected =
      pagePaths.length > 0 ? pagePaths : topPages.slice(0, 5).map(pg => pg.path);
    let series: { dates: string[]; pages: { path: string; title: string; points: number[] }[] } = {
      dates: [],
      pages: [],
    };
    if (selected.length > 0) {
      const [tsResp] = await client.runReport({
        property,
        dateRanges: curr,
        dimensions: [{ name: 'date' }, { name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        dimensionFilter: {
          filter: { fieldName: 'pagePath', inListFilter: { values: selected } },
        },
        orderBys: [{ dimension: { dimensionName: 'date' } }],
        limit: 100_000,
      });
      const dateSet = new Set<string>();
      const byPath = new Map<string, Map<string, number>>();
      for (const r of tsResp.rows ?? []) {
        const date = fmtDate(r.dimensionValues?.[0]?.value ?? '');
        const path = r.dimensionValues?.[1]?.value ?? '';
        dateSet.add(date);
        if (!byPath.has(path)) byPath.set(path, new Map());
        byPath.get(path)!.set(date, num(r.metricValues?.[0]?.value));
      }
      const dates = [...dateSet].sort();
      const titleOf = (pt: string) => topPages.find(tp => tp.path === pt)?.title ?? pt;
      series = {
        dates,
        pages: selected.map(path => ({
          path,
          title: titleOf(path),
          points: dates.map(d => byPath.get(path)?.get(d) ?? 0),
        })),
      };
    }

    // ── Sugestii automate (reguli, fără AI) ──────────────────────────────────
    const suggestions = buildSuggestions({
      summary,
      topPages,
      devices,
      geography,
      leads,
      leadRate,
    });

    return NextResponse.json({
      summary,
      topPages,
      sources,
      sourceMedium,
      geography,
      devices,
      landingPages,
      conversions,
      leadRate,
      leadsBySource,
      suggestions,
      series,
    });
  } catch (err) {
    console.error('[analytics] GA4 report error:', err);
    return NextResponse.json(
      { error: 'Eroare la interogarea GA4. Verifică accesul service account-ului.' },
      { status: 500 },
    );
  }
}

// ─── Sugestii ────────────────────────────────────────────────────────────────

type Sev = 'good' | 'warn' | 'info';
type Suggestion = { severity: Sev; text: string };

function buildSuggestions(d: {
  summary: { users: number; sessions: number; delta: { users: number | null } };
  topPages: { path: string; views: number; engagementRate: number; delta: number | null }[];
  devices: { category: string; users: number }[];
  geography: { city: string; users: number }[];
  leads: number;
  leadRate: number;
}): Suggestion[] {
  const out: Suggestion[] = [];

  // 1) Trend utilizatori.
  const du = d.summary.delta.users;
  if (du !== null && du <= -10) {
    out.push({ severity: 'warn', text: `Utilizatori în scădere cu ${Math.abs(du)}% față de perioada precedentă — verifică ce s-a schimbat (sezon, reclame oprite, poziții Google).` });
  } else if (du !== null && du >= 10) {
    out.push({ severity: 'good', text: `Trafic în creștere cu ${du}% față de perioada precedentă. 🎉` });
  }

  // 2) Cea mai mare scădere/creștere de pagină (printre paginile cu trafic relevant).
  const movers = d.topPages.filter(p => p.views >= 40 && p.delta !== null);
  const drop = [...movers].sort((a, b) => (a.delta! - b.delta!))[0];
  if (drop && drop.delta! <= -25) {
    out.push({ severity: 'warn', text: `Pagina ${drop.path} a scăzut ${Math.abs(drop.delta!)}% — merită o privire (conținut vechi, link rupt, sezon).` });
  }
  const rise = [...movers].sort((a, b) => (b.delta! - a.delta!))[0];
  if (rise && rise.delta! >= 40) {
    out.push({ severity: 'good', text: `Pagina ${rise.path} a crescut ${rise.delta!}% — vezi de ce și replică (subiect, promovare).` });
  }

  // 3) Pagină cu trafic mare dar engagement mic.
  const lowEng = d.topPages
    .slice(0, 8)
    .filter(p => p.views >= 80 && p.engagementRate > 0 && p.engagementRate < 0.45)
    .sort((a, b) => b.views - a.views)[0];
  if (lowEng) {
    out.push({ severity: 'warn', text: `${lowEng.path} are trafic mare dar engagement mic (${Math.round(lowEng.engagementRate * 100)}%) — vizitatorii pleacă repede. Verifică viteză, claritate, call-to-action.` });
  }

  // 4) Pondere mobil.
  const totalDev = d.devices.reduce((s, x) => s + x.users, 0);
  const mobile = d.devices.find(x => x.category === 'mobile')?.users ?? 0;
  if (totalDev > 0) {
    const pct = Math.round((mobile / totalDev) * 100);
    if (pct >= 60) {
      out.push({ severity: 'info', text: `${pct}% din vizitatori sunt pe telefon — prioritizează viteza și layout-ul mobil (butoane mari, formular scurt).` });
    }
  }

  // 5) Rată de lead-uri.
  if (d.summary.sessions >= 50) {
    if (d.leadRate < 1) {
      out.push({ severity: 'warn', text: `Rată de lead-uri mică: ${d.leadRate}% (${d.leads} lead-uri din ${d.summary.sessions} sesiuni). Adaugă call-to-action vizibile și un formular mai scurt.` });
    } else {
      out.push({ severity: 'good', text: `Rată de lead-uri: ${d.leadRate}% (${d.leads} lead-uri). Bun punct de plecare — testează CTA-uri pe paginile cu trafic mare.` });
    }
  }

  // 6) Concentrare geografică.
  const totalGeo = d.geography.reduce((s, x) => s + x.users, 0);
  const topCity = d.geography[0];
  if (topCity && totalGeo > 0) {
    const pct = Math.round((topCity.users / totalGeo) * 100);
    out.push({ severity: 'info', text: `Cei mai mulți vizitatori sunt din ${topCity.city} (${pct}%) — targetează reclamele acolo și menționează zona în conținut.` });
  }

  // Ordonăm: warn → good → info; maxim 6.
  const order: Record<Sev, number> = { warn: 0, good: 1, info: 2 };
  return out.sort((a, b) => order[a.severity] - order[b.severity]).slice(0, 6);
}
