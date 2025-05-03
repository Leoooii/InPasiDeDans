import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 dark:bg-gray-950 dark:text-gray-200">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Image
              src="/images/logo.png"
              alt="In pasi de Dans"
              width={200}
              height={70}
              className="h-auto"
            />
            <p className="text-sm">
              Invatam Bucurestiul sa danseze din 2009! Oferim cursuri pentru
              adulți și copii într-o atmosferă plăcută și relaxantă.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/scoaladedansinpasidedans"
                className="hover:text-white transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/explore/locations/459372516/in-pasi-de-dans/"
                className="hover:text-white transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.youtube.com/@inpasidedans"
                className="hover:text-white transition-colors"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Cursuri de dans
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cursuri-dans-adulti"
                  className="hover:text-white transition-colors"
                >
                  Cursuri dans adulți
                </Link>
              </li>
              <li>
                <Link
                  href="/cursuri-dans-copii"
                  className="hover:text-white transition-colors"
                >
                  Cursuri dans copii
                </Link>
              </li>
              <li>
                <Link
                  href="/dansuri-populare"
                  className="hover:text-white transition-colors"
                >
                  Dansuri populare
                </Link>
              </li>
              <li>
                <Link
                  href="/dansuri-de-societate"
                  className="hover:text-white transition-colors"
                >
                  Dansuri de societate
                </Link>
              </li>
              <li>
                <Link
                  href="/dansuri-latino"
                  className="hover:text-white transition-colors"
                >
                  Dansuri latino
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Informații
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/grupe-in-formare"
                  className="hover:text-white transition-colors"
                >
                  Grupe în formare
                </Link>
              </li>
              <li>
                <Link
                  href="/program"
                  className="hover:text-white transition-colors"
                >
                  Program
                </Link>
              </li>
              <li>
                <Link
                  href="/tarife"
                  className="hover:text-white transition-colors"
                >
                  Tarife
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/galerie"
                  className="hover:text-white transition-colors"
                >
                  Galerie
                </Link>
              </li> */}
              <li>
                <Link
                  href="/instructori"
                  className="hover:text-white transition-colors"
                >
                  Instructori
                </Link>
              </li>
              {/* <li>
                <Link href="/testimoniale" className="hover:text-white transition-colors">
                  Testimoniale
                </Link>
              </li> */}
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Calea Rahovei 262, sector 5, Bucuresti</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>+40 722 675 126</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>inpasidedans@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6">
        <div className="container text-center text-sm">
          <p>
            © {new Date().getFullYear()} In pasi de Dans. Toate drepturile
            rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}
