'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PrezentaAzi } from '@/components/evidenta/prezenta-azi';

function Prezenta() {
  const p = useSearchParams();
  const grupa = p.get('grupa');
  const zi = p.get('data') ?? undefined;
  const router = useRouter();
  useEffect(() => {
    if (!grupa) router.replace('/admin/evidenta');
  }, [grupa, router]);
  if (!grupa) return null;
  return <PrezentaAzi key={`${grupa}-${zi}`} grupaId={grupa} zi={zi} inapoi="/admin/evidenta" linkGrupa={`/admin/evidenta/grupe/${grupa}`} />;
}

export default function PrezentaAdmin() {
  return (
    <Suspense>
      <Prezenta />
    </Suspense>
  );
}
