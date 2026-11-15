import { statusCursant, type CodStatus } from './abonament';
import { azi } from './date';
import type { Abonament, Cursant } from './tipuri';

// Câte locuri sunt ocupate într-o grupă, după evidență: cursanții activi, înscriși în
// grupă, care au acum un abonament în curs (activ, la limită sau Full Pass neînceput).
// E corect doar dacă toți cursanții grupei sunt trecuți în evidență.

const OCUPA_LOC: CodStatus[] = ['activ', 'la_limita', 'neinceput'];

/** grupaId → numărul de cursanți care ocupă un loc acum. */
export function ocupatePeGrupe(cursanti: Cursant[], abonamente: Abonament[], ziua = azi()): Record<string, number> {
  const pePersoana = new Map<string, Abonament[]>();
  for (const a of abonamente) {
    const lista = pePersoana.get(a.cursantId);
    if (lista) lista.push(a);
    else pePersoana.set(a.cursantId, [a]);
  }

  const rezultat: Record<string, number> = {};
  for (const c of cursanti) {
    if (c.activ !== true || !c.grupe?.length) continue;
    if (!OCUPA_LOC.includes(statusCursant(pePersoana.get(c.id) ?? [], ziua).cod)) continue;
    for (const g of new Set(c.grupe)) rezultat[g] = (rezultat[g] ?? 0) + 1;
  }
  return rezultat;
}

/** Locurile libere după evidență; null dacă grupa nu are locuri totale setate. */
export function libereDinEvidenta(locuriTotale: number, ocupate: number): number | null {
  return locuriTotale > 0 ? Math.max(0, locuriTotale - ocupate) : null;
}
