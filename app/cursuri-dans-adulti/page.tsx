import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CursuriDansAdulti() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Cursuri Dans Adulți</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Descoperă pasiunea pentru dans într-un mediu prietenos și profesionist
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Dans de societate"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Dans de Societate</h3>
              <p className="text-gray-500 mb-4">
                Învață dansuri elegante precum vals, tango și foxtrot, perfecte pentru evenimente formale.
              </p>
              <Link href="/dansuri-de-societate">
                <Button>Află mai multe</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
              <Image src="/placeholder.svg?height=400&width=600" alt="Dans latino" fill className="object-cover" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Dans Latino</h3>
              <p className="text-gray-500 mb-4">Descoperă ritmurile pasionale de salsa, bachata, cha-cha și rumba.</p>
              <Link href="/dansuri-latino">
                <Button>Află mai multe</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Dans pentru nuntă"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Dans pentru Nuntă</h3>
              <p className="text-gray-500 mb-4">
                Pregătește un moment special pentru ziua nunții tale cu coreografii personalizate.
              </p>
              <Link href="/cursuri-dans-nunta">
                <Button>Află mai multe</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Programul Cursurilor pentru Adulți</h2>
          <div className="grid gap-4">
            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dans de Societate - Începători</h3>
                <p className="text-gray-500">Instructor: Maria Popescu</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Luni și Miercuri, 18:00 - 19:30</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dans Latino - Începători</h3>
                <p className="text-gray-500">Instructor: Andrei Ionescu</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Marți și Joi, 19:00 - 20:30</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dans de Societate - Avansați</h3>
                <p className="text-gray-500">Instructor: Elena Dumitrescu</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Luni și Miercuri, 20:00 - 21:30</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dans Latino - Avansați</h3>
                <p className="text-gray-500">Instructor: Mihai Stanescu</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Vineri, 18:00 - 20:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 dark:text-black">Înscrie-te la un curs</h2>
              <p className="mb-6 dark:text-black">
                Fie că ești începător sau ai mai dansat înainte, avem cursuri potrivite pentru toate nivelurile. Vino să
                descoperi bucuria dansului într-o atmosferă prietenoasă și relaxantă.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              >
                Înscrie-te acum
              </Button>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Cursuri de dans" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

