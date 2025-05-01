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

export default function CursuriDansCopii() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Cursuri Dans Copii
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Dezvoltă coordonarea, încrederea și pasiunea pentru dans de la
            vârste fragede
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
              La școala noastră, cursurile sunt adaptate pe grupe de vârstă și
              nivel, astfel încât fiecare copil să se simtă confortabil și să
              progreseze în ritmul său.
            </p>
            <h1>Stiluri de dans:</h1>
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
            Grupe aflate in desfasurare:
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  Grupa INTERMEDIARI (7-12 ani)
                </h3>
                <p className="text-gray-500 mb-4">
                  Jocuri de mișcare și ritm, primii pași de dans și coordonare,
                  totul într-o atmosferă distractivă.
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
                  Grupa INTERMEDIARI/AVANSATI (9-14 ani)
                </h3>
                <p className="text-gray-500 mb-4">
                  Elemente de bază din diferite stiluri de dans, coordonare și
                  dezvoltarea simțului ritmic.
                </p>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">
                    <p>Vineri</p>
                    <p>18:30 - 19:30</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Vineri</p>
                    <p>12:00 - 13:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  Formatie INTERMEDIARI (10-12 ani)
                </h3>

                <div className="text-sm text-gray-500">
                  <p>Sambata</p>
                  <p>11:00 - 12:00</p>
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
                  Valabil 4 saptamani (8 sedinte)
                </CardDescription>
                <div className="mt-4 text-4xl font-bold">200 Lei</div>
              </CardHeader>
            </Card>
            <Card className="flex flex-col border-red-600 shadow-lg ">
              <CardHeader className="bg-gradient-to-r from-pink-600 to-orange-500 text-white rounded-t-lg">
                <CardTitle>Plata la sedinta </CardTitle>

                <CardDescription className=" text-white/90">
                  Sedinta de grup
                </CardDescription>
                <div className="mt-4 text-4xl font-bold">35 Lei</div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
