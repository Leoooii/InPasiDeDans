import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
export default function DansuriDeSocietate() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Dansuri de societate
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Eleganță, rafinament și grație în mișcare
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/societate.png?height=800&width=600"
              alt="Dans de societate"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <p>
              <strong> Dansurile de societate</strong> reprezintă o formă
              elegantă de exprimare artistică și socială, fiind potrivite pentru
              evenimente formale, baluri, dar și petreceri. Aceste dansuri
              combină tehnica precisă cu expresivitatea și conexiunea între
              parteneri.
            </p>
            <p>La școala noastră puteti învăța:</p>
            <ul className="list-disc pl-6">
              <li>VALS LENT</li>
              <li>VALS VIENEZ</li>
              <li>TANGO</li>
              <li>QUICK STEP</li>
              <li>SLOW FOX (FOXTROT)</li>
            </ul>
            <p>
              Dansurile de societate sunt predate in cadrul grupelor, alaturi de
              alte stiluri latino.
            </p>
            <div className="pt-4">
              <Link href="/inscriere">
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Înscrie-te la curs
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Dansuri standard</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image
                  src="/images/vienez.jpeg?height=400&width=600"
                  alt="Vals Vienez"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Vals Vienez</h3>
                <p className="text-gray-500">
                  Valsul vienez este o formă rapidă și grațioasă a valsului, cu
                  mișcări circulare continue și rotații elegante. Se dansează pe
                  un tempo de 3/4 alert și creează impresia unui dans fluid și
                  rotativ, plin de rafinament și romantism.
                </p>
              </CardContent>
            </Card>

            <Card>
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image
                  src="/images/tango2.png?height=400&width=600"
                  alt="Tango"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Tango</h3>
                <p className="text-gray-500">
                  Tango este un dans pasional și intens, originar din Argentina,
                  cunoscut pentru postura dramatică, pașii preciși și conexiunea
                  profundă dintre parteneri. În versiunea de dans sportiv
                  (ballroom), are un stil mai rigid și accentuat, cu mișcări
                  tăioase și expresive.
                </p>
              </CardContent>
            </Card>

            <Card>
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image
                  src="/images/quickstep.png?height=400&width=600"
                  alt="quickstep"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Quickstep</h3>
                <p className="text-gray-500">
                  Quickstep este un dans de societate elegant și rapid, derivat
                  din foxtrot, caracterizat prin pași săltăreți, deplasări
                  rapide și mișcări fluide pe ringul de dans. Este vesel, jucăuș
                  și transmite o senzație de ușurință, de parcă dansatorii
                  „plutesc” pe muzică.
                </p>
              </CardContent>
            </Card>
            <div className="flex w-full h-full justify-center items-center">
              <Link href="/program">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                >
                  Verifica programul
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-black">
                Pregătire pentru evenimente speciale
              </h2>
              <p className="mb-6 dark:text-black">
                Oferim cursuri private pentru pregătirea dansului de nuntă sau
                pentru alte evenimente speciale. Instructorii noștri vă vor
                ajuta să creați un moment memorabil, adaptat preferințelor și
                nivelului vostru.
              </p>
              <Link href="/inscriere">
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Înscrie-te la curs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
