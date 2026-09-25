'use client';

import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Input } from '@/components/ui/input';
import { azi } from '@/lib/evidenta/date';
import type { Abonament } from '@/lib/evidenta/tipuri';
import { useEvidenta } from './context';
import { Gol, Incarcare, Panou } from './ui';

// Încasările din abonamente (prețul salvat la vânzare), pe luni.

const CULOARE = '#dc2626'; // o singură serie: roșul școlii (validat pe fundal deschis)
const LUNI_SCURT = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const LUNI = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
const lei = (n: number) => `${n.toLocaleString('ro-RO')} lei`;
const numeLuna = (l: string) => `${LUNI[Number(l.slice(5, 7)) - 1]} ${l.slice(0, 4)}`;

function luniInapoi(ultima: string, n: number): string[] {
  const [y, m] = ultima.split('-').map(Number);
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(Date.UTC(y, m - 1 - (n - 1 - i), 1));
    return d.toISOString().slice(0, 7);
  });
}

function grupeaza(lista: Abonament[], cheie: (a: Abonament) => string) {
  const m = new Map<string, { nr: number; suma: number }>();
  for (const a of lista) {
    const k = cheie(a);
    const v = m.get(k) ?? { nr: 0, suma: 0 };
    m.set(k, { nr: v.nr + 1, suma: v.suma + (a.pret || 0) });
  }
  return [...m.entries()].map(([nume, v]) => ({ nume, ...v })).sort((a, b) => b.suma - a.suma);
}

export function Incasari() {
  const { abonamente, loading } = useEvidenta();
  const [luna, setLuna] = useState(azi().slice(0, 7));
  const [tabel, setTabel] = useState(false);

  const valide = useMemo(() => abonamente.filter(a => !a.anulat), [abonamente]);
  const peLuni = useMemo(
    () =>
      luniInapoi(luna, 12).map(l => {
        const lista = valide.filter(a => a.dataVanzare.startsWith(l));
        return { luna: l, eticheta: `${LUNI_SCURT[Number(l.slice(5, 7)) - 1]}`, suma: lista.reduce((s, a) => s + (a.pret || 0), 0), nr: lista.length };
      }),
    [valide, luna],
  );

  if (loading) return <Incarcare />;

  const dinLuna = valide.filter(a => a.dataVanzare.startsWith(luna));
  const total = dinLuna.reduce((s, a) => s + (a.pret || 0), 0);
  const anterioara = peLuni[peLuni.length - 2];
  const diferenta = anterioara?.suma ? Math.round(((total - anterioara.suma) / anterioara.suma) * 100) : null;

  const sectiuni = [
    { titlu: 'Pe tip de abonament', randuri: grupeaza(dinLuna, a => a.tip) },
    { titlu: 'Adulți / copii', randuri: grupeaza(dinLuna, a => (a.categorie === 'copii' ? 'Copii' : 'Adulți')) },
    { titlu: 'Cine a înregistrat', randuri: grupeaza(dinLuna, a => a.createdBy?.nume ?? '—') },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Încasări</h1>
          <p className="text-sm text-slate-500">Din abonamentele înregistrate în evidență (prețul de la vânzare; cele anulate nu intră).</p>
        </div>
        <Input type="month" className="h-10 w-44 bg-white" value={luna} max={azi().slice(0, 7)} onChange={e => e.target.value && setLuna(e.target.value)} aria-label="Luna" />
      </div>

      {/* cifrele lunii */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">Încasat în {numeLuna(luna)}</p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-slate-900">{lei(total)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">Abonamente vândute</p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-slate-900">{dinLuna.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">Față de luna anterioară</p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-slate-900">
            {diferenta === null ? '—' : `${diferenta > 0 ? '▲ +' : diferenta < 0 ? '▼ ' : ''}${diferenta}%`}
          </p>
          {anterioara && <p className="text-xs text-slate-500">{lei(anterioara.suma)} în {numeLuna(anterioara.luna)}</p>}
        </div>
      </div>

      {/* ultimele 12 luni */}
      <Panou
        titlu="Ultimele 12 luni"
        actiune={
          <button className="text-xs font-medium text-slate-600 underline-offset-2 hover:underline" onClick={() => setTabel(!tabel)}>
            {tabel ? 'Vezi graficul' : 'Vezi ca tabel'}
          </button>
        }
      >
        {tabel ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500">
                <th className="py-1.5 font-medium">Luna</th>
                <th className="py-1.5 text-right font-medium">Abonamente</th>
                <th className="py-1.5 text-right font-medium">Încasat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...peLuni].reverse().map(l => (
                <tr key={l.luna}>
                  <td className="py-1.5 capitalize text-slate-700">{numeLuna(l.luna)}</td>
                  <td className="py-1.5 text-right tabular-nums text-slate-700">{l.nr}</td>
                  <td className="py-1.5 text-right font-medium tabular-nums text-slate-900">{lei(l.suma)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peLuni} margin={{ top: 8, right: 4, left: 0, bottom: 0 }} onClick={e => e?.activeLabel && setLuna(peLuni.find(l => l.eticheta === e.activeLabel)?.luna ?? luna)}>
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeWidth={1} />
                <XAxis dataKey="eticheta" tickLine={false} axisLine={{ stroke: '#cbd5e1' }} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tickLine={false} axisLine={false} width={48} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={v => (v >= 1000 ? `${Math.round(v / 100) / 10}k` : String(v))} />
                <Tooltip
                  cursor={{ fill: '#f1f5f9' }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as (typeof peLuni)[number];
                    return (
                      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
                        <p className="font-semibold capitalize text-slate-900">{numeLuna(d.luna)}</p>
                        <p className="text-slate-700">{lei(d.suma)}</p>
                        <p className="text-slate-500">
                          {d.nr} {d.nr === 1 ? 'abonament' : 'abonamente'}
                        </p>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="suma" radius={[4, 4, 0, 0]} maxBarSize={24} isAnimationActive={false} className="cursor-pointer">
                  {peLuni.map(l => (
                    <Cell key={l.luna} fill={CULOARE} fillOpacity={l.luna === luna ? 1 : 0.45} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        <p className="mt-2 text-xs text-slate-500">Apasă pe o lună din grafic ca să vezi detaliile ei mai jos.</p>
      </Panou>

      {dinLuna.length === 0 ? (
        <Gol>Niciun abonament înregistrat în {numeLuna(luna)}.</Gol>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3 [&>*]:min-w-0">
          {sectiuni.map(sec => (
            <Panou key={sec.titlu} titlu={sec.titlu}>
              <ul className="space-y-3">
                {sec.randuri.map(r => (
                  <li key={r.nume}>
                    <div className="flex items-baseline justify-between gap-2 text-sm">
                      <span className="min-w-0 truncate text-slate-700">{r.nume}</span>
                      <span className="shrink-0 font-semibold tabular-nums text-slate-900">{lei(r.suma)}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full" style={{ width: `${total ? (r.suma / total) * 100 : 0}%`, background: CULOARE }} />
                      </div>
                      <span className="w-20 shrink-0 text-right text-xs text-slate-500">
                        {r.nr} {r.nr === 1 ? 'abonament' : 'abon.'}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </Panou>
          ))}
        </div>
      )}
    </div>
  );
}
