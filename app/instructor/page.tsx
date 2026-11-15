'use client';

import { ExpiraCurand } from '@/components/evidenta/expira-curand';
import { BannerGhid } from '@/components/evidenta/ghid';
import { GrupeLista } from '@/components/evidenta/grupe-lista';
import { PrezentaNefacuta } from '@/components/evidenta/prezenta-nefacuta';

export default function GrupeInstructor() {
  return (
    <>
      <BannerGhid rol="instructor" />
      <PrezentaNefacuta linkPrezenta={id => `/instructor/prezenta?grupa=${id}`} />
      <ExpiraCurand linkProfil={id => `/instructor/cursanti/${id}`} />
      <GrupeLista
        titlu="Grupele mele"
        linkGrupa={id => `/instructor/grupe/${id}`}
        linkProfil={id => `/instructor/cursanti/${id}`}
        linkPrezenta={id => `/instructor/prezenta?grupa=${id}`}
      />
    </>
  );
}
