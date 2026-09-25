'use client';

import { useParams } from 'next/navigation';
import { GrupaDetaliu } from '@/components/evidenta/grupa-detaliu';

export default function GrupaAdmin() {
  const { id } = useParams<{ id: string }>();
  return (
    <GrupaDetaliu
      id={id}
      inapoi="/admin/evidenta"
      linkProfil={c => `/admin/evidenta/cursanti/${c}`}
      linkPrezenta={g => `/admin/evidenta/prezenta?grupa=${g}`}
    />
  );
}
