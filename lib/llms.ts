import { buildGrupaSlug } from '@/lib/utils';
import { BUSINESS } from '@/lib/schema-constants';
import {
  getEvenimente,
  getInstructori,
  getPetreceri,
  getTarife,
  getToateGrupele,
  safe,
  type Tarif,
} from '@/lib/public-data';

const SITE = 'https://www.inpasidedans.ro';

const ZILE = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];

function linieTarif(t: Tarif) {
  const detalii = [t.descriere, ...t.beneficii].filter(Boolean).map(x => x.replace(/\.$/, '')).join('; ');
  return `- ${t.titlu}: ${t.pret} ${t.moneda}${detalii ? ` — ${detalii}` : ''}`;
}

// Textul e generat din aceleași date ca site-ul (Firestore, cache 1h), ca
// asistenții AI să nu citeze prețuri sau grupe expirate.
export async function construiesteLlmsTxt({ complet }: { complet: boolean }) {
  const [tarife, grupe, instructori, evenimente, petreceri] = await Promise.all([
    safe(getTarife, null),
    safe(getToateGrupele, []),
    safe(getInstructori, []),
    safe(getEvenimente, []),
    safe(getPetreceri, []),
  ]);

  const out: string[] = [];
  const p = (...l: string[]) => out.push(...l);

  p(
    '# În Pași de Dans — Școală de dans în București',
    '',
    '> Școală de dans din 2009, în Sectorul 5 din București (Calea Rahovei 262). Cursuri de grup și lecții private pentru adulți și copii: dansuri latino (salsa, bachata, cha-cha), dansuri de societate (vals, tango, foxtrot, quickstep), dansuri populare românești și coregrafia dansului mirilor. Grupe pe niveluri, de la începători la avansați.',
    '',
    '## Informații cheie',
    '',
    '- Nume: În Pași de Dans (Școala de dans În Pași de Dans)',
    '- Adresă: Calea Rahovei 262, Sector 5, București, 050897, România',
    '- Zonă deservită: București (sectoarele 4, 5, 6) și Ilfov',
    '- Telefon: +40 722 675 126',
    '- Email: inpasidedans@gmail.com',
    '- Înființată: 2009',
    `- Google Maps / recenzii: ${BUSINESS.googleMaps}`,
    '- Program birou/recepție: luni–vineri 10:00–17:00, sâmbătă 14:00–18:00. Cursurile au loc după orarul grupelor, de mai jos.',
    '- Copii: cursuri pentru copii între 7 și 14 ani',
    '- Înscriere: formular online https://www.inpasidedans.ro/inscriere sau telefonic',
    '',
  );

  if (tarife) {
    p('## Prețuri (actualizate automat)', '');
    if (tarife.grup.length) p('### Cursuri de grup adulți', ...tarife.grup.map(linieTarif), '');
    if (tarife.privat.length) p('### Lecții private și dansul mirilor', ...tarife.privat.map(linieTarif), '');
    if (tarife.copii.length) p('### Cursuri copii', ...tarife.copii.map(linieTarif), '');
  } else {
    p('## Prețuri', '', `Vezi ${SITE}/tarife`, '');
  }

  const publice = grupe.filter(g => g.publica);
  p('## Grupe noi în formare', '');
  if (publice.length === 0) {
    p('Momentan nu sunt grupe noi în formare. Se poate completa formularul de înscriere pentru lista de așteptare.', '');
  } else {
    for (const g of publice) {
      p(
        `- ${g.titlu} — ${[g.nivel, g.program, g.dataStart && `începe pe ${g.dataStart}`, g.instructor && `instructor: ${g.instructor}`]
          .filter(Boolean)
          .join(', ')} — ${SITE}/grupe-in-formare/${buildGrupaSlug(g.titlu || 'grupa-dans', g.id)}`,
      );
      if (complet && g.descriere) p(`  ${String(g.descriere).replace(/\s*\n+\s*/g, ' ')}`);
    }
    p('');
  }

  const cuProgram = grupe.filter(g => g.program || g.zile?.length);
  if (cuProgram.length) {
    p('## Orar săptămânal (toate grupele)', '');
    const ziua = (g: Record<string, any>) => Math.min(...(g.zile ?? []).map((z: string) => ZILE.indexOf(z)).filter((i: number) => i >= 0), 99);
    for (const g of [...cuProgram].sort((a, b) => ziua(a) - ziua(b))) {
      p(`- ${g.titlu}: ${[g.program, g.nivel, (g.stiluri ?? []).join('/'), g.instructor].filter(Boolean).join(' · ')}`);
    }
    p('', `Orarul complet și filtrabil: ${SITE}/program`, '');
  }

  if (instructori.length) {
    p('## Instructori', '');
    for (const i of instructori) {
      p(`- ${i.name} — ${i.role}`);
      if (complet && i.bio) p(`  ${i.bio.replace(/\s*\n+\s*/g, ' ')}`);
    }
    p('');
  }

  const viitoare = [
    ...petreceri
      .filter(x => x.isUpcoming)
      .map(x => `- Petrecere: ${x.title} — ${[x.date, x.time, x.location?.trim()].filter(Boolean).join(', ')} — ${SITE}/petreceri/${x.id}`),
    ...evenimente
      .filter(e => e.eventDate && new Date(e.eventDate) >= new Date(Date.now() - 86400000))
      .map(e => `- Eveniment: ${e.title} — ${e.eventDate!.slice(0, 10)} — ${SITE}/evenimente/${e.slug}`),
  ];
  if (viitoare.length) p('## Evenimente și petreceri viitoare', '', ...viitoare, '');

  p(
    '## Pagini importante',
    '',
    `- Program cursuri: ${SITE}/program`,
    `- Tarife: ${SITE}/tarife`,
    `- Cursuri adulți: ${SITE}/cursuri-dans-adulti`,
    `- Cursuri copii: ${SITE}/cursuri-dans-copii`,
    `- Dansuri latino: ${SITE}/dansuri-latino`,
    `- Salsa și bachata: ${SITE}/dansuri-latino/salsa-bachata`,
    `- Dansuri de societate: ${SITE}/dansuri-de-societate`,
    `- Dansuri populare: ${SITE}/dansuri-populare`,
    `- Dansul mirilor: ${SITE}/dansul-mirilor`,
    `- Lecții private: ${SITE}/lectii-private`,
    `- Grupe în formare: ${SITE}/grupe-in-formare`,
    `- Instructori: ${SITE}/instructori`,
    `- Contact: ${SITE}/contact`,
    `- Blog: ${SITE}/blog`,
    '',
  );

  if (!complet) p(`Versiunea completă (descrieri grupe, biografii instructori): ${SITE}/llms-full.txt`, '');

  return out.join('\n');
}
