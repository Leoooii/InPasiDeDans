'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string | React.ReactNode;
}

const folkDancesFAQData: FAQItem[] = [
  {
    id: 1,
    question: 'Cât durează un modul de curs de dans popular?',
    answer: 'Cursurile noastre au durată nelimitată – poți progresa în ritmul tău, fără presiunea unui număr fix de ședințe.'
  },
  {
    id: 2,
    question: 'Oferiți cursuri pentru toate nivelurile (începători, intermediari, avansați)?',
    answer: 'Da. Grupele sunt structurate pe niveluri, astfel încât fiecare cursant să învețe pas cu pas, într-un mod plăcut și adaptat experienței sale.'
  },
  {
    id: 3,
    question: 'Pot încerca o lecție gratuită înainte de a alege abonamentul?',
    answer: 'Da, dacă avem deschisă o grupă de nivel începător, puteți participa la o ședință de probă gratuită. Dacă aveți deja experiență în dans, vă putem invita la o lecție într-o grupă de nivel potrivit sau chiar puțin sub nivelul dumneavoastră, pentru a vă acomoda. De asemenea, este posibil să asistați la o lecție într-o grupă intermediară sau avansată, pentru a vedea atmosfera și stilul cursurilor noastre.'
  },
  {
    id: 4,
    question: 'Există o vârstă minimă sau maximă pentru a participa la cursurile de dansuri populare?',
    answer: 'Dansul popular nu are vârstă! Am avut si avem cursanți cu vârste între 15 și 60 de ani la grupele de dans popular.'
  },
  {
    id: 5,
    question: 'Ce beneficii am dacă particip la cursurile de dansuri populare?',
    answer: (
      <div className="space-y-3">
        <p>Pe lângă învățarea jocurilor tradiționale, cursurile noaste vă oferă:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>dezvoltarea coordonării și a condiției fizice,</li>
          <li>socializare și apartenență la o comunitate,</li>
          <li>păstrarea și transmiterea tradițiilor românești,</li>
          <li>bucuria de a dansa la evenimente și sărbători.</li>
        </ul>
      </div>
    )
  },
  {
    id: 6,
    question: 'Cum mă pot înscrie la cursurile de dansuri populare?',
    answer: (
      <div className="space-y-3">
        <p>Înscrierea este foarte simplă, folosind una din variantele de mai jos!</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Completezi formularul de pe site <a href="/inscriere" className="text-red-600 hover:text-red-700 underline">[link]</a></li>
          <li>Ne scrii direct pe WhatsApp la <a href="https://wa.me/40722675126" className="text-red-600 hover:text-red-700 underline">0722 675 126</a></li>
          <li>Ne trimiți un e-mail la <a href="mailto:inpasidedans@gmail.com" className="text-red-600 hover:text-red-700 underline">inpasidedans@gmail.com</a></li>
        </ul>
        <p>După ce te înscrii, îți confirmăm locul în grupă și îți trimitem toate detaliile despre program și abonament.</p>
      </div>
    )
  },
  {
    id: 7,
    question: 'Este nevoie să vin cu partener la cursurile de dansuri populare?',
    answer: 'Nu este obligatoriu să vii cu partener, dar dacă ai deja unul, este un plus. Grupurile noastre sunt mixte și te vei putea integra ușor.'
  }
];

export default function FolkDancesFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([1]); // Primul item deschis implicit

  // JSON-LD pentru SEO
  const generateFAQSchema = () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": folkDancesFAQData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": typeof item.answer === 'string' ? item.answer : 'Răspuns detaliat disponibil în componenta interactivă'
        }
      }))
    };
    return JSON.stringify(faqSchema);
  };

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      {/* JSON-LD Schema pentru SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateFAQSchema() }}
      />
      
      <section className="py-20 bg-white" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 id="faq-heading" className="text-4xl font-bold text-gray-900 mb-6">
              Întrebări frecvente (FAQ)
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Răspunsuri la cele mai frecvente întrebări despre cursurile noastre de dansuri populare
            </p>
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto space-y-4" itemScope itemType="https://schema.org/FAQPage">
            {folkDancesFAQData.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div 
                    className="text-lg font-semibold text-gray-900 pr-4"
                    itemProp="name"
                  >
                    {item.question}
                  </div>
                  <div className="flex-shrink-0">
                    {openItems.includes(item.id) ? (
                      <Minus className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </button>

                {/* Answer */}
                {openItems.includes(item.id) && (
                  <div 
                    className="px-6 pb-4 border-t border-gray-100"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div 
                      className="pt-4 text-gray-700 leading-relaxed"
                      itemProp="text"
                    >
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
