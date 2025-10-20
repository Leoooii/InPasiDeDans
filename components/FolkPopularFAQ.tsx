import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const folkPopularFAQData: FAQItem[] = [
  {
    id: 1,
    question: "Ce beneficii aduc dansurile populare practicate în cadrul școlii În Pași de Dans?",
    answer: "Participarea la dansurile populare ajută la menținerea tradițiilor românești vii, îmbunătățește coordonarea și oferă o activitate socială plină de energie și bucurie."
  },
  {
    id: 2,
    question: "Ce presupune un curs de dans popular pentru începători?",
    answer: "Un curs de dans popular pentru începători include învățarea pașilor de bază și a ritmurilor tradiționale din diferite regiuni, într-un mod accesibil și plin de voie bună."
  },
  {
    id: 3,
    question: "De ce merită să aleg cursuri de dansuri populare pentru adulți în București la școala În Pași de Dans?",
    answer: "Prin cursurile pe care le oferim, participanții redescoperă cultura românească, se relaxează și se conectează cu alți pasionați într-o atmosferă autentică și prietenoasă."
  },
  {
    id: 4,
    question: "Care este structura unui program de cursuri de dansuri populare în București?",
    answer: "Un modul include lecții săptămânale, exerciții de coordonare și repetiții coregrafice, adaptate nivelului fiecărui participant."
  },
  {
    id: 5,
    question: "Pot participa fără experiență la cursurile de dansuri populare pentru adulți în București la școala În Pași de Dans?",
    answer: "Da, dansurile populare sunt deschise tuturor, inclusiv celor fără experiență, instructorii adaptând ritmul și pașii în funcție de nivelul grupului."
  },
  {
    id: 6,
    question: "Ce zone folclorice se studiază în cadrul cursurilor de dansuri populare la școala În Pași de Dans?",
    answer: "Cursurile noastre de dansuri populare includ stiluri din regiuni diverse ale României - Ardeal, Oltenia, Moldova sau Muntenia - pentru o experiență completă."
  },
  {
    id: 7,
    question: "Care sunt beneficiile fizice aduse de participarea la cursurile de dansuri populare de la școala În Pași de Dans?",
    answer: "Practicarea unui dans popular contribuie la îmbunătățirea echilibrului, tonusului muscular și rezistenței fizice, fiind o formă excelentă de mișcare recreativă."
  },
  {
    id: 8,
    question: "Ce durată are un modul de cursuri de dansuri populare pentru adulți în București?",
    answer: "Un modul se desfășoară pe o perioadă de câteva luni, cu întâlniri săptămânale ce asigură progres constant."
  },
  {
    id: 9,
    question: "Este nevoie de echipament special pentru cursurile de dansuri populare de la școala În Pași de Dans?",
    answer: "Pentru cursurile noastre, se recomandă îmbrăcăminte comodă și încălțăminte flexibilă; costumele tradiționale sunt folosite doar la evenimente sau spectacole."
  },
  {
    id: 10,
    question: "Cum mă pot înscrie la cursurile de dansuri populare pentru adulți în București?",
    answer: "Înscrierea se face online, prin completarea formularului de pe site, sau direct la sediul școlii, în funcție de programul grupelor."
  }
];

export default function FolkPopularFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([1]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Întrebări frecvente despre dansurile populare</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {folkPopularFAQData.map(item => (
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
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
