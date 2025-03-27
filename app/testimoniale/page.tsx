import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Testimoniale() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Testimoniale</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Ce spun cursanții noștri despre experiența lor la școala noastră de dans
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Experiențe autentice</h2>
            <p>
              La "In pasi de Dans", ne mândrim cu feedback-ul pozitiv primit de la cursanții noștri. Suntem
              recunoscători pentru încrederea pe care ne-o acordă și pentru că aleg să împărtășească experiențele lor cu
              noi.
            </p>
            <p>
              Aceste testimoniale reflectă angajamentul nostru de a oferi cursuri de dans de calitate, într-o atmosferă
              prietenoasă și profesionistă, adaptate nevoilor și nivelului fiecărui cursant.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=800&width=600" alt="Cursanți fericiți" fill className="object-cover" />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Ce spun cursanții noștri</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              name="Maria și Andrei"
              course="Curs pentru nuntă"
              rating={5}
              image="/placeholder.svg?height=200&width=200"
              testimonial="Am învățat dansul pentru nunta noastră și a fost o experiență minunată! Instructorii sunt profesioniști și foarte răbdători. Ne-au ajutat să creăm un moment special pentru ziua cea mare, adaptat perfect stilului nostru. Recomandăm cu încredere!"
            />

            <TestimonialCard
              name="Elena D."
              course="Salsa - Intermediari"
              rating={5}
              image="/placeholder.svg?height=200&width=200"
              testimonial="Cursurile de salsa mi-au schimbat viața! Am început acum un an ca începătoare și acum dansez cu încredere. Instructorul Carlos este fantastic - energic, pasionat și foarte bun pedagog. Am cunoscut oameni minunați și am descoperit o nouă pasiune."
            />

            <TestimonialCard
              name="Cristina, mamă a unui cursant"
              course="Dans pentru copii (7-10 ani)"
              rating={5}
              image="/placeholder.svg?height=200&width=200"
              testimonial="Fiica mea de 8 ani adoră cursurile de dans! Ana Maria știe perfect cum să lucreze cu copiii - este blândă, răbdătoare și foarte motivantă. Am observat o îmbunătățire semnificativă în coordonarea și încrederea în sine a fiicei mele."
            />

            <TestimonialCard
              name="Mihai și Laura"
              course="Dans de societate - Începători"
              rating={4}
              image="/placeholder.svg?height=200&width=200"
              testimonial="Ne-am înscris la cursuri pentru a învăța să dansăm la evenimente sociale și suntem foarte mulțumiți de alegerea făcută. Alexandru și Maria sunt instructori excelenți, care explică foarte clar și au răbdare cu începătorii. Atmosfera la cursuri este relaxată și prietenoasă."
            />

            <TestimonialCard
              name="George P."
              course="Bachata - Începători"
              rating={5}
              image="/placeholder.svg?height=200&width=200"
              testimonial="Am început cursurile de bachata fără nicio experiență anterioară în dans și a fost cea mai bună decizie! Elena și Andrei sunt instructori fantastici, care te fac să te simți confortabil și încrezător. Acum, după 6 luni, pot spune că dansul a devenit o parte importantă din viața mea."
            />

            <TestimonialCard
              name="Ana și Radu"
              course="Excursie în Cuba"
              rating={5}
              image="/placeholder.svg?height=200&width=200"
              testimonial="Am participat la excursia în Cuba organizată de școală și a fost o experiență de neuitat! Am învățat salsa autentică cubaneză, am cunoscut dansatori locali și am explorat această țară minunată. Organizarea a fost impecabilă și grupul super fain. Abia așteptăm următoarea excursie!"
            />

            <TestimonialCard
              name="Ioana M."
              course="Dans contemporan"
              rating={4}
              image="/placeholder.svg?height=200&width=200"
              testimonial="Cursurile de dans contemporan cu Elena sunt o adevărată terapie pentru mine după o zi de muncă. Îmi place foarte mult abordarea ei artistică și modul în care ne încurajează să ne exprimăm prin mișcare. Recomand cu căldură tuturor celor care caută o formă de expresie artistică."
            />

            <TestimonialCard
              name="Familia Popescu"
              course="Dansuri populare"
              rating={5}
              image="/placeholder.svg?height=200&width=200"
              testimonial="Ne-am înscris toată familia la cursurile de dansuri populare și a fost o decizie excelentă! Ion este un instructor pasionat, care ne-a transmis dragostea pentru tradițiile românești. Copiii noștri au învățat nu doar pași de dans, ci și despre cultura și tradițiile noastre."
            />

            <TestimonialCard
              name="Claudia și Bogdan"
              course="Tango argentinian"
              rating={5}
              image="/placeholder.svg?height=200&width=200"
              testimonial="Tangoul a devenit pasiunea noastră comună datorită cursurilor de la 'In pasi de Dans'. Instructorii sunt profesioniști cu experiență internațională, care ne-au ghidat pas cu pas în această călătorie fascinantă. Acum participăm regulat la milonga și ne bucurăm de fiecare moment."
            />
          </div>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold">Împărtășește experiența ta</h2>
            <p>
              Ești cursant la școala noastră de dans? Ne-ar plăcea să auzim despre experiența ta! Feedback-ul tău ne
              ajută să ne îmbunătățim constant și să oferim cele mai bune cursuri.
            </p>
            <div className="pt-2">
              <button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-6 py-2 rounded-md font-medium">
                Lasă un testimonial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TestimonialCard({
  name,
  course,
  rating,
  image,
  testimonial,
}: { name: string; course: string; rating: number; image: string; testimonial: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-gray-500">{course}</p>
          </div>
        </div>
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          ))}
        </div>
        <p className="text-gray-600 italic">"{testimonial}"</p>
      </CardContent>
    </Card>
  )
}

