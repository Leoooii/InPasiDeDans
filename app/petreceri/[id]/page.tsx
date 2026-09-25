import PetrecereClient, { type PetrecereDetaliu } from './PetrecereClient';
import { getDocCached } from '@/lib/firestore-cache';
import { dateEvenimentIso } from '@/lib/data-ro';
import { BUSINESS } from '@/lib/schema-constants';
import { schemaEveniment } from '@/lib/schema-eveniment';

export const revalidate = 3600;
export async function generateStaticParams() {
  return [];
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initial = (await getDocCached('petreceri', id)) as PetrecereDetaliu | null;
  const date = dateEvenimentIso(initial?.date, initial?.time);

  // Doar când data e completă (zi, lună, an) — altfel schema ar fi invalidă.
  const jsonLd = initial && date && schemaEveniment({
    nume: initial.title,
    descriere: initial.description,
    start: date.start,
    end: date.end,
    imagine: initial.imageUrl,
    url: `${BUSINESS.url}/petreceri/${id}`,
    urlInscriere: initial.facebookLink,
    locatie: initial.location,
  });

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <PetrecereClient initial={initial} />
    </>
  );
}
