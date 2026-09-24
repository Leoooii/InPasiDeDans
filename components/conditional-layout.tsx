'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CookieConsent from '@/components/cookie-consent';
import GrupeInFormare from '@/components/grupe-in-formare';

// Paginile pe care apare butonul plutitor „Grupe noi!"
const CU_BUTON_GRUPE_NOI = new Set([
  '/contact',
  '/cursuri-dans-adulti',
  '/cursuri-dans-copii',
  '/dansul-mirilor',
  '/dansuri-de-societate',
  '/dansuri-latino',
  '/dansuri-populare',
  '/despre-noi',
  '/instructori',
  '/lectii-private',
  '/program',
  '/tarife',
]);

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CookieConsent />
      {CU_BUTON_GRUPE_NOI.has(pathname ?? '') && <GrupeInFormare />}
    </>
  );
}
