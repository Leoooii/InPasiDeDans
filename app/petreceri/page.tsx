import PetreceriClient, { type Petrecere } from './PetreceriClient';
import { getPetreceri, safe } from '@/lib/public-data';

export default async function PetreceriPage() {
  const initial = (await safe(getPetreceri, null)) as Petrecere[] | null;
  return <PetreceriClient initial={initial} />;
}
