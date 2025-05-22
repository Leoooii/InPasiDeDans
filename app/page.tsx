import type React from 'react';
import Link from 'next/link';
import { Heart, Users, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Script from 'next/script';
import CookieConsent from '@/components/cookie-consent';
import dynamic from 'next/dynamic';
import GifWrapperClient from './GifWrapperClient';
import GrupeInFormare from '@/components/grupe-in-formare';
import ScrollDownArrows from '@/components/ScrollDownArrows';
import EvenimentePage from './evenimente/page';
import GrupeInFormarePage from './grupe-in-formare/page';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Cookie Consent */}
      <CookieConsent />
      {/* <Script
        strategy="afterInteractive"
        src="https://extremetracking.com/free?login=pasideda"
      /> */}

      <div style={{ display: 'none' }}>
        <Script
          src="https://efreecode.com/js.js"
          id="eXF-pasidans-0"
          async
          defer
        ></Script>
      </div>
      {/* Fixed Button */}
      {/* Hero Section cu GIF sau imagine statică */}
      <section className="relative h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full bg-orange-600">
            {/* <Image
              src="/images/gif/pc-gif2.gif"
              alt="Școala de dans"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            /> */}
            <GifWrapperClient />
          </div>

          {/* <div className="absolute inset-0 bg-black/50" /> */}
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              "Dansul este puțină nebunie care ne face tuturor mult bine!"
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Învățăm și pe cei mici, și pe cei mari să danseze din 2009, într-o
              atmosferă plăcută și relaxantă.
            </p>
            <Link href={'/inscriere'}>
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 hover:text-red-800 text-lg "
              >
                Înscrie-te acum
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      {/* <section className="py-12 bg-beige-50 dark:bg-gray-800">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard
              icon={<Heart className="w-10 h-10 text-red-600" />}
              value="+5120 Miri"
              description="ne-au trecut pragul"
            />
            <StatCard icon={<Users className="w-10 h-10 text-red-600" />} value="+9000" description="de cursanți" />
            <StatCard
              icon={<Calendar className="w-10 h-10 text-red-600" />}
              value="6 instructori"
              description="3 săli de dans"
            />
            <StatCard icon={<Award className="w-10 h-10 text-red-600" />} value="+15 Ani" description="experiență" />
          </div>
        </div>
      </section> */}
      {/* Secțiunea CURSURI DE DANS */}
      <section className="pb-16 pt-6 bg-gray-800">
        <ScrollDownArrows />
        <div className="container px-10 sm:px-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">
            CURSURI DE DANS
          </h2>

          {/* Butoane cu efect de strălucire */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ShineButton
              title="Cursuri de dans pentru adulți"
              href="/cursuri-dans-adulti"
              imageSrc="/images/bachata.png?height=400&width=600"
            />
            <ShineButton
              title="Cursuri de dans pentru copii"
              href="/cursuri-dans-copii"
              imageSrc="/images/copii.jpeg?height=400&width=600"
            />
            <ShineButton
              title="Lecții private"
              href="/lectii-private"
              imageSrc="/images/private2.png?height=400&width=600"
            />
            <ShineButton
              title="Grupe noi"
              href="/grupe-in-formare"
              imageSrc="/images/grupenoi.png?height=400&width=600"
            />
            <ShineButton
              title="Tarife"
              href="/tarife"
              imageSrc="/images/tarife.png?height=400&width=600"
            />
            <ShineButton
              title="Program"
              href="/program"
              imageSrc="/images/program.png?height=400&width=600"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pregătit să începi călătoria ta în lumea dansului?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Alătură-te celor peste 12000 de cursanți care au descoperit bucuria
            dansului la școala noastră.
          </p>
          <Link href="/inscriere">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-red-600 hover:bg-gray-100 border-white hover:border-gray-100 text-lg"
            >
              Înscrie-te la un curs
            </Button>
          </Link>
        </div>
      </section>
      <section className=" bg-gradient-to-r from-red-600 to-orange-500 text-white ">
        <GrupeInFormarePage />
        <EvenimentePage />
      </section>
      <GrupeInFormare />
    </div>
  );
}

function ShineButton({
  title,
  href,
  imageSrc,
}: {
  title: string;
  href: string;
  imageSrc: string;
}) {
  return (
    <Link
      href={href}
      className="relative block overflow-hidden rounded-lg group "
    >
      <div className="relative h-64 w-full overflow-hidden">
        {/* Imagine de fundal */}
        <Image
          src={imageSrc || '/placeholder.svg?height=400&width=600'}
          alt={title}
          fill
          className="object-fit transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110 "
          // width={600}
          // height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-white/10  "></div>
        {/* Overlay gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-orange-800/60 to-white/20 animate-continuous-shine "></div>

        {/* Titlu */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white ">{title}</h3>
          <div className="w-0 h-0.5 bg-white mt-2 transition-all duration-300 group-hover:w-full"></div>
        </div>
      </div>
    </Link>
  );
}
