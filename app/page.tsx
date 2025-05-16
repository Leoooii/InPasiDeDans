import type React from 'react';
import Link from 'next/link';
import { Heart, Users, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Script from 'next/script';
import CookieConsent from '@/components/cookie-consent';

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
          id="eXF-pasideda-0"
          async
          defer
        ></Script>
      </div>
      {/* Fixed Button */}
      {/* Hero Section cu GIF sau imagine statică */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/gif/pc-gif2.gif?height=800&width=1200" // Folosim un placeholder până când GIF-ul este disponibil
              alt="Școala de dans"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="absolute inset-0 bg-black/50" />
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
      <section className="py-16 bg-gray-800">
        <div className="container">
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
      {/* Testimonials */}
      {/* <section className="py-16 container">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">Ce Spun Cursanții Noștri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="Am învățat să dansăm pentru nunta noastră și a fost o experiență minunată. Instructorii sunt profesioniști și foarte răbdători."
            author="Maria și Andrei"
          />
          <TestimonialCard
            quote="Cursurile de dans latino mi-au schimbat viața. Am cunoscut oameni minunați și am descoperit o nouă pasiune."
            author="Elena D."
          />
          <TestimonialCard
            quote="Copilul meu adoră cursurile de dans. Instructorii știu cum să lucreze cu cei mici și să-i motiveze."
            author="Cristina, mamă a unui cursant"
          />
        </div>
      </section> */}
      {/* CTA Section */}
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
    </div>
  );
}

function StatCard({
  icon,
  value,
  description,
}: {
  icon: React.ReactNode;
  value: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      {icon}
      <h3 className="text-2xl font-bold mt-4 mb-2 dark:text-white">{value}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <Card className="dark:bg-gray-800">
      <CardContent className="pt-6">
        <div className="text-red-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.032.303-.406.7-.754 1.19-1.06.495-.305.95-.58 1.36-.828.42-.247.695-.48.827-.702.132-.222.198-.372.198-.449 0-.114-.065-.282-.197-.503-.132-.222-.423-.452-.873-.69-.45-.24-.955-.436-1.514-.587-.558-.15-1.109-.225-1.65-.225-.707 0-1.39.113-2.05.338-.66.226-1.24.57-1.744 1.04-.504.468-.912 1.01-1.226 1.633-.313.623-.47 1.298-.47 2.027 0 .808.164 1.564.49 2.27.33.704.764 1.315 1.3 1.834.54.518 1.16.927 1.852 1.226.693.3 1.438.449 2.235.449.764 0 1.491-.12 2.18-.363.692-.24 1.304-.592 1.834-1.055.532-.463.957-1.025 1.274-1.685.318-.66.476-1.387.476-2.18z" />
          </svg>
        </div>
        <p className="text-gray-700 dark:text-gray-200 mb-6">{quote}</p>
        <p className="font-semibold dark:text-white">{author}</p>
      </CardContent>
    </Card>
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
