import Head from 'next/head';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import GrupeInFormare from '@/components/grupe-in-formare';
import type { Metadata } from 'next';
import DanceLevels from '@/components/dance-levels';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import ProgramDinamic from '@/components/program-dinamic';

export const metadata: Metadata = {
  title: 'Program Cursuri Dans Bucuresti: Sector 4,5 si 6| In Pasi de Dans',
  description:
    'Program Cursuri de Dans Bucuresti - Descopera programul actualizat al cursurilor de dans pentru copii si adulti pentru toate nivelurile la In Pasi de Dans.',
  keywords:
    'program cursuri dans, orar dans, cursuri dans adulti, cursuri dans copii, scoala dans Bucuresti',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/program',
  },
  openGraph: {
    type: 'website',
    title: 'Program Cursuri Dans Bucuresti: Sector 4,5 si 6| In Pasi de Dans',
    description:
      'Program Cursuri de Dans Bucuresti - Descopera programul actualizat al cursurilor de dans pentru copii si adulti pentru toate nivelurile la In Pasi de Dans.',
    url: 'https://www.inpasidedans.ro/program',
    siteName: 'In Pasi de Dans',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/program.png',
        width: 1200,
        height: 630,
        alt: 'Program Cursuri de Dans',
      },
    ],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Program Cursuri Dans Bucuresti: Sector 4,5 si 6 | In Pasi de Dans',
    description:
      'Program Cursuri de Dans Bucuresti - Descopera programul actualizat al cursurilor de dans pentru copii si adulti pentru toate nivelurile la In Pasi de Dans.',
    images: ['https://inpasidedans.ro/images/program.png'],
  },
};

export default function Program() {
  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Program" }
  ];

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: 'Cursuri de Dans - Program Săptămânal',
              description:
                'Programul săptămânal al cursurilor de dans pentru adulți și copii la În Pași de Dans, București, Sector 5.',
              url: 'https://inpasidedans.ro/program',
              location: {
                '@type': 'Place',
                name: 'În Pași de Dans',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Calea Rahovei 262',
                  addressLocality: 'București',
                  addressRegion: 'Sector 5',
                  postalCode: '050897',
                  addressCountry: 'RO',
                },
              },
              organizer: {
                '@type': 'Organization',
                name: 'În Pași de Dans',
                url: 'https://inpasidedans.ro',
              },
              eventAttendanceMode:
                'https://schema.org/OfflineEventAttendanceMode',
              eventStatus: 'https://schema.org/EventScheduled',
              startDate: '2025-05-29',
              endDate: '2025-12-31',
              recurrence: {
                '@type': 'Schedule',
                repeatFrequency: 'P1W',
                byDay: [
                  'https://schema.org/Monday',
                  'https://schema.org/Tuesday',
                  'https://schema.org/Wednesday',
                  'https://schema.org/Thursday',
                  'https://schema.org/Friday',
                  'https://schema.org/Saturday',
                ],
              },
            }),
          }}
        />
      </Head>
      <div className="container py-12">
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/program" />
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
            Program cursuri de dans din Bucuresti
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Verifică orarul complet al cursurilor de dans pentru adulți și
              copii la În Pași de Dans, București.
            </p>
          </div>

          <ProgramDinamic />
          <DanceLevels />
          <div className="mt-12 bg-red-50 p-8 rounded-lg">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold dark:text-black">
                Înscrie-te la cursurile preferate
              </h2>
              <p className="dark:text-black mb-10">
                Locurile sunt limitate pentru a asigura o experiență de
                calitate. Rezervă-ți locul acum sau contactează-ne pentru
                detalii.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/inscriere">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                  >
                    Înscrie-te acum
                  </Button>
                </Link>
                <Link href="/contact?utm_source=google&utm_medium=trafic+organic&utm_campaign=google+business+profile">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    Contactează-ne
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <GrupeInFormare />
      </div>
    </>
  );
}
