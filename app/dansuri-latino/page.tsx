import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Head from './head';
import GrupeInFormare from '@/components/grupe-in-formare';

export default function DansuriLatino() {
  return (
    <div className="container py-12">
      <Head />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dansuri latino</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Pasiune, ritm și energie în fiecare mișcare
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Descoperă ritmurile latino</h2>
            <p>
              Dansurile latino sunt cunoscute pentru energia, pasiunea și
              ritmurile lor contagioase. Originare din America Latină și
              Caraibe, aceste dansuri combină mișcări expresive ale corpului cu
              tehnici specifice de pași și coordonare între parteneri.
            </p>
            <p>
              La În Pași de Dans, veți învăța cele mai populare stiluri de dans
              latino:
            </p>
            <div className="flex gap-10">
              <ul className="list-disc ml-6">
                <li>BACHATA</li>
                <li>SALSA</li>
                <li>RUEDA</li>
                <li>CHA CHA</li>
                <li>RUMBA</li>
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
            <div className="pt-4 flex gap-2">
              <Link href="/inscriere">
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Înscrie-te la curs
                </Button>
              </Link>

              <Link href="/program">
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Verifică programul
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Stiluri de dans latino</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image
                  src="/images/salsa.png?height=400&width=600"
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
                  src="/images/bachata2.png?height=400&width=600"
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
            <Card>
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image
                  src="/images/rueda.png?height=400&width=600"
                  alt="Salsa"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Rueda</h3>
                <p className="text-gray-500">
                  Rueda sau Rueda de Casino este un stil de dans salsa în care
                  mai multe perechi dansează în cerc, sincronizați, schimbând
                  partenerii la comanda unui lider care strigă mișcările. Este
                  energic, social și plin de interacțiune între dansatori.
                </p>
              </CardContent>
            </Card>
            <Card>
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image
                  src="/images/rumba.png?height=400&width=600"
                  alt="Salsa"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Rumba</h3>
                <p className="text-gray-500">
                  Rumba este un stil de dans originar din Cuba, caracterizat
                  prin mișcări lente, senzuale și expresive, axate pe
                  comunicarea dintre parteneri și mișcările fluide ale
                  șoldurilor.
                </p>
              </CardContent>
            </Card>
            <Card>
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image
                  src="/images/samba.png?height=400&width=600"
                  alt="Salsa"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Samba</h3>
                <p className="text-gray-500">
                  Samba este un dans energic și ritmat originar din Brazilia,
                  asociat cu carnavalurile și muzica vibrantă. În forma sa de
                  dans de societate (ballroom), samba are pași rapizi și un ritm
                  distinctiv de „bounce”, exprimând bucurie și dinamism.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <GrupeInFormare/>
    </div>
  );
}
