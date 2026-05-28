import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const DIACRITICS_MAP: Record<string, string> = {
  ă: 'a', â: 'a', Ă: 'a', Â: 'a',
  î: 'i', Î: 'i',
  ș: 's', ş: 's', Ș: 's', Ş: 's',
  ț: 't', ţ: 't', Ț: 't', Ţ: 't',
};

export function slugify(input: string): string {
  if (!input) return '';

  const withoutDiacritics = input
    .split('')
    .map(ch => DIACRITICS_MAP[ch] ?? ch)
    .join('')
    .normalize('NFD')
    .replace(/\p{M}/gu, '');

  return withoutDiacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 80);
}

export async function generateUniqueSlug(
  collectionName: string,
  title: string,
  excludeDocId?: string
): Promise<string> {
  const base = slugify(title) || 'item';

  const snapshot = await getDocs(collection(db, collectionName));
  const existing = new Set(
    snapshot.docs
      .filter(d => d.id !== excludeDocId)
      .map(d => d.data().slug as string | undefined)
      .filter((s): s is string => Boolean(s))
  );

  if (!existing.has(base)) return base;

  let i = 2;
  while (existing.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}
