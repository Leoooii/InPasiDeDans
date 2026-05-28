'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import {
  Calendar,
  Clock,
  MapPin,
  Loader2,
  Sparkles,
  PartyPopper,
  ChevronRight,
  ArrowRight,
  Camera,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Petrecere {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  facebookLink: string;
  imageUrl: string;
  isUpcoming: boolean;
  badge?: string;
  createdAt: number;
  mapEmbed?: string;
}

export default function Petreceri() {
  const [upcomingPetreceri, setUpcomingPetreceri] = useState<Petrecere[]>([]);
  const [pastPetreceri, setPastPetreceri] = useState<Petrecere[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const extractYear = (dateString: string): number => {
    const yearStr = dateString.trim().slice(-4);
    const year = Number.parseInt(yearStr, 10);
    if (!isNaN(year) && year >= 1900 && year <= 2100) return year;
    return 0;
  };

  useEffect(() => {
    const loadPetreceri = async () => {
      try {
        const response = await fetch('/api/petreceri', { cache: 'no-store' });
        if (!response.ok) throw new Error('Eroare la încărcarea petrecerilor');
        const list = (await response.json()) as Petrecere[];

        const upcoming = list.filter(p => p.isUpcoming);
        const past = list.filter(p => !p.isUpcoming);

        upcoming.sort((a, b) => b.createdAt - a.createdAt);
        past.sort((a, b) => {
          const yA = extractYear(a.date);
          const yB = extractYear(b.date);
          if (yA !== yB) return yB - yA;
          return b.createdAt - a.createdAt;
        });

        setUpcomingPetreceri(upcoming);
        setPastPetreceri(past);
      } catch (e) {
        console.error('Eroare la încărcarea petrecerilor:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadPetreceri();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-orange-400" />
          <p className="mt-4 text-white/70">Se încarcă petrecerile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Petreceri & Social Dance | In Pasi de Dans</title>
        <meta
          name="description"
          content="Participa la petrecerile tematice de dans organizate de In Pasi de Dans in Bucuresti, Sector 5. Practica dansul intr-o atmosfera relaxata!"
        />
        <link rel="canonical" href="https://www.inpasidedans.ro/petreceri" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Petreceri & Social Dance | In Pasi de Dans" />
        <meta
          property="og:description"
          content="Participa la petrecerile tematice de dans organizate de In Pasi de Dans in Bucuresti, Sector 5."
        />
        <meta property="og:url" content="https://www.inpasidedans.ro/petreceri" />
        <meta property="og:image" content="https://www.inpasidedans.ro/images/logo.png" />
        <meta property="og:locale" content="ro_RO" />
      </Head>

      <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
        {/* Animated orbs — orange/red palette (standard site) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-orange-500/15 blur-[120px] animate-pulse" />
          <div
            className="absolute top-1/3 -left-32 h-[30rem] w-[30rem] rounded-full bg-red-600/20 blur-[120px] animate-pulse"
            style={{ animationDelay: '1.5s' }}
          />
          <div
            className="absolute bottom-0 right-1/3 h-[28rem] w-[28rem] rounded-full bg-pink-500/10 blur-[120px] animate-pulse"
            style={{ animationDelay: '3.5s' }}
          />
        </div>

        {/* Confetti dots — small colorful sparks */}
        <ConfettiBackground />

        <div className="relative container mx-auto py-10 md:py-16 px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
            <ChevronRight className="h-4 w-4 text-white/30" />
            <span className="text-white font-medium">Petreceri</span>
          </nav>

          {/* HERO — asymmetric with photo */}
          <section className="mt-10 md:mt-16 mb-14 md:mb-20">
            <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center max-w-6xl mx-auto">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 mb-6 text-xs uppercase tracking-[0.2em] text-orange-300">
                  <PartyPopper className="h-3.5 w-3.5" />
                  Social dance & evenimente
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-orange-300 via-red-400 to-pink-400 bg-clip-text text-transparent">
                    Petreceri
                  </span>
                  <br />
                  <span className="text-white">tematice</span>
                </h1>

                <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
                  Pune în practică ce ai învățat la cursuri, într-o atmosferă
                  <span className="text-white"> relaxată și prietenoasă</span>. Deschise
                  cursanților și prietenilor lor.
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-sm">
                  {upcomingPetreceri.length > 0 && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 px-4 py-1.5 text-orange-200">
                      <Sparkles className="h-4 w-4" />
                      {upcomingPetreceri.length} {upcomingPetreceri.length === 1 ? 'eveniment programat' : 'evenimente programate'}
                    </span>
                  )}
                  {pastPetreceri.length > 0 && (
                    <a
                      href="#galerie"
                      className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-4 py-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                      Vezi galeria foto
                    </a>
                  )}
                </div>
              </div>

              {/* Photo with pulsing party ring (variation on excursii compass) */}
              <div className="relative hidden md:block">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-orange-400/30 to-red-500/30 blur-2xl" />
                <div className="relative h-72 w-72 rounded-full overflow-hidden ring-1 ring-white/20 shadow-2xl shadow-orange-500/30">
                  <Image
                    src="/images/latino/4.jpeg"
                    alt="Petrecere tematică"
                    fill
                    className="object-cover"
                    sizes="288px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent" />
                </div>
                {/* Pulsing party ring — bigger pulse, different feel than compass */}
                <div className="absolute inset-0 rounded-full border-2 border-orange-300/30 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute -inset-2 rounded-full border border-dashed border-orange-300/20" />
              </div>
            </div>
          </section>

          {/* UPCOMING */}
          <section className="mb-16 md:mb-20">
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                  Următoarele petreceri
                </h2>
                <p className="text-white/50 text-sm mt-1">Ne vedem pe ringul de dans</p>
              </div>
            </div>

            {upcomingPetreceri.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-4">
                  <PartyPopper className="h-8 w-8 text-orange-300" />
                </div>
                <p className="text-white/70">
                  Nu există petreceri programate în acest moment. Urmărește-ne pe{' '}
                  <a
                    href="https://www.facebook.com/scoaladedansinpasidedans"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-300 hover:text-orange-200 underline"
                  >
                    Facebook
                  </a>{' '}
                  pentru anunțuri.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingPetreceri.map(p => (
                  <UpcomingCard key={p.id} petrecere={p} />
                ))}
              </div>
            )}
          </section>

          {/* PAST GALLERY */}
          {pastPetreceri.length > 0 && (
            <section id="galerie" className="mb-16 md:mb-20 scroll-mt-20">
              <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <Camera className="h-6 w-6 text-orange-300" />
                    Din arhiva petrecerilor
                  </h2>
                  <p className="text-white/50 text-sm mt-1">
                    Momente capturate de la edițiile anterioare
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pastPetreceri.map(p => (
                  <PastTile key={p.id} petrecere={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

function ConfettiBackground() {
  // Static positions to avoid hydration mismatch and to keep effect lightweight
  const dots = [
    { top: '8%', left: '12%', color: 'bg-orange-400/60', size: 'h-2 w-2', delay: '0s' },
    { top: '15%', left: '78%', color: 'bg-red-400/50', size: 'h-1.5 w-1.5', delay: '0.4s' },
    { top: '22%', left: '45%', color: 'bg-orange-500/60', size: 'h-2.5 w-2.5', delay: '1.1s' },
    { top: '38%', left: '8%', color: 'bg-red-300/60', size: 'h-2 w-2', delay: '0.8s' },
    { top: '44%', left: '88%', color: 'bg-orange-300/55', size: 'h-2 w-2', delay: '1.6s' },
    { top: '55%', left: '32%', color: 'bg-pink-400/50', size: 'h-1.5 w-1.5', delay: '0.6s' },
    { top: '62%', left: '62%', color: 'bg-orange-400/55', size: 'h-2.5 w-2.5', delay: '2.1s' },
    { top: '72%', left: '18%', color: 'bg-red-400/50', size: 'h-2 w-2', delay: '1.3s' },
    { top: '78%', left: '82%', color: 'bg-orange-500/60', size: 'h-1.5 w-1.5', delay: '0.2s' },
    { top: '85%', left: '50%', color: 'bg-orange-300/60', size: 'h-2 w-2', delay: '1.8s' },
    { top: '30%', left: '25%', color: 'bg-red-300/45', size: 'h-1 w-1', delay: '2.4s' },
    { top: '52%', left: '92%', color: 'bg-pink-300/55', size: 'h-1.5 w-1.5', delay: '0.9s' },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${d.color} ${d.size} blur-[1px] animate-pulse`}
          style={{ top: d.top, left: d.left, animationDelay: d.delay, animationDuration: '3s' }}
        />
      ))}
    </div>
  );
}

function UpcomingCard({ petrecere }: { petrecere: Petrecere }) {
  // Try to extract day/month from "DD luna YYYY" or similar
  const dateParts = petrecere.date.trim().split(/\s+/);
  const dayNum = dateParts[0]?.match(/^\d{1,2}$/) ? dateParts[0] : null;
  const monthShort = dateParts[1]?.slice(0, 3).toUpperCase() || null;

  return (
    <Link
      href={`/petreceri/${petrecere.id}`}
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-orange-400/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/20"
    >
      <div className="relative h-60 overflow-hidden bg-slate-900">
        <Image
          src={petrecere.imageUrl || '/placeholder.svg'}
          alt={petrecere.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Date block top-left */}
        {dayNum && monthShort && (
          <div className="absolute top-4 left-4 inline-flex flex-col items-center justify-center rounded-2xl bg-white/95 text-slate-900 px-4 py-2 shadow-xl shadow-black/40 backdrop-blur-sm">
            <span className="text-2xl font-black leading-none">{dayNum}</span>
            <span className="text-[10px] font-bold tracking-widest text-red-600 mt-0.5">
              {monthShort}
            </span>
          </div>
        )}

        {petrecere.badge && (
          <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/40">
            ★ {petrecere.badge}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-200 transition-colors line-clamp-2">
          {petrecere.title}
        </h3>

        <div className="space-y-2 text-sm text-white/70 mb-5 flex-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-orange-300 shrink-0" />
            <span>{petrecere.date}</span>
          </div>
          {petrecere.time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-300 shrink-0" />
              <span>{petrecere.time}</span>
            </div>
          )}
          {petrecere.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-300 shrink-0" />
              <span className="line-clamp-1">{petrecere.location}</span>
            </div>
          )}
        </div>

        <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-md shadow-orange-500/30 group-hover:shadow-lg group-hover:shadow-orange-500/40">
          Mai multe informații
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </Link>
  );
}

function PastTile({ petrecere }: { petrecere: Petrecere }) {
  return (
    <Link
      href={petrecere.facebookLink || '#'}
      target={petrecere.facebookLink ? '_blank' : '_self'}
      className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-white/10 hover:border-orange-400/40 transition-all"
    >
      <Image
        src={petrecere.imageUrl || '/placeholder.svg'}
        alt={petrecere.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 inset-x-0 p-3">
        <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight">
          {petrecere.title}
        </h3>
        <p className="text-xs text-orange-200/80 mt-1">{petrecere.date}</p>
      </div>
    </Link>
  );
}
