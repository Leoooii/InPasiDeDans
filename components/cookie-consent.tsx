'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const EVENIMENT_CONSIMTAMANT = 'cookie-consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('cookiesAccepted')) setIsVisible(true);
    } catch {
      // localStorage indisponibil (mod privat) — nu insistăm cu bannerul
    }
  }, []);

  const raspunde = (accept: boolean) => {
    try {
      localStorage.setItem('cookiesAccepted', accept ? 'true' : 'false');
    } catch {}
    // „storage" nu se declanșează în același tab; anunțăm explicit restul paginii
    window.dispatchEvent(new Event(EVENIMENT_CONSIMTAMANT));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-uri"
      className="fixed inset-x-3 bottom-3 z-50 sm:left-auto sm:right-4 sm:max-w-md rounded-2xl border border-orange-100 bg-white/95 p-4 shadow-xl backdrop-blur animate-in slide-in-from-bottom-4"
    >
      <p className="text-xs sm:text-sm text-slate-700">
        Folosim servicii terțe (ex. Cloudflare) care pot folosi tehnologii similare cookie-urilor, pentru securitate.
        Detalii în{' '}
        <Link href="/cookie-policy" className="text-red-600 underline underline-offset-2">
          Politica de cookie-uri
        </Link>
        .
      </p>
      <div className="mt-3 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => raspunde(false)}>
          Refuz
        </Button>
        <Button variant="brand" size="sm" onClick={() => raspunde(true)}>
          Accept
        </Button>
      </div>
    </div>
  );
}
