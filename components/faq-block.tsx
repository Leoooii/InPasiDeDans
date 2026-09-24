import { ChevronDown } from 'lucide-react';

export type IntrebareFaq = { q: string; a: string };

// Randat pe server cu <details>: răspunsurile sunt în HTML (roboții AI nu rulează
// JavaScript) și se deschid la click fără cod client. Emite și schema FAQPage.
export default function FaqBlock({
  titlu = 'Întrebări frecvente',
  intrebari,
  className = '',
}: {
  titlu?: string;
  intrebari: IntrebareFaq[];
  className?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: intrebari.map(i => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };

  return (
    <section className={`max-w-4xl mx-auto ${className}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="text-3xl font-bold text-center mb-8">{titlu}</h2>
      <div className="space-y-3">
        {intrebari.map(i => (
          <details
            key={i.q}
            className="group rounded-xl border border-gray-200 bg-white shadow-sm open:shadow-md transition-shadow"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              {i.q}
              <ChevronDown className="h-5 w-5 shrink-0 text-red-600 transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-6 pb-5 text-gray-600 leading-relaxed">{i.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
