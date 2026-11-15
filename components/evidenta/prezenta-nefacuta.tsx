'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ClipboardX, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { adaugaZile, azi, intervalOra, minuteAcum, numeZi } from '@/lib/evidenta/date';
import { incarcaPrezente } from '@/lib/evidenta/repo';
import type { GrupaEvidenta } from '@/lib/evidenta/tipuri';
import { useEvidenta } from './context';
import { areZiua, stareAzi, useAcum } from './grupe-lista';

// Alerta „Prezența nu e făcută”: grupele de azi care s-au terminat și grupele de ieri (după
// zilele din program) fără nicio prezență salvată. Adminul le vede pe toate, instructorul pe ale lui.

const CHEIE_IGNORATE = 'evidenta:prezenta-ignorata';

function citesteIgnorate(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(CHEIE_IGNORATE) ?? '[]');
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function scrieIgnorate(lista: string[]) {
  try {
    // păstrează doar ultimele zile, ca lista să nu crească la nesfârșit
    const prag = adaugaZile(azi(), -3);
    localStorage.setItem(CHEIE_IGNORATE, JSON.stringify(lista.filter(k => k.slice(-10) >= prag)));
  } catch {
    // stocare indisponibilă: ignorarea ține doar până la reîncărcarea paginii
  }
}

type Lipsa = { g: GrupaEvidenta; data: string; ieri: boolean };

export function PrezentaNefacuta({ linkPrezenta }: { linkPrezenta: (grupaId: string, data?: string) => string }) {
  const { grupe, cursanti, esteAdmin, loading } = useEvidenta();
  const minute = minuteAcum(useAcum(30_000));
  const ziua = azi();
  const ieri = adaugaZile(ziua, -1);
  // „grupaId_data” pentru zilele cu prezență salvată; null = încă se încarcă
  const [facute, setFacute] = useState<Set<string> | null>(null);
  const [ignorate, setIgnorate] = useState<string[]>([]);

  useEffect(() => setIgnorate(citesteIgnorate()), []);

  useEffect(() => {
    // doar două zile, cu filtru pe interval în Firestore
    const incarca = () =>
      incarcaPrezente({ deLa: ieri, panaLa: ziua })
        .then(l => setFacute(new Set(l.map(p => `${p.grupaId}_${p.data}`))))
        .catch(console.error);
    incarca();
    const t = setInterval(incarca, 120_000);
    return () => clearInterval(t);
  }, [ziua, ieri]);

  const lipsa = useMemo<Lipsa[]>(() => {
    if (!facute) return [];
    const cuMembri = (g: GrupaEvidenta) => cursanti.some(c => c.activ && c.grupe.includes(g.id));
    const lipseste = (g: GrupaEvidenta, d: string) => !facute.has(`${g.id}_${d}`) && !ignorate.includes(`${g.id}_${d}`);
    const deAzi = grupe
      .filter(g => stareAzi(g, minute)?.stare === 'terminata' && cuMembri(g) && lipseste(g, ziua))
      .map(g => ({ g, data: ziua, ieri: false }));
    const deIeri = grupe
      .filter(g => areZiua(g, numeZi(ieri)) && intervalOra(g.ora) && cuMembri(g) && lipseste(g, ieri))
      .map(g => ({ g, data: ieri, ieri: true }));
    return [...deAzi, ...deIeri];
  }, [facute, ignorate, grupe, cursanti, minute, ziua, ieri]);

  if (loading || !lipsa.length) return null;

  const ignora = (l: Lipsa) => {
    const nou = [...ignorate, `${l.g.id}_${l.data}`];
    setIgnorate(nou);
    scrieIgnorate(nou);
  };

  return (
    <section className="mb-4 rounded-2xl border border-red-200 bg-red-50/70">
      <header className="flex items-center gap-3 px-4 pt-3">
        <ClipboardX className="h-5 w-5 shrink-0 text-red-600" />
        <h2 className="text-sm font-semibold text-red-900">
          Prezența nu e făcută ({lipsa.length})
        </h2>
      </header>
      <ul className="space-y-1 px-2 py-2">
        {lipsa.map(l => {
          const poateCompleta = !l.ieri || esteAdmin;
          return (
            <li key={`${l.g.id}_${l.data}`} className="flex flex-wrap items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white">
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm">
                  <span className="truncate font-medium text-slate-900">{l.g.titlu}</span>
                  <span
                    className={
                      l.ieri
                        ? 'shrink-0 rounded-full bg-slate-200 px-1.5 text-[10px] font-semibold uppercase text-slate-700'
                        : 'shrink-0 rounded-full bg-red-100 px-1.5 text-[10px] font-semibold uppercase text-red-700'
                    }
                  >
                    {l.ieri ? 'ieri' : 'azi'}
                  </span>
                </p>
                <p className="truncate text-xs text-slate-500">
                  {[l.g.instructor, l.g.ora, l.g.sala].filter(Boolean).join(' · ')}
                  {!poateCompleta && ' · doar administratorul poate completa zilele trecute'}
                </p>
              </div>
              <button
                onClick={() => ignora(l)}
                title="Ascunde (ședința nu s-a ținut)"
                aria-label={`Ascunde ${l.g.titlu} — ședința nu s-a ținut`}
                className="inline-flex h-8 shrink-0 items-center gap-1 rounded-lg px-2 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-3.5 w-3.5" /> Nu s-a ținut
              </button>
              {poateCompleta && (
                <Button variant="brand" size="sm" className="h-8 shrink-0" asChild>
                  <Link href={linkPrezenta(l.g.id, l.ieri ? l.data : undefined)}>Fă prezența</Link>
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
