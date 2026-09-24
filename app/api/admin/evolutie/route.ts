import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { getAnalyticsClient, getPropertyId, isGaConfigured } from '@/lib/ga';
import { getSearchConsole } from '@/lib/gsc';

export const dynamic = 'force-dynamic';

// Optimizarea SEO/AI a început pe 2026-09-24. Comparăm același număr de zile
// înainte și după. Afișările de pagină NU se compară: până atunci GA4 număra
// fiecare pagină de două ori (gtag în cod + GTM), deci ar părea o scădere falsă.
const REFERINTA = '2026-09-24';
const SURSE_AI = 'chatgpt|openai|perplexity|gemini|bard|copilot|claude|anthropic|deepseek|you\\.com';
const ZI = 86_400_000;

const iso = (d: Date) => d.toISOString().slice(0, 10);
const plus = (dataIso: string, zile: number) => iso(new Date(new Date(`${dataIso}T00:00:00Z`).getTime() + zile * ZI));

function intervale() {
  const dupaStart = plus(REFERINTA, 1);
  // GA4 are date complete până ieri; Search Console întârzie ~3 zile.
  const gaFinal = iso(new Date(Date.now() - ZI));
  const gscFinal = iso(new Date(Date.now() - 3 * ZI));
  const zile = (final: string) =>
    Math.min(90, Math.floor((new Date(`${final}T00:00:00Z`).getTime() - new Date(`${dupaStart}T00:00:00Z`).getTime()) / ZI) + 1);
  const pereche = (final: string) => {
    const n = zile(final);
    if (n < 1) return null;
    return {
      zile: n,
      inainte: { startDate: plus(REFERINTA, -(n - 1)), endDate: REFERINTA },
      dupa: { startDate: dupaStart, endDate: plus(dupaStart, n - 1) },
    };
  };
  return { ga: pereche(gaFinal), gsc: pereche(gscFinal) };
}

type Perioade = NonNullable<ReturnType<typeof intervale>['ga']>;

async function metriciGa(p: Perioade) {
  const client = getAnalyticsClient();
  const property = `properties/${getPropertyId()}`;
  const dateRanges = [
    { ...p.inainte, name: 'inainte' },
    { ...p.dupa, name: 'dupa' },
  ];
  const valori = (resp: any, i: number) => {
    const out = { inainte: 0, dupa: 0 };
    for (const r of resp.rows ?? []) {
      const nume = r.dimensionValues?.at(-1)?.value as 'inainte' | 'dupa';
      if (nume in out) out[nume] += Number(r.metricValues?.[i]?.value ?? 0);
    }
    return out;
  };

  const [total, organic, ai, lead] = await Promise.all([
    client.runReport({ property, dateRanges, metrics: [{ name: 'totalUsers' }, { name: 'sessions' }] }),
    client.runReport({
      property,
      dateRanges,
      metrics: [{ name: 'sessions' }],
      dimensionFilter: { filter: { fieldName: 'sessionDefaultChannelGroup', stringFilter: { value: 'Organic Search' } } },
    }),
    client.runReport({
      property,
      dateRanges,
      metrics: [{ name: 'sessions' }],
      dimensionFilter: {
        filter: { fieldName: 'sessionSource', stringFilter: { matchType: 'PARTIAL_REGEXP', value: SURSE_AI, caseSensitive: false } },
      },
    }),
    client.runReport({
      property,
      dateRanges,
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { value: 'generate_lead' } } },
    }),
  ]);

  return {
    utilizatori: valori(total[0], 0),
    sesiuni: valori(total[0], 1),
    sesiuniOrganice: valori(organic[0], 0),
    sesiuniAi: valori(ai[0], 0),
    leaduri: valori(lead[0], 0),
  };
}

async function metriciGsc(p: Perioade) {
  const [inainte, dupa] = await Promise.all([
    getSearchConsole(p.inainte.startDate, p.inainte.endDate),
    getSearchConsole(p.dupa.startDate, p.dupa.endDate),
  ]);
  const t = (k: keyof typeof inainte.totals) => ({ inainte: inainte.totals[k], dupa: dupa.totals[k] });
  return { clicuri: t('clicks'), afisari: t('impressions'), ctr: t('ctr'), pozitie: t('position') };
}

const construieste = async () => {
  const { ga, gsc } = intervale();
  const [dinGa, dinGsc] = await Promise.all([
    ga && isGaConfigured() ? metriciGa(ga) : null,
    gsc ? metriciGsc(gsc).catch(e => { console.error('[evolutie] GSC:', e); return null; }) : null,
  ]);
  return { referinta: REFERINTA, ga: ga && dinGa ? { ...ga, metrici: dinGa } : null, gsc: gsc && dinGsc ? { ...gsc, metrici: dinGsc } : null };
};

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-analytics-token');
  if (!process.env.ANALYTICS_API_SECRET || token !== process.env.ANALYTICS_API_SECRET) {
    return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });
  }
  try {
    // Datele zilei se schimbă rar; cheia include data, deci se reface zilnic.
    const rezultat = await unstable_cache(construieste, ['evolutie', REFERINTA, iso(new Date())], { revalidate: 21600 })();
    return NextResponse.json(rezultat);
  } catch (err) {
    console.error('[evolutie] eroare:', err);
    return NextResponse.json({ error: 'Nu am putut calcula evoluția.' }, { status: 500 });
  }
}
