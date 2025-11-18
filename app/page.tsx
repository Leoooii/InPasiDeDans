import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Script from 'next/script';
import { cn } from '@/lib/utils';
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
import CursuriSection from '@/components/CursuriSection';
import LatestBlogPosts from '@/components/latest-blog-posts';

// On-Demand Revalidation - se actualizează doar când este necesar
export const revalidate = 60 // Activează ISR pentru a actualiza periodic conținutul

export const metadata = {
  title: 'Cursuri de Dans in Bucuresti | Scoala de Dans Sector 4,5 si 6 | In Pasi de Dans',
  description:
    'Scoala de dans in Bucuresti - Descopera cursuri de dans pentru copii si adulti ✅ Invata dansuri latino, societate, populare si particulare intr-o atmosfera prietenoasa ✅ Inscrie-te acum!',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/',
  },
  openGraph: {
    title: 'Cursuri de Dans in Bucuresti | Scoala de Dans Sector 4,5 si 6 | In Pasi de Dans',
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
    title: 'Cursuri de Dans in Bucuresti | Scoala de Dans Sector 4,5 si 6 | In Pasi de Dans',
    description:
      'Școală de dans în București cu cursuri pentru adulți și copii.',
    images: ['https://inpasidedans.ro/images/logo.png'],
  },
};

export default function Home() {
  return (
    <>
      <Head>
        {/* Schema Organization + WebSite - specifică pentru homepage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Organization",
              "@id": "https://www.inpasidedans.ro/#organization",
              "name": "În Pași de Dans",
              "alternateName": "Scoala de Dans In Pasi de Dans",
              "description": "Școală de dans cu tradiție din 2009, oferind cursuri de dansuri latino, de societate, populare și lecții private în București.",
              "url": "https://www.inpasidedans.ro/",
              "logo": "https://www.inpasidedans.ro/images/logo.png",
              "image": "https://www.inpasidedans.ro/images/logo.png",
              "foundingDate": "2009",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Calea Rahovei 262",
                "addressLocality": "București",
                "addressRegion": "Sector 5",
                "postalCode": "050897",
                "addressCountry": "RO"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+40722675126",
                "contactType": "customer service",
                "areaServed": "RO",
                "availableLanguage": "Romanian"
              },
              "sameAs": [
                "https://www.facebook.com/scoaladedansinpasidedans",
                "https://www.instagram.com/inpasidedans/",
                "https://www.tiktok.com/@in.pasi.de.dans"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Cursuri de Dans",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Dansuri Latino",
                      "description": "Salsa, bachata, cha-cha și multe altele"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course", 
                      "name": "Dansuri de Societate",
                      "description": "Vals, tango, foxtrot și alte dansuri elegante"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Dansuri Populare",
                      "description": "Peste 200 de jocuri populare românești"
                    }
                  }
                ]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "WebSite",
              "@id": "https://www.inpasidedans.ro/",
              "name": "În Pași de Dans",
              "url": "https://www.inpasidedans.ro/",
              "publisher": {
                "@id": "https://www.inpasidedans.ro/#organization"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.inpasidedans.ro/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>
      <div className="flex flex-col min-h-screen">
        <StickyMenu menuItems={[
          { id: 'cursuri', label: 'Cursuri' },
          { id: 'grupe', label: 'Grupe în formare' },
          { id: 'noutati', label: 'Noutăți' }
        ]} />
        <CookieConsent />
        <div style={{ display: 'none' }}>
          <Script
            src="https://efreecode.com/js.js"
            id="eXF-pasidans-0"
            async
            defer
          />
        </div>

        <section className="relative h-[70vh] overflow-hidden">
          <div className="sticky top-0 h-[70vh]">
            <div className="relative w-full h-full bg-orange-600">
              <GifWrapperClient />
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30">
                <div className="container text-center text-white px-4">
                  <h2 className="text-3xl md:text-6xl font-bold mb-6 drop-shadow-lg">
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
            </div>
          </div>
        </section>
        <CursuriSection />
        <section id="grupe" className="py-16 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.3),transparent_50%)]" />
          <div className="container relative flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                Pregătit să începi călătoria ta în lumea dansului?
              </h2>
              <p className="text-lg lg:text-xl text-white/80 mb-8">
                Alătură-te celor peste 12.000 de cursanți care au descoperit energia dansului la
                școala noastră, indiferent de vârstă sau nivel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/inscriere">
                  <Button
                    size="lg"
                    className="bg-white text-slate-900 hover:bg-slate-100 font-semibold"
                  >
                    Înscrie-te la un curs
                  </Button>
                </Link>
                <Link href="/grupe-in-formare">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-black hover:bg-white/10"
                  >
                    Vezi grupele active
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 text-left">
              {[
                { label: 'cursanți activi', value: '+300', accent: 'bg-orange-800/20' },
                { label: 'stiluri de dans', value: '20+', accent: 'bg-sky-500/20' },
                { label: 'ani de experiență', value: '15', accent: 'bg-emerald-500/20' },
                { label: 'grupe în formare', value: '6', accent: 'bg-purple-500/20' },
              ].map(item => (
                <div
                  key={item.label}
                  className={cn(
                    'rounded-2xl p-5 border border-white/10 shadow-lg',
                    item.accent
                  )}
                >
                  <p className="text-3xl font-bold">{item.value}</p>
                  <p className="text-sm uppercase tracking-wide text-white/70 mt-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Secțiunea Grupe în Formare */}
        <section className="bg-slate-100 py-16">
          <div className="container space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-2">
                  Grupe în formare
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Alege grupa potrivită pentru tine
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mt-4">
                  Descoperă grupele care încep în următoarele săptămâni și rezervă-ți locul în câteva
                  secunde. Actualizăm lista constant, astfel încât să ai mereu opțiuni proaspete.
                </p>
              </div>
              <Link href="/grupe-in-formare">
                <Button variant="outline" className="border-slate-300 text-slate-800">
                  Vezi toate grupele
                </Button>
              </Link>
            </div>
            <GrupeInFormareSection variant="homepage" limit={3} />
          </div>
        </section>

        {/* Separator vizual */}
        <div className="relative py-16  bg-slate-800">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-1 rounded-full bg-gradient-to-r from-orange-200 via-white to-orange-200 opacity-80" />
              <PartyPopper className="h-12 w-12 text-white drop-shadow-lg" />
              <div className="w-32 h-1 rounded-full bg-gradient-to-r from-orange-200 via-white to-orange-200 opacity-80" />
            </div>
          </div>
        </div>

        {/* Secțiunea Noutăți cu fundal diferit */}
        <section id="noutati" className="bg-white py-16">
          <div className="container space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-2">
                  Noutăți & Evenimente
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Ce se întâmplă la In Pasi de Dans
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mt-4">
                  Vezi cele mai noi anunțuri, workshop-uri și petreceri tematice. Ținem ritmul cu
                  energia comunității noastre și te anunțăm imediat ce apare ceva nou.
                </p>
              </div>
              <Link href="/noutati">
                <Button variant="default" className="bg-slate-900 hover:bg-slate-800">
                  Vezi toate noutățile
                </Button>
              </Link>
            </div>
            <NoutatiSection itemsToShow={3} variant="homepage" />
          </div>
        </section>
        <GrupeInFormare />
        <LatestBlogPosts />
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
