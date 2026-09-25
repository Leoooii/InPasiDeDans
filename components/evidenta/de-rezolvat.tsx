'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { dataScurta } from '@/lib/evidenta/date';
import { incarcaPrezente } from '@/lib/evidenta/repo';
import type { Prezenta } from '@/lib/evidenta/tipuri';
import { useEvidenta } from './context';
import { ButonWhatsapp } from './buton-whatsapp';

/** Ce trebuie rezolvat: abonamente expirate/epuizate, la limită și ședințe fără abonament. */
export function DeRezolvat({ linkProfil }: { linkProfil: (id: string) => string }) {
  const { cursanti, status, loading } = useEvidenta();
  const [neacoperite, setNeacoperite] = useState<Prezenta[]>([]);
  const [deschis, setDeschis] = useState(false);

  useEffect(() => {
    incarcaPrezente({ neacoperite: true }).then(setNeacoperite).catch(console.error);
  }, [cursanti]);

  if (loading) return null;

  // doar cursanții care au mai avut abonament (cei „fără abonament" de la început apar în listă)
  const activi = cursanti.filter(c => c.activ);
  const terminate = activi.filter(c => ['expirat', 'epuizat'].includes(status(c.id).cod));
  const laLimita = activi.filter(c => status(c.id).cod === 'la_limita');
  const peCursant = new Map<string, Prezenta[]>();
  neacoperite.forEach(p => peCursant.set(p.cursantId, [...(peCursant.get(p.cursantId) ?? []), p]));

  const total = terminate.length + laLimita.length + peCursant.size;
  if (!total) return null;

  const Grup = ({ titlu, culoare, children }: { titlu: string; culoare: string; children: React.ReactNode }) => (
    <div>
      <p className={`mb-1 text-xs font-semibold uppercase tracking-wide ${culoare}`}>{titlu}</p>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
  const Rand = ({ id, nume, detaliu }: { id: string; nume: string; detaliu: string }) => {
    const c = cursanti.find(x => x.id === id);
    return (
      <li className="flex items-center gap-1">
        <Link href={linkProfil(id)} className="flex min-w-0 flex-1 items-baseline gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-white">
          <span className="shrink-0 font-medium text-slate-900">{nume}</span>
          <span className="truncate text-xs text-slate-500">{detaliu}</span>
        </Link>
        {c && <ButonWhatsapp cursant={c} status={status(id)} mic />}
      </li>
    );
  };

  return (
    <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50/70">
      <button onClick={() => setDeschis(!deschis)} className="flex w-full items-center gap-3 px-4 py-3 text-left">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
        <span className="min-w-0 flex-1 text-sm text-amber-900">
          <strong>De rezolvat:</strong>{' '}
          {[
            terminate.length && (terminate.length === 1 ? '1 abonament terminat' : `${terminate.length} abonamente terminate`),
            laLimita.length && `${laLimita.length} la limită`,
            peCursant.size && (peCursant.size === 1 ? '1 cursant cu ședințe fără abonament' : `${peCursant.size} cursanți cu ședințe fără abonament`),
          ]
            .filter(Boolean)
            .join(' · ')}
        </span>
        {deschis ? <ChevronUp className="h-4 w-4 text-amber-700" /> : <ChevronDown className="h-4 w-4 text-amber-700" />}
      </button>
      {deschis && (
        <div className="grid gap-4 border-t border-amber-200 px-3 py-3 sm:grid-cols-3">
          {terminate.length > 0 && (
            <Grup titlu="Expirate / epuizate" culoare="text-red-700">
              {terminate.map(c => (
                <Rand key={c.id} id={c.id} nume={c.nume} detaliu={status(c.id).detaliu} />
              ))}
            </Grup>
          )}
          {laLimita.length > 0 && (
            <Grup titlu="La limită" culoare="text-amber-700">
              {laLimita.map(c => (
                <Rand key={c.id} id={c.id} nume={c.nume} detaliu={status(c.id).detaliu} />
              ))}
            </Grup>
          )}
          {peCursant.size > 0 && (
            <Grup titlu="Ședințe fără abonament" culoare="text-red-700">
              {[...peCursant.entries()].map(([id, lista]) => (
                <Rand
                  key={id}
                  id={id}
                  nume={lista[0].cursantNume}
                  detaliu={`${lista.length} · ${lista.map(p => dataScurta(p.data)).slice(0, 3).join(', ')}`}
                />
              ))}
            </Grup>
          )}
        </div>
      )}
    </div>
  );
}
