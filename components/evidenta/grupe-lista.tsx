'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CalendarCheck, ChevronDown, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ramase, type StatusCursant } from '@/lib/evidenta/abonament';
import { adaugaZile, azi, dataLunga, FUS_ORAR, intervalOra, minuteAcum, numeZi } from '@/lib/evidenta/date';
import { incarcaPrezente } from '@/lib/evidenta/repo';
import { instructoriDin, predaInstructorul } from '@/lib/evidenta/instructori-grupe';
import type { Cursant, GrupaEvidenta } from '@/lib/evidenta/tipuri';
import { cn } from '@/lib/utils';
import { Avatar } from './avatar';
import { PozeGrupa, usePozeInstructori } from './poze-instructori';
import { useEvidenta } from './context';
import { Chip, Gol, Incarcare } from './ui';

const faraDiacritice = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const ZILE = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];
export const areZiua = (g: GrupaEvidenta, zi: string) => g.zile.some(z => faraDiacritice(z) === faraDiacritice(zi));

/** Peste câte zile e următoarea ședință (0 = azi). */
export function urmatoareaSedinta(g: GrupaEvidenta): number | null {
  for (let i = 0; i < 7; i++) if (areZiua(g, numeZi(adaugaZile(azi(), i)))) return i;
  return null;
}
export const textUrmatoare = (n: number | null) => (n === null ? '' : n === 0 ? 'Azi' : n === 1 ? 'Mâine' : numeZi(adaugaZile(azi(), n)));

export type StareAzi = 'urmeaza' | 'live' | 'terminata';

/** Unde e grupa de azi față de ora curentă (null = nu are ședință azi sau ora lipsește). */
export function stareAzi(g: GrupaEvidenta, minute: number): { stare: StareAzi; text: string } | null {
  if (!areZiua(g, numeZi(azi()))) return null;
  const i = intervalOra(g.ora);
  if (!i) return null;
  const ora = (m: number) => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  if (minute < i.start) {
    const r = i.start - minute;
    return { stare: 'urmeaza', text: r < 60 ? `în ${r} min` : `la ${ora(i.start)}` };
  }
  if (minute < i.final) return { stare: 'live', text: `până la ${ora(i.final)}` };
  return { stare: 'terminata', text: `la ${ora(i.final)}` };
}

/** Ora curentă, actualizată la fiecare `pas` ms. */
export function useAcum(pas: number) {
  const [acum, setAcum] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setAcum(new Date()), pas);
    return () => clearInterval(t);
  }, [pas]);
  return acum;
}

export function CeasLive() {
  const acum = useAcum(1000);
  const ora = new Intl.DateTimeFormat('ro-RO', { timeZone: FUS_ORAR, hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(acum);
  return (
    <div className="ml-auto text-right" aria-live="off">
      <p className="font-mono text-2xl font-bold tabular-nums tracking-tight text-slate-900 sm:text-3xl">{ora}</p>
      <p className="text-xs capitalize text-slate-500">{dataLunga(azi())}</p>
    </div>
  );
}

/** Ședințele rămase, pe scurt, pentru bulina de lângă nume. */
export function bulinaSedinte(st: StatusCursant): { text: string; stil: string; titlu: string } {
  const a = st.abonament;
  if (st.cod === 'fara') return { text: '–', stil: 'bg-slate-100 text-slate-500', titlu: 'Fără abonament' };
  if (st.cod === 'expirat') return { text: '0', stil: 'bg-red-100 text-red-700', titlu: 'Abonament expirat' };
  if (!a) return { text: '–', stil: 'bg-slate-100 text-slate-500', titlu: st.eticheta };
  if (a.sedinteTotal === null) return { text: '∞', stil: 'bg-emerald-100 text-emerald-700', titlu: 'Full Pass' };
  const r = Math.max(0, ramase(a));
  return {
    text: String(r),
    stil: r === 0 ? 'bg-red-100 text-red-700' : st.cod === 'la_limita' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700',
    titlu: `${r} ${r === 1 ? 'ședință rămasă' : 'ședințe rămase'}`,
  };
}

/**
 * Lista grupelor, compactă: filtre pe zile (și pe instructor, pentru admin), grupele de azi evidențiate,
 * cursanții cu poză, nume și ședințe rămase. Detaliile sunt pe pagina fiecărei grupe.
 */
export function GrupeLista({
  titlu,
  linkGrupa,
  linkProfil,
  linkPrezenta,
}: {
  titlu: string;
  linkGrupa: (id: string) => string;
  linkProfil: (id: string) => string;
  linkPrezenta: (id: string) => string;
}) {
  const { grupe, cursanti, status, esteAdmin, loading } = useEvidenta();
  const ziAzi = numeZi(azi());
  const zileFolosite = ZILE.filter(z => grupe.some(g => areZiua(g, z)));
  // multe grupe (admin) → pornește pe ziua de azi; puține (instructor) → toate
  const [ziAleasa, setZi] = useState<string | null>(null);
  const zi = ziAleasa ?? (grupe.length > 6 && grupe.some(g => areZiua(g, ziAzi)) ? ziAzi : 'toate');
  const [instructor, setInstructor] = useState('');
  const instructori = useMemo(() => instructoriDin(grupe), [grupe]);
  const poza = usePozeInstructori();
  const minute = minuteAcum(useAcum(30_000));
  // câți au prezența salvată azi, pe grupă
  const [prezentiAzi, setPrezentiAzi] = useState<Map<string, number>>(new Map());
  useEffect(() => {
    const incarca = () =>
      incarcaPrezente({ data: azi() })
        .then(l => {
          const m = new Map<string, number>();
          l.forEach(p => m.set(p.grupaId, (m.get(p.grupaId) ?? 0) + 1));
          setPrezentiAzi(m);
        })
        .catch(() => {});
    incarca();
    const t = setInterval(incarca, 60_000);
    return () => clearInterval(t);
  }, []);

  const lista = useMemo(
    () =>
      grupe
        .filter(g => zi === 'toate' || areZiua(g, zi))
        .filter(g => !instructor || predaInstructorul(g, instructor))
        .map(g => ({
          g,
          membri: cursanti.filter(c => c.activ && c.grupe.includes(g.id)).sort((a, b) => a.nume.localeCompare(b.nume, 'ro')),
          urmatoare: urmatoareaSedinta(g),
          azi: stareAzi(g, minute),
        }))
        .sort(
          (a, b) =>
            (a.urmatoare ?? 9) - (b.urmatoare ?? 9) ||
            ORDINE_STARE[a.azi?.stare ?? 'urmeaza'] - ORDINE_STARE[b.azi?.stare ?? 'urmeaza'] ||
            a.g.ora.localeCompare(b.g.ora) ||
            a.g.titlu.localeCompare(b.g.titlu, 'ro'),
        ),
    [grupe, cursanti, zi, instructor, minute],
  );

  if (loading) return <Incarcare />;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{titlu}</h1>
          <p className="text-sm text-slate-500">
            {lista.length} {lista.length === 1 ? 'grupă' : 'grupe'}
          </p>
        </div>
        <CeasLive />
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip activ={zi === 'toate'} onClick={() => setZi('toate')}>
          Toate
        </Chip>
        {zileFolosite.map(z => (
          <Chip key={z} activ={zi === z} onClick={() => setZi(z)}>
            {z}
            {z === ziAzi && <span className={cn('ml-1 rounded px-1 text-[10px] font-bold uppercase', zi === z ? 'bg-white/20' : 'bg-red-100 text-red-700')}>azi</span>}
          </Chip>
        ))}
      </div>
      {esteAdmin && instructori.length > 1 && (
        <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
          <FiltruPoza activ={!instructor} eticheta="Toți" onClick={() => setInstructor('')}>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-dansatori.png" alt="" className="h-9 w-9" />
            </span>
          </FiltruPoza>
          {instructori.map(i => {
            const p = poza(i.cheie);
            return (
              <FiltruPoza key={i.cheie} activ={instructor === i.cheie} eticheta={i.nume} onClick={() => setInstructor(instructor === i.cheie ? '' : i.cheie)}>
                <Avatar avatar={p?.avatar} nume={p?.nume ?? i.nume} className="h-12 w-12 text-sm" />
              </FiltruPoza>
            );
          })}
        </div>
      )}

      {lista.length === 0 ? (
        <Gol>{grupe.length ? 'Nicio grupă pentru filtrele alese.' : 'Nu ai nicio grupă atribuită. Cere-i administratorului să ți le adauge.'}</Gol>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3 [&>*]:min-w-0">
          {lista.map(({ g, membri, urmatoare, azi: stare }) => (
            <CardGrupa
              key={g.id}
              g={g}
              membri={membri}
              urmatoare={urmatoare}
              stare={stare}
              prezenti={prezentiAzi.get(g.id) ?? 0}
              status={status}
              aratInstructor={esteAdmin}
              linkGrupa={linkGrupa(g.id)}
              linkPrezenta={linkPrezenta(g.id)}
              linkProfil={linkProfil}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CardGrupa({
  g,
  membri,
  urmatoare,
  stare,
  prezenti,
  status,
  aratInstructor,
  linkGrupa,
  linkPrezenta,
  linkProfil,
}: {
  g: GrupaEvidenta;
  membri: Cursant[];
  urmatoare: number | null;
  stare: ReturnType<typeof stareAzi>;
  prezenti: number;
  status: (id: string) => StatusCursant;
  aratInstructor: boolean;
  linkGrupa: string;
  linkPrezenta: string;
  linkProfil: (id: string) => string;
}) {
  const VIZIBILI = 12;
  const [toti, setToti] = useState(false);
  const eAzi = urmatoare === 0;
  const afisati = toti ? membri : membri.slice(0, VIZIBILI);
  const s = stare?.stare;

  return (
    <section
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm',
        s === 'live' ? 'border-red-400 ring-2 ring-red-200' : s === 'urmeaza' ? 'border-sky-300 ring-2 ring-sky-100' : eAzi ? 'border-slate-300' : 'border-slate-200',
      )}
    >
      <Link
        href={linkGrupa}
        className={cn(
          'group flex items-start gap-3 px-4 py-3',
          s === 'live' ? 'bg-gradient-to-r from-red-50 to-orange-50' : s === 'urmeaza' ? 'bg-sky-50/70' : 'bg-slate-50/70',
        )}
      >
        {aratInstructor && <PozeGrupa g={g} />}
        <div className="min-w-0 flex-1">
          <h2 className="line-clamp-2 font-bold leading-snug text-slate-900 group-hover:text-red-700">{g.titlu}</h2>
          {/* eticheta de stare stă sub titlu, ca titlul să aibă loc și în cardurile înguste */}
          {stare && (
            <div className="mt-1">
              <BadgeStare stare={stare.stare} text={stare.text} />
            </div>
          )}
          <p className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs text-slate-600">
            <span className="whitespace-nowrap font-medium">{g.zile.join(', ')}</span>
            {g.ora && (
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <Clock className="h-3 w-3" />
                {g.ora}
              </span>
            )}
            {g.sala && (
              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                <MapPin className="h-3 w-3" />
                {g.sala}
              </span>
            )}
            {aratInstructor && g.instructor && <span className="whitespace-nowrap">{g.instructor}</span>}
          </p>
        </div>
        {!stare && (
          urmatoare !== null && (
            <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
              {textUrmatoare(urmatoare)}
            </span>
          )
        )}
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      </Link>

      {stare && (
        <div
          className={cn(
            'flex items-center gap-2 border-y px-4 py-1.5 text-xs font-medium',
            prezenti
              ? 'border-emerald-100 bg-emerald-50 text-emerald-800'
              : s === 'urmeaza'
                ? 'border-slate-100 bg-white text-slate-500'
                : 'border-amber-100 bg-amber-50 text-amber-800',
          )}
        >
          {prezenti ? `✓ Prezența e făcută · ${prezenti} ${prezenti === 1 ? 'prezent' : 'prezenți'}` : s === 'urmeaza' ? 'Prezența se face la ședință' : '⚠ Prezența nu e făcută'}
        </div>
      )}

      <div className="flex-1 px-2 py-2">
        {membri.length === 0 ? (
          <p className="px-2 py-4 text-center text-sm text-slate-500">Niciun cursant încă.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-x-1 sm:grid-cols-3 lg:grid-cols-2">
            {afisati.map(c => {
              const b = bulinaSedinte(status(c.id));
              return (
                <li key={c.id} className="min-w-0">
                  <Link href={linkProfil(c.id)} className="flex min-w-0 items-center gap-1.5 rounded-lg px-1.5 py-1 hover:bg-slate-50" title={`${c.nume} · ${b.titlu}`}>
                    <Avatar avatar={c.avatar} nume={c.nume} className="h-7 w-7 text-[10px]" />
                    <span className="min-w-0 flex-1 truncate text-xs font-medium text-slate-800">{c.nume}</span>
                    <span className={cn('flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1 text-[11px] font-bold', b.stil)}>{b.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {membri.length > VIZIBILI && (
          <button onClick={() => setToti(!toti)} className="mt-1 flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            {toti ? 'Mai puțini' : `Toți cei ${membri.length}`}
            <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', toti && 'rotate-180')} />
          </button>
        )}
      </div>

      <footer className="flex items-center gap-2 border-t border-slate-100 px-3 py-2">
        <span className="text-xs text-slate-500">
          {membri.length} {membri.length === 1 ? 'cursant' : 'cursanți'}
        </span>
        <Button variant="ghost" size="sm" className="ml-auto h-9" asChild>
          <Link href={linkGrupa}>Detalii</Link>
        </Button>
        <Button variant={eAzi ? 'brand' : 'outline'} size="sm" className="h-9" asChild>
          <Link href={linkPrezenta}>
            <CalendarCheck className="mr-1.5 h-4 w-4" /> Prezența
          </Link>
        </Button>
      </footer>
    </section>
  );
}

const ORDINE_STARE: Record<StareAzi, number> = { live: 0, urmeaza: 1, terminata: 2 };

function BadgeStare({ stare, text }: { stare: StareAzi; text: string }) {
  if (stare === 'live') {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm shadow-red-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="animate-pulse">💃</span> LIVE <span className="hidden font-medium opacity-90 sm:inline">· {text}</span>
      </span>
    );
  }
  if (stare === 'urmeaza') {
    return (
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sky-600 px-2.5 py-1 text-xs font-semibold text-white">
        <span className="inline-block animate-bounce [animation-duration:2s]">⏳</span> Urmează · {text}
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">
      ✅ Terminată
    </span>
  );
}

export function FiltruPoza({ activ, eticheta, onClick, children }: { activ: boolean; eticheta: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activ}
      className={cn('flex w-[4.5rem] shrink-0 flex-col items-center gap-1 rounded-2xl px-1 py-1.5 transition-colors', activ ? 'bg-red-50' : 'hover:bg-white')}
    >
      <span className={cn('rounded-full p-0.5', activ ? 'ring-[3px] ring-red-500' : 'ring-1 ring-transparent')}>{children}</span>
      <span className={cn('w-full truncate text-center text-[11px]', activ ? 'font-semibold text-red-700' : 'text-slate-600')}>{eticheta.split(' ')[0]}</span>
    </button>
  );
}
