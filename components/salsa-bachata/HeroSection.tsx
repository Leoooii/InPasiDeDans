import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl p-8 md:p-12 text-center shadow-lg border border-red-200 dark:border-red-800">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
        Cursuri Salsa & Bachata în București
      </h1>
      
      <div className="space-y-4 mb-8">
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
          Descoperă <strong className="text-red-600 dark:text-red-400">cursuri de salsa și bachata în București</strong>, create pentru <strong className="text-red-600 dark:text-red-400">începători și intermediari</strong>. Indiferent dacă vrei să înveți pașii de bază sau să îți perfecționezi tehnica, te așteptăm cu o atmosferă relaxată, prietenoasă și plină de energie.
        </p>
        
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
          <strong className="text-red-600 dark:text-red-400">Înscrie-te acum la cursurile noastre de Salsa și Bachata din sector 5 & sector 6 București</strong> și bucură-te de lecții interactive, instructori cu experiență și o comunitate pasionată de dans.
        </p>
      </div>
      
      <Link 
        href="#inscriere" 
        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        Înscrie-te la curs
      </Link>
    </div>
  );
}
