'use client';

import { useParams } from 'next/navigation';
import { GrupaDetaliu } from '@/components/evidenta/grupa-detaliu';

export default function GrupaInstructor() {
  const { id } = useParams<{ id: string }>();
  return (
    <GrupaDetaliu
      id={id}
      inapoi="/instructor"
      linkProfil={c => `/instructor/cursanti/${c}`}
      linkPrezenta={g => `/instructor/prezenta?grupa=${g}`}
    />
  );
}
