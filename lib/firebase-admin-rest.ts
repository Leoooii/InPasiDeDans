import 'server-only';
import { JWT } from 'google-auth-library';

// Operații de administrator Firebase făcute pe server prin REST, cu contul de serviciu
// (FIREBASE_ADMIN_CLIENT_EMAIL / FIREBASE_ADMIN_PRIVATE_KEY). Ocolesc regulile Firestore,
// deci se apelează doar după ce am verificat că cererea vine de la admin.

const PROIECT = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

let client: JWT | null = null;
async function token() {
  client ??= new JWT({
    email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    key: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const { token: t } = await client.getAccessToken();
  if (!t) throw new Error('Contul de serviciu Firebase nu a putut fi autentificat.');
  return t;
}

/** Emailul din ID token-ul Firebase trimis de browser (null dacă tokenul nu e valid). */
export async function emailDinToken(idToken: string): Promise<string | null> {
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.users?.[0]?.email ?? null;
}

export async function esteInstructor(uid: string): Promise<boolean> {
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROIECT}/databases/(default)/documents/conturiInstructori/${encodeURIComponent(uid)}`,
    { headers: { Authorization: `Bearer ${await token()}` }, cache: 'no-store' },
  );
  return res.ok;
}

export async function seteazaParola(uid: string, parola: string) {
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${PROIECT}/accounts:update`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await token()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ localId: uid, password: parola }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(j?.error?.message ?? `HTTP ${res.status}`);
  }
}
