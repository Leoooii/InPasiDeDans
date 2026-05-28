#!/usr/bin/env node
// Backfill slug-uri pe colectia `evenimente` din Firestore.
// Ruleaza automat dupa `next build` (vezi `postbuild` in package.json).
// Idempotent: documentele care au deja slug sunt omise.

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { readFileSync, existsSync } from 'node:fs';

// Pe Vercel env vars sunt deja in process.env. Local citim din .env.local / .env.
function loadEnvFile(path) {
  if (!existsSync(path)) return;
  const content = readFileSync(path, 'utf8');
  for (const raw of content.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvFile('.env.local');
loadEnvFile('.env');

const DIACRITICS = {
  'ă': 'a', 'â': 'a', 'Ă': 'a', 'Â': 'a',
  'î': 'i', 'Î': 'i',
  'ș': 's', 'ş': 's', 'Ș': 's', 'Ş': 's',
  'ț': 't', 'ţ': 't', 'Ț': 't', 'Ţ': 't',
};

function slugify(input) {
  if (!input) return '';
  return input
    .split('').map(c => DIACRITICS[c] ?? c).join('')
    .normalize('NFD').replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 80);
}

async function main() {
  const cfg = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if (!cfg.projectId || !cfg.apiKey) {
    console.warn('[migrate-slugs] Lipsesc env vars Firebase — skip.');
    return;
  }

  const app = initializeApp(cfg);
  const db = getFirestore(app);

  const snap = await getDocs(collection(db, 'evenimente'));
  const existing = new Set();
  snap.docs.forEach(d => { const s = d.data().slug; if (s) existing.add(s); });

  let migrated = 0;
  for (const d of snap.docs) {
    const data = d.data();
    if (data.slug) continue;

    const base = slugify(data.title || '') || `noutate-${d.id.slice(0, 6).toLowerCase()}`;
    let cand = base, i = 2;
    while (existing.has(cand)) { cand = `${base}-${i}`; i++; }
    existing.add(cand);

    await updateDoc(doc(db, 'evenimente', d.id), { slug: cand });
    console.log(`[migrate-slugs] ${d.id} -> ${cand}`);
    migrated++;
  }

  console.log(`[migrate-slugs] Total: ${snap.size}, migrate: ${migrated}.`);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('[migrate-slugs] Eroare:', err?.message || err);
    // Nu blocam build-ul daca migrarea esueaza.
    process.exit(0);
  });
