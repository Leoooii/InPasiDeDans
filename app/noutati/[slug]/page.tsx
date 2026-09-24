import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EvenimentDetail from '@/components/eveniment-detail';
import { fetchEvenimentBySlug, fetchEvenimenteSimilare } from '@/lib/eveniment-loader';

// ISR: pagina se generează la prima vizită, apoi se servește din cache
// (invalidată prin tag-ul 'evenimente' la salvarea din admin).
export const revalidate = 3600;
export async function generateStaticParams() {
  return [];
}

const SITE_URL = 'https://www.inpasidedans.ro';

type Params = { slug: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchEvenimentBySlug(slug);

  if (!item) {
    return {
      title: 'Noutate negăsită | În Pași de Dans',
      description: 'Articolul căutat nu există sau a fost mutat.',
    };
  }

  const isEvent = Boolean(item.eventDate);
  const path = isEvent ? 'evenimente' : 'noutati';
  const url = `${SITE_URL}/${path}/${item.slug}`;
  const title = item.title
    ? `${item.title} | În Pași de Dans`
    : `${isEvent ? 'Eveniment' : 'Noutate'} | În Pași de Dans`;
  const description =
    item.description?.slice(0, 200) ||
    'Află ultimele noutăți și evenimente de la În Pași de Dans, școala de dans din București.';
  const image = item.imageUrl || `${SITE_URL}/images/logo.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: isEvent ? 'article' : 'article',
      title,
      description,
      url,
      siteName: 'În Pași de Dans',
      images: [{ url: image, width: 1200, height: 630, alt: item.title || 'În Pași de Dans' }],
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function NoutatePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = await fetchEvenimentBySlug(slug);
  if (!item) notFound();
  const related = await fetchEvenimenteSimilare(item.id);

  return (
    <EvenimentDetail
      kind="noutate"
      initialSlug={slug}
      initialItem={item}
      initialRelated={related}
    />
  );
}
