import NoutatiSection from '@/components/noutati-section';
import { DarkAntetSectiune, DarkEticheta, DarkPageShell, DarkTitlu, Evidentiat } from '@/components/dark-page';
import { getEvenimente, safe } from '@/lib/public-data';
import { Newspaper, CalendarDays, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Noutăți și Evenimente | În Pași de Dans',
  description:
    'Află ultimele noutăți, evenimente și promoții de la școala noastră de dans. Fii la curent cu tot ce se întâmplă la În Pași de Dans, București!',
  keywords:
    'noutati dans, evenimente dans, stiri scoala de dans, promotii dans Bucuresti',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/noutati',
  },
  openGraph: {
    type: 'website',
    title: 'Noutăți și Evenimente | În Pași de Dans',
    description:
      'Află ultimele noutăți, evenimente și promoții de la școala noastră de dans. Fii la curent cu tot ce se întâmplă la În Pași de Dans, București!',
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
    title: 'Noutăți și Evenimente | În Pași de Dans',
    description:
      'Află ultimele noutăți, evenimente și promoții de la școala noastră de dans. Fii la curent cu tot ce se întâmplă la În Pași de Dans, București!',
    images: ['https://www.inpasidedans.ro/images/logo.png'],
  },
};

export default async function NoutatiPage() {
  const evenimente = await safe(getEvenimente, null);

  return (
    <DarkPageShell pagina="Noutăți" url="https://www.inpasidedans.ro/noutati">
      {/* HERO */}
      <section className="mt-10 md:mt-16 mb-12 md:mb-20">
        <div className="max-w-5xl mx-auto text-center">
          <DarkEticheta icon={Sparkles}>Noutăți din școala de dans</DarkEticheta>

          <DarkTitlu>
            <Evidentiat>
              Noutăți
            </Evidentiat>{' '}
            &{' '}
            <Evidentiat>
              Evenimente
            </Evidentiat>
          </DarkTitlu>

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
        <DarkAntetSectiune titlu="Cele mai recente" subtitlu="Ultimele articole publicate, de la cele mai noi" />

        <NoutatiSection showFilters featuredFirst initial={evenimente} />
      </section>
    </DarkPageShell>
  );
}
