import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CookieConsent from '@/components/cookie-consent';
import GifWrapperClient from './GifWrapperClient';
import GrupeInFormareSection from '@/components/grupe-in-formare-section';
import NoutatiSection from '@/components/noutati-section';
import StickyMenu from '@/components/sticky-menu';
import CursuriSection from '@/components/CursuriSection';
import LatestBlogPosts from '@/components/latest-blog-posts';
import { getEvenimente, safe } from '@/lib/public-data';

// Conținutul se reîmprospătează la salvare (webhook Sanity, admin → revalidateTag);
// intervalul e doar plasă de siguranță.
export const revalidate = 3600

export const metadata = {
  title: 'Cursuri de Dans București, Sector 4, 5 și 6 | În Pași de Dans',
  description:
    'Școală de dans în București din 2009: cursuri pentru adulți și copii – latino, societate, populare, salsa, bachata și dansul mirilor. Înscrie-te acum!',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/',
  },
  openGraph: {
    title: 'Cursuri de Dans București, Sector 4, 5 și 6 | În Pași de Dans',
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
    title: 'Cursuri de Dans București, Sector 4, 5 și 6 | În Pași de Dans',
    description:
      'Școală de dans în București cu cursuri pentru adulți și copii.',
    images: ['https://www.inpasidedans.ro/images/logo.png'],
  },
};

export default async function Home() {
  const evenimente = await safe(getEvenimente, null);

  return (
    <>
      {/* Schema WebSite; DanceSchool vine din layout-ul rădăcină (SCHOOL_SCHEMA) */}
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
              }
            })
          }}
        />
      <div className="flex flex-col min-h-screen">
        <StickyMenu menuItems={[
          { id: 'cursuri', label: 'Cursuri' },
          { id: 'grupe', label: 'Grupe în formare' },
          { id: 'noutati', label: 'Noutăți' }
        ]} />
        <CookieConsent />

        <section className="relative h-[85vh] overflow-hidden">
          <div className="sticky top-0 h-[85vh]">
            <div className="relative w-full h-full">
              <GifWrapperClient />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-black/40 to-black/20 flex items-center justify-center">
                <div className="container text-center text-white px-4">
                  <p className="text-sm md:text-base uppercase tracking-[0.3em] text-white/70 mb-4 font-medium">
                    Școală de dans în București din 2009
                  </p>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
                    Cursuri de dans<br className="hidden md:block" /> pentru toată familia
                  </h1>
                  <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/85">
                    Latino, societate, populare și cursuri pentru copii —
                    într-o atmosferă prietenoasă și relaxantă.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/inscriere">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold text-base px-8 border-0 shadow-md shadow-orange-500/30"
                      >
                        Înscrie-te acum
                      </Button>
                    </Link>
                    <Link href="/program">
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent border-white/60 text-white hover:bg-white/10 font-medium text-base px-8"
                      >
                        Vezi programul
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CursuriSection />
        {/* Secțiunea Grupe în Formare */}
        <section id="grupe" className="bg-slate-100 py-16">
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

        <section className="py-16 bg-slate-950 text-white">
          <div className="container flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                Pregătit să începi călătoria ta în lumea dansului?
              </h2>
              <p className="text-lg lg:text-xl text-white/80 mb-8">
                Alătură-te celor peste 12.000 de cursanți care au descoperit energia dansului la
                școala noastră, indiferent de vârstă sau nivel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/grupe-in-formare">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold border-0 shadow-md shadow-orange-500/30"
                  >
                    Vezi grupele active
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white/60 text-white hover:bg-white/10 font-medium"
                  >
                    Contactează-ne
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 text-left">
              {[
                { label: 'cursanți activi', value: '+300' },
                { label: 'stiluri de dans', value: '20+' },
                { label: 'ani de experiență', value: String(new Date().getFullYear() - 2009) },
                { label: 'săli de dans', value: '3' },
              ].map(item => (
                <div
                  key={item.label}
                  className="rounded-2xl p-5 border border-white/10 shadow-lg bg-white/5"
                >
                  <p className="text-3xl font-bold text-orange-400">{item.value}</p>
                  <p className="text-sm uppercase tracking-wide text-white/70 mt-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
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
                <Button variant="outline" className="border-slate-300 text-slate-800">
                  Vezi toate noutățile
                </Button>
              </Link>
            </div>
            <NoutatiSection itemsToShow={3} variant="homepage" initial={evenimente} />
          </div>
        </section>

        {/* Bandă CTA contact */}
        <section className="bg-slate-950 text-white py-10">
          <div className="container flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                Nu știi ce curs ți se potrivește?
              </h2>
              <p className="text-white/70 mt-1">
                Sună-ne la{' '}
                <a href="tel:+40722675126" className="font-semibold text-orange-400 hover:text-orange-300">
                  0722 675 126
                </a>{' '}
                și te ajutăm să alegi.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center shrink-0">
              <Link href="/inscriere">
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold border-0 shadow-md shadow-orange-500/30 w-full sm:w-auto">
                  Înscrie-te acum
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="bg-transparent border-white/60 text-white hover:bg-white/10 font-medium w-full sm:w-auto">
                  Contactează-ne
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <LatestBlogPosts />
      </div>
    </>
  );
}
