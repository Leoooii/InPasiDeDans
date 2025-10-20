'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const adultDanceFAQData: FAQItem[] = [
  {
    id: 1,
    question: "Care sunt cele mai populare cursuri de dans pentru adulți în București pentru începători?",
    answer: "Cele mai căutate cursuri de dans pentru adulți în București sunt cele de dansuri latino, populare și de societate, ideale pentru relaxare, socializare și dezvoltarea coordonării într-un mediu plăcut și prietenos."
  },
  {
    id: 2,
    question: "De ce merită să aleg cursuri de dans pentru adulți la În Pași de Dans?",
    answer: "Școala oferă grupe mici, instructori dedicați și programe adaptate nivelului fiecărui cursant, asigurând o evoluție reală și o atmosferă relaxată la fiecare lecție."
  },
  {
    id: 3,
    question: "Cât durează un program complet de cursuri de dans în București pentru adulți?",
    answer: "Durata diferă în funcție de nivel, dar fiecare etapă (începători, intermediari, avansați) se întinde pe câteva luni, permițând participanților să progreseze natural și constant."
  },
  {
    id: 4,
    question: "Pot participa singur la lecții de dans pentru adulți?",
    answer: "Da, înscrierea nu necesită partener; instructorii asigură rotația între cursanți pentru ca toată lumea să se simtă confortabil și să învețe corect pașii de bază."
  },
  {
    id: 5,
    question: "Ce stiluri se predau la cursurile de dans pentru adulți la școala În Pași de Dans?",
    answer: "La În Pași de Dans se predau dansuri de societate (vals, tango, foxtrot) și latino (salsa, bachata, rumba), potrivite atât pentru socializare, cât și pentru evenimente speciale, dar și dansuri populare, românești și internaționale."
  },
  {
    id: 6,
    question: "Care este frecvența recomandată pentru cursuri de dans pentru adulți în București?",
    answer: "Pentru rezultate vizibile, se recomandă două ședințe pe săptămână, fiecare durând o oră, într-un mediu activ și plin de energie pozitivă."
  },
  {
    id: 7,
    question: "Cât costă un abonament la cursuri de dans pentru adulți la școala În Pași de Dans?",
    answer: "Prețurile variază în funcție de pachet: abonamentele lunare oferă acces la 8 sau 16 ședințe, iar pentru lecții private există tarife separate adaptate nevoilor cursanților."
  },
  {
    id: 8,
    question: "Ce beneficii aduc lecțiile de dans în București pentru adulți pe termen lung?",
    answer: "Dansul îmbunătățește postura, coordonarea și tonusul general, reducând stresul și oferind o activitate socială plăcută și dinamică."
  },
  {
    id: 9,
    question: "Există vreo limită de vârstă pentru lecțiile de dans pentru adulți de la În Pași de Dans?",
    answer: "Nu, cursurile sunt deschise tuturor, indiferent de vârstă sau experiență, fiind structurate pentru a oferi o experiență relaxantă și potrivită pentru toată lumea."
  },
  {
    id: 10,
    question: "Cum pot să mă înscriu la un curs de dans pentru adulți la școala În Pași de Dans?",
    answer: "Înscrierea se face simplu, completând formularul online de pe site sau direct la recepția școlii, după care ești repartizat într-o grupă potrivită nivelului tău."
  }
];

export default function AdultDanceFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([1]); // Primul item deschis implicit

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Întrebări frecvente despre cursurile de dans pentru adulți
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {adultDanceFAQData.map((item) => (
            <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => toggleItem(item.id)}
              >
                <span className="font-semibold text-lg pr-4">{item.question}</span>
                {openItems.includes(item.id) ? (
                  <Minus className="h-5 w-5 text-red-600 flex-shrink-0" />
                ) : (
                  <Plus className="h-5 w-5 text-red-600 flex-shrink-0" />
                )}
              </button>
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
