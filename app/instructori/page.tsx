'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Loader2,
  Sparkles,
  Users,
  GraduationCap,
  Trophy,
  Heart,
  ChevronRight,
} from 'lucide-react';
import GrupeInFormare from '@/components/grupe-in-formare';
import InstructoriSlider, { type Instructor } from '@/components/instructori-slider';

export default function Instructori() {
  const [instructori, setInstructori] = useState<(Instructor & { order?: number })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstructori = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/instructori');
        if (!response.ok) throw new Error('Nu s-au putut încărca instructorii');
        const data = await response.json();
        const sorted = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));
        setInstructori(sorted);
      } catch (e) {
        console.error('Eroare:', e);
        setError('Nu s-au putut încărca instructorii. Încercați să reîmprospătați pagina.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchInstructori();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Animated orbs — orange/red palette (standard site) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full bg-orange-500/15 blur-[120px] animate-pulse" />
        <div
          className="absolute top-1/4 -right-40 h-[34rem] w-[34rem] rounded-full bg-red-600/15 blur-[120px] animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-0 left-0 h-[28rem] w-[28rem] rounded-full bg-pink-500/10 blur-[120px] animate-pulse"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Diagonal line pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, white 0 1px, transparent 1px 22px)',
        }}
      />

      <div className="relative container mx-auto py-10 md:py-16 px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
          <ChevronRight className="h-4 w-4 text-white/30" />
          <span className="text-white font-medium">Instructori</span>
        </nav>

        {/* HERO */}
        <section className="mt-10 md:mt-16 mb-14 md:mb-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 mb-6 text-xs uppercase tracking-[0.2em] text-orange-300">
              <Sparkles className="h-3.5 w-3.5" />
              Echipa noastră
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              <span className="text-white">Instructorii</span>{' '}
              <span className="bg-gradient-to-r from-orange-300 via-red-400 to-pink-400 bg-clip-text text-transparent">
                noștri
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Dansatori profesioniști cu experiență în competiții
              <span className="text-white"> naționale și internaționale</span>, dedicați
              să te ghideze pas cu pas — indiferent de stil sau nivel.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
              {!isLoading && (
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 px-4 py-1.5 text-orange-200">
                  <Users className="h-4 w-4" />
                  {instructori.length} {instructori.length === 1 ? 'instructor' : 'instructori'}
                </span>
              )}
              <Link
                href="/cursuri-dans-adulti"
                className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-4 py-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                Cursuri adulți
              </Link>
              <Link
                href="/inscriere"
                className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-4 py-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                Înscrie-te
              </Link>
            </div>
          </div>
        </section>

        {/* INSTRUCTORI SLIDER */}
        <section className="mb-16 md:mb-20">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                Cunoaște echipa
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Folosește săgețile, miniaturile sau săgețile de tastatură pentru navigare
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-orange-400" />
              <span className="ml-3 text-white/70">Se încarcă instructorii...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12 rounded-2xl border border-dashed border-red-400/30 bg-red-500/5 text-red-300">
              {error}
            </div>
          ) : (
            <InstructoriSlider instructori={instructori} />
          )}
        </section>

        {/* SPECIALIZĂRI */}
        <section className="mb-16 md:mb-20">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                Specializări
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Ce face echipa noastră diferită
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <SpecCard
              icon={<GraduationCap className="h-5 w-5" />}
              title="Formare continuă"
              text="Workshop-uri și seminarii naționale și internaționale, mereu la curent cu cele mai noi tendințe."
            />
            <SpecCard
              icon={<Trophy className="h-5 w-5" />}
              title="Experiență competițională"
              text="Majoritatea instructorilor sunt campioni naționali sau finaliști internaționali."
            />
            <SpecCard
              icon={<Heart className="h-5 w-5" />}
              title="Pedagogie adaptată"
              text="Metode de predare ajustate la vârsta, nivelul și obiectivele fiecărui cursant."
            />
          </div>
        </section>
      </div>

      <div className="relative">
        <GrupeInFormare />
      </div>
    </div>
  );
}

function SpecCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="group rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/10 p-6 hover:border-orange-400/40 hover:-translate-y-1 transition-all">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/30 to-red-500/30 border border-orange-400/30 text-orange-200 mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-semibold text-white mb-2 text-lg">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

