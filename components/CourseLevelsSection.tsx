import React from 'react';

export default function CourseLevelsSection() {
  return (
    <div id="structura-niveluri" className="p-0 container flex flex-col gap-8">
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-xl border border-purple-100">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
         Structură și niveluri de cursuri
         </h2>
        
        <div className="text-center mb-10">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            La În Pași de Dans, cursurile sunt organizate în grupe de 16–20 de persoane, suficient de mari pentru a crea energie și dinamism, dar și suficient de reduse pentru ca fiecare cursant să primească atenția de care are nevoie.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mt-4">
          Fiecare grupă de dansuri latino și de societate are două ședințe pe săptămână, astfel încât să ai timp să înveți, să repeți și să fixezi pașii de dans învățați.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mt-4">
            Poți învăța și evolua în ritmul tău, fără presiunea timpului. Tot ce contează este să faci pași constanți înainte și să te bucuri de fiecare moment pe ringul de dans.
          </p>
        </div>

        <div className="mb-10">
          <h3 className="text-xl md:text-2xl font-semibold text-center text-gray-800 mb-6">
            Pentru a sprijini o evoluție firească și bine organizată, am împărțit cursurile noastre de dans pe niveluri:
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-green-400 rounded-full mr-3"></div>
              <h4 className="text-xl font-bold text-gray-800">Începători</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Primești o programă special creată, ce combină 3 stiluri de dans (latino și de societate) pe parcursul a câteva luni. Astfel, capeți o bază solidă, exersezi coordonarea, pașii fundamentali și primele combinații. Ulterior, în funcție de preferințele grupului, programa se poate ajusta: se pot adăuga sau scoate stiluri de dans latino și/sau de societate.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3"></div>
              <h4 className="text-xl font-bold text-gray-800">Intermediari</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Descoperi combinații mai variate și coregrafii mai dinamice. În această etapă pui accent pe muzicalitate, ritm și fluiditate, astfel încât mișcările tale să devină mai naturale și expresive.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-red-400 rounded-full mr-3"></div>
              <h4 className="text-xl font-bold text-gray-800">Avansați</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Aprofundezi tehnici complexe, lucrând la stil personal, eleganță și expresivitate. Înveți elemente de styling, interpretare muzicală și rafinament în execuție, pentru a te bucura pe deplin de libertatea dansului.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Indiferent de nivel, fiecare curs este o experiență plină de energie, comunitate și bucurie, iar progresul se construiește treptat, cu sprijinul instructorilor noștri dedicați.
          </p>
        </div>
      </div>
    </div>
  );
}
