'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSectionProps {
  danceType?: 'latino' | 'societate' | 'default';
}

const latinoFAQData: FAQItem[] = [
  {
    id: 1,
    question: 'Cum mă pot înscrie la cursurile de dans latino și ce pași trebuie să urmez?',
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
    id: 2,
    question: 'Este obligatoriu să vin cu partener la cursurile de dans latino?',
    answer: 'Nu, nu este obligatoriu. Atunci când dansăm în perechi folosim un sistem de rotație, astfel încât toată lumea să aibă ocazia să danseze cu toată lumea.'
  },
  {
    id: 3,
    question: 'Pot încerca o lecție gratuită înainte de a alege abonamentul?',
    answer: 'Da, dacă avem deschisă o grupă de nivel începător, puteți participa la o ședință de probă gratuită. Dacă aveți deja experiență în dans, vă putem invita la o lecție într-o grupă de nivel potrivit sau chiar puțin sub nivelul dumneavoastră, pentru a vă acomoda. De asemenea, este posibil să asistați la o lecție într-o grupă intermediară sau avansată, pentru a vedea atmosfera și stilul cursurilor noastre.'
  },
  {
    id: 4,
    question: 'Cât durează un modul de curs de dans latino?',
    answer: 'Cursurile noastre nu au o durată fixă de finalizare. Ele se desfășoară pe termen nelimitat, atâta timp cât există un număr minim de participanți în grupă. Astfel, puteți progresa în ritmul propriu, fără presiunea unei perioade limitate.'
  },
  {
    id: 5,
    question: 'Oferiți cursuri pentru toate nivelurile (începători, intermediari, avansați)?',
    answer: 'Da, cursurile sunt structurate pe niveluri – începători, intermediari și avansați – pentru ca fiecare cursant să învețe treptat și să evolueze în ritmul său.'
  },
  {
    id: 6,
    question: 'Dacă lipsesc, pot recupera ședința pierdută?',
    answer: 'Da, ședințele pierdute pot fi recuperate la alte grupe, dacă în acel moment există o grupă de nivel apropiat sau sub nivelul dumneavoastră. Dacă nu este posibil să recuperați, abonamentul nu poate fi prelungit. În schimb, pentru flexibilitate, oferim și opțiunea de a plăti fiecare ședință individual.'
  },
  {
    id: 7,
    question: 'Organizați și evenimente sociale pentru cursanți?',
    answer: 'Da! Pe lângă cursuri, organizăm periodic petreceri, seri de practice, excursii și participări la festivaluri, congrese sau workshop-uri, pentru ca dansul să devină o experiență completă și plină de bucurie.'
  }
];

const societateFAQData: FAQItem[] = [
  {
    id: 1,
    question: 'Cum mă pot înscrie la cursurile de dansuri de societate și ce nivel trebuie să aleg?',
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
    id: 2,
    question: 'Este nevoie să vin cu un partener la cursurile de dansuri de societate sau pot participa și singur(ă)?',
    answer: 'Nu este obligatoriu să ai partener(ă). Mulți cursanți vin singuri, iar noi ne asigurăm că toată lumea dansează și schimbă partenerii pe parcursul lecțiilor.'
  },
  {
    id: 3,
    question: 'Oferiți cursuri pentru toate nivelurile (începători, intermediari, avansați)?',
    answer: 'Da, avem grupe pentru toate nivelurile, astfel încât să evoluezi treptat și să dansezi cu încredere pe orice ritm. Poți verifica aici programul grupelor aflate în defasurare [link către Program] și grupele aflate în formare [link către Grupe in formare]'
  },
  {
    id: 4,
    question: 'Pot participa la cursuri dacă nu am experiență deloc în dans?',
    answer: 'Bineînțeles! Cursurile pentru începători sunt gândite exact pentru cei care nu au mai dansat până acum.'
  },
  {
    id: 5,
    question: 'Există o vârstă minimă sau maximă pentru a participa la cursurile de dansuri de societate?',
    answer: 'Nu există limită de vârstă – dansul este pentru toată lumea. Avem cursuri dedicate atât pentru adulți, cât și pentru copii.'
  },
  {
    id: 6,
    question: 'Pot beneficia de o lecție demonstrativă gratuită înainte de înscriere?',
    answer: 'Da, dacă avem deschisă o grupă de nivel începător, puteți participa la o ședință de probă gratuită. Dacă aveți deja experiență în dans, vă putem invita la o lecție într-o grupă de nivel potrivit sau chiar puțin sub nivelul dumneavoastră, pentru a vă acomoda. De asemenea, este posibil să asistați la o lecție într-o grupă intermediară sau avansată, pentru a vedea atmosfera și stilul cursurilor noastre.'
  }
];

export default function FAQSection({ danceType = 'default' }: FAQSectionProps) {
  // Selectăm întrebările în funcție de tipul de dans
  const getFAQData = (): FAQItem[] => {
    switch (danceType) {
      case 'latino':
        return latinoFAQData;
      case 'societate':
        return societateFAQData;
      default:
        return latinoFAQData; // Fallback la întrebări latino
    }
  };

  const faqData = getFAQData();
  const [openItems, setOpenItems] = useState<number[]>([1]); // Primul item deschis implicit

  // JSON-LD pentru SEO
  const generateFAQSchema = () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(item => ({
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
            Răspunsuri la cele mai frecvente întrebări despre cursurile noastre de dans
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4" itemScope itemType="https://schema.org/FAQPage">
          {faqData.map((item) => (
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
                <h3 
                  className="text-lg font-semibold text-gray-900 pr-4"
                  itemProp="name"
                >
                  {item.question}
                </h3>
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
