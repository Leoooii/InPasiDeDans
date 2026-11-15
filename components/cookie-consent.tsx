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
      role="region"
      aria-label="Cookie-uri"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur animate-in slide-in-from-bottom-2"
    >
      <div className="container flex items-center gap-3 py-2.5 sm:gap-4">
        <p className="flex-1 text-xs leading-snug text-slate-600 sm:text-sm">
          Folosim servicii terțe (ex. Cloudflare) pentru securitate.{' '}
          <Link href="/cookie-policy" className="text-red-600 underline underline-offset-2">
            Detalii
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" className="h-8 px-3" onClick={() => raspunde(false)}>
            Refuz
          </Button>
          <Button variant="brand" size="sm" className="h-8 px-3" onClick={() => raspunde(true)}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
