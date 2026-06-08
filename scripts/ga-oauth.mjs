#!/usr/bin/env node
// Obține un refresh token OAuth pentru GA4 Data API, folosind contul Google
// care are deja acces în GA4. Workaround pentru bug-ul Google care blochează
// adăugarea service account-urilor noi în GA4 (apr. 2026).
//
// Folosire:
//   node scripts/ga-oauth.mjs [cale/catre/client_secret.json]
// Dacă nu dai calea, caută automat cel mai nou client_secret*.json din ~/Downloads.
//
// Scrie GA_OAUTH_CLIENT_ID / GA_OAUTH_CLIENT_SECRET / GA_OAUTH_REFRESH_TOKEN în .env.local.

import http from 'node:http';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { OAuth2Client } from 'google-auth-library';

const SCOPES = [
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/webmasters.readonly',
];
const ENV_PATH = '.env.local';

// ── 1. Găsește JSON-ul de OAuth client ────────────────────────────────────
function findClientJson() {
  const arg = process.argv[2];
  if (arg) return arg;
  const dl = join(homedir(), 'Downloads');
  const candidates = existsSync(dl)
    ? readdirSync(dl)
        .filter(f => f.startsWith('client_secret') && f.endsWith('.json'))
        .map(f => join(dl, f))
    : [];
  if (candidates.length === 0) {
    console.error(
      '❌ Nu am găsit niciun client_secret*.json în ~/Downloads.\n' +
        '   Creează un OAuth Client ID (tip: Desktop app), descarcă JSON-ul,\n' +
        '   apoi rulează din nou (sau dă calea ca argument).',
    );
    process.exit(1);
  }
  return candidates[0];
}

const jsonPath = findClientJson();
const raw = JSON.parse(readFileSync(jsonPath, 'utf8'));
const cfg = raw.installed || raw.web;
if (!cfg?.client_id || !cfg?.client_secret) {
  console.error('❌ JSON invalid — lipsește installed/web cu client_id & client_secret.');
  process.exit(1);
}
console.log('• Folosesc OAuth client din:', jsonPath);

// ── 2. Server local de loopback ───────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost`);
  const code = url.searchParams.get('code');
  const err = url.searchParams.get('error');
  if (err) {
    res.end('Autorizare refuzată: ' + err + '. Poți închide fila.');
    console.error('❌ Autorizare refuzată:', err);
    server.close();
    process.exit(1);
  }
  if (!code) {
    res.statusCode = 400;
    res.end('Lipsește code.');
    return;
  }
  try {
    const { tokens } = await oauth.getToken(code);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h2>✅ Gata! Poți închide fila și revii în terminal.</h2>');
    if (!tokens.refresh_token) {
      console.error(
        '\n❌ Nu am primit refresh_token. Cauză frecventă: ai mai autorizat o dată.\n' +
          '   Revocă accesul la https://myaccount.google.com/permissions și rulează iar.',
      );
      server.close();
      process.exit(1);
    }
    writeEnv(cfg.client_id, cfg.client_secret, tokens.refresh_token);
    console.log('\n✅ Refresh token obținut și scris în', ENV_PATH);
    console.log('   GA_OAUTH_CLIENT_ID, GA_OAUTH_CLIENT_SECRET, GA_OAUTH_REFRESH_TOKEN ✓');
    console.log('\nPune aceleași 3 variabile și pe Vercel pentru producție.');
    server.close();
    process.exit(0);
  } catch (e) {
    console.error('❌ Eroare la schimbul de token:', e.message);
    res.statusCode = 500;
    res.end('Eroare: ' + e.message);
    server.close();
    process.exit(1);
  }
});

function writeEnv(clientId, clientSecret, refreshToken) {
  let env = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, 'utf8') : '';
  const set = (key, val) => {
    const line = `${key}=${val}`;
    const re = new RegExp(`^${key}=.*$`, 'm');
    env = re.test(env) ? env.replace(re, line) : env.replace(/\n*$/, '\n') + line + '\n';
  };
  set('GA_OAUTH_CLIENT_ID', clientId);
  set('GA_OAUTH_CLIENT_SECRET', clientSecret);
  set('GA_OAUTH_REFRESH_TOKEN', refreshToken);
  writeFileSync(ENV_PATH, env);
}

// ── 3. Pornește flow-ul ───────────────────────────────────────────────────
let oauth;
server.listen(0, '127.0.0.1', () => {
  const port = server.address().port;
  const redirectUri = `http://localhost:${port}`;
  oauth = new OAuth2Client(cfg.client_id, cfg.client_secret, redirectUri);
  const authUrl = oauth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
  });
  console.log('\n🔑 Deschide acest link în browser și autorizează cu contul care are acces în GA4:\n');
  console.log(authUrl + '\n');
  // încearcă să-l deschidă automat
  spawn('xdg-open', [authUrl], { stdio: 'ignore', detached: true }).on('error', () => {});
});
