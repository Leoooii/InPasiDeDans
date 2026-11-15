import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Navigation, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Instructor } from '@/lib/types';

const ADRESA = 'Calea Rahovei 262, sector 5, București';
const HARTA = 'https://www.google.com/maps/search/?api=1&query=Calea+Rahovei+262+Sector+5+Bucuresti+Romania';
const DIRECTII = 'https://www.google.com/maps/dir/?api=1&destination=Calea+Rahovei+262+Sector+5+Bucuresti+Romania';

// Prima pagină: cine predă și unde — cele două întrebări puse înainte de înscriere.
export default function EchipaSiLocatie({ instructori }: { instructori: Instructor[] | null }) {
  const echipa = (instructori ?? []).filter(i => i.imageUrl).slice(0, 8);

  return (
    <section id="echipa" className="bg-slate-950 py-16 text-white">
      <div className="container grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white/60">Echipa</p>
          <h2 className="text-3xl font-bold md:text-4xl">Instructorii care te învață</h2>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            Dansatori și coregrafi cu experiență în dansuri latino, de societate, populare și sportive.
          </p>

          {echipa.length > 0 && (
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
              {echipa.map(i => (
                <li key={i.id} className="text-center">
                  <div className="relative mx-auto aspect-square w-24 overflow-hidden rounded-full ring-2 ring-white/10 md:w-28">
                    <Image src={i.imageUrl} alt={i.name} fill sizes="112px" className="object-cover" />
                  </div>
                  <p className="mt-3 text-sm font-semibold">{i.name}</p>
                  {i.role && <p className="mt-0.5 line-clamp-2 text-xs text-white/70">{i.role}</p>}
                </li>
              ))}
            </ul>
          )}

          <Link
            href="/instructori"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-300 hover:text-orange-200"
          >
            Cunoaște toată echipa <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white/60">Unde dansăm</p>
          <h3 className="text-2xl font-bold">3 săli de dans în sectorul 5</h3>
          <ul className="mt-5 space-y-4 text-white/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" aria-hidden />
              <span>{ADRESA}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" aria-hidden />
              <span>
                <a href="tel:+40722675126" className="font-semibold text-white hover:text-orange-300">0722 675 126</a>
                <span className="block text-sm text-white/70">Vizitele se fac pe bază de programare.</span>
              </span>
            </li>
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button variant="outlineLight" className="w-full" asChild>
              <a href={DIRECTII} target="_blank" rel="noopener noreferrer">
                <Navigation className="mr-2 h-4 w-4" aria-hidden /> Direcții
              </a>
            </Button>
            <Button variant="outlineLight" className="w-full" asChild>
              <a href={HARTA} target="_blank" rel="noopener noreferrer">
                <MapPin className="mr-2 h-4 w-4" aria-hidden /> Vezi pe hartă
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
