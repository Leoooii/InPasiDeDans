'use client';

import { DeRezolvat } from '@/components/evidenta/de-rezolvat';
import { BannerGhid } from '@/components/evidenta/ghid';
import { GrupeLista } from '@/components/evidenta/grupe-lista';
import { MigrareDateVechi } from '@/components/evidenta/migrare';

const profil = (id: string) => `/admin/evidenta/cursanti/${id}`;

export default function GrupeAdmin() {
  return (
    <>
      <BannerGhid rol="admin" />
      <MigrareDateVechi />
      <DeRezolvat linkProfil={profil} />
      <GrupeLista
        titlu="Grupe"
        linkGrupa={id => `/admin/evidenta/grupe/${id}`}
        linkProfil={profil}
        linkPrezenta={id => `/admin/evidenta/prezenta?grupa=${id}`}
      />
    </>
  );
}
