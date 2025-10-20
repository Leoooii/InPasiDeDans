'use client'

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const childrenDanceFAQData: FAQItem[] = [
  {
    id: 1,
    question: "Care este vârsta minimă pentru înscrierea la cursurile de dans pentru copii?",
    answer: "Copiii pot începe cursurile de dans de la vârsta de 7 ani, atunci când pot urma instrucțiunile și pot învăța coregrafii simple într-un mod distractiv și sigur."
  },
  {
    id: 2,
    question: "Ce stiluri sunt incluse la cursurile de dans pentru copii de la școala În Pași de Dans?",
    answer: "În cadrul cursurilor de dans pentru copii, micii dansatori învață dansuri precum cha cha, jive, vals lent și quick step, dezvoltându-și postura, coordonarea și simțul ritmului."
  },
  {
    id: 3,
    question: "Cât durează un program complet la cursurile de dans pentru copii din București?",
    answer: "Un modul are loc pe parcursul a mai multor luni, cu lecții săptămânale ce urmăresc progresul natural al fiecărui copil."
  },
  {
    id: 4,
    question: "De ce să aleg cursuri de dans pentru copii în București la În Pași de Dans?",
    answer: "Școala oferă un mediu cald și motivant, cu instructori pasionați care transformă cursurile de dans pentru copii într-o experiență educativă și plină de bucurie."
  },
  {
    id: 5,
    question: "Ce beneficii aduc cursurile de dansuri populare pentru copii în București?",
    answer: "Participarea la cursuri de dansuri populare ajută copiii să descopere tradițiile românești, să-și îmbunătățească echilibrul și să își dezvolte spiritul de echipă."
  },
  {
    id: 6,
    question: "Cât costă participarea la lecții de dans pentru copii la școala În Pași de Dans?",
    answer: "Prețul variază în funcție de abonament, iar pachetele lunare includ de la 4 la 12 ședințe interactive și pline de energie."
  },
  {
    id: 7,
    question: "Pot părinții asista la cursurile de dans pentru copii?",
    answer: "Da, părinții pot urmări ocazional cursurile, pentru a vedea progresul micilor dansatori și pentru a-i susține emoțional."
  },
  {
    id: 8,
    question: "Cum se desfășoară o ședință tipică din cursurile de dans pentru copii?",
    answer: "Fiecare lecție începe cu exerciții de încălzire, urmate de învățarea pașilor de bază și se încheie cu momente de repetiție și jocuri ritmice."
  },
  {
    id: 9,
    question: "Ce echipament este necesar pentru participarea la cursurile de dans pentru copii de la școala În Pași de Dans?",
    answer: "Recomandăm haine lejere, încălțăminte confortabilă și o atitudine pozitivă, pregătită pentru mișcare și distracție."
  },
  {
    id: 10,
    question: "Cum pot înscrie copilul la cursurile de dans pentru copii din București la școala În Pași de Dans?",
    answer: "Înscrierea se poate face online, completând formularul disponibil pe site, sau direct la sediul școlii, în funcție de grupa și programul dorit."
  }
];

export default function ChildrenDanceFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([1]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Întrebări frecvente despre cursurile de dans pentru copii</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {childrenDanceFAQData.map(item => (
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
