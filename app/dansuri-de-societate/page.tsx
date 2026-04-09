import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, Clock, Heart, Sparkles, Star, Users, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dansuri de Societate București | Vals, Tango, Foxtrot | În Pași de Dans',
  description: 'Cursuri dansuri de societate București – vals lent, vals vienez, tango, foxtrot pentru toate nivelurile. Instructori profesioniști, Sector 4-5-6. Înscrie-te acum!',
  keywords: 'dansuri de societate, vals, tango, foxtrot, lectii elegante de dans',
  alternates: { canonical: 'https://www.inpasidedans.ro/dansuri-de-societate' },
  openGraph: {
    title: 'Dansuri de Societate București | În Pași de Dans',
    description: 'Participă la cursuri de dansuri de societate într-o atmosferă elegantă și relaxantă.',
    url: 'https://www.inpasidedans.ro/dansuri-de-societate',
    images: [{ url: 'https://www.inpasidedans.ro/images/logo.png', alt: 'Dansuri de societate București' }],
    locale: 'ro_RO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

import GrupeInFormare from '@/components/grupe-in-formare';
import LocationSection from '@/components/LocationSection';
import InstructorsSection from '@/components/InstructorsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import FAQSection from '@/components/FAQSection';
import ExploreOtherDances from '@/components/ExploreOtherDances';
import ContactForm from '@/components/contact-form';
import StickyMenu from '@/components/sticky-menu';
import CourseLevelsSection from '@/components/CourseLevelsSection';
import CharmHarmonySection from '@/components/CharmHarmonySection';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';

const danceStyles = [
  {
    title: 'Vals Lent',
    description: 'Dans elegant cu mișcări line, pași grațioși și rotații ample — transmite calm, romantism și fluiditate.',
    imageSrc: '/images/vals-lent.png',
    imageAlt: 'Cursuri Vals Lent București',
  },
  {
    title: 'Vals Vienez',
    description: 'Formă rapidă a valsului, cu rotații elegante continue pe tempo de 3/4 alert — plin de rafinament și romantism.',
    imageSrc: '/images/vienez.jpeg',
    imageAlt: 'Cursuri Vals Vienez București',
  },
  {
    title: 'Tango',
    description: 'Dans pasional și intens originar din Argentina, cu postură dramatică, pași preciși și conexiune profundă dintre parteneri.',
    imageSrc: '/images/tango2.png',
    imageAlt: 'Cursuri Tango București',
  },
  {
    title: 'Slow Fox (Foxtrot)',
    description: 'Dans elegant și fluid pe muzică jazz și swing, cu mișcări lungi și grațioase — perfect pentru începători.',
    imageSrc: '/images/slowfox.png',
    imageAlt: 'Cursuri Foxtrot București',
  },
  {
    title: 'Quickstep',
    description: 'Dans rapid și săltăreț derivat din foxtrot, cu deplasări fluide pe ring — vesel, jucăuș, plin de energie.',
    imageSrc: '/images/quickstep.png',
    imageAlt: 'Cursuri Quickstep București',
  },
];

const reasons = [
  {
    icon: Star,
    title: 'Instructori pasionați',
    desc: 'Explicăm pas cu pas, într-un mod prietenos și accesibil.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-950/30',
  },
  {
    icon: Heart,
    title: 'Atmosferă relaxată',
    desc: 'Te simți ca între prieteni, indiferent dacă vii singur(ă) sau cu partener.',
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-950/30',
  },
  {
    icon: Award,
    title: 'Diversitate de stiluri',
    desc: 'Vals, tango, quickstep, foxtrot — descoperi eleganța fiecărui dans.',
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-950/30',
  },
  {
    icon: Users,
    title: 'Comunitate',
    desc: 'Faci parte dintr-un grup cu aceleași pasiuni și creezi amintiri frumoase.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    icon: Clock,
    title: 'Program flexibil',
    desc: 'Cursuri pentru începători și avansați, pe grupe sau în privat.',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
  },
  {
    icon: Zap,
    title: 'Corp și minte',
    desc: 'Mișcare, grație, încredere și bună dispoziție la fiecare lecție.',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
  },
];

export default function DansuriDeSocietate() {
  const breadcrumbItems = [
    { name: 'Acasă', url: '/' },
    { name: 'Dansuri de societate' },
  ];

  return (
    <>
      <StickyMenu menuItems={[
        { id: 'despre-societate', label: 'Despre Societate' },
        { id: 'stiluri-dans', label: 'Stiluri de Dans' },
        { id: 'de-ce-noi', label: 'De ce noi?' },
        { id: 'locatie', label: 'Locație' },
        { id: 'tarife', label: 'Tarife' },
        { id: 'instructori', label: 'Instructori' },
        { id: 'testimoniale', label: 'Testimoniale' },
        { id: 'intrebari', label: 'Întrebări' },
        { id: 'inscriere', label: 'Înscriere' },
      ]} />

      <div className="container py-12 flex flex-col gap-16">
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/dansuri-de-societate" />

        {/* Hero */}
        <div id="despre-societate" className="flex flex-col items-center gap-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium px-4 py-1.5 rounded-full border border-red-100 dark:border-red-900">
            <Sparkles className="w-4 h-4" />
            5 stiluri · Grupe pe nivel · București
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Cursuri de{' '}
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              dansuri de societate
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
            De la eleganța valsului și pasiunea tango-ului, la ritmul vesel al quickstep-ului —
            fiecare dans îți oferă o poveste aparte și te ajută să strălucești la orice eveniment.
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl">
            Potrivite pentru oricine își dorește să danseze, să se relaxeze și să se bucure de
            mișcare — indiferent de nivel sau vârstă.
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

        {/* Stiluri de dans — grid */}
        <div id="stiluri-dans" className="flex flex-col gap-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Stiluri de dans de societate</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Eleganță, grație și rafinament — 5 stiluri clasice pentru toate gusturile.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {danceStyles.map((dance) => (
              <div
                key={dance.title}
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={dance.imageSrc}
                    alt={dance.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-xl font-bold text-white drop-shadow-sm">
                    {dance.title}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {dance.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* De ce noi */}
        <div id="de-ce-noi" className="flex flex-col gap-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">De ce să înveți dansuri de societate cu noi?</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Tot ce contează pentru o experiență plăcută și un progres real.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <CharmHarmonySection />

        <CourseLevelsSection />

        <div id="grupe-in-formare">
          <GrupeInFormare />
        </div>

        <div id="locatie">
          <LocationSection />
        </div>

        <div id="tarife">
          <PricingSection title="Dansuri de societate – Tarife și abonamente" />
        </div>

        <div id="instructori">
          <InstructorsSection instructorNames={['Alexandra', 'Miriam']} courseName="de societate" />
        </div>

        <div id="testimoniale">
          <TestimonialsSection danceType="societate" />
        </div>

        <div id="intrebari">
          <FAQSection danceType="societate" />
        </div>

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
              title: 'Lecții Private',
              description: 'Instruire personalizată pentru progres rapid',
              imageSrc: '/images/private.png',
              imageAlt: 'Lecții private de dans',
              href: '/lectii-private',
              gradient: 'from-green-500 to-teal-600',
            },
            {
              id: 3,
              title: 'Dansuri Populare',
              description: 'Peste 200 de jocuri populare românești',
              imageSrc: '/images/populare.png',
              imageAlt: 'Dansuri populare românești',
              href: '/dansuri-populare',
              gradient: 'from-orange-500 to-red-600',
            },
          ]}
          sectionTitle="Explorează și alte dansuri"
          sectionDescription="Descoperă diversitatea stilurilor de dans pe care le oferim"
        />

        <div id="inscriere" className="px-0 md:px-32">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">
            Completează formularul și înscrie-te la cursurile de dans de societate
          </h3>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
