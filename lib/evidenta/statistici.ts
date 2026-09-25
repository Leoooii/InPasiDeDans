import type { Prezenta } from './tipuri';

/**
 * Prezența unui cursant într-o perioadă: câte ședințe s-au ținut în grupele lui
 * (zile cu prezență salvată) și la câte a venit. Recuperările din alte grupe se numără separat.
 */
export function statisticaPrezenta(prezente: Prezenta[], cursantId: string, grupe: string[], deLa: string, panaLa: string) {
  const inPerioada = prezente.filter(p => p.data >= deLa && p.data <= panaLa);
  const tinute = new Set(inPerioada.filter(p => grupe.includes(p.grupaId)).map(p => `${p.grupaId}_${p.data}`));
  const aleLui = inPerioada.filter(p => p.cursantId === cursantId);
  const venit = aleLui.filter(p => tinute.has(`${p.grupaId}_${p.data}`)).length;
  const recuperari = aleLui.filter(p => !grupe.includes(p.grupaId)).length;
  return {
    tinute: tinute.size,
    venit,
    recuperari,
    procent: tinute.size ? Math.round((venit / tinute.size) * 100) : null,
  };
}
