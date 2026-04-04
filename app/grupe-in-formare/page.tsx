
import type { Metadata } from 'next';
import GrupeInFormareSection from '@/components/grupe-in-formare-section';

export const metadata: Metadata = {
  title: 'Grupe Noi de Dans în Formare București | Locuri Limitate | În Pași de Dans',
  description: 'Grupe de dans în formare București – salsa, bachata, dans de societate, dans latino pentru nivel începător. Locuri limitate, înscrie-te acum!',
  keywords: 'grupe noi dans, inscriere cursuri dans, incepatori dans Bucuresti',
  alternates: { canonical: 'https://www.inpasidedans.ro/grupe-in-formare' },
  openGraph: {
    title: 'Grupe în Formare | În Pași de Dans București',
    description: 'Alătură-te unei grupe noi de dans și începe aventura dansului chiar de la început.',
    url: 'https://www.inpasidedans.ro/grupe-in-formare',
    images: [{ url: 'https://www.inpasidedans.ro/images/logo.png', alt: 'Grupe dans în formare București' }],
    locale: 'ro_RO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

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
