import { unstable_cache } from 'next/cache';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Firebase client SDK nu trece prin fetch-ul Next, deci fără cache explicit
// fiecare randare pe server ar citi din Firestore și ar face ruta dinamică.
// Tag-ul = numele colecției, ca adminul să poată invalida cu revalidateTag.
export function getDocCached(colectie: string, id: string) {
  return unstable_cache(
    async () => {
      const snap = await getDoc(doc(db, colectie, id));
      if (!snap.exists()) return null;
      return JSON.parse(JSON.stringify({ id: snap.id, ...snap.data() })) as Record<string, any>;
    },
    ['doc', colectie, id],
    { revalidate: 3600, tags: [colectie] },
  )();
}
