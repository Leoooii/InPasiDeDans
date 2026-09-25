'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTarife } from '@/components/tarif-card';
import { statusCursant, tipuriDinTarife, type StatusCursant, type TipAbonament } from '@/lib/evidenta/abonament';
import { incarcaAbonamente, incarcaCursanti, incarcaGrupe } from '@/lib/evidenta/repo';
import type { Abonament, Actor, Cursant, GrupaEvidenta } from '@/lib/evidenta/tipuri';

// Datele evidenței încărcate o dată și împărțite între ecrane (admin sau portalul instructorului).

type Evidenta = {
  actor: Actor;
  esteAdmin: boolean;
  /** grupele pe care le vede utilizatorul (toate pentru admin, cele atribuite pentru instructor) */
  grupe: GrupaEvidenta[];
  toateGrupele: GrupaEvidenta[];
  cursanti: Cursant[];
  abonamente: Abonament[];
  tipuri: TipAbonament[];
  status: (cursantId: string) => StatusCursant;
  abonamenteCursant: (cursantId: string) => Abonament[];
  grupa: (id: string) => GrupaEvidenta | undefined;
  loading: boolean;
  eroare: string | null;
  reincarca: () => Promise<void>;
};

const Ctx = createContext<Evidenta | null>(null);

export function useEvidenta() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useEvidenta în afara EvidentaProvider');
  return v;
}

export function EvidentaProvider({
  actor,
  grupePermise,
  children,
}: {
  actor: Actor;
  /** null = toate (admin) */
  grupePermise: string[] | null;
  children: React.ReactNode;
}) {
  const [toateGrupele, setGrupe] = useState<GrupaEvidenta[]>([]);
  const [cursanti, setCursanti] = useState<Cursant[]>([]);
  const [abonamente, setAbonamente] = useState<Abonament[]>([]);
  const [loading, setLoading] = useState(true);
  const [eroare, setEroare] = useState<string | null>(null);
  const tarifeGrup = useTarife('grup');
  const tarifeCopii = useTarife('copii');

  const reincarca = useCallback(async () => {
    try {
      const [g, c, a] = await Promise.all([incarcaGrupe(), incarcaCursanti(), incarcaAbonamente()]);
      setGrupe(g);
      setCursanti(c);
      setAbonamente(a);
      setEroare(null);
    } catch (e) {
      console.error(e);
      setEroare('Datele nu au putut fi încărcate. Verifică conexiunea și reîncearcă.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reincarca();
  }, [reincarca]);

  const valoare = useMemo<Evidenta>(() => {
    const pe = new Map<string, Abonament[]>();
    for (const a of abonamente) pe.set(a.cursantId, [...(pe.get(a.cursantId) ?? []), a]);
    const cache = new Map<string, StatusCursant>();
    const grupe = grupePermise ? toateGrupele.filter(g => grupePermise.includes(g.id)) : toateGrupele;
    return {
      actor,
      esteAdmin: actor.rol === 'admin',
      grupe,
      toateGrupele,
      cursanti,
      abonamente,
      tipuri: tipuriDinTarife({ grup: tarifeGrup, copii: tarifeCopii, privat: [] }),
      abonamenteCursant: id => pe.get(id) ?? [],
      status: id => {
        if (!cache.has(id)) cache.set(id, statusCursant(pe.get(id) ?? []));
        return cache.get(id)!;
      },
      grupa: id => toateGrupele.find(g => g.id === id),
      loading,
      eroare,
      reincarca,
    };
  }, [actor, grupePermise, toateGrupele, cursanti, abonamente, tarifeGrup, tarifeCopii, loading, eroare, reincarca]);

  return (
    <Ctx.Provider value={valoare}>
      {eroare && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <span className="flex-1">{eroare}</span>
          <button className="font-semibold underline" onClick={() => void reincarca()}>
            Reîncearcă
          </button>
        </div>
      )}
      {children}
    </Ctx.Provider>
  );
}
