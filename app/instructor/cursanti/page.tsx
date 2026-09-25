'use client';

import { ListaCursanti } from '@/components/evidenta/lista-cursanti';

export default function CursantiInstructor() {
  return <ListaCursanti linkProfil={id => `/instructor/cursanti/${id}`} />;
}
