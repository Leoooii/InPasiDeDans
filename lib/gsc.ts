import 'server-only';
import { OAuth2Client } from 'google-auth-library';

/**
 * Google Search Console (Search Analytics API) — server-only.
 * Refoloseste acelasi OAuth user ca GA4 (GA_OAUTH_*). Contul trebuie sa fie
 * user pe proprietatea GSC (vezi GSC_SITE_URL).
 */

const SITE = process.env.GSC_SITE_URL || 'sc-domain:inpasidedans.ro';

type GscRow = { keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number };

function oauthClient(): OAuth2Client {
  const { GA_OAUTH_CLIENT_ID, GA_OAUTH_CLIENT_SECRET, GA_OAUTH_REFRESH_TOKEN } = process.env;
  if (!GA_OAUTH_CLIENT_ID || !GA_OAUTH_CLIENT_SECRET || !GA_OAUTH_REFRESH_TOKEN) {
    throw new Error('OAuth neconfigurat pentru Search Console.');
  }
  const c = new OAuth2Client(GA_OAUTH_CLIENT_ID, GA_OAUTH_CLIENT_SECRET);
  c.setCredentials({ refresh_token: GA_OAUTH_REFRESH_TOKEN });
  return c;
}

async function runQuery(token: string, body: Record<string, unknown>): Promise<{ rows?: GscRow[] }> {
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GSC ${res.status}: ${txt.slice(0, 200)}`);
  }
  return res.json();
}

const r1 = (n?: number) => Math.round((n ?? 0) * 10) / 10;
const pctCtr = (n?: number) => Math.round((n ?? 0) * 1000) / 10;

export type SearchConsoleData = {
  totals: { clicks: number; impressions: number; ctr: number; position: number };
  queries: { query: string; clicks: number; impressions: number; ctr: number; position: number }[];
  pages: { page: string; clicks: number; impressions: number; position: number }[];
};

export async function getSearchConsole(startDate: string, endDate: string): Promise<SearchConsoleData> {
  const client = oauthClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error('Nu am putut obtine access token pentru GSC.');

  const [totalsR, queriesR, pagesR] = await Promise.all([
    runQuery(token, { startDate, endDate }),
    runQuery(token, { startDate, endDate, dimensions: ['query'], rowLimit: 25 }),
    runQuery(token, { startDate, endDate, dimensions: ['page'], rowLimit: 15 }),
  ]);

  const t = totalsR.rows?.[0];
  return {
    totals: {
      clicks: Math.round(t?.clicks ?? 0),
      impressions: Math.round(t?.impressions ?? 0),
      ctr: pctCtr(t?.ctr),
      position: r1(t?.position),
    },
    queries: (queriesR.rows ?? []).map(row => ({
      query: row.keys?.[0] ?? '',
      clicks: Math.round(row.clicks ?? 0),
      impressions: Math.round(row.impressions ?? 0),
      ctr: pctCtr(row.ctr),
      position: r1(row.position),
    })),
    pages: (pagesR.rows ?? []).map(row => ({
      page: row.keys?.[0] ?? '',
      clicks: Math.round(row.clicks ?? 0),
      impressions: Math.round(row.impressions ?? 0),
      position: r1(row.position),
    })),
  };
}
