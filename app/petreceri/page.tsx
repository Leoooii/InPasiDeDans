'use client';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ImageSkeleton from '@/components/image-skeleton';
import Image from 'next/image';
import Link from 'next/link';
import Head from './head';
import GrupeInFormare from '@/components/grupe-in-formare';
import { link } from 'fs';

export default function Petreceri() {
  const petreceri = [
    {
      id: 1,
      title: `Secret Santa Party`,
      date: 'Decembrie 2024',
      link: `https://www.facebook.com/share/p/18pK7bjRzQ/`,
      image: `ssp2024.png`,
    },
    {
      id: 2,
      title: `Petrecere Crăciun`,
      date: 'Decembrie 2024',
      link: `https://www.facebook.com/share/p/1AS51omrRQ/`,
      image: 'c2024.png',
    },
    {
      id: 3,
      title: `Balul Regățenilor, ediția a II-a`,
      date: 'Noiembrie 2024',
      link: `https://www.facebook.com/share/p/15VHT6zBXL/`,
      image: 'br2024.png',
    },
    {
      id: 4,
      title: `Halloween Party`,
      date: 'Octombrie 2024',
      link: `https://www.facebook.com/share/p/14mAUtYHB2/`,
      image: 'h2024.png',
    },
    {
      id: 5,
      title: `Secret Santa Party`,
      date: 'Decembrie 2023',
      link: `https://www.facebook.com/share/p/1ATPizJcfp/`,
      image: 'ssp2023.png',
    },
    {
      id: 6,
      title: `Petrecere Crăciun`,
      date: 'Decembrie 2023',
      link: `https://www.facebook.com/share/p/1E8QevGVzi/`,
      image: 'c2023.png',
    },
    {
      id: 7,
      title: `Halloween Party`,
      date: 'Octombrie 2023',
      link: `https://www.facebook.com/share/p/1AoG7nhxBG/`,
      image: 'h2023.png',
    },
    {
      id: 8,
      title: `Balul Regățenilor, ediția I`,
      date: 'Octombrie 2023',
      link: `https://www.facebook.com/share/p/16HcrodR5W/`,
      image: 'br2023.png',
    },
    {
      id: 9,
      title: `Petrecere Ziua Iei`,
      date: 'Iunie 2023',
      link: `https://www.facebook.com/share/p/1Bg9Wi21WA/`,
      image: 'zi2023.png',
    },
    {
      id: 10,
      title: `Secret Santa Party`,
      date: 'Decembrie 2022',
      link: `https://www.facebook.com/share/p/1DYB4icr8S/`,
      image: 'ssp2022.png',
    },
    {
      id: 11,
      title: `Petrecere Crăciun`,
      date: 'Decembrie 2022',
      link: `https://www.facebook.com/share/p/18nfcYYDiB/`,
      image: 'c2022.png',
    },
    {
      id: 12,
      title: `Halloween Party`,
      date: 'Octombrie 2022',
      link: `https://www.facebook.com/share/p/1D9vRixEk9/`,
      image: 'h2022.png',
    },
  ];

  const urmatoarelePetreceri = [
    {
      id: 1,
      title: 'Petrecere Crăciun 2025',
      date: '20 Decembrie 2025',
      time: '19:30 - 02:00',
      location: 'Restaurant Almafi Alegria',
      image: '/images/petrecere.png?height=800&width=600',
      badge: 'În curând',
      description:
        'Cel mai așteptat eveniment dansant al anului, devenit deja tradiție pentru școala noastră! Vă așteptăm cu muzică bună, dans, distracție și show-uri pregatite de cursanții noștri.',
      link: 'https://www.facebook.com/scoaladedansinpasidedans',
    },
    {
      id: 2,
      title: 'Sweet Sixteen Dance Party',
      date: '20 Decembrie 2024',
      time: '20:00 - 00:00',
      location:
        'Intersecția Trafic Greu, vis-a-vis de Liberty Center (Calea Rahovei 262)',
      image:
        'https://scontent.fotp3-2.fna.fbcdn.net/v/t39.30808-6/497848463_1247148040748049_5603249100985516966_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=109&ccb=1-7&_nc_sid=75d36f&_nc_ohc=qCOqnQ6UkNkQ7kNvwGV3Sg2&_nc_oc=Adn2pbV-sZP8ZRtICQ770c_SKHpy5vz2aHc8nCeTNUMv4mjOF48sogdcJxji3LI3Ex8&_nc_zt=23&_nc_ht=scontent.fotp3-2.fna&_nc_gid=Phh_Ma9o6p8Q9tYXdfON0A&oh=00_AfJKeBENX-IZD1EfG0ff1PBl_7gSDp22vUppXcCS-FpZsQ&oe=683239A8',
      description:
        'Anul acesta, pe 1 iulie școala noastră împlinește 16 ani de activitate, așa că invităm toți cursanții școlii să petrecem cu muzică, dans și voie bună.',
      link: 'https://www.facebook.com/events/s/sweet-sixteen-dance-party/1133229731941991/?rdid=qbzLyfSrg5DaLCDA&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18kT43fFDx%2F#',
    },
  ];

  return (
    <div className="container py-12">
      <Head />
      <div className="space-y-6 ">
        <div className="space-y-4 bg-gradient-to-r from-rose-50 to-amber-50 p-6 rounded-lg shadow-sm">
          <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight ">
            Petreceri În Pași de Dans
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Participă la petrecerile noastre tematice și pune în practică ce ai
            învățat!
          </p>
          <p className="text-gray-500 leading-relaxed">
            Petrecerile tematice organizate de școala noastră sunt ocazii
            perfecte pentru a practica ce ai învățat la cursuri, într-o
            atmosferă relaxată și prietenoasă. Acestea sunt deschise atât
            cursanților noștri, cât și prietenilor acestora.
          </p>
          <a
            href="#galerie"
            className="inline-block mt-4 px-6 py-2 bg-rose-600 text-white font-semibold rounded-md hover:bg-rose-700 transition-colors"
          >
            Vezi galeriile
          </a>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Următoarele petreceri</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {urmatoarelePetreceri.map(petrecere => (
              <Link href={petrecere.link} key={petrecere.id} target="_blank">
                <Card
                  key={petrecere.id}
                  className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-red-600"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={petrecere.image}
                      alt={petrecere.title}
                      fill
                      className="object-cover hover:scale-125 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {petrecere.badge}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {petrecere.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{petrecere.date}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{petrecere.time}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <div>
                          {' '}
                          <MapPin className="w-4 h-4 mr-2" />
                        </div>
                        <span>{petrecere.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">
                      {petrecere.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Galerie de la petrecerile anterioare
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4" id="galerie">
            {petreceri.map(petrecere => (
              <Card
                key={petrecere.id}
                className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-red-600"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={`/images/petreceri/${petrecere.image}?height=800&width=600`}
                    alt={petrecere.title}
                    fill
                    className="object-cover hover:scale-125 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Link href={petrecere.link} target="_blank">
                    <h3 className="text-xl font-bold mb-2">
                      {petrecere.title}
                    </h3>
                    <h3>{petrecere.date}</h3>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <GrupeInFormare />
    </div>
  );
}
