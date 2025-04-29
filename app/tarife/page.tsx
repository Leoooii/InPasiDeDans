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

export default function Tarife() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Tarife</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Consultă tarifele noastre pentru cursurile de dans
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <Card className="flex flex-col border-red-600 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Abonament 4</CardTitle>
              <CardDescription className=" text-white/90">
                Valabil 4 saptamani
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">
                160 Lei
                <span className="text-base font-normal  text-white/90">
                  /lună
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 mt-2">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>4 ședințe pe lună</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Acces la un singur stil de dans</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Participare la petrecerile tematice</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Materiale didactice online pe whatsapp</span>
                </li>
              </ul>
            </CardContent>
            {/* <CardFooter>
              <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Alege acest abonament
              </Button>
            </CardFooter> */}
          </Card>

          <Card className="flex flex-col border-red-600 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
              {/* <div className="text-center text-sm font-medium uppercase tracking-wider mb-2">Cel mai popular</div> */}
              <CardTitle>Abonament 8</CardTitle>
              <CardDescription className="text-white/90">
                Valabil 4 saptamani
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">
                230 Lei
                <span className="text-base font-normal text-white/90">
                  /lună
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 mt-2">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>8 ședințe pe lună</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Acces la mai multe stiluri de dans</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Participare gratuită la petrecerile tematice</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Materiale didactice online pe Whatsapp</span>
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

          <Card className="flex flex-col border-red-600 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Abonament 16</CardTitle>
              {/* <CardDescription>Pentru pasionații de dans</CardDescription> */}
              <CardDescription className=" text-white/90">
                Valabil 4 saptamani
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">
                320 Lei
                <span className="text-base font-normal  text-white/90">
                  /lună
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 mt-2">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>16 sedinte pe luna</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Acces la toate stilurile de dans</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Participare gratuită la petrecerile tematice</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Materiale didactice online</span>
                </li>
              </ul>
            </CardContent>
            {/* <CardFooter>
              <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Alege acest abonament
              </Button>
            </CardFooter> */}
          </Card>
          <Card className="flex flex-col border-red-600 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
              <CardTitle>Abonament Full Pass</CardTitle>
              {/* <CardDescription>Pentru pasionații de dans</CardDescription> */}
              <CardDescription className=" text-white/90">
                Valabil 4 saptamani
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">
                400 Lei
                <span className="text-base font-normal  text-white/90">
                  /lună
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 mt-2">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Acces nelimitat la grupe (in limita nivelului)</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Acces la toate stilurile de dans</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Participare gratuită la petrecerile tematice</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Materiale didactice online</span>
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

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Alte opțiuni</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Plata la sedinta</CardTitle>
                <div className="mt-2 text-2xl font-bold">45 Lei</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Participare la o singură ședință, fără abonament. Ideal pentru
                  cei care vor să încerce înainte de a se înscrie.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ședință privată</CardTitle>
                <div className="mt-2 text-2xl font-bold">150 Lei</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Ședință individuală sau de cuplu cu un instructor dedicat,
                  pentru progres rapid sau pregătire specială.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Curs de dans pentru copii</CardTitle>
                <div className="mt-2 text-2xl font-bold">200 lei/copil</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  (valabil o luna calendaristica - include 8 sedinte).
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Curs pentru nuntă</CardTitle>
                <div className="mt-2 text-2xl font-bold">De la 640 Lei</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Pachet personalizat pentru miri, care include 4 ședințe
                  private pentru pregătirea dansului de nuntă.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Curs pentru nuntă</CardTitle>
                <div className="mt-2 text-2xl font-bold">De la 900 Lei</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Pachet personalizat pentru miri, care include 6 ședințe
                  private pentru pregătirea dansului de nuntă.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Curs pentru nuntă</CardTitle>
                <div className="mt-2 text-2xl font-bold">De la 1120 Lei</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Pachet personalizat pentru miri, care include 8 ședințe
                  private pentru pregătirea dansului de nuntă.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Reduceri disponibile</h2>
          <div className="grid gap-4">
            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Reducere pentru studenți</h3>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">
                  10% reducere la toate abonamentele (cu prezentarea
                  legitimației)
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Reducere pentru seniori</h3>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">
                  15% reducere la toate abonamentele (pentru persoane peste 60
                  de ani)
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Reducere de fidelitate</h3>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">
                  5% reducere după 6 luni de abonament, 10% după 1 an
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Reducere pentru familie</h3>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">
                  15% reducere pentru al treilea membru al familiei
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold dark:text-black">
              Ai întrebări despre tarife?
            </h2>
            <p className="dark:text-black">
              Contactează-ne pentru informații suplimentare sau pentru a discuta
              despre opțiuni personalizate care să se potrivească nevoilor tale.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
            >
              Contactează-ne
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
