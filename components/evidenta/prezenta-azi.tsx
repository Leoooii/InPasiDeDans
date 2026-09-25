'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Clock, CreditCard, Loader2, RotateCcw, UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { azi, dataLunga, numeZi } from '@/lib/evidenta/date';
import { anuleazaPrezenta, incarcaPrezente, salveazaPrezente } from '@/lib/evidenta/repo';
import type { Cursant, Prezenta } from '@/lib/evidenta/tipuri';
import { cn } from '@/lib/utils';
import { Avatar } from './avatar';
import { useEvidenta } from './context';
import { DialogAbonament } from './dialog-abonament';
import { DialogCursant } from './dialog-cursant';
import { areZiua, bulinaSedinte } from './grupe-lista';
import { Gol, Incarcare } from './ui';

/**
 * Prezența de azi pentru o grupă (se deschide din „Prezența” de pe cardul grupei).
 * Zilele trecute se văd, doar pentru citire, în istoricul de pe pagina grupei.
 */
export function PrezentaAzi({
  grupaId,
  inapoi,
  linkGrupa,
  zi,
}: {
  grupaId: string;
  inapoi: string;
  linkGrupa: string;
  /** doar adminul: o zi din trecut („YYYY-MM-DD”) */
  zi?: string;
}) {
  const { grupe, cursanti, status, actor, reincarca, loading, esteAdmin } = useEvidenta();
  const { showToast } = useSimpleToast();
  const router = useRouter();
  const data = esteAdmin && zi && /^\d{4}-\d{2}-\d{2}$/.test(zi) && zi < azi() ? zi : azi();
  const trecut = data !== azi();
  const [salvate, setSalvate] = useState<Prezenta[] | null>(null);
  const [bifati, setBifati] = useState<Set<string>>(new Set());
  const [recuperari, setRecuperari] = useState<Cursant[]>([]);
  const [salvez, setSalvez] = useState(false);
  const [dialogAdauga, setDialogAdauga] = useState(false);
  const [dialogRecuperare, setDialogRecuperare] = useState(false);
  const [abonamentPentru, setAbonamentPentru] = useState<Cursant | null>(null);

  const grupa = grupe.find(g => g.id === grupaId) ?? null;

  const incarcaSalvate = useCallback(async () => {
    try {
      setSalvate(await incarcaPrezente({ grupaId, data }));
    } catch (e) {
      console.error(e);
      setSalvate([]);
      showToast('Prezența nu a putut fi încărcată.', 'error');
    }
  }, [grupaId, data, showToast]);

  useEffect(() => {
    void incarcaSalvate();
  }, [incarcaSalvate]);

  if (loading || salvate === null) return <Incarcare />;
  if (!grupa) {
    return (
      <div className="space-y-4">
        <Link href={inapoi} className="inline-flex items-center gap-1 text-sm text-slate-600">
          <ArrowLeft className="h-4 w-4" /> Grupe
        </Link>
        <Gol>Grupa nu există sau nu ai acces la ea.</Gol>
      </div>
    );
  }

  const idSalvate = new Set(salvate.map(p => p.cursantId));
  const inscrisi = cursanti.filter(c => c.activ && c.grupe.includes(grupa.id)).sort((a, b) => a.nume.localeCompare(b.nume, 'ro'));
  const extra = [
    ...recuperari.filter(c => !inscrisi.some(i => i.id === c.id)),
    ...cursanti.filter(c => idSalvate.has(c.id) && !inscrisi.some(i => i.id === c.id) && !recuperari.some(r => r.id === c.id)),
  ];
  const lista = [...inscrisi, ...extra];
  const nesalvati = lista.filter(c => !idSalvate.has(c.id));
  const deSalvat = nesalvati.filter(c => bifati.has(c.id));

  const comuta = (id: string) =>
    setBifati(prev => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const salveaza = async () => {
    if (!deSalvat.length) return;
    setSalvez(true);
    try {
      const r = await salveazaPrezente(grupa, data, deSalvat.map(c => ({ cursant: c, recuperare: !c.grupe.includes(grupa.id) })), actor);
      showToast(
        r.neacoperite.length
          ? `Prezență salvată (${r.salvate}). Fără abonament valabil: ${r.neacoperite.join(', ')}.`
          : `Prezență salvată pentru ${r.salvate} ${r.salvate === 1 ? 'cursant' : 'cursanți'}.`,
        r.neacoperite.length ? 'info' : 'success',
      );
      setBifati(new Set());
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
      await Promise.all([incarcaSalvate(), reincarca()]);
    } catch (e) {
      console.error(e);
      showToast('Nu s-a putut anula.', 'error');
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <button
        type="button"
        onClick={() => (window.history.length > 1 ? router.back() : router.push(linkGrupa))}
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" /> Înapoi
      </button>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="border-b border-slate-100 bg-gradient-to-r from-red-50 to-orange-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-700">{trecut ? 'Modifici o zi trecută' : 'Prezența de azi'}</p>
          <h1 className="text-lg font-bold leading-tight text-slate-900">{grupa.titlu}</h1>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-slate-600">
            <span className="capitalize">{dataLunga(data)}</span>
            {grupa.ora && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" /> {grupa.ora}
              </span>
            )}
            <span>
              · {idSalvate.size} prezenți din {inscrisi.length}
            </span>
          </p>
          <div className="mt-3 flex gap-2">
            <Button variant="outline" size="sm" className="h-9 bg-white" onClick={() => setDialogRecuperare(true)}>
              <RotateCcw className="mr-1.5 h-4 w-4" /> Recuperare
            </Button>
            <Button variant="outline" size="sm" className="h-9 bg-white" onClick={() => setDialogAdauga(true)}>
              <UserPlus className="mr-1.5 h-4 w-4" /> Adaugă
            </Button>
          </div>
        </header>

        {trecut && (
          <p className="border-b border-amber-100 bg-amber-50 px-4 py-2 text-xs text-amber-800">
            Corectezi prezența din {dataLunga(data)}. Ședințele se scad din abonamentul valabil în acea zi.
          </p>
        )}
        {!areZiua(grupa, numeZi(data)) && (
          <p className="border-b border-amber-100 bg-amber-50 px-4 py-2 text-xs text-amber-800">
            Grupa nu are ședință programată {trecut ? 'în acea zi' : 'azi'} ({numeZi(data).toLowerCase()}). Salvează doar dacă a fost o ședință în plus sau mutată.
          </p>
        )}

        {lista.length === 0 ? (
          <div className="p-4">
            <Gol>Niciun cursant în această grupă. Apasă „Adaugă”.</Gol>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {lista.map(c => {
              const st = status(c.id);
              const b = bulinaSedinte(st);
              const salvat = idSalvate.has(c.id);
              const bifat = bifati.has(c.id);
              const trebuieAbonament = ['fara', 'expirat', 'epuizat', 'la_limita'].includes(st.cod);
              return (
                <li key={c.id} className={cn('flex items-center gap-3 px-3 py-2', (bifat || salvat) && 'bg-emerald-50/60')}>
                  <button
                    type="button"
                    onClick={() => (salvat ? anuleaza(c) : comuta(c.id))}
                    aria-label={salvat ? `Anulează prezența ${c.nume}` : `Prezent: ${c.nume}`}
                    className={cn(
                      'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                      salvat ? 'border-emerald-600 bg-emerald-600 text-white' : bifat ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white text-transparent',
                    )}
                  >
                    <Check className="h-5 w-5" strokeWidth={3} />
                  </button>
                  <button type="button" onClick={() => !salvat && comuta(c.id)} className="flex min-w-0 flex-1 items-center gap-2.5 py-1 text-left">
                    <Avatar avatar={c.avatar} nume={c.nume} className="h-8 w-8 text-[11px]" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-slate-900">{c.nume}</span>
                        {!c.grupe.includes(grupa.id) && <span className="shrink-0 rounded bg-sky-100 px-1.5 text-[10px] font-semibold uppercase text-sky-700">recuperare</span>}
                      </span>
                      {salvat && <span className="block text-xs text-emerald-700">salvat · apasă bifa ca s-o anulezi</span>}
                    </span>
                  </button>
                  <span className={cn('flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full px-1.5 text-xs font-bold', b.stil)} title={b.titlu}>
                    {b.text}
                  </span>
                  {trebuieAbonament && (
                    <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" onClick={() => setAbonamentPentru(c)} title="Abonament nou" aria-label={`Abonament nou pentru ${c.nume}`}>
                      <CreditCard className="h-4 w-4" />
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {nesalvati.length > 0 && (
          <footer className="sticky bottom-[var(--jos,0px)] flex items-center gap-2 border-t border-slate-100 bg-white/95 px-3 py-3 backdrop-blur">
            <Button
              variant="ghost"
              className="h-11"
              onClick={() => setBifati(deSalvat.length === nesalvati.length ? new Set() : new Set(nesalvati.map(c => c.id)))}
            >
              {deSalvat.length === nesalvati.length ? (
                <>
                  <X className="mr-1.5 h-4 w-4" /> Debifează
                </>
              ) : (
                'Toți prezenți'
              )}
            </Button>
            <Button variant="brand" className="ml-auto h-11 min-w-40" disabled={!deSalvat.length || salvez} onClick={salveaza}>
              {salvez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvează{deSalvat.length ? ` (${deSalvat.length})` : ''}
            </Button>
          </footer>
        )}
      </section>

      <DialogCursant deschis={dialogAdauga} onInchide={() => setDialogAdauga(false)} grupa={grupa} />
      <DialogCursant
        deschis={dialogRecuperare}
        onInchide={() => setDialogRecuperare(false)}
        titlu="Prezent la recuperare"
        descriere="Un cursant din altă grupă vine azi aici ca să recupereze: e marcat prezent și i se scade o ședință din abonament, dar nu e adăugat în grupă."
        laAlegere={c => {
          setRecuperari(r => (r.some(x => x.id === c.id) ? r : [...r, c]));
          setBifati(b => new Set(b).add(c.id));
        }}
      />
      <DialogAbonament cursant={abonamentPentru} deschis={!!abonamentPentru} onInchide={() => setAbonamentPentru(null)} />
    </div>
  );
}
