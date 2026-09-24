import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDocCached } from '@/lib/firestore-cache';

type Props = { params: Promise<{ id: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = await getDocCached('excursii', id);
  const path = `/excursii/${id}`;
  if (!item) {
    return { title: 'Excursie | În Pași de Dans', robots: { index: false } };
  }
  const title = `${item.title} | Excursii În Pași de Dans`;
  const description =
    (typeof item.description === 'string' && item.description.slice(0, 155)) ||
    'Detalii despre excursia organizată de școala de dans În Pași de Dans: data, destinația și toate informațiile importante.';
  const images = item.imageUrl ? [{ url: item.imageUrl, alt: item.title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, images },
    twitter: { title, description, images: item.imageUrl ? [item.imageUrl] : undefined },
  };
}

export default async function ExcursieDetaliuLayout({ children, params }: Props) {
  const { id } = await params;
  if (!(await getDocCached('excursii', id))) notFound();
  return children;
}
