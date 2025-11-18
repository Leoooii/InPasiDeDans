import { Suspense } from 'react';
import InscriereForm from './InscriereForm';

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

