import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CursuriDansCopii() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Cursuri Dans Copii</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Dezvoltă coordonarea, încrederea și pasiunea pentru dans de la vârste fragede
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=800&width=600" alt="Copii dansând" fill className="object-cover" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">De ce dans pentru copii?</h2>
            <p>
              Dansul este o activitate completă care ajută copiii să se dezvolte armonios, atât fizic cât și mental.
              Prin dans, copiii își îmbunătățesc coordonarea, flexibilitatea și condiția fizică, în timp ce învață să
              lucreze în echipă și să-și exprime emoțiile.
            </p>
            <p>
              La școala noastră, cursurile sunt adaptate pe grupe de vârstă și nivel, astfel încât fiecare copil să se
              simtă confortabil și să progreseze în ritmul său.
            </p>
            <div className="pt-4">
              <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Înscrie-ți copilul
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Grupe de vârstă</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Mini (4-6 ani)</h3>
                <p className="text-gray-500 mb-4">
                  Jocuri de mișcare și ritm, primii pași de dans și coordonare, totul într-o atmosferă distractivă.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Marți și Joi</p>
                  <p>16:00 - 17:00</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Junior (7-10 ani)</h3>
                <p className="text-gray-500 mb-4">
                  Elemente de bază din diferite stiluri de dans, coordonare și dezvoltarea simțului ritmic.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Luni și Miercuri</p>
                  <p>16:30 - 17:30</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Teen (11-14 ani)</h3>
                <p className="text-gray-500 mb-4">
                  Tehnici avansate de dans, coregrafii complexe și participare la evenimente și competiții.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Marți și Vineri</p>
                  <p>17:30 - 19:00</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Stiluri de dans pentru copii</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Dans Modern</h3>
              <p className="text-gray-500 text-sm">Combinație de elemente de balet, jazz și dans contemporan.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Dans de Caracter</h3>
              <p className="text-gray-500 text-sm">Dansuri tradiționale și folclorice adaptate pentru copii.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Dans Sportiv</h3>
              <p className="text-gray-500 text-sm">Elemente de bază din dansurile standard și latino.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Street Dance</h3>
              <p className="text-gray-500 text-sm">Hip-hop, breakdance și alte stiluri urbane moderne.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold">Programează o lecție gratuită</h2>
            <p>
              Oferim o primă lecție gratuită pentru ca micuțul tău să experimenteze atmosfera cursurilor noastre și să
              vadă dacă i se potrivește.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
            >
              Programează lecția gratuită
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

