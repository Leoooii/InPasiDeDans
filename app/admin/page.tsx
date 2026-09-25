'use client';

import { useMemo } from 'react';
import { EvidentaProvider } from '@/components/evidenta/context';
import { Dashboard } from '@/components/evidenta/dashboard';
import { auth } from '@/lib/firebase';
import { useProfilAdmin } from '@/lib/evidenta/profil';
import type { Actor } from '@/lib/evidenta/tipuri';

// Layout-ul admin a verificat deja că utilizatorul e adminul.
export default function AdminDashboard() {
  const profil = useProfilAdmin();
  const nume = profil?.nume ?? 'Admin';
  const actor = useMemo<Actor>(() => ({ uid: auth.currentUser?.uid ?? 'admin', nume, rol: 'admin' }), [nume]);
  return (
    <EvidentaProvider actor={actor} grupePermise={null}>
      <Dashboard numeAdmin={nume} />
    </EvidentaProvider>
  );
}
