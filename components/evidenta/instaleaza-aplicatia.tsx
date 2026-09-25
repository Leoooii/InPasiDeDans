'use client';

import { useEffect, useState } from 'react';
import { Download, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

type EvenimentInstalare = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

/**
 * „Instalează aplicația”: pe Android/Chrome deschide fereastra de instalare,
 * pe iPhone explică pașii din Safari. Nu apare dacă evidența rulează deja ca aplicație.
 */
export function InstaleazaAplicatia() {
  const [eveniment, setEveniment] = useState<EvenimentInstalare | null>(null);
  const [ios, setIos] = useState(false);
  const [instalata, setInstalata] = useState(true);
  const [pasi, setPasi] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true;
    setInstalata(standalone);
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    const la = (e: Event) => {
      e.preventDefault();
      setEveniment(e as EvenimentInstalare);
    };
    window.addEventListener('beforeinstallprompt', la);
    return () => window.removeEventListener('beforeinstallprompt', la);
  }, []);

  if (instalata || (!eveniment && !ios)) return null;

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white/80 p-3 text-center text-sm text-slate-600">
      {eveniment ? (
        <Button
          variant="outline"
          className="h-10 w-full"
          onClick={async () => {
            await eveniment.prompt();
            setEveniment(null);
          }}
        >
          <Download className="mr-2 h-4 w-4" /> Instalează aplicația pe telefon
        </Button>
      ) : (
        <>
          <button type="button" className="inline-flex items-center gap-1.5 font-medium text-slate-700" onClick={() => setPasi(!pasi)}>
            <Download className="h-4 w-4" /> Pune evidența pe ecranul telefonului
          </button>
          {pasi && (
            <p className="mt-2 text-xs leading-relaxed">
              În Safari apasă <Share className="inline h-3.5 w-3.5 align-text-bottom" /> <strong>Distribuie</strong>, apoi{' '}
              <strong>Adaugă pe ecranul principal</strong>. Se deschide ca o aplicație, cu iconița cu dansatorii.
            </p>
          )}
        </>
      )}
    </div>
  );
}
