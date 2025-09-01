import Link from 'next/link';
import { Clock, MapPin, Phone, Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Head from './head';
import GrupeInFormare from '@/components/grupe-in-formare';

export default function DespreNoi() {
  return (
    <div className="container py-12">
      <Head />
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Cine suntem?</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Învățăm Bucureștiul să danseze din 1 iulie 2009!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            
            <p>
              Povestea noastră a început în urmă cu 16 ani, din pasiune pentru
              dans și din dorința sinceră de a împărtăși frumusețea și emoția pe
              care dansul le poate oferi.
            </p>
            <p>
              Suntem o echipă ambițioasă și unită, formată din 6 instructori
              pasionați, uniți de dragostea pentru dans și dorința de a inspira.
              Credem cu tărie că dansul este pentru toți, indiferent de vârstă
              sau nivel, iar misiunea noastră este sa ne asigurăm că fiecare
              cursant poate să se exprime liber și să descopere bucuria
              dansului, să fie motivat și susținut să evolueze.
            </p>

            <p>
              Astăzi, suntem mai mult decât o școală de dans. Suntem o
              comunitate frumoasă și unită, un loc unde fiecare pas contrează,
              unde poți să faci mișcare într-un mod plăcut, să te relaxezi după
              o zi de muncă, să socializezi și să înveți să dansezi.
            </p>
            <div className="pt-4">
              <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Înscrie-te la un curs
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden flex items-center">
            {/* <ImageSkeleton width={600} height={400} className="w-full h-full" /> */}
            <Image
              src="/images/noi.png"
              height="1000"
              width="1000"
              alt="group-picture"
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Activitățile noastre</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ActivityCard
              title="Cursuri de dans pentru adulți"
              description="Dansuri latino, de societate și dansuri populare românești și internaționale"
              link="/cursuri-dans-adulti"
            />
            <ActivityCard
              title="Cursuri de dans pentru copii"
              description="Dans sportiv (dansuri latino si dansuri standard) ocazional dansuri populare"
              link="/cursuri-dans-copii"
            />
            <ActivityCard
              title="Workshop-uri"
              description="Sesiuni intensive pentru aprofundarea anumitor stiluri de dans"
              link="/grupe-in-formare"
            />
            <ActivityCard
              title="Lecții private"
              description="Coregrafii personalizate pe melodia aleasă de voi - vals vienez, tango, dansuri latino sau alte stiluri"
              link="/lectii-private"
            />
            <ActivityCard
              title="Cursuri particulare"
              description="Pentru cei mai timizi, pentru cei care vor să aprofundeze doar anumite dansuri sau pentru cei care nu pot ajunge la cursurile de grup"
              link="/contact"
            />
            <ActivityCard
              title="Perechi de dansatori profesioniști"
              description="Pentru show-uri la evenimente deosebite (nunți, botezuri, aniversări, petreceri private)"
              link="/contact"
            />
            <ActivityCard
              title="Petreceri tematice"
              description="Ocazii de socializare și practicare a dansurilor învățate"
              link="/petreceri"
            />
            <ActivityCard
              title="Excursii"
              description="În România și străinătate, cu tematică de dans"
              link="/excursii"
            />
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Facilitățile noastre</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                    <Check className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Săli de dans spațioase</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Dotate cu aer condiționat, oglinzi și vestiare
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                    <Check className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Grupe optimizate</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Formate din 10 – maximum 20 persoane
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                    <Check className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">
                      Instructori profesioniști
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Cu pregătire, experiență, răbdători și pasionați de dans
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 bg-red-50 dark:bg-red-900/10 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Cui ne adresăm</h2>
              <p className="mb-4">
                Cursurile de dans organizate de În Pași de Dans se adresează în
                general adulților. Vârsta minimă este 15 ani, dar vârsta maximă
                nu o impunem, întrucât am avut și avem cursanți cu vârste
                cuprinse între 15 și 70 de ani.
              </p>
              <p>
                Organizăm însă lecții de dans și pentru copii cu vârste cuprinse
                între 7 și 14 ani.
              </p>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              {/* <ImageSkeleton width={600} height={400} className="w-full h-full" /> */}
              <Image
                src="/images/secret-santa.png?height=800&width=600"
                height="1000"
                width="1000"
                alt="group-picture"
              />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Locație și program</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-bold">Locație</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Calea Rahovei nr. 262, sector 5, București
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      <span className="font-medium">Puncte de reper:</span>{' '}
                      Liberty Mall, Electromagnetica, intersecția Trafic Greu,
                      McDonald's Progresul – la patru stații de tramvai (32) de
                      Unirii
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      Amplasarea sălilor de dans permite accesul rapid și ușor
                      dacă locuiți în zona Piața Unirii, cartierul Rahova,
                      cartierul Berceni, zona 13 Septembrie, cartierul Drumul
                      Taberei, Bragadiru, Măgurele.
                    </p>
                  </div>
                </div>
                <div className="aspect-video w-full rounded-lg overflow-hidden border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.8076112780785!2d26.0731!3d44.4142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff2d1e5c8a8f%3A0x9c9e5732b668aabd!2sCalea%20Rahovei%20262%2C%20Bucure%C8%99ti!5e0!3m2!1sro!2sro!4v1648218144749!5m2!1sro!2sro"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Clock className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-bold">Program</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      În general, cursurile de dans pentru adulți se desfășoară
                      pe perioadă nelimitată, fiecare ședință având durata de
                      1h15min.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      Special gândite pentru oamenii activi, lecțiile de dans
                      încep, în cursul săptămânii, începând cu ora 18:30, astfel
                      încât lipsa timpului nu mai este o scuză.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      Cursurile de dans pentru copii se desfășoară în cursul
                      săptămânii și/sau în weekend.
                    </p>
                    <div className="mt-4 space-y-2">
                      <p className="font-medium">Program vizite:</p>
                      <ul className="space-y-1 text-gray-500 dark:text-gray-400">
                        <li>Luni - Joi: 18:30 - 22:30</li>
                        <li>Vineri: 19:30 - 22:00</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-red-600 to-orange-500 text-white p-8 rounded-lg">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold">
              Contactează-ne pentru înscrieri
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" />
                <span>0722.675.126</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5" />
                <span>alexandra_dumitrache@yahoo.com</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5" />
                <span>inpasidedans@gmail.com</span>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100 border-white hover:border-gray-100"
                >
                  Contactează-ne
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <GrupeInFormare />
    </div>
  );
}

function ActivityCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <Card className="h-full transition-all duration-200 hover:shadow-md">
        <CardContent className="p-6 h-full flex flex-col">
          <h3 className="font-bold mb-2">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400 flex-grow">
            {description}
          </p>
          <div className="mt-4 text-red-600 dark:text-red-400 flex items-center">
            <span className="text-sm">Află mai multe</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
