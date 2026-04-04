import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import Link from 'next/link';
import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import ChildrenDanceFAQ from '@/components/ChildrenDanceFAQ';
import TestimonialsSection from '@/components/TestimonialsSection';

export const metadata: Metadata = {
  title: 'Cursuri Dans Copii București – Sector 4, 5 și 6 | În Pași de Dans',
  description:
    'Cursuri de dans pentru copii în București – dansuri latino și standard pentru copii între 7 și 14 ani. Instructori profesioniști, atmosferă prietenoasă, Sector 4-5-6. Înscrie-ți copilul acum!',
  keywords: 'dans copii, cursuri dans copii, scoala de dans copii, lectii dans juniori',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/cursuri-dans-copii',
  },
  openGraph: {
    title: 'Cursuri Dans Copii București – Sector 4, 5 și 6 | În Pași de Dans',
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Care este vârsta minimă pentru înscrierea la cursurile de dans pentru copii?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Copiii pot începe cursurile de dans de la vârsta de 7 ani, atunci când pot urma instrucțiunile și pot învăța coregrafii simple într-un mod distractiv și sigur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ce stiluri sunt incluse la cursurile de dans pentru copii de la școala În Pași de Dans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'În cadrul cursurilor de dans pentru copii, micii dansatori învață dansuri precum cha cha, jive, vals lent și quick step, dezvoltându-și postura, coordonarea și simțul ritmului.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cât durează un program complet la cursurile de dans pentru copii din București?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un modul are loc pe parcursul a mai multor luni, cu lecții săptămânale ce urmăresc progresul natural al fiecărui copil.',
      },
    },
    {
      '@type': 'Question',
      name: 'De ce să aleg cursuri de dans pentru copii în București la În Pași de Dans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Școala oferă un mediu cald și motivant, cu instructori pasionați care transformă cursurile de dans pentru copii într-o experiență educativă și plină de bucurie.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cât costă participarea la lecții de dans pentru copii la școala În Pași de Dans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prețul variază în funcție de abonament, iar pachetele lunare includ de la 4 la 12 ședințe interactive și pline de energie.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cum se desfășoară o ședință tipică din cursurile de dans pentru copii?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fiecare lecție începe cu exerciții de încălzire, urmate de învățarea pașilor de bază și se încheie cu momente de repetiție și jocuri ritmice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ce echipament este necesar pentru participarea la cursurile de dans pentru copii de la școala În Pași de Dans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Recomandăm haine lejere, încălțăminte confortabilă și o atitudine pozitivă, pregătită pentru mișcare și distracție.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cum pot înscrie copilul la cursurile de dans pentru copii din București la școala În Pași de Dans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Înscrierea se poate face online, completând formularul disponibil pe site, sau telefonic la 0722 675 126, în funcție de grupa și programul dorit.',
      },
    },
  ],
};

const breadcrumbItems = [
  { name: 'Acasă', url: '/' },
  { name: 'Cursuri dans copii' },
];

export default function CursuriDansCopii() {
  return (
    <div className="container py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SEOBreadcrumbs
        items={breadcrumbItems}
        currentPageUrl="https://www.inpasidedans.ro/cursuri-dans-copii"
      />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Cursuri dans copii București – Sector 4, 5 și 6
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Dezvoltă coordonarea, încrederea și pasiunea pentru dans de la vârste fragede.
            <br />
            <span className="block mt-2">
              <a href="/inscriere" className="text-red-600 underline hover:text-orange-600">
                Înscrie-ți copilul
              </a>{' '}
              ·
              <a href="/program" className="text-red-600 underline hover:text-orange-600 ml-2">
                Vezi programul
              </a>{' '}
              ·
              <a href="/tarife" className="text-red-600 underline hover:text-orange-600 ml-2">
                Tarife
              </a>
            </span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/copii2.png?height=800&width=600"
              alt="Copii dansând"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">De ce dans pentru copii?</h2>
            <p>
              Dansul este o activitate completă care ajută copiii să se dezvolte armonios, atât
              fizic cât și mental. Prin dans, copiii își îmbunătățesc coordonarea, flexibilitatea
              și condiția fizică, în timp ce învață să lucreze în echipă și să-și exprime emoțiile.
            </p>
            <p>
              La școala noastră, cursurile sunt adaptate pe grupe de vârsta și nivel, astfel încât
              fiecare copil să se simtă confortabil și să progreseze în ritmul său.
            </p>
            <p>
              La grupele de copii predăm dans sportiv (dansuri latino și dansuri standard) și,
              ocazional, dansuri populare precum horă, alunelul, bătuta ursului, jiana etc.
            </p>
            <div className="space-y-4">
              <p className="text-lg font-semibold">
                La <span className="font-bold">În Pași de Dans</span>, primim cu bucurie copii
                care au împlinit vârsta de 7 ani.
              </p>
              <div>
                <p className="font-medium">Echipamentul recomandat:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Îmbrăcăminte lejeră, care permite mișcarea: tricou, colanți sau pantaloni de trening;</li>
                  <li>Încălțăminte adecvată pentru dans (pantofi de sală sau balerini flexibili);</li>
                  <li>Pentru fetițe: părul prins bine (de preferat în coc sau coadă);</li>
                  <li>Sticlă cu apă pentru hidratare.</li>
                </ul>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/inscriere">
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Înscrie-ți copilul
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Ce înveți în primele 4 lecții */}
        <div className="mt-12 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
          <h2 className="text-2xl font-bold mb-2 text-center">Ce înveță copilul în primele 4 lecții</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Fiecare lecție este gândită să construiască baza dansului în mod natural și distractiv.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                nr: '1',
                titlu: 'Ritm și postură',
                desc: 'Copilul descoperă pulsul muzicii și învață primii pași de Cha Cha. Exerciții de postură corectă și mișcări de bază.',
              },
              {
                nr: '2',
                titlu: 'Coordonare',
                desc: 'Sincronizarea mâinilor cu picioarele prin pașii de Jive. Jocuri ritmice care fac coordonarea amuzantă.',
              },
              {
                nr: '3',
                titlu: 'Dans în pereche',
                desc: 'Introducere în dansul în cuplu: cum se ține mâna partenerului și cum se mișcă împreună în ritm.',
              },
              {
                nr: '4',
                titlu: 'Prima coregrafie',
                desc: 'O mini-coregrafie de 4–8 pași combinați, prezentată în fața grupei. Primul moment de scenă!',
              },
            ].map((item) => (
              <div
                key={item.nr}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-red-100 dark:border-red-900"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
                  {item.nr}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.titlu}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Grupe aflate in desfășurare:</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Grupă copii incepatori</h3>
                <p className="text-gray-500 mb-4">
                  La această grupă se predau: cha cha, jive, vals lent si quick step.
                </p>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">
                    <p>Marti si Joi</p>
                    <p>17:30 - 18:30</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Grupă intermediari/avansați</h3>
                <p className="text-gray-500 mb-4">
                  La această grupă se predau: cha cha, jive, samba, vals lent, vals vienez, quick
                  step, ocazional - dansuri populare.
                </p>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">
                    <p>Vineri</p>
                    <p>18:30 - 19:30</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Sâmbătă</p>
                    <p>11:00 - 12:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Formație intermediari</h3>
                <p className="text-gray-500 mb-4">
                  Coregrafii dansuri latino/standard, în vederea participării la concursuri de dans.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Sâmbătă</p>
                  <p>12:00 - 13:00</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <ChildrenDanceFAQ />

        <TestimonialsSection danceType="copii" />

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold mb-6">Tarife cursuri copii</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="flex flex-col border-red-600 shadow-lg ">
              <CardHeader className="bg-gradient-to-r from-pink-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Abonament 4</CardTitle>
                <CardDescription className=" text-white/90">
                  Valabil 4 săptămâni (4 ședințe)
                </CardDescription>
                <div className="mt-4 text-4xl font-bold">110 Lei</div>
              </CardHeader>
            </Card>
            <Card className="flex flex-col border-red-600 shadow-lg ">
              <CardHeader className="bg-gradient-to-r from-pink-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Abonament 8</CardTitle>
                <CardDescription className=" text-white/90">
                  Valabil 4 săptămâni (8 ședințe)
                </CardDescription>
                <div className="mt-4 text-4xl font-bold">200 Lei</div>
              </CardHeader>
            </Card>
            <Card className="flex flex-col border-red-600 shadow-lg ">
              <CardHeader className="bg-gradient-to-r from-pink-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Abonament 12</CardTitle>
                <CardDescription className=" text-white/90">
                  Valabil 4 săptămâni (12 ședințe)
                </CardDescription>
                <div className="mt-4 text-4xl font-bold">250 Lei</div>
              </CardHeader>
            </Card>
            <Card className="flex flex-col border-red-600 shadow-lg ">
              <CardHeader className="bg-gradient-to-r from-pink-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Plata la ședință</CardTitle>
                <CardDescription className=" text-white/90">Ședință de grup</CardDescription>
                <div className="mt-4 text-4xl font-bold">35 Lei</div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
      <GrupeInFormare />
    </div>
  );
}
