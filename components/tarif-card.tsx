'use client';

import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePublicData } from '@/components/public-data-provider';
import { TARIFE_REZERVA } from '@/lib/tarife-fallback';
import type { Tarif } from '@/lib/types';

// Tarifele unei categorii: din Firestore (citite pe server), altfel copia de rezervă.
export function useTarife(categorie: Tarif['categorie']): Tarif[] {
  const { tarife } = usePublicData();
  return tarife?.[categorie].length ? tarife[categorie] : TARIFE_REZERVA[categorie];
}

type Varianta = 'gradient' | 'alb';

/**
 * Card complet (titlu, descriere, preț, beneficii).
 * - `gradient`: antet roșu-portocaliu cu prețul (abonamente, /tarife)
 * - `alb`: card alb cu bandă „★ Cel mai popular" (pachete private)
 */
export function TarifCard({ tarif, varianta = 'gradient' }: { tarif: Tarif; varianta?: Varianta }) {
  if (varianta === 'gradient') {
    return (
      <Card className="flex h-full flex-col overflow-hidden border-red-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
          <CardTitle>{tarif.titlu}</CardTitle>
          {tarif.descriere && <CardDescription className="text-white/90">{tarif.descriere}</CardDescription>}
          <div className="mt-4 text-4xl font-bold">
            {tarif.pret} {tarif.moneda}
          </div>
        </CardHeader>
        <CardContent className="mt-2 flex-1 p-6">
          <ul className="space-y-2">
            {tarif.beneficii.map((b, i) => (
              <li key={i} className="flex items-start">
                <Check className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-orange-500" aria-label="Inclus" />
                <span className="text-sm leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`relative h-full overflow-hidden border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${
        tarif.popular ? 'border-red-500 shadow-lg shadow-red-100' : 'border-slate-200 shadow-sm'
      }`}
    >
      {tarif.popular && (
        <div className="bg-gradient-to-r from-red-600 to-orange-500 px-4 py-2 text-center text-sm font-semibold tracking-wide text-white">
          ★ Cel mai popular
        </div>
      )}
      <CardContent className="p-7">
        <h3 className="mb-1 text-lg font-bold text-slate-900">{tarif.titlu}</h3>
        {tarif.descriere && <p className="mb-4 text-sm text-slate-500">{tarif.descriere}</p>}
        <div className="mb-6 flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-slate-900">{tarif.pret}</span>
          <span className="text-lg font-medium text-slate-500">{tarif.moneda}</span>
        </div>
        {tarif.beneficii.length > 0 && (
          <ul className="space-y-3">
            {tarif.beneficii.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100">
                  <Check className="h-3 w-3 text-orange-600" aria-label="Inclus" />
                </span>
                <span className="text-sm leading-snug text-slate-700">{b}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

/** Dală albă compactă: titlu, descriere, preț (fără beneficii). */
export function TarifTile({ tarif }: { tarif: Tarif }) {
  return (
    <div className="rounded-2xl border-2 border-slate-100 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="mb-1 font-bold text-slate-900">{tarif.titlu}</h3>
      {tarif.descriere && <p className="mb-4 text-sm text-slate-500">{tarif.descriere}</p>}
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-slate-900">{tarif.pret}</span>
        <span className="text-base font-medium text-slate-500">{tarif.moneda}</span>
      </div>
    </div>
  );
}

/** Bandă orizontală gradient, pentru tarifele doar cu preț. */
export function TarifBanda({ tarif }: { tarif: Tarif }) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-lg border border-red-600 bg-gradient-to-r from-red-600 to-orange-500 px-6 py-5 text-white shadow-lg">
      <div className="min-w-0">
        <p className="text-lg font-semibold">{tarif.titlu}</p>
        {tarif.descriere && <p className="mt-0.5 text-sm text-white/90">{tarif.descriere}</p>}
      </div>
      <div className="shrink-0 text-3xl font-bold">
        {tarif.pret} {tarif.moneda}
      </div>
    </div>
  );
}
