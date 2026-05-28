import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: 'Slug invalid' }, { status: 400 });
    }

    const evenimenteRef = collection(db, 'evenimente');
    const q = query(evenimenteRef, where('slug', '==', slug), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'Evenimentul nu a fost găsit' },
        { status: 404 }
      );
    }

    const docSnap = snapshot.docs[0];
    const data = docSnap.data();

    return NextResponse.json({
      id: docSnap.id,
      slug: data.slug || '',
      date: data.date?.toDate().toISOString() || new Date().toISOString(),
      eventDate: data.eventDate?.toDate().toISOString() || null,
      title: data.title || '',
      description: data.description || '',
      link: data.link || '',
      imageUrl: data.imageUrl || '',
    });
  } catch (error) {
    console.error('Eroare la obținerea evenimentului după slug:', error);
    return NextResponse.json(
      { error: 'Eroare la obținerea evenimentului' },
      { status: 500 }
    );
  }
}
