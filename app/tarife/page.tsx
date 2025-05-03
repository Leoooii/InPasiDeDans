import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function Tarife() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Tarife cursuri adulti
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Consultă tarifele noastre pentru cursurile de dans pentru adulți:
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <Card className="flex flex-col border-red-600 shadow-lg ">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
              {/* <div className="text-center text-sm font-medium uppercase tracking-wider mb-2">Cel mai popular</div> */}
              <CardTitle>Abonament 8</CardTitle>
              <CardDescription className="text-white/90">
                Valabil 4 saptamani
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
                  <span>Acces la o singura grupa</span>
                </li>

                {/* <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Reducere 10% la workshop-uri</span>
                </li> */}
              </ul>
            </CardContent>
            {/* <CardFooter>
              <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Alege acest abonament
              </Button>
            </CardFooter> */}
          </Card>

          <Card className="flex flex-col border-red-600 shadow-lg ">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Abonament 16</CardTitle>
              {/* <CardDescription>Pentru pasionații de dans</CardDescription> */}
              <CardDescription className=" text-white/90">
                Valabil 4 saptamani
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">320 Lei</div>
            </CardHeader>
            <CardContent className="flex-1 mt-2">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>16 sedinte pe luna</span>
                </li>
                <li className="flex items-center">
                  <div>
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                  </div>
                  <span>Acces la 2 grupe </span>
                </li>
              </ul>
            </CardContent>
            {/* <CardFooter>
              <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Alege acest abonament
              </Button>
            </CardFooter> */}
          </Card>
          <Card className="flex flex-col border-red-600 shadow-lg ">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Abonament Full Pass</CardTitle>
              {/* <CardDescription>Pentru pasionații de dans</CardDescription> */}
              <CardDescription className=" text-white/90">
                Valabil 4 saptamani
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
            {/* <CardFooter>
              <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Alege acest abonament
              </Button>
            </CardFooter> */}
          </Card>
          <Card className="flex flex-col border-red-600 shadow-lg ">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Plata la sedinta</CardTitle>
              <CardDescription className=" text-white/90">
                Orice stil de dans
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">45 Lei</div>
            </CardHeader>
            <CardContent className="flex-1 mt-2">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>O sedinta la grup</span>
                </li>
              </ul>
            </CardContent>
            {/* <CardFooter>
              <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Alege acest abonament
              </Button>
            </CardFooter> */}
          </Card>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Tarife lectii private
          </h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <Card className="flex flex-col border-red-600 shadow-lg bg-gradient-to-r from-blue-600 to-orange-500">
            <CardHeader className=" text-white rounded-t-lg">
              <CardTitle>Pachet 4 sedinte</CardTitle>

              <div className="mt-4 text-4xl font-bold">640 Lei</div>
            </CardHeader>
          </Card>
          <Card className="flex flex-col border-red-600 shadow-lg bg-gradient-to-r from-blue-600 to-orange-500">
            <CardHeader className=" text-white rounded-t-lg">
              <CardTitle>Pachet 6 sedinte</CardTitle>

              <div className="mt-4 text-4xl font-bold">900 Lei</div>
            </CardHeader>
          </Card>
          <Card className="flex flex-col border-red-600 shadow-lg ">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Pachet 8 sedinte</CardTitle>

              <div className="mt-4 text-4xl font-bold">1120 Lei</div>
            </CardHeader>
          </Card>
          <Card className="flex flex-col border-red-600 shadow-lg bg-gradient-to-r from-blue-600 to-orange-500">
            <CardHeader className=" text-white rounded-t-lg">
              <CardTitle>Plata la sedinta</CardTitle>
              {/* <CardDescription>Pentru pasionații de dans</CardDescription> */}

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
                Valabil o luna (8 sedinte)
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
    </div>
  );
}
