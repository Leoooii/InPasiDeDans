import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Head from './head';
import GrupeInFormare from '@/components/grupe-in-formare';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';

export default function CursuriDansAdulti() {
  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Cursuri dans adulți" }
  ];

  return (
    <div className="container py-12">
      <Head />
      <SEOBreadcrumbs items={breadcrumbItems} />
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
