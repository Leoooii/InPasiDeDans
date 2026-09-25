'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePublicData } from '@/components/public-data-provider';
import { incarcaConturiPublice, type ContPublic } from '@/lib/evidenta/conturi-publice';
import { cheie } from '@/lib/evidenta/instructori-grupe';
import type { GrupaEvidenta } from '@/lib/evidenta/tipuri';
import { cn } from '@/lib/utils';
import { Avatar } from './avatar';

// Pozele instructorilor, după prenume: avatarul contului (dacă l-au ales) sau poza de pe site.

let cacheConturi: Promise<ContPublic[]> | null = null;

export function usePozeInstructori() {
  const { instructori } = usePublicData();
  const [conturi, setConturi] = useState<ContPublic[]>([]);

  useEffect(() => {
    cacheConturi ??= incarcaConturiPublice().catch(() => []);
    cacheConturi.then(setConturi);
  }, []);

  return useMemo(() => {
    const m = new Map<string, { nume: string; avatar: string }>();
    const prenume = (n: string) => cheie(n.split(/\s+/)[0] ?? '');
    for (const i of instructori ?? []) m.set(prenume(i.name), { nume: i.name, avatar: i.imageUrl });
    for (const c of conturi) {
      const k = prenume(c.nume);
      if (c.avatar) m.set(k, { nume: m.get(k)?.nume ?? c.nume, avatar: c.avatar });
    }
    /** după cheia prenumelui (ex. „catalina”) */
    return (k: string) => m.get(k) ?? null;
  }, [instructori, conturi]);
}

const numeDinGrupa = (g: GrupaEvidenta) =>
  g.instructor
    .split(/\s*[,&+]\s*|\s+(?:și|si)\s+/i)
    .map(s => s.trim())
    .filter(Boolean);

/** Pozele instructorilor unei grupe, suprapuse (una sau două). */
export function PozeGrupa({ g, className }: { g: GrupaEvidenta; className?: string }) {
  const poza = usePozeInstructori();
  const lista = numeDinGrupa(g).map(n => ({ n, p: poza(cheie(n)) }));
  if (!lista.length) return null;
  return (
    <span className="flex shrink-0 -space-x-2" title={g.instructor}>
      {lista.map(({ n, p }) => (
        <Avatar key={n} avatar={p?.avatar} nume={p?.nume ?? n} className={cn('h-9 w-9 text-[11px] ring-2 ring-white', className)} />
      ))}
    </span>
  );
}
