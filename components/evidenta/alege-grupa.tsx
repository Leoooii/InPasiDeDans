'use client';

import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { instructoriDin, predaInstructorul } from '@/lib/evidenta/instructori-grupe';
import type { GrupaEvidenta } from '@/lib/evidenta/tipuri';

const SELECT = 'h-11 w-full min-w-0 rounded-md border border-input bg-white px-3 text-sm disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400';

/**
 * Alegerea unei grupe în doi pași: întâi instructorul, apoi grupele lui.
 * Cu un singur instructor posibil (ex. în portalul instructorului), pasul 1 se sare.
 */
export function AlegeGrupa({
  grupe,
  exclude = [],
  onAlege,
  textButon = 'Adaugă',
}: {
  grupe: GrupaEvidenta[];
  /** grupele deja alese (nu mai apar) */
  exclude?: string[];
  onAlege: (g: GrupaEvidenta) => void;
  textButon?: string;
}) {
  const instructori = useMemo(() => instructoriDin(grupe), [grupe]);
  const unSingur = instructori.length <= 1;
  const [instructor, setInstructor] = useState('');
  const [grupaId, setGrupaId] = useState('');

  const disponibile = grupe.filter(g => !exclude.includes(g.id) && (unSingur || (instructor && predaInstructorul(g, instructor))));

  const adauga = () => {
    const g = grupe.find(x => x.id === grupaId);
    if (!g) return;
    onAlege(g);
    setGrupaId('');
  };

  return (
    <div className="flex flex-col gap-2 [&>*]:min-w-0">
      {!unSingur && (
        <select
          aria-label="Instructor"
          className={SELECT}
          value={instructor}
          onChange={e => {
            setInstructor(e.target.value);
            setGrupaId('');
          }}
        >
          <option value="">1. Alege instructorul</option>
          {instructori.map(i => (
            <option key={i.cheie} value={i.cheie}>
              {i.nume}
            </option>
          ))}
        </select>
      )}
      <select
        aria-label="Grupă"
        className={SELECT}
        value={grupaId}
        disabled={!unSingur && !instructor}
        onChange={e => setGrupaId(e.target.value)}
      >
        <option value="">
          {!unSingur && !instructor ? '2. Alege întâi instructorul' : disponibile.length ? `${unSingur ? '' : '2. '}Alege grupa` : 'Nicio grupă disponibilă'}
        </option>
        {disponibile.map(g => (
          <option key={g.id} value={g.id}>
            {g.titlu}
            {g.zile.length ? ` · ${g.zile.join(', ')}` : ''}
            {g.ora ? ` ${g.ora}` : ''}
          </option>
        ))}
      </select>
      <Button type="button" variant="outline" className="h-11" disabled={!grupaId} onClick={adauga}>
        <Plus className="mr-1.5 h-4 w-4" />
        {textButon}
      </Button>
    </div>
  );
}
