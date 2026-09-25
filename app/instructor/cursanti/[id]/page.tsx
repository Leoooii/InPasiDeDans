'use client';

import { useParams } from 'next/navigation';
import { ProfilCursant } from '@/components/evidenta/profil-cursant';

export default function ProfilInstructor() {
  const { id } = useParams<{ id: string }>();
  return <ProfilCursant id={id} inapoi="/instructor/cursanti" />;
}
