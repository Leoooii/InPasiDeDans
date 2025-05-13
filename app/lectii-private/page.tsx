import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageSkeleton from '@/components/image-skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { UserCircleIcon, UserX2Icon } from 'lucide-react';

export default function LectiiPrivate() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Cursuri private de dans
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Oferim lecții private atât pentru miri, cât și pentru persoane mai
            timide sau pentru cei care vor să aprofundeze doar anumite stiluri
            de dans.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              Dansul mirilor - un moment magic
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Creează un moment special și memorabil pentru ziua nunții tale!
            </p>
            <p>
              Dansul mirilor este unul dintre cele mai emoționante și memorabile
              momente ale nunții. La școala noastră, vă oferim cursuri private
              pentru a vă ajuta să creați un moment special, adaptat stilului și
              personalității voastre.
            </p>
            <p>
              Indiferent dacă doriți un vals clasic, un tango,un dans latino sau
              o coregrafie surprinzătoare și plină de personalitate,
              instructorii noștri vă vor ghida pas cu pas pentru a vă simți
              încrezători și pregătiți pentru marele moment.
            </p>
            <div className="pt-4">
              <div className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 p-2 text-white text-center text-sm font-medium rounded-lg">
                Ne poți contacta pe mail ( inpasidedans@gmail.com ) sau pe
                whatsapp ( 0722675126 ) pentru o consiliere.
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/nunta.png?height=800&width=600"
              alt="Dans de societate"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Pachetele noastre</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-red-600 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Pachet 4 ședințe</h3>
                <div className="text-2xl font-bold mb-4">640 Lei</div>
                <p className="text-gray-500 mb-4">
                  Ideal pentru cuplurile care doresc un dans simplu și elegant.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>4 ședințe private (60 min/sed)</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Înregistrare video a coregrafiei </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Editare personalizată a melodiei</span>
                  </li>
                  <li className="flex items-start">
                    <div>
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>
                      Pachetul poate fi prelungit cu oricate ședințe la
                      pretul/sedinta din pachetul ales initial{' '}
                    </span>
                  </li>
                </ul>
                {/* <Button className="w-full">Rezervă acum</Button> */}
              </CardContent>
            </Card>

            <Card className="border-red-600 shadow-lg">
              <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-2 text-center text-sm font-medium">
                Cel mai popular
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Pachet 6 ședințe</h3>
                <div className="text-2xl font-bold mb-4">900 Lei</div>
                <p className="text-gray-500 mb-4">
                  Pentru cuplurile care doresc un dans memorabil cu elemente
                  speciale.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>6 ședințe private (60 min/sed)</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      Coregrafie cu grad de dificultate mediu pe melodia aleasa
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Înregistrare video a coregrafiei</span>
                  </li>

                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Editare personalizată a melodiei</span>
                  </li>
                  <li className="flex items-start">
                    <div>
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>
                      Pachetul poate fi prelungit cu oricate ședințe la
                      pretul/sedinta din pachetul ales initial{' '}
                    </span>
                  </li>
                </ul>
                {/* <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Rezervă acum
                </Button> */}
              </CardContent>
            </Card>

            <Card className="border-red-600 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Pachet 8 ședințe</h3>
                <div className="text-2xl font-bold mb-4">1120 Lei</div>
                <p className="text-gray-500 mb-4">
                  Experiența completă pentru un moment cu adevărat spectaculos.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>8 ședințe private (60 min/sed)</span>
                  </li>
                  <li className="flex items-start">
                    <div>
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>
                      Coregrafie personalizată cu grad de dificultate mediu sau
                      ridicat, tinand cont de abilitatile voastre
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Înregistrare video a coregrafiei</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Editare personalizată a melodiei</span>
                  </li>

                  <li className="flex items-start">
                    <div>
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>
                      Pachetul poate fi prelungit cu oricate ședințe la
                      pretul/sedinta din pachetul ales initial{' '}
                    </span>
                  </li>
                </ul>
                {/* <Button className="w-full">Rezervă acum</Button> */}
              </CardContent>
            </Card>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6">Alte opțiuni:</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 mb-10">
          <Card className="flex flex-col border-red-600 shadow-lg bg-gradient-to-r from-blue-600 to-orange-500">
            <CardHeader className=" text-white rounded-t-lg">
              <CardTitle>Plata la sedinta</CardTitle>

              <div className="mt-4 text-4xl font-bold">180 Lei</div>
            </CardHeader>
          </Card>
          <Card className="flex flex-col border-red-600 shadow-lg bg-gradient-to-r from-blue-600 to-orange-500">
            <CardHeader className=" text-white rounded-t-lg">
              <CardTitle>Sedinta la restaurant (in Bucuresti)</CardTitle>

              <div className="mt-4 text-4xl font-bold">200 Lei</div>
            </CardHeader>
          </Card>
        </div>
        <div>
          <p className=" mb-6">
            Daca doriti sa efectuati plata la fiecare sedinta, pretul pentru o
            lectie particulara de dans este 180 lei.
          </p>
          <p className=" mb-6">
            In cazul in care optati pentru unul din pachete, plata orelor
            particulare de dans se va face integral la prima sedinta.
          </p>
          <p className=" mb-6">
            Anularea și reprogramarea unei ședințe se va face cu cel putin 24 de
            ore inainte, telefonic. In caz contrar, sedinta se conșidera
            efectuata.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">
            De ce să alegeți cursurile noastre
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Instructori cu experiență</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Instructorii noștri au pregătit mii de cupluri pentru momentul
                special al nunții.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Coregrafii personalizate</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Creăm coregrafii adaptate nivelului, stilului, personalității și
                aptitudinilor fiecărui cuplu.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Săli private</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Toate ședințele se desfășoară în săli private, pentru a vă oferi
                confortul necesar. Veti fi doar voi și instructorul in sala
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Program flexibil</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Programăm ședințele în funcție de disponibilitatea voastră și de
                agenda noastra, inclusiv în weekend.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Atmosferă relaxată</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Creăm o atmosferă prietenoasă și relaxată, pentru a vă ajuta să
                vă simțiți confortabil.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 dark:bg-red-900/20 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Pregătiți și pentru alte dansuri?
              </h2>
              <p className="mb-6">
                Pe lângă dansul mirilor, vă putem ajuta să pregătiți și alte
                momente speciale pentru nuntă, cum ar fi dansul cu părinții sau
                nașii, dansuri de grup sau dansuri surpriză pentru invitați.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                >
                  Contactează-ne pentru detalii
                </Button>
              </Link>
            </div>
            <div className="relative h-72 rounded-lg overflow-hidden">
              <Image
                src="/images/nunta2.png?height=800&width=600"
                alt="Dans de societate"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Testimoniale de la mirii noștri
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <UserCircleIcon className="w-12 h-12 text-orange-600 " />
                  </div>
                  <div>
                    <h3 className="font-bold">Alexandra Popescu</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      August 2024
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  Multumim, Luiza pentru tot ce ne ai învățat și abordarea cu
                  răbdare pe care ai aplicat o mereu! 😇 Pentru dansul mirilor
                  ai realizat cea mai frumoasa coregrafie și totul a ieșit
                  minunat! Un dar de nunta prețios care rămâne în inimile
                  noastre pentru totdeauna! 🥰 Recomand sa lucrați cu Luiza
                  deoarece este o persoana sociabila, vesela, adaptabila și
                  foarte inteligenta, care are capacitatea de a găsi cel puțin o
                  soluție la orice impediment. ❤️
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <UserCircleIcon className="w-12 h-12 text-orange-600 " />
                  </div>
                  <div>
                    <h3 className="font-bold">Roxana</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Iulie 2023
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  De scoala In Pași de Dans am auzit de la o fată care a avut și
                  ea, la rândul ei o experiența foarte faină cu oamenii de aici.
                  Pentru că m-am trezit la o petrecere, unde se cânta muzică
                  populară și se dansa până nu se mai putea, iar eu stăteam pe
                  scaun 🥴 am început cu dansurile populare, cu Cătălina ca
                  instructor. Ne-a plăcut atât de mult, încât dacă pierdeam
                  puțin, nu știam cum sa recuperăm mai repede. Atunci când a
                  trebuit să ne gândim serios la nuntă și la faptul că ne dorim
                  un dans al mirilor, nu ne-a venit decât Cătălina în minte… și
                  a fost cea mai bună decizie! E omul cu care poți să râzi
                  oricât și din orice și e cel mai bun instructor posibil, mai
                  ales când vine vorba de o coregrafie pentru dansul mirilor,
                  pune suflet și ajunge la un rezultat care este muult peste ce
                  vă imaginați inițial! O recomandăm cu drag și îi mulțumim că
                  ne-a scăpat de doua picioare stângi!🥰🤗♥️
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <UserCircleIcon className="w-12 h-12 text-orange-600 " />
                  </div>
                  <div>
                    <h3 className="font-bold">Iuliana Francusi</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Septembrie 2023
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  Recomand cu drag Luiza! Din prima secundă în care am pășit în
                  sală am avut o senzație de confort și impresia ca ne cunoaștem
                  de ani, iar asta ne-a ajutat să ne detașam și să venim cu drag
                  la fiecare ședință✨🌸! Un om minunat cu o energie aparte!
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <UserCircleIcon className="w-12 h-12 text-orange-600 " />
                  </div>
                  <div>
                    <h3 className="font-bold">Cristina Taras</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      August 2022
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  Am avut un dans divin, datorită ție, cea mai talentată și
                  răbdătoare profesoară de dans din lume, care ne-a ajutat să
                  învățăm în doar câteva ședințe un dans apreciat de toți
                  invitații! Recomand pentru profesionalism, căldură, prietenie,
                  răbdare și dedicare, un om deosebit! Multumim, Alexandra
                  pentru răbdarea acordată pregătirii coregrafiei celui mai
                  important dans din viața noastră!❤️💃🕺
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <UserCircleIcon className="w-12 h-12 text-orange-600 " />
                  </div>
                  <div>
                    <h3 className="font-bold">Andra</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Septembrie 2024
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  Am colaborat, pentru dansul mirilor, cu Daniela și am fost
                  foarte mulțumiți! A ieșit foarte bine și ne-a plăcut mult și
                  coregrafia! Ședințele erau relaxante și veneam mereu cu
                  plăcere. Deși a trecut nunta și acum ne place să facem
                  coregrafia acasă. Recomand!
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <UserCircleIcon className="w-12 h-12 text-orange-600 " />
                  </div>
                  <div>
                    <h3 className="font-bold">Inga și Mădălin</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ianuarie 2019
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  Sunteți minunați, pe lângă eliminarea stresului, buna
                  dispoziție, ținută corectă, stima de sine crescută și o echipă
                  plină de voie bună, aș putea să mai adaug că ne ajutați cu
                  fiecare ședință să devenim mai buni, să iubim frumosul și să
                  ne simțim bine în corpul nostru. Vă îmbrățișăm cu drag și ne
                  bucurăm că am avut ocazia să vă cunoaștem!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
