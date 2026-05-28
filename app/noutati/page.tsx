import NoutatiSection from '@/components/noutati-section';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronRight, Newspaper, CalendarDays, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Noutati si Evenimente | In Pasi de Dans',
  description:
    'Afla ultimele noutati, evenimente si promotii de la scoala noastra de dans. Fii la curent cu tot ce se intampla la In Pasi de Dans, Bucuresti!',
  keywords:
    'noutati dans, evenimente dans, stiri scoala de dans, promotii dans Bucuresti',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/noutati',
  },
  openGraph: {
    type: 'website',
    title: 'Noutati si Evenimente | In Pasi de Dans',
    description:
      'Afla ultimele noutati, evenimente si promotii de la scoala noastra de dans. Fii la curent cu tot ce se intampla la In Pasi de Dans, Bucuresti!',
    url: 'https://www.inpasidedans.ro/noutati',
    siteName: 'In Pasi de Dans',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Noutati si Evenimente In Pasi de Dans',
      },
    ],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noutati si Evenimente | In Pasi de Dans',
    description:
      'Afla ultimele noutati, evenimente si promotii de la scoala noastra de dans. Fii la curent cu tot ce se intampla la In Pasi de Dans, Bucuresti!',
    images: ['https://inpasidedans.ro/images/logo.png'],
  },
};

export default function NoutatiPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-orange-500/15 blur-[120px] animate-pulse" />
        <div
          className="absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-red-600/15 blur-[120px] animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-pink-500/10 blur-[120px] animate-pulse"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Decorative dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative container mx-auto py-10 md:py-16 px-4 md:px-6">
        <Breadcrumb>
          <BreadcrumbList className="text-white/70">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-white/70 hover:text-white transition-colors"
              >
                Acasă
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/40">
              <ChevronRight className="text-white/40" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white font-medium">Noutăți</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* HERO */}
        <section className="mt-10 md:mt-16 mb-12 md:mb-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 mb-6 text-xs uppercase tracking-[0.2em] text-orange-300">
              <Sparkles className="h-3.5 w-3.5" />
              Magazinul școlii de dans
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              <span className="bg-gradient-to-r from-orange-300 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Noutăți
              </span>{' '}
              &{' '}
              <span className="bg-gradient-to-r from-pink-400 via-red-400 to-orange-300 bg-clip-text text-transparent">
                Evenimente
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Concursuri, festivaluri, petreceri și anunțuri de la comunitatea
              <span className="text-white"> În Pași de Dans</span>. Alege ce te
              interesează și nu pierde nimic.
            </p>

            {/* Type chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 px-4 py-1.5 text-orange-200">
                <CalendarDays className="h-4 w-4" />
                Evenimente viitoare
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-4 py-1.5 text-white/80">
                <Newspaper className="h-4 w-4" />
                Noutăți din școală
              </span>
            </div>

            {/* Quick links */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/60">
              <Link
                href="/inscriere"
                className="hover:text-orange-300 transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-orange-400"
              >
                Înscrie-te la un curs
              </Link>
              <span className="text-white/30">·</span>
              <Link
                href="/petreceri"
                className="hover:text-orange-300 transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-orange-400"
              >
                Vezi petrecerile
              </Link>
              <span className="text-white/30">·</span>
              <Link
                href="/contact"
                className="hover:text-orange-300 transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-orange-400"
              >
                Contactează-ne
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION HEADER + FEED */}
        <section className="relative">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                Cele mai recente
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Ultimele articole publicate, de la cele mai noi
              </p>
            </div>
          </div>

          <NoutatiSection showFilters featuredFirst />
        </section>
      </div>
    </div>
  );
}
