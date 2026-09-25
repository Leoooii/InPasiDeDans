'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CalendarCheck, Clock, GraduationCap, MapPin, UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { adaugaZile, azi, dataLunga, dataScurta, numeZi, oraDin, ziuaDin } from '@/lib/evidenta/date';
import { incarcaJurnal, incarcaPrezente, schimbaGrupa } from '@/lib/evidenta/repo';
import type { Cursant, IntrareJurnal, Prezenta } from '@/lib/evidenta/tipuri';
import { cn } from '@/lib/utils';
import { Avatar } from './avatar';
import { useEvidenta } from './context';
import { DialogCursant } from './dialog-cursant';
import { areZiua, bulinaSedinte, textUrmatoare, urmatoareaSedinta } from './grupe-lista';
import { CalendarZi } from './calendar-zi';
import { PozeGrupa } from './poze-instructori';
import { ExportLuna } from './export-luna';
import { Chip, Gol, Incarcare, Panou, StatusBadge } from './ui';

const DE_REZOLVAT = ['fara', 'expirat', 'epuizat', 'la_limita'];

/** Pagina unei grupe: informații, cursanți (cu starea abonamentelor), istoricul ședințelor. */
export function GrupaDetaliu({
  id,
  inapoi,
  linkProfil,
  linkPrezenta,
}: {
  id: string;
  inapoi: string;
  linkProfil: (id: string) => string;
  linkPrezenta: (grupaId: string) => string;
}) {
  const { grupe, cursanti, status, esteAdmin, actor, reincarca, loading } = useEvidenta();
  const { showToast } = useSimpleToast();
  const [prezente, setPrezente] = useState<Prezenta[] | null>(null);
  const [jurnal, setJurnal] = useState<IntrareJurnal[]>([]);
  const [filtru, setFiltru] = useState<'toti' | 'atentie'>('toti');
  const [adauga, setAdauga] = useState(false);
  const [ziIstoric, setZiIstoric] = useState(azi());

  const g = grupe.find(x => x.id === id);

  const incarca = useCallback(async () => {
    try {
      const [p, j] = await Promise.all([incarcaPrezente({ grupaId: id }), esteAdmin ? incarcaJurnal(1000) : Promise.resolve([])]);
      setPrezente(p);
      setJurnal(j.filter(x => x.grupaId === id));
    } catch (e) {
      console.error(e);
      setPrezente([]);
    }
  }, [id, esteAdmin]);

  useEffect(() => {
    void incarca();
  }, [incarca]);

  const membri = useMemo(
    () => cursanti.filter(c => c.activ && c.grupe.includes(id)).sort((a, b) => a.nume.localeCompare(b.nume, 'ro')),
    [cursanti, id],
  );

  // ședințele ținute (pentru media de prezență)
  const sedinte = useMemo(() => {
    const m = new Map<string, Prezenta[]>();
    for (const p of prezente ?? []) m.set(p.data, [...(m.get(p.data) ?? []), p]);
    return [...m.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [prezente]);

  const ultimaPrezenta = useMemo(() => {
    const m = new Map<string, string>();
    for (const p of prezente ?? []) if (!m.has(p.cursantId) || m.get(p.cursantId)! < p.data) m.set(p.cursantId, p.data);
    return m;
  }, [prezente]);

  if (loading) return <Incarcare />;
  if (!g) {
    return (
      <div className="space-y-4">
        <Link href={inapoi} className="inline-flex items-center gap-1 text-sm text-slate-600">
          <ArrowLeft className="h-4 w-4" /> Înapoi
        </Link>
        <Gol>Grupa nu există sau nu ai acces la ea.</Gol>
      </div>
    );
  }

  const deRezolvat = membri.filter(c => DE_REZOLVAT.includes(status(c.id).cod));
  const afisati = filtru === 'atentie' ? deRezolvat : membri;
  const deLa = adaugaZile(azi(), -28);
  const recente = sedinte.filter(([d]) => d >= deLa);
  const medie = recente.length ? Math.round(recente.reduce((s, [, l]) => s + l.length, 0) / recente.length) : null;
  const urmatoare = urmatoareaSedinta(g);

  const scoate = async (cId: string) => {
    const c = cursanti.find(x => x.id === cId);
    if (!c || !confirm(`Scoți pe ${c.nume} din ${g.titlu}? Abonamentul și prezențele lui rămân.`)) return;
    try {
      await schimbaGrupa(c, g, false, actor);
      showToast(`${c.nume} a fost scos din grupă.`, 'success');
      await reincarca();
    } catch (e) {
      console.error(e);
      showToast('Nu s-a putut scoate din grupă.', 'error');
    }
  };

  const Info = ({ icon: Icon, children }: { icon: typeof Clock; children: React.ReactNode }) => (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
      <Icon className="h-3.5 w-3.5 text-slate-400" />
      {children}
    </span>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <Link href={inapoi} className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" /> Toate grupele
      </Link>

      {/* Antet */}
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-orange-50/60 p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-start gap-3">
          <PozeGrupa g={g} className="h-14 w-14 text-base" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">{g.titlu}</h1>
            {g.instructor && <p className="mt-0.5 text-sm text-slate-600">cu {g.instructor}</p>}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {g.zile.length > 0 && <Info icon={CalendarCheck}>{g.zile.join(', ')}</Info>}
              {g.ora && <Info icon={Clock}>{g.ora}</Info>}
              {g.sala && <Info icon={MapPin}>{g.sala}</Info>}
              {g.nivel && <Info icon={GraduationCap}>{g.nivel}</Info>}

            </div>
          </div>
          {urmatoare !== null && (
            <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', urmatoare === 0 ? 'bg-red-600 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200')}>
              Următoarea ședință: {textUrmatoare(urmatoare).toLowerCase()}
            </span>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="brand" className="h-11" asChild>
            <Link href={linkPrezenta(g.id)}>
              <CalendarCheck className="mr-2 h-4 w-4" /> Fă prezența
            </Link>
          </Button>
          <Button variant="outline" className="h-11" onClick={() => setAdauga(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Adaugă cursant
          </Button>
        </div>
      </section>

      {/* Cifre */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { v: membri.length, t: 'cursanți', c: 'text-slate-900' },
          { v: membri.length - deRezolvat.length, t: 'cu abonament în regulă', c: 'text-emerald-600' },
          { v: deRezolvat.length, t: 'de rezolvat', c: deRezolvat.length ? 'text-amber-600' : 'text-slate-300' },
          { v: medie ?? '–', t: 'prezenți în medie (4 săpt.)', c: 'text-slate-900' },
        ].map(x => (
          <div key={x.t} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center shadow-sm">
            <p className={cn('text-2xl font-bold', x.c)}>{x.v}</p>
            <p className="text-[11px] leading-tight text-slate-500">{x.t}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] [&>*]:min-w-0">
        {/* Cursanți */}
        <Panou
          titlu={`Cursanți (${membri.length})`}
          actiune={
            deRezolvat.length > 0 ? (
              <div className="flex gap-1.5">
                <Chip activ={filtru === 'toti'} onClick={() => setFiltru('toti')}>
                  Toți
                </Chip>
                <Chip activ={filtru === 'atentie'} onClick={() => setFiltru('atentie')}>
                  De rezolvat {deRezolvat.length}
                </Chip>
              </div>
            ) : undefined
          }
        >
          {afisati.length === 0 ? (
            <Gol>Niciun cursant{filtru === 'atentie' ? ' de rezolvat' : ''}.</Gol>
          ) : (
            <ul className="-mx-2 divide-y divide-slate-100">
              {afisati.map(c => {
                const st = status(c.id);
                const b = bulinaSedinte(st);
                const ultima = ultimaPrezenta.get(c.id);
                return (
                  <li key={c.id} className="flex items-center gap-2 px-2 py-2">
                    <Link href={linkProfil(c.id)} className="flex min-w-0 flex-1 items-center gap-3">
                      <Avatar avatar={c.avatar} nume={c.nume} className="h-9 w-9 text-xs" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-slate-900">{c.nume}</span>
                        <span className="block truncate text-xs text-slate-500">
                          {st.detaliu}
                          {ultima && ` · ultima dată ${dataScurta(ultima)}`}
                        </span>
                      </span>
                      <StatusBadge status={st} className="hidden sm:inline-flex" />
                      <span className={cn('flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full px-1.5 text-xs font-bold', b.stil)} title={b.titlu}>
                        {b.text}
                      </span>
                    </Link>
                    <button
                      onClick={() => scoate(c.id)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-600"
                      aria-label={`Scoate pe ${c.nume} din grupă`}
                      title="Scoate din grupă"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Panou>

        <div className="space-y-4">
          {/* Istoric: calendar + ziua aleasă (doar citire) + export pe lună */}
          <Panou titlu="Istoric prezențe">
            <CalendarZi data={ziIstoric} onChange={setZiIstoric} areGrupe={d => areZiua(g, numeZi(d))} grupeIds={[g.id]} />
            <div className="mt-3">
              {prezente === null ? (
                <Incarcare />
              ) : (
                <>
                  <ZiIstoric data={ziIstoric} prezente={(prezente ?? []).filter(p => p.data === ziIstoric)} membri={membri} areGrupa={areZiua(g, numeZi(ziIstoric))} />
                  {esteAdmin && ziIstoric < azi() && (
                    <Button variant="outline" size="sm" className="mt-2 h-9 w-full" asChild>
                      <Link href={`${linkPrezenta(g.id)}&data=${ziIstoric}`}>Modifică prezența din această zi</Link>
                    </Button>
                  )}
                </>
              )}
            </div>
            <ExportLuna grupaId={g.id} />
          </Panou>

          {esteAdmin && (
            <Panou titlu="Activitate">
              {jurnal.length === 0 ? (
                <p className="text-sm text-slate-500">Nicio acțiune înregistrată pentru această grupă.</p>
              ) : (
                <ul className="space-y-2.5">
                  {jurnal.slice(0, 25).map(j => (
                    <li key={j.id} className="flex gap-3 text-sm">
                      <span className="w-14 shrink-0 text-xs text-slate-400">{dataScurta(ziuaDin(j.createdAt))}</span>
                      <span className="min-w-0 flex-1 text-slate-700">
                        {j.mesaj}
                        <span className="block text-xs text-slate-400">
                          {j.actor?.nume} · {oraDin(j.createdAt)}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Panou>
          )}
        </div>
      </div>

      <DialogCursant deschis={adauga} onInchide={() => setAdauga(false)} grupa={g} />
    </div>
  );
}

/** Prezența dintr-o zi, doar pentru citire: cine a venit și cine a lipsit. */
function ZiIstoric({ data, prezente, membri, areGrupa }: { data: string; prezente: Prezenta[]; membri: Cursant[]; areGrupa: boolean }) {
  const venit = new Set(prezente.map(p => p.cursantId));
  const absenti = membri.filter(c => !venit.has(c.id));
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-sm font-semibold capitalize text-slate-900">{dataLunga(data)}</p>
      {prezente.length === 0 ? (
        <p className="mt-1 text-sm text-slate-500">
          {data === azi() ? 'Prezența de azi nu e făcută încă.' : areGrupa ? 'Nicio prezență salvată în această zi.' : 'Grupa nu are ședință în această zi.'}
        </p>
      ) : (
        <>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">Prezenți · {prezente.length}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {[...prezente]
              .sort((a, b) => a.cursantNume.localeCompare(b.cursantNume, 'ro'))
              .map(p => (
                <span
                  key={p.id}
                  className={cn('rounded-full px-2 py-0.5 text-xs', p.abonamentId ? 'bg-white text-slate-700 ring-1 ring-slate-200' : 'bg-red-50 text-red-700 ring-1 ring-red-200')}
                  title={p.abonamentId ? undefined : 'fără abonament valabil'}
                >
                  {p.cursantNume}
                  {p.recuperare && ' ↺'}
                </span>
              ))}
          </div>
          {absenti.length > 0 && (
            <>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Absenți · {absenti.length}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{absenti.map(c => c.nume).join(', ')}</p>
            </>
          )}
          <p className="mt-2 text-[11px] text-slate-400">↺ = la recuperare · roșu = fără abonament valabil</p>
        </>
      )}
    </div>
  );
}
