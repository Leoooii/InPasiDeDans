'use client'

import { useEffect } from 'react';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import PricingSection from '@/components/PricingSection';
import Testimoniale from '@/components/testimoniale';
import { TESTIMONIALE_SALSA_BACHATA } from '@/lib/testimoniale';
import FaqBlock from '@/components/faq-block';
import { FAQ_SALSA_BACHATA } from '@/lib/faq-stiluri';
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
        <Testimoniale items={TESTIMONIALE_SALSA_BACHATA} />
      </div>

      <div id="intrebari">
        <FaqBlock intrebari={FAQ_SALSA_BACHATA} titlu="Întrebări frecvente (FAQ)" subtitlu="Răspunsuri la cele mai frecvente întrebări despre cursurile noastre de dans" icon="plus" deschisPrima className="py-16" />
      </div>

      <ExploreOtherDances exclude="latino" />

      <div id="inscriere" className="px-0 md:px-32">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8">
          Completează formularul și înscrie-te la cursurile de Salsa & Bachata
        </h3>
        <ContactForm />
      </div>
    </div>
  );
}
