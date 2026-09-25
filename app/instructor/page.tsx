'use client';

import { BannerGhid } from '@/components/evidenta/ghid';
import { GrupeLista } from '@/components/evidenta/grupe-lista';

export default function GrupeInstructor() {
  return (
    <>
      <BannerGhid rol="instructor" />
      <GrupeLista
        titlu="Grupele mele"
        linkGrupa={id => `/instructor/grupe/${id}`}
        linkProfil={id => `/instructor/cursanti/${id}`}
        linkPrezenta={id => `/instructor/prezenta?grupa=${id}`}
      />
    </>
  );
}
