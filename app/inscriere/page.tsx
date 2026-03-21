import { Suspense } from 'react';
import InscriereForm from './InscriereForm';

export const metadata = {
  title: 'Înscriere Cursuri de Dans București | In Pași de Dans',
  description:
    'Înscrie-te la cursurile de dans din București. Adulți și copii — dansuri latino, de societate și populare. Completează formularul de înscriere acum!',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/inscriere',
  },
  openGraph: {
    title: 'Înscriere Cursuri de Dans București | In Pași de Dans',
    description: 'Înscrie-te la cursurile de dans din București pentru adulți și copii.',
    url: 'https://www.inpasidedans.ro/inscriere',
    siteName: 'În Pași de Dans',
    locale: 'ro_RO',
  },
};

export default function InscrierePage() {
  return (
    <Suspense
      fallback={
        <div className="container py-12">
          <div className="max-w-3xl mx-auto text-center text-gray-500">
            Se încarcă formularul de înscriere...
          </div>
        </div>
      }
    >
      <InscriereForm />
    </Suspense>
  );
}

