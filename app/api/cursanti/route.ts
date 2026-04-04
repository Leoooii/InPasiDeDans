import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, orderBy, query } from 'firebase/firestore';

export async function GET() {
  try {
    const q = query(collection(db, 'cursanti'), orderBy('nume', 'asc'));
    const snapshot = await getDocs(q);
    const cursanti = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(cursanti);
  } catch (error) {
    console.error('Eroare la încărcarea cursanților:', error);
    return NextResponse.json({ error: 'Eroare la încărcarea cursanților' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nume } = body;

    if (!nume || !nume.trim()) {
      return NextResponse.json({ error: 'Numele este obligatoriu' }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, 'cursanti'), {
      nume: nume.trim(),
      createdAt: Date.now(),
    });

    return NextResponse.json({ id: docRef.id, nume: nume.trim() }, { status: 201 });
  } catch (error) {
    console.error('Eroare la adăugarea cursantului:', error);
    return NextResponse.json({ error: 'Eroare la adăugarea cursantului' }, { status: 500 });
  }
}
