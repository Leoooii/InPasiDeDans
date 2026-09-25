import { BUSINESS } from '@/lib/schema-constants';

// Schema.org Event comună pentru petreceri, excursii și evenimente (concursuri).
// Google cere pentru rezultatele de tip Eveniment și câmpurile recomandate
// endDate, performer și offers — lipsa lor apare ca avertisment în Search Console.

type Params = {
  nume: string;
  descriere?: string;
  /** ISO 8601 (dată sau dată + oră) */
  start: string;
  end?: string;
  imagine?: string;
  /** pagina de pe site */
  url: string;
  /** unde se cumpără / se face înscrierea (ex. evenimentul de Facebook); altfel pagina de pe site */
  urlInscriere?: string;
  locatie?: string;
};

// Link-urile sunt introduse de mână în admin; unul lipit greșit nu intră în schemă.
const urlValid = (u?: string) => !!u && /^https?:\/\/[^\s]+$/.test(u) && u.lastIndexOf('http') === 0;

export function schemaEveniment({ nume, descriere, start, end, imagine, url, urlInscriere, locatie }: Params) {
  const organizatie = {
    '@type': 'DanceSchool',
    '@id': `${BUSINESS.url}/#organization`,
    name: BUSINESS.name,
    url: BUSINESS.url,
  };

  const endDate = end ?? start.slice(0, 10);
  const viitor = endDate.slice(0, 10) >= new Date().toISOString().slice(0, 10);

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: nume,
    description: descriere,
    startDate: start,
    // Eveniment de o zi fără oră de final: se termină în aceeași zi.
    endDate,
    image: imagine ? [imagine] : undefined,
    url,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: locatie?.trim()
      ? { '@type': 'Place', name: locatie.trim(), address: locatie.trim() }
      : { '@type': 'Place', name: BUSINESS.name, address: BUSINESS.address },
    organizer: organizatie,
    // Instructorii și cursanții școlii sunt cei care dansează.
    performer: { '@type': 'PerformingGroup', name: BUSINESS.name, url: BUSINESS.url },
    offers: {
      '@type': 'Offer',
      url: urlValid(urlInscriere) ? urlInscriere : url,
      availability: viitor ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    },
  };
}
