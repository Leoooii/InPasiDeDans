import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import AdultDanceFAQ from '@/components/AdultDanceFAQ';

export const metadata: Metadata = {
  title: 'Cursuri de Dans Adulți București 2025 – Salsa, Bachata, Vals | În Pași de Dans',
  description: 'Cursuri dans adulți București: salsa, bachata, vals, tango, dansuri populare. Grupe mici, instructori certificați, Sector 4-5-6. 12.000+ cursanți din 2009. Înscrie-te acum!',
  keywords: 'dans adulti, cursuri dans adulti, lectii de dans, scoala de dans Bucuresti',
  authors: [{ name: 'Scoala de dans In Pasi de Dans' }],
  alternates: {
    canonical: 'https://www.inpasidedans.ro/cursuri-dans-adulti',
  },
  openGraph: {
    title: 'Cursuri de Dans pentru Adulți | În Pași de Dans',
    description: 'Cursuri de dans pentru adulți: distracție, mișcare și evoluție personală alături de profesioniști.',
    url: 'https://www.inpasidedans.ro/cursuri-dans-adulti',
    siteName: 'In Pasi de Dans',
    locale: 'ro_RO',
    type: 'website',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Cursuri dans adulți București – În Pași de Dans',
      },
    ],
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Care sunt cele mai populare cursuri de dans pentru adulți în București pentru începători?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cele mai căutate cursuri de dans pentru adulți în București sunt cele de dansuri latino, populare și de societate, ideale pentru relaxare, socializare și dezvoltarea coordonării într-un mediu plăcut și prietenos.',
      },
    },
    {
      '@type': 'Question',
      name: 'De ce merită să aleg cursuri de dans pentru adulți la În Pași de Dans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Școala oferă grupe mici, instructori dedicați și programe adaptate nivelului fiecărui cursant, asigurând o evoluție reală și o atmosferă relaxată la fiecare lecție.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cât durează un program complet de cursuri de dans în București pentru adulți?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Durata diferă în funcție de nivel, dar fiecare etapă (începători, intermediari, avansați) se întinde pe câteva luni, permițând participanților să progreseze natural și constant.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pot participa singur la lecții de dans pentru adulți?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Da, înscrierea nu necesită partener; instructorii asigură rotația între cursanți pentru ca toată lumea să se simtă confortabil și să învețe corect pașii de bază.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ce stiluri se predau la cursurile de dans pentru adulți la școala În Pași de Dans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La În Pași de Dans se predau dansuri de societate (vals, tango, foxtrot) și latino (salsa, bachata, rumba), potrivite atât pentru socializare, cât și pentru evenimente speciale, dar și dansuri populare, românești și internaționale.',
      },
    },
    {
      '@type': 'Question',
      name: 'Care este frecvența recomandată pentru cursuri de dans pentru adulți în București?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pentru rezultate vizibile, se recomandă două ședințe pe săptămână, fiecare durând o oră, într-un mediu activ și plin de energie pozitivă.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cât costă un abonament la cursuri de dans pentru adulți la școala În Pași de Dans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prețurile variază în funcție de pachet: abonamentele lunare oferă acces la 8 sau 16 ședințe, iar pentru lecții private există tarife separate adaptate nevoilor cursanților.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ce beneficii aduc lecțiile de dans în București pentru adulți pe termen lung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dansul îmbunătățește postura, coordonarea și tonusul general, reducând stresul și oferind o activitate socială plăcută și dinamică.',
      },
    },
    {
      '@type': 'Question',
      name: 'Există vreo limită de vârstă pentru lecțiile de dans pentru adulți de la În Pași de Dans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nu, cursurile sunt deschise tuturor, indiferent de vârstă sau experiență, fiind structurate pentru a oferi o experiență relaxantă și potrivită pentru toată lumea.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cum pot să mă înscriu la un curs de dans pentru adulți la școala În Pași de Dans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Înscrierea se face simplu, completând formularul online de pe site sau direct la recepția școlii, după care ești repartizat într-o grupă potrivită nivelului tău.',
      },
    },
  ],
};

const breadcrumbItems = [
  { name: 'Acasă', url: '/' },
  { name: 'Cursuri dans adulți' },
];

export default function CursuriDansAdulti() {
  return (
    <div className="container py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/cursuri-dans-adulti" />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Cursuri de dans adulți</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Descoperă pasiunea pentru dans într-un mediu prietenos și profesionist. Vino să faci parte din comunitatea În Pași de Dans!<br />
            <span className="block mt-2">
              <a href="/inscriere" className="text-red-600 underline hover:text-orange-600">Înscrie-te acum</a> ·
              <a href="/program" className="text-red-600 underline hover:text-orange-600 ml-2">Vezi programul</a> ·
              <a href="/tarife" className="text-red-600 underline hover:text-orange-600 ml-2">Tarife</a>
            </span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
              <Image
                src="/images/societate.png?height=400&width=600"
                alt="Dans de societate"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Dansuri de societate</h3>
              <p className="text-gray-500 mb-4">
                Învață dansuri elegante precum vals, tango și quickstep,
                perfecte pentru evenimente formale.
              </p>
              <Link href="/dansuri-de-societate">
                <Button>Află mai multe</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
              <Image
                src="/images/latino.png?height=400&width=600"
                alt="Dans latino"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Dansuri latino</h3>
              <p className="text-gray-500 mb-4">
                Descoperă ritmurile pasionale de salsa, bachata, cha-cha și
                rumba.
              </p>
              <Link href="/dansuri-latino">
                <Button>Află mai multe</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
              <Image
                src="/images/populare.png?height=400&width=600"
                alt="Dans pentru nuntă"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Dansuri populare</h3>
              <p className="text-gray-500 mb-4">
                Hai la joc! Învățati dansuri populare românești, grecești,
                machedonești.
              </p>
              <Link href="/dansuri-populare">
                <Button>Află mai multe</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <AdultDanceFAQ />

        <div className="mt-12 bg-red-50 p-8 rounded-lg ">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-black">
                Înscrie-te la un curs
              </h2>
              <p className="mb-6 dark:text-black">
                Fie că ești începător sau ai mai dansat înainte, avem cursuri
                potrivite pentru toate nivelurile. Vino să descoperi bucuria
                dansului într-o atmosferă prietenoasă și relaxantă.
              </p>
              <div className="flex gap-5">
                <Link href="/inscriere">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                  >
                    Înscrie-te acum
                  </Button>
                </Link>
                <Link href="/program">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                  >
                    Verifică programul
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-80 w-full overflow-hidden ">
              <Image
                src="/images/inscriere.png?height=400&width=600"
                alt="Cursuri de dans"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <GrupeInFormare />
    </div>
  );
}
