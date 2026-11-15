'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import { EVENIMENT_CONSIMTAMANT } from '@/components/cookie-consent';

const TELEFON = '+40722675126';
const WHATSAPP = `https://wa.me/40722675126?text=${encodeURIComponent('Bună! Aș vrea mai multe detalii despre cursurile de dans.')}`;

// Bară fixă jos, doar pe telefon: sună, WhatsApp, înscriere. Apare după ce
// vizitatorul a răspuns la bannerul de cookie-uri (ca să nu se suprapună).
export default function BaraActiuniMobil() {
  const [vizibila, setVizibila] = useState(false);

  useEffect(() => {
    const verifica = () => {
      try {
        if (localStorage.getItem('cookiesAccepted') !== null) setVizibila(true);
      } catch {
        setVizibila(true);
      }
    };
    verifica();
    window.addEventListener(EVENIMENT_CONSIMTAMANT, verifica);
    return () => window.removeEventListener(EVENIMENT_CONSIMTAMANT, verifica);
  }, []);

  return (
    <>
      {/* spațiu la final, ca bara să nu acopere footer-ul */}
      <div className="h-16 md:hidden" aria-hidden />
      {vizibila && (
        <nav
          aria-label="Contact rapid"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur md:hidden"
        >
          <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2 px-3 py-2">
            <a
              href={`tel:${TELEFON}`}
              className="flex h-11 items-center justify-center gap-1.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-800 active:bg-slate-50"
            >
              <Phone className="h-4 w-4 text-red-600" aria-hidden /> Sună
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center gap-1.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-800 active:bg-slate-50"
            >
              <MessageCircle className="h-4 w-4 text-[#1da851]" aria-hidden /> WhatsApp
            </a>
            <Link
              href="/inscriere"
              className="flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-sm font-semibold text-white shadow-sm active:from-red-700 active:to-orange-600"
            >
              Înscrie-te
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}
