import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { AlertCircle, Award, Clock, Heart, Music, Shield, Sparkles, Users } from 'lucide-react';
import GrupeInFormare from '@/components/grupe-in-formare';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import WeddingDanceTestimonials from '@/components/WeddingDanceTestimonials';
import DansulMirilorPricing from '@/components/DansulMirilorPricing';

export const metadata: Metadata = {
  title: 'Dans Nuntă București – Coregrafie Mirilor | 3-4 Lecții | În Pași de Dans',
  description: 'Dansul mirilor în București - Transformă primul dans în cea mai emoționantă amintire a nunții. Coregrafii personalizate, program flexibil, instructori dedicați. Înscrie-te acum!',
  keywords: 'dansul mirilor, cursuri private dans, lectii private nunta, coregrafie dans miri, Bucuresti',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/dansul-mirilor',
  },
  openGraph: {
    title: 'Dansul Mirilor București | Cursuri Private | În Pași de Dans',
    description: 'Dansul mirilor cu coregrafie personalizată. Lecții private 1-la-1, program flexibil și instructori dedicați. București.',
    url: 'https://www.inpasidedans.ro/dansul-mirilor',
    type: 'website',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/logo.png',
        alt: 'Dansul mirilor la În Pași de Dans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dansul Mirilor București | Cursuri Private | În Pași de Dans',
    description: 'Dansul mirilor cu coregrafie personalizată. Lecții private 1-la-1, program flexibil și instructori dedicați. București.',
    images: ['https://www.inpasidedans.ro/images/logo.png'],
  },
  robots: { index: true, follow: true },
};

const breadcrumbItems = [
  { name: 'Acasă', url: '/' },
  { name: 'Dansul mirilor' },
];

export default function DansulMirilor() {
  return (
    <div className="container py-12">
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/dansul-mirilor" />
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium px-4 py-1.5 rounded-full border border-red-100 dark:border-red-900">
              <Sparkles className="w-4 h-4" />
              Cursuri private pentru miri
            </div>
            <h1 className="text-4xl font-bold tracking-tight leading-tight">
              Dans Nuntă București –{' '}
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Dansul Mirilor
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Dansul mirilor este unul dintre cele mai emoționante momente ale
              nunții. Vă ghidăm pas cu pas pentru a crea o coregrafie
              personalizată — vals clasic, tango, dans latino sau o surpriză
              plină de personalitate.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Indiferent de nivelul vostru, instructorii noștri vă vor ajuta
              să vă simțiți încrezători și pregătiți pentru marele moment.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/contact?utm_source=google&utm_medium=trafic+organic&utm_campaign=google+business+profile">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 shadow-lg shadow-red-200 dark:shadow-red-900/30"
                >
                  Programează o ședință
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[440px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/private.png?height=800&width=600"
              alt="Dans de societate"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>

        <DansulMirilorPricing />
        <div>
          <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Informații despre plată</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 space-y-2">
                <li>Dacă doriți să efectuați plata la fiecare ședință, prețul pentru o lecție particulară de dans este 200 lei.</li>
                <li>În cazul în care optați pentru unul din pachete, plata orelor particulare de dans se va face integral la prima ședință.</li>
                <li>Anularea și reprogramarea unei ședințe se va face cu cel puțin 24 de ore înainte, telefonic. În caz contrar, ședința se consideră efectuată.</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>

        <div className="mt-16 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">De ce să alegeți cursurile noastre</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Tot ce aveți nevoie pentru un dans al mirilor memorabil, într-un singur loc.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 pt-4">
            {[
              {
                icon: Award,
                title: 'Instructori cu experiență',
                desc: 'Instructorii noștri au pregătit mii de cupluri pentru momentul special al nunții.',
                color: 'text-red-500',
                bg: 'bg-red-50 dark:bg-red-950/30',
              },
              {
                icon: Music,
                title: 'Coregrafii personalizate',
                desc: 'Creăm coregrafii adaptate nivelului, stilului, personalității și aptitudinilor fiecărui cuplu.',
                color: 'text-orange-500',
                bg: 'bg-orange-50 dark:bg-orange-950/30',
              },
              {
                icon: Shield,
                title: 'Săli private',
                desc: 'Toate ședințele se desfășoară în săli private. Veți fi doar voi și instructorul în sală.',
                color: 'text-rose-500',
                bg: 'bg-rose-50 dark:bg-rose-950/30',
              },
              {
                icon: Clock,
                title: 'Program flexibil',
                desc: 'Programăm ședințele în funcție de disponibilitatea voastră, inclusiv în weekend.',
                color: 'text-amber-500',
                bg: 'bg-amber-50 dark:bg-amber-950/30',
              },
              {
                icon: Heart,
                title: 'Atmosferă relaxată',
                desc: 'Creăm o atmosferă prietenoasă și relaxată, pentru a vă ajuta să vă simțiți confortabil.',
                color: 'text-pink-500',
                bg: 'bg-pink-50 dark:bg-pink-950/30',
              },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
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

        {/* Ce înveți în primele 4 ședințe */}
        <div className="mt-12 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
          <h2 className="text-2xl font-bold mb-2 text-center">
            Ce se întâmplă în primele 4 ședințe
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Fiecare ședință are un obiectiv clar — la final veți fi pregătiți să dansați cu
            încredere în fața invitaților.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                nr: '1',
                titlu: 'Consultare coregrafică',
                desc: 'Ascultăm melodia aleasă, discutăm despre stilul preferat (vals, tango, latino) și stabilim nivelul de dificultate potrivit pentru voi.',
              },
              {
                nr: '2',
                titlu: 'Pași de bază',
                desc: 'Învățați postura de cuplu, conexiunea cu partenerul și pașii fundamentali ai stilului ales, pas cu pas, fără presiune.',
              },
              {
                nr: '3',
                titlu: 'Prima coregrafie',
                desc: 'Construim primele secvențe: intrarea pe ring, prima parte a dansului și un element surpriză dacă doriți.',
              },
              {
                nr: '4',
                titlu: 'Repetiție + video',
                desc: 'Repetăm coregra­fia completă și facem o înregistrare video ca să o puteți exersa și acasă. Ajustăm dacă e nevoie.',
              },
            ].map((item) => (
              <div
                key={item.nr}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-red-100 dark:border-red-900"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
                  {item.nr}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.titlu}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-3xl overflow-hidden border border-red-100 dark:border-red-900/50 shadow-lg">
          <div className="grid md:grid-cols-2 items-stretch">
            <div className="bg-gradient-to-br from-red-600 to-orange-500 p-10 flex flex-col justify-center gap-5">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full w-fit">
                <Users className="w-4 h-4" />
                Mai mult decât dansul mirilor
              </div>
              <h2 className="text-3xl font-bold text-white leading-snug">
                Pregătiți și pentru alte dansuri?
              </h2>
              <p className="text-white/85 leading-relaxed">
                Pe lângă dansul mirilor, vă putem ajuta să pregătiți și alte
                momente speciale pentru nuntă — dansul cu părinții sau nașii,
                dansuri de grup sau coregrafii surpriză pentru invitați.
              </p>
              <Link href="/contact?utm_source=google&utm_medium=trafic+organic&utm_campaign=google+business+profile">
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-white/90 font-semibold shadow-md w-fit"
                >
                  Contactează-ne pentru detalii
                </Button>
              </Link>
            </div>
            <div className="relative h-72 md:h-auto min-h-[280px]">
              <Image
                src="/images/nunta2.png?height=800&width=600"
                alt="Dans de societate"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent" />
            </div>
          </div>
        </div>

        <WeddingDanceTestimonials />
      </div>
      <GrupeInFormare />
    </div>
  );
}
