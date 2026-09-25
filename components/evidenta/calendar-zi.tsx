'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Rows3 } from 'lucide-react';
import { adaugaZile, azi, lunaAn, numeZi } from '@/lib/evidenta/date';
import { incarcaPrezente } from '@/lib/evidenta/repo';
import { cn } from '@/lib/utils';

const ZILE = ['L', 'Ma', 'Mi', 'J', 'V', 'S', 'D'];

/** Luni din săptămâna zilei `d`. */
const luniDin = (d: string) => {
  const zi = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'].indexOf(numeZi(d));
  return adaugaZile(d, -zi);
};

/**
 * Alegerea zilei: săptămâna curentă sau luna întreagă.
 * Punct gri = zi cu grupe programate; punct verde = zi cu prezență salvată.
 */
export function CalendarZi({
  data,
  onChange,
  areGrupe,
  grupeIds,
  versiune = 0,
}: {
  data: string;
  onChange: (d: string) => void;
  areGrupe: (d: string) => boolean;
  /** grupele vizibile (prezențele din alte grupe nu se marchează) */
  grupeIds: string[];
  /** se schimbă după salvare, ca să reîncarce punctele verzi */
  versiune?: number;
}) {
  const [mod, setMod] = useState<'saptamana' | 'luna'>('saptamana');
  // prima zi afișată: luni din săptămână sau 1 din lună
  const [ancora, setAncora] = useState(() => luniDin(data));
  const [luna, setLuna] = useState(() => data.slice(0, 7));
  const [cuPrezenta, setCuPrezenta] = useState<Set<string>>(new Set());
  const aziStr = azi();

  // când ziua se schimbă din altă parte (săgeți, „azi"), calendarul o urmează
  useEffect(() => {
    setAncora(luniDin(data));
    setLuna(data.slice(0, 7));
  }, [data]);

  const zile = useMemo(() => {
    if (mod === 'saptamana') return Array.from({ length: 7 }, (_, i) => adaugaZile(ancora, i));
    const [y, m] = luna.split('-').map(Number);
    const ultima = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
    const rez: string[] = [];
    for (let d = luniDin(`${luna}-01`); d <= ultima || rez.length % 7 !== 0; d = adaugaZile(d, 1)) rez.push(d);
    return rez;
  }, [mod, ancora, luna]);

  const cheieGrupe = grupeIds.join(',');
  useEffect(() => {
    const deLa = zile[0];
    const panaLa = zile[zile.length - 1];
    const ids = new Set(cheieGrupe.split(','));
    let anulat = false;
    incarcaPrezente({ deLa, panaLa })
      .then(lista => !anulat && setCuPrezenta(new Set(lista.filter(p => ids.has(p.grupaId)).map(p => p.data))))
      .catch(() => {});
    return () => {
      anulat = true;
    };
  }, [zile, cheieGrupe, versiune]);

  const muta = (pas: number) => {
    if (mod === 'saptamana') setAncora(adaugaZile(ancora, pas * 7));
    else {
      const [y, m] = luna.split('-').map(Number);
      const t = new Date(Date.UTC(y, m - 1 + pas, 1));
      setLuna(t.toISOString().slice(0, 7));
    }
  };
  const inainteBlocat = mod === 'saptamana' ? adaugaZile(ancora, 7) > aziStr : `${luna}-31` >= aziStr;

  const titlu =
    mod === 'luna'
      ? lunaAn(`${luna}-01`)
      : lunaAn(ancora) === lunaAn(adaugaZile(ancora, 6))
        ? lunaAn(ancora)
        : `${lunaAn(ancora).split(' ')[0].slice(0, 3)} – ${lunaAn(adaugaZile(ancora, 6))}`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-1">
        <button onClick={() => muta(-1)} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100" aria-label="Înapoi">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="min-w-0 flex-1 truncate text-center text-sm font-semibold capitalize text-slate-900">{titlu}</span>
        <button
          onClick={() => muta(1)}
          disabled={inainteBlocat}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30"
          aria-label="Înainte"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => setMod(mod === 'saptamana' ? 'luna' : 'saptamana')}
          className="ml-1 flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          {mod === 'saptamana' ? <CalendarDays className="h-3.5 w-3.5" /> : <Rows3 className="h-3.5 w-3.5" />}
          {mod === 'saptamana' ? 'Lună' : 'Săptămână'}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {ZILE.map(z => (
          <span key={z} className="py-1 text-center text-[10px] font-semibold uppercase text-slate-400">
            {z}
          </span>
        ))}
        {zile.map(d => {
          const viitor = d > aziStr;
          const alta = mod === 'luna' && d.slice(0, 7) !== luna;
          const ales = d === data;
          return (
            <button
              key={d}
              disabled={viitor}
              onClick={() => onChange(d)}
              className={cn(
                'relative flex h-11 flex-col items-center justify-center rounded-xl text-sm transition-colors',
                ales ? 'bg-slate-900 font-semibold text-white' : 'hover:bg-slate-100',
                d === aziStr && !ales && 'font-semibold text-red-600 ring-1 ring-inset ring-red-300',
                alta && !ales && 'text-slate-300',
                viitor && 'cursor-not-allowed text-slate-300 hover:bg-transparent',
              )}
            >
              {Number(d.slice(8))}
              <span className="absolute bottom-1 flex gap-0.5">
                {cuPrezenta.has(d) ? (
                  <span className={cn('h-1.5 w-1.5 rounded-full', ales ? 'bg-emerald-300' : 'bg-emerald-500')} />
                ) : (
                  areGrupe(d) && !viitor && <span className={cn('h-1 w-1 rounded-full', ales ? 'bg-white/60' : 'bg-slate-300')} />
                )}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-2 flex items-center justify-center gap-3 text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> prezență salvată
        </span>
        <span className="flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-slate-300" /> are grupe
        </span>
      </p>
    </div>
  );
}
