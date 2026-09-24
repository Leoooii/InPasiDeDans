import type { IntrebareFaq } from '@/components/faq-block';
import type { Tarif, TarifeGrupate } from '@/lib/public-data';

// Conținut FAQ construit doar din informațiile publicate deja pe site;
// prețurile vin din Firestore, ca răspunsurile să nu rămână în urmă.

const lei = (t?: Tarif) => (t ? `${t.pret} ${t.moneda.toLowerCase()}` : undefined);
const gaseste = (lista: Tarif[] | undefined, text: string) =>
  lista?.find(t => t.titlu.toLowerCase().includes(text.toLowerCase()));

function pachetePrivate(tarife: TarifeGrupate | null) {
  const pachete = (tarife?.privat ?? []).filter(t => t.titlu.startsWith('Pachet'));
  if (!pachete.length) return 'Pachetele de 4, 6 și 8 ședințe sunt afișate pe pagina Tarife';
  return pachete
    .map(t => {
      const valab = t.beneficii.find(b => b.startsWith('Valabilitate'));
      return `${t.titlu.toLowerCase()} – ${lei(t)}${valab ? ` (${valab.toLowerCase()})` : ''}`;
    })
    .join(', ');
}

const ANULARE =
  'Anularea sau reprogramarea unei ședințe se face telefonic, cu cel puțin 24 de ore înainte; altfel ședința se consideră efectuată.';

const PROBA =
  'Da, dacă avem deschisă o grupă de nivel începător, puteți participa la o ședință de probă gratuită. Dacă aveți deja experiență, vă putem invita la o lecție într-o grupă de nivel potrivit.';

export function faqDansulMirilor(tarife: TarifeGrupate | null): IntrebareFaq[] {
  const laSedinta = lei(gaseste(tarife?.privat, 'Plata la ședință'));
  const restaurant = lei(gaseste(tarife?.privat, 'restaurant'));
  return [
    {
      q: 'Cât costă lecțiile pentru dansul mirilor?',
      a: `Pachetele pentru dansul mirilor sunt: ${pachetePrivate(tarife)}.${laSedinta ? ` Plata la ședință este ${laSedinta}.` : ''} La pachete, plata se face integral la prima ședință.`,
    },
    {
      q: 'Câte ședințe sunt necesare pentru dansul mirilor?',
      a: 'Depinde de coregrafie: pachetul de 4 ședințe e potrivit pentru o coregrafie simplă, cel de 6 pentru o coregrafie cu grad mediu de dificultate, iar cel de 8 pentru o coregrafie personalizată de nivel mediu sau ridicat.',
    },
    {
      q: 'Cât durează o ședință?',
      a: 'O ședință privată durează 60 de minute.',
    },
    {
      q: 'Unde au loc ședințele?',
      a: `În săli private ale școlii, pe Calea Rahovei 262, Sector 5, București — veți fi doar voi și instructorul în sală.${restaurant ? ` La cerere, dacă instructorul are disponibilitate și restaurantul este în București, se poate face și o ședință la restaurant (${restaurant}).` : ''}`,
    },
    {
      q: 'Putem programa ședințele în weekend?',
      a: 'Da. Programăm ședințele în funcție de disponibilitatea voastră, inclusiv în weekend.',
    },
    {
      q: 'Ce stil de dans putem alege pentru nuntă?',
      a: 'Vals clasic, tango, un dans latino sau o combinație surpriză, pe melodia aleasă de voi. Coregrafia se adaptează nivelului și stilului vostru, iar melodia poate fi editată personalizat.',
    },
    {
      q: 'Primim o înregistrare a coregrafiei?',
      a: 'Da, pachetele includ înregistrarea video a coregrafiei, ca să o puteți exersa și acasă.',
    },
    {
      q: 'Ne puteți ajuta și cu alte dansuri la nuntă?',
      a: 'Da: dansul cu părinții sau nașii, dansuri de grup sau coregrafii surpriză pentru invitați.',
    },
    { q: 'Cum se anulează sau se reprogramează o ședință?', a: ANULARE },
  ];
}

export function faqLectiiPrivate(tarife: TarifeGrupate | null): IntrebareFaq[] {
  const laSedinta = lei(gaseste(tarife?.privat, 'Plata la ședință'));
  return [
    {
      q: 'Cât costă o lecție privată de dans?',
      a: `${laSedinta ? `O lecție privată costă ${laSedinta} la plata pe ședință. ` : ''}Există și pachete: ${pachetePrivate(tarife)}.`,
    },
    {
      q: 'Pentru cine sunt potrivite lecțiile private?',
      a: 'Pentru orice nivel: pentru cei care nu pot participa constant la cursurile de grup, pentru cei care preferă să învețe în ritmul propriu, fără presiunea grupului, și pentru cei care vor să aprofundeze tehnica unui anumit stil.',
    },
    {
      q: 'Ce stiluri de dans pot învăța la lecțiile private?',
      a: 'Dansuri latino, dansuri de societate, dansuri populare sau dansul pentru nuntă — alegeți ce vreți să învățați.',
    },
    {
      q: 'Când și unde au loc lecțiile private?',
      a: 'În sală privată, pe Calea Rahovei 262, Sector 5, București. Orarul se stabilește împreună, în funcție de disponibilitatea voastră, inclusiv în weekend. O ședință durează 60 de minute.',
    },
    { q: 'Cum se anulează sau se reprogramează o lecție?', a: ANULARE },
  ];
}

export function faqTarife(tarife: TarifeGrupate | null): IntrebareFaq[] {
  const grup = tarife?.grup ?? [];
  const abonamente = grup.filter(t => !t.titlu.toLowerCase().includes('ședință'));
  const laSedintaGrup = lei(gaseste(grup, 'ședință'));
  const laSedintaCopii = lei(gaseste(tarife?.copii, 'ședință'));
  return [
    {
      q: 'Cât costă un abonament la cursurile de dans pentru adulți?',
      a: abonamente.length
        ? `${abonamente.map(t => `${t.titlu} – ${lei(t)}`).join(', ')}. Abonamentele sunt valabile 4 săptămâni și pot fi folosite la orice grupă (dansuri populare, latino, de societate, salsa și bachata).`
        : 'Tarifele actualizate sunt afișate pe această pagină.',
    },
    ...(laSedintaGrup
      ? [{ q: 'Pot plăti la fiecare ședință, fără abonament?', a: `Da. O ședință la un curs de grup pentru adulți costă ${laSedintaGrup}${laSedintaCopii ? `, iar pentru copii ${laSedintaCopii}` : ''}.` }]
      : []),
    ...(tarife?.copii.length
      ? [{ q: 'Cât costă cursurile de dans pentru copii?', a: `Abonamentele pentru copii sunt: ${tarife.copii.map(t => `${t.titlu} – ${lei(t)}`).join(', ')}.` }]
      : []),
    {
      q: 'Pot recupera o ședință pierdută?',
      a: 'Da, ședințele pierdute pot fi recuperate la alte grupe, dacă există o grupă de nivel apropiat sau sub nivelul dumneavoastră. Dacă recuperarea nu este posibilă, abonamentul nu poate fi prelungit.',
    },
    { q: 'Există o ședință de probă gratuită?', a: PROBA },
    {
      q: 'Cât costă lecțiile private și dansul mirilor?',
      a: `Pachetele de lecții private sunt: ${pachetePrivate(tarife)}.`,
    },
  ];
}

export const FAQ_CONTACT: IntrebareFaq[] = [
  {
    q: 'Unde se află școala de dans În Pași de Dans?',
    a: 'Pe Calea Rahovei 262, Sector 5, București (cod poștal 050897).',
  },
  {
    q: 'Care este programul școlii?',
    a: 'Recepția și telefonul: luni–vineri 10:00–17:00 și sâmbătă 14:00–18:00. Cursurile au loc după orarul fiecărei grupe, afișat pe pagina Program.',
  },
  {
    q: 'Cum mă pot înscrie la un curs de dans?',
    a: 'Completând formularul de înscriere de pe site, telefonic la 0722 675 126 sau pe email la inpasidedans@gmail.com. Dacă nu există o grupă potrivită, vă trecem pe lista de așteptare și vă anunțăm când se deschide una nouă.',
  },
  { q: 'Pot veni la o lecție de probă?', a: PROBA },
  {
    q: 'Trebuie să vin cu partener?',
    a: 'Nu. Mulți cursanți vin singuri; la dansurile în pereche folosim un sistem de rotație, astfel încât toată lumea dansează.',
  },
];
