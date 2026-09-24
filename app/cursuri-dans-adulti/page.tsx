import PeScurt, { peScurtAdulti } from '@/components/pe-scurt';
import CtaBanner from '@/components/cta-banner';
import { getTarife, safe } from '@/lib/public-data';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import FaqBlock from '@/components/faq-block';
import { faqAdulti } from '@/lib/faq-stiluri';

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


const breadcrumbItems = [
  { name: 'Acasă', url: '/' },
  { name: 'Cursuri dans adulți' },
];

export default async function CursuriDansAdulti() {
  const tarife = await safe(getTarife, null);
  return (
    <div className="container py-12">
      <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/cursuri-dans-adulti" />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Cursuri de dans adulți</h1>
          <p className="text-slate-500 ">
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
              <p className="text-slate-500 mb-4">
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
              <p className="text-slate-500 mb-4">
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
              <p className="text-slate-500 mb-4">
                Hai la joc! Învățati dansuri populare românești, grecești,
                machedonești.
              </p>
              <Button variant="outline" asChild><Link href="/dansuri-populare">Află mai multe</Link></Button>
            </CardContent>
          </Card>
        </div>

        <FaqBlock intrebari={faqAdulti(tarife)} titlu="Întrebări frecvente despre cursurile de dans pentru adulți" icon="plus" deschisPrima className="py-12" />

        <CtaBanner
          titlu="Înscrie-te la un curs"
          text="Fie că ești începător sau ai mai dansat înainte, avem cursuri potrivite pentru toate nivelurile. Vino să descoperi bucuria dansului într-o atmosferă prietenoasă și relaxantă."
          secundar={{ href: '/program', label: 'Verifică programul' }}
          imagine={{ src: '/images/inscriere.png', alt: 'Cursuri de dans' }}
        />
      </div>
      <GrupeInFormare />
    </div>
  );
}
