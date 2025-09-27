import { MapPin, Phone, Navigation, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LocationSection() {
  return (
    <div className="p-0 container py-12">
      <h3 className="text-3xl font-bold tracking-tight text-center mb-8">Unde au loc aceste lecții de dans?</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
        {/* Textul informațional */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <span className="text-xl font-bold text-gray-900 mb-3">Adresa școlii de dans</span>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cursurile de dans se desfășoară în cele 3 săli de dans, situate pe <Link href="/contact?utm_source=google&utm_medium=trafic+organic&utm_campaign=google+business+profile" className="font-semibold text-red-600 hover:text-red-700 transition-colors">Calea Rahovei 262, sector 5, București</Link>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Vizitele se fac doar pe bază de programare.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <span className="text-xl font-bold text-gray-900 mb-3">Programare vizită</span>
                <p className="text-gray-700 leading-relaxed">
                  Dacă dorești să vezi sălile noastre sau să ne cunoști echipa, te rugăm să ne contactezi telefonic la{' '}
                  <a 
                    href="tel:+40722675126" 
                    className="font-semibold text-red-600 hover:text-red-700 transition-colors"
                  >
                    0722 675 126
                  </a> pentru a stabili o întâlnire.
                </p>
              </div>
            </div>
          </div>

          {/* Butonul de înscriere */}
          <div className="text-center pt-4">
            <Link href="#inscriere">
              <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-lg">
                Înscrie-te la curs
              </Button>
            </Link>
          </div>
        </div>

        {/* Harta cu butoane de navigație */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 shadow-lg border border-blue-200 dark:border-blue-800">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">Ne găsești aici</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Obține direcții către școala noastră</p>
          </div>
          
          <div 
            className="aspect-video w-full rounded-lg overflow-hidden border shadow-lg mb-6"
            itemScope 
            itemType="https://schema.org/Place"
          >
            <meta itemProp="name" content="În Pași de Dans" />
            <meta itemProp="description" content="Școala de dans cu tradiție din 2009, oferind cursuri de dansuri latino, de societate, populare și lecții private în București." />
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <meta itemProp="streetAddress" content="Calea Rahovei, Nr. 262" />
              <meta itemProp="addressLocality" content="București" />
              <meta itemProp="addressRegion" content="Sector 5" />
              <meta itemProp="postalCode" content="050897" />
              <meta itemProp="addressCountry" content="RO" />
            </div>
            <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
              <meta itemProp="latitude" content="44.415353599999996" />
              <meta itemProp="longitude" content="26.0774895" />
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.86803561851!2d26.0774895!3d44.415353599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff9e4072cc6f%3A0x901ceb768f754f2a!2sIn%20Pa%C8%99i%20de%20Dans!5e0!3m2!1sen!2sro!4v1743511190472!5m2!1sen!2sro"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Harta locației Școala de Dans În Pași de Dans din București"
              aria-label="Harta interactivă Google Maps cu locația Școlii de Dans În Pași de Dans"
            ></iframe>
          </div>
          
          {/* Butoane de navigație către Google Maps */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Calea+Rahovei+262+Sector+5+Bucuresti+Romania"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl text-sm"
            >
              <MapPin className="h-4 w-4" />
              Vezi pe Maps
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Calea+Rahovei+262+Sector+5+Bucuresti+Romania"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl text-sm"
            >
              <Navigation className="h-4 w-4" />
              Direcții
            </a>
          </div>
          
          <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-3">
            Click pentru a deschide Google Maps
          </p>
        </div>
      </div>
    </div>
  );
}
