import { Children, isValidElement, type ReactNode } from 'react';
import { ChevronDown, Minus, Plus } from 'lucide-react';

export type IntrebareFaq = { q: string; a: string | ReactNode };

// Textul simplu al unui răspuns JSX, pentru schema FAQPage (care acceptă doar text).
function textDin(nod: ReactNode): string {
  if (typeof nod === 'string' || typeof nod === 'number') return String(nod);
  if (Array.isArray(nod)) return nod.map(textDin).join(' ');
  if (isValidElement(nod)) {
    const copii = (nod.props as { children?: ReactNode }).children;
    return Children.toArray(copii).map(textDin).join(' ');
  }
  return '';
}

const curata = (s: string) => s.replace(/\s+/g, ' ').replace(/\s+([.,;:!?])/g, '$1').trim();

// Singura componentă FAQ a site-ului. Randată cu <details>: răspunsurile sunt în HTML
// (roboții AI nu rulează JavaScript) și se deschid fără cod client. Emite schema FAQPage
// din aceleași date, ca întrebările afișate și cele din schemă să nu poată diverge.
export default function FaqBlock({
  intrebari,
  titlu = 'Întrebări frecvente',
  subtitlu,
  icon = 'chevron',
  deschisPrima = false,
  aliniere = 'center',
  className = '',
}: {
  intrebari: IntrebareFaq[];
  titlu?: string;
  subtitlu?: string;
  icon?: 'plus' | 'chevron';
  deschisPrima?: boolean;
  aliniere?: 'center' | 'left';
  className?: string;
}) {
  if (intrebari.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: intrebari.map(i => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: curata(textDin(i.a)) },
    })),
  };

  return (
    <section className={`max-w-4xl mx-auto ${className}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={`mb-8 ${aliniere === 'center' ? 'text-center' : ''}`}>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">{titlu}</h2>
        {subtitlu && <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">{subtitlu}</p>}
      </div>
      <div className="space-y-3">
        {intrebari.map((i, idx) => (
          <details
            key={i.q}
            open={deschisPrima && idx === 0}
            className="group rounded-xl border border-slate-200 bg-white shadow-sm open:shadow-md transition-shadow"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-lg font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
              {i.q}
              {icon === 'plus' ? (
                <>
                  <Plus className="h-5 w-5 shrink-0 text-red-600 group-open:hidden" />
                  <Minus className="hidden h-5 w-5 shrink-0 text-red-600 group-open:block" />
                </>
              ) : (
                <ChevronDown className="h-5 w-5 shrink-0 text-red-600 transition-transform group-open:rotate-180" />
              )}
            </summary>
            <div className="px-6 pb-5 text-slate-600 leading-relaxed whitespace-pre-line">{i.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
