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
import Head from './head';
import GrupeInFormare from '@/components/grupe-in-formare';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function CursuriDansCopii() {
  return (
    <div className="container py-12">
      <Head />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Acasă</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cursuri dans copii</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Cursuri de dans pentru copii</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Dezvoltă coordonarea, încrederea și pasiunea pentru dans de la vârste fragede.<br />
            <span className="block mt-2">
              <a href="/inscriere" className="text-red-600 underline hover:text-orange-600">Înscrie-ți copilul</a> ·
              <a href="/program" className="text-red-600 underline hover:text-orange-600 ml-2">Vezi programul</a> ·
              <a href="/tarife" className="text-red-600 underline hover:text-orange-600 ml-2">Tarife</a>
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
              Dansul este o activitate completă care ajută copiii să se dezvolte
              armonios, atât fizic cât și mental. Prin dans, copiii își
              îmbunătățesc coordonarea, flexibilitatea și condiția fizică, în
              timp ce învață să lucreze în echipă și să-și exprime emoțiile.
            </p>
            <p>
              La școala noastră, cursurile sunt adaptate pe grupe de vârsta și
              nivel, astfel încât fiecare copil să se simtă confortabil și să
              progreseze în ritmul său.
            </p>
            <h1>
              La grupele de copii predăm dans sportiv (dansuri latino și dansuri
              standard) și, ocazional, dansuri populare precum horă, alunelul,
              bătuta ursului, jiana etc.
            </h1>
            <div className="space-y-4">
              <p className="text-lg font-semibold">
                La <span className="bold">În Pași de Dans</span>, primim cu
                bucurie copii care au împlinit vârsta de 7 ani.
              </p>
              <div>
                <p className="font-medium">Echipamentul recomandat:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Îmbrăcăminte lejeră, care permite mișcarea: tricou, colanți
                    sau pantaloni de trening;
                  </li>
                  <li>
                    Încălțăminte adecvată pentru dans (pantofi de sală sau
                    balerini flexibili);
                  </li>
                  <li>
                    Pentru fetițe: părul prins bine (de preferat în coc sau
                    coadă);
                  </li>
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

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Grupe aflate in desfășurare:
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  Grupă intermediari (7-12 ani)
                </h3>
                <p className="text-gray-500 mb-4">
                  La această grupă se predau: cha cha, jive, samba, vals lent,
                  vals vienez, quick step, ocazional - dansuri populare.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Marți și Joi</p>
                  <p>17:15 - 18:15</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  Grupă intermediari/avansați (9-14 ani)
                </h3>
                <p className="text-gray-500 mb-4">
                  La această grupă se predau: cha cha, jive, samba, vals lent,
                  vals vienez, quick step, ocazional - dansuri populare.
                </p>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">
                    <p>Marți</p>
                    <p>17:30 - 18:30</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Vineri</p>
                    <p>18:30 - 19:30</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  Formație intermediari (10-12 ani)
                </h3>
                <p className="text-gray-500 mb-4">
                  Coregrafii dansuri latino/standard, în vederea participării la
                  concursuri de dans.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Joi</p>
                  <p>17:30 - 18:30</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold mb-6">Tarife cursuri copii</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="flex flex-col border-red-600 shadow-lg ">
              <CardHeader className="bg-gradient-to-r from-pink-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Abonament lunar</CardTitle>

                <CardDescription className=" text-white/90">
                  Valabil 4 săptămâni (8 ședințe)
                </CardDescription>
                <div className="mt-4 text-4xl font-bold">200 Lei</div>
              </CardHeader>
            </Card>
            <Card className="flex flex-col border-red-600 shadow-lg ">
              <CardHeader className="bg-gradient-to-r from-pink-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Plata la ședință </CardTitle>

                <CardDescription className=" text-white/90">
                  Ședință de grup
                </CardDescription>
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
