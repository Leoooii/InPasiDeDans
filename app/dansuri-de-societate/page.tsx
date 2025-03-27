import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
export default function DansuriDeSocietate() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dansuri de Societate</h1>
          <p className="text-gray-500 dark:text-gray-400">Eleganță, rafinament și grație în mișcare</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/images/samba.png?height=800&width=600" alt="Dans de societate" fill className="object-cover" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Arta dansului de societate</h2>
            <p>
              Dansurile de societate reprezintă o formă elegantă de exprimare artistică și socială, fiind potrivite
              pentru evenimente formale, baluri și petreceri. Aceste dansuri combină tehnica precisă cu expresivitatea
              și conexiunea între parteneri.
            </p>
            <p>
              La școala noastră, veți învăța atât dansuri standard (vals vienez, vals lent, tango, quickstep, quickstep),
              cât și dansuri latino-americane (samba, cha-cha, rumba, paso doble, jive).
            </p>
            <div className="pt-4">
              <Link href="/inscriere">
              <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Înscrie-te la curs
              </Button></Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Dansuri Standard</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image src="/images/vals.png?height=400&width=600" alt="Vals Vienez" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Vals Vienez</h3>
                <p className="text-gray-500">Dansul regal cu rotații elegante și mișcări fluide, pe ritmul de 3/4.</p>
              </CardContent>
            </Card>

            <Card>
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image src="/images/tango.png?height=400&width=600" alt="Tango" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Tango</h3>
                <p className="text-gray-500">
                  Dans pasional și dramatic, caracterizat prin mișcări precise și contraste dinamice.
                </p>
              </CardContent>
            </Card>

            <Card>
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image src="/images/quickstep.png?height=400&width=600" alt="quickstep" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Quickstep</h3>
                <p className="text-gray-500">
                  Dans elegant și fluid, cu pași lungi și glisanți, pe muzică de jazz sau swing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Programul Cursurilor</h2>
          <div className="grid gap-4">
            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dansuri Standard - Începători</h3>
                <p className="text-gray-500">Instructor: Alexandru și Maria Popescu</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Luni și Miercuri, 18:00 - 19:30</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dansuri Standard - Intermediari</h3>
                <p className="text-gray-500">Instructor: Mihai și Elena Ionescu</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Marți și Joi, 19:00 - 20:30</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dansuri Standard - Avansați</h3>
                <p className="text-gray-500">Instructor: Cristian și Ana Dumitrescu</p>
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
              <h2 className="text-2xl font-bold mb-4 dark:text-black">Pregătire pentru evenimente speciale</h2>
              <p className="mb-6 dark:text-black">
                Oferim cursuri personalizate pentru pregătirea dansului de nuntă sau pentru alte evenimente speciale.
                Instructorii noștri vă vor ajuta să creați un moment memorabil, adaptat preferințelor și nivelului
                vostru.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              >
                Solicită o ofertă
              </Button>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Dans de nuntă" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

