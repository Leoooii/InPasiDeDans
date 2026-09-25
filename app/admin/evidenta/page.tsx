'use client';

import { DeRezolvat } from '@/components/evidenta/de-rezolvat';
import { MigrareDateVechi } from '@/components/evidenta/migrare';
import { PrezentaGrupa } from '@/components/evidenta/prezenta-grupa';
import { AntetPagina } from '@/components/evidenta/ui';

const profil = (id: string) => `/admin/evidenta/cursanti/${id}`;

export default function PrezentaAdmin() {
  return (
    <>
      <AntetPagina titlu="Prezență" descriere="Alege ziua și grupa, bifează cine a venit și salvează. Ședința se scade automat din abonament." />
      <MigrareDateVechi />
      <DeRezolvat linkProfil={profil} />
      <PrezentaGrupa linkProfil={profil} />
    </>
  );
}
