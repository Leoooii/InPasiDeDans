import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HeroVideo } from '@/components/hero-video';
import GrupeInFormareSection from '@/components/grupe-in-formare-section';
import NoutatiSection from '@/components/noutati-section';
import CursuriSection from '@/components/CursuriSection';
import LatestBlogPosts from '@/components/latest-blog-posts';
import GrupeLibere from '@/components/grupe-libere';
import Testimoniale from '@/components/testimoniale';
import EchipaSiLocatie from '@/components/echipa-si-locatie';
import { getEvenimente, getGrupePublice, getInstructori, getToateGrupele, safe } from '@/lib/public-data';
import { grupeCuLocuriPentruIncepatori } from '@/lib/grupe-libere';
import {
  TESTIMONIALE_COPII,
  TESTIMONIALE_LATINO,
  TESTIMONIALE_POPULARE,
  TESTIMONIALE_SALSA_BACHATA,
  TESTIMONIALE_SOCIETATE,
  type Testimonial,
} from '@/lib/testimoniale';

// Câte o părere (cea mai scurtă) din fiecare tip de curs, ca prima pagină să vorbească
// pentru toată școala fără carduri foarte lungi.
const ceaMaiScurta = (lista: Testimonial[]) =>
  [...lista].sort((a, b) => a.text.length - b.text.length)[0];
const TESTIMONIALE_ACASA = [
  TESTIMONIALE_LATINO,
  TESTIMONIALE_POPULARE,
  TESTIMONIALE_COPII,
  TESTIMONIALE_SOCIETATE,
  TESTIMONIALE_SALSA_BACHATA,
]
  .map(ceaMaiScurta)
  .filter(Boolean)
  .map((t, i) => ({ ...t, id: 1000 + i }));

// Conținutul se reîmprospătează la salvare (webhook Sanity, admin → revalidateTag);
// intervalul e doar plasă de siguranță.
export const revalidate = 86400

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
  const [evenimente, grupeInFormare, toateGrupele, instructori] = await Promise.all([
    safe(getEvenimente, null),
    safe(getGrupePublice, null),
    safe(getToateGrupele, null),
    safe(getInstructori, null),
  ]);
  // Fără grupe noi publice, arătăm grupele de începători care mai au locuri (din orar).
  const faraGrupeNoi = grupeInFormare !== null && grupeInFormare.length === 0;
  const grupeLibere = faraGrupeNoi ? grupeCuLocuriPentruIncepatori(toateGrupele, 6) : [];

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
        <section className="relative h-[85svh] min-h-[520px] overflow-hidden">
          <div className="sticky top-0 h-[85svh] min-h-[520px]">
            <div className="relative w-full h-full bg-slate-900">
              {/* Poza vine direct în HTML (prioritară); videoul se încarcă după ce pagina e gata. */}
              <Image
                src="/images/noi.webp"
                alt="Cursanții și instructorii școlii de dans În Pași de Dans"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <HeroVideo />
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
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xs sm:max-w-none mx-auto">
                    <Button variant="brand"
                        size="lg"
                        className="w-full sm:w-auto font-semibold text-base px-8" asChild><Link href="/inscriere">
                        Înscrie-te acum
                      </Link></Button>
                    <Button
                        size="lg"
                        variant="outlineLight"
                        className="w-full sm:w-auto font-medium text-base px-8" asChild><Link href="/program">
                        Vezi programul
                      </Link></Button>
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
                  {faraGrupeNoi ? 'Începe chiar de săptămâna asta' : 'Grupe în formare'}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  {faraGrupeNoi ? 'Grupe pentru începători cu locuri libere' : 'Alege grupa potrivită pentru tine'}
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mt-4">
                  {faraGrupeNoi
                    ? 'Nu ai nevoie de experiență sau de partener. Alege o grupă și te contactăm pentru prima ședință.'
                    : 'Descoperă grupele care încep în următoarele săptămâni și rezervă-ți locul în câteva secunde.'}
                </p>
              </div>
              <Button variant="outline" className="border-slate-300 text-slate-800" asChild><Link href={faraGrupeNoi ? '/program' : '/grupe-in-formare'}>
                  {faraGrupeNoi ? 'Vezi tot programul' : 'Vezi toate grupele'}
                </Link></Button>
            </div>
            {faraGrupeNoi ? (
              <GrupeLibere grupe={grupeLibere} />
            ) : (
              <GrupeInFormareSection variant="homepage" limit={3} />
            )}
          </div>
        </section>

        <section className="py-16 bg-slate-950 text-white">
          <div className="container flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                Pregătit să începi călătoria ta în lumea dansului?
              </h2>
              <p className="text-lg lg:text-xl text-white/80 mb-8">
                Din 2009, peste 12.000 de oameni au învățat să danseze la noi — copii, adulți,
                miri și pasionați de toate vârstele. Următorul poți fi tu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="brand"
                    size="lg"
                    className="font-semibold" asChild><Link href="/grupe-in-formare">
                    Vezi grupele active
                  </Link></Button>
                <Button
                    size="lg"
                    variant="outlineLight"
                    className="font-medium" asChild><Link href="/contact">
                    Contactează-ne
                  </Link></Button>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 text-left">
              {[
                { label: 'cursanți din 2009', value: '12.000+' },
                { label: 'cursanți activi acum', value: '300+' },
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
        <section id="pareri" className="py-16 bg-white">
          <Testimoniale
            items={TESTIMONIALE_ACASA}
            titlu="Ce spun cursanții noștri"
            subtitlu="Păreri de la cursanți adulți, părinți și pasionați de dansuri populare, latino și de societate."
            latime="treime"
          />
        </section>

        <EchipaSiLocatie instructori={instructori} />

        {/* Secțiunea Noutăți cu fundal diferit */}
        <section id="noutati" className="bg-slate-50 py-16">
          <div className="container space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-2">
                  Noutăți & Evenimente
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Ce se întâmplă la În Pași de Dans
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mt-4">
                  Vezi cele mai noi anunțuri, workshop-uri și petreceri tematice. Ținem ritmul cu
                  energia comunității noastre și te anunțăm imediat ce apare ceva nou.
                </p>
              </div>
              <Button variant="outline" className="border-slate-300 text-slate-800" asChild><Link href="/noutati">
                  Vezi toate noutățile
                </Link></Button>
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
              <Button variant="brand" className="font-semibold w-full sm:w-auto" asChild><Link href="/inscriere">
                  Înscrie-te acum
                </Link></Button>
              <Button variant="outlineLight" className="font-medium w-full sm:w-auto" asChild><Link href="/contact">
                  Contactează-ne
                </Link></Button>
            </div>
          </div>
        </section>

        <LatestBlogPosts />
      </div>
    </>
  );
}
