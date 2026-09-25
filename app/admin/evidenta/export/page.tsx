'use client';

import { ExportPagina } from '@/components/evidenta/export-pagina';
import { AntetPagina } from '@/components/evidenta/ui';

export default function ExportAdmin() {
  return (
    <>
      <AntetPagina titlu="Export și backup" descriere="Rapoarte PDF, Excel sau CSV după lună, grupă sau cursant, plus backup complet." />
      <ExportPagina />
    </>
  );
}
