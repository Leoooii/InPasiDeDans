import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import GrupeInFormare from '@/components/grupe-in-formare';
import type { Metadata } from 'next';
import DanceLevels from '@/components/dance-levels';

export const metadata: Metadata = {
  title: 'Program Cursuri Dans | În Pași de Dans',
  description:
    'Vezi programul actualizat al cursurilor de dans pentru toate grupele și nivelurile. Consultă orarul săptămânal pentru copii și adulți la În Pași de Dans, București.',
  keywords:
    'program cursuri dans, orar dans, cursuri dans adulți, cursuri dans copii, școală dans București',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/program',
  },
  openGraph: {
    type: 'website',
    title: 'Program Cursuri Dans | În Pași de Dans',
    description:
      'Vezi programul actualizat al cursurilor de dans pentru toate grupele și nivelurile. Consultă orarul săptămânal pentru copii și adulți la În Pași de Dans, București.',
    url: 'https://www.inpasidedans.ro/program',
    siteName: 'În Pași de Dans',
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
    title: 'Program Cursuri Dans | În Pași de Dans',
    description:
      'Vezi programul actualizat al cursurilor de dans pentru toate grupele și nivelurile. Consultă orarul săptămânal pentru copii și adulți la În Pași de Dans, București.',
    images: ['https://inpasidedans.ro/images/program.png'],
  },
};

export default function Program() {
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
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Program cursuri
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Verifică orarul complet al cursurilor de dans pentru adulți și
              copii la În Pași de Dans, București.
            </p>
          </div>

          <Tabs defaultValue="luni și miercuri" className="w-full">
            <TabsList className="grid grid-cols-1 sm:grid-cols-4 h-auto">
              <TabsTrigger
                value="luni și miercuri"
                aria-label="Program Luni și Miercuri"
              >
                Luni și Miercuri
              </TabsTrigger>
              <TabsTrigger
                value="marti și joi"
                aria-label="Program Marți și Joi"
              >
                Marți și Joi
              </TabsTrigger>
              <TabsTrigger value="vineri" aria-label="Program Vineri">
                Vineri
              </TabsTrigger>
              <TabsTrigger value="sambata" aria-label="Program Sâmbătă">
                Sâmbătă
              </TabsTrigger>
            </TabsList>

            <TabsContent value="luni și miercuri" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Program Luni și Miercuri
                  </h2>
                  <div className="space-y-4">
                    <ScheduleItem
                      time="18:30 - 19:45"
                      course="Latino și societate (Intermediari 1)"
                      instructor="Miriam"
                      room="Sala 3"
                    />
                    <ScheduleItem
                      time="18:30 - 19:30"
                      course="Salsa și bachata (Intermediari 1)"
                      instructor="Alexandra"
                      room="Sala 2"
                    />
                    <ScheduleItem
                      time="18:30 - 19:45"
                      course="Dansuri populare (Intermediari 1)"
                      instructor="Cătălina"
                      room="Sala 1"
                    />
                    <ScheduleItem
                      time="19:45 - 20:45"
                      course="Latino și societate (Începători)"
                      instructor="Miriam"
                      room="Sala 3"
                    />
                    <ScheduleItem
                      time="19:45 - 21:00"
                      course="Latino și societate (Intermediari 3)"
                      instructor="Alexandra"
                      room="Sala 2"
                    />
                    <ScheduleItem
                      time="19:45 - 21:00"
                      course="Dansuri populare (Intermediari 2)"
                      instructor="Cătălina"
                      room="Sala 1"
                    />
                    <ScheduleItem
                      time="21:00 - 22:15"
                      course="Salsa și bachata (Intermediari 3)"
                      instructor="Alexandra și Nicholas"
                      room="Sala 2"
                    />
                    <ScheduleItem
                      time="21:00 - 22:15"
                      course="Dansuri populare (Avansați)"
                      instructor="Cătălina"
                      room="Sala 3"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="marti și joi" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Program Marți și Joi
                  </h2>
                  <div className="space-y-4">
                    <ScheduleItem
                      time="17:15 - 18:15"
                      course="Grupă copii intermediari (7-12 ani)"
                      instructor="Alexandra"
                      room="Sala 2"
                    />
                    <ScheduleItem
                      time="18:30 - 19:45"
                      course="Dansuri populare (Avansați)"
                      instructor="Alexandra"
                      room="Sala 2"
                    />
                    <ScheduleItem
                      time="18:30 - 19:45"
                      course="Dansuri populare (Intermediari 3)"
                      instructor="Cătălina"
                      room="Sala 3"
                    />
                    <ScheduleItem
                      time="19:45 - 20:45"
                      course="Dansuri populare (Intermediari 1)"
                      instructor="Cătălina"
                      room="Sala 3"
                    />
                    <ScheduleItem
                      time="19:45 - 21:00"
                      course="Salsa și bachata (Intermediari 2)"
                      instructor="Alexandra și Nicholas"
                      room="Sala 2"
                    />
                    <ScheduleItem
                      time="21:00 - 22:15"
                      course="Latino și societate (Avansați)"
                      instructor="Alexandra"
                      room="Sala 2"
                    />
                    <ScheduleItem
                      time="21:00 - 22:15"
                      course="Dansuri populare (Intermediari 2)"
                      instructor="Cătălina"
                      room="Sala 3"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vineri" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Program Vineri</h2>
                  <div className="space-y-4">
                    <ScheduleItem
                      time="18:30 - 19:30"
                      course="Grupă copii intermediari (9-14 ani)"
                      instructor="Alexandra"
                      room="Sala 2"
                    />
                    <ScheduleItem
                      time="19:30 - 20:30"
                      course="Dansuri populare (Intermediari 1)"
                      instructor="Alexandra"
                      room="Sala 2"
                    />
                    <ScheduleItem
                      time="19:30 - 20:30"
                      course="Dansuri populare (Intermediari 1)"
                      instructor="Cătălina"
                      room="Sala 3"
                    />
                    <ScheduleItem
                      time="20:30 - 21:30"
                      course="Dansuri populare (Intermediari 1)"
                      instructor="Cătălina"
                      room="Sala 3"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sambata" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Program Sâmbătă</h2>
                  <div className="space-y-4">
                    <ScheduleItem
                      time="11:00 - 12:00"
                      course="Formație copii intermediari"
                      instructor="Alexandra"
                      room="Sala 2"
                    />
                    <ScheduleItem
                      time="12:00 - 13:00"
                      course="Grupă copii intermediari (9-14 ani)"
                      instructor="Alexandra"
                      room="Sala 2"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="duminica" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Program Duminică</h2>
                  <div className="space-y-4">
                    <ScheduleItem
                      time="11:00 - 13:00"
                      course="Dans pentru Nuntă - Personalizat"
                      instructor="Alexandru și Maria"
                      room="Sala 1"
                    />
                    <ScheduleItem
                      time="14:00 - 16:00"
                      course="Practică Liberă (pentru cursanți)"
                      instructor="Supraveghere instructor de serviciu"
                      room="Sala Mare"
                    />
                    <ScheduleItem
                      time="17:00 - 19:00"
                      course="Workshop (în funcție de calendar)"
                      instructor="Invitat special"
                      room="Sala Mare"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
                <Link href="/contact">
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

function ScheduleItem({
  time,
  course,
  instructor,
  room,
}: {
  time: string;
  course: string;
  instructor: string;
  room: string;
}) {
  return (
    <div
      className="flex flex-col md:flex-row justify-between p-4 border rounded-lg"
      aria-label={`Curs: ${course} la ${time}`}
    >
      <div className="md:w-1/4">
        <p className="font-semibold">{time}</p>
      </div>
      <div className="md:w-2/5">
        <p className="font-medium">{course}</p>
      </div>
      <div className="md:w-1/5">
        <p className="text-gray-500">{instructor}</p>
      </div>
      <div className="md:w-1/5 text-right">
        <p className="text-gray-500">{room}</p>
      </div>
    </div>
  );
}
