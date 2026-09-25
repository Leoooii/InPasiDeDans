'use client';

import { Istoric } from '@/components/evidenta/istoric';
import { AntetPagina } from '@/components/evidenta/ui';

export default function IstoricAdmin() {
  return (
    <>
      <AntetPagina titlu="Istoric" descriere="Tot ce s-a întâmplat în evidență: cine a adăugat cursanți, abonamente, prezențe, plus avertizările de expirare." />
      <Istoric linkProfil={id => `/admin/evidenta/cursanti/${id}`} />
    </>
  );
}
