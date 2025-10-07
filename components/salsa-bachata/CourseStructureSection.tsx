export default function CourseStructureSection() {
  const levels = [
    {
      level: "Nivel 1",
      title: "Începători",
      items: [
        "Învățarea pașilor de bază pentru Salsa și Bachata.",
        "Noțiuni de postură, conexiune și ritm.",
        "Primele combinații simple și mișcări în cuplu.",
        "Durată recomandată: minim 4 luni, 2×/săptămână."
      ]
    },
    {
      level: "Nivel 2",
      title: "Intermediari",
      items: [
        "Combinații variate și tehnici de rotație.",
        "Muzicalitate și interpretare coregrafică.",
        "Introducere în styling și mișcări fluide.",
        "Durată recomandată: 4-12 luni, 2×/săptămână."
      ]
    },
    {
      level: "Nivel 3",
      title: "Avansați",
      items: [
        "Tehnici complexe de spins, styling și body movement.",
        "Exprimare personală și eleganță în dans.",
        "Participare la workshopuri și evenimente externe.",
        "Durată flexibilă, progres continuu."
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Structura cursurilor de Salsa & Bachata
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 max-w-4xl mx-auto">
          Cursurile noastre sunt gândite pentru a-ți oferi o evoluție naturală și sigură, pas cu pas, indiferent de nivelul de la care pornești.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
          Fiecare grupă are între <strong className="text-red-600 dark:text-red-400">16–20 de cursanți</strong>, suficient pentru a simți energia dansului, dar și pentru a primi atenție individuală de la instructori.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center mb-4">
              <span className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-full mb-3">
                {level.level}
              </span>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                {level.title}
              </h4>
            </div>
            
            <ul className="space-y-2">
              {level.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-gray-600 dark:text-gray-400 text-sm flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
          Indiferent de nivel, fiecare curs este o experiență plină de energie, comunitate și bucurie. Progresul se construiește treptat, cu sprijinul instructorilor noștri dedicați.
        </p>
      </div>
    </div>
  );
}
