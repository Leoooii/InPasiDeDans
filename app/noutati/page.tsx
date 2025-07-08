import NoutatiSection from '@/components/noutati-section';

export const metadata = {
  title: 'Noutăți și Evenimente | În Pași de Dans',
  description:
    'Află ultimele noutăți, evenimente și promoții de la școala noastră de dans. Fii la curent cu tot ce se întâmplă la În Pași de Dans, București!',
  keywords:
    'noutăți dans, evenimente dans, știri școală de dans, promoții dans București',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://inpasidedans.ro/noutati',
  },
  openGraph: {
    type: 'website',
    title: 'Noutăți și Evenimente | În Pași de Dans',
    description:
      'Află ultimele noutăți, evenimente și promoții de la școala noastră de dans. Fii la curent cu tot ce se întâmplă la În Pași de Dans, București!',
    url: 'https://inpasidedans.ro/noutati',
    siteName: 'În Pași de Dans',
    images: [
      {
        url: 'https://inpasidedans.ro/images/logo.png',
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
      <h1 className="text-4xl font-bold mb-6 text-center">
        Noutăți de la Școala de Dans În Pași de Dans
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
        Află cele mai recente evenimente, cursuri și spectacole organizate de
        Școala de Dans În Pași de Dans. Fii la curent cu toate noutățile din
        lumea dansului și alătură-te comunității noastre pasionate!
      </p>
      <NoutatiSection />
    </div>
  );
}
