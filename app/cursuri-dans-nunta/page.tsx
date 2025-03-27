import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ImageSkeleton from "@/components/image-skeleton"

export default function CursuriDansNunta() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Cursuri Dans pentru Nuntă</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Creează un moment special și memorabil pentru ziua nunții tale
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Dansul mirilor - un moment magic</h2>
            <p>
              Dansul mirilor este unul dintre cele mai emoționante și memorabile momente ale nunții. La școala noastră,
              vă oferim cursuri personalizate pentru a vă ajuta să creați un moment special, adaptat stilului și
              personalității voastre.
            </p>
            <p>
              Indiferent dacă doriți un vals clasic, un dans contemporan sau o coregrafie surprinzătoare și plină de
              personalitate, instructorii noștri vă vor ghida pas cu pas pentru a vă simți încrezători și pregătiți
              pentru marele moment.
            </p>
            <div className="pt-4">
              <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Programează o consultație gratuită
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <ImageSkeleton width={600} height={400} className="w-full h-full" />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Pachetele noastre</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Pachet Basic</h3>
                <div className="text-2xl font-bold mb-4">500 Lei</div>
                <p className="text-gray-500 mb-4">Ideal pentru cuplurile care doresc un dans simplu și elegant.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>5 ședințe private (60 min)</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Coregrafie simplă pe melodia aleasă</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Înregistrare video a coregrafiei finale</span>
                  </li>
                </ul>
                <Button className="w-full">Rezervă acum</Button>
              </CardContent>
            </Card>

            <Card className="border-red-600 shadow-lg">
              <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-2 text-center text-sm font-medium">
                Cel mai popular
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Pachet Premium</h3>
                <div className="text-2xl font-bold mb-4">800 Lei</div>
                <p className="text-gray-500 mb-4">
                  Pentru cuplurile care doresc un dans memorabil cu elemente speciale.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>8 ședințe private (60 min)</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Coregrafie personalizată cu elemente speciale</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Înregistrare video a coregrafiei finale</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Consultanță pentru alegerea melodiei</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>O ședință de repetiție în săptămâna nunții</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Rezervă acum
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Pachet VIP</h3>
                <div className="text-2xl font-bold mb-4">1200 Lei</div>
                <p className="text-gray-500 mb-4">Experiența completă pentru un moment cu adevărat spectaculos.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>10 ședințe private (60 min)</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Coregrafie complexă cu efecte speciale</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Înregistrare video profesională</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Editare personalizată a melodiei</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Două ședințe de repetiție în săptămâna nunții</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Consultanță pentru ținută și accesorii</span>
                  </li>
                </ul>
                <Button className="w-full">Rezervă acum</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">De ce să alegeți cursurile noastre</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Instructori cu experiență</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Instructorii noștri au pregătit sute de cupluri pentru momentul special al nunții.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Coregrafii personalizate</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Creăm coregrafii adaptate nivelului, stilului și personalității fiecărui cuplu.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Săli private</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Toate ședințele se desfășoară în săli private, pentru a vă oferi confortul necesar.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Program flexibil</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Programăm ședințele în funcție de disponibilitatea voastră, inclusiv în weekend.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Atmosferă relaxată</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Creăm o atmosferă prietenoasă și relaxată, pentru a vă ajuta să vă simțiți confortabil.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Rezultate garantate</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Garantăm că veți fi pregătiți pentru momentul special al nunții voastre.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 dark:bg-red-900/20 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Pregătiți și pentru alte dansuri?</h2>
              <p className="mb-6">
                Pe lângă dansul mirilor, vă putem ajuta să pregătiți și alte momente speciale pentru nuntă, cum ar fi
                dansul cu părinții, dansuri de grup sau dansuri surpriză pentru invitați.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              >
                Contactează-ne pentru detalii
              </Button>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <ImageSkeleton width={600} height={400} className="w-full h-full" />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Testimoniale de la mirii noștri</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <ImageSkeleton width={48} height={48} className="w-full h-full" />
                  </div>
                  <div>
                    <h3 className="font-bold">Maria și Andrei</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">August 2024</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "Am fost foarte emoționați la gândul dansului mirilor, dar instructorii ne-au făcut să ne simțim
                  confortabil și încrezători. Momentul a fost magic și toți invitații au fost impresionați!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <ImageSkeleton width={48} height={48} className="w-full h-full" />
                  </div>
                  <div>
                    <h3 className="font-bold">Elena și Mihai</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Iunie 2024</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "Niciunul dintre noi nu avea experiență în dans, dar am reușit să învățăm o coregrafie frumoasă în
                  doar câteva ședințe. Mulțumim pentru răbdare și profesionalism!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <ImageSkeleton width={48} height={48} className="w-full h-full" />
                  </div>
                  <div>
                    <h3 className="font-bold">Alexandru și Diana</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Septembrie 2023</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "Am ales pachetul VIP și a meritat fiecare bănuț! Coregrafia a inclus elemente surpriză care au uimit
                  invitații. A fost unul dintre cele mai frumoase momente ale nunții noastre."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

