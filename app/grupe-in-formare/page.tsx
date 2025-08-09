
import Head from './head';
import GrupeInFormareSection from '@/components/grupe-in-formare-section';
export default function GrupeInFormarePage() {
  

  return (
    <div className="container py-12">
      <Head />
      <h1 className="text-3xl font-bold mb-8 text-center">Grupe de dans în formare</h1>
      <h2>
        Dacă te gândești să te înscrii la un curs de dans, ai ajuns în locul
        potrivit. Iată grupele pentru care facem înscrieri în această perioadă!
      </h2>
      <GrupeInFormareSection />
      
    </div>
  );
}
