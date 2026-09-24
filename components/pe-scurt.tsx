import Link from 'next/link';
import type { TarifeGrupate } from '@/lib/public-data';

type Rand = { eticheta: string; valoare: React.ReactNode };

// Faptele esențiale ale paginii, sus și în text simplu: asistenții AI și
// fragmentele Google citează de obicei primele rânduri ale unei pagini.
export default function PeScurt({ randuri }: { randuri: Rand[] }) {
  return (
    <section aria-label="Pe scurt" className="rounded-2xl border border-orange-100 bg-orange-50/60 p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">Pe scurt</h2>
      <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {randuri.map(r => (
          <div key={r.eticheta} className="flex flex-col">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{r.eticheta}</dt>
            <dd className="text-sm text-slate-800">{r.valoare}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const UNDE: Rand = { eticheta: 'Unde', valoare: 'Calea Rahovei 262, Sector 5, București' };
const INSCRIERE: Rand = {
  eticheta: 'Înscriere',
  valoare: (
    <>
      <Link href="/inscriere" className="text-red-600 underline underline-offset-2">formular online</Link> sau telefonic la{' '}
      <a href="tel:+40722675126" className="text-red-600 underline underline-offset-2">0722 675 126</a>
    </>
  ),
};
const lei = (n: number) => `${n} lei`;

export function peScurtAdulti(tarife: TarifeGrupate | null): Rand[] {
  const grup = tarife?.grup ?? [];
  const abonament = grup.find(t => t.titlu.includes('8'));
  const sedinta = grup.find(t => t.titlu.toLowerCase().includes('ședință'));
  return [
    UNDE,
    { eticheta: 'Pentru cine', valoare: 'Adulți de la 15 ani, de la începători la avansați; nu ai nevoie de partener' },
    { eticheta: 'Stiluri', valoare: 'Dansuri latino (salsa, bachata, cha-cha), de societate (vals, tango, foxtrot) și populare' },
    {
      eticheta: 'Preț',
      valoare:
        abonament || sedinta
          ? [abonament && `${abonament.titlu}: ${lei(abonament.pret)} / 4 săptămâni`, sedinta && `o ședință: ${lei(sedinta.pret)}`]
              .filter(Boolean)
              .join(' · ')
          : <Link href="/tarife" className="text-red-600 underline underline-offset-2">vezi tarifele</Link>,
    },
    { eticheta: 'Program', valoare: <>Orarul fiecărei grupe pe pagina <Link href="/program" className="text-red-600 underline underline-offset-2">Program</Link></> },
    INSCRIERE,
  ];
}

export function peScurtCopii(tarife: TarifeGrupate | null): Rand[] {
  const copii = tarife?.copii ?? [];
  return [
    UNDE,
    { eticheta: 'Vârstă', valoare: 'Copii între 7 și 14 ani, pe grupe de vârstă și nivel' },
    { eticheta: 'Stiluri', valoare: 'Dans sportiv: cha cha, jive, vals lent, quick step' },
    {
      eticheta: 'Preț',
      valoare: copii.length
        ? copii.map(t => `${t.titlu}: ${lei(t.pret)}`).join(' · ')
        : <Link href="/tarife" className="text-red-600 underline underline-offset-2">vezi tarifele</Link>,
    },
    INSCRIERE,
  ];
}

export function peScurtMiri(tarife: TarifeGrupate | null): Rand[] {
  const pachete = (tarife?.privat ?? []).filter(t => t.titlu.startsWith('Pachet'));
  const minim = pachete.length ? Math.min(...pachete.map(t => t.pret)) : null;
  return [
    UNDE,
    { eticheta: 'Format', valoare: 'Lecții private de 60 de minute, în sală privată — doar voi și instructorul' },
    {
      eticheta: 'Pachete',
      valoare: minim ? `4, 6 sau 8 ședințe, de la ${lei(minim)}` : <Link href="/tarife" className="text-red-600 underline underline-offset-2">vezi tarifele</Link>,
    },
    { eticheta: 'Program', valoare: 'Flexibil, în funcție de disponibilitatea voastră, inclusiv în weekend' },
    INSCRIERE,
  ];
}
