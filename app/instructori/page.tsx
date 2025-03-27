import Image from "next/image"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Instructori() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Instructori</h1>
          <p className="text-gray-500 dark:text-gray-400">Cunoaște echipa noastră de instructori profesioniști</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Echipa noastră de profesioniști</h2>
            <p>
              Instructorii noștri sunt dansatori profesioniști cu experiență vastă atât în competiții naționale și
              internaționale, cât și în predarea dansului pentru toate nivelurile și vârstele.
            </p>
            <p>
              Pasionați și dedicați, ei sunt mereu pregătiți să împărtășească cunoștințele și dragostea lor pentru dans
              cu toți elevii. Fiecare instructor are propriul stil de predare, adaptat nevoilor și nivelului
              cursanților.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Echipa de instructori"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-8">Instructorii noștri</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <InstructorCard
              name="Alexandru Popescu"
              role="Instructor Dans de Societate"
              bio="Cu o experiență de peste 15 ani în dansul de societate, Alexandru este multiplu campion național și finalist în competiții internaționale. Stilul său de predare este precis și metodic, ajutând cursanții să înțeleagă tehnica corectă."
            />

            <InstructorCard
              name="Maria Ionescu"
              role="Instructor Dans de Societate & Latino"
              bio="Maria a început să danseze de la vârsta de 7 ani și a participat la numeroase competiții naționale și internaționale. Specializată în dansuri standard și latino, ea aduce energie și pasiune în fiecare curs."
            />

            <InstructorCard
              name="Carlos Mendez"
              role="Instructor Salsa & Bachata"
              bio="Originar din Cuba, Carlos a adus autenticitatea dansurilor latino în România. Cu peste 10 ani de experiență în predare, el combină tehnica precisă cu bucuria și energia specifică culturii latino."
            />

            <InstructorCard
              name="Elena Dumitrescu"
              role="Instructor Dans Contemporan & Balet"
              bio="Cu o pregătire în balet clasic și dans contemporan, Elena aduce eleganță și expresivitate în cursurile sale. Ea se concentrează pe dezvoltarea coordonării, flexibilității și expresiei artistice."
            />

            <InstructorCard
              name="Mihai Stanescu"
              role="Instructor Dans Sportiv"
              bio="Fost campion național la dans sportiv, Mihai are o abordare tehnică și precisă în predare. El se concentrează pe detalii și perfecțiune, ajutând cursanții să-și îmbunătățească constant performanțele."
            />

            <InstructorCard
              name="Ana Maria Popa"
              role="Instructor Dans pentru Copii"
              bio="Cu o pregătire în pedagogie și dans, Ana Maria are un talent special în lucrul cu copiii. Ea combină jocul cu tehnica de dans, făcând cursurile distractive și educative în același timp."
            />
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Specializări și certificări</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Certificări internaționale</h3>
              <p className="text-gray-500 text-sm">
                Instructorii noștri dețin certificări de la organizații internaționale de dans precum WDSF, WDC, ISTD și
                altele.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Formare continuă</h3>
              <p className="text-gray-500 text-sm">
                Echipa noastră participă regulat la workshop-uri și seminarii internaționale pentru a fi la curent cu
                cele mai noi tendințe și tehnici.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Experiență competițională</h3>
              <p className="text-gray-500 text-sm">
                Majoritatea instructorilor noștri au participat la competiții naționale și internaționale, unii fiind
                campioni naționali sau finaliști internaționali.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Pedagogie adaptată</h3>
              <p className="text-gray-500 text-sm">
                Instructorii sunt pregătiți să adapteze metodele de predare în funcție de vârsta, nivelul și obiectivele
                cursanților.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold">Vrei să te alături echipei noastre?</h2>
            <p>
              Dacă ești un dansator pasionat cu experiență în predare și dorești să faci parte din echipa noastră,
              trimite-ne CV-ul tău și o scrisoare de intenție.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
            >
              Aplică acum
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function InstructorCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-80 w-full overflow-hidden">
        <Image src="/placeholder.svg?height=600&width=400" alt={name} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-red-600 mb-4">{role}</p>
        <p className="text-gray-500 text-sm mb-4">{bio}</p>
        <div className="flex space-x-3">
          <a href="#" className="text-gray-400 hover:text-gray-600">
            <Facebook size={18} />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600">
            <Instagram size={18} />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600">
            <Youtube size={18} />
            <span className="sr-only">YouTube</span>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

