'use client'

import { useEffect } from 'react';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import LocationSection from '@/components/LocationSection';
import InstructorsSection from '@/components/InstructorsSection';
import ContactForm from '@/components/contact-form';
import HeroSection from '@/components/salsa-bachata/HeroSection';
import IntroSection from '@/components/salsa-bachata/IntroSection';
import DanceStylesSection from '@/components/salsa-bachata/DanceStylesSection';
import BenefitsSection from '@/components/salsa-bachata/BenefitsSection';
import CourseStructureSection from '@/components/salsa-bachata/CourseStructureSection';
import FirstLessonsSection from '@/components/salsa-bachata/FirstLessonsSection';
import ExploreOtherDances from '@/components/ExploreOtherDances';

const breadcrumbItems = [
  { name: 'Acasă', url: '/' },
  { name: 'Dansuri latino', url: '/dansuri-latino' },
  { name: 'Salsa și Bachata' },
];

export default function SalsaBachataClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-12 flex flex-col gap-12">
      <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/dansuri-latino/salsa-bachata" />

      <HeroSection />
      <IntroSection />
      <DanceStylesSection />
      <BenefitsSection />
      <FirstLessonsSection />
      <CourseStructureSection />
      <LocationSection />

      <div id="instructori">
        <InstructorsSection instructorNames={['Alexandra', 'Miriam', 'Nicholas']} courseName="salsa-bachata" />
      </div>

      <div id="tarife">
        <PricingSection title="Salsa & Bachata – Tarife și abonamente" />
      </div>

      <div id="testimoniale">
        <TestimonialsSection danceType="salsa-bachata" />
      </div>

      <div id="intrebari">
        <FAQSection danceType="salsa-bachata" />
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
            gradient: 'from-blue-500 to-purple-600',
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
          Completează formularul și înscrie-te la cursurile de Salsa & Bachata
        </h3>
        <ContactForm />
      </div>
    </div>
  );
}
