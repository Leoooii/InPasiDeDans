import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Actiune = { href: string; label: string };

// Banda de îndemn de la finalul paginilor („Înscrie-te…"), cu sau fără imagine.
export default function CtaBanner({
  titlu,
  text,
  primar = { href: '/inscriere', label: 'Înscrie-te acum' },
  secundar = { href: '/contact', label: 'Contactează-ne' },
  imagine,
  className = 'mt-12',
}: {
  titlu: string;
  text: string;
  primar?: Actiune;
  secundar?: Actiune | null;
  imagine?: { src: string; alt: string };
  className?: string;
}) {
  const butoane = (
    <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 ${imagine ? '' : 'justify-center'}`}>
      <Button variant="brand" size="lg" className="w-full sm:w-auto" asChild>
        <Link href={primar.href}>{primar.label}</Link>
      </Button>
      {secundar && (
        <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
          <Link href={secundar.href}>{secundar.label}</Link>
        </Button>
      )}
    </div>
  );

  return (
    <div className={`rounded-2xl bg-red-50 p-6 sm:p-8 ${className}`}>
      {imagine ? (
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{titlu}</h2>
            <p>{text}</p>
            {butoane}
          </div>
          <div className="relative h-80 w-full overflow-hidden rounded-xl">
            <Image src={imagine.src} alt={imagine.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold">{titlu}</h2>
          <p className="text-sm sm:text-base">{text}</p>
          {butoane}
        </div>
      )}
    </div>
  );
}
