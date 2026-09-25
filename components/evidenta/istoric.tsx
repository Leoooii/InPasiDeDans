'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Archive,
  CalendarCheck,
  CalendarX,
  CreditCard,
  KeyRound,
  Pencil,
  Trash2,
  UserMinus,
  UserPlus,
  Users,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { avertizari } from '@/lib/evidenta/abonament';
import { dataLunga, oraDin, ziuaDin } from '@/lib/evidenta/date';
import { incarcaJurnal } from '@/lib/evidenta/repo';
import type { IntrareJurnal, TipJurnal } from '@/lib/evidenta/tipuri';
import { cn } from '@/lib/utils';
import { useEvidenta } from './context';
import { potrivire } from './dialog-cursant';
import { Chip, Gol, Incarcare } from './ui';

const TIPURI: Record<TipJurnal, { icon: LucideIcon; culoare: string; categorie: Categorie }> = {
  cursant_adaugat: { icon: UserPlus, culoare: 'bg-emerald-100 text-emerald-700', categorie: 'cursanti' },
  cursant_modificat: { icon: Pencil, culoare: 'bg-slate-100 text-slate-600', categorie: 'cursanti' },
  cursant_arhivat: { icon: Archive, culoare: 'bg-slate-100 text-slate-600', categorie: 'cursanti' },
  cursant_sters: { icon: Trash2, culoare: 'bg-red-100 text-red-700', categorie: 'cursanti' },
  adaugat_in_grupa: { icon: Users, culoare: 'bg-emerald-100 text-emerald-700', categorie: 'cursanti' },
  scos_din_grupa: { icon: UserMinus, culoare: 'bg-slate-100 text-slate-600', categorie: 'cursanti' },
  abonament_creat: { icon: CreditCard, culoare: 'bg-sky-100 text-sky-700', categorie: 'abonamente' },
  abonament_anulat: { icon: XCircle, culoare: 'bg-red-100 text-red-700', categorie: 'abonamente' },
  prezenta_salvata: { icon: CalendarCheck, culoare: 'bg-emerald-100 text-emerald-700', categorie: 'prezenta' },
  prezenta_anulata: { icon: CalendarX, culoare: 'bg-slate-100 text-slate-600', categorie: 'prezenta' },
  prezenta_neacoperita: { icon: AlertTriangle, culoare: 'bg-red-100 text-red-700', categorie: 'alerte' },
  cont_instructor: { icon: KeyRound, culoare: 'bg-violet-100 text-violet-700', categorie: 'conturi' },
  abonament_expira: { icon: AlertTriangle, culoare: 'bg-amber-100 text-amber-700', categorie: 'alerte' },
  abonament_expirat: { icon: AlertTriangle, culoare: 'bg-red-100 text-red-700', categorie: 'alerte' },
  abonament_epuizat: { icon: AlertTriangle, culoare: 'bg-red-100 text-red-700', categorie: 'alerte' },
};

type Categorie = 'toate' | 'prezenta' | 'abonamente' | 'cursanti' | 'alerte' | 'conturi';
const CATEGORII: { cod: Categorie; eticheta: string }[] = [
  { cod: 'toate', eticheta: 'Toate' },
  { cod: 'alerte', eticheta: 'Avertizări' },
  { cod: 'prezenta', eticheta: 'Prezență' },
  { cod: 'abonamente', eticheta: 'Abonamente' },
  { cod: 'cursanti', eticheta: 'Cursanți' },
  { cod: 'conturi', eticheta: 'Conturi' },
];

/** Istoricul acțiunilor (cine, ce, când), cu avertizările de expirare calculate la zi. */
export function Istoric({ linkProfil }: { linkProfil: (id: string) => string }) {
  const { abonamente, grupe } = useEvidenta();
  const [jurnal, setJurnal] = useState<IntrareJurnal[] | null>(null);
  const [categorie, setCategorie] = useState<Categorie>('toate');
  const [autor, setAutor] = useState('');
  const [grupaId, setGrupaId] = useState('');
  const [q, setQ] = useState('');
  const [deLa, setDeLa] = useState('');
  const [panaLa, setPanaLa] = useState('');
  const [cate, setCate] = useState(100);

  useEffect(() => {
    incarcaJurnal(2000)
      .then(setJurnal)
      .catch(e => {
        console.error(e);
        setJurnal([]);
      });
  }, []);

  const toate = useMemo(
    () => [...(jurnal ?? []), ...avertizari(abonamente)].sort((a, b) => b.createdAt - a.createdAt),
    [jurnal, abonamente],
  );
  const autori = useMemo(() => [...new Set((jurnal ?? []).map(j => j.actor?.nume).filter(Boolean))].sort(), [jurnal]);

  const filtrate = toate.filter(j => {
    if (categorie !== 'toate' && TIPURI[j.tip]?.categorie !== categorie) return false;
    if (autor && j.actor?.nume !== autor) return false;
    if (grupaId && j.grupaId !== grupaId) return false;
    if (q.trim() && !potrivire(j.mesaj, q)) return false;
    const zi = ziuaDin(j.createdAt);
    if (deLa && zi < deLa) return false;
    if (panaLa && zi > panaLa) return false;
    return true;
  });

  const peZile = new Map<string, IntrareJurnal[]>();
  filtrate.slice(0, cate).forEach(j => {
    const zi = ziuaDin(j.createdAt);
    peZile.set(zi, [...(peZile.get(zi) ?? []), j]);
  });

  if (jurnal === null) return <Incarcare />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CATEGORII.map(c => (
          <Chip key={c.cod} activ={categorie === c.cod} onClick={() => setCategorie(c.cod)}>
            {c.eticheta}
          </Chip>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5 [&>*]:min-w-0">
        <Input placeholder="Caută (nume, grupă...)" className="h-10 bg-white lg:col-span-2" value={q} onChange={e => setQ(e.target.value)} />
        <select className="h-10 w-full min-w-0 rounded-md border border-input bg-white px-3 text-sm" value={autor} onChange={e => setAutor(e.target.value)}>
          <option value="">Oricine</option>
          {autori.map(a => (
            <option key={a}>{a}</option>
          ))}
        </select>
        <select className="h-10 w-full min-w-0 rounded-md border border-input bg-white px-3 text-sm" value={grupaId} onChange={e => setGrupaId(e.target.value)}>
          <option value="">Toate grupele</option>
          {grupe.map(g => (
            <option key={g.id} value={g.id}>
              {g.titlu} {g.zile.join(', ')} {g.ora}
            </option>
          ))}
        </select>
        <div className="flex min-w-0 gap-2">
          <Input type="date" className="h-10 min-w-0 bg-white" value={deLa} onChange={e => setDeLa(e.target.value)} aria-label="De la" />
          <Input type="date" className="h-10 min-w-0 bg-white" value={panaLa} onChange={e => setPanaLa(e.target.value)} aria-label="Până la" />
        </div>
      </div>

      {filtrate.length === 0 ? (
        <Gol>Nicio acțiune pentru filtrele alese.</Gol>
      ) : (
        <div className="space-y-5">
          {[...peZile.entries()].map(([zi, lista]) => (
            <section key={zi}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{dataLunga(zi)}</h3>
              <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {lista.map(j => {
                  const t = TIPURI[j.tip] ?? TIPURI.cursant_modificat;
                  const Icon = t.icon;
                  const continut = (
                    <>
                      <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full', t.culoare)}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm text-slate-800">{j.mesaj}</span>
                        <span className="block text-xs text-slate-400">
                          {j.calculat ? 'avertizare automată' : `${j.actor?.nume ?? '—'} (${j.actor?.rol === 'admin' ? 'admin' : 'instructor'}) · ${oraDin(j.createdAt)}`}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={j.id}>
                      {j.cursantId ? (
                        <Link href={linkProfil(j.cursantId)} className="flex items-start gap-3 px-3 py-2.5 hover:bg-slate-50 sm:px-4">
                          {continut}
                        </Link>
                      ) : (
                        <div className="flex items-start gap-3 px-3 py-2.5 sm:px-4">{continut}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
          {filtrate.length > cate && (
            <button className="w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700" onClick={() => setCate(cate + 200)}>
              Mai multe ({filtrate.length - cate} rămase)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
