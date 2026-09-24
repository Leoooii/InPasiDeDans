import type { Tarif, TarifeGrupate } from '@/lib/types';

// Copie a colecției `tarife` din Firestore, folosită doar dacă citirea eșuează.
// Țin-o aliniată cu ce e salvat din /admin/tarife.
const t = (categorie: Tarif['categorie'], ordine: number, titlu: string, pret: number, descriere = '', beneficii: string[] = [], popular = false): Tarif => ({
  id: `${categorie}-${ordine}`,
  titlu,
  descriere,
  pret,
  moneda: 'Lei',
  categorie,
  beneficii,
  popular,
  ordine,
});

const ORICE_GRUPA = 'Valabil pentru orice grupă (dans popular, dansuri latino & de societate, bachata & salsa)';

export const TARIFE_REZERVA: TarifeGrupate = {
  grup: [
    t('grup', 1, 'Abonament 8', 260, 'Valabil 4 săptămâni', ['8 ședințe pe lună', 'Acces la o singură grupă', ORICE_GRUPA]),
    t('grup', 2, 'Abonament 16', 370, 'Valabil 4 săptămâni', ['16 ședințe pe lună', 'Acces la 2 grupe', ORICE_GRUPA], true),
    t('grup', 3, 'Abonament Full Pass', 450, 'Valabil 4 săptămâni', ['Acces nelimitat la grupe', 'Valabil începând cu prima ședință efectuată', 'Permite acces la toate grupele în desfășurare la momentul achiziționării']),
    t('grup', 4, 'Plata la ședință', 50, 'Orice stil de dans', ['O ședință la grup', `Tarif ${ORICE_GRUPA.toLowerCase()}`]),
  ],
  privat: [
    t('privat', 1, 'Pachet 4 ședințe', 680, 'Ideal pentru cuplurile care doresc un dans simplu și elegant.', ['4 ședințe private (60 min/sed)', 'Valabilitate 2 luni', 'Coregrafie simplă pe melodia aleasă', 'Înregistrare video a coregrafiei', 'Editare personalizată a melodiei']),
    t('privat', 2, 'Pachet 6 ședințe', 960, 'Pentru cuplurile care doresc un dans memorabil cu elemente speciale.', ['6 ședințe private (60 min/sed)', 'Valabilitate 3 luni', 'Coregrafie cu grad de dificultate mediu pe melodia aleasă', 'Înregistrare video a coregrafiei', 'Editare personalizată a melodiei'], true),
    t('privat', 3, 'Pachet 8 ședințe', 1200, 'Experiența completă pentru un moment cu adevărat spectaculos.', ['8 ședințe private (60 min/sed)', 'Valabilitate 4 luni', 'Coregrafie personalizată cu grad de dificultate mediu sau ridicat, ținând cont de abilitățile voastre', 'Înregistrare video a coregrafiei', 'Editare personalizată a melodiei']),
    t('privat', 4, 'Plata la ședință', 200),
    t('privat', 5, 'Ședință la restaurant', 300, 'La cerere, dacă instructorul are disponibilitate și restaurantul este în București.'),
  ],
  copii: [
    t('copii', 2, 'Abonament 8', 200, 'Valabil o lună (8 ședințe)', ['8 ședințe pe lună', '2 ședințe pe săptămână', 'Acces la grupe pentru copii']),
    t('copii', 3, 'Abonament 12', 250, 'Valabil o lună (12 ședințe)', ['12 ședințe pe lună', '3 ședințe pe săptămână', 'Acces la grupe pentru copii']),
    t('copii', 4, 'Plata la ședință', 35, 'Ședință de grup', ['O ședință la grup', 'Acces la grupe pentru copii']),
  ],
};
