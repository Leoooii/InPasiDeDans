import type { Metadata } from 'next';
import EvenimentDetail from '@/components/eveniment-detail';
import { fetchEvenimentBySlug } from '@/lib/eveniment-loader';

const SITE_URL = 'https://www.inpasidedans.ro';

type Params = { slug: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchEvenimentBySlug(slug);

  if (!item) {
    return {
      title: 'Noutate negăsită | In Pași de Dans',
      description: 'Articolul căutat nu există sau a fost mutat.',
    };
  }

  const isEvent = Boolean(item.eventDate);
  const path = isEvent ? 'evenimente' : 'noutati';
  const url = `${SITE_URL}/${path}/${item.slug}`;
  const title = item.title
    ? `${item.title} | In Pași de Dans`
    : `${isEvent ? 'Eveniment' : 'Noutate'} | In Pași de Dans`;
  const description =
    item.description?.slice(0, 200) ||
    'Află ultimele noutăți și evenimente de la In Pași de Dans, școala de dans din București.';
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
      siteName: 'In Pași de Dans',
      images: [{ url: image, width: 1200, height: 630, alt: item.title || 'In Pași de Dans' }],
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

  return (
    <EvenimentDetail
      kind="noutate"
      initialSlug={slug}
      initialItem={item}
    />
  );
}
