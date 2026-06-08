'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Leaf, Music2, Sparkles, Users } from 'lucide-react';

import GrupeInFormare from '@/components/grupe-in-formare';
import FolkDancesCarousel from '@/components/FolkDancesCarousel';
import WhyChooseUsFolkDances from '@/components/WhyChooseUsFolkDances';
import FolkDancesStructure from '@/components/FolkDancesStructure';
import FolkDancesRegions from '@/components/FolkDancesRegions';
import LocationSection from '@/components/LocationSection';
import InstructorsSection from '@/components/InstructorsSection';
import PricingSection from '@/components/PricingSection';
import FolkDancesTestimonials from '@/components/FolkDancesTestimonials';
import FolkPopularFAQ from '@/components/FolkPopularFAQ';
import ExploreOtherDances from '@/components/ExploreOtherDances';
import ContactForm from '@/components/contact-form';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';

const infoCards = [
  {
    icon: Leaf,
    title: 'De ce sunt speciale?',
    text: 'Dansurile populare impresionează prin diversitate: ritmuri antrenante, mișcări pline de energie și un spirit comunitar care creează o legătură autentică între oameni. Nu sunt doar pași, ci povești vii despre tradiții și bucuria de a fi împreună.',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
  },
  {
    icon: Users,
    title: 'Cui se adresează?',
    text: 'Cursurile sunt deschise tuturor — fie că ești la început, fie că ai mai dansat. Se potrivesc copiilor, adolescenților și adulților, fiind o modalitate minunată de a petrece timpul liber activ și cultural.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    icon: Calendar,
    title: 'Când sunt potrivite?',
    text: 'Ideale pentru nunți, petreceri, festivaluri sau evenimente tradiționale, dar și ca activitate recreativă ce aduce mișcare, voie bună și prietenii noi.',
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-950/30',
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
        <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium px-4 py-1.5 rounded-full border border-red-100 dark:border-red-900">
          <Sparkles className="w-4 h-4" />
          Peste 200 de jocuri · 8 regiuni · București
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Cursuri de{' '}
          <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            dansuri populare
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          De la hora moldovenească și sârba energică, până la brâul muntenesc și bătuta ursului —
          fiecare pas te apropie de autenticitatea și frumusețea culturii românești.
        </p>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl">
          Vei învăța jocuri din toate colțurile României, plus dansuri grecești și machedonești,
          într-o atmosferă caldă, prietenoasă și plină de viață.
        </p>
        <Link href="#inscriere" className="mt-2">
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 shadow-lg shadow-red-200 dark:shadow-red-900/30 text-base"
          >
            Înscrie-te la curs
          </Button>
        </Link>
      </div>

      {/* Info cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {infoCards.map(({ icon: Icon, title, text, color, bg }) => (
          <div
            key={title}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      {/* Carusel */}
      <FolkDancesCarousel />

      <WhyChooseUsFolkDances />

      <FolkDancesStructure />

      <FolkDancesRegions />

      <LocationSection />

      <InstructorsSection
        instructorNames={['Alexandra', 'Cătălina']}
        courseName="popular"
      />

      <PricingSection title="Alege abonamentul potrivit pentru tine" />

      <FolkDancesTestimonials />

      <FolkPopularFAQ />

      <ExploreOtherDances
        danceCategories={[
          {
            id: 1,
            title: 'Dansuri Latino',
            description: 'Salsa, bachata, cha-cha și multe altele',
            imageSrc: '/images/latino.png',
            imageAlt: 'Dansuri latino',
            href: '/dansuri-latino',
            gradient: 'from-red-500 to-orange-600',
          },
          {
            id: 2,
            title: 'Dansuri de Societate',
            description: 'Vals, tango, foxtrot și multe altele',
            imageSrc: '/images/societate.png',
            imageAlt: 'Dansuri de societate',
            href: '/dansuri-de-societate',
            gradient: 'from-blue-500 to-purple-600',
          },
          {
            id: 3,
            title: 'Cursuri particulare de dans',
            description: 'Instruire personalizată pentru progres rapid',
            imageSrc: '/images/private.png',
            imageAlt: 'Cursuri particulare de dans',
            href: '/lectii-private',
            gradient: 'from-green-500 to-teal-600',
          },
        ]}
        sectionTitle="Explorează și alte dansuri"
        sectionDescription="Descoperă diversitatea stilurilor de dans pe care le oferim"
      />

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
