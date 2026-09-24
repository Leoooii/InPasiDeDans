'use client';

import { DarkAntetSectiune, DarkEticheta, DarkPageShell, DarkTitlu, Evidentiat, ModelFundal } from '@/components/dark-page';
import { usePublicData } from '@/components/public-data-provider';
import Link from 'next/link';
import {
  Loader2,
  Sparkles,
  Users,
  GraduationCap,
  Trophy,
  Heart,
  } from 'lucide-react';
import InstructoriSlider, { type Instructor } from '@/components/instructori-slider';

export default function Instructori() {
  const { instructori: toti } = usePublicData();
  const instructori = (toti ?? []) as (Instructor & { order?: number })[];
  const isLoading = false;
  const error = toti === null
    ? 'Nu s-au putut încărca instructorii. Încercați să reîmprospătați pagina.'
    : null;

  return (
    <DarkPageShell
      pagina="Instructori"
      url="https://www.inpasidedans.ro/instructori"
      orbe={[
        '-top-40 left-1/4 h-[36rem] w-[36rem] bg-orange-500/15',
        'top-1/4 -right-40 h-[34rem] w-[34rem] bg-red-600/15',
        'bottom-0 left-0 h-[28rem] w-[28rem] bg-orange-500/10',
      ]}
      fundal={<ModelFundal tip="diagonale" opacitate="opacity-[0.05]" />}
    >
      {/* HERO */}
      <section className="mt-10 md:mt-16 mb-14 md:mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <DarkEticheta icon={Sparkles}>Echipa noastră</DarkEticheta>

          <DarkTitlu>
            <span className="text-white">Instructorii</span>{' '}
            <Evidentiat>
              noștri
            </Evidentiat>
          </DarkTitlu>

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
        <DarkAntetSectiune titlu="Cunoaște echipa" subtitlu="Folosește săgețile, miniaturile sau săgețile de tastatură pentru navigare" />

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
        <DarkAntetSectiune titlu="Specializări" subtitlu="Ce face echipa noastră diferită" />

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
    </DarkPageShell>
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

