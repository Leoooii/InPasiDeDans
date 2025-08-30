import NoutatiSection from '@/components/noutati-section';
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
  title: 'Noutăți și Evenimente | În Pași de Dans',
  description:
    'Află ultimele noutăți, evenimente și promoții de la școala noastră de dans. Fii la curent cu tot ce se întâmplă la În Pași de Dans, București!',
  keywords:
    'noutăți dans, evenimente dans, știri școală de dans, promoții dans București',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/noutati',
  },
  openGraph: {
    type: 'website',
    title: 'Noutăți și Evenimente | În Pași de Dans',
    description:
      'Află ultimele noutăți, evenimente și promoții de la școala noastră de dans. Fii la curent cu tot ce se întâmplă la În Pași de Dans, București!',
    url: 'https://www.inpasidedans.ro/noutati',
    siteName: 'În Pași de Dans',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Noutăți și Evenimente În Pași de Dans',
      },
    ],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noutăți și Evenimente | În Pași de Dans',
    description:
      'Află ultimele noutăți, evenimente și promoții de la școala noastră de dans. Fii la curent cu tot ce se întâmplă la În Pași de Dans, București!',
    images: ['https://inpasidedans.ro/images/logo.png'],
  },
};

export default function NoutatiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white">
      <div className="container mx-auto py-16 px-4 md:px-0">
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
                Noutăți
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Noutăți de la Școala de Dans În Pași de Dans
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            Află cele mai recente evenimente, cursuri și spectacole organizate de
            Școala de Dans În Pași de Dans. Fii la curent cu toate noutățile din
            lumea dansului și alătură-te comunității noastre pasionate!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="/evenimente"
              className="text-orange-300 underline hover:text-orange-200 transition-colors"
            >
              Vezi toate evenimentele
            </a>
            <span className="text-white/60">·</span>
            <a
              href="/inscriere"
              className="text-orange-300 underline hover:text-orange-200 transition-colors"
            >
              Înscrie-te la un curs
            </a>
            <span className="text-white/60">·</span>
            <a
              href="/contact"
              className="text-orange-300 underline hover:text-orange-200 transition-colors"
            >
              Contactează-ne
            </a>
          </div>
        </div>
        
        <NoutatiSection />
      </div>
    </div>
  );
}
