import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { CACHE_TAGS, type CacheTag } from '@/lib/public-data';

// Apelat din admin după salvări, ca paginile publice (cache-uite) să arate
// imediat datele noi. Doar adminul autentificat: verificăm ID token-ul Firebase
// prin Identity Toolkit (proiectul nu folosește firebase-admin).
async function emailDinToken(idToken: string): Promise<string | null> {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken }), cache: 'no-store' },
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.users?.[0]?.email ?? null;
}

export async function POST(request: NextRequest) {
  const idToken = request.headers.get('authorization')?.replace(/^Bearer /, '');
  if (!idToken) return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });

  const email = await emailDinToken(idToken);
  if (!email || email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });
  }

  const { tags } = (await request.json().catch(() => ({}))) as { tags?: string[] };
  const valide = (tags ?? []).filter((t): t is CacheTag => (CACHE_TAGS as readonly string[]).includes(t));
  if (valide.length === 0) return NextResponse.json({ error: 'Niciun tag valid' }, { status: 400 });

  valide.forEach(tag => revalidateTag(tag));
  return NextResponse.json({ revalidated: valide });
}
