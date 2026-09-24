import ExcursieClient, { type ExcursieDetaliu } from './ExcursieClient';
import { getDocCached } from '@/lib/firestore-cache';

export const revalidate = 3600;
export async function generateStaticParams() {
  return [];
}

export default async function ExcursiePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initial = (await getDocCached('excursii', id)) as ExcursieDetaliu | null;
  return <ExcursieClient initial={initial} />;
}
