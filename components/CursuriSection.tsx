import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CursItem {
  id: number;
  title: string;
  href: string;
  imageSrc: string;
  description?: string;
}

const cursuriData: CursItem[] = [
  {
    id: 1,
    title: "Cursuri de dans pentru adulți",
    href: "/cursuri-dans-adulti",
    imageSrc: "/images/bachata.png",
    description: "Învață dansuri latino, de societate și populare"
  },
  {
    id: 2,
    title: "Cursuri de dans pentru copii",
    href: "/cursuri-dans-copii",
    imageSrc: "/images/copii.jpeg",
    description: "Dezvoltă coordonarea și ritmul la copii"
  },
  {
    id: 3,
    title: "Lecții private",
    href: "/lectii-private",
    imageSrc: "/images/private2.png",
    description: "Instruire personalizată pentru progres rapid"
  },
  {
    id: 4,
    title: "Grupe pentru începători",
    href: "/grupe-in-formare",
    imageSrc: "/images/grupenoi.png",
    description: "Vezi grupele noi și pe cele cu locuri libere"
  },
  {
    id: 5,
    title: "Tarife",
    href: "/tarife",
    imageSrc: "/images/tarife.png",
    description: "Vezi prețurile și abonamentele disponibile"
  },
  {
    id: 6,
    title: "Program",
    href: "/program",
    imageSrc: "/images/program.png",
    description: "Programul cursurilor și grupelor"
  }
];

function CardCurs({ curs }: { curs: CursItem }) {
  return (
    <div className="relative group cursor-pointer">
      {/* Imaginea principală */}
      <div className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-orange-400/60">
        <div className="relative w-full h-52 md:h-56 lg:h-64">
          <Image
            src={curs.imageSrc}
            alt={curs.title}
            fill
            sizes="(max-width: 768px) 72vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Overlay gradient pentru text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Conținutul text peste imagine */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
          <h3 className="text-white text-sm md:text-xl font-bold mb-1 md:mb-2">
            {curs.title}
          </h3>
          {curs.description && (
            <p className="text-white/90 text-xs md:text-sm line-clamp-2">
              {curs.description}
            </p>
          )}
        </div>
      </div>

      {/* Buton "Află mai multe" sub imagine */}
      <div className="mt-3 text-center">
        <div className="inline-flex items-center justify-center text-white/70 group-hover:text-orange-400 transition-colors duration-300">
          <span className="text-xs md:text-sm font-medium mr-2">
            Află mai multe
          </span>
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Link overlay pentru navigare */}
      <Link href={curs.href} aria-label={curs.title} className="absolute inset-0 z-10" />
    </div>
  );
}

// Grilă statică pe desktop; pe telefon, rând glisabil cu următorul card vizibil pe jumătate
// (fără carusel cu autoplay: nu mai mută conținutul sub degetul vizitatorului și nu costă JS).
export default function CursuriSection() {
  return (
    <section id="cursuri" className="pb-14 pt-16 bg-slate-950">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-2">
            Descoperă cursurile
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Cursuri de Dans în București
          </h2>
        </div>

        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {cursuriData.map(curs => (
            <li key={curs.id} className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-auto">
              <CardCurs curs={curs} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
