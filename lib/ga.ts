import 'server-only';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { OAuth2Client } from 'google-auth-library';

/**
 * Client GA4 Data API — STRICT server-side (nu se importă niciodată în client).
 *
 * Două moduri de autentificare (în ordinea preferinței):
 *
 *  1. OAuth user (RECOMANDAT momentan) — folosim contul Google care are deja
 *     acces în GA4. Necesar fiindcă Google are un bug (din apr. 2026) care
 *     blochează adăugarea service account-urilor noi în GA4.
 *       GA_OAUTH_CLIENT_ID, GA_OAUTH_CLIENT_SECRET, GA_OAUTH_REFRESH_TOKEN
 *     Refresh token-ul se obține o singură dată cu `node scripts/ga-oauth.mjs`.
 *
 *  2. Service account (fallback, când Google repară bug-ul) —
 *       GA_CLIENT_EMAIL, GA_PRIVATE_KEY (cu \n literal)
 *     Service account-ul trebuie adăugat ca Viewer în GA4 → Property Access.
 *
 * În ambele cazuri:
 *   GA_PROPERTY_ID — ID-ul NUMERIC al proprietății GA4 (Admin → Property Settings),
 *                    NU measurement ID-ul "G-...".
 */

let cached: BetaAnalyticsDataClient | null = null;

export function getAnalyticsClient(): BetaAnalyticsDataClient {
  if (cached) return cached;

  const {
    GA_OAUTH_CLIENT_ID,
    GA_OAUTH_CLIENT_SECRET,
    GA_OAUTH_REFRESH_TOKEN,
    GA_CLIENT_EMAIL,
    GA_PRIVATE_KEY,
  } = process.env;

  if (GA_OAUTH_CLIENT_ID && GA_OAUTH_CLIENT_SECRET && GA_OAUTH_REFRESH_TOKEN) {
    const oauth = new OAuth2Client(GA_OAUTH_CLIENT_ID, GA_OAUTH_CLIENT_SECRET);
    oauth.setCredentials({ refresh_token: GA_OAUTH_REFRESH_TOKEN });
    // authClient acceptă orice AuthClient la runtime; cast pentru skew-ul de
    // versiune între google-auth-library (al nostru) și cel bundle-uit în gax.
    cached = new BetaAnalyticsDataClient({
      authClient: oauth,
    } as unknown as ConstructorParameters<typeof BetaAnalyticsDataClient>[0]);
    return cached;
  }

  if (GA_CLIENT_EMAIL && GA_PRIVATE_KEY) {
    cached = new BetaAnalyticsDataClient({
      credentials: {
        client_email: GA_CLIENT_EMAIL,
        private_key: GA_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    });
    return cached;
  }

  throw new Error(
    'GA4 neconfigurat — lipsesc fie credențialele OAuth (GA_OAUTH_*), fie service account (GA_CLIENT_EMAIL/GA_PRIVATE_KEY).',
  );
}

export function getPropertyId(): string {
  const id = process.env.GA_PROPERTY_ID;
  if (!id) throw new Error('GA_PROPERTY_ID lipsește (ID numeric al proprietății GA4).');
  return id;
}

/** True dacă există un set complet de credențiale (OAuth sau SA) + property id. */
export function isGaConfigured(): boolean {
  const hasOAuth = Boolean(
    process.env.GA_OAUTH_CLIENT_ID &&
      process.env.GA_OAUTH_CLIENT_SECRET &&
      process.env.GA_OAUTH_REFRESH_TOKEN,
  );
  const hasSA = Boolean(process.env.GA_CLIENT_EMAIL && process.env.GA_PRIVATE_KEY);
  return Boolean(process.env.GA_PROPERTY_ID && (hasOAuth || hasSA));
}
