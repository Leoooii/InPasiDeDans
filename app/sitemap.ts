import type { MetadataRoute } from 'next';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { buildGrupaSlug } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { allAuthorsQuery, allCategoriesQuery, allPostSlugsQuery } from '@/sanity/lib/queries';

export const revalidate = 3600;

const BASE = 'https://www.inpasidedans.ro';

type Entry = MetadataRoute.Sitemap[number];

const STATIC_PAGES: [string, number, Entry['changeFrequency']][] = [
  ['/', 1, 'daily'],
  ['/cursuri-dans-adulti', 0.9, 'weekly'],
  ['/cursuri-dans-copii', 0.9, 'weekly'],
  ['/dansul-mirilor', 0.9, 'weekly'],
  ['/lectii-private', 0.8, 'monthly'],
  ['/dansuri-latino', 0.8, 'monthly'],
  ['/dansuri-latino/salsa-bachata', 0.8, 'monthly'],
  ['/dansuri-de-societate', 0.8, 'monthly'],
  ['/dansuri-populare', 0.8, 'monthly'],
  ['/grupe-in-formare', 0.9, 'daily'],
  ['/program', 0.8, 'weekly'],
  ['/tarife', 0.8, 'monthly'],
  ['/instructori', 0.7, 'monthly'],
  ['/despre-noi', 0.6, 'monthly'],
  ['/contact', 0.7, 'yearly'],
  ['/inscriere', 0.7, 'yearly'],
  ['/noutati', 0.7, 'daily'],
  ['/petreceri', 0.6, 'weekly'],
  ['/excursii', 0.5, 'monthly'],
  ['/blog', 0.8, 'daily'],
  ['/cookie-policy', 0.1, 'yearly'],
];

// Firestore ține datele fie ca Timestamp, fie ca număr (ms); datele din viitor
// (ex. data de start a unei grupe) nu sunt „ultima modificare", deci le ignorăm.
function toDate(value: unknown): Date | undefined {
  let d: Date | undefined;
  if (typeof value === 'number') d = new Date(value);
  else if (value && typeof value === 'object' && 'toDate' in value) d = (value as { toDate: () => Date }).toDate();
  if (!d || Number.isNaN(d.getTime()) || d.getTime() > Date.now()) return undefined;
  return d;
}

async function firestoreEntries(): Promise<Entry[]> {
  const [grupe, evenimente, petreceri, excursii] = await Promise.all([
    getDocs(query(collection(db, 'grupe'), where('publica', '==', true))),
    getDocs(collection(db, 'evenimente')),
    getDocs(collection(db, 'petreceri')),
    getDocs(collection(db, 'excursii')),
  ]);

  return [
    ...grupe.docs.map(d => ({
      url: `${BASE}/grupe-in-formare/${buildGrupaSlug(d.data().titlu || 'grupa-dans', d.id)}`,
      lastModified: toDate(d.data().createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...evenimente.docs
      .filter(d => d.data().slug)
      .map(d => ({
        url: `${BASE}/${d.data().eventDate ? 'evenimente' : 'noutati'}/${d.data().slug}`,
        lastModified: toDate(d.data().date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    ...petreceri.docs.map(d => ({
      url: `${BASE}/petreceri/${d.id}`,
      lastModified: toDate(d.data().createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...excursii.docs.map(d => ({
      url: `${BASE}/excursii/${d.id}`,
      lastModified: toDate(d.data().createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    })),
  ];
}

async function blogEntries(): Promise<Entry[]> {
  const [posts, categories, authors] = await Promise.all([
    client.fetch(allPostSlugsQuery),
    client.fetch(allCategoriesQuery),
    client.fetch(allAuthorsQuery),
  ]);

  return [
    ...categories
      .filter((c: any) => c.slug?.current)
      .map((c: any) => ({ url: `${BASE}/blog/${c.slug.current}`, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...posts
      .filter((p: any) => p.slug && p.category)
      .map((p: any) => ({
        url: `${BASE}/blog/${p.category}/${p.slug}`,
        lastModified: new Date(p._updatedAt || p.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ...authors
      .filter((a: any) => a.slug?.current && a.postCount > 0)
      .map((a: any) => ({ url: `${BASE}/blog/autor/${a.slug.current}`, changeFrequency: 'monthly' as const, priority: 0.4 })),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pagini: Entry[] = STATIC_PAGES.map(([path, priority, changeFrequency]) => ({
    url: `${BASE}${path === '/' ? '' : path}`,
    changeFrequency,
    priority,
  }));

  // O sursă căzută nu trebuie să lase sitemap-ul fără paginile principale.
  const [dinFirestore, dinBlog] = await Promise.allSettled([firestoreEntries(), blogEntries()]);
  if (dinFirestore.status === 'rejected') console.error('Sitemap Firestore:', dinFirestore.reason);
  if (dinBlog.status === 'rejected') console.error('Sitemap blog:', dinBlog.reason);

  return [
    ...pagini,
    ...(dinFirestore.status === 'fulfilled' ? dinFirestore.value : []),
    ...(dinBlog.status === 'fulfilled' ? dinBlog.value : []),
  ];
}
