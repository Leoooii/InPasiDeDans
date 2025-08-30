import { MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LocationSection() {
  return (
    <div className="p-0 container py-12">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Unde au loc aceste lecții de dans?</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
        {/* Textul informațional */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <span className="text-xl font-bold text-gray-900 mb-3">Adresa școlii de dans</span>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cursurile de dans se desfășoară în cele 3 săli de dans, situate pe <span className="font-semibold text-red-600">Calea Rahovei 262, sector 5, București</span>.
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
            <Link href="/inscriere">
              <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-lg">
                Înscrie-te la curs
              </Button>
            </Link>
          </div>
        </div>

        {/* Harta */}
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="text-center mb-4">
            <div className="text-xl font-bold text-gray-900 mb-2">Ne găsești aici</div>
            <p className="text-gray-600 text-sm">Obține direcții</p>
          </div>
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.86803561851!2d26.0774895!3d44.415353599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff9e4072cc6f%3A0x901ceb768f754f2a!2sIn%20Pa%C8%99i%20de%20Dans!5e0!3m2!1sen!2sro!4v1743511190472!5m2!1sen!2sro"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locația Școlii de Dans În Pași de Dans"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
