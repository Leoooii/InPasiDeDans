'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Users,
  Loader2,
  Plane,
  Compass,
  ChevronRight,
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Excursie {
  id: string;
  title: string;
  date?: string;
  eventDate: string;
  location?: string;
  spots?: string;
  description?: string;
  facebookLink?: string;
  imageUrl: string;
  isUpcoming: boolean;
  createdAt: number;
}

export default function Excursii() {
  const [upcomingExcursii, setUpcomingExcursii] = useState<Excursie[]>([]);
  const [pastExcursii, setPastExcursii] = useState<Excursie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const extractYear = (dateString: string): number => {
    const yearStr = dateString.trim().slice(-4);
    const year = Number.parseInt(yearStr, 10);
    if (!isNaN(year) && year >= 1900 && year <= 2100) return year;
    return 0;
  };

  useEffect(() => {
    const loadExcursii = async () => {
      try {
        const snap = await getDocs(collection(db, 'excursii'));
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Excursie[];

        const upcoming = list.filter(e => e.isUpcoming);
        const past = list.filter(e => !e.isUpcoming);

        upcoming.sort((a, b) => b.createdAt - a.createdAt);
        past.sort((a, b) => {
          const yA = extractYear(a.eventDate);
          const yB = extractYear(b.eventDate);
          if (yA !== yB) return yB - yA;
          return b.createdAt - a.createdAt;
        });

        setUpcomingExcursii(upcoming);
        setPastExcursii(past);
      } catch (e) {
        console.error('Eroare la încărcarea excursiilor:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadExcursii();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-orange-400" />
          <p className="mt-4 text-white/70">Se încarcă excursiile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Animated orbs — orange/red palette (standard site) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 h-[36rem] w-[36rem] rounded-full bg-orange-500/15 blur-[120px] animate-pulse" />
        <div
          className="absolute top-1/4 -right-32 h-[32rem] w-[32rem] rounded-full bg-red-600/20 blur-[120px] animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-0 -left-20 h-[28rem] w-[28rem] rounded-full bg-pink-500/10 blur-[120px] animate-pulse"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Topographic SVG waves background */}
      <TopographicBackground />

      <div className="relative container mx-auto py-10 md:py-16 px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
          <ChevronRight className="h-4 w-4 text-white/30" />
          <span className="text-white font-medium">Excursii</span>
        </nav>

        {/* HERO */}
        <section className="mt-10 md:mt-16 mb-14 md:mb-20">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 mb-6 text-xs uppercase tracking-[0.2em] text-orange-300">
                <Compass className="h-3.5 w-3.5" />
                Călătorii cu pasiune
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                <span className="text-white">Călătorește</span>
                <br />
                <span className="bg-gradient-to-r from-orange-300 via-red-400 to-pink-400 bg-clip-text text-transparent">
                  și dansează
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
                Combinăm pasiunea pentru dans cu plăcerea de a descoperi locuri noi.
                Excursii tematice în <span className="text-white">România și străinătate</span>,
                deschise tuturor.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                {upcomingExcursii.length > 0 && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 px-4 py-1.5 text-orange-200">
                    <Plane className="h-4 w-4" />
                    {upcomingExcursii.length} {upcomingExcursii.length === 1 ? 'destinație' : 'destinații'} la orizont
                  </span>
                )}
                {pastExcursii.length > 0 && (
                  <a
                    href="#galerie-trecute"
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-4 py-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Amintiri din excursii
                  </a>
                )}
              </div>
            </div>

            {/* Compass-style decorative image */}
            <div className="relative hidden md:block">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-orange-400/30 to-red-500/30 blur-2xl" />
              <div className="relative h-72 w-72 rounded-full overflow-hidden ring-1 ring-white/20 shadow-2xl shadow-orange-500/30">
                <Image
                  src="/images/excursie.png"
                  alt="Excursie de dans"
                  fill
                  className="object-cover"
                  sizes="288px"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent" />
              </div>
              {/* Compass ring overlay */}
              <div className="absolute inset-0 rounded-full border border-dashed border-orange-300/30 animate-[spin_30s_linear_infinite]" />
            </div>
          </div>
        </section>

        {/* UPCOMING — layout adapted to count */}
        {upcomingExcursii.length > 0 && (
          <section className="mb-16 md:mb-20">
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                  Următoarele excursii
                </h2>
                <p className="text-white/50 text-sm mt-1">
                  Locuri rezervate · destinații confirmate
                </p>
              </div>
            </div>

            {upcomingExcursii.length === 1 && (
              <WideExcursie excursie={upcomingExcursii[0]} featured />
            )}

            {upcomingExcursii.length === 2 && (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <WideExcursie excursie={upcomingExcursii[0]} featured />
                </div>
                <PostcardExcursie excursie={upcomingExcursii[1]} />
              </div>
            )}

            {upcomingExcursii.length >= 3 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingExcursii.map(e => (
                  <PostcardExcursie key={e.id} excursie={e} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* PAST */}
        {pastExcursii.length > 0 && (
          <section id="galerie-trecute" className="mb-16 md:mb-20 scroll-mt-20">
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <ImageIcon className="h-6 w-6 text-orange-300" />
                  Excursii anterioare
                </h2>
                <p className="text-white/50 text-sm mt-1">
                  Amintiri și destinații explorate împreună
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {pastExcursii.map(e => (
                <PastExcursie key={e.id} excursie={e} />
              ))}
            </div>
          </section>
        )}

        {upcomingExcursii.length === 0 && pastExcursii.length === 0 && (
          <div className="text-center py-20 rounded-3xl border border-dashed border-white/10 bg-white/[0.02]">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-4">
              <Plane className="h-8 w-8 text-orange-300" />
            </div>
            <p className="text-white/70">
              Momentan nu există excursii planificate. Revino curând pentru destinații noi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TopographicBackground() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.07]"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 1200 800"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="topo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#topo-grad)" strokeWidth="1">
        <path d="M0,200 Q300,150 600,200 T1200,200" />
        <path d="M0,250 Q300,200 600,250 T1200,250" />
        <path d="M0,300 Q300,250 600,300 T1200,300" />
        <path d="M0,350 Q300,300 600,350 T1200,350" />
        <path d="M0,400 Q300,350 600,400 T1200,400" />
        <path d="M0,450 Q300,400 600,450 T1200,450" />
        <path d="M0,500 Q300,450 600,500 T1200,500" />
        <path d="M0,550 Q300,500 600,550 T1200,550" />
        <path d="M0,600 Q300,550 600,600 T1200,600" />
      </g>
    </svg>
  );
}

function WideExcursie({ excursie, featured }: { excursie: Excursie; featured?: boolean }) {
  const content = (
    <>
      {/* Image — large, left side on desktop */}
      <div className="relative h-72 sm:h-96 md:h-auto md:min-h-[420px] overflow-hidden bg-slate-900">
        <Image
          src={excursie.imageUrl || '/placeholder.svg'}
          alt={excursie.title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-950/40" />

        {/* Floating chips on image */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/40">
              ★ Cea mai apropiată
            </span>
          )}
          {excursie.location && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 text-slate-900 px-3 py-1.5 text-xs font-bold backdrop-blur-sm shadow-lg shadow-black/40">
              <MapPin className="h-3.5 w-3.5 text-red-600" />
              {excursie.location}
            </span>
          )}
        </div>

        {excursie.spots && (
          <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/40">
            <Users className="h-3.5 w-3.5" />
            {excursie.spots}
          </div>
        )}
      </div>

      {/* Content — right side on desktop */}
      <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.2em] text-orange-300 mb-4">
          <Calendar className="h-4 w-4" />
          {excursie.eventDate}
        </div>

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-5 text-white group-hover:text-orange-200 transition-colors">
          {excursie.title}
        </h3>

        {excursie.description && (
          <p className="text-base leading-relaxed text-white/75 mb-7 line-clamp-5">
            {excursie.description}
          </p>
        )}

        {excursie.facebookLink && (
          <Button
            asChild
            className="self-start bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/30 group-hover:shadow-xl group-hover:shadow-orange-500/40 px-7 py-6 text-base"
          >
            <span className="inline-flex items-center gap-2">
              Detalii și înscriere
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Button>
        )}
      </div>
    </>
  );

  const baseClasses =
    'group grid md:grid-cols-[1.4fr_1fr] rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/15 hover:border-orange-400/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/20';

  if (excursie.facebookLink) {
    return (
      <a
        href={excursie.facebookLink}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }
  return <article className={baseClasses}>{content}</article>;
}

function PostcardExcursie({ excursie }: { excursie: Excursie }) {
  const content = (
    <>
      {/* Image with "postage stamp" feel */}
      <div className="relative h-56 overflow-hidden bg-slate-900">
        <Image
          src={excursie.imageUrl || '/placeholder.svg'}
          alt={excursie.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Location chip top-left */}
        {excursie.location && (
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 text-slate-900 px-3 py-1.5 text-xs font-bold backdrop-blur-sm shadow-lg shadow-black/40">
            <MapPin className="h-3.5 w-3.5 text-red-600" />
            {excursie.location}
          </div>
        )}

        {/* Spots availability top-right */}
        {excursie.spots && (
          <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/40">
            <Users className="h-3 w-3" />
            {excursie.spots}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-200 transition-colors line-clamp-2">
          {excursie.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-orange-300 mb-4">
          <Calendar className="h-4 w-4 shrink-0" />
          <span>{excursie.eventDate}</span>
        </div>

        {excursie.description && (
          <p className="text-sm text-white/65 leading-relaxed line-clamp-4 mb-5 flex-1">
            {excursie.description}
          </p>
        )}

        {excursie.facebookLink && (
          <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-md shadow-orange-500/30 group-hover:shadow-lg group-hover:shadow-orange-500/40">
            Detalii și înscriere
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        )}
      </div>
    </>
  );

  const baseClasses =
    'group relative flex flex-col rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-orange-400/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/20';

  if (excursie.facebookLink) {
    return (
      <a
        href={excursie.facebookLink}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return <article className={baseClasses}>{content}</article>;
}

function PastExcursie({ excursie }: { excursie: Excursie }) {
  const content = (
    <div className="relative h-60 rounded-2xl overflow-hidden group bg-slate-900 border border-white/10 hover:border-orange-400/40 transition-all">
      <Image
        src={excursie.imageUrl || '/placeholder.svg'}
        alt={excursie.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-95 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 inset-x-0 p-4">
        <h3 className="font-bold text-white line-clamp-2 leading-tight">{excursie.title}</h3>
        <p className="text-xs text-orange-200/80 mt-1.5 inline-flex items-center gap-1.5">
          <Calendar className="h-3 w-3" />
          {excursie.eventDate}
        </p>
      </div>
    </div>
  );

  if (excursie.facebookLink) {
    return (
      <a href={excursie.facebookLink} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}
