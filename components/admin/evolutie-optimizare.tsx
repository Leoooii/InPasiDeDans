'use client';

import { useEffect, useState } from 'react';
import { Loader2, Rocket, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type Pereche = { inainte: number; dupa: number };
type Interval = { startDate: string; endDate: string };
type Bloc<T> = { zile: number; inainte: Interval; dupa: Interval; metrici: T } | null;

type Raspuns = {
  referinta: string;
  ga: Bloc<Record<'utilizatori' | 'sesiuni' | 'sesiuniOrganice' | 'sesiuniAi' | 'leaduri', Pereche>>;
  gsc: Bloc<Record<'clicuri' | 'afisari' | 'ctr' | 'pozitie', Pereche>>;
};

const RANDURI_GSC = [
  { k: 'clicuri', eticheta: 'Clicuri din Google' },
  { k: 'afisari', eticheta: 'Afișări în Google' },
  { k: 'ctr', eticheta: 'Rată de click (CTR, %)' },
  { k: 'pozitie', eticheta: 'Poziție medie', maiMicEMaiBine: true },
] as const;

const RANDURI_GA = [
  { k: 'sesiuniOrganice', eticheta: 'Vizite din căutări Google (organic)' },
  { k: 'sesiuniAi', eticheta: 'Vizite din asistenți AI (ChatGPT, Perplexity, Gemini…)' },
  { k: 'utilizatori', eticheta: 'Utilizatori' },
  { k: 'sesiuni', eticheta: 'Sesiuni' },
  { k: 'leaduri', eticheta: 'Formulare trimise (lead-uri)' },
] as const;

const fmtData = (d: string) => new Date(`${d}T00:00:00`).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' });
const fmtNr = (n: number) => n.toLocaleString('ro-RO', { maximumFractionDigits: 1 });

function Variatie({ p, maiMicEMaiBine }: { p: Pereche; maiMicEMaiBine?: boolean }) {
  if (!p.inainte) return <span className="text-xs text-slate-400">{p.dupa ? 'nou' : '—'}</span>;
  const pct = Math.round(((p.dupa - p.inainte) / p.inainte) * 100);
  const bine = maiMicEMaiBine ? pct <= 0 : pct >= 0;
  const Icon = pct >= 0 ? TrendingUp : TrendingDown;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${bine ? 'text-emerald-600' : 'text-rose-600'}`}>
      <Icon className="h-3 w-3" />
      {pct >= 0 ? '+' : ''}
      {pct}%
    </span>
  );
}

function Tabel<K extends string>({
  titlu,
  sursa,
  bloc,
  randuri,
}: {
  titlu: string;
  sursa: string;
  bloc: Bloc<Record<K, Pereche>>;
  randuri: readonly { k: K; eticheta: string; maiMicEMaiBine?: boolean }[];
}) {
  if (!bloc) {
    return (
      <div className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-500">
        <span className="font-medium text-slate-700">{titlu}:</span> datele după optimizare încep să se adune în
        zilele următoare ({sursa}).
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
            <th className="py-2 pr-3 font-medium">{titlu}</th>
            <th className="py-2 px-3 font-medium text-right whitespace-nowrap">
              Înainte ({fmtData(bloc.inainte.startDate)} – {fmtData(bloc.inainte.endDate)})
            </th>
            <th className="py-2 px-3 font-medium text-right whitespace-nowrap">
              După ({fmtData(bloc.dupa.startDate)} – {fmtData(bloc.dupa.endDate)})
            </th>
            <th className="py-2 pl-3 font-medium text-right">Variație</th>
          </tr>
        </thead>
        <tbody>
          {randuri.map(r => (
            <tr key={r.k} className="border-b border-slate-50 last:border-0">
              <td className="py-2 pr-3 text-slate-700">{r.eticheta}</td>
              <td className="py-2 px-3 text-right tabular-nums text-slate-500">{fmtNr(bloc.metrici[r.k].inainte)}</td>
              <td className="py-2 px-3 text-right tabular-nums font-semibold text-slate-900">{fmtNr(bloc.metrici[r.k].dupa)}</td>
              <td className="py-2 pl-3 text-right"><Variatie p={bloc.metrici[r.k]} maiMicEMaiBine={r.maiMicEMaiBine} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function EvolutieOptimizare({ token }: { token: string }) {
  const [date, setDate] = useState<Raspuns | null>(null);
  const [eroare, setEroare] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/evolutie', { method: 'POST', headers: { 'x-analytics-token': token } })
      .then(async r => (r.ok ? setDate(await r.json()) : setEroare('Nu am putut încărca evoluția.')))
      .catch(() => setEroare('Nu am putut încărca evoluția.'));
  }, [token]);

  return (
    <Card>
      <CardContent className="p-4 sm:p-5 space-y-4">
        <div className="flex items-start gap-2">
          <Rocket className="h-4 w-4 mt-0.5 text-orange-500" />
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Evoluție după optimizarea SEO și AI</h2>
            <p className="text-xs text-slate-500">
              Același număr de zile înainte și după 24 septembrie 2026. Efectele în Google apar de obicei în 2–6
              săptămâni. Afișările de pagini nu sunt comparate: până atunci GA4 le număra de două ori.
            </p>
          </div>
        </div>
        {eroare ? (
          <p className="text-sm text-rose-600">{eroare}</p>
        ) : !date ? (
          <div className="flex justify-center py-6 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : (
          <div className="space-y-5">
            <Tabel titlu="Google Search Console" sursa="Search Console are o întârziere de ~3 zile" bloc={date.gsc} randuri={RANDURI_GSC} />
            <Tabel titlu="Google Analytics 4" sursa="GA4 raportează ziua de ieri" bloc={date.ga} randuri={RANDURI_GA} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
