'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Clock, Search } from 'lucide-react';

export default function NotFound() {
  const [countdown, setCountdown] = useState(10);
  const [shouldRedirect, setShouldRedirect] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!shouldRedirect) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [shouldRedirect, router]);

  const handleCancelRedirect = () => {
    setShouldRedirect(false);
  };

  const progressPercentage = ((10 - countdown) / 10) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl">
        <CardContent className="p-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Pagina nu a fost găsită
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Oops! Se pare că această pagină nu există sau a fost mutată.
            </p>
          </div>

          {/* Mesaj explicativ */}
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Este posibil că link-ul pe care l-ai accesat să fie din vechiul
              nostru site. Am actualizat recent structura site-ului pentru o
              experiență mai bună.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Te vom redirecționa automat către pagina principală în {countdown}{' '}
              secunde.
            </p>
          </div>

          {/* Bară de progres */}
          {shouldRedirect && (
            <div className="mb-6">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                Redirect în {countdown} secunde
              </div>
            </div>
          )}

          {/* Butoane de navigare */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Înapoi la pagina principală
                </Link>
              </Button>

              {shouldRedirect && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleCancelRedirect}
                  className="border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-400"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Anulează redirectul
                </Button>
              )}
            </div>
          </div>

          {/* Link-uri utile */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Poate cauți una dintre aceste pagini?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <Link
                href="/cursuri-dans-adulti"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline"
              >
                Cursuri Dans Adulți
              </Link>
              <Link
                href="/cursuri-dans-copii"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline"
              >
                Cursuri Dans Copii
              </Link>
              <Link
                href="/grupe-in-formare"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline"
              >
                Grupe în Formare
              </Link>
              <Link
                href="/instructori"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline"
              >
                Instructori
              </Link>
              <Link
                href="/tarife"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline"
              >
                Tarife
              </Link>
              <Link
                href="/contact"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline"
              >
                Contact
              </Link>

              <Link
                href="/evenimente"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline"
              >
                Evenimente
              </Link>
              <Link
                href="/excursii"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline"
              >
                Excursii
              </Link>
            </div>
          </div>

          {/* Informații de contact */}
          <div className="mt-8 pt-6 border-t text-sm text-gray-600 dark:text-gray-400">
            <p>
              Dacă problema persistă, te rugăm să ne contactezi la{' '}
              <Link
                href="/contact"
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline"
              >
                pagina de contact
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
