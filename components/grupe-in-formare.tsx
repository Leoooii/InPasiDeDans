'use client';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const GrupeInFormare = () => {
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cookiesAccepted = localStorage.getItem('cookiesAccepted');
      if (cookiesAccepted) {
        setShow(true);
      } else {
        const onStorage = () => {
          if (localStorage.getItem('cookiesAccepted')) setShow(true);
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
      }
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    const footer = document.getElementById('site-footer');
    if (!footer || !buttonRef.current) return;
    const observer = new window.IntersectionObserver(
      entries => {
        setHide(entries[0].isIntersecting);
      },
      { root: null, threshold: 0.01 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [show]);

  if (!show || hide) return null;

  return (
    <div
      ref={buttonRef}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex justify-center w-full pointer-events-none"
    >
      <Link href="/grupe-in-formare" className="pointer-events-auto">
        <Button
          size="lg"
          variant="outline"
          className="bg-white border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-500 hover:text-red-700 shadow-md rounded-full px-8 py-4 text-lg font-semibold flex items-center gap-2 transition-colors duration-200"
        >
          <span className="flex items-center gap-2">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="inline-flex rounded-full h-3 w-3 bg-red-400 animate-bounce-slow"></span>
            </span>
            Grupe noi!
          </span>
        </Button>
      </Link>
      <style jsx global>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.6s infinite;
        }
      `}</style>
    </div>
  );
};
export default GrupeInFormare;
