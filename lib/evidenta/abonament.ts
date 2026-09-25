import type { Tarif, TarifeGrupate } from '@/lib/types';
import { adaugaZile, azi, dataScurta, VALABILITATE_ZILE, zileIntre } from './date';
import type { Abonament, CategorieAbonament, IntrareJurnal } from './tipuri';

// Regulile abonamentelor, într-un singur loc (admin, portal instructori, dashboard, export).

export type TipAbonament = {
  tarifId: string;
  tip: string;
  categorie: CategorieAbonament;
  pret: number;
  sedinteTotal: number | null;
};

/** „Abonament 8" → 8, „Full Pass" → nelimitat, „Plata la ședință" → 1. */
export function sedinteDinTitlu(titlu: string): number | null {
  if (/full\s*pass/i.test(titlu)) return null;
  const n = titlu.match(/\d+/);
  return n ? Number(n[0]) : 1;
}

/** Abonamentele de grup (adulți) și de copii din /admin/tarife. Pachetele private nu intră. */
export function tipuriDinTarife(tarife: TarifeGrupate): TipAbonament[] {
  const din = (lista: Tarif[], categorie: CategorieAbonament) =>
    lista.map(t => ({
      tarifId: t.id,
      tip: t.titlu,
      categorie,
      pret: t.pret,
      sedinteTotal: sedinteDinTitlu(t.titlu),
    }));
  return [...din(tarife.grup, 'adulti'), ...din(tarife.copii, 'copii')];
}

export const esteFullPass = (a: Pick<Abonament, 'sedinteTotal'>) => a.sedinteTotal === null;

/** Perioada unui abonament vândut acum: 4 săptămâni de la start; Full Pass pornește la prima ședință. */
export function perioada(tip: Pick<TipAbonament, 'sedinteTotal'>, dataStart: string) {
  if (tip.sedinteTotal === null) return { dataStart: null, dataExpirare: null };
  return { dataStart, dataExpirare: adaugaZile(dataStart, VALABILITATE_ZILE) };
}

/** Ultima zi în care abonamentul mai e valabil. */
export const ultimaZi = (a: Abonament) => (a.dataExpirare ? adaugaZile(a.dataExpirare, -1) : null);

export const ramase = (a: Abonament) =>
  a.sedinteTotal === null ? Infinity : a.sedinteTotal - a.sedinteFolosite;

/** Poate acoperi o ședință în ziua `data`? */
export function acoperaZiua(a: Abonament, data: string): boolean {
  if (a.anulat || ramase(a) <= 0) return false;
  if (a.dataStart === null) return data >= a.dataVanzare; // Full Pass neînceput
  return data >= a.dataStart && !!a.dataExpirare && data < a.dataExpirare;
}

/** Abonamentul din care se scade o ședință: cel care expiră primul; Full Pass neînceput la final. */
export function alegeAbonament(abonamente: Abonament[], data: string): Abonament | null {
  const bune = abonamente.filter(a => acoperaZiua(a, data));
  bune.sort((x, y) => (x.dataExpirare ?? '9999') .localeCompare(y.dataExpirare ?? '9999'));
  return bune[0] ?? null;
}

/** Ce se schimbă pe abonament când i se adaugă o ședință. */
export function laSedintaNoua(a: Abonament, data: string): Partial<Abonament> {
  const modif: Partial<Abonament> = { sedinteFolosite: a.sedinteFolosite + 1 };
  if (a.dataStart === null) {
    modif.dataStart = data;
    modif.dataExpirare = adaugaZile(data, VALABILITATE_ZILE);
  }
  return modif;
}

// ── Status ──────────────────────────────────────────────────────────────

export type CodStatus = 'fara' | 'neinceput' | 'activ' | 'la_limita' | 'epuizat' | 'expirat';

export type StatusCursant = {
  cod: CodStatus;
  /** eticheta scurtă (badge) */
  eticheta: string;
  /** detaliul de sub nume: „5 ședințe rămase · până pe 12 oct" */
  detaliu: string;
  abonament: Abonament | null;
  /** cât de urgent e (0 = cel mai urgent), pentru sortare */
  ordine: number;
};

export const STIL_STATUS: Record<CodStatus, { badge: string; punct: string }> = {
  fara: { badge: 'bg-slate-100 text-slate-700 border-slate-200', punct: 'bg-slate-400' },
  expirat: { badge: 'bg-red-50 text-red-700 border-red-200', punct: 'bg-red-500' },
  epuizat: { badge: 'bg-red-50 text-red-700 border-red-200', punct: 'bg-red-500' },
  la_limita: { badge: 'bg-amber-50 text-amber-800 border-amber-200', punct: 'bg-amber-400' },
  neinceput: { badge: 'bg-sky-50 text-sky-700 border-sky-200', punct: 'bg-sky-400' },
  activ: { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', punct: 'bg-emerald-500' },
};

export const ETICHETE_STATUS: Record<CodStatus, string> = {
  fara: 'Fără abonament',
  expirat: 'Expirat',
  epuizat: 'Epuizat',
  la_limita: 'La limită',
  neinceput: 'Neînceput',
  activ: 'Activ',
};

const plural = (n: number, unu: string, multe: string) => `${n} ${n === 1 ? unu : multe}`;

function textRamase(a: Abonament): string {
  if (a.sedinteTotal === null) return 'nelimitat';
  const r = ramase(a);
  return r === 1 ? '1 ședință rămasă' : `${r} ședințe rămase`;
}

export function statusCursant(abonamente: Abonament[], ziua = azi()): StatusCursant {
  const valide = abonamente.filter(a => !a.anulat);
  const s = (cod: CodStatus, detaliu: string, abonament: Abonament | null): StatusCursant => ({
    cod,
    eticheta: ETICHETE_STATUS[cod],
    detaliu,
    abonament,
    ordine: { fara: 1, expirat: 0, epuizat: 0, la_limita: 2, neinceput: 3, activ: 4 }[cod],
  });

  if (!valide.length) return s('fara', 'Niciun abonament înregistrat', null);

  // Abonament care acoperă azi
  const curent = alegeAbonament(valide, ziua);
  if (curent) {
    if (curent.dataStart === null) {
      return s('neinceput', 'Full Pass · pornește la prima ședință', curent);
    }
    const zile = zileIntre(ziua, curent.dataExpirare!) ; // zile până la expirare (exclusiv)
    const detaliu = `${textRamase(curent)} · până pe ${dataScurta(ultimaZi(curent))}`;
    const laLimita = ramase(curent) <= 2 || zile <= 3;
    return s(laLimita ? 'la_limita' : 'activ', detaliu, curent);
  }

  // Abonament cumpărat, dar care începe mai târziu
  const viitor = valide.filter(a => a.dataStart && a.dataStart > ziua).sort((a, b) => a.dataStart!.localeCompare(b.dataStart!))[0];
  if (viitor) return s('neinceput', `Începe pe ${dataScurta(viitor.dataStart)}`, viitor);

  // Cel mai recent abonament: a expirat sau s-a terminat
  const ultim = [...valide].sort((a, b) => b.dataVanzare.localeCompare(a.dataVanzare) || b.createdAt - a.createdAt)[0];
  if (ultim.dataExpirare && ultim.dataExpirare <= ziua) {
    return s('expirat', `${ultim.tip} · expirat pe ${dataScurta(ultim.dataExpirare)}`, ultim);
  }
  return s('epuizat', `${ultim.tip} · toate cele ${ultim.sedinteTotal} ședințe folosite`, ultim);
}

// ── Avertizări calculate (apar în istoric și în panoul „De rezolvat") ───

const SISTEM = { uid: 'sistem', nume: 'Sistem', rol: 'admin' as const };
const msZi = (d: string) => new Date(`${d}T09:00:00+03:00`).getTime();

export function avertizari(abonamente: Abonament[], ziua = azi()): IntrareJurnal[] {
  const rez: IntrareJurnal[] = [];
  for (const a of abonamente) {
    if (a.anulat) continue;
    const baza = { cursantId: a.cursantId, abonamentId: a.id, actor: SISTEM, calculat: true };
    if (a.dataExpirare && a.dataExpirare <= ziua) {
      rez.push({
        ...baza,
        id: `exp-${a.id}`,
        tip: 'abonament_expirat',
        mesaj: `${a.cursantNume}: ${a.tip} a expirat (${plural(a.sedinteFolosite, 'ședință folosită', 'ședințe folosite')}${a.sedinteTotal ? ` din ${a.sedinteTotal}` : ''})`,
        createdAt: msZi(a.dataExpirare),
      });
    } else if (a.dataExpirare && zileIntre(ziua, a.dataExpirare) <= 3 && ramase(a) > 0) {
      const zile = zileIntre(ziua, a.dataExpirare);
      rez.push({
        ...baza,
        id: `exp-curand-${a.id}`,
        tip: 'abonament_expira',
        mesaj: `${a.cursantNume}: ${a.tip} expiră ${zile === 1 ? 'mâine' : `în ${zile} zile`} (ultima zi: ${dataScurta(ultimaZi(a))})`,
        createdAt: msZi(ziua),
      });
    }
    if (a.sedinteTotal !== null && ramase(a) <= 0 && (!a.dataExpirare || a.dataExpirare > ziua)) {
      rez.push({
        ...baza,
        id: `epuizat-${a.id}`,
        tip: 'abonament_epuizat',
        mesaj: `${a.cursantNume}: ${a.tip} are toate cele ${a.sedinteTotal} ședințe folosite`,
        createdAt: msZi(ziua),
      });
    }
  }
  return rez;
}
