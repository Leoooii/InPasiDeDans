'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import {
  BookOpen,
  Users,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  PenSquare,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';

export type Grupa = {
  id?: string;
  titlu: string;
  descriere: string;
  dataStart: string;
  program: string;
  instructor: string;
  locuriDisponibile: number;
  locuriTotale: number;
  stiluri: string[];
  zile: string[];
  publica?: boolean;
  nivel?: string;
  rol?: string;
  sala?: string;
};

type RawTimestamp = { toDate: () => Date };
type Abonament = { tip: string; sedinteTotal: number; dataStart: RawTimestamp };
type Prezenta = { data: RawTimestamp };
type CursantRaw = {
  id: string;
  abonamente?: Abonament[];
  prezente?: Prezenta[];
};

type AbStatus = 'fara' | 'depasit' | 'critic' | 'ok';

function calcAbStatus(c: CursantRaw): AbStatus {
  if (!c.abonamente?.length) return 'fara';
  const ab = [...c.abonamente].sort(
    (a, b) => b.dataStart.toDate().getTime() - a.dataStart.toDate().getTime(),
  )[0];
  const sedinteFacute = (c.prezente || []).filter(
    p => p.data?.toDate().getTime() >= ab.dataStart.toDate().getTime(),
  ).length;
  const sedinteRamase = ab.sedinteTotal - sedinteFacute;
  if (sedinteRamase <= 0) return 'depasit';
  if (sedinteRamase <= 2) return 'critic';
  return 'ok';
}

/* ─── Sub-components ──────────────────────────────────────────── */
function StatCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  sub,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  sub?: string;
}) {
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              {label}
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
            {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
          </div>
          <div className={`p-2 ${iconBg} rounded-lg shrink-0`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Pagina ──────────────────────────────────────────────────── */
export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [grupe, setGrupe] = useState<Grupa[]>([]);
  const [cursantiStats, setCursantiStats] = useState({
    total: 0,
    ok: 0,
    critic: 0,
    fara: 0,
    depasit: 0,
  });
  const router = useRouter();

  const fetchData = useCallback(async () => {
    const [grupeSnap, cursantiSnap] = await Promise.all([
      getDocs(query(collection(db, 'grupe'), orderBy('dataStart'))),
      getDocs(collection(db, 'cursanti')),
    ]);

    const grupeData: Grupa[] = grupeSnap.docs.map(d => {
      const raw = d.data();
      return {
        id: d.id,
        titlu: raw.titlu || '',
        descriere: raw.descriere || '',
        dataStart: raw.dataStart || '',
        program: raw.program || '',
        instructor: raw.instructor || '',
        locuriDisponibile: raw.locuriDisponibile ?? 0,
        locuriTotale: raw.locuriTotale ?? 0,
        stiluri: raw.stiluri || (raw.stil ? [raw.stil] : []),
        zile: raw.zile || [],
        publica: raw.publica !== undefined ? raw.publica : true,
        nivel: raw.nivel,
        rol: raw.rol,
        sala: raw.sala,
      };
    });
    setGrupe(grupeData);

    const cursanti: CursantRaw[] = cursantiSnap.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<CursantRaw, 'id'>),
    }));
    const stats = {
      total: cursanti.length,
      ok: 0,
      critic: 0,
      fara: 0,
      depasit: 0,
    };
    for (const c of cursanti) {
      stats[calcAbStatus(c)]++;
    }
    setCursantiStats(stats);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
        fetchData().finally(() => setIsLoading(false));
      } else {
        router.push('/admin/login');
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router, fetchData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto" />
          <p className="mt-3 text-sm text-slate-500">Se încarcă...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  /* ── Derived stats ── */
  const grupePublice = grupe.filter(g => g.publica !== false);
  const locuriDisponibile = grupe.reduce(
    (acc, g) => acc + (g.locuriDisponibile || 0),
    0,
  );
  const locuriTotale = grupe.reduce((acc, g) => acc + (g.locuriTotale || 0), 0);
  const ocuparePct =
    locuriTotale > 0
      ? Math.round(((locuriTotale - locuriDisponibile) / locuriTotale) * 100)
      : 0;

  /* ── Style distribution ── */
  const stilMeta: Record<string, { count: number; instructori: string[] }> = {};
  for (const g of grupe) {
    for (const s of g.stiluri) {
      if (!stilMeta[s]) stilMeta[s] = { count: 0, instructori: [] };
      stilMeta[s].count++;
      if (g.instructor && !stilMeta[s].instructori.includes(g.instructor)) {
        stilMeta[s].instructori.push(g.instructor);
      }
    }
  }
  const stiluri = Object.entries(stilMeta).sort((a, b) => b[1].count - a[1].count);

  const needAttention = cursantiStats.fara + cursantiStats.depasit;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Situația școlii de dans
          </p>
        </div>
        <Link href="/admin/studio">
          <Button variant="outline" className="gap-2 text-sm">
            <PenSquare className="h-4 w-4" />
            Blog Studio
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </Button>
        </Link>
      </div>

      {/* Stats: Grupe */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Grupe
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total grupe"
            value={grupe.length}
            icon={BookOpen}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            label="Grupe publice"
            value={grupePublice.length}
            icon={Users}
            iconBg="bg-green-50"
            iconColor="text-green-600"
            sub={`${grupe.length - grupePublice.length} private`}
          />
          <StatCard
            label="Locuri libere"
            value={locuriDisponibile}
            icon={Users}
            iconBg="bg-orange-50"
            iconColor="text-orange-500"
            sub={`din ${locuriTotale} totale`}
          />
          <StatCard
            label="Ocupare medie"
            value={`${ocuparePct}%`}
            icon={TrendingUp}
            iconBg="bg-red-50"
            iconColor="text-red-500"
          />
        </div>
      </div>

      {/* Stats: Cursanți */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Cursanți
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total cursanți"
            value={cursantiStats.total}
            icon={GraduationCap}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-600"
          />
          <StatCard
            label="Abonament activ"
            value={cursantiStats.ok}
            icon={CheckCircle2}
            iconBg="bg-green-50"
            iconColor="text-green-600"
            sub={
              cursantiStats.total > 0
                ? `${Math.round((cursantiStats.ok / cursantiStats.total) * 100)}% din total`
                : undefined
            }
          />
          <StatCard
            label="La limită"
            value={cursantiStats.critic}
            icon={AlertTriangle}
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
            sub="≤ 2 ședințe rămase"
          />
          <StatCard
            label="Necesită atenție"
            value={needAttention}
            icon={XCircle}
            iconBg="bg-red-50"
            iconColor="text-red-500"
            sub="fără / epuizat"
          />
        </div>
      </div>

      {/* Distribuție stiluri */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-6">
          Distribuție stiluri dans
        </h2>
        {stiluri.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">
            Nu există grupe.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={stiluri.length * 52 + 20}>
            <BarChart
              layout="vertical"
              data={stiluri.map(([stil, meta]) => ({
                name: stil,
                grupe: meta.count,
                instructori: meta.instructori.join(' și '),
              }))}
              margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                type="number"
                allowDecimals={false}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={({ x, y, payload, index }) => {
                  const instructori = stiluri[index]?.[1].instructori.join(' și ');
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text x={-4} y={-6} textAnchor="end" fontSize={12} fill="#334155" fontWeight={500}>{payload.value}</text>
                      {instructori && <text x={-4} y={8} textAnchor="end" fontSize={10} fill="#94a3b8">{instructori}</text>}
                    </g>
                  );
                }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
                formatter={(value: number, _: string, entry) => [
                  `${value} ${value === 1 ? 'grupă' : 'grupe'} · ${entry.payload.instructori}`,
                  entry.payload.name,
                ]}
              />
              <Bar dataKey="grupe" radius={[0, 6, 6, 0]} maxBarSize={20} label={{ position: 'right', fontSize: 11, fill: '#64748b', formatter: (v: number) => `${v} ${v === 1 ? 'grupă' : 'grupe'}` }}>
                {stiluri.map(([stil], i) => {
                  const palette = ['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#8b5cf6','#14b8a6','#f97316'];
                  return <Cell key={stil} fill={palette[i % palette.length]} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Abonamente status bar */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Status abonamente cursanți
          </h2>
          <Link
            href="/admin/abonamente"
            className="text-xs text-indigo-600 hover:underline"
          >
            Gestionează
          </Link>
        </div>
        {cursantiStats.total === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">
            Nu există cursanți înregistrați.
          </p>
        ) : (
          <div className="space-y-4">
            {/* Stacked bar */}
            <div className="h-4 rounded-full overflow-hidden flex">
              {cursantiStats.ok > 0 && (
                <div
                  className="h-full bg-emerald-500"
                  style={{
                    width: `${(cursantiStats.ok / cursantiStats.total) * 100}%`,
                  }}
                  title={`Activ: ${cursantiStats.ok}`}
                />
              )}
              {cursantiStats.critic > 0 && (
                <div
                  className="h-full bg-amber-400"
                  style={{
                    width: `${(cursantiStats.critic / cursantiStats.total) * 100}%`,
                  }}
                  title={`La limită: ${cursantiStats.critic}`}
                />
              )}
              {needAttention > 0 && (
                <div
                  className="h-full bg-red-500 flex-1"
                  title={`Necesită atenție: ${needAttention}`}
                />
              )}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-5">
              <LegendItem
                color="bg-emerald-500"
                label="Abonament activ"
                count={cursantiStats.ok}
                total={cursantiStats.total}
              />
              <LegendItem
                color="bg-amber-400"
                label="La limită"
                count={cursantiStats.critic}
                total={cursantiStats.total}
              />
              <LegendItem
                color="bg-red-500"
                label="Fără / epuizat"
                count={needAttention}
                total={cursantiStats.total}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LegendItem({
  color,
  label,
  count,
  total,
}: {
  color: string;
  label: string;
  count: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${color}`} />
      <span className="text-xs text-slate-600">{label}</span>
      <span className="text-xs font-semibold text-slate-800">{count}</span>
      <span className="text-xs text-slate-400">({pct}%)</span>
    </div>
  );
}
