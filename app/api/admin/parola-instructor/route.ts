import { NextRequest, NextResponse } from 'next/server';
import { EroareConfigurare, emailDinToken, esteInstructor, seteazaParola } from '@/lib/firebase-admin-rest';

// Adminul setează o parolă nouă unui instructor (adresele instructorilor nu primesc emailuri).
export async function POST(request: NextRequest) {
  const idToken = request.headers.get('authorization')?.replace(/^Bearer /, '');
  const email = idToken ? await emailDinToken(idToken) : null;
  if (!email || email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });
  }

  const { uid, parola } = (await request.json().catch(() => ({}))) as { uid?: string; parola?: string };
  if (!uid || typeof parola !== 'string' || parola.length < 6) {
    return NextResponse.json({ error: 'Parola trebuie să aibă cel puțin 6 caractere.' }, { status: 400 });
  }

  try {
    // doar conturile de instructor (nu adminul sau alți utilizatori)
    if (!(await esteInstructor(uid))) return NextResponse.json({ error: 'Contul nu e de instructor.' }, { status: 404 });
    await seteazaParola(uid, parola);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Parolă instructor:', e);
    // cererea vine doar de la admin (verificat mai sus), deci îi putem spune exact ce lipsește
    const mesaj = e instanceof EroareConfigurare ? e.message : 'Parola nu a putut fi schimbată.';
    return NextResponse.json({ error: mesaj }, { status: 500 });
  }
}
