export default function FirstLessonsSection() {
  const lessons = [
    {
      nr: '1',
      titlu: 'Pașii de bază',
      desc: 'Contratimul în Salsa (1-2-3, 5-6-7) și pulsul în Bachata (1-2-3-4). Postură corectă, greutatea pe picioare și cum să asculți muzica.',
    },
    {
      nr: '2',
      titlu: 'Conexiunea în cuplu',
      desc: 'Lead & follow — cum îți ghidezi partenerul fără să-l forțezi. Poziția de dans în cuplu și primele mișcări comune.',
    },
    {
      nr: '3',
      titlu: 'Primele figuri',
      desc: 'Întoarcerea simplă (right turn) și figura CBL în Salsa. În Bachata: lateral și „close position". Primele combinații de 2–3 pași.',
    },
    {
      nr: '4',
      titlu: 'Muzicalitate',
      desc: 'Cum urmărești ritmul și breakul muzicii. Prima combinație completă dansată pe melodie. Ai baza — acum totul se construiește pe ea.',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">
        Ce înveți în primele 4 lecții de Salsa & Bachata
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
        Indiferent dacă nu ai dansat niciodată, după primele 4 lecții vei putea ține ritmul și
        dansa o combinație completă.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.nr}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-red-100 dark:border-red-900"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
              {lesson.nr}
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{lesson.titlu}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{lesson.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
