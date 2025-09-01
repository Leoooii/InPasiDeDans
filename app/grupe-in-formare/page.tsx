
import Head from './head';
import GrupeInFormareSection from '@/components/grupe-in-formare-section';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Grupe de Dans in Formare | In Pasi de Dans',
  description:
    'Descopera grupele de dans in formare la scoala noastra din Bucuresti. Inscrie-te la cursuri de dans pentru adulti si copii!',
  keywords:
    'grupe dans formare, cursuri dans Bucuresti, inscrieri dans, scoala dans',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/grupe-in-formare',
  },
  openGraph: {
    type: 'website',
    title: 'Grupe de Dans in Formare | In Pasi de Dans',
    description:
      'Descopera grupele de dans in formare la scoala noastra din Bucuresti. Inscrie-te la cursuri de dans pentru adulti si copii!',
    url: 'https://www.inpasidedans.ro/grupe-in-formare',
    siteName: 'In Pasi de Dans',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Grupe de Dans in Formare In Pasi de Dans',
      },
    ],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grupe de Dans in Formare | In Pasi de Dans',
    description:
      'Descopera grupele de dans in formare la scoala noastra din Bucuresti. Inscrie-te la cursuri de dans pentru adulti si copii!',
    images: ['https://inpasidedans.ro/images/logo.png'],
  },
};

export default function GrupeInFormarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white">
      <div className="container mx-auto py-16 px-4 md:px-16">
        <Breadcrumb>
          <BreadcrumbList className="text-white/80">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-white/80 hover:text-white transition-colors">
                Acasă
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/60">
              <ChevronRight className="text-white/60" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white font-medium">
                Grupe în Formare
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Grupe de Dans în Formare
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            Dacă te gândești să te înscrii la un curs de dans, ai ajuns în locul
            potrivit. Iată grupele pentru care facem înscrieri în această perioadă!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="/inscriere"
              className="text-orange-300 underline hover:text-orange-200 transition-colors"
            >
              Înscrie-te la un curs
            </a>
            <span className="text-white/60">·</span>
            <a
              href="/cursuri-dans-adulti"
              className="text-orange-300 underline hover:text-orange-200 transition-colors"
            >
              Cursuri pentru adulți
            </a>
            <span className="text-white/60">·</span>
            <a
              href="/cursuri-dans-copii"
              className="text-orange-300 underline hover:text-orange-200 transition-colors"
            >
              Cursuri pentru copii
            </a>
          </div>
        </div>
        
        <GrupeInFormareSection />
      </div>
    </div>
  );
}
