import { NextRequest, NextResponse } from 'next/server';
import { citesteColectie, EroareConfigurare, urcaInStorage } from '@/lib/firebase-admin-rest';

// Backup lunar automat (Vercel Cron, vezi vercel.json): toate colecțiile importante,
// într-un JSON salvat în Firebase Storage la `backups/AAAA-LL-ZZ.json`.
// Fișierele se descarcă din consola Firebase → Storage → backups.
// Vercel trimite `Authorization: Bearer <CRON_SECRET>` (variabilă setată în Vercel).

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const COLECTII = [
  // evidența
  'cursanti', 'abonamente', 'prezente', 'jurnal', 'conturiInstructori', 'conturiPublice', 'setari',
  // site
  'grupe', 'tarife', 'inscrieri', 'evenimente', 'excursii', 'petreceri', 'instructori',
];

const ziuaRo = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Bucharest', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: 'CRON_SECRET nu e setat' }, { status: 503 });
  if (req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });
  }

  try {
    const date: Record<string, unknown> = { generat: new Date().toISOString(), zi: ziuaRo() };
    const numar: Record<string, number> = {};
    for (const c of COLECTII) {
      const docs = await citesteColectie(c);
      date[c] = docs;
      numar[c] = docs.length;
    }
    const cale = `backups/${ziuaRo()}.json`;
    await urcaInStorage(cale, JSON.stringify(date));
    console.log('[backup] salvat', cale, numar);
    return NextResponse.json({ ok: true, cale, numar });
  } catch (e) {
    console.error('[backup] eroare:', e);
    const mesaj = e instanceof EroareConfigurare ? e.message : 'Backup-ul a eșuat (vezi logurile Vercel).';
    return NextResponse.json({ error: mesaj }, { status: 500 });
  }
}
