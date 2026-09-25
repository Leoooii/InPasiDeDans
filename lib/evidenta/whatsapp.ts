'use client';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ramase, ultimaZi, type CodStatus, type StatusCursant } from './abonament';
import { dataScurta } from './date';

// Mesaje pe WhatsApp către cursanți: se deschide WhatsApp cu textul pregătit,
// instructorul/adminul îl verifică și îl trimite (fără costuri de SMS).
// Textele sunt șabloane cu variabile ({nume}, {abonament}...), editabile din aplicație;
// adminul le poate salva ca text implicit pentru toți (Firestore: setari/whatsapp).

export type TipMesaj = 'expirat' | 'epuizat' | 'la_limita' | 'fara' | 'general';

export const TIPURI_MESAJ: { tip: TipMesaj; eticheta: string }[] = [
  { tip: 'expirat', eticheta: 'Abonament expirat' },
  { tip: 'epuizat', eticheta: 'Ședințe terminate' },
  { tip: 'la_limita', eticheta: 'Se apropie de final' },
  { tip: 'fara', eticheta: 'Fără abonament' },
  { tip: 'general', eticheta: 'Mesaj liber' },
];

export const VARIABILE: { cheie: string; descriere: string }[] = [
  { cheie: '{nume}', descriere: 'numele complet' },
  { cheie: '{abonament}', descriere: 'tipul abonamentului' },
  { cheie: '{expira}', descriere: 'ultima zi valabilă / data expirării' },
  { cheie: '{ramase}', descriere: 'ședințe rămase' },
];

const SEMNATURA = '\n\nȘcoala de dans În Pași de Dans';

export const SABLOANE_IMPLICITE: Record<TipMesaj, string> = {
  expirat: `Bună, {nume}! Abonamentul tău ({abonament}) a expirat pe {expira}. Te așteptăm în continuare la cursuri — îl poți reînnoi la următoarea ședință.${SEMNATURA}`,
  epuizat: `Bună, {nume}! Ai folosit toate ședințele din abonamentul tău ({abonament}). Te așteptăm în continuare la cursuri — îl poți reînnoi la următoarea ședință.${SEMNATURA}`,
  la_limita: `Bună, {nume}! Abonamentul tău ({abonament}) mai are {ramase} și e valabil până pe {expira}. Ne vedem la curs!${SEMNATURA}`,
  fara: `Bună, {nume}! Îți reamintim că pentru cursuri este nevoie de un abonament. Îl poți achita la următoarea ședință.${SEMNATURA}`,
  general: `Bună, {nume}! ${SEMNATURA}`,
};

export type Sabloane = Record<TipMesaj, string>;

/** Ce șablon se potrivește statusului abonamentului. */
export function tipMesaj(cod: CodStatus): TipMesaj {
  return cod === 'expirat' || cod === 'epuizat' || cod === 'la_limita' || cod === 'fara' ? cod : 'general';
}

/** Valorile variabilelor pentru un cursant. */
export function valori(nume: string, st: StatusCursant): Record<string, string> {
  const a = st.abonament;
  const r = a && a.sedinteTotal !== null ? Math.max(0, ramase(a)) : null;
  return {
    '{nume}': nume.trim(),
    '{abonament}': a?.tip ?? 'abonament',
    '{expira}': dataScurta(a ? (st.cod === 'expirat' ? a.dataExpirare : ultimaZi(a)) : null),
    '{ramase}': r === null ? 'ședințe nelimitate' : `${r} ${r === 1 ? 'ședință' : 'ședințe'}`,
  };
}

export function completeaza(sablon: string, v: Record<string, string>): string {
  return Object.entries(v).reduce((text, [k, val]) => text.split(k).join(val), sablon);
}

/** „0722 675 126” → „40722675126” (format internațional, fără +). */
export function telefonInternational(tel: string): string | null {
  let d = tel.replace(/\D/g, '');
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('0')) d = `40${d.slice(1)}`;
  if (d.length === 9 && d.startsWith('7')) d = `40${d}`;
  return d.length >= 10 ? d : null;
}

export function linkWhatsapp(tel: string, text: string): string | null {
  const nr = telefonInternational(tel);
  return nr ? `https://wa.me/${nr}?text=${encodeURIComponent(text)}` : null;
}

// ── Șabloanele salvate (comune pentru toată lumea) ──────────────────────

const EVENIMENT = 'sabloane-whatsapp';
let cache: Promise<Sabloane> | null = null;

export function incarcaSabloane(): Promise<Sabloane> {
  cache ??= getDoc(doc(db, 'setari', 'whatsapp'))
    .then(d => ({ ...SABLOANE_IMPLICITE, ...((d.data() as Partial<Sabloane>) ?? {}) }))
    .catch(() => ({ ...SABLOANE_IMPLICITE }));
  return cache;
}

/** Doar adminul: textul devine implicit pentru toți cursanții. */
export async function salveazaSablon(tip: TipMesaj, text: string) {
  await setDoc(doc(db, 'setari', 'whatsapp'), { [tip]: text }, { merge: true });
  cache = null;
  window.dispatchEvent(new Event(EVENIMENT));
}

export function laSabloaneSchimbate(fn: () => void) {
  window.addEventListener(EVENIMENT, fn);
  return () => window.removeEventListener(EVENIMENT, fn);
}
