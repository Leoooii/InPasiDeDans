// Datele din evidență sunt șiruri „YYYY-MM-DD" în ora României, ca să nu depindă
// de fusul orar al telefonului sau al serverului (UTC ar muta ziua după miezul nopții).

export const FUS_ORAR = 'Europe/Bucharest';

/** Abonamentele țin 4 săptămâni (regula școlii, afișată și pe /tarife). */
export const VALABILITATE_ZILE = 28;

const ZILE = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];
const LUNI = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const LUNI_LUNG = [
  'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
  'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie',
];

export function azi(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: FUS_ORAR,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

const parte = (d: string) => d.split('-').map(Number) as [number, number, number];
const utc = (d: string) => {
  const [y, m, z] = parte(d);
  return Date.UTC(y, m - 1, z);
};

export function adaugaZile(d: string, n: number): string {
  return new Date(utc(d) + n * 86_400_000).toISOString().slice(0, 10);
}

/** Câte zile sunt de la `a` până la `b` (negativ dacă b e înainte). */
export function zileIntre(a: string, b: string): number {
  return Math.round((utc(b) - utc(a)) / 86_400_000);
}

export function numeZi(d: string): string {
  return ZILE[new Date(utc(d)).getUTCDay()];
}

/** „25 sep" sau „25 sep 2025" dacă nu e anul curent. */
export function dataScurta(d: string | null | undefined): string {
  if (!d) return '—';
  const [y, m, z] = parte(d);
  return `${z} ${LUNI[m - 1]}${y !== parte(azi())[0] ? ` ${y}` : ''}`;
}

/** „joi, 25 septembrie 2026" */
export function dataLunga(d: string): string {
  const [y, m, z] = parte(d);
  return `${numeZi(d).toLowerCase()}, ${z} ${LUNI_LUNG[m - 1]} ${y}`;
}

/** „septembrie 2026" pentru gruparea pe luni. */
export function lunaAn(d: string): string {
  const [y, m] = parte(d);
  return `${LUNI_LUNG[m - 1]} ${y}`;
}

/** Ziua (în ora României) a unui moment în ms. */
export function ziuaDin(ms: number): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: FUS_ORAR,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(ms));
}

export function oraDin(ms: number): string {
  return new Intl.DateTimeFormat('ro-RO', { timeZone: FUS_ORAR, hour: '2-digit', minute: '2-digit' }).format(
    new Date(ms),
  );
}

/** Minutele trecute de la miezul nopții, în ora României. */
export function minuteAcum(d = new Date()): number {
  const [h, m] = new Intl.DateTimeFormat('en-GB', { timeZone: FUS_ORAR, hour: '2-digit', minute: '2-digit', hour12: false })
    .format(d)
    .split(':')
    .map(Number);
  return (h % 24) * 60 + m;
}

/** „19:45 - 21:00” → minute de start/final (fără final: o oră). */
export function intervalOra(ora: string): { start: number; final: number } | null {
  const m = ora.match(/(\d{1,2}):(\d{2})(?:\s*-\s*(\d{1,2}):(\d{2}))?/);
  if (!m) return null;
  const start = Number(m[1]) * 60 + Number(m[2]);
  const final = m[3] ? Number(m[3]) * 60 + Number(m[4]) : start + 60;
  return { start, final: final > start ? final : final + 24 * 60 };
}
