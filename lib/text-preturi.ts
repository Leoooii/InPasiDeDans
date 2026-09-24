import type { TarifeGrupate } from '@/lib/public-data';

// Răspunsurile FAQ despre prețuri, generate din tarifele reale, ca Google și
// asistenții AI să citeze cifre corecte (textele statice ajung să fie depășite).

const lista = (t: TarifeGrupate[keyof TarifeGrupate]) =>
  t.map(x => `${x.titlu} – ${x.pret} ${x.moneda.toLowerCase()}`).join(', ');

export function raspunsPretAdulti(tarife: TarifeGrupate | null, rezerva: string) {
  if (!tarife?.grup.length) return rezerva;
  return `Tarifele pentru cursurile de grup sunt: ${lista(tarife.grup)}. Abonamentele sunt valabile 4 săptămâni. Lecțiile private și dansul mirilor au tarife separate, afișate pe pagina Tarife.`;
}

export function raspunsPretCopii(tarife: TarifeGrupate | null, rezerva: string) {
  if (!tarife?.copii.length) return rezerva;
  return `Tarifele pentru cursurile de dans pentru copii sunt: ${lista(tarife.copii)}.`;
}

export const ePretIntrebare = (intrebare: string) => intrebare.startsWith('Cât costă');
