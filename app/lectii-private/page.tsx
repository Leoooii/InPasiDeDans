import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { UserCircleIcon, UserX2Icon, AlertCircle } from 'lucide-react';
import Head from './head';
import GrupeInFormare from '@/components/grupe-in-formare';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';

export default function LectiiPrivate() {
  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Lecții private" }
  ];

  return (
    <div className="container py-12">
      <Head />
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/lectii-private" />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight mb-5">
          Cursuri particulare de dans
          </h1>
          <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
          <p className="text-gray-500 dark:text-gray-400">
            Ai un program încărcat? Ești mai timid(ă) sau vrei să aprofundezi un anumit stil de dans?
            Cursurile private sunt soluția ideală pentru tine!
          </p>
          <p>
            La În Pași de Dans, oferim lecții individuale adaptate complet nevoilor tale. Fie că ești la început de drum, fie că vrei să-ți perfecționezi tehnica, îți punem la dispoziție antrenori dedicați, un mediu prietenos și un program flexibil.
          </p>
          <div>
            <p className="font-semibold">Cursurile private sunt potrivite pentru:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Persoane cu program variabil, care nu pot participa constant la cursurile de grup</li>
              <li>Cei mai timizi, care preferă o abordare personală și fără presiunea grupului</li>
              <li>Cei care doresc să învețe doar anumite stiluri de dans</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Ce oferim:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Programare flexibilă (în funcție de disponibilitatea ta și de agenda școlii)</li>
              <li>Instructor dedicat, care lucrează 1-la-1 cu tine</li>
              <li>Plan personalizat de învățare și evoluție</li>
              <li>Posibilitatea de a alege stilurile de dans dorite</li>
            </ul>
          </div>
          <p>
            Programează acum o ședință privată și începe călătoria ta în dans, în propriul ritm și stil.
          </p>
          </div>
          <div className="relative h-[600px] lg:h-full w-full rounded-lg overflow-hidden">
            <Image
              src="/images/private3.png?height=800&width=600"
              alt="Dans de societate"
              fill
              className="object-cover"
            />
          </div>
          </div>
          
        </div>

        

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Pachetele noastre</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="flex flex-col border-red-600 shadow-lg bg-gradient-to-r from-red-600 to-orange-500">
            <CardHeader className=" text-white rounded-t-lg">
              <CardTitle>Pachet 4 ședințe</CardTitle>
              <div className="text-2xl font-bold mb-4">640 Lei</div>
            </CardHeader>
            </Card>

            <Card className="flex flex-col border-red-600 shadow-lg bg-gradient-to-r from-red-600 to-orange-500">
              <CardHeader className=" text-white rounded-t-lg">
                <CardTitle>Pachet 6 ședințe</CardTitle>
                <div className="text-2xl font-bold mb-4">900 Lei</div>
              </CardHeader>
            </Card>

            <Card className="flex flex-col border-red-600 shadow-lg bg-gradient-to-r from-red-600 to-orange-500">
              <CardHeader className=" text-white rounded-t-lg">
                <CardTitle>Pachet 8 ședințe</CardTitle>
                <div className="text-2xl font-bold mb-4">1120 Lei</div>
              </CardHeader>
            </Card>
          </div>
        </div>
   
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 mb-10">
          <Card className="flex flex-col border-red-600 shadow-lg bg-gradient-to-r from-blue-600 to-orange-500">
            <CardHeader className=" text-white rounded-t-lg">
              <CardTitle>Plata la ședință</CardTitle>

              <div className="mt-4 text-4xl font-bold">180 Lei</div>
            </CardHeader>
          </Card>
          
        </div>
        <div>
          <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Informații despre plată</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 space-y-2">
                <li>Dacă doriți să efectuați plata la fiecare ședință, prețul pentru o lecție particulară de dans este 180 lei.</li>
                <li>În cazul în care optați pentru unul din pachete, plata orelor particulare de dans se va face integral la prima ședință.</li>
                <li>Anularea și reprogramarea unei ședințe se va face cu cel puțin 24 de ore înainte, telefonic. În caz contrar, ședința se consideră efectuată.</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">
            De ce să alegeți cursurile noastre
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Instructori cu experiență</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Instructorii noștri au pregătit mii de cupluri pentru momentul
                special al nunții.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Coregrafii personalizate</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Creăm coregrafii adaptate nivelului, stilului, personalității și
                aptitudinilor fiecărui cuplu.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Săli private</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Toate ședințele se desfășoară în săli private, pentru a vă oferi
                confortul necesar. Veti fi doar voi și instructorul in sala
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Program flexibil</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Programăm ședințele în funcție de disponibilitatea voastră și de
                agenda noastră, inclusiv în weekend.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Atmosferă relaxată</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Creăm o atmosferă prietenoasă și relaxată, pentru a vă ajuta să
                vă simțiți confortabil.
              </p>
            </div>
          </div>
        </div>

        

        
      </div>
      <GrupeInFormare />
    </div>
  );
}
