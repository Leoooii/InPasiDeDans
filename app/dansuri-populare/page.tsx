import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DansuriPopulare() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dansuri Populare</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Descoperă frumusețea și energia dansurilor tradiționale românești din diferite regiuni
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Tradiție și pasiune</h2>
            <p>
              Dansurile populare reprezintă o parte importantă a patrimoniului cultural, transmițând obiceiuri, tradiții
              și povești din generație în generație. Fiecare regiune a României are propriile dansuri tradiționale, cu
              stiluri și ritmuri distincte.
            </p>
            <p>
              La școala noastră, puteți învăța dansuri populare din toate regiunile României, de la hora moldovenească
              și învârtita din Transilvania, până la brâul muntenesc și dansurile din Banat.
            </p>
            <div className="pt-4">
              <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Înscrie-te la curs
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Dansuri populare" fill className="object-cover" />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Dansuri populare din diferite regiuni</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <RegiuneCard nume="Moldova" dansuri={["Hora moldovenească", "Bătuta", "Corăgheasca", "Hangul"]} />
            <RegiuneCard nume="Muntenia" dansuri={["Brâul muntenesc", "Sârba", "Geampara", "Breaza"]} />
            <RegiuneCard nume="Transilvania" dansuri={["Învârtita", "Hațegana", "Fecioreasca", "Jiana"]} />
            <RegiuneCard nume="Banat" dansuri={["Brâul bănățean", "Ardeleana", "De doi", "Hora bănățeană"]} />
            <RegiuneCard nume="Oltenia" dansuri={["Hora oltenească", "Rustemul", "Alunelul", "Ciuleandra"]} />
            <RegiuneCard
              nume="Maramureș"
              dansuri={["Învârtita maramureșeană", "Jocul fecioresc", "Roata", "Bărbătescul"]}
            />
            <RegiuneCard nume="Dobrogea" dansuri={["Cadâneasca", "Geamparalele", "Hora dobrogeană", "Ghiordumul"]} />
            <RegiuneCard
              nume="Internaționale"
              dansuri={["Dansuri grecești", "Dansuri bulgărești", "Dansuri sârbești", "Dansuri ucrainene"]}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

function RegiuneCard({ nume, dansuri }: { nume: string; dansuri: string[] }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-3">{nume}</h3>
        <ul className="space-y-1">
          {dansuri.map((dans, index) => (
            <li key={index} className="text-gray-600 dark:text-gray-300">
              • {dans}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

