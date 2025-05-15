'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Acest site nu folosește cookie-uri direct, dar folosește servicii
            terțe (ex. Cloudflare) care pot utiliza tehnologii similare pentru
            securitate. Pentru detalii, consultați{' '}
            <Link href="/cookie-policy" className="underline">
              Politica de Cookie-uri
            </Link>{' '}
            și{' '}
            <Link href="/privacy-policy" className="underline">
              Politica de Confidențialitate
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-gray-500"
          >
            <X className="h-4 w-4 mr-1" />
            Refuză
          </Button>
          <Button
            size="sm"
            onClick={acceptCookies}
            className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
