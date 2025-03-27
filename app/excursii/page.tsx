import Image from "next/image"
import { Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Excursii() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Excursii în Pași de Dans</h1>
          <p className="text-gray-500 dark:text-gray-400">Descoperă lumea dansului prin excursiile noastre tematice</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Călătorește și dansează</h2>
            <p>
              Excursiile noastre tematice combină pasiunea pentru dans cu plăcerea de a călători și descoperi locuri
              noi. Organizăm periodic excursii atât în România, cât și în străinătate, unde participanții au ocazia să
              învețe dansuri specifice regiunilor vizitate, să participe la workshop-uri cu instructori locali și să se
              bucure de atmosfera autentică.
            </p>
            <p>
              Aceste excursii sunt deschise atât cursanților noștri, cât și partenerilor sau prietenilor acestora, fiind
              o oportunitate excelentă de a socializa și de a împărtăși experiențe unice.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=800&width=600" alt="Excursie de dans" fill className="object-cover" />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Următoarele excursii</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="relative h-60 w-full overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=600" alt="Excursie Cuba" fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  În curând
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Cuba - Patria Salsei</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>15-25 Iunie 2025</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Havana, Trinidad, Santiago de Cuba</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Maxim 20 participanți</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  O călătorie de 10 zile în Cuba, unde vom învăța salsa autentică cubaneză, vom participa la
                  workshop-uri cu dansatori locali și vom explora cultura vibrantă a acestei țări.
                </p>
                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Detalii și înscriere
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Excursie Spania"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Locuri limitate
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Spania - Flamenco și Pasodoble</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>10-17 Septembrie 2025</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Sevilla, Granada, Madrid</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Maxim 16 participanți</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  O săptămână în Spania, explorând pasiunea și energia flamenco-ului și eleganța pasodoble-ului. Vom
                  participa la spectacole autentice și workshop-uri cu artiști locali.
                </p>
                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Detalii și înscriere
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Excursie Maramureș"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Maramureș - Tradiții și Folclor</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>20-23 August 2025</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Sighetu Marmației, Săpânța, Baia Mare</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Maxim 25 participanți</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  Un weekend prelungit în Maramureș, descoperind dansurile tradiționale românești și participând la
                  șezători autentice alături de localnici.
                </p>
                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Detalii și înscriere
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Excursii anterioare</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="relative h-60 rounded-lg overflow-hidden group">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Excursie Argentina"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold">Argentina - Tango Argentinian</h3>
                  <p className="text-sm">Aprilie 2024</p>
                </div>
              </div>
            </div>

            <div className="relative h-60 rounded-lg overflow-hidden group">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Excursie Grecia"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold">Grecia - Dansuri Tradiționale</h3>
                  <p className="text-sm">August 2023</p>
                </div>
              </div>
            </div>

            <div className="relative h-60 rounded-lg overflow-hidden group">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Excursie Bucovina"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold">Bucovina - Hora Bucovinei</h3>
                  <p className="text-sm">Mai 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Propune o destinație</h2>
              <p className="mb-6">
                Ai o idee pentru o excursie tematică de dans? Propune-ne o destinație și, dacă există suficient interes,
                o vom include în programul nostru viitor.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              >
                Trimite propunerea ta
              </Button>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Propune o destinație"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

