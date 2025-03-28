import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ImageSkeleton from "@/components/image-skeleton"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"

// Tipul pentru o grupă în formare
type Grupa = {
  id: string
  titlu: string
  descriere: string
  dataStart: string
  program: string
  instructor: string
  locuriDisponibile: number
  locuriTotale: number
}

// Funcție pentru a obține grupele din Firebase
async function getGrupe(): Promise<Grupa[]> {
  try {
    // Obține toate grupele, ordonate după data de start
    const grupeQuery = query(collection(db, "grupe"), orderBy("dataStart"))
    const querySnapshot = await getDocs(grupeQuery)

    const grupe: Grupa[] = []
    querySnapshot.forEach((doc) => {
      grupe.push({ id: doc.id, ...doc.data() } as Grupa)
    })

    return grupe
  } catch (error) {
    console.error("Eroare la obținerea grupelor:", error)
    return []
  }
}

// Formatează data pentru afișare
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default async function GrupeInFormare() {
  // Obține grupele din Firebase
  const grupe = await getGrupe()

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
          <ImageSkeleton width={1200} height={300} className="w-full h-full" />
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
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Grupe noi în formare</h2>

          {grupe.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">
                Momentan nu există grupe noi în formare. Te rugăm să revii în curând sau să ne contactezi pentru
                informații.
              </p>
              <Link href="/contact" className="mt-4 inline-block">
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Contactează-ne
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {grupe.map((grupa) => (
                <Card key={grupa.id}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{grupa.titlu}</h3>
                    <p className="text-gray-500 mb-4">{grupa.descriere}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Start:</span>
                        <span>{formatDate(grupa.dataStart)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Program:</span>
                        <span>{grupa.program}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Instructor:</span>
                        <span>{grupa.instructor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Locuri disponibile:</span>
                        <span>
                          {grupa.locuriDisponibile} din {grupa.locuriTotale}
                        </span>
                      </div>
                    </div>
                    <Link href="/inscriere">
                      <Button className="w-full mt-6 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                        Rezervă un loc
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Beneficii pentru noii cursanți</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Prima lecție gratuită</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Participă la prima lecție fără nicio obligație, pentru a vedea dacă ți se potrivește.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Reducere 15% pentru noii membri</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Beneficiază de 15% reducere la abonamentul lunar dacă te înscrii la o grupă nouă.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Abonament de cuplu</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Vino cu partenerul/a și beneficiați de un preț special pentru abonamentul de cuplu.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Acces la petreceri tematice</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Ca membru, ai acces gratuit la petrecerile tematice organizate lunar.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 dark:bg-red-900/10 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Nu găsești grupa potrivită?</h2>
              <p className="mb-6">
                Dacă nu găsești o grupă care să se potrivească programului tău sau ești interesat de un stil de dans
                care nu este listat, contactează-ne și vom încerca să formăm o grupă nouă care să răspundă nevoilor
                tale.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                >
                  Contactează-ne
                </Button>
              </Link>
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

