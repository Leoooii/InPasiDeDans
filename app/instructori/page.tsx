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
              name="Alexandra Dumitrache"
              role="Instructor Dans de Societate,Latino si Populare"
              src="/images/Alexandra.png"
              bio="Alexandra Dumitrache este fondator, manager si instructor la In Pasi de Dans, infiintata in 2009. Decizia infiintarii acesteia a venit ca urmare a pasiunii pentru dans si din dorinta de a impartasi cu cat mai multe persoane bucuria oferita de dans.

Alexandra are experienta ca instructor de dans peste 22 de ani; a participat la numeroase competitii de dans sportiv nationale si internationale.

Principalele sale responsabilitati la In Pasi de Dans sunt prederea dansurilor latino si de societate si dansurilor populare (atat la grupele de copii, cat si la cele de adulti), organizarea si coordonarea cursurilor de dans, evenimentelor si activitatilor din cadrul scolii de dans."

            />

            <InstructorCard
              name="Catalina Gurau"
              role="Instructor de Dansuri Populare"
              src="/images/Catalina.png"
              bio="Catalina Gurau colaborează cu In Pasi de Dans din 2018 in calitate de instructor-coregraf pentru grupele de dansuri populare adulti, lectii private pentru viitori miri, precum si workshop-uri.

Catalina este un izvor de energie si bucurie atat fizic cat si emosional. Este o persoana plina de voie buna si îti aduce aminte mereu de importanta zambetului. Pasiunea pentru dans a descoperit-o la In Pasi de Dans, iar de atunci, dansul a devenit un stil de viata pentru ea.

Plina de inspiratie, bucurie si empatie, ea este mereu atenta la nevoile celor din jur si mereu dispusa sa ofere ajutorul. Adesea energia ei este molipsitoare, iar în preajma ei oamenii se simt sustinuti si intelesi."
              
            />

            <InstructorCard
              name="Miriam Haghighi"
              role="Instructor Dans de Societate si Latino"
              src="/images/Miriam.png"
              bio="Miriam Haghighi colaboreaza cu Asociatia Sportiva In Pasi de Dans Bucuresti din 2022, in calitate de instructor pentru grupele de adulti si copii, predand dansuri latino si de societate.

Are o experienta in dansul sportiv de performanta de peste 13 ani. A concurat la numeroase competitii de dans sportiv, atat nationale, cat si internationale. Pasiunea pentru dans este principala motivatie care o indeamna sa impartasesca cu cat mai multi secretele, magia si bucuria dansului."
            />

            <InstructorCard
              name="Daniela Cristea"
              role="Instructor Dans Contemporan & Balet"
              src="/images/Daniela.png"
              bio="Daniela Cristea colaboreaza cu In Pasi de Dans din 2023, unde preda dansuri latino si de societate pentru grupele de adulti si lectii private pentru miri.

Are o experienta in dansul sportiv de 9 ani, ca dansator si de peste 4 ani, ca instructor. A participat la numeroase competitii, evenimente si proiecte nationale si internationale de dans, care i-au modelat personalitatea si stilul de viata, dansul ocupand un loc important in viata Danielei."
            />

            <InstructorCard
              name="Niko Nikolas"
              role="Instructor Dans Latino"
              src="/images/Niko.png"
              bio="Fost campion național la dans sportiv, Niko are o abordare tehnică și precisă în predare. El se concentrează pe detalii și perfecțiune, ajutând cursanții să-și îmbunătățească constant performanțele."
            />

            <InstructorCard
              name="Luiza Bulmaga"
              role="Instructor Dans pentru Copii"
              src="/images/Luiza.png"
              bio="Luiza Bulmaga este instructor la In Pasi de Dans din 2023, unde preda, in mod special, lectii private pentru miri.

Luiza a inceput sa danseze la varsta de 9 ani, iar de-a lungul timpului dansul a devenit un stil de viata pentru ea; in paralel parctica si karate de performanta.

Pasionata de dans, energica, Luiza este o instructoare intelegatoare, creativa, iar experienta vasta din viata sportiva si simtul pedagogic o fac sa inteleaga cu usurinta nevoile fiecarui elev al ei, reusind astfel sa puna in valoare, prin dans, calitatile cursantilor ei."
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

function InstructorCard({ name, role, bio, src }: { name: string; role: string; bio: string, src:string }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-80 w-full overflow-hidden">
        <Image src="/placeholder.svg?height=600&width=400" alt={name} fill className="object-cover" />
        <Image src={`${src}?height=600&width=400`} alt={name} fill className="object-contain" />
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

