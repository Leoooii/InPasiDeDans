export default function BenefitsSection() {
  const benefits = [
    {
      icon: "👥",
      title: "Nu ai nevoie de partener",
      description: "Folosim sistem de rotație a partenerilor, astfel încât poți începe singur(ă) și totuși să exersezi eficient în cuplu."
    },
    {
      icon: "😊",
      title: "Atmosferă prietenoasă",
      description: "Grupuri primitoare, fără presiune. Înveți relaxat(ă), cu feedback clar și răbdare din partea instructorilor."
    },
    {
      icon: "🎵",
      title: "Evenimente & Dance Parties",
      description: "Ocazii regulate de dans social pentru a pune în practică ce înveți și a-ți crește încrederea pe ring."
    },
    {
      icon: "🏆",
      title: "Instructori specializați",
      description: "Echipă cu experiență în Salsa (Cuban/NY) și Bachata (Dominican/Moderna/Sensual), axată pe progresul tău real."
    },
    {
      icon: "⏱️",
      title: "Structură & progres",
      description: "Program pe niveluri (începători/intermediari), 2×/săptămână, combinații graduale, muzicalitate și styling."
    },
    {
      icon: "📍",
      title: "Acces ușor în București",
      description: "Locație accesibilă în sector 5, cu rute simple din sector 6; aproape de transport public și repere cunoscute."
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white mb-8">
        De ce să alegi cursurile de Salsa & Bachata la În Pași de Dans?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="text-4xl mb-4 text-center">{benefit.icon}</div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">
              {benefit.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-center">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
