import Image from 'next/image';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Head from './head';

export default function Excursii() {
  const excursii = [
    {
      id: 1,
      title: 'Vidraru',
      date: 'Iunie 2024',
      link: 'https://www.facebook.com/share/p/18eYV59wNG/',
      image: 'vidraru.png',
    },
    {
      id: 2,
      title: 'Casoca, Buzău',
      date: 'Iunie 2022',
      link: 'https://www.facebook.com/share/p/1AX8JQc6di/',
      image: 'casoca.png',
    },
    {
      id: 3,
      title: 'Zanzibar',
      date: 'Noiembrie 2021',
      link: 'https://www.facebook.com/media/set/?set=a.4474379455948866&type=3',
      image: 'zanzibar.png',
    },
    {
      id: 4,
      title: 'Moeciu',
      date: 'Iulie 2019',
      link: 'https://www.facebook.com/media/set/?set=a.2339272792792887&type=3',
      image: 'moeciu.png',
    },
    {
      id: 5,
      title: 'Tenerife',
      date: 'Martie 2019',
      link: 'https://www.facebook.com/media/set/?set=a.2104845992902236&type=3',
      image: 'tenerife.png',
    },
    {
      id: 6,
      title: 'Thailanda și Cambodgia',
      date: 'Noiembrie 2018',
      link: 'https://www.facebook.com/media/set/?set=a.1938997632820407&type=3',
      image: 'thailanda.png',
    },
    {
      id: 7,
      title: 'Sicilia',
      date: 'Mai 2018',
      link: 'https://www.facebook.com/media/set/?set=a.1681788268541346&type=3',
      image: 'sicilia.png',
    },
  ];

  return (
    <div className="container py-12">
      <Head/>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Excursii În Pași de Dans
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Descoperă lumea dansului prin excursiile noastre tematice
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Călătorește și dansează</h2>
            <p>
              Excursiile noastre tematice combină pasiunea pentru dans cu
              plăcerea de a călători și descoperi locuri noi. Organizăm periodic
              excursii atât în România, cât și în străinătate, unde cursanții
              noștri au ocazia să se distreze, să danseze, să socializeze și să
              exploreze locuri deosebite într-o atmosferă relaxată și plină de
              voie bună.
            </p>
            <p>
              Aceste excursii sunt deschise atât cursanților noștri, cât și
              partenerilor sau prietenilor acestora, fiind o oportunitate
              excelentă de a socializa și de a împărtăși experiențe unice.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/excursie.png?height=800&width=600"
              alt="Excursie de dans"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Următoarele excursii</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src="/images/mahmudia.png?height=400&width=600"
                  alt="Excursie Maramureș"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  Mahmudia, Delta Dunarii
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>5-7 Septembrie 2025</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span> Mahmudia, Delta Dunarii</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>77 locuri</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-4 overflow-y-scroll h-32">
                  Hai in Delta cu prietenii si colegii de la dans! In weekend-ul
                  5-7 septembrie 2025, invitam cursantii scolii intr-o excursie
                  in Delta Dunarii (la Murighiol). Cazarea se va face in 2
                  pensiuni: - Pensiunea Belvedere - Pensiunea Rio Divino
                  Pensiunile sunt la o distanta de 300m, una de cealalta. Pret:
                  750 lei/persoana Include: - cazare 2 nopti (in camera
                  dubla/tripla/cvadrupla/apartament) - mic dejun + cina (toate
                  mesele se vor lua la pensiunea Belvedere) - petrecere
                  vineri+sambata - acces piscina Optional, contra cost, putem
                  face excursii cu barca pe Dunare. Deplasarea se va face cu
                  masinile personale (pana acolo se poate ajunge cu masina, nu
                  este nevoie de transfer pe apa). Inscrierea (pentru cursantii
                  actuali ai scolii) se face prin achitarea unui avans de 150
                  lei, pana pe 16 martie 2025 (primul venit, primul servit), iar
                  restul de 600 lei, pana pe 1 august 2025.
                </p>
                <Link href="https://www.facebook.com/share/1AXAvy3SJx/">
                  <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                    Detalii și înscriere
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Excursii anterioare</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {excursii.map(excursie => (
              <Link href={excursie.link} key={excursie.id}>
                <div className="relative h-60 rounded-lg overflow-hidden group">
                  <Image
                    src={`/images/excursii/${excursie.image}?height=400&width=600`}
                    alt="Excursie Argentina"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold">{excursie.title}</h3>
                      <p className="text-sm">{excursie.date}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
