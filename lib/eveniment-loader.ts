import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

export async function fetchEvenimentBySlug(
  slug: string
): Promise<EvenimentRecord | null> {
  try {
    const snapshot = await getDocs(
      query(collection(db, 'evenimente'), where('slug', '==', slug), limit(1))
    );
    if (snapshot.empty) return null;
    const docSnap = snapshot.docs[0];
    const data = docSnap.data();
    return {
      id: docSnap.id,
      slug: data.slug || '',
      title: data.title || '',
      description: data.description || '',
      link: data.link || '',
      imageUrl: data.imageUrl || '',
      date: data.date?.toDate().toISOString() || new Date().toISOString(),
      eventDate: data.eventDate?.toDate().toISOString() || null,
    };
  } catch (err) {
    console.error('Eroare fetch eveniment by slug:', err);
    return null;
  }
}
