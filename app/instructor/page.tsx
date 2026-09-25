'use client';

import { PrezentaGrupa } from '@/components/evidenta/prezenta-grupa';

export default function PrezentaInstructor() {
  return <PrezentaGrupa linkProfil={id => `/instructor/cursanti/${id}`} />;
}
