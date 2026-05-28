import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { slugify } from '@/lib/slug';

export async function POST() {
  try {
    const snapshot = await getDocs(collection(db, 'evenimente'));

    const existingSlugs = new Set<string>();
    snapshot.docs.forEach(d => {
      const s = d.data().slug;
      if (s) existingSlugs.add(s);
    });

    const updates: { id: string; slug: string; title: string }[] = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      if (data.slug) continue;

      const base = slugify(data.title || '') || `noutate-${docSnap.id.slice(0, 6).toLowerCase()}`;

      let candidate = base;
      let i = 2;
      while (existingSlugs.has(candidate)) {
        candidate = `${base}-${i}`;
        i++;
      }
      existingSlugs.add(candidate);

      await updateDoc(doc(db, 'evenimente', docSnap.id), { slug: candidate });
      updates.push({ id: docSnap.id, slug: candidate, title: data.title || '(fără titlu)' });
    }

    return NextResponse.json({
      success: true,
      total: snapshot.size,
      migrated: updates.length,
      updates,
    });
  } catch (error) {
    console.error('Eroare migrare slug-uri:', error);
    return NextResponse.json(
      { error: 'Eroare la migrarea slug-urilor' },
      { status: 500 }
    );
  }
}
