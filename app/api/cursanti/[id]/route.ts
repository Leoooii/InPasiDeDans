import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const docRef = doc(db, 'cursanti', id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return NextResponse.json({ error: 'Cursantul nu a fost găsit' }, { status: 404 });
    }
    return NextResponse.json({ id: snapshot.id, ...snapshot.data() });
  } catch (error) {
    console.error('Eroare:', error);
    return NextResponse.json({ error: 'Eroare la încărcarea cursantului' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nume } = body;

    if (!nume || !nume.trim()) {
      return NextResponse.json({ error: 'Numele este obligatoriu' }, { status: 400 });
    }

    const docRef = doc(db, 'cursanti', id);
    await updateDoc(docRef, { nume: nume.trim() });

    return NextResponse.json({ id, nume: nume.trim() });
  } catch (error) {
    console.error('Eroare:', error);
    return NextResponse.json({ error: 'Eroare la actualizarea cursantului' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteDoc(doc(db, 'cursanti', id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Eroare:', error);
    return NextResponse.json({ error: 'Eroare la ștergerea cursantului' }, { status: 500 });
  }
}
