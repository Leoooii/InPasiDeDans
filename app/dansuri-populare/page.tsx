'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Leaf, Music2, Sparkles, Users } from 'lucide-react';

import GrupeInFormare from '@/components/grupe-in-formare';
import GalerieFoto from '@/components/galerie-foto';
import { GALERIE_POPULARE } from '@/lib/galerii';
import WhyChooseUsFolkDances from '@/components/WhyChooseUsFolkDances';
import FolkDancesStructure from '@/components/FolkDancesStructure';
import FolkDancesRegions from '@/components/FolkDancesRegions';
import LocationSection from '@/components/LocationSection';
import InstructorsSection from '@/components/InstructorsSection';
import PricingSection from '@/components/PricingSection';
import Testimoniale from '@/components/testimoniale';
import { TESTIMONIALE_POPULARE } from '@/lib/testimoniale';
import FaqBlock from '@/components/faq-block';
import { FAQ_POPULARE } from '@/lib/faq-stiluri';
import ExploreOtherDances from '@/components/ExploreOtherDances';
import ContactForm from '@/components/contact-form';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';

const infoCards = [
  {
    icon: Leaf,
    title: 'De ce sunt speciale?',
    text: 'Dansurile populare impresionează prin diversitate: ritmuri antrenante, mișcări pline de energie și un spirit comunitar care creează o legătură autentică între oameni. Nu sunt doar pași, ci povești vii despre tradiții și bucuria de a fi împreună.',
    color: 'text-orange-500',
    bg: 'bg-orange-50 ',
  },
  {
    icon: Users,
    title: 'Cui se adresează?',
    text: 'Cursurile sunt deschise tuturor — fie că ești la început, fie că ai mai dansat. Se potrivesc copiilor, adolescenților și adulților, fiind o modalitate minunată de a petrece timpul liber activ și cultural.',
    color: 'text-red-500',
    bg: 'bg-red-50 ',
  },
  {
    icon: Calendar,
    title: 'Când sunt potrivite?',
    text: 'Ideale pentru nunți, petreceri, festivaluri sau evenimente tradiționale, dar și ca activitate recreativă ce aduce mișcare, voie bună și prietenii noi.',
    color: 'text-orange-500',
    bg: 'bg-orange-50 ',
  },
];

export default function DansuriPopulare() {
  const breadcrumbItems = [
    { name: 'Acasă', url: '/' },
    { name: 'Dansuri populare' },
  ];

  return (
    <div className="container py-12 flex flex-col gap-16 px-4 md:px-6">
      <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/dansuri-populare" />

      {/* Hero */}
      <div className="flex flex-col items-center gap-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-sm font-medium px-4 py-1.5 rounded-full border border-red-100 ">
          <Sparkles className="w-4 h-4" />
          Peste 200 de jocuri · 8 regiuni · București
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Cursuri de{' '}
          <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            dansuri populare
          </span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          De la hora moldovenească și sârba energică, până la brâul muntenesc și bătuta ursului —
          fiecare pas te apropie de autenticitatea și frumusețea culturii românești.
        </p>
        <p className="text-base text-slate-500 max-w-2xl">
          Vei învăța jocuri din toate colțurile României, plus dansuri grecești și machedonești,
          într-o atmosferă caldă, prietenoasă și plină de viață.
        </p>
        <Button variant="brand"
            size="lg"
            className="text-base" asChild><Link href="#inscriere" className="mt-2">
            Înscrie-te la curs
          </Link></Button>
      </div>

      {/* Info cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {infoCards.map(({ icon: Icon, title, text, color, bg }) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      {/* Carusel */}
      <GalerieFoto imagini={GALERIE_POPULARE} subtitlu="Energie, voie bună și tradiție autentică — la fiecare ședință." autoplayMs={false} inContainer={false} />

      <WhyChooseUsFolkDances />

      <FolkDancesStructure />

      <FolkDancesRegions />

      <LocationSection />

      <InstructorsSection
        instructorNames={['Alexandra', 'Cătălina']}
        courseName="popular"
      />

      <PricingSection title="Alege abonamentul potrivit pentru tine" />

      <Testimoniale items={TESTIMONIALE_POPULARE} latime="treime" />

      <FaqBlock intrebari={FAQ_POPULARE} titlu="Întrebări frecvente despre dansurile populare" icon="plus" deschisPrima className="py-16" />

      <ExploreOtherDances exclude="populare" />

      <div id="inscriere" className="px-0 md:px-32">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">
          Completează formularul și înscrie-te la cursurile de dansuri populare
        </h3>
        <ContactForm />
      </div>

      <GrupeInFormare />
    </div>
  );
}
