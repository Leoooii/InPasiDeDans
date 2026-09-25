'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight, Clock, CreditCard, Loader2, RotateCcw, UserPlus, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { adaugaZile, azi, dataLunga, numeZi } from '@/lib/evidenta/date';
import { anuleazaPrezenta, incarcaPrezente, salveazaPrezente } from '@/lib/evidenta/repo';
import type { Cursant, GrupaEvidenta, Prezenta } from '@/lib/evidenta/tipuri';
import { cn } from '@/lib/utils';
import { useEvidenta } from './context';
import { DialogAbonament } from './dialog-abonament';
import { DialogCursant } from './dialog-cursant';
import { CalendarZi } from './calendar-zi';
import { Gol, Incarcare, StatusBadge } from './ui';

const faraDiacritice = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const inZi = (g: GrupaEvidenta, data: string) => g.zile.some(z => faraDiacritice(z) === faraDiacritice(numeZi(data)));

/** Ecranul de prezență: zi → grupă → bifează cursanții → salvează. Folosit de admin și de instructori. */
export function PrezentaGrupa({ linkProfil }: { linkProfil?: (id: string) => string }) {
  const { grupe, cursanti, status, actor, esteAdmin, reincarca, loading } = useEvidenta();
  const { showToast } = useSimpleToast();
  const [data, setData] = useState(azi());
  const [grupaId, setGrupaId] = useState<string | null>(null);
  const [toate, setToate] = useState(false);
  const [salvate, setSalvate] = useState<Prezenta[]>([]);
  const [bifati, setBifati] = useState<Set<string>>(new Set());
  const [recuperari, setRecuperari] = useState<Cursant[]>([]);
  const [incarcPrezente, setIncarcPrezente] = useState(false);
  const [salvez, setSalvez] = useState(false);
  const [dialogAdauga, setDialogAdauga] = useState(false);
  const [dialogRecuperare, setDialogRecuperare] = useState(false);
  const [abonamentPentru, setAbonamentPentru] = useState<Cursant | null>(null);
  const listaRef = useRef<HTMLDivElement>(null);
  const [versiune, setVersiune] = useState(0);

  const grupeZi = useMemo(() => grupe.filter(g => inZi(g, data)), [grupe, data]);
  const grupeAfisate = toate || grupeZi.length === 0 ? grupe : grupeZi;
  const grupa = grupe.find(g => g.id === grupaId) ?? null;

  // Alege automat grupa dacă în ziua respectivă e una singură
  useEffect(() => {
    if (grupaId && grupeAfisate.some(g => g.id === grupaId)) return;
    setGrupaId(grupeZi.length === 1 ? grupeZi[0].id : null);
  }, [grupeZi, grupeAfisate, grupaId]);

  const incarcaSalvate = useCallback(async () => {
    if (!grupaId) return;
    setIncarcPrezente(true);
    try {
      setSalvate(await incarcaPrezente({ grupaId, data }));
    } catch (e) {
      console.error(e);
      showToast('Prezența nu a putut fi încărcată.', 'error');
    } finally {
      setIncarcPrezente(false);
    }
  }, [grupaId, data, showToast]);

  useEffect(() => {
    setBifati(new Set());
    setRecuperari([]);
    setSalvate([]);
    void incarcaSalvate();
  }, [incarcaSalvate]);

  const alegeGrupa = (id: string) => {
    setGrupaId(id);
    // pe telefon lista e sub grupe; o aducem în ecran
    setTimeout(() => {
      if (window.innerWidth < 1024) listaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const idSalvate = new Set(salvate.map(p => p.cursantId));
  const inscrisi = grupa ? cursanti.filter(c => c.activ && c.grupe.includes(grupa.id)) : [];
  // cei veniți la recuperare sau scoși între timp din grupă, dar cu prezență în ziua asta
  const extra = [
    ...recuperari.filter(c => !inscrisi.some(i => i.id === c.id)),
    ...cursanti.filter(c => idSalvate.has(c.id) && !inscrisi.some(i => i.id === c.id) && !recuperari.some(r => r.id === c.id)),
  ];
  const lista = [...inscrisi, ...extra];
  const deSalvat = lista.filter(c => bifati.has(c.id) && !idSalvate.has(c.id));

  const comuta = (id: string) =>
    setBifati(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const salveaza = async () => {
    if (!grupa || !deSalvat.length) return;
    setSalvez(true);
    try {
      const r = await salveazaPrezente(
        grupa,
        data,
        deSalvat.map(c => ({ cursant: c, recuperare: !c.grupe.includes(grupa.id) })),
        actor,
      );
      showToast(
        r.neacoperite.length
          ? `Prezență salvată (${r.salvate}). Fără abonament valabil: ${r.neacoperite.join(', ')}.`
          : `Prezență salvată pentru ${r.salvate} ${r.salvate === 1 ? 'cursant' : 'cursanți'}.`,
        r.neacoperite.length ? 'info' : 'success',
      );
      setBifati(new Set());
      setVersiune(v => v + 1);
      await Promise.all([incarcaSalvate(), reincarca()]);
    } catch (e) {
      console.error(e);
      showToast('Prezența nu a putut fi salvată. Încearcă din nou.', 'error');
    } finally {
      setSalvez(false);
    }
  };

  const anuleaza = async (c: Cursant) => {
    const p = salvate.find(x => x.cursantId === c.id);
    if (!p || !confirm(`Anulezi prezența lui ${c.nume} din ${dataLunga(data)}? Ședința revine în abonament.`)) return;
    try {
      await anuleazaPrezenta(p, actor);
      showToast('Prezență anulată.', 'success');
      setVersiune(v => v + 1);
      await Promise.all([incarcaSalvate(), reincarca()]);
    } catch (e) {
      console.error(e);
      showToast('Nu s-a putut anula.', 'error');
    }
  };

  if (loading) return <Incarcare />;

  return (
    <div className="grid gap-4 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start">
      {/* Zi + grupe */}
      <div className="space-y-3 lg:sticky lg:top-4">
        <CalendarZi
          data={data}
          onChange={setData}
          areGrupe={d => grupe.some(g => inZi(g, d))}
          grupeIds={grupe.map(g => g.id)}
          versiune={versiune}
        />
        <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
          <Button variant="ghost" size="icon" className="h-11 w-11 shrink-0" onClick={() => setData(adaugaZile(data, -1))} aria-label="Ziua anterioară">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0 flex-1 text-center">
            <span className="block truncate text-sm font-semibold capitalize text-slate-900">{dataLunga(data)}</span>
            <span className="block text-xs text-slate-500">{data === azi() ? 'azi' : 'zi din trecut'}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 shrink-0"
            onClick={() => setData(adaugaZile(data, 1))}
            disabled={data >= azi()}
            aria-label="Ziua următoare"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        {data !== azi() && (
          <div className="flex items-center justify-between gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Marchezi prezența pentru o zi din trecut.
            <button className="font-semibold underline" onClick={() => setData(azi())}>
              Înapoi la azi
            </button>
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {toate || grupeZi.length === 0 ? 'Toate grupele' : `Grupe ${numeZi(data).toLowerCase()}`}
            </p>
            {grupeZi.length > 0 && (
              <button className="text-xs font-medium text-red-600" onClick={() => setToate(!toate)}>
                {toate ? `Doar ${numeZi(data).toLowerCase()}` : 'Altă grupă'}
              </button>
            )}
          </div>
          {grupeZi.length === 0 && !toate && (
            <p className="px-1 pb-2 text-xs text-slate-500">Nicio grupă programată {numeZi(data).toLowerCase()}. Alege din toate:</p>
          )}
          {grupe.length === 0 ? (
            <Gol>Nu ai nicio grupă atribuită.</Gol>
          ) : (
            <div className="flex flex-col gap-1.5">
              {grupeAfisate.map(g => {
                const nr = cursanti.filter(c => c.activ && c.grupe.includes(g.id)).length;
                return (
                  <button
                    key={g.id}
                    onClick={() => alegeGrupa(g.id)}
                    className={cn(
                      'flex min-h-14 items-center gap-3 rounded-xl border px-3 py-2 text-left transition-colors',
                      g.id === grupaId ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:bg-slate-50',
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-900">{g.titlu}</span>
                      <span className="flex items-center gap-1 truncate text-xs text-slate-500">
                        {g.ora && (
                          <>
                            <Clock className="h-3 w-3" /> {g.ora} ·{' '}
                          </>
                        )}
                        {g.instructor}
                        {(toate || grupeZi.length === 0) && g.zile.length > 0 && ` · ${g.zile.join(', ')}`}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Users className="h-3.5 w-3.5" />
                      {nr}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Cursanții grupei */}
      <div ref={listaRef} className="scroll-mt-16">
        {!grupa ? (
          <div className="hidden lg:block">
            <Gol>Alege o grupă ca să marchezi prezența.</Gol>
          </div>
        ) : (
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
              <div className="min-w-0">
                <h2 className="truncate font-semibold text-slate-900">{grupa.titlu}</h2>
                <p className="text-xs text-slate-500">
                  {[grupa.ora, grupa.instructor].filter(Boolean).join(' · ')} · {idSalvate.size} prezenți din {inscrisi.length} înscriși
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-9" onClick={() => setDialogRecuperare(true)}>
                  <RotateCcw className="mr-1.5 h-4 w-4" />
                  Recuperare
                </Button>
                <Button variant="outline" size="sm" className="h-9" onClick={() => setDialogAdauga(true)}>
                  <UserPlus className="mr-1.5 h-4 w-4" />
                  Adaugă
                </Button>
              </div>
            </header>

            {incarcPrezente ? (
              <Incarcare text="Se încarcă prezența..." />
            ) : lista.length === 0 ? (
              <div className="p-4">
                <Gol>Niciun cursant în această grupă. Apasă „Adaugă”.</Gol>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {lista.map(c => {
                  const st = status(c.id);
                  const salvat = idSalvate.has(c.id);
                  const bifat = bifati.has(c.id);
                  const recuperare = !c.grupe.includes(grupa.id);
                  const trebuieAbonament = ['fara', 'expirat', 'epuizat', 'la_limita'].includes(st.cod);
                  return (
                    <li key={c.id} className={cn('flex items-center gap-3 px-3 py-2 sm:px-4', (bifat || salvat) && 'bg-emerald-50/50')}>
                      <button
                        type="button"
                        onClick={() => (salvat ? anuleaza(c) : comuta(c.id))}
                        aria-label={salvat ? `Anulează prezența ${c.nume}` : `Prezent: ${c.nume}`}
                        className={cn(
                          'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                          salvat
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : bifat
                              ? 'border-emerald-500 bg-emerald-500 text-white'
                              : 'border-slate-300 bg-white text-transparent hover:border-emerald-400',
                        )}
                      >
                        <Check className="h-5 w-5" strokeWidth={3} />
                      </button>
                      <button type="button" onClick={() => !salvat && comuta(c.id)} className="min-w-0 flex-1 py-1 text-left">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium text-slate-900">{c.nume}</span>
                          {recuperare && <span className="shrink-0 rounded bg-sky-100 px-1.5 text-[10px] font-semibold uppercase text-sky-700">recuperare</span>}
                        </span>
                        <span className="block truncate text-xs text-slate-500">
                          {salvat ? 'Prezență salvată · apasă bifa ca s-o anulezi' : st.detaliu}
                        </span>
                      </button>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <StatusBadge status={st} className="hidden sm:inline-flex" />
                        {trebuieAbonament && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 px-2.5"
                            onClick={() => setAbonamentPentru(c)}
                            title="Abonament nou"
                          >
                            <CreditCard className="h-4 w-4 sm:mr-1.5" />
                            <span className="hidden sm:inline">Abonament</span>
                          </Button>
                        )}
                        {linkProfil && (
                          <Link
                            href={linkProfil(c.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            aria-label={`Profilul lui ${c.nume}`}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {lista.length > 0 && (
              <footer className="sticky bottom-0 flex items-center gap-2 rounded-b-2xl border-t border-slate-100 bg-white/95 px-3 py-3 backdrop-blur sm:px-4">
                <Button
                  variant="ghost"
                  className="h-11"
                  onClick={() =>
                    setBifati(
                      deSalvat.length === lista.filter(c => !idSalvate.has(c.id)).length
                        ? new Set()
                        : new Set(lista.filter(c => !idSalvate.has(c.id)).map(c => c.id)),
                    )
                  }
                >
                  {deSalvat.length && deSalvat.length === lista.filter(c => !idSalvate.has(c.id)).length ? (
                    <>
                      <X className="mr-1.5 h-4 w-4" /> Debifează
                    </>
                  ) : (
                    'Toți prezenți'
                  )}
                </Button>
                <Button variant="brand" className="ml-auto h-11 min-w-40" disabled={!deSalvat.length || salvez} onClick={salveaza}>
                  {salvez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvează prezența{deSalvat.length ? ` (${deSalvat.length})` : ''}
                </Button>
              </footer>
            )}
          </section>
        )}
        {!esteAdmin && grupa && (
          <p className="mt-3 px-1 text-xs text-slate-500">
            Greșeală? Apasă pe bifa verde ca să anulezi o prezență salvată.
          </p>
        )}
      </div>

      <DialogCursant deschis={dialogAdauga} onInchide={() => setDialogAdauga(false)} grupa={grupa ?? undefined} />
      <DialogCursant
        deschis={dialogRecuperare}
        onInchide={() => setDialogRecuperare(false)}
        titlu="Prezent la recuperare"
        laAlegere={c => {
          setRecuperari(r => (r.some(x => x.id === c.id) ? r : [...r, c]));
          setBifati(b => new Set(b).add(c.id));
        }}
      />
      <DialogAbonament cursant={abonamentPentru} deschis={!!abonamentPentru} onInchide={() => setAbonamentPentru(null)} />
    </div>
  );
}
