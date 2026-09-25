import type { GrupaEvidenta } from './tipuri';

// Numele instructorilor scrise în grupe („Alexandra și Nicholas", „Catalina"/„Cătălina")
// transformate într-o listă unică, pentru filtrele „instructor → grupă".

export const cheie = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

const areDiacritice = (s: string) => s.normalize('NFD') !== s;

const numeDin = (g: GrupaEvidenta) =>
  g.instructor
    .split(/\s*[,&+]\s*|\s+(?:și|si)\s+/i)
    .map(s => s.trim())
    .filter(Boolean);

export type InstructorGrupe = { cheie: string; nume: string };

export function instructoriDin(grupe: GrupaEvidenta[]): InstructorGrupe[] {
  const m = new Map<string, string>();
  for (const g of grupe)
    for (const n of numeDin(g)) {
      const k = cheie(n);
      const vechi = m.get(k);
      // păstrează varianta cu diacritice („Cătălina", nu „Catalina")
      if (!vechi || (areDiacritice(n) && !areDiacritice(vechi))) m.set(k, n);
    }
  return [...m.entries()].map(([k, nume]) => ({ cheie: k, nume })).sort((a, b) => a.nume.localeCompare(b.nume, 'ro'));
}

export const predaInstructorul = (g: GrupaEvidenta, cheieInstructor: string) => numeDin(g).some(n => cheie(n) === cheieInstructor);
