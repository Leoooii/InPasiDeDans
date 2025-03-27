import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function GrupeInFormare() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Grupe în Formare</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Alătură-te noilor noastre grupe de dans și începe călătoria ta în lumea dansului
          </p>
        </div>

        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=1200&width=2000"
            alt="Grupe de dans în formare"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-orange-500/80 flex items-center justify-center">
            <div className="text-center text-white max-w-2xl p-6">
              <h2 className="text-3xl font-bold mb-4">Începe să dansezi acum!</h2>
              <p className="text-xl mb-6">
                Formăm noi grupe pentru toate stilurile de dans. Înscrie-te acum și beneficiază de oferte speciale
                pentru noii cursanți!
              </p>
              <Link href="/inscriere">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-red-600 hover:bg-gray-100 border-white hover:border-gray-100"
              >
                Înscrie-te
              </Button></Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Grupe noi în formare</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Dans de Societate - Începători</h3>
                <p className="text-gray-500 mb-4">
                  Învață bazele dansurilor de societate: vals, tango, quickstep și altele.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Start:</span>
                    <span>15 Aprilie 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Program:</span>
                    <span>Luni și Miercuri, 18:00 - 19:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Instructor:</span>
                    <span>Alexandra</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Locuri disponibile:</span>
                    <span>8 din 12</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Rezervă un loc
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Salsa - Începători</h3>
                <p className="text-gray-500 mb-4">
                  Descoperă ritmurile și pașii de bază ai salsei, unul dintre cele mai populare dansuri latino.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Start:</span>
                    <span>20 Aprilie 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Program:</span>
                    <span>Marți și Joi, 19:00 - 20:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Instructor:</span>
                    <span>Alexandra</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Locuri disponibile:</span>
                    <span>10 din 14</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Rezervă un loc
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Dans pentru Copii (7-10 ani)</h3>
                <p className="text-gray-500 mb-4">
                  Curs special pentru copii, combinând elemente de dans modern, clasic și jocuri de mișcare.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Start:</span>
                    <span>18 Aprilie 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Program:</span>
                    <span>Vineri, 16:00 - 17:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Instructor:</span>
                    <span>Alexandra</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Locuri disponibile:</span>
                    <span>6 din 10</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Rezervă un loc
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Beneficii pentru noii cursanți</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2 dark:text-black">Prima lecție gratuită</h3>
              <p className="text-gray-500 text-sm">
                Participă la prima lecție fără nicio obligație, pentru a vedea dacă ți se potrivește.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2 dark:text-black">Reducere 15% pentru noii membri</h3>
              <p className="text-gray-500 text-sm">
                Beneficiază de 15% reducere la abonamentul lunar dacă te înscrii la o grupă nouă.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2 dark:text-black">Abonament de cuplu</h3>
              <p className="text-gray-500 text-sm">
                Vino cu partenerul/a și beneficiați de un preț special pentru abonamentul de cuplu.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2 dark:text-black">Acces la petreceri tematice</h3>
              <p className="text-gray-500 text-sm">
                Ca membru, ai acces gratuit la petrecerile tematice organizate lunar.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-black">Nu găsești grupa potrivită?</h2>
              <p className="mb-6 dark:text-black">
                Dacă nu găsești o grupă care să se potrivească programului tău sau ești interesat de un stil de dans
                care nu este listat, contactează-ne și vom încerca să formăm o grupă nouă care să răspundă nevoilor
                tale.
              </p>
              <Link href={"/contact"}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              >
                Contactează-ne
              </Button></Link>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image src="/images/grupeinformare.png?height=400&width=600" alt="Contact" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

