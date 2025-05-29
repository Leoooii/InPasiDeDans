import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Script from 'next/script';
import CookieConsent from '@/components/cookie-consent';
import GifWrapperClient from './GifWrapperClient';
import GrupeInFormare from '@/components/grupe-in-formare';
import ScrollDownArrows from '@/components/ScrollDownArrows';
import EvenimentePage from './evenimente/page';
import GrupeInFormarePage from './grupe-in-formare/page';
import GrupeInFormareSection from '@/components/grupe-in-formare-section';

export default function Home() {
  return (
    <>
      <Head>
        <title>Acasă | În Pași de Dans</title>
        <meta
          name="description"
          content="Descoperă cursuri de dans pentru toate vârstele și nivelurile, în inima Bucureștiului. Te așteptăm să dansezi cu noi!"
        />
        <meta
          name="keywords"
          content="cursuri de dans București, școală de dans, dans copii, dans adulți, dansuri populare"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://inpasidedans.ro/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Acasă | În Pași de Dans" />
        <meta
          property="og:description"
          content="Descoperă cursuri de dans pentru toate vârstele și nivelurile, în inima Bucureștiului. Te așteptăm să dansezi cu noi!"
        />
        <meta property="og:url" content="https://inpasidedans.ro/" />
        <meta property="og:site_name" content="În Pași de Dans" />
        <meta
          property="og:image"
          content="https://inpasidedans.ro/images/logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="În Pași de Dans" />
        <meta property="og:locale" content="ro_RO" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Acasă | În Pași de Dans" />
        <meta
          name="twitter:description"
          content="Descoperă cursuri de dans pentru toate vârstele și nivelurile, în inima Bucureștiului. Te așteptăm să dansezi cu noi!"
        />
        <meta
          name="twitter:image"
          content="https://inpasidedans.ro/images/logo.png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'DanceSchool',
              name: 'În Pași de Dans',
              description:
                'Școală de dans cu tradiție din 2009, oferind cursuri de dansuri latino, de societate, populare și lecții private în București.',
              url: 'https://inpasidedans.ro/',
              logo: 'https://inpasidedans.ro/images/logo.png',
              sameAs: [
                'https://www.facebook.com/scoaladedansinpasidedans',
                'https://www.instagram.com/inpasidedans/',
                'https://www.tiktok.com/@in.pasi.de.dans',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+40722675126', // Înlocuiește cu numărul real
                contactType: 'customer service',
                areaServed: 'RO',
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Calea Rahovei 262', // Înlocuiește cu adresa reală
                addressLocality: 'București',
                addressRegion: 'Sector 5',
                postalCode: '050897',
                addressCountry: 'RO',
              },
            }),
          }}
        />
      </Head>
      <div className="flex flex-col min-h-screen">
        <CookieConsent />
        <div style={{ display: 'none' }}>
          <Script
            src="https://efreecode.com/js.js"
            id="eXF-pasidans-0"
            async
            defer
          />
        </div>
        <section className="relative h-[75vh] overflow-hidden">
          <div className="absolute inset-0">
            <div className="relative w-full h-full bg-orange-600">
              <GifWrapperClient />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="container text-center text-white">
              <h1 className="text-3xl md:text-6xl font-bold mb-6">
                "Dansul este puțină nebunie care ne face tuturor mult bine!"
              </h1>
              <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto">
                Învățăm și pe cei mici, și pe cei mari să danseze din 2009,
                într-o atmosferă plăcută și relaxantă.
              </p>
              <Link href="/inscriere">
                <Button
                  size="sm"
                  className="bg-white text-red-600 hover:bg-gray-100 hover:text-red-800 text-lg"
                >
                  Înscrie-te
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="pb-16 pt-6 bg-gray-800">
          <ScrollDownArrows />
          <div className="container px-10 sm:px-20">
            <h2 className="text-3xl font-bold mb-12 text-center text-white">
              CURSURI DE DANS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ShineButton
                title="Cursuri de dans pentru adulți"
                href="/cursuri-dans-adulti"
                imageSrc="/images/bachata.png?height=400&width=600"
              />
              <ShineButton
                title="Cursuri de dans pentru copii"
                href="/cursuri-dans-copii"
                imageSrc="/images/copii.jpeg?height=400&width=600"
              />
              <ShineButton
                title="Lecții private"
                href="/lectii-private"
                imageSrc="/images/private2.png?height=400&width=600"
              />
              <ShineButton
                title="Grupe noi"
                href="/grupe-in-formare"
                imageSrc="/images/grupenoi.png?height=400&width=600"
              />
              <ShineButton
                title="Tarife"
                href="/tarife"
                imageSrc="/images/tarife.png?height=400&width=600"
              />
              <ShineButton
                title="Program"
                href="/program"
                imageSrc="/images/program.png?height=400&width=600"
              />
            </div>
          </div>
        </section>
        <section className="py-16 bg-gradient-to-r from-red-600 to-orange-500 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">
              Pregătit să începi călătoria ta în lumea dansului?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Alătură-te celor peste 12000 de cursanți care au descoperit
              bucuria dansului la școala noastră.
            </p>
            <Link href="/inscriere">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-red-600 hover:bg-gray-100 border-white hover:border-gray-100 text-lg"
              >
                Înscrie-te la un curs
              </Button>
            </Link>
          </div>
        </section>
        <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
          <GrupeInFormareSection />
          <EvenimentePage />
        </section>
        <GrupeInFormare />
      </div>
    </>
  );
}

function ShineButton({
  title,
  href,
  imageSrc,
}: {
  title: string;
  href: string;
  imageSrc?: string;
}) {
  return (
    <Link
      href={href}
      className="relative block overflow-hidden rounded-lg group"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imageSrc || '/placeholder.svg?height=400&width=600'}
          alt={title}
          title={title}
          fill
          className="object-fit transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-white/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-orange-800/60 to-white/20 animate-continuous-shine"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="w-0 h-0.5 bg-white mt-2 transition-all duration-300 group-hover:w-full"></div>
        </div>
      </div>
    </Link>
  );
}
