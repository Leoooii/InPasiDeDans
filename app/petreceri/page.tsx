"use client"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ImageSkeleton from "@/components/image-skeleton"

export default function Petreceri() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Petreceri în Pași de Dans</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Participă la petrecerile noastre tematice și pune în practică ce ai învățat
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Dansează și socializează</h2>
            <p>
              Petrecerile tematice organizate de școala noastră sunt ocazii perfecte pentru a practica ce ai învățat la
              cursuri, într-o atmosferă relaxată și prietenoasă. Acestea sunt deschise atât cursanților noștri, cât și
              prietenilor acestora sau oricui dorește să se bucure de o seară de dans.
            </p>
            <p>
              Fiecare petrecere are o tematică specifică, fie că este vorba despre salsa, bachata, tango, dansuri de
              societate sau dansuri populare. Muzica, decorațiunile și atmosfera sunt adaptate tematicii, oferind o
              experiență autentică și memorabilă.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <ImageSkeleton width={600} height={400} className="w-full h-full" />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Următoarele petreceri</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <a href="#" className="block">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-60 w-full overflow-hidden">
                  <ImageSkeleton width={600} height={400} className="w-full h-full" />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    În curând
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Salsa & Bachata Night</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>15 Aprilie 2025</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>20:00 - 01:00</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Sala Mare, In pasi de Dans</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">
                    O seară dedicată ritmurilor latino, cu muzică live, demonstrații ale instructorilor și multe
                    surprize. Vino să dansezi salsa, bachata și merengue într-o atmosferă autentică!
                  </p>
                </CardContent>
              </Card>
            </a>

            <a href="#" className="block">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-60 w-full overflow-hidden">
                  <ImageSkeleton width={600} height={400} className="w-full h-full" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Milonga - Seară de Tango</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>30 Aprilie 2025</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>19:00 - 23:00</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Sala 2, In pasi de Dans</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">
                    O seară elegantă dedicată tangoului argentinian, cu muzică tradițională, demonstrații ale
                    instructorilor și atmosferă autentică de milonga. Dress code: elegant.
                  </p>
                </CardContent>
              </Card>
            </a>

            <a href="#" className="block">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-60 w-full overflow-hidden">
                  <ImageSkeleton width={600} height={400} className="w-full h-full" />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Locuri limitate
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Balul Primăverii</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>20 Mai 2025</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>19:00 - 24:00</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Hotel Intercontinental, Sala Rondă</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">
                    Un eveniment elegant cu muzică live, dans de societate, demonstrații ale instructorilor și invitați
                    speciali. Dress code: formal. Include cină festivă.
                  </p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Petreceri tematice regulate</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Salsa & Bachata Night</h3>
              <p className="text-gray-500 text-sm">În fiecare ultimă vineri din lună, de la 20:00 la 01:00.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Milonga - Seară de Tango</h3>
              <p className="text-gray-500 text-sm">În fiecare a doua joi din lună, de la 19:00 la 23:00.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Seară de Dans de Societate</h3>
              <p className="text-gray-500 text-sm">În fiecare a treia sâmbătă din lună, de la 19:00 la 23:00.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Șezătoare Dansantă</h3>
              <p className="text-gray-500 text-sm">În fiecare primul duminică din lună, de la 17:00 la 21:00.</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Galerie de la petrecerile anterioare</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                <ImageSkeleton width={300} height={300} className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Organizează o petrecere privată</h2>
              <p className="mb-6">
                Dorești să organizezi o petrecere tematică de dans pentru un eveniment special, aniversare sau team
                building? Contactează-ne pentru a discuta despre opțiunile personalizate pe care le oferim.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              >
                Solicită o ofertă
              </Button>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <ImageSkeleton width={600} height={400} className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

