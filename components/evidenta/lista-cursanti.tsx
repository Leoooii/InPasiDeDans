'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CreditCard, Search, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ETICHETE_STATUS, type CodStatus } from '@/lib/evidenta/abonament';
import type { Cursant } from '@/lib/evidenta/tipuri';
import { useEvidenta } from './context';
import { DialogAbonament } from './dialog-abonament';
import { DialogCursant, potrivire } from './dialog-cursant';
import { Chip, Gol, Incarcare, Initiale, StatusBadge } from './ui';

const FILTRE: { cod: 'toate' | 'atentie' | CodStatus; eticheta: string }[] = [
  { cod: 'toate', eticheta: 'Toți' },
  { cod: 'atentie', eticheta: 'De rezolvat' },
  { cod: 'activ', eticheta: ETICHETE_STATUS.activ },
  { cod: 'la_limita', eticheta: ETICHETE_STATUS.la_limita },
  { cod: 'expirat', eticheta: ETICHETE_STATUS.expirat },
  { cod: 'epuizat', eticheta: ETICHETE_STATUS.epuizat },
  { cod: 'fara', eticheta: ETICHETE_STATUS.fara },
];

/** Lista cursanților cu status, căutare și filtre. Instructorul vede doar cursanții grupelor lui. */
export function ListaCursanti({ linkProfil }: { linkProfil: (id: string) => string }) {
  const { cursanti, grupe, status, esteAdmin, loading, grupa: grupaDupaId } = useEvidenta();
  const [q, setQ] = useState('');
  const [filtru, setFiltru] = useState<(typeof FILTRE)[number]['cod']>('toate');
  const [grupaId, setGrupaId] = useState('');
  const [arhivati, setArhivati] = useState(false);
  const [dialogNou, setDialogNou] = useState(false);
  const [abonamentPentru, setAbonamentPentru] = useState<Cursant | null>(null);

  const idGrupe = new Set(grupe.map(g => g.id));
  const vizibili = esteAdmin ? cursanti : cursanti.filter(c => c.grupe.some(g => idGrupe.has(g)));

  const filtrati = useMemo(() => {
    return vizibili
      .filter(c => (arhivati ? !c.activ : c.activ))
      .filter(c => !q.trim() || potrivire(c.nume, q))
      .filter(c => !grupaId || c.grupe.includes(grupaId))
      .filter(c => {
        const cod = status(c.id).cod;
        if (filtru === 'toate') return true;
        if (filtru === 'atentie') return ['fara', 'expirat', 'epuizat', 'la_limita'].includes(cod);
        return cod === filtru;
      })
      .sort((a, b) => status(a.id).ordine - status(b.id).ordine || a.nume.localeCompare(b.nume, 'ro'));
  }, [vizibili, arhivati, q, grupaId, filtru, status]);

  const numar = (cod: (typeof FILTRE)[number]['cod']) =>
    vizibili.filter(c => c.activ).filter(c => {
      const s = status(c.id).cod;
      return cod === 'toate' || (cod === 'atentie' ? ['fara', 'expirat', 'epuizat', 'la_limita'].includes(s) : s === cod);
    }).length;

  if (loading) return <Incarcare />;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Caută după nume" className="h-11 bg-white pl-9" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <select
          value={grupaId}
          onChange={e => setGrupaId(e.target.value)}
          className="h-11 rounded-md border border-input bg-white px-3 text-sm sm:max-w-64"
          aria-label="Filtru grupă"
        >
          <option value="">Toate grupele</option>
          {grupe.map(g => (
            <option key={g.id} value={g.id}>
              {g.titlu}
              {g.zile.length ? ` · ${g.zile.join(', ')}` : ''}
              {g.ora ? ` ${g.ora}` : ''}
            </option>
          ))}
        </select>
        <Button variant="brand" className="h-11" onClick={() => setDialogNou(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Cursant nou
        </Button>
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {FILTRE.map(f => (
          <Chip key={f.cod} activ={filtru === f.cod && !arhivati} onClick={() => { setFiltru(f.cod); setArhivati(false); }}>
            {f.eticheta} <span className="opacity-60">{numar(f.cod)}</span>
          </Chip>
        ))}
        {esteAdmin && (
          <Chip activ={arhivati} onClick={() => setArhivati(!arhivati)}>
            Arhivați
          </Chip>
        )}
      </div>

      {filtrati.length === 0 ? (
        <Gol>Niciun cursant pentru filtrele alese.</Gol>
      ) : (
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {filtrati.map(c => {
            const st = status(c.id);
            const numeGrupe = c.grupe.map(id => grupaDupaId(id)?.titlu).filter(Boolean);
            return (
              <li key={c.id} className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
                <Link href={linkProfil(c.id)} className="flex min-w-0 flex-1 items-center gap-3">
                  <Initiale nume={c.nume} className="hidden sm:flex" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium text-slate-900">{c.nume}</span>
                      <StatusBadge status={st} className="sm:hidden" />
                    </span>
                    <span className="block truncate text-xs text-slate-500">
                      {st.detaliu}
                      {numeGrupe.length > 0 && <span className="hidden md:inline"> · {numeGrupe.join(', ')}</span>}
                    </span>
                  </span>
                  <StatusBadge status={st} className="hidden sm:inline-flex" />
                </Link>
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={() => setAbonamentPentru(c)} aria-label={`Abonament nou pentru ${c.nume}`} title="Abonament nou">
                  <CreditCard className="h-4 w-4" />
                </Button>
                <ChevronRight className="hidden h-4 w-4 shrink-0 text-slate-300 sm:block" />
              </li>
            );
          })}
        </ul>
      )}

      <DialogCursant deschis={dialogNou} onInchide={() => setDialogNou(false)} />
      <DialogAbonament cursant={abonamentPentru} deschis={!!abonamentPentru} onInchide={() => setAbonamentPentru(null)} />
    </div>
  );
}
