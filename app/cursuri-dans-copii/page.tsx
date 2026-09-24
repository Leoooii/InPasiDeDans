import PeScurt, { peScurtCopii } from '@/components/pe-scurt';
import { getTarife, safe } from '@/lib/public-data';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Calendar, Clock, Droplets, Shirt, Sparkles, Star, Trophy, Users } from 'lucide-react';
import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import FaqBlock from '@/components/faq-block';
import { faqCopii } from '@/lib/faq-stiluri';
import Testimoniale from '@/components/testimoniale';
import { TESTIMONIALE_COPII } from '@/lib/testimoniale';
import TarifeCopiiSection from '@/components/TarifeCopiiSection';

export const metadata: Metadata = {
  title: 'Cursuri de Dans pentru Copii București | În Pași de Dans',
  description:
    'Cursuri de dans pentru copii de 7–14 ani în București: dansuri latino și standard, instructori profesioniști, atmosferă prietenoasă. Sector 5.',
  keywords: 'dans copii, cursuri dans copii, scoala de dans copii, lectii dans juniori',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/cursuri-dans-copii',
  },
  openGraph: {
    title: 'Cursuri de Dans pentru Copii București | În Pași de Dans',
    description:
      'Dans pentru copii într-un mediu distractiv și educativ. Grupe pe vârstă și ritm individual. Sector 4-5-6 București.',
    url: 'https://www.inpasidedans.ro/cursuri-dans-copii',
    images: [{ url: 'https://www.inpasidedans.ro/images/logo.png', alt: 'Cursuri dans copii București' }],
    locale: 'ro_RO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cursuri Dans Copii București | În Pași de Dans',
    description: 'Dans pentru copii în București – Sector 4, 5 și 6. Instructori profesioniști, grupe pe vârstă.',
    images: ['https://www.inpasidedans.ro/images/logo.png'],
  },
  robots: { index: true, follow: true },
};


const breadcrumbItems = [
  { name: 'Acasă', url: '/' },
  { name: 'Cursuri dans copii' },
];

export default async function CursuriDansCopii() {
  const tarife = await safe(getTarife, null);
  return (
    <div className="container py-12">
      <SEOBreadcrumbs
        items={breadcrumbItems}
        currentPageUrl="https://www.inpasidedans.ro/cursuri-dans-copii"
      />
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-sm font-medium px-4 py-1.5 rounded-full border border-red-100 ">
              <Sparkles className="w-4 h-4" />
              Copii între 7 și 14 ani · Sector 4, 5 și 6
            </div>
            <h1 className="text-4xl font-bold tracking-tight leading-tight">
              Cursuri dans copii{' '}
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                București
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Dansul este o activitate completă — coordonare, flexibilitate, ritm
              și lucru în echipă. Cursurile noastre sunt adaptate pe grupe de vârstă
              și nivel, astfel încât fiecare copil să progreseze în ritmul său.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Predăm dans sportiv (latino și standard) și, ocazional, dansuri
              populare: horă, alunelul, bătuta ursului, jiana.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="brand"
                  size="lg" asChild><Link href="/inscriere">
                  Înscrie-ți copilul
                </Link></Button>
            </div>
          </div>
          <div className="relative h-[440px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/copii2.png"
              alt="Copii dansând"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>

        <PeScurt randuri={peScurtCopii(tarife)} />

        {/* Echipament + varsta */}
        <div className="mt-4 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-900 ">De ce dans pentru copii?</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Prin dans, copiii își îmbunătățesc coordonarea, flexibilitatea și condiția fizică,
                în timp ce învață să lucreze în echipă și să-și exprime emoțiile.
              </p>
              <p className="text-sm font-semibold text-gray-800 mt-4">
                Primim cu bucurie copii care au împlinit{' '}
                <span className="text-red-600">vârsta de 7 ani.</span>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 ">Echipament recomandat</h3>
              <ul className="space-y-3">
                {[
                  { icon: Shirt, text: 'Îmbrăcăminte lejeră: tricou, colanți sau pantaloni de trening' },
                  { icon: Star, text: 'Pantofi de sală sau balerini flexibili' },
                  { icon: Sparkles, text: 'Fetițe: părul prins bine (coc sau coadă)' },
                  { icon: Droplets, text: 'Sticlă cu apă pentru hidratare' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-sm text-gray-600 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-3xl font-bold">Grupe aflate în desfășurare</h2>
            <p className="text-gray-500 ">Alegeti grupa potrivită nivelului copilului vostru</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <Card className="border-2 border-orange-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <CardContent className="p-7">
                <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  <Users className="w-3 h-3" />
                  Începători
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 ">Grupă copii începători</h3>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                  Cha cha, jive, vals lent și quick step.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 ">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>Marți și Joi</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1.5">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>17:30 – 18:30</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <CardContent className="p-7">
                <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  <Star className="w-3 h-3" />
                  Intermediari / Avansați
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 ">Grupă intermediari / avansați</h3>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                  Cha cha, jive, samba, vals lent, vals vienez, quick step, ocazional dansuri populare.
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-gray-600 ">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>Vineri 18:30 – 19:30</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 ">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>Sâmbătă 11:00 – 12:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <CardContent className="p-7">
                <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  <Trophy className="w-3 h-3" />
                  Formație concurs
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 ">Formație intermediari</h3>
                <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                  Coregrafii dans latino/standard, în vederea participării la concursuri de dans.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 ">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>Sâmbătă</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1.5">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>12:00 – 13:00</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <FaqBlock intrebari={faqCopii(tarife)} titlu="Întrebări frecvente despre cursurile de dans pentru copii" icon="plus" deschisPrima className="py-12" />

        <Testimoniale items={TESTIMONIALE_COPII} />

        <div className="mt-16 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Tarife cursuri copii</h2>
            <p className="text-gray-500 ">Abonamente flexibile, adaptate nevoilor voastre</p>
          </div>
          <TarifeCopiiSection />
        </div>
      </div>
      <GrupeInFormare />
    </div>
  );
}
