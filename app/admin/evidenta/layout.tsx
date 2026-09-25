'use client';

import { useMemo } from 'react';
import { EvidentaProvider } from '@/components/evidenta/context';
import { auth } from '@/lib/firebase';
import type { Actor } from '@/lib/evidenta/tipuri';

// Layout-ul admin a verificat deja că utilizatorul e adminul.
export default function EvidentaAdminLayout({ children }: { children: React.ReactNode }) {
  const actor = useMemo<Actor>(() => ({ uid: auth.currentUser?.uid ?? 'admin', nume: 'Admin', rol: 'admin' }), []);
  return (
    <EvidentaProvider actor={actor} grupePermise={null}>
      {children}
    </EvidentaProvider>
  );
}
