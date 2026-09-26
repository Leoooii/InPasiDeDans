'use client';

import { useEffect, useState } from 'react';

type Conexiune = { saveData?: boolean; effectiveType?: string };

/**
 * Videoul din capul paginii principale, încărcat abia după ce pagina e gata
 * (pe telefon: la prima atingere sau derulare). Până atunci (și dacă nu pornește)
 * se vede poza de fundal randată de server, deci conținutul principal apare imediat.
 * Pe conexiuni lente, cu „economisire date” sau „mișcare redusă”, rămâne doar poza.
 */
export function HeroVideo() {
  const [incarca, setIncarca] = useState(false);
  const [ruleaza, setRuleaza] = useState(false);

  useEffect(() => {
    const c = (navigator as Navigator & { connection?: Conexiune }).connection;
    if (c?.saveData || /(^|-)2g$/.test(c?.effectiveType ?? '')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let anulat = false;
    const activeaza = () => !anulat && setIncarca(true);
    const EVENIMENTE = ['pointerdown', 'touchstart', 'scroll', 'keydown'] as const;
    const curata = () => EVENIMENTE.forEach(e => window.removeEventListener(e, laInteractiune));
    function laInteractiune() {
      curata();
      activeaza();
    }

    // Telefon: videoul pornește la prima atingere / derulare. Poza rămâne conținutul principal
    // pentru Google (măsurătoarea se oprește la prima interacțiune), iar datele mobile nu se
    // consumă pe un video de 2 MB decât dacă vizitatorul rămâne pe pagină.
    if (window.matchMedia('(max-width: 767px)').matches) {
      EVENIMENTE.forEach(e => window.addEventListener(e, laInteractiune, { once: true, passive: true }));
      return () => {
        anulat = true;
        curata();
      };
    }

    // Calculator: după ce pagina s-a încărcat și browserul e liber.
    const porneste = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) ric(activeaza, { timeout: 2500 });
      else setTimeout(activeaza, 1200);
    };
    if (document.readyState === 'complete') porneste();
    else window.addEventListener('load', porneste, { once: true });
    return () => {
      anulat = true;
      window.removeEventListener('load', porneste);
    };
  }, []);

  if (!incarca) return null;

  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ruleaza ? 'opacity-100' : 'opacity-0'}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onPlaying={() => setRuleaza(true)}
    >
      <source src="/images/gif/presentation.mp4" type="video/mp4" />
    </video>
  );
}
