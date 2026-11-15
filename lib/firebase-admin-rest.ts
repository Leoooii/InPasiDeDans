import 'server-only';
import { JWT } from 'google-auth-library';

// Operații de administrator Firebase făcute pe server prin REST, cu contul de serviciu
// (FIREBASE_ADMIN_CLIENT_EMAIL / FIREBASE_ADMIN_PRIVATE_KEY). Ocolesc regulile Firestore,
// deci se apelează doar după ce am verificat că cererea vine de la admin.

const PROIECT = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

/** Mesaj pentru admin când cheia din Vercel lipsește sau e lipită greșit. */
export class EroareConfigurare extends Error {}

/** Cheia privată, oricum ar fi lipită în Vercel: cu ghilimele, cu „\n” literal sau cu rânduri noi reale. */
function cheiePrivata(): string | undefined {
  const brut = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.trim();
  if (!brut) return undefined;
  return brut.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');
}

let client: JWT | null = null;
async function token() {
  const email = process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim().replace(/^["']|["']$/g, '');
  const key = cheiePrivata();
  if (!email || !key) {
    throw new EroareConfigurare('Lipsesc FIREBASE_ADMIN_CLIENT_EMAIL / FIREBASE_ADMIN_PRIVATE_KEY pe server (Vercel → Settings → Environment Variables, pentru Production).');
  }
  if (!key.includes('BEGIN PRIVATE KEY')) {
    throw new EroareConfigurare('FIREBASE_ADMIN_PRIVATE_KEY nu arată ca o cheie privată (trebuie să înceapă cu -----BEGIN PRIVATE KEY-----).');
  }
  client ??= new JWT({ email, key, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
  try {
    const { token: t } = await client.getAccessToken();
    if (!t) throw new Error('fără token');
    return t;
  } catch (e) {
    client = null;
    throw new EroareConfigurare(`Cheia Firebase de pe server nu funcționează (${e instanceof Error ? e.message : 'eroare'}). Verifică valorile din Vercel.`);
  }
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

type Valoare = string | number | boolean;
const valoareFirestore = (v: Valoare) =>
  typeof v === 'boolean'
    ? { booleanValue: v }
    : typeof v === 'number'
      ? Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v }
      : { stringValue: v };

/** Adaugă un document nou (id generat de Firestore) și întoarce id-ul. */
export async function adaugaDocument(colectie: string, date: Record<string, Valoare>): Promise<string> {
  const fields = Object.fromEntries(Object.entries(date).map(([k, v]) => [k, valoareFirestore(v)]));
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROIECT}/databases/(default)/documents/${colectie}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${await token()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields }),
      cache: 'no-store',
    },
  );
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(j?.error?.message ?? `HTTP ${res.status}`);
  }
  const { name } = (await res.json()) as { name: string };
  return name.split('/').pop()!;
}

// ── Citire completă a unei colecții (backup) ────────────────────────────

// O valoare din API-ul REST Firestore: exact unul dintre câmpurile de mai jos.
type ValoareRest =
  | { nullValue: null }
  | { booleanValue: boolean }
  | { integerValue: string }
  | { doubleValue: number }
  | { timestampValue: string }
  | { stringValue: string }
  | { referenceValue: string }
  | { geoPointValue: { latitude: number; longitude: number } }
  | { bytesValue: string }
  | { arrayValue: { values?: ValoareRest[] } }
  | { mapValue: { fields?: Record<string, ValoareRest> } };

/** Valoare Firestore REST → JSON simplu (Timestamp → ISO string). */
function dinRest(v: ValoareRest): unknown {
  if ('nullValue' in v) return null;
  if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('timestampValue' in v) return v.timestampValue;
  if ('stringValue' in v) return v.stringValue;
  if ('referenceValue' in v) return v.referenceValue;
  if ('geoPointValue' in v) return v.geoPointValue;
  if ('bytesValue' in v) return v.bytesValue;
  if ('arrayValue' in v) return (v.arrayValue.values ?? []).map(dinRest);
  if ('mapValue' in v) {
    return Object.fromEntries(Object.entries(v.mapValue.fields ?? {}).map(([k, x]) => [k, dinRest(x as ValoareRest)]));
  }
  return null;
}

/** Toate documentele unei colecții, ca `{ id, ...câmpuri }`. Ocolește regulile (cont de serviciu). */
export async function citesteColectie(colectie: string): Promise<Record<string, unknown>[]> {
  const rez: Record<string, unknown>[] = [];
  let pagina: string | undefined;
  do {
    const url = new URL(`https://firestore.googleapis.com/v1/projects/${PROIECT}/databases/(default)/documents/${colectie}`);
    url.searchParams.set('pageSize', '300');
    if (pagina) url.searchParams.set('pageToken', pagina);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${await token()}` }, cache: 'no-store' });
    if (!res.ok) throw new Error(`${colectie}: HTTP ${res.status}`);
    const j = (await res.json()) as { documents?: { name: string; fields?: Record<string, ValoareRest> }[]; nextPageToken?: string };
    for (const d of j.documents ?? []) {
      rez.push({ id: d.name.split('/').pop(), ...(dinRest({ mapValue: { fields: d.fields ?? {} } }) as object) });
    }
    pagina = j.nextPageToken;
  } while (pagina);
  return rez;
}

/** Urcă un fișier în bucket-ul Firebase Storage (privat: regulile nu dau acces la el din browser). */
export async function urcaInStorage(cale: string, continut: string, tip = 'application/json') {
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!bucket) throw new EroareConfigurare('Lipsește NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET.');
  const res = await fetch(
    `https://storage.googleapis.com/upload/storage/v1/b/${encodeURIComponent(bucket)}/o?uploadType=media&name=${encodeURIComponent(cale)}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${await token()}`, 'Content-Type': tip },
      body: continut,
      cache: 'no-store',
    },
  );
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(j?.error?.message ?? `Storage HTTP ${res.status}`);
  }
}
