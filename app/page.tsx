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
import NoutatiSection from '@/components/noutati-section';
import { PartyPopper } from 'lucide-react';
import StickyMenu from '@/components/sticky-menu';

export const metadata = {
  title: 'Cursuri de Dans in Bucuresti | Scoala de Dans Sector 5 | In Pasi de Dans',
  description:
    'Scoala de dans in Bucuresti - Descopera cursuri de dans pentru copii si adulti ✅ Invata dansuri latino, societate, populare si particulare intr-o atmosfera prietenoasa ✅ Inscrie-te acum!',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/',
  },
  openGraph: {
    title: 'Cursuri de Dans in Bucuresti | Scoala de Dans Sector 5 | In Pasi de Dans',
    description:
      'Școală de dans în București cu cursuri pentru adulți și copii.',
    url: 'https://www.inpasidedans.ro/',
    siteName: 'În Pași de Dans',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'În Pași de Dans',
      },
    ],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cursuri de Dans in Bucuresti | Scoala de Dans Sector 5 | In Pasi de Dans',
    description:
      'Școală de dans în București cu cursuri pentru adulți și copii.',
    images: ['https://inpasidedans.ro/images/logo.png'],
  },
};

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <StickyMenu />
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
              <h2 className="text-3xl md:text-6xl font-bold mb-6">
                "Dansul este puțină nebunie care ne face tuturor mult bine!"
              </h2>
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
        <section id="cursuri" className="pb-16 pt-20 bg-gray-800">
          {/* <ScrollDownArrows /> */}
          <div className="container px-10 sm:px-20">
            <h1 className="text-3xl font-bold mb-12 text-center text-white">
              Cursuri de Dans în București
            </h1>
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
        <section
          id="grupe"
          className="py-16 bg-gradient-to-r from-red-600 to-orange-500 text-white"
        >
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
          <div>
            <GrupeInFormareSection />
          </div>

          <div className="my-12 flex flex-col items-center gap-2">
            <div className="w-32 h-1 rounded-full bg-gradient-to-r from-orange-200 via-white to-orange-200 opacity-80 mb-2" />
            <PartyPopper className="h-10 w-10 text-white drop-shadow-lg" />
            <div className="w-32 h-1 rounded-full bg-gradient-to-r from-orange-200 via-white to-orange-200 opacity-80 mt-2" />
          </div>

          <div id="noutati">
            <NoutatiSection itemsToShow={4} />
          </div>
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
