'use client';

import { DeRezolvat } from '@/components/evidenta/de-rezolvat';
import { ListaCursanti } from '@/components/evidenta/lista-cursanti';
import { AntetPagina } from '@/components/evidenta/ui';

const profil = (id: string) => `/admin/evidenta/cursanti/${id}`;

export default function CursantiAdmin() {
  return (
    <>
      <AntetPagina titlu="Cursanți" descriere="Statusul abonamentelor, grupele și datele de contact." />
      <DeRezolvat linkProfil={profil} />
      <ListaCursanti linkProfil={profil} />
    </>
  );
}
