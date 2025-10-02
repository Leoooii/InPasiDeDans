'use client'

import { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Head from './head';
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

export default function SalsaBachata() {
  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Salsa și Bachata" }
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head />
      
      <div className="container py-12 flex flex-col gap-12">
      <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/salsa-bachata" />
        {/* HERO SECTION */}
        <HeroSection />

        {/* INTRO SECTION */}
        <IntroSection />

        {/* DANCE STYLES SECTION */}
        <DanceStylesSection />

        {/* BENEFITS SECTION */}
        <BenefitsSection />

        {/* COURSE STRUCTURE */}
        <CourseStructureSection />

      {/* LOCATION SECTION */}
      <LocationSection/>

      {/* INSTRUCTORS SECTION */}
      <div id="instructori">
        <InstructorsSection instructorNames={['Alexandra', 'Miriam', 'Nicholas']} courseName="salsa-bachata"/>
      </div>

      {/* PRICING SECTION */}
      <div id="tarife">
        <PricingSection title="Salsa & Bachata – Tarife și abonamente"/>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div id="testimoniale">
        <TestimonialsSection danceType="salsa-bachata"/>
      </div>

      {/* FAQ SECTION */}
      <div id="intrebari">
        <FAQSection danceType="salsa-bachata"/>
      </div>

      {/* CONTACT FORM SECTION */}
      <div id="inscriere" className="px-0 md:px-32">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">
          Completează formularul și înscrie-te la cursurile de Salsa & Bachata
        </h3>
        <ContactForm/>
      </div>
      </div>
    </>
  );
}
