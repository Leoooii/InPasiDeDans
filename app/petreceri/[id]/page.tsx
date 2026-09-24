import PetrecereClient, { type PetrecereDetaliu } from './PetrecereClient';
import { getDocCached } from '@/lib/firestore-cache';

export const revalidate = 3600;
export async function generateStaticParams() {
  return [];
}

export default async function PetrecerePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initial = (await getDocCached('petreceri', id)) as PetrecereDetaliu | null;
  return <PetrecereClient initial={initial} />;
}
