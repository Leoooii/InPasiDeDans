import ExcursieClient, { type ExcursieDetaliu } from './ExcursieClient';
import { getDocCached } from '@/lib/firestore-cache';
import { dateEvenimentIso } from '@/lib/data-ro';
import { BUSINESS } from '@/lib/schema-constants';

export const revalidate = 3600;
export async function generateStaticParams() {
  return [];
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initial = (await getDocCached('excursii', id)) as ExcursieDetaliu | null;
  const date = dateEvenimentIso(initial?.eventDate, undefined);

  // Doar când data e completă (zi, lună, an) — altfel schema ar fi invalidă.
  const jsonLd = initial && date && {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: initial.title,
    description: initial.description,
    startDate: date.start,
    endDate: date.end,
    image: initial.imageUrl ? [initial.imageUrl] : undefined,
    url: `${BUSINESS.url}/excursii/${id}`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: initial.location?.trim()
      ? { '@type': 'Place', name: initial.location.trim(), address: initial.location.trim() }
      : { '@type': 'Place', name: BUSINESS.name, address: BUSINESS.address },
    organizer: { '@type': 'DanceSchool', '@id': `${BUSINESS.url}/#organization`, name: BUSINESS.name, url: BUSINESS.url },
  };

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <ExcursieClient initial={initial} />
    </>
  );
}
