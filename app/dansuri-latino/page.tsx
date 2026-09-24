'use client'

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, BookOpen, Layers, Smile, Sparkles, Users } from 'lucide-react';

import GrupeInFormare from '@/components/grupe-in-formare';
import StructureFeatures from '@/components/StructureFeatures';
import LocationSection from '@/components/LocationSection';
import InstructorsSection from '@/components/InstructorsSection';
import Testimoniale from '@/components/testimoniale';
import { TESTIMONIALE_LATINO } from '@/lib/testimoniale';
import PricingSection from '@/components/PricingSection';
import FaqBlock from '@/components/faq-block';
import { FAQ_LATINO } from '@/lib/faq-stiluri';
import ExploreOtherDances from '@/components/ExploreOtherDances';
import ContactForm from '@/components/contact-form';
import StickyMenu from '@/components/sticky-menu';
import CourseLevelsSection from '@/components/CourseLevelsSection';
import GalerieFoto from '@/components/galerie-foto';
import { GALERIE_LATINO } from '@/lib/galerii';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';

const danceStyles = [
  {
    title: 'Salsa',
    description: 'Dans dinamic și social cu origini în Cuba și Puerto Rico, caracterizat prin mișcări rapide și rotații.',
    imageSrc: '/images/salsa.png',
    imageAlt: 'Cursuri Salsa București',
  },
  {
    title: 'Bachata',
    description: 'Dans senzual din Republica Dominicană, cu mișcări fluide ale șoldurilor și pași laterali.',
    imageSrc: '/images/bachata2.png',
    imageAlt: 'Cursuri Bachata București',
  },
  {
    title: 'Cha-Cha',
    description: 'Dans cubanez energic și jucăuș, cu accent pe ritmul sincopat și mișcările precise ale picioarelor.',
    imageSrc: '/images/cha-cha.png',
    imageAlt: 'Cursuri Cha-Cha București',
  },
  {
    title: 'Rueda',
    description: 'Dans salsa în cerc cu mai multe perechi, sincronizați la comanda unui lider. Energic, social și plin de interacțiune.',
    imageSrc: '/images/rueda.png',
    imageAlt: 'Cursuri Rueda București',
  },
  {
    title: 'Rumba',
    description: 'Dans originar din Cuba, cu mișcări lente și senzuale, axate pe comunicarea dintre parteneri.',
    imageSrc: '/images/rumba.png',
    imageAlt: 'Cursuri Rumba București',
  },
  {
    title: 'Samba',
    description: 'Dans energic originar din Brazilia, cu pași rapizi și un ritm distinctiv de „bounce", exprimând bucurie și dinamism.',
    imageSrc: '/images/samba.png',
    imageAlt: 'Cursuri Samba București',
  },
  {
    title: 'Lindy Hop',
    description: 'Dansul vesel al anilor 30, plin de energie, improvizație și zâmbete. Se dansează pe muzică swing.',
    imageSrc: '/images/lindy-hop.png',
    imageAlt: 'Cursuri Lindy Hop București',
  },
  {
    title: 'Jive',
    description: 'Dans plin de energie și veselie din familia latino, cu pași rapizi, sărituri și multă bună dispoziție.',
    imageSrc: '/images/jive.png',
    imageAlt: 'Cursuri Jive București',
  },
  {
    title: 'Paso Doble',
    description: 'Dans dramatic și pasional, inspirat din corida spaniolă, cu mișcări precise și o atmosferă intensă.',
    imageSrc: '/images/paso-doble.png',
    imageAlt: 'Cursuri Paso Doble București',
  },
];

export default function DansuriLatino() {
  const router = useRouter();

  const breadcrumbItems = [
    { name: 'Acasă', url: '/' },
    { name: 'Dansuri latino' },
  ];

  const handleSalsaBachataClick = () => {
    router.push('/dansuri-latino/salsa-bachata');
    setTimeout(() => { window.scrollTo(0, 0); }, 100);
  };

  return (
    <>
      <StickyMenu menuItems={[
        { id: 'despre-latino', label: 'Despre Latino' },
        { id: 'stiluri-dans', label: 'Stiluri de Dans' },
        { id: 'structura', label: 'Structura' },
        { id: 'instructori', label: 'Instructori' },
        { id: 'tarife', label: 'Tarife' },
        { id: 'testimoniale', label: 'Testimoniale' },
        { id: 'intrebari', label: 'Întrebări' },
        { id: 'inscriere', label: 'Înscriere' },
      ]} />

      <div className="container py-12 flex flex-col gap-16">
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/dansuri-latino" />

        {/* Hero */}
        <div id="despre-latino" className="flex flex-col items-center gap-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-sm font-medium px-4 py-1.5 rounded-full border border-red-100 ">
            <Sparkles className="w-4 h-4" />
            9 stiluri · Grupe pe nivel · București
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Cursuri de{' '}
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              dansuri latino
            </span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            Ritmuri pline de viață, mișcări expresive și o comunitate prietenoasă. Indiferent de
            nivelul tău, vei pleca de la fiecare ședință cu mai multă încredere și bucurie.
          </p>
          <p className="text-base text-gray-500 max-w-2xl">
            Originare din America Latină și Caraibe, dansurile latino combină tehnici specifice de
            pași cu coordonarea dintre parteneri — o experiență completă pentru corp și minte.
          </p>
          <Button variant="brand"
              size="lg"
              className="text-base" asChild><Link href="#inscriere" className="mt-2">
              Înscrie-te la curs
            </Link></Button>
        </div>

        {/* Stiluri de dans — grid */}
        <div id="stiluri-dans" className="flex flex-col gap-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Stiluri de dans latino</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Explorează 9 stiluri diferite — de la salsa și bachata până la paso doble și lindy hop.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {danceStyles.map((dance) => (
              <div
                key={dance.title}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
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
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {dance.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Salsa & Bachata CTA */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-orange-500 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-24 h-24 bg-white rounded-full" />
            <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-full" />
            <div className="absolute bottom-6 left-10 w-12 h-12 bg-white rounded-full" />
            <div className="absolute bottom-4 right-4 w-28 h-28 bg-white rounded-full" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full border border-white/30">
              <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
              Grupe specializate · Locuri limitate
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Grupe speciale pentru{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">
                Salsa și Bachata
              </span>
            </h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
              Pentru cei care doresc să se specializeze în Salsa și Bachata, oferim grupe dedicate cu
              program structurat și progres pas cu pas — ideal pentru începători și intermediari.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 w-full max-w-2xl">
              {[
                { icon: BookOpen, title: 'Program dedicat', sub: 'Structurat pas cu pas' },
                { icon: Users, title: 'Instructori specializați', sub: 'Experiență salsa & bachata' },
                { icon: Layers, title: 'Progres structurat', sub: 'De la începător la avansat' },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
                  <Icon className="w-5 h-5 text-yellow-300 mx-auto mb-1.5" />
                  <div className="text-white font-semibold text-sm">{title}</div>
                  <div className="text-white/75 text-xs mt-0.5">{sub}</div>
                </div>
              ))}
            </div>
            <Button
              onClick={handleSalsaBachataClick}
              size="lg"
              className="bg-white text-red-700 hover:bg-orange-50 font-semibold shadow-md"
            >
              Descoperă grupele Salsa & Bachata
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div id="structura">
          <StructureFeatures />
        </div>

        <CourseLevelsSection />

        <GalerieFoto imagini={GALERIE_LATINO} subtitlu="Mai mult decât simple lecții — o comunitate prietenoasă, energie vibrantă și momente de bucurie autentică la fiecare ședință." inaltime="mare" />

        <GrupeInFormare />
        <LocationSection />

        <div id="instructori">
          <InstructorsSection instructorNames={['Alexandra', 'Miriam', 'Nicholas']} courseName="latino" />
        </div>

        <div id="tarife">
          <PricingSection title="Dansuri Latino – Tarife și abonamente" />
        </div>

        <div id="testimoniale">
          <Testimoniale items={TESTIMONIALE_LATINO} />
        </div>

        <div id="intrebari">
          <FaqBlock intrebari={FAQ_LATINO} titlu="Întrebări frecvente (FAQ)" subtitlu="Răspunsuri la cele mai frecvente întrebări despre cursurile noastre de dans" icon="plus" deschisPrima className="py-16" />
        </div>

        <ExploreOtherDances exclude="latino" />

        <div id="inscriere" className="px-0 md:px-32">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">
            Completează formularul și înscrie-te la cursurile de dans latino
          </h3>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
