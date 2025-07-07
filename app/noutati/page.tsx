import NoutatiSection from '@/components/noutati-section';

export default function NoutatiPage() {
  return (
    <div className="container mx-auto py-16 px-4 md:px-0">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Noutăți de la Școala de Dans În Pași de Dans
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
        Află cele mai recente evenimente, cursuri și spectacole organizate de
        Școala de Dans În Pași de Dans. Fii la curent cu toate noutățile din
        lumea dansului și alătură-te comunității noastre pasionate!
      </p>
      <NoutatiSection />
    </div>
  );
}
