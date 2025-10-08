'use client'

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Head from './head';
import GrupeInFormare from '@/components/grupe-in-formare';
import { ArrowRight } from 'lucide-react';
import StructureFeatures from '@/components/StructureFeatures';
import DancePresentationCard from '@/components/DancePresentationCard';
import FeaturesGrid from '@/components/FeaturesGrid';
import LocationSection from '@/components/LocationSection';
import InstructorsSection from '@/components/InstructorsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import FAQSection from '@/components/FAQSection';
import ExploreOtherDances from '@/components/ExploreOtherDances';
import LatinoSignupForm from '@/components/LatinoSignupForm';
import ContactForm from '@/components/contact-form';
import StickyMenu from '@/components/sticky-menu';
import CourseLevelsSection from '@/components/CourseLevelsSection';
import LatinoAtmosphereSection from '@/components/LatinoAtmosphereSection';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';




export default function DansuriLatino() {
  const router = useRouter();
  
  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Dansuri latino" }
  ];

  const handleSalsaBachataClick = () => {
    router.push('/dansuri-latino/salsa-bachata');
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
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
        { id: 'inscriere', label: 'Înscriere' }
      ]} />
      <div className="container py-12 flex flex-col gap-12">
        <Head />
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/dansuri-latino" />
        <div id="despre-latino" className="p-0 container flex flex-col gap-4 items-center">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-center">Dansuri latino</h1>
          <div>
                      <p className="text-lg md:text-2xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-6xl mx-auto font-serif mb-2">
            Cursurile noastre îmbină ritmurile pline de viață cu eleganța mișcărilor, oferindu-ți nu doar pași de dans, ci și încredere, bucurie și o stare de bine. Indiferent de nivelul tău, dansurile latino îți vor aduce zâmbetul pe buze și te vor conecta la o comunitate prietenoasă și plină de energie.
          </p>
            <p className="text-lg md:text-2xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-[80rem] mx-auto font-serif mb-2">
            Descoperă pasiunea și vibrația stilurilor latino!
            </p>
          </div>
          <Link href="#inscriere" className="mt-4">
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-xl" size="lg">
              Înscrie-te la curs
            </Button>
          </Link>
        </div>
        
        <div className="container flex flex-col gap-4 items-center border-2 border-black p-4">
          <h2 className="text-xl md:text-3xl font-bold tracking-tight text-center">
            Descoperă bucuria dansurilor latino în București
          </h2>
          <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-left max-w-6xl mx-auto font-serif mb-2">
            Dansurile latino sunt cunoscute pentru energia, pasiunea și ritmurile lor contagioase. Originare din America Latină și Caraibe, aceste dansuri combină mișcări expresive ale corpului cu tehnici specifice de pași și coordonare între parteneri.
          </p>
        </div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-center">
        Stiluri de dans latino pe care le vei învăța:
          </h2>
        <div id="stiluri-dans" className="p-0 container flex flex-col gap-12 items-center">
          <DancePresentationCard
            title="Salsa"
            description="Dans dinamic și social, cu origini în Cuba și Puerto Rico, caracterizat prin mișcări rapide ale picioarelor și rotații."
            imageSrc="/images/salsa.png"
            imageAlt="Cursuri Salsa Bucuresti"
            imagePosition="right"
          />
          <DancePresentationCard
            title="Bachata"
            description="Dans senzual din Republica Dominicană, cu mișcări fluide ale șoldurilor și pași laterali."
            imageSrc="/images/bachata2.png"
            imageAlt="Cursuri Bachata Bucuresti"
            imagePosition="left"
          />
          <DancePresentationCard
            title="Cha-Cha"
            description="Dans cubanez energic și jucăuș, cu accent pe ritmul sincopat și mișcările precise ale picioarelor."
            imageSrc="/images/cha-cha.png"
            imageAlt="Cursuri Cha-Cha Bucuresti"
            imagePosition="right"
          />
          <DancePresentationCard
            title="Rueda"
            description="Rueda sau Rueda de Casino este un stil de dans salsa în care mai multe perechi dansează în cerc, sincronizați, schimbând partenerii la comanda unui lider care strigă mișcările. Este energic, social și plin de interacțiune între dansatori."
            imageSrc="/images/rueda.png"
            imageAlt="Cursuri Rueda Bucuresti"
            imagePosition="left"
          />
          <DancePresentationCard
            title="Rumba"
            description="Rumba este un stil de dans originar din Cuba, caracterizat prin mișcări lente, senzuale și expresive, axate pe comunicarea dintre parteneri și mișcările fluide ale șoldurilor."
            imageSrc="/images/rumba.png"
            imageAlt="Cursuri Rumba Bucuresti"
            imagePosition="right"
          />
          <DancePresentationCard
          title='Samba'
          description='Samba este un dans energic și ritmat originar din Brazilia, asociat cu carnavalurile și muzica vibrantă. În forma sa de dans de societate (ballroom), samba are pași rapizi și un ritm distinctiv de „bounce", exprimând bucurie și dinamism.'
          imageSrc='/images/samba.png'
          imageAlt='Cursuri Samba Bucuresti'
          imagePosition='left'
          />
          
          <DancePresentationCard
            title="Lindy hop"
            description="Lindy Hop este dansul vesel al anilor '30, plin de energie, improvizație și zâmbete. Se dansează pe muzică swing și aduce cu el buna dispoziție la fiecare pas!"
            imageSrc="/images/lindy-hop.png"
            imageAlt="Cursuri Lindy Hop Bucuresti"
            imagePosition="right"
          />
          <DancePresentationCard
            title="Jive"
            description="Jive este dansul plin de energie și veselie din familia latino. Cu pași rapizi, sărituri și multă bună dispoziție, jive-ul te cucerește din prima clipă și te ține mereu în mișcare!"
            imageSrc="/images/jive.png"
            imageAlt="Cursuri Jive Bucuresti"
            imagePosition="left"
          />
          <DancePresentationCard
            title="Paso Doble"
            description="Paso Doble este un dans dramatic și pasional, inspirat din corida spaniolă. Este caracterizat prin mișcări precise, poze dramatice și o atmosferă intensă care evocă tensiunea și eleganța arenelor de taur."
            imageSrc="/images/paso-doble.png"
            imageAlt="Cursuri Paso Doble Bucuresti"
            imagePosition="right"
          />
        </div>
        
        {/* SPECIAL SALSA & BACHATA SECTION - COMMENTED OUT */}
        
        <div className="relative overflow-hidden bg-gradient-to-br from-red-500 via-red-600 to-orange-500 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-center shadow-2xl border-2 md:border-4 border-white dark:border-gray-800">
          {/* Background Pattern */}
          
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute top-8 right-8 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute bottom-6 left-8 w-12 h-12 bg-white rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-24 h-24 bg-white rounded-full"></div>
          </div>
          
          
          {/* Content */}
          
          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Badge */}
            
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6 border border-white/30">
              <span className="w-2 h-2 bg-yellow-300 rounded-full mr-2 animate-pulse"></span>
              NOU! Grupe Specializate
            </div>
            
            
            {/* Main Title */}
             
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 md:mb-6 drop-shadow-lg leading-tight">
              🎯 Grupe Speciale pentru 
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mt-1 md:mt-0">
                Salsa și Bachata
              </span>
            </h2>
          
            
            {/* Description */}
            
            <p className="text-sm md:text-lg lg:text-xl text-white/90 leading-relaxed mb-6 md:mb-8 max-w-4xl mx-auto font-medium px-2">
              Pentru cei care doresc să se <strong className="text-yellow-300">specializeze</strong> în 
              <strong className="text-yellow-300"> Salsa și Bachata</strong>, oferim 
              <strong className="text-yellow-300"> grupe dedicate</strong> cu program structurat și 
              progres pas cu pas. Ideal pentru începători și intermediari care vor să învețe 
              aceste stiluri în profunzime.
            </p>
            
            
            {/* Features Grid */}
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 px-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 border border-white/20">
                <div className="text-xl md:text-2xl mb-1 md:mb-2">📚</div>
                <div className="text-white font-semibold text-sm md:text-base">Program Dedicat</div>
                <div className="text-white/80 text-xs md:text-sm">Structurat pas cu pas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 border border-white/20">
                <div className="text-xl md:text-2xl mb-1 md:mb-2">👨‍🏫</div>
                <div className="text-white font-semibold text-sm md:text-base">Instructori Specializați</div>
                <div className="text-white/80 text-xs md:text-sm">Experiență în salsa & bachata</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 border border-white/20">
                <div className="text-xl md:text-2xl mb-1 md:mb-2">🎯</div>
                <div className="text-white font-semibold text-sm md:text-base">Progres Structurat</div>
                <div className="text-white/80 text-xs md:text-sm">De la începător la avansat</div>
              </div>
            </div>
            
            
            {/* CTA Button */}
            
            <div className="flex flex-col gap-4 justify-center items-center">
              <Button 
                onClick={handleSalsaBachataClick}
                className="bg-white text-red-600 hover:bg-yellow-50 text-base md:text-xl font-bold px-6 py-3 md:px-10 md:py-5 rounded-xl md:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 md:hover:scale-110 border-2 border-white/50 w-full sm:w-auto"
              >
                <span className="hidden sm:inline">🚀 Descoperă Grupele Speciale Salsa & Bachata</span>
                <span className="sm:hidden">🚀 Grupe Salsa & Bachata</span>
                <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6" />
              </Button>
              <div className="text-white/80 text-xs md:text-sm font-medium text-center">
                ✨ Grupe limitate • 📅 Program flexibil • 🎵 Muzică autentică
              </div>
            </div>
          </div>
        </div>
        
        
        <div id="structura">
          <StructureFeatures/>
        </div>
        
        <CourseLevelsSection />
        
        <LatinoAtmosphereSection />
        
        <GrupeInFormare/>
        <LocationSection/>
        
        <div id="instructori">
          <InstructorsSection instructorNames={['Alexandra', 'Miriam', 'Nicholas']} courseName="latino"/>
        </div>
        
        <div id="tarife">
          <PricingSection title="Dansuri Latino – Tarife și abonamente"/>
        </div>
        
        <div id="testimoniale">
          <TestimonialsSection danceType="latino"/>
        </div>
        
        <div id="intrebari">
          <FAQSection danceType="latino"/>
        </div>
        
        <ExploreOtherDances 
          danceCategories={[
            {
              id: 1,
              title: 'Dansuri de Societate',
              description: 'Vals, tango, foxtrot și multe altele',
              imageSrc: '/images/societate.png',
              imageAlt: 'Dansuri de societate',
              href: '/dansuri-de-societate',
              gradient: 'from-blue-500 to-purple-600'
            },
            {
              id: 2,
              title: 'Lecții Private',
              description: 'Instruire personalizată pentru progres rapid',
              imageSrc: '/images/private.png',
              imageAlt: 'Lecții private de dans',
              href: '/lectii-private',
              gradient: 'from-green-500 to-teal-600'
            },
            {
              id: 3,
              title: 'Dansuri Populare',
              description: 'Peste 200 de jocuri populare românești',
              imageSrc: '/images/populare.png',
              imageAlt: 'Dansuri populare românești',
              href: '/dansuri-populare',
              gradient: 'from-orange-500 to-red-600'
            }
          ]}
          sectionTitle="Explorează și alte dansuri"
          sectionDescription="Descoperă diversitatea stilurilor de dans pe care le oferim"
        />
        
        <div id="inscriere" className="px-0 md:px-32">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">
          Completează formularul și înscrie-te la cursurile de dans latino
          </h3>
          <ContactForm/>
        </div>
      </div>
    </>
  );
}
