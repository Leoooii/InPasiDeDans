import NoutatiSection from '@/components/noutati-section';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

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
    <div className="container mx-auto py-16 px-4 md:px-0">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Acasă</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Noutăți</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-4xl font-bold mb-6 text-center">
        Noutăți de la Școala de Dans În Pași de Dans
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
        Află cele mai recente evenimente, cursuri și spectacole organizate de
        Școala de Dans În Pași de Dans. Fii la curent cu toate noutățile din
        lumea dansului și alătură-te comunității noastre pasionate!
        <br />
        <span className="block mt-4">
          <a
            href="/evenimente"
            className="text-red-600 underline hover:text-orange-600"
          >
            Vezi toate evenimentele
          </a>{' '}
          ·
          <a
            href="/inscriere"
            className="text-red-600 underline hover:text-orange-600 ml-2"
          >
            Înscrie-te la un curs
          </a>{' '}
          ·
          <a
            href="/contact"
            className="text-red-600 underline hover:text-orange-600 ml-2"
          >
            Contactează-ne
          </a>
        </span>
      </p>
      <NoutatiSection />
    </div>
  );
}
