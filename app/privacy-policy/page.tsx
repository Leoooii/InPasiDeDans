import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Politică de Confidențialitate
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">1. Introducere</h2>
          <p className="mb-4">
            Această Politică de Confidențialitate explică modul în care
            colectăm, utilizăm, stocăm și protejăm datele dumneavoastră
            personale atunci când utilizați site-ul nostru. Ne angajăm să
            respectăm confidențialitatea datelor dumneavoastră în conformitate
            cu Regulamentul General privind Protecția Datelor (GDPR) și alte
            legi aplicabile.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            2. Datele personale colectate
          </h2>
          <p className="mb-4">
            Colectăm date personale prin formularele de înscriere la grupe
            disponibile pe site. Aceste date includ:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Nume și prenume</li>
            <li>Adresa de e-mail</li>
            <li>Număr de telefon</li>
            <li>Mesaj (opțional)</li>
            <li>Stil de dans dorit</li>
          </ul>
          <p className="mb-4">
            Aceste date sunt furnizate voluntar de dumneavoastră atunci când
            completați formularul.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            3. Scopul colectării datelor
          </h2>
          <p className="mb-4">
            Datele personale colectate sunt utilizate pentru:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Procesarea înscrierilor la grupele de dans.</li>
            <li>
              Contactarea dumneavoastră pentru a confirma înscrierea sau pentru
              a oferi informații suplimentare.
            </li>
            <li>
              Gestionarea internă a grupelor (ex. alocarea în funcție de stilul
              de dans dorit).
            </li>
          </ul>
          <p className="mb-4">
            Nu folosim datele dumneavoastră în scopuri de marketing sau alte
            scopuri care nu sunt legate de înscrierea la grupe, decât dacă ne
            dați consimțământul explicit.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            4. Baza legală pentru procesarea datelor
          </h2>
          <p className="mb-4">Procesăm datele dumneavoastră pe baza:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Consimțământului</strong>: Prin completarea formularului
              și bifarea acordului pentru procesarea datelor, vă exprimați
              consimțământul.
            </li>
            <li>
              <strong>Executării unui contract</strong>: Datele sunt necesare
              pentru a vă înscrie la grupele de dans, conform solicitării
              dumneavoastră.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            5. Cum stocăm și protejăm datele
          </h2>
          <p className="mb-4">
            Datele colectate prin formular sunt trimise prin e-mail către noi și
            sunt stocate în siguranță. Folosim măsuri tehnice și organizatorice
            pentru a proteja datele, inclusiv:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Protecție prin Cloudflare pentru a preveni accesul neautorizat și
              spam-ul.
            </li>
            <li>Acces limitat la date doar pentru personalul autorizat.</li>
            <li>Stocare securizată a e-mailurilor și a datelor asociate.</li>
          </ul>
          <p className="mb-4">
            Nu transferăm datele dumneavoastră către terțe părți, cu excepția
            furnizorilor de servicii esențiale (ex. serviciul de e-mail sau
            Cloudflare), care sunt obligați să respecte confidențialitatea.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            6. Durata stocării datelor
          </h2>
          <p className="mb-4">
            Păstrăm datele dumneavoastră doar atât timp cât este necesar pentru
            scopurile menționate (ex. procesarea înscrierii și gestionarea
            grupelor). Dacă nu mai sunteți înscris sau dacă solicitați ștergerea
            datelor, acestea vor fi eliminate în cel mult 30 de zile.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            7. Drepturile dumneavoastră
          </h2>
          <p className="mb-4">Conform GDPR, aveți următoarele drepturi:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Dreptul de acces</strong>: Puteți solicita o copie a
              datelor pe care le deținem despre dumneavoastră.
            </li>
            <li>
              <strong>Dreptul la rectificare</strong>: Puteți corecta datele
              inexacte.
            </li>
            <li>
              <strong>Dreptul la ștergere</strong>: Puteți solicita ștergerea
              datelor.
            </li>
            <li>
              <strong>Dreptul la restricționarea procesării</strong>: Puteți
              limita modul în care folosim datele.
            </li>
            <li>
              <strong>Dreptul la portabilitatea datelor</strong>: Puteți
              solicita transferul datelor către alt operator.
            </li>
            <li>
              <strong>Dreptul de a obiecta</strong>: Puteți obiecta față de
              procesarea datelor în anumite cazuri.
            </li>
            <li>
              <strong>Dreptul de a retrage consimțământul</strong>: Puteți
              retrage consimțământul oricând, fără a afecta legalitatea
              procesării anterioare.
            </li>
          </ul>
          <p className="mb-4">
            Pentru a exercita aceste drepturi, vă rugăm să ne contactați la{' '}
            <Link
              href="mailto:inpasidedans@gmail.com"
              className="text-blue-600 underline"
            >
              inpasidedans@gmail.com
            </Link>
            .
          </p>

          <h2 className="text-xl font-semibold mb-4">8. Servicii terțe</h2>
          <p className="mb-4">
            Folosim Cloudflare pentru a proteja formularele de înscriere
            împotriva spam-ului și atacurilor automate. Cloudflare poate procesa
            anumite date tehnice (ex. adresa IP) pentru a asigura securitatea.
            Pentru mai multe detalii, consultați politica de confidențialitate a
            Cloudflare.
          </p>

          <h2 className="text-xl font-semibold mb-4">
            9. Actualizări ale Politicii de Confidențialitate
          </h2>
          <p className="mb-4">
            Ne rezervăm dreptul de a actualiza această politică periodic. Orice
            modificări vor fi publicate pe această pagină, iar data ultimei
            actualizări va fi indicată mai jos.
          </p>

          <h2 className="text-xl font-semibold mb-4">10. Contact</h2>
          <p className="mb-4">
            Dacă aveți întrebări sau reclamații legate de această Politică de
            Confidențialitate, vă rugăm să ne contactați la{' '}
            <Link
              href="mailto:inpasidedans@gmail.com"
              className="text-blue-600 underline"
            >
              inpasidedans@gmail.com
            </Link>
            . De asemenea, aveți dreptul de a depune o plângere la Autoritatea
            Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal
            (ANSPDCP).
          </p>

          <p className="text-sm text-gray-500 mt-6">
            Ultima actualizare: 15 mai 2025
          </p>
        </div>
      </div>
      
    </div>
  );
}
