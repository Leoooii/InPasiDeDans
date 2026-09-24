import ExcursiiClient, { type Excursie } from './ExcursiiClient';
import { getExcursii, safe } from '@/lib/public-data';

export default async function ExcursiiPage() {
  const initial = (await safe(getExcursii, null)) as Excursie[] | null;
  return <ExcursiiClient initial={initial} />;
}
