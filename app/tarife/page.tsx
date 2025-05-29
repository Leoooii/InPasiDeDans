import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import Head from './head';
import GrupeInFormare from '@/components/grupe-in-formare';

export default function Tarife() {
  return (
    <div className="container py-12">
      <Head />

      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Tarife cursuri adulți
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Consultă tarifele noastre pentru cursurile de dans pentru adulți:
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <Card className="flex flex-col border-red-600 shadow-lg ">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Abonament 8</CardTitle>
              <CardDescription className="text-white/90">
                Valabil 4 săptămâni
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">230 Lei</div>
            </CardHeader>
            <CardContent className="flex-1 mt-2">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>8 ședințe pe lună</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Acces la o singură grupă</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="flex flex-col border-red-600 shadow-lg ">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Abonament 16</CardTitle>

              <CardDescription className=" text-white/90">
                Valabil 4 săptămâni
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">320 Lei</div>
            </CardHeader>
            <CardContent className="flex-1 mt-2">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>16 ședințe pe lună</span>
                </li>
                <li className="flex items-center">
                  <div>
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                  </div>
                  <span>Acces la 2 grupe </span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="flex flex-col border-red-600 shadow-lg ">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Abonament Full Pass</CardTitle>

              <CardDescription className=" text-white/90">
                Valabil 4 săptămâni
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">400 Lei</div>
            </CardHeader>
            <CardContent className="flex-1 mt-2">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div>
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                  </div>
                  <span>Acces nelimitat la grupe</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="flex flex-col border-red-600 shadow-lg ">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Plata la ședintă</CardTitle>
              <CardDescription className=" text-white/90">
                Orice stil de dans
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">45 Lei</div>
            </CardHeader>
            <CardContent className="flex-1 mt-2">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>O ședință la grup</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Tarife lecții private
          </h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <Card className="flex flex-col border-red-600 shadow-lg bg-gradient-to-r from-purple-600 to-orange-500">
            <CardHeader className=" text-white rounded-t-lg">
              <CardTitle>Pachet 4 ședințe</CardTitle>

              <div className="mt-4 text-4xl font-bold">640 Lei</div>
            </CardHeader>
          </Card>
          <Card className="flex flex-col border-red-600 shadow-lg bg-gradient-to-r from-purple-600 to-orange-500">
            <CardHeader className=" text-white rounded-t-lg">
              <CardTitle>Pachet 6 ședințe</CardTitle>

              <div className="mt-4 text-4xl font-bold">900 Lei</div>
            </CardHeader>
          </Card>
          <Card className="flex flex-col border-red-600 shadow-lg ">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Pachet 8 ședințe</CardTitle>

              <div className="mt-4 text-4xl font-bold">1120 Lei</div>
            </CardHeader>
          </Card>
          <Card className="flex flex-col border-red-600 shadow-lg bg-gradient-to-r from-purple-600 to-orange-500">
            <CardHeader className=" text-white rounded-t-lg">
              <CardTitle>Plata la ședință</CardTitle>

              <div className="mt-4 text-4xl font-bold">180 Lei</div>
            </CardHeader>
          </Card>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Tarife cursuri copii
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <Card className="flex flex-col border-red-600 shadow-lg ">
            <CardHeader className="bg-gradient-to-r from-pink-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Abonament lunar</CardTitle>

              <CardDescription className=" text-white/90">
                Valabil o lună (8 ședințe)
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">200 Lei</div>
            </CardHeader>
          </Card>
          <Card className="flex flex-col border-red-600 shadow-lg ">
            <CardHeader className="bg-gradient-to-r from-pink-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Plata la ședintă </CardTitle>

              <CardDescription className=" text-white/90">
                Ședintă de grup
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">35 Lei</div>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold dark:text-black">
              Ai întrebări despre tarife?
            </h2>
            <p className="dark:text-black">
              Contactează-ne pentru informații suplimentare
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              >
                Contactează-ne
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <GrupeInFormare />
    </div>
  );
}
