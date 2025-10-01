import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
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
import ContactForm from '@/components/contact-form';
import StickyMenu from '@/components/sticky-menu';
import BenefitsSection from '@/components/BenefitsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CourseLevelsSection from '@/components/CourseLevelsSection';
import CharmHarmonySection from '@/components/CharmHarmonySection';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';

export default function DansuriDeSocietate() {
  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Dansuri de societate" }
  ];

  return (
    <>
      <StickyMenu menuItems={[
        { id: 'despre-societate', label: 'Despre Societate' },
        { id: 'stiluri-dans', label: 'Stiluri de Dans' },
        { id: 'beneficii', label: 'Beneficii' },
        { id: 'de-ce-noi', label: 'De ce noi?' },
       
        { id: 'locatie', label: 'Locație' },
        { id: 'tarife', label: 'Tarife' },
        { id: 'instructori', label: 'Instructori' },
        { id: 'testimoniale', label: 'Testimoniale' },
        { id: 'intrebari', label: 'Întrebări' },
        { id: 'inscriere', label: 'Înscriere' }
      ]} />
      <div className="container py-12 flex flex-col gap-12">
        <Head />
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/dansuri-de-societate" />
        <div id="despre-societate" className="p-0 container flex flex-col gap-4 items-center">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-center">Dansuri de societate</h1>
          <div>
            <p className="text-lg md:text-2xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-6xl mx-auto font-serif mb-2">
           Dansurile de societate te poartă într-o lume a rafinamentului și a grației - de la eleganța valsului și pasiunea tango-ului, la ritmul vesel al quickstep-ului sau farmecul foxtrot-ului, fiecare dans îți oferă o poveste aparte
            </p>
            <p className="text-lg md:text-2xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-[80rem] mx-auto font-serif mb-2">
           Începe acum și transformă fiecare pas într-o experiență plină de grație și armonie!
            </p>
          </div>
          <a href="#inscriere" className="mt-4">
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-xl" size="lg">
              Înscrie-te la curs
            </Button>
          </a>
        </div>
        
        <div className="container flex flex-col gap-4 items-center border-2 border-black p-4">
          <h2 className="text-xl md:text-3xl font-bold tracking-tight text-center">
            Descoperă eleganța dansurilor de societate în București
          </h2>
          <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-left max-w-6xl mx-auto font-serif mb-2">
          De la vals lent sau vienez și tango, până la quickstep și foxtrot, aceste cursuri te ajută să îmbini eleganța cu buna dispoziție. 
          </p>
          <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-left max-w-6xl mx-auto font-serif mb-2">
          Sunt potrivite pentru oricine își dorește să învețe să danseze, să se relaxeze și să strălucească la evenimente speciale sau pur și simplu să se bucure de mișcare. 
          </p>
        </div>
        <h2 className="text-xl md:text-3xl font-bold tracking-tight text-center">Ce stiluri de dans de societate vei învăța?</h2>
        <div id="stiluri-dans" className="p-0 container flex flex-col gap-12 items-center">
        <DancePresentationCard
            title="Vals Lent"
            description="Valsul lent este un dans de societate elegant, caracterizat prin mișcări line, pași grațioși și rotații ample, care transmit calm, romantism și fluiditate."
            imageSrc="/images/vals-lent.png"
            imageAlt="Cursuri Vals Lent Bucuresti"
            imagePosition="left"
          />
          <DancePresentationCard
            title="Vals Vienez"
            description="Valsul vienez este o formă rapidă și grațioasă a valsului, cu mișcări circulare continue și rotații elegante. Se dansează pe un tempo de 3/4 alert și creează impresia unui dans fluid și rotativ, plin de rafinament și romantism."
            imageSrc="/images/vienez.jpeg"
            imageAlt="Cursuri Vals Vienez Bucuresti"
            imagePosition="right"
          />
         
          <DancePresentationCard
            title="Tango"
            description="Tango este un dans pasional și intens, originar din Argentina, cunoscut pentru postura dramatică, pașii preciși și conexiunea profundă dintre parteneri. În versiunea de dans sportiv (ballroom), are un stil mai rigid și accentuat, cu mișcări tăioase și expresive."
            imageSrc="/images/tango2.png"
            imageAlt="Cursuri Tango Bucuresti"
            imagePosition="left"
          />
          
          <DancePresentationCard
            title="Slow Fox (Foxtrot)"
            description="Foxtrotul este un dans elegant și fluid, caracterizat prin mișcări lungi și grațioase. Se dansează pe muzică jazz și swing, cu accent pe fluiditatea mișcărilor și pe conexiunea dintre parteneri. Este perfect pentru începători și oferă o bază solidă pentru alte dansuri de societate."
            imageSrc="/images/slowfox.png"
            imageAlt="Cursuri Foxtrot Bucuresti"
            imagePosition="right"
          />

          <DancePresentationCard
            title="Quickstep"
            description="Quickstep este un dans de societate elegant și rapid, derivat din foxtrot, caracterizat prin pași săltăreți, deplasări rapide și mișcări fluide pe ringul de dans. Este vesel, jucăuș și transmite o senzație de ușurință, de parcă dansatorii 'plutesc' pe muzică."
            imageSrc="/images/quickstep.png"
            imageAlt="Cursuri Quickstep Bucuresti"
            imagePosition="left"
          />

          
        </div>
        
        <div id="beneficii">
          
        <BenefitsSection />
        </div>
        
        <div id="de-ce-noi">
          <WhyChooseUsSection />
        </div>
        
        <CharmHarmonySection />
        
        {/* <div id="structura">
          <StructureFeatures/>
        </div> */}
         <CourseLevelsSection />
        
        <div id="grupe-in-formare">
          <GrupeInFormare/>
        </div>
        
        <div id="locatie">
          <LocationSection/>
        </div>
        
        <div id="tarife">
          <PricingSection title="Dansuri de societate – Tarife și abonamente"/>
        </div>
        
        <div id="instructori">
          <InstructorsSection instructorNames={['Alexandra', 'Miriam']} courseName="de societate"/>
        </div>
        
        <div id="testimoniale">
          <TestimonialsSection danceType="societate"/>
        </div>
        
        <div id="intrebari">
          <FAQSection danceType="societate"/>
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
              gradient: 'from-red-500 to-orange-600'
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
          Completează formularul și înscrie-te la cursurile de dans de societate
          </h3>
          <ContactForm/>
        </div>
      </div>
    </>
  );
}
