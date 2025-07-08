'use client';
import { PartyPopper } from 'lucide-react';

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function StickyMenu() {
  return (
    <div className="hidden lg:block fixed top-1/3 right-8 z-40">
      <nav className="flex flex-col gap-4 bg-white/80 shadow-lg rounded-xl p-3 border border-orange-200">
        <button
          onClick={() => scrollToSection('cursuri')}
          className="group px-4 py-2 rounded-lg text-red-700 font-semibold hover:bg-orange-100 transition-all duration-200 relative"
        >
          Cursuri
          <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full group-hover:w-full transition-all duration-300"></span>
        </button>
        <button
          onClick={() => scrollToSection('grupe')}
          className="group px-4 py-2 rounded-lg text-red-700 font-semibold hover:bg-orange-100 transition-all duration-200 relative"
        >
          Grupe în formare
          <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full group-hover:w-full transition-all duration-300"></span>
        </button>
        <button
          onClick={() => scrollToSection('noutati')}
          className="group px-4 py-2 rounded-lg text-red-700 font-semibold hover:bg-orange-100 transition-all duration-200 relative"
        >
          Noutăți
          <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full group-hover:w-full transition-all duration-300"></span>
        </button>
      </nav>
    </div>
  );
} 