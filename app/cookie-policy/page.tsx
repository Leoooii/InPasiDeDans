import Link from 'next/link';
import Head from './head';

export default function CookiePolicy() {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <Head />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Politică de Cookie-uri
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">1. Introducere</h2>
          <p className="mb-4">
            Această Politică de Cookie-uri explică ce sunt cookie-urile și dacă
            și cum sunt utilizate pe acest site. Vă rugăm să citiți această
            politică pentru a înțelege ce tipuri de tehnologii folosim și ce
            impact pot avea asupra datelor dumneavoastră.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            2. Ce sunt cookie-urile?
          </h2>
          <p className="mb-4">
            Cookie-urile sunt fișiere mici de text stocate pe dispozitivul
            dumneavoastră (calculator, telefon, tabletă) atunci când vizitați un
            site. Acestea permit site-ului să recunoască dispozitivul și să
            ofere o experiență personalizată. Tehnologiile similare includ
            pixeli, stocare locală sau alte mecanisme de urmărire.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            3. Utilizarea cookie-urilor pe acest site
          </h2>
          <p className="mb-4">
            <strong>Nu folosim cookie-uri direct pe acest site.</strong> Cu
            toate acestea, folosim servicii terțe, precum Cloudflare, pentru a
            proteja site-ul împotriva spam-ului și a atacurilor malițioase.
            Cloudflare poate utiliza tehnologii similare cookie-urilor (cum ar
            fi stocarea locală sau identificatori temporari) pentru a verifica
            dacă sunteți un utilizator legitim și pentru a preveni activitățile
            automate de tip bot.
          </p>
          <p className="mb-4">
            Aceste tehnologii sunt esențiale pentru funcționarea sigură a
            site-ului și nu colectează date personale în scopuri de marketing
            sau analiză.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            4. Gestionarea cookie-urilor
          </h2>
          <p className="mb-4">
            Deși nu folosim cookie-uri, puteți controla setările browserului
            pentru a bloca sau șterge orice cookie-uri sau tehnologii similare.
            Vă rugăm să rețineți că blocarea acestor tehnologii poate afecta
            funcționalitatea site-ului, în special în ceea ce privește protecția
            împotriva spam-ului.
          </p>
          <p className="mb-4">
            Pentru mai multe informații despre gestionarea cookie-urilor,
            consultați documentația browserului dumneavoastră.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            5. Actualizări ale Politicii de Cookie-uri
          </h2>
          <p className="mb-4">
            Ne rezervăm dreptul de a actualiza această politică periodic. Orice
            modificări vor fi publicate pe această pagină, iar data ultimei
            actualizări va fi indicată mai jos.
          </p>

          <h2 className="text-xl font-semibold mb-4">6. Contact</h2>
          <p className="mb-4">
            Dacă aveți întrebări despre această Politică de Cookie-uri, vă rugăm
            să ne contactați la adresa:{' '}
            <Link
              href="mailto:lioneh39@gmail.com"
              className="text-blue-600 underline"
            >
              lioneh39@gmail.com
            </Link>
            .
          </p>

          <p className="text-sm text-gray-500 mt-6">
            Ultima actualizare: 15 mai 2025
          </p>
        </div>
      </div>
    </div>
  );
}
