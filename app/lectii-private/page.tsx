'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Calendar,
  Clock,
  Heart,
  Layers,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import ContactForm from '@/components/contact-form';
import DansulMirilorPricing from '@/components/DansulMirilorPricing';

const forWhom = [
  {
    icon: Clock,
    title: 'Program variabil',
    desc: 'Nu poți participa constant la cursurile de grup? Stabilim noi împreună orarul.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    icon: Heart,
    title: 'Abordare personală',
    desc: 'Preferi să înveți fără presiunea grupului, în propriul ritm.',
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-950/30',
  },
  {
    icon: Layers,
    title: 'Stil specific',
    desc: 'Vrei să te concentrezi pe un singur stil de dans sau să aprofundezi tehnica.',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
  },
];

const benefits = [
  {
    icon: Award,
    title: 'Instructori cu experiență',
    desc: 'Lucrezi 1-la-1 cu un instructor dedicat, care se adaptează nivelului și ritmului tău.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-950/30',
  },
  {
    icon: Target,
    title: 'Plan personalizat',
    desc: 'Fiecare ședință urmează un plan adaptat obiectivelor și progresului tău.',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
  },
  {
    icon: Calendar,
    title: 'Program flexibil',
    desc: 'Programăm ședințele în funcție de disponibilitatea ta, inclusiv în weekend.',
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-950/30',
  },
  {
    icon: Users,
    title: 'Sală privată',
    desc: 'Toate ședințele au loc în sală privată — vei fi doar tu și instructorul.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    icon: Heart,
    title: 'Atmosferă relaxată',
    desc: 'Mediu prietenos și fără presiune, ca să te simți confortabil de la prima ședință.',
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-950/30',
  },
  {
    icon: Layers,
    title: 'Orice stil de dans',
    desc: 'Latino, populare, societate, dans pentru nuntă — alegi tu ce vrei să înveți.',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
  },
];

export default function LectiiPrivate() {
  const breadcrumbItems = [
    { name: 'Acasă', url: '/' },
    { name: 'Lecții private' },
  ];

  return (
    <div className="container py-12 flex flex-col gap-16 px-4 md:px-6">
      <SEOBreadcrumbs
        items={breadcrumbItems}
        currentPageUrl="https://www.inpasidedans.ro/lectii-private"
      />

      {/* Hero */}
      <div className="flex flex-col items-center gap-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium px-4 py-1.5 rounded-full border border-red-100 dark:border-red-900">
          <Sparkles className="w-4 h-4" />
          Instructor dedicat · 1-la-1 · Program flexibil
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Cursuri{' '}
          <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            particulare de dans
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          Progresezi în ritmul tău, cu un instructor dedicat, program flexibil și un plan personalizat
          adaptat exact nevoilor tale.
        </p>
        <Link href="#inscriere" className="mt-2">
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 shadow-lg shadow-red-200 dark:shadow-red-900/30 text-base"
          >
            Programează o ședință
          </Button>
        </Link>
      </div>

      {/* Hero image + pentru cine */}
      <div className="grid gap-8 md:grid-cols-2 items-center">
        <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/images/private3.png"
            alt="Lecții private dans București"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Pentru cine sunt potrivite?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Lecțiile private se adaptează oricărui stil de viață și oricărui nivel.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {forWhom.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* De ce noi */}
      <div className="flex flex-col gap-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">De ce să alegi lecțiile private?</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Totul este adaptat la tine — nu invers.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pachete — același component ca /dansul-mirilor */}
      <DansulMirilorPricing />

      {/* Contact form */}
      <div id="inscriere" className="px-0 md:px-32">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">
          Completează formularul și programează prima ta ședință
        </h3>
        <ContactForm />
      </div>

      <GrupeInFormare />
    </div>
  );
}
