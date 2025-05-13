import Image from 'next/image';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Instructori() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Instructori</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Cunoaște echipa noastră de instructori profesioniști
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              Echipa noastră de profesioniști
            </h2>
            <p>
              Instructorii noștri sunt dansatori profesioniști cu experiență
              vastă atât în competiții naționale și internaționale, cât și în
              predarea dansului pentru toate nivelurile și vârstele.
            </p>
            <p>
              Pasionați și dedicați, ei sunt mereu pregătiți să împărtășească
              cunoștințele și dragostea lor pentru dans cu toți elevii. Fiecare
              instructor are propriul stil de predare, adaptat nevoilor și
              nivelului cursanților.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-8">Instructorii noștri</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <InstructorCard
              name="Alexandra Dumitrache"
              role="Instructor dansuri latino, de societate și dansuri populare"
              src="/images/Alexandra2.png"
              bio="Alexandra Dumitrache este fondator, manager și instructor la În Pași de Dans, înfiintata în 2009. Decizia înfiintarii acestei școli a venit ca urmare a pasiunii pentru dans și din dorința de a împărtăși cu cât mai multe persoane bucuria oferită de dans.

Alexandra are experiența ca instructor de dans peste 24 de ani; a participat la numeroase competiții de dans sportiv naționale și internaționale.

Principalele sale responsabilitati la În Pași de Dans sunt prederea dansurilor latino și de societate și dansurilor populare (atât la grupele de copii, cât și la cele de adulți), organizarea și coordonarea cursurilor de dans, evenimentelor și activităților din cadrul școlii de dans."
              facebook={'https://www.facebook.com/share/1EJUcGJrue/'}
              insta={
                'https://www.instagram.com/dumitrache420?igsh=MXQ4a29lazcyaWExOQ=='
              }
            />

            <InstructorCard
              name="Cătălina Gurău"
              role="Instructor dansuri populare și lectii private pentru miri"
              src="/images/Catalina.jpg"
              bio="Cătălina Gurău colaborează cu În Pași de Dans din 2018, în calitate de instructor-coregraf pentru grupele de dansuri populare adulti, lectii private pentru viitori miri, precum și workshop-uri.

Cătălina este un izvor de energie și bucurie, atât fizic cât și emoțional. Este o persoană plină de voie bună și își aduce aminte mereu de importanța zâmbetului. Pasiunea pentru dans a descoperit-o la În Pași de Dans, iar de atunci, dansul a devenit un stil de viață pentru ea.

Plină de inspirație, bucurie și empatie este mereu atentă la nevoile celor din jur și mereu dispusă să ofere ajutorul. Adesea energia ei este molipsitoare, iar în preajma ei oamenii se simt susținuți și înțeleși."
              facebook="https://www.facebook.com/share/1DqfPJZbHo/"
              insta="https://www.instagram.com/kate.gmc?igsh=MTIwZjg4djJ4bDY5Nw=="
            />

            <InstructorCard
              name="Miriam Haghighi"
              role="Instructor dansuri latino, de societate și lecții private pentru miri"
              src="/images/Miriam.png"
              bio="Miriam Haghighi colaborează cu În Pași de Dans din 2022, în calitate de instructor al grupelor de adulți, unde predă dansuri latino și de societate. Cu o experiență de peste 13 ani în dansul sportiv de performanță, Miriam a participat la numeroase competiții naționale și internaționale. Pasiunea ei pentru dans reprezintă motivația care o inspiră să împărtășească bucuria, eleganța și secretele dansului cu cât mai mulți oameni."
              facebook="https://www.facebook.com/share/15EwNXUo1W/"
              insta="https://www.instagram.com/miriam.haghi?igsh=Z2Q4OWI4NGx1cmZt"
            />

            <InstructorCard
              name="Daniela Cristea"
              role="Instructor - coregraf pentru lecții private"
              src="/images/Daniela.png"
              bio="Daniela Cristea colaborează cu În Pași de Dans din 2023, unde predă dansuri latino și de societate pentru grupele de adulți și lectii private pentru miri.

Are o experiență în dansul sportiv de 9 ani, ca dansator și de peste 5 ani, ca instructor. A participat la numeroase competiții, evenimente și proiecte naționale și internaționale de dans, care i-au modelat personalitatea și stilul de viata, dansul ocupând un loc important în viața Danielei."
              facebook="https://www.facebook.com/share/1HMnUsj81X/"
              insta="https://www.facebook.com/share/1HMnUsj81X/"
            />

            <InstructorCard
              name="Nicholas Ciurea"
              role="Instructor salsa, bachata și kizomba"
              src="/images/Niko.png"
              bio="Nicholas are o experiență solidă de 11 ani în dansul sportiv și predă cu pasiune de peste 16 ani. Este vicecampion național la bachata și se remarcă prin stilul său tehnic, carisma pe ringul de dans și abilitatea de a transmite clar și eficient cunoștințele cursanților săi. Din 2023, colaborează cu În Pași de Dans, unde predă salsa și bachata și contribuie activ la dezvoltarea comunității de dansatori și la organizarea evenimentelor tematice."
              facebook="https://www.facebook.com/niko.nicholas.5"
              insta="https://www.instagram.com/niko.nicholas.5?igsh=MWs0eDBveGFmeHpjcQ=="
            />

            <InstructorCard
              name="Luiza Bulmaga"
              role="Instructor - coregraf lecții private pentru miri"
              src="/images/Luiza.png"
              bio="Luiza Bulmaga este instructor la În Pași de Dans din 2023, unde predă, în mod special, lecții private pentru miri.

Luiza a început să danseze la vârsta de 9 ani, iar de-a lungul timpului dansul a devenit un stil de viata pentru ea; în paralel practica și karate de performanță.

Pasionată de dans, energică, Luiza este o instructoare înțelegătoare, creativă, iar experiența vastă din viata sportivă și simtul pedagogic o fac să înțeleagă cu ușurință nevoile fiecărui elev al ei, reușind astfel să pună în valoare, prin dans, calitățile cursanților ei."
              facebook="https://www.facebook.com/luiza.papusica"
              insta="https://www.instagram.com/luiza_bulmaga?igsh=MWQ1aTVpbGtreTMxYw=="
            />
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Specializări</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Formare continuă</h3>
              <p className="text-gray-500 text-sm">
                Echipa noastră participă regulat la workshop-uri și seminarii
                nationale și internaționale, pentru a fi la curent cu cele mai
                noi tendințe și tehnici.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Experiență competițională</h3>
              <p className="text-gray-500 text-sm">
                Majoritatea instructorilor noștri au participat la competiții
                naționale și internaționale, unii fiind campioni naționali sau
                finaliști internaționali.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Pedagogie adaptată</h3>
              <p className="text-gray-500 text-sm">
                Instructorii sunt pregătiți să adapteze metodele de predare în
                funcție de vârsta, nivelul și obiectivele cursanților.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstructorCard({
  name,
  role,
  bio,
  src,
  insta,
  facebook,
}: {
  name: string;
  role: string;
  bio: string;
  src: string;
  insta?: string;
  facebook?: string;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-[32rem] w-full overflow-hidden">
        {/* <Image
          src="/placeholder.svg?height=600&width=400"
          alt={name}
          fill
          className="object-cover"
        /> */}
        <Image
          src={`${src}?height=800&width=400`}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-red-600 mb-4">{role}</p>
        <p className="text-gray-500 text-sm mb-4">{bio}</p>
        <div className="flex space-x-3">
          <a href={facebook} className="text-gray-400 hover:text-gray-600">
            <Facebook size={18} />
            <span className="sr-only">Facebook</span>
          </a>
          <a href={insta} className="text-gray-400 hover:text-gray-600">
            <Instagram size={18} />
            <span className="sr-only">Instagram</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
