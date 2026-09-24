import PeScurt, { peScurtAdulti } from '@/components/pe-scurt';
import { getTarife, safe } from '@/lib/public-data';
import { ePretIntrebare, raspunsPretAdulti } from '@/lib/text-preturi';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import AdultDanceFAQ from '@/components/AdultDanceFAQ';

export const metadata: Metadata = {
  title: 'Cursuri de Dans pentru Adulți București | În Pași de Dans',
  description: 'Cursuri de dans pentru adulți în București: salsa, bachata, vals, tango, populare. Grupe pe niveluri, instructori cu experiență, din 2009.',
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

export default async function CursuriDansAdulti() {
  const tarife = await safe(getTarife, null);
  const faqCuPreturi = {
    ...faqSchema,
    mainEntity: faqSchema.mainEntity.map(q =>
      ePretIntrebare(q.name)
        ? { ...q, acceptedAnswer: { ...q.acceptedAnswer, text: raspunsPretAdulti(tarife, q.acceptedAnswer.text) } }
        : q
    ),
  };
  return (
    <div className="container py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqCuPreturi) }}
      />
      <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/cursuri-dans-adulti" />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Cursuri de dans adulți</h1>
          <p className="text-gray-500 ">
            Descoperă pasiunea pentru dans într-un mediu prietenos și profesionist. Vino să faci parte din comunitatea În Pași de Dans!<br />
            <span className="block mt-2">
              <a href="/inscriere" className="text-red-600 underline hover:text-orange-600">Înscrie-te acum</a> ·
              <a href="/program" className="text-red-600 underline hover:text-orange-600 ml-2">Vezi programul</a> ·
              <a href="/tarife" className="text-red-600 underline hover:text-orange-600 ml-2">Tarife</a>
            </span>
          </p>
        </div>

        <PeScurt randuri={peScurtAdulti(tarife)} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
              <Image
                src="/images/societate.png"
                alt="Dans de societate"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Dansuri de societate</h3>
              <p className="text-gray-500 mb-4">
                Învață dansuri elegante precum vals, tango și quickstep,
                perfecte pentru evenimente formale.
              </p>
              <Button variant="outline" asChild><Link href="/dansuri-de-societate">Află mai multe</Link></Button>
            </CardContent>
          </Card>

          <Card>
            <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
              <Image
                src="/images/latino.png"
                alt="Dans latino"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Dansuri latino</h3>
              <p className="text-gray-500 mb-4">
                Descoperă ritmurile pasionale de salsa, bachata, cha-cha și
                rumba.
              </p>
              <Button variant="outline" asChild><Link href="/dansuri-latino">Află mai multe</Link></Button>
            </CardContent>
          </Card>

          <Card>
            <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
              <Image
                src="/images/populare.png"
                alt="Dans pentru nuntă"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Dansuri populare</h3>
              <p className="text-gray-500 mb-4">
                Hai la joc! Învățati dansuri populare românești, grecești,
                machedonești.
              </p>
              <Button variant="outline" asChild><Link href="/dansuri-populare">Află mai multe</Link></Button>
            </CardContent>
          </Card>
        </div>

        <AdultDanceFAQ />

        <div className="mt-12 bg-red-50 p-8 rounded-lg ">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 ">
                Înscrie-te la un curs
              </h2>
              <p className="mb-6 ">
                Fie că ești începător sau ai mai dansat înainte, avem cursuri
                potrivite pentru toate nivelurile. Vino să descoperi bucuria
                dansului într-o atmosferă prietenoasă și relaxantă.
              </p>
              <div className="flex gap-5">
                <Button variant="brand" size="lg" asChild><Link href="/inscriere">
                    Înscrie-te acum
                  </Link></Button>
                <Button variant="outline" size="lg" asChild><Link href="/program">
                    Verifică programul
                  </Link></Button>
              </div>
            </div>

            <div className="relative h-80 w-full overflow-hidden ">
              <Image
                src="/images/inscriere.png"
                alt="Cursuri de dans"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
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
