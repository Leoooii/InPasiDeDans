import Head from 'next/head';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import GrupeInFormare from '@/components/grupe-in-formare';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preturi Cursuri de Dans Bucuresti | In Pasi de Dans',
  description:
    'Preturi cursuri de dans Bucuresti - Vezi preturile de cursuri de dans pentru copii si adulti din Bucuresti ✅ Alege pachetul ideal pentru tine pe In Pasi de Dans ✅',
  keywords:
    'tarife cursuri dans, preturi scoala de dans, cursuri dans adulti, cursuri dans copii, lectii private dans',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/tarife',
  },
  openGraph: {
    type: 'website',
    title: 'Preturi Cursuri de Dans Bucuresti | In Pasi de Dans',
    description:
      'Preturi cursuri de dans Bucuresti - Vezi preturile de cursuri de dans pentru copii si adulti din Bucuresti ✅ Alege pachetul ideal pentru tine pe In Pasi de Dans ✅',
    url: 'https://www.inpasidedans.ro/tarife',
    siteName: 'In Pasi de Dans',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/tarife.png',
        width: 1200,
        height: 630,
        alt: 'Tarife Cursuri de Dans',
      },
    ],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preturi Cursuri de Dans Bucuresti | In Pasi de Dans',
    description:
      'Preturi cursuri de dans Bucuresti - Vezi preturile de cursuri de dans pentru copii si adulti din Bucuresti ✅ Alege pachetul ideal pentru tine pe In Pasi de Dans ✅',
    images: ['https://inpasidedans.ro/images/tarife.png'],
  },
};

export default function Tarife() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'Cursuri de Dans - Tarife',
              description:
                'Tarife pentru cursurile de dans pentru adulti, copii si lectii private la In Pasi de Dans, Bucuresti, Sector 5.',
              url: 'https://inpasidedans.ro/tarife',
              brand: {
                '@type': 'Brand',
                name: 'In Pasi de Dans',
              },
              offers: [
                {
                  '@type': 'Offer',
                  name: 'Abonament 8',
                  price: '250',
                  priceCurrency: 'RON',
                  availability: 'https://schema.org/InStock',
                  url: 'https://inpasidedans.ro/tarife',
                },
                {
                  '@type': 'Offer',
                  name: 'Abonament 16',
                  price: '350',
                  priceCurrency: 'RON',
                  availability: 'https://schema.org/InStock',
                  url: 'https://inpasidedans.ro/tarife',
                },
                {
                  '@type': 'Offer',
                  name: 'Abonament Full Pass',
                  price: '420',
                  priceCurrency: 'RON',
                  availability: 'https://schema.org/InStock',
                  url: 'https://inpasidedans.ro/tarife',
                },
              ],
              location: {
                '@type': 'Place',
                name: 'In Pasi de Dans',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Calea Rahovei 262',
                  addressLocality: 'Bucuresti',
                  addressRegion: 'Sector 5',
                  postalCode: '050897',
                  addressCountry: 'RO',
                },
              },
            }),
          }}
        />
      </Head>
      <div className="container py-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
            Tarife cursuri de dans din Bucuresti
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Alege abonamentul potrivit pentru cursurile de dans pentru adulți
              la In Pasi de Dans, Bucuresti.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="flex flex-col border-red-600 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Abonament 8</CardTitle>
                <CardDescription className="text-white/90">
                  Valabil 4 săptămâni
                </CardDescription>
                <div className="mt-4 text-4xl font-bold">250 Lei</div>
              </CardHeader>
              <CardContent className="flex-1 mt-2">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>8 ședințe pe lună</span>
                  </li>
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>Acces la o singură grupă</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex flex-col border-red-600 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Abonament 16</CardTitle>
                <CardDescription className="text-white/90">
                  Valabil 4 săptămâni
                </CardDescription>
                <div className="mt-4 text-4xl font-bold">350 Lei</div>
              </CardHeader>
              <CardContent className="flex-1 mt-2">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>16 ședințe pe lună</span>
                  </li>
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>Acces la 2 grupe</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex flex-col border-red-600 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Abonament Full Pass</CardTitle>
                <CardDescription className="text-white/90">
                  Valabil 4 săptămâni
                </CardDescription>
                <div className="mt-4 text-4xl font-bold">420 Lei</div>
              </CardHeader>
              <CardContent className="flex-1 mt-2">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>Acces nelimitat la grupe</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex flex-col border-red-600 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Plata la ședință</CardTitle>
                <CardDescription className="text-white/90">
                  Orice stil de dans
                </CardDescription>
                <div className="mt-4 text-4xl font-bold">45 Lei</div>
              </CardHeader>
              <CardContent className="flex-1 mt-2">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>O ședință la grup</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Tarife lecții private
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Personalizează-ți experiența cu lecțiile private de dans.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="flex flex-col border-red-600 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Pachet 4 ședințe</CardTitle>
                <div className="mt-4 text-4xl font-bold">640 Lei</div>
              </CardHeader>
              <CardContent className="flex-1 mt-2">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>4 ședințe private</span>
                  </li>
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>Instructor dedicat</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex flex-col border-red-600 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Pachet 6 ședințe</CardTitle>
                <div className="mt-4 text-4xl font-bold">900 Lei</div>
              </CardHeader>
              <CardContent className="flex-1 mt-2">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>6 ședințe private</span>
                  </li>
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>Instructor dedicat</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex flex-col border-red-600 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Pachet 8 ședințe</CardTitle>
                <div className="mt-4 text-4xl font-bold">1120 Lei</div>
              </CardHeader>
              <CardContent className="flex-1 mt-2">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>8 ședințe private</span>
                  </li>
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>Instructor dedicat</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex flex-col border-red-600 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Plata la ședință</CardTitle>
                <div className="mt-4 text-4xl font-bold">180 Lei</div>
              </CardHeader>
              <CardContent className="flex-1 mt-2">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>O ședință privată</span>
                  </li>
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>Instructor dedicat</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Tarife cursuri copii
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Tarife accesibile pentru cursurile de dans dedicate copiilor.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="flex flex-col border-red-600 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Abonament 8</CardTitle>
                <CardDescription className="text-white/90">
                  Valabil o lună (8 ședințe)
                </CardDescription>
                <div className="mt-4 text-4xl font-bold">200 Lei</div>
              </CardHeader>
              <CardContent className="flex-1 mt-2">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>8 ședințe pe lună</span>
                  </li>
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>2 ședințe pe săptămână</span>
                  </li>
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>Acces la grupe pentru copii</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col border-red-600 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Abonament 12</CardTitle>
                <CardDescription className="text-white/90">
                  Valabil o lună (12 ședințe)
                </CardDescription>
                <div className="mt-4 text-4xl font-bold">250 Lei</div>
              </CardHeader>
              <CardContent className="flex-1 mt-2">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>12 ședințe pe lună</span>
                  </li>
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>3 ședințe pe săptămână</span>
                  </li>
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>Acces la grupe pentru copii</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex flex-col border-red-600 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Plata la ședință</CardTitle>
                <CardDescription className="text-white/90">
                  Ședință de grup
                </CardDescription>
                <div className="mt-4 text-4xl font-bold">35 Lei</div>
              </CardHeader>
              <CardContent className="flex-1 mt-2">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>O ședință la grup</span>
                  </li>
                  <li className="flex items-center">
                    <Check
                      className="mr-2 h-4 w-4 text-green-500"
                      aria-label="Inclus"
                    />
                    <span>Acces la grupe pentru copii</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-red-50 p-8 rounded-lg">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold dark:text-black">
                Gata să începi dansul?
              </h2>
              <p className="dark:text-black">
                Alege un abonament și înscrie-te astăzi sau contactează-ne
                pentru detalii suplimentare.
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
