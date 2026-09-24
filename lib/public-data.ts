import { unstable_cache } from 'next/cache';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Datele publice citite pe server, ca să apară în HTML-ul trimis roboților
// (Google, crawlerele AI nu rulează JavaScript). Cache 1h + invalidare la
// salvarea din admin prin revalidateTag (vezi app/api/revalidate-content).

export type Tarif = {
  id: string;
  titlu: string;
  descriere: string;
  pret: number;
  moneda: string;
  categorie: 'grup' | 'privat' | 'copii';
  beneficii: string[];
  popular: boolean;
  ordine: number;
};

export type Instructor = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  order?: number;
  createdAt?: number;
};

export type TarifeGrupate = Record<Tarif['categorie'], Tarif[]>;

export const CACHE_TAGS = ['tarife', 'instructori', 'grupe', 'evenimente', 'petreceri', 'excursii'] as const;
export type CacheTag = (typeof CACHE_TAGS)[number];

// Timestamp-urile Firestore nu trec granița server → client; devin ISO string.
export function toPlain<T>(value: unknown): T {
  if (value instanceof Timestamp) return value.toDate().toISOString() as T;
  if (Array.isArray(value)) return value.map(v => toPlain(v)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, toPlain(v)])) as T;
  }
  return value as T;
}

async function readCollection<T>(name: string, onlyPublic = false): Promise<T[]> {
  const ref = collection(db, name);
  const snap = await getDocs(onlyPublic ? query(ref, where('publica', '==', true)) : ref);
  return snap.docs.map(d => toPlain<T>({ id: d.id, ...d.data() }));
}

export const getTarife = unstable_cache(
  async (): Promise<TarifeGrupate> => {
    const toate = await readCollection<Tarif>('tarife');
    const grupate: TarifeGrupate = { grup: [], privat: [], copii: [] };
    for (const t of toate.sort((a, b) => a.ordine - b.ordine)) grupate[t.categorie]?.push(t);
    return grupate;
  },
  ['public-tarife'],
  { revalidate: 3600, tags: ['tarife'] },
);

export const getInstructori = unstable_cache(
  async (): Promise<Instructor[]> =>
    (await readCollection<Instructor>('instructori')).sort((a, b) => (a.order || 0) - (b.order || 0)),
  ['public-instructori'],
  { revalidate: 3600, tags: ['instructori'] },
);

export const getGrupePublice = unstable_cache(
  async () => readCollection<Record<string, any>>('grupe', true),
  ['public-grupe'],
  { revalidate: 3600, tags: ['grupe'] },
);

// Un eșec Firestore nu trebuie să pice pagina; componentele au date de rezervă.
// Excepția nu e prinsă în interiorul unstable_cache, deci un eșec nu se cache-uiește.
export async function safe<T>(loader: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await loader();
  } catch (err) {
    console.error('Eroare la citirea datelor publice:', err);
    return fallback;
  }
}

export type EvenimentPublic = {
  id: string;
  date: string;
  eventDate: string | null;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  location: string;
  slug: string;
};

export const getEvenimente = unstable_cache(
  async (): Promise<EvenimentPublic[]> =>
    (await readCollection<Record<string, any>>('evenimente'))
      .map(d => ({
        id: d.id,
        date: d.date || new Date(0).toISOString(),
        eventDate: d.eventDate || null,
        title: d.title || '',
        description: d.description || '',
        link: d.link || '',
        imageUrl: d.imageUrl || '',
        location: d.location || '',
        slug: d.slug || '',
      }))
      .sort((a, b) => b.date.localeCompare(a.date)),
  ['public-evenimente'],
  { revalidate: 3600, tags: ['evenimente'] },
);

// Toate grupele (inclusiv cele în desfășurare) — pentru orarul de pe /program.
export const getToateGrupele = unstable_cache(
  async () => readCollection<Record<string, any>>('grupe'),
  ['public-toate-grupele'],
  { revalidate: 3600, tags: ['grupe'] },
);

export const getPetreceri = unstable_cache(
  async () => readCollection<Record<string, any>>('petreceri'),
  ['public-petreceri'],
  { revalidate: 3600, tags: ['petreceri'] },
);

export const getExcursii = unstable_cache(
  async () => readCollection<Record<string, any>>('excursii'),
  ['public-excursii'],
  { revalidate: 3600, tags: ['excursii'] },
);
