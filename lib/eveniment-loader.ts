import { getEvenimente } from '@/lib/public-data';

export type EvenimentRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  date: string;
  eventDate: string | null;
};

// Citește din lista cache-uită (lib/public-data), invalidată la salvare din admin.
// Eroarea Firestore nu e înghițită: trebuie să devină 500, nu 404.
export async function fetchEvenimentBySlug(
  slug: string
): Promise<EvenimentRecord | null> {
  const toate = await getEvenimente();
  return toate.find(e => e.slug === slug) ?? null;
}

export async function fetchEvenimenteSimilare(id: string, count = 3): Promise<EvenimentRecord[]> {
  const toate = await getEvenimente();
  return toate.filter(e => e.id !== id && e.slug).slice(0, count);
}
