import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DansuriLatino() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dansuri Latino</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Pasiune, ritm și energie în fiecare mișcare
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Descoperă ritmurile latino</h2>
            <p>
              Dansurile latino sunt cunoscute pentru energia, pasiunea și
              ritmurile lor contagioase. Originare din America Latină și
              Caraibe, aceste dansuri combină mișcări expresive ale corpului cu
              tehnici specifice de pași și coordonare între parteneri.
            </p>
            <p>
              La școala noastră, veți învăța cele mai populare stiluri de dans
              latino:
            </p>
            <div className="flex gap-10">
              <ul className="list-disc ml-6">
                <li>BACHATA</li>
                <li>SALSA</li>
                <li>RUEDA</li>
                <li>CHA CHA</li>
              </ul>
              <ul className="list-disc ml-6">
                <li>SAMBA</li>
                <li>JIVE</li>
                <li>LINDY HOP</li>
                <li>PASO DOBLE</li>
              </ul>
            </div>
            <p>
              Cursurile sunt adaptate pentru toate nivelurile, de la începători
              până la avansați.
            </p>
            <div className="pt-4">
              <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Înscrie-te la curs
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Dans latino"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Stiluri de dans latino</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Salsa"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Salsa</h3>
                <p className="text-gray-500">
                  Dans dinamic și social, cu origini în Cuba și Puerto Rico,
                  caracterizat prin mișcări rapide ale picioarelor și rotații.
                </p>
              </CardContent>
            </Card>

            <Card>
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image
                  src="/images/bachata.png?height=400&width=600"
                  alt="Bachata"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Bachata</h3>
                <p className="text-gray-500">
                  Dans senzual din Republica Dominicană, cu mișcări fluide ale
                  șoldurilor și pași laterali.
                </p>
              </CardContent>
            </Card>

            <Card>
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image
                  src="/images/cha-cha.png?height=400&width=600"
                  alt="Cha-Cha"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Cha-Cha</h3>
                <p className="text-gray-500">
                  Dans cubanez energic și jucăuș, cu accent pe ritmul sincopat
                  și mișcările precise ale picioarelor.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Programul Cursurilor</h2>
          <div className="grid gap-4">
            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Salsa - Începători</h3>
                <p className="text-gray-500">Instructor: Carlos Mendez</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Luni și Miercuri, 19:00 - 20:30</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Bachata - Începători</h3>
                <p className="text-gray-500">Instructor: Elena și Andrei</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Marți și Joi, 18:00 - 19:30</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Latino Mix - Intermediari</h3>
                <p className="text-gray-500">Instructor: Maria Dumitrescu</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Vineri, 19:00 - 21:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold dark:text-black">
              Petreceri Latino
            </h2>
            <p className="dark:text-black">
              Organizăm periodic petreceri latino, unde puteți practica ce ați
              învățat la cursuri și vă puteți bucura de atmosfera autentică
              latino. Muzică bună, oameni pasionați și multă distracție!
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
            >
              Vezi calendarul petrecerilor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
