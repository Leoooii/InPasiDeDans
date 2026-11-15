'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, ChevronUp, Hourglass, RotateCcw, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { expiraCurand } from '@/lib/evidenta/abonament';
import { azi, dataScurta, numeZi } from '@/lib/evidenta/date';
import { completeaza, linkWhatsapp, valori } from '@/lib/evidenta/whatsapp';
import { Avatar } from './avatar';
import { ButonWhatsapp, useSabloane } from './buton-whatsapp';
import { useEvidenta } from './context';

// Lista de lucru „Expiră în 7 zile”: cursanții activi al căror abonament se termină curând
// (ultima zi valabilă în următoarele 7 zile sau cel mult 2 ședințe rămase), cu mesajul
// „Se apropie de final” pe WhatsApp și un mod rapid care îi ia pe rând.

const ZILE = 7;
const cheieSesiune = () => `evidenta:expira-trimise:${azi()}`;

function citesteTrimise(): string[] {
  try {
    const v = JSON.parse(sessionStorage.getItem(cheieSesiune()) ?? '[]');
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function scrieTrimise(ids: string[]) {
  try {
    sessionStorage.setItem(cheieSesiune(), JSON.stringify(ids));
  } catch {
    // stocare indisponibilă (navigare privată): lista rămâne doar în memorie
  }
}

const textZile = (z: number, ziua: string) =>
  z <= 0 ? 'azi' : z === 1 ? 'mâine' : z < 7 ? numeZi(ziua).toLowerCase() : `în ${z} zile`;

const textRamase = (r: number) => (r === Infinity ? 'nelimitat' : r === 1 ? '1 ședință rămasă' : `${Math.max(0, r)} ședințe rămase`);

export function ExpiraCurand({ linkProfil }: { linkProfil: (id: string) => string }) {
  const { cursanti, grupe, esteAdmin, status, abonamenteCursant, loading } = useEvidenta();
  const sabloane = useSabloane();
  const [deschis, setDeschis] = useState(false);
  const [trimise, setTrimise] = useState<string[]>([]);

  useEffect(() => setTrimise(citesteTrimise()), []);

  const lista = useMemo(() => {
    const ziua = azi();
    const idGrupe = new Set(grupe.map(g => g.id));
    return cursanti
      .filter(c => c.activ && (esteAdmin || c.grupe.some(id => idGrupe.has(id))))
      .map(c => ({ c, e: expiraCurand(abonamenteCursant(c.id), ziua, ZILE) }))
      .filter((x): x is { c: (typeof cursanti)[number]; e: NonNullable<ReturnType<typeof expiraCurand>> } => x.e !== null)
      .sort((a, b) => a.e.ultimaZi.localeCompare(b.e.ultimaZi) || a.e.ramase - b.e.ramase || a.c.nume.localeCompare(b.c.nume, 'ro'));
  }, [cursanti, grupe, esteAdmin, abonamenteCursant]);

  if (loading || !lista.length) return null;

  const link = (x: (typeof lista)[number]) =>
    x.c.telefon ? linkWhatsapp(x.c.telefon, completeaza(sabloane.la_limita, valori(x.c.nume, status(x.c.id)))) : null;

  const marcheaza = (id: string) =>
    setTrimise(t => {
      if (t.includes(id)) return t;
      const nou = [...t, id];
      scrieTrimise(nou);
      return nou;
    });

  // modul rapid: doar cei cu telefon valid
  const deTrimis = lista.filter(x => link(x));
  const urmatorul = deTrimis.find(x => !trimise.includes(x.c.id));
  const pozitie = urmatorul ? deTrimis.indexOf(urmatorul) + 1 : deTrimis.length;
  const amInceput = deTrimis.some(x => trimise.includes(x.c.id));

  const trimiteUrmatorul = () => {
    if (!urmatorul) return;
    const l = link(urmatorul);
    if (!l) return;
    window.open(l, '_blank', 'noopener,noreferrer');
    marcheaza(urmatorul.c.id);
    setDeschis(true);
  };

  const ieLaCapat = () => {
    setTrimise([]);
    scrieTrimise([]);
  };

  return (
    <div className="mb-4 rounded-2xl border border-sky-200 bg-sky-50/70">
      <div className="flex flex-wrap items-center gap-2 px-4 py-3">
        <button onClick={() => setDeschis(!deschis)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <Hourglass className="h-5 w-5 shrink-0 text-sky-600" />
          <span className="min-w-0 flex-1 text-sm text-sky-900">
            <strong>Expiră în {ZILE} zile:</strong>{' '}
            {lista.length === 1 ? '1 cursant' : `${lista.length} cursanți`}
            {amInceput && (
              <span className="text-sky-700">
                {' '}
                · {deTrimis.filter(x => trimise.includes(x.c.id)).length} anunțați azi
              </span>
            )}
          </span>
          {deschis ? <ChevronUp className="h-4 w-4 shrink-0 text-sky-700" /> : <ChevronDown className="h-4 w-4 shrink-0 text-sky-700" />}
        </button>
        {deTrimis.length > 0 &&
          (urmatorul ? (
            <Button size="sm" className="h-9 bg-emerald-600 text-white hover:bg-emerald-700" onClick={trimiteUrmatorul} title={`Deschide WhatsApp pentru ${urmatorul.c.nume}`}>
              <Send className="mr-1.5 h-4 w-4" />
              {amInceput ? `Următorul (${pozitie}/${deTrimis.length})` : 'Trimite pe rând'}
            </Button>
          ) : (
            <span className="flex items-center gap-2 text-xs font-medium text-emerald-700">
              <Check className="h-4 w-4" /> Toți au fost anunțați
              <button onClick={ieLaCapat} className="inline-flex items-center gap-1 text-slate-500 underline-offset-2 hover:underline">
                <RotateCcw className="h-3 w-3" /> De la capăt
              </button>
            </span>
          ))}
      </div>
      {urmatorul && amInceput && (
        <p className="-mt-1 px-4 pb-2 text-xs text-sky-800">
          Urmează: <strong>{urmatorul.c.nume}</strong>
        </p>
      )}
      {deschis && (
        <ul className="space-y-0.5 border-t border-sky-200 px-2 py-2">
          {lista.map(x => {
            const { c, e } = x;
            const trimis = trimise.includes(c.id);
            const areLink = !!link(x);
            return (
              <li key={c.id} className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white">
                <Link href={linkProfil(c.id)} className="flex min-w-0 flex-1 items-center gap-2">
                  <Avatar avatar={c.avatar} nume={c.nume} className="h-8 w-8 text-[11px]" />
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-medium text-slate-900">{c.nume}</span>
                      {trimis && (
                        <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-emerald-100 px-1.5 text-[10px] font-medium text-emerald-700">
                          <Check className="h-3 w-3" /> trimis
                        </span>
                      )}
                    </span>
                    <span className="block truncate text-xs text-slate-500">
                      {e.abonament.tip} · ultima zi: {dataScurta(e.ultimaZi)} ({textZile(e.zile, e.ultimaZi)}) · {textRamase(e.ramase)}
                    </span>
                  </span>
                </Link>
                {areLink ? (
                  <ButonWhatsapp cursant={c} status={status(c.id)} tip="la_limita" mic onTrimis={() => marcheaza(c.id)} />
                ) : (
                  <span className="shrink-0 text-[11px] text-slate-400">fără telefon</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
