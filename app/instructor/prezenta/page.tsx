'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PrezentaAzi } from '@/components/evidenta/prezenta-azi';

function Prezenta() {
  const grupa = useSearchParams().get('grupa');
  const router = useRouter();
  useEffect(() => {
    if (!grupa) router.replace('/instructor');
  }, [grupa, router]);
  if (!grupa) return null;
  return <PrezentaAzi grupaId={grupa} inapoi="/instructor" linkGrupa={`/instructor/grupe/${grupa}`} />;
}

export default function PrezentaInstructor() {
  return (
    <Suspense>
      <Prezenta />
    </Suspense>
  );
}
