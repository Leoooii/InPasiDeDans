'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  Download,
  FileText,
  GraduationCap,
  HelpCircle,
  History,
  KeyRound,
  Map,
  Music,
  Tag,
  UserCog,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { avertizari } from '@/lib/evidenta/abonament';
import { adaugaZile, azi, dataScurta, minuteAcum, numeZi, oraDin, ziuaDin } from '@/lib/evidenta/date';
import { incarcaJurnal, incarcaPrezente } from '@/lib/evidenta/repo';
import type { IntrareJurnal, Prezenta } from '@/lib/evidenta/tipuri';
import { cn } from '@/lib/utils';
import { Avatar } from './avatar';
import { ButonWhatsapp } from './buton-whatsapp';
import { useEvidenta } from './context';
import { CeasLive, stareAzi, useAcum } from './grupe-lista';
import { PozeGrupa } from './poze-instructori';
import { Incarcare } from './ui';

// Pagina principală a adminului: ce se întâmplă acum, ce trebuie rezolvat, cifrele importante.

const ROSU = '#dc2626';
const lei = (n: number) => `${n.toLocaleString('ro-RO')} lei`;
const LUNI = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'nov', 'dec'];

type InscriereScurta = { id: string; name: string; tip: string; danceclass: string; status: string; createdAt: number };

function Card({ titlu, link, textLink, children, className }: { titlu: string; link?: string; textLink?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm', className)}>
      <header className="flex items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">{titlu}</h2>
        {link && (
          <Link href={link} className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline">
            {textLink ?? 'Vezi tot'} <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </header>
      <div className="flex-1 p-4">{children}</div>
    </section>
  );
}

function Cifra({ eticheta, valoare, detaliu, link, icon: Icon, accent }: { eticheta: string; valoare: string | number; detaliu?: string; link: string; icon: LucideIcon; accent?: string }) {
  return (
    <Link href={link} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">{eticheta}</p>
        <Icon className="h-4 w-4 text-slate-400 group-hover:text-red-500" />
      </div>
      <p className={cn('mt-1 text-2xl font-bold tabular-nums text-slate-900 sm:text-3xl', accent)}>{valoare}</p>
      {detaliu && <p className="mt-0.5 text-xs text-slate-500">{detaliu}</p>}
    </Link>
  );
}

function GraficColoane({ date, eticheta, format }: { date: { x: string; y: number; titlu: string }[]; eticheta: string; format: (n: number) => string }) {
  return (
    <div className="h-48" aria-label={eticheta}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={date} margin={{ top: 6, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#e2e8f0" strokeWidth={1} />
          <XAxis dataKey="x" tickLine={false} axisLine={{ stroke: '#cbd5e1' }} tick={{ fontSize: 11, fill: '#64748b' }} interval="preserveStartEnd" />
          <YAxis tickLine={false} axisLine={false} width={40} allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={v => (v >= 1000 ? `${Math.round(v / 100) / 10}k` : String(v))} />
          <Tooltip
            cursor={{ fill: '#f1f5f9' }}
            content={({ active, payload }) =>
              active && payload?.length ? (
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
                  <p className="font-semibold text-slate-900">{(payload[0].payload as { titlu: string }).titlu}</p>
                  <p className="text-slate-700">{format(Number(payload[0].value))}</p>
                </div>
              ) : null
            }
          />
          <Bar dataKey="y" fill={ROSU} radius={[4, 4, 0, 0]} maxBarSize={24} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Dashboard({ numeAdmin }: { numeAdmin: string }) {
  const { grupe, cursanti, abonamente, status, loading } = useEvidenta();
  const [prezente, setPrezente] = useState<Prezenta[] | null>(null);
  const [jurnal, setJurnal] = useState<IntrareJurnal[]>([]);
  const [inscrieri, setInscrieri] = useState<InscriereScurta[]>([]);
  const acum = useAcum(30_000);
  const minute = minuteAcum(acum);
  const ziua = azi();

  useEffect(() => {
    const incarca = () => {
      incarcaPrezente({ deLa: adaugaZile(ziua, -27) }).then(setPrezente).catch(() => setPrezente([]));
      incarcaJurnal(8).then(setJurnal).catch(() => {});
      getDocs(query(collection(db, 'inscrieri'), orderBy('createdAt', 'desc'), limit(40)))
        .then(s => setInscrieri(s.docs.map(d => ({ id: d.id, ...(d.data() as Omit<InscriereScurta, 'id'>) }))))
        .catch(() => {});
    };
    incarca();
    const t = setInterval(incarca, 120_000);
    return () => clearInterval(t);
  }, [ziua]);

  const data = useMemo(() => {
    const activi = cursanti.filter(c => c.activ);
    const coduri = activi.map(c => status(c.id).cod);
    const numar = (...c: string[]) => coduri.filter(x => c.includes(x)).length;

    // prezențe pe zi (ultimele 14 zile) și pe săptămână
    const pz = prezente ?? [];
    const zile = Array.from({ length: 14 }, (_, i) => adaugaZile(ziua, i - 13));
    const peZi = zile.map(d => ({ x: `${Number(d.slice(8))}`, y: pz.filter(p => p.data === d).length, titlu: `${numeZi(d)}, ${dataScurta(d)}` }));
    const saptamana = pz.filter(p => p.data > adaugaZile(ziua, -7)).length;
    const saptamanaTrecuta = pz.filter(p => p.data > adaugaZile(ziua, -14) && p.data <= adaugaZile(ziua, -7)).length;

    // încasări pe ultimele 6 luni
    const valide = abonamente.filter(a => !a.anulat);
    const [y, m] = ziua.split('-').map(Number);
    const luni = Array.from({ length: 6 }, (_, i) => new Date(Date.UTC(y, m - 6 + i, 1)).toISOString().slice(0, 7));
    const peLuna = luni.map(l => ({ x: LUNI[Number(l.slice(5, 7)) - 1], y: valide.filter(a => a.dataVanzare.startsWith(l)).reduce((s, a) => s + (a.pret || 0), 0), titlu: `${LUNI[Number(l.slice(5, 7)) - 1]} ${l.slice(0, 4)}` }));

    // grupele de azi
    const deAzi = grupe
      .map(g => ({ g, stare: stareAzi(g, minute), prezenti: pz.filter(p => p.grupaId === g.id && p.data === ziua).length, membri: activi.filter(c => c.grupe.includes(g.id)).length }))
      .filter(x => x.stare);

    const neacoperite = pz.filter(p => !p.abonamentId);
    return {
      activi: activi.length,
      cuAbonament: numar('activ', 'neinceput', 'la_limita'),
      segmente: [
        { eticheta: 'Activ', n: numar('activ', 'neinceput'), culoare: 'bg-emerald-500' },
        { eticheta: 'La limită', n: numar('la_limita'), culoare: 'bg-amber-400' },
        { eticheta: 'Expirat / epuizat', n: numar('expirat', 'epuizat'), culoare: 'bg-red-500' },
        { eticheta: 'Fără abonament', n: numar('fara'), culoare: 'bg-slate-300' },
      ],
      deRezolvat: activi.filter(c => ['expirat', 'epuizat', 'la_limita', 'fara'].includes(status(c.id).cod)).sort((a, b) => status(a.id).ordine - status(b.id).ordine),
      peZi,
      saptamana,
      saptamanaTrecuta,
      peLuna,
      lunaAsta: peLuna[5].y,
      lunaTrecuta: peLuna[4].y,
      live: deAzi.filter(x => x.stare!.stare === 'live'),
      urmeaza: deAzi.filter(x => x.stare!.stare === 'urmeaza').sort((a, b) => a.g.ora.localeCompare(b.g.ora)),
      terminateFaraPrezenta: deAzi.filter(x => x.stare!.stare === 'terminata' && !x.prezenti),
      totalAzi: deAzi.length,
      cuPrezentaAzi: deAzi.filter(x => x.prezenti).length,
      expiraCurand: avertizari(abonamente).filter(a => a.tip === 'abonament_expira'),
      neacoperite: new Set(neacoperite.map(p => p.cursantId)).size,
    };
  }, [cursanti, abonamente, grupe, status, prezente, minute, ziua]);

  if (loading) return <Incarcare />;

  const inscrieriNoi = inscrieri.filter(i => i.status === 'nou');
  const dif = (a: number, b: number) => (b ? `${a >= b ? '▲' : '▼'} ${Math.abs(Math.round(((a - b) / b) * 100))}% față de perioada anterioară` : undefined);
  const prenume = numeAdmin.split(' ')[0];
  const oraZilei = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Bucharest', hour: '2-digit', hour12: false }).format(acum));
  const salut = oraZilei < 11 ? 'Bună dimineața' : oraZilei < 18 ? 'Bună ziua' : 'Bună seara';

  return (
    <div className="space-y-5">
      {/* salut + ceas */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {salut}, {prenume}!
          </h1>
          <p className="text-sm text-slate-500">
            Azi: {data.totalAzi} {data.totalAzi === 1 ? 'grupă' : 'grupe'} · {data.cuPrezentaAzi} cu prezența făcută
            {inscrieriNoi.length > 0 && ` · ${inscrieriNoi.length} înscrieri noi`}
          </p>
        </div>
        <CeasLive />
      </div>

      {/* acum la sală */}
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white shadow-sm sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              {data.live.length > 0 && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />}
              <span className={cn('relative inline-flex h-2.5 w-2.5 rounded-full', data.live.length ? 'bg-red-500' : 'bg-slate-500')} />
            </span>
            Acum la sală
          </h2>
          <Link href="/admin/evidenta" className="text-xs font-medium text-slate-300 hover:text-white">
            Toate grupele →
          </Link>
        </div>
        {data.live.length === 0 ? (
          <p className="text-sm text-slate-300">
            Nicio grupă în desfășurare.
            {data.urmeaza[0] && (
              <>
                {' '}
                Următoarea: <strong className="text-white">{data.urmeaza[0].g.titlu}</strong> ({data.urmeaza[0].stare!.text}).
              </>
            )}
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 [&>*]:min-w-0">
            {data.live.map(({ g, stare, prezenti, membri }) => (
              <div key={g.id} className="flex min-w-0 items-center gap-3 rounded-xl bg-white/10 p-3">
                <PozeGrupa g={g} className="ring-slate-800" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{g.titlu}</p>
                  <p className="line-clamp-2 text-xs text-slate-300">
                    {g.sala ? `${g.sala} · ` : ''}
                    {stare!.text} · {prezenti ? `✓ ${prezenti} din ${membri} prezenți` : `${membri} cursanți, prezența nefăcută`}
                  </p>
                </div>
                <Button variant="brand" size="sm" className="h-9 shrink-0" asChild>
                  <Link href={`/admin/evidenta/prezenta?grupa=${g.id}`}>Prezența</Link>
                </Button>
              </div>
            ))}
          </div>
        )}
        {data.terminateFaraPrezenta.length > 0 && (
          <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-amber-200">
            <AlertTriangle className="h-3.5 w-3.5" /> Terminate azi fără prezență:
            {data.terminateFaraPrezenta.map(({ g }) => (
              <Link key={g.id} href={`/admin/evidenta/prezenta?grupa=${g.id}`} className="rounded-full bg-amber-400/20 px-2 py-0.5 font-medium text-amber-100 hover:bg-amber-400/30">
                {g.titlu} {g.ora.split('-')[0]}
              </Link>
            ))}
          </p>
        )}
      </section>

      {/* cifrele */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Cifra eticheta="Cursanți cu abonament" valoare={`${data.cuAbonament}/${data.activi}`} detaliu="din cursanții activi" link="/admin/evidenta/cursanti" icon={GraduationCap} />
        <Cifra eticheta="Încasat luna aceasta" valoare={lei(data.lunaAsta)} detaliu={dif(data.lunaAsta, data.lunaTrecuta)} link="/admin/evidenta/incasari" icon={Wallet} />
        <Cifra eticheta="Prezențe în ultimele 7 zile" valoare={data.saptamana} detaliu={dif(data.saptamana, data.saptamanaTrecuta)} link="/admin/evidenta" icon={CalendarCheck} />
        <Cifra
          eticheta="De rezolvat"
          valoare={data.deRezolvat.length}
          detaliu={data.neacoperite ? `${data.neacoperite} cu ședințe fără abonament` : 'abonamente expirate, epuizate sau lipsă'}
          link="/admin/evidenta/cursanti"
          icon={AlertTriangle}
          accent={data.deRezolvat.length ? 'text-amber-600' : undefined}
        />
      </div>

      {/* grafice */}
      <div className="grid gap-4 lg:grid-cols-2 [&>*]:min-w-0">
        <Card titlu="Prezențe pe zi · ultimele 14 zile" link="/admin/evidenta" textLink="Grupe">
          {prezente === null ? <Incarcare /> : <GraficColoane date={data.peZi} eticheta="Prezențe pe zi" format={n => `${n} ${n === 1 ? 'prezență' : 'prezențe'}`} />}
        </Card>
        <Card titlu="Încasări · ultimele 6 luni" link="/admin/evidenta/incasari" textLink="Încasări">
          <GraficColoane date={data.peLuna} eticheta="Încasări pe lună" format={lei} />
        </Card>
      </div>

      <Card titlu="Starea abonamentelor" link="/admin/evidenta/cursanti" textLink="Cursanți">
        {data.activi === 0 ? (
          <p className="text-sm text-slate-500">Niciun cursant încă.</p>
        ) : (
          <>
            <div className="flex h-4 gap-0.5 overflow-hidden rounded-full">
              {data.segmente
                .filter(s => s.n)
                .map(s => (
                  <div key={s.eticheta} className={cn('h-full first:rounded-l-full last:rounded-r-full', s.culoare)} style={{ width: `${(s.n / data.activi) * 100}%` }} title={`${s.eticheta}: ${s.n}`} />
                ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
              {data.segmente.map(s => (
                <li key={s.eticheta} className="flex items-center gap-2 text-slate-700">
                  <span className={cn('h-2.5 w-2.5 rounded-full', s.culoare)} />
                  {s.eticheta} <strong className="tabular-nums text-slate-900">{s.n}</strong>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>

      {/* liste */}
      <div className="grid gap-4 lg:grid-cols-3 [&>*]:min-w-0">
        <Card titlu={`De rezolvat (${data.deRezolvat.length})`} link="/admin/evidenta/cursanti">
          {data.deRezolvat.length === 0 ? (
            <p className="text-sm text-slate-500">Totul e în regulă. 🎉</p>
          ) : (
            <ul className="-mx-2 space-y-0.5">
              {data.deRezolvat.slice(0, 7).map(c => {
                const st = status(c.id);
                return (
                  <li key={c.id} className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-50">
                    <Link href={`/admin/evidenta/cursanti/${c.id}`} className="flex min-w-0 flex-1 items-center gap-2">
                      <Avatar avatar={c.avatar} nume={c.nume} className="h-8 w-8 text-[11px]" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-900">{c.nume}</span>
                        <span className="block truncate text-xs text-slate-500">{st.eticheta} · {st.detaliu}</span>
                      </span>
                    </Link>
                    <ButonWhatsapp cursant={c} status={st} mic />
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card titlu={`Înscrieri noi (${inscrieriNoi.length})`} link="/admin/inscrieri">
          {inscrieriNoi.length === 0 ? (
            <p className="text-sm text-slate-500">Nicio înscriere nouă.</p>
          ) : (
            <ul className="space-y-2.5">
              {inscrieriNoi.slice(0, 6).map(i => (
                <li key={i.id}>
                  <Link href="/admin/inscrieri" className="block rounded-lg hover:bg-slate-50">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-medium text-slate-900">{i.name}</span>
                      <span className="shrink-0 text-xs text-slate-400">{dataScurta(ziuaDin(i.createdAt))}</span>
                    </span>
                    <span className="block truncate text-xs text-slate-500">{i.tip === 'lista-asteptare' ? 'Listă de așteptare' : i.danceclass || 'Mesaj'}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card titlu="Activitate recentă" link="/admin/evidenta/istoric" textLink="Istoric">
          {jurnal.length === 0 && data.expiraCurand.length === 0 ? (
            <p className="text-sm text-slate-500">Nicio acțiune încă.</p>
          ) : (
            <ul className="space-y-2.5">
              {data.expiraCurand.slice(0, 3).map(e => (
                <li key={e.id} className="text-sm text-amber-700">
                  ⏳ {e.mesaj}
                </li>
              ))}
              {jurnal.slice(0, 6).map(j => (
                <li key={j.id} className="text-sm text-slate-700">
                  {j.mesaj}
                  <span className="block text-xs text-slate-400">
                    {j.actor?.nume} · {dataScurta(ziuaDin(j.createdAt))} {oraDin(j.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* scurtături */}
      <Card titlu="Scurtături">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { href: '/admin/evidenta', t: 'Grupe și prezență', i: Users },
            { href: '/admin/evidenta/cursanti', t: 'Cursanți', i: GraduationCap },
            { href: '/admin/evidenta/incasari', t: 'Încasări', i: Wallet },
            { href: '/admin/evidenta/istoric', t: 'Istoric acțiuni', i: History },
            { href: '/admin/inscrieri', t: 'Înscrieri', i: ClipboardList },
            { href: '/admin/evidenta/instructori', t: 'Conturi instructori', i: KeyRound },
            { href: '/admin/evidenta/export', t: 'Export și backup', i: Download },
            { href: '/admin/statistici', t: 'Statistici site', i: BarChart3 },
            { href: '/admin/grupe', t: 'Grupe (site)', i: BookOpen },
            { href: '/admin/tarife', t: 'Tarife', i: Tag },
            { href: '/admin/evenimente', t: 'Evenimente', i: FileText },
            { href: '/admin/petreceri', t: 'Petreceri', i: Music },
            { href: '/admin/excursii', t: 'Excursii', i: Map },
            { href: '/admin/instructori', t: 'Instructori (site)', i: UserCog },
            { href: '/admin/evidenta/ghid', t: 'Ghid', i: HelpCircle },
          ].map(({ href, t, i: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-2 rounded-xl border border-slate-100 px-3 py-2.5 text-sm text-slate-700 hover:border-red-200 hover:bg-red-50/50 hover:text-red-700">
              <Icon className="h-4 w-4 shrink-0 text-slate-400" />
              <span className="truncate">{t}</span>
            </Link>
          ))}
        </div>
      </Card>

      <p className="flex items-center gap-1.5 text-xs text-slate-400">
        <CreditCard className="h-3.5 w-3.5" /> Cifrele se actualizează singure la câteva minute.
      </p>
    </div>
  );
}
