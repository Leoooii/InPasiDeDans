'use client';

import { ConturiInstructori } from '@/components/evidenta/conturi-instructori';
import { AntetPagina } from '@/components/evidenta/ui';

export default function ConturiAdmin() {
  return (
    <>
      <AntetPagina titlu="Conturi instructori" descriere="Fiecare instructor are contul lui și vede doar grupele atribuite aici." />
      <ConturiInstructori />
    </>
  );
}
