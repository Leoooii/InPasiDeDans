'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Youtube,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
}

const PHRASES = [
  'fondator, manager și instructor',
  'pasiunea pentru dans',
  'experiență de peste 24 de ani',
  'competiții naționale și internaționale',
  'predarea dansurilor latino, de societate și dansurilor populare',
  'organizarea și coordonarea',
  'organizarea evenimentelor și activităților',
  'dansuri latino și de societate',
  'experiență de peste 13 ani',
  'bucuria, eleganța și secretele dansului',
  'experiență solidă de 11 ani',
  'peste 16 ani',
  'vicecampion național la bachata',
  'stilul său tehnic, carisma pe ringul de dans',
  '2023',
  'salsa și bachata',
  'dezvoltarea comunității de dansatori',
  'instructor-coregraf',
  'dansuri populare adulți, lecții private pentru viitori miri, precum și workshopuri',
  'inspirație, bucurie și empatie',
  'susținuți și înțeleși',
  'competiții, evenimente și proiecte naționale și internaționale de dans',
  'dansul sportiv de 9 ani',
  'instructoare înțelegătoare, creativă',
  'lecții private pentru miri',
  'energia pozitivă, perfecționismul său discret',
  '12 ani de experiență',
  'pasiunea cu răbdarea în lucrul cu grupele de copii',
  'pregătirea dansului lor de nuntă',
  '4 ani ca instructor',
];

function highlightText(text: string) {
  const sorted = [...PHRASES].sort((a, b) => b.length - a.length);
  const escaped = sorted.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  return text.split(regex).map((part, i) => {
    const isMatch = sorted.some(p => p.toLowerCase() === part.toLowerCase());
    return isMatch ? (
      <strong key={i} className="text-orange-200 font-semibold">{part}</strong>
    ) : (
      part
    );
  });
}

export default function InstructoriSlider({ instructori }: { instructori: Instructor[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollPrev();
      if (e.key === 'ArrowRight') scrollNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [scrollPrev, scrollNext]);

  if (instructori.length === 0) return null;

  return (
    <div className="relative">
      {/* Slider viewport */}
      <div
        className="overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10"
        ref={emblaRef}
      >
        <div className="flex">
          {instructori.map((instr, idx) => (
            <div
              key={instr.id}
              className="flex-[0_0_100%] min-w-0"
              aria-roledescription="slide"
              aria-label={`${idx + 1} din ${instructori.length}: ${instr.name}`}
            >
              <Slide instructor={instr} isFirst={idx === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow controls */}
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Instructorul anterior"
        className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-gradient-to-br from-red-600 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-1/2 hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Instructorul următor"
        className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-gradient-to-br from-red-600 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-1/2 hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Thumbnail strip */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {instructori.map((instr, idx) => (
          <button
            key={instr.id}
            type="button"
            onClick={() => scrollTo(idx)}
            aria-label={`Vezi ${instr.name}`}
            aria-current={selectedIndex === idx}
            className={cn(
              'group relative h-14 w-14 rounded-full overflow-hidden transition-all ring-2',
              selectedIndex === idx
                ? 'ring-orange-400 scale-110 shadow-lg shadow-orange-500/40'
                : 'ring-white/15 opacity-60 hover:opacity-100 hover:ring-orange-300/60'
            )}
          >
            <Image
              src={instr.imageUrl || '/placeholder.svg'}
              alt={instr.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </button>
        ))}
      </div>

      {/* Counter */}
      <div className="mt-4 text-center text-sm text-white/50">
        <span className="text-orange-300 font-semibold">{selectedIndex + 1}</span>
        <span className="mx-1">/</span>
        <span>{instructori.length}</span>
      </div>
    </div>
  );
}

function Slide({ instructor, isFirst }: { instructor: Instructor; isFirst?: boolean }) {
  const {
    name,
    role,
    bio,
    imageUrl,
    facebookUrl,
    instagramUrl,
    youtubeUrl,
  } = instructor;

  return (
    <div className="grid md:grid-cols-[auto_1fr] items-center">
      {/* IMAGE SIDE — clean, no dark backdrop, transparent so slider glass shows through */}
      <div className="relative flex items-center justify-center p-6 md:p-8">
        <div className="relative w-[260px] sm:w-[300px] md:w-[320px] lg:w-[360px] max-w-full">
          {/* Soft orange/red halo behind image */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-orange-400/25 via-red-500/15 to-pink-500/25 blur-2xl" />

          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="relative block w-full h-auto max-h-[480px] object-contain rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/15"
          />

          {isFirst && (
            <span className="absolute -top-3 -left-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/40 -rotate-3">
              ★ Fondator
            </span>
          )}
        </div>
      </div>

      {/* INFO SIDE */}
      <div className="p-7 md:p-10 lg:p-14 flex flex-col justify-center bg-slate-950/60 backdrop-blur-sm">
        <div className="inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.2em] text-orange-300 mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          {role}
        </div>

        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
          {name}
        </h3>

        <div className="text-base leading-relaxed text-white/80 max-h-[20rem] overflow-y-auto pr-3 mb-6 custom-scrollbar">
          {bio.split('\n').map((paragraph, pIdx) => (
            <p key={pIdx} className={pIdx > 0 ? 'mt-3' : ''}>
              {highlightText(paragraph)}
            </p>
          ))}
        </div>

        {(facebookUrl || instagramUrl || youtubeUrl) && (
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
            <span className="text-xs uppercase tracking-widest text-white/50 mr-2">Urmărește:</span>
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook ${name}`}
                className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/5 border border-white/15 text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:scale-110 transition-all"
              >
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${name}`}
                className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/5 border border-white/15 text-white hover:bg-pink-600 hover:border-pink-600 hover:scale-110 transition-all"
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`YouTube ${name}`}
                className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/5 border border-white/15 text-white hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all"
              >
                <Youtube className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
