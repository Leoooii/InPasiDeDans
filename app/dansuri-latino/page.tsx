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
import LatinoSignupForm from '@/components/LatinoSignupForm';
import ContactForm from '@/components/contact-form';
import StickyMenu from '@/components/sticky-menu';

export default function DansuriLatino() {
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
        <div id="despre-latino" className="p-0 container flex flex-col gap-4 items-center">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-center">Dansuri latino</h1>
          <div>
            <p className="text-lg md:text-2xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-6xl mx-auto font-serif mb-2">
              Cursurile noastre îmbină ritmurile pline de viață cu eleganța mișcărilor, oferindu-ți nu doar pași de dans, ci și încredere, bucurie și o stare de bine. Indiferent de nivelul tău, dansurile latino îți va aduce zâmbetul pe buze și te va conecta la o comunitate prietenoasă și plină de energie.
            </p>
            <p className="text-lg md:text-2xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-[80rem] mx-auto font-serif mb-2">
              Descoperă pasiunea și energia dansurilor latino!
            </p>
          </div>
          <Link href="/inscriere" className="mt-4">
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-xl" size="lg">
              Înscrie-te la curs
            </Button>
          </Link>
        </div>
        
        <div className="container flex flex-col gap-4 items-center border-2 border-black p-4">
          <h2 className="text-xl md:text-3xl font-bold tracking-tight text-center">
            Descoperă bucuria dansurilor latino in Bucuresti
          </h2>
          <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed text-left max-w-6xl mx-auto font-serif mb-2">
            Dansurile latino sunt cunoscute pentru energia, pasiunea și ritmurile lor contagioase. Originare din America Latină și Caraibe, aceste dansuri combină mișcări expresive ale corpului cu tehnici specifice de pași și coordonare între parteneri.
          </p>
        </div>
        
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
            description="Paso Doble este un dans dramatic și pasional, inspirat din corrida spaniolă. Este caracterizat prin mișcări precise, poze dramatice și o atmosferă intensă care evocă tensiunea și eleganța arenelor de taur."
            imageSrc="/images/paso-doble.png"
            imageAlt="Cursuri Paso Doble Bucuresti"
            imagePosition="right"
          />
        </div>
        
        <div id="structura">
          <StructureFeatures/>
        </div>
        
        <GrupeInFormare/>
        <LocationSection/>
        
        <div id="instructori">
          <InstructorsSection instructorNames={['Alexandra', 'Miriam', 'Nicholas']}/>
        </div>
        
        <div id="tarife">
          <PricingSection/>
        </div>
        
        <div id="testimoniale">
          <TestimonialsSection/>
        </div>
        
        <div id="intrebari">
          <FAQSection/>
        </div>
        
        <ExploreOtherDances/>
        
        <div id="inscriere" className="px-0 md:px-32">
          <ContactForm/>
        </div>
      </div>
    </>
  );
}
