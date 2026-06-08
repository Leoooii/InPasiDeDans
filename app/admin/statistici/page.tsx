'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  Loader2,
  Eye,
  Users,
  MousePointerClick,
  Clock,
  TrendingUp,
  TrendingDown,
  KeyRound,
  RefreshCw,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  Target,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Info,
  LogIn,
  Phone,
  Mail,
  Navigation,
  FileText,
  MousePointer,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// ─── Tipuri (oglindesc răspunsul /api/admin/analytics) ─────────────────────

type Delta = number | null;
type Summary = {
  views: number;
  users: number;
  sessions: number;
  avgDuration: number;
  delta: { views: Delta; users: Delta; sessions: Delta };
};
type TopPage = {
  path: string;
  title: string;
  views: number;
  users: number;
  engagementRate: number;
  delta: Delta;
};
type Source = { channel: string; sessions: number; users: number };
type Series = {
  dates: string[];
  pages: { path: string; title: string; points: number[] }[];
};
type Suggestion = { severity: 'good' | 'warn' | 'info'; text: string };
type AnalyticsData = {
  summary: Summary;
  topPages: TopPage[];
  sources: Source[];
  sourceMedium: { label: string; sessions: number }[];
  geography: { city: string; users: number }[];
  devices: { category: string; users: number }[];
  landingPages: { path: string; sessions: number }[];
  conversions: { name: string; count: number }[];
  leadRate: number;
  leadsBySource: { channel: string; leads: number }[];
  suggestions: Suggestion[];
  series: Series;
};

// ─── Config ────────────────────────────────────────────────────────────────

const TOKEN_KEY = 'ipd_analytics_token';

const PRESETS: { id: string; label: string; days: number }[] = [
  { id: '7d', label: '7 zile', days: 7 },
  { id: '30d', label: '30 zile', days: 30 },
  { id: '90d', label: '90 zile', days: 90 },
];

// Paletă pentru liniile suprapuse / surse.
const COLORS = [
  '#e11d48', '#2563eb', '#16a34a', '#d97706', '#7c3aed',
  '#0891b2', '#db2777', '#65a30d', '#475569', '#ea580c',
];

// Etichete prietenoase pentru evenimentele de conversie.
const CONV_META: Record<string, { label: string; icon: typeof Target }> = {
  generate_lead: { label: 'Lead-uri (formular trimis)', icon: Target },
  form_start: { label: 'Formulare începute', icon: FileText },
  click_phone: { label: 'Click pe telefon', icon: Phone },
  click_email: { label: 'Click pe email', icon: Mail },
  click_directions: { label: 'Click pe direcții', icon: Navigation },
  click: { label: 'Click-uri (link-uri)', icon: MousePointer },
};

const DEVICE_META: Record<string, { label: string; icon: typeof Smartphone }> = {
  mobile: { label: 'Mobil', icon: Smartphone },
  desktop: { label: 'Desktop', icon: Monitor },
  tablet: { label: 'Tabletă', icon: Tablet },
};

const SEV_STYLE = {
  warn: { wrap: 'bg-amber-50 border-amber-200', icon: AlertTriangle, color: 'text-amber-600' },
  good: { wrap: 'bg-emerald-50 border-emerald-200', icon: CheckCircle2, color: 'text-emerald-600' },
  info: { wrap: 'bg-sky-50 border-sky-200', icon: Info, color: 'text-sky-600' },
} as const;

const iso = (d: Date) => d.toISOString().slice(0, 10);

function rangeFromDays(days: number) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - (days - 1));
  return { startDate: iso(start), endDate: iso(end) };
}

function fmtDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function shortPath(p: string): string {
  if (p === '/') return '/ (acasă)';
  return p.length > 32 ? p.slice(0, 31) + '…' : p;
}

// ─── Componente mici ─────────────────────────────────────────────────────────

function DeltaBadge({ value }: { value: Delta }) {
  if (value === null) {
    return <span className="text-[11px] font-medium text-slate-400">nou</span>;
  }
  const up = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
        up ? 'text-emerald-600' : 'text-rose-600'
      }`}
    >
      {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      {up ? '+' : ''}
      {value}%
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
  delta?: Delta;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500">{label}</span>
          <Icon className="h-4 w-4 text-slate-400" />
        </div>
        <div className="flex items-end justify-between gap-2">
          <span className="text-2xl font-bold text-slate-900 tabular-nums">{value}</span>
          {delta !== undefined && <DeltaBadge value={delta} />}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Pagina ──────────────────────────────────────────────────────────────────

export default function StatisticiPage() {
  const [token, setToken] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState('');

  const [preset, setPreset] = useState('30d');
  const [range, setRange] = useState(() => rangeFromDays(30));
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);

  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Încarcă token-ul salvat o singură dată.
  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (t) setToken(t);
  }, []);

  const fetchData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-analytics-token': token,
        },
        body: JSON.stringify({
          startDate: range.startDate,
          endDate: range.endDate,
          pagePaths: selectedPaths,
        }),
      });
      if (res.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setError('Cheie de acces invalidă.');
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Eroare necunoscută.');
        return;
      }
      setData(json);
    } catch {
      setError('Nu am putut contacta serverul.');
    } finally {
      setLoading(false);
    }
  }, [token, range.startDate, range.endDate, selectedPaths]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePreset = (p: (typeof PRESETS)[number]) => {
    setPreset(p.id);
    setRange(rangeFromDays(p.days));
  };

  const handleCustomDate = (field: 'startDate' | 'endDate', val: string) => {
    setPreset('custom');
    setRange(r => ({ ...r, [field]: val }));
  };

  const togglePath = (path: string) => {
    setSelectedPaths(prev =>
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path],
    );
  };

  // Rânduri pentru LineChart: { date, [path]: views, ... }
  const chartRows = useMemo(() => {
    if (!data) return [];
    return data.series.dates.map((date, i) => {
      const row: Record<string, string | number> = { date: date.slice(5) }; // MM-DD
      data.series.pages.forEach(pg => {
        row[pg.path] = pg.points[i] ?? 0;
      });
      return row;
    });
  }, [data]);

  // ── Gate token ──────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div className="max-w-sm mx-auto mt-20">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-slate-900">
              <KeyRound className="h-5 w-5 text-red-600" />
              <h1 className="text-lg font-semibold">Acces statistici</h1>
            </div>
            <p className="text-sm text-slate-500">
              Introdu cheia de acces pentru statistici (din variabila de mediu
              <code className="mx-1 px-1 bg-slate-100 rounded">ANALYTICS_API_SECRET</code>).
            </p>
            <input
              type="password"
              value={tokenInput}
              onChange={e => setTokenInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && tokenInput) {
                  localStorage.setItem(TOKEN_KEY, tokenInput);
                  setToken(tokenInput);
                }
              }}
              placeholder="Cheie acces"
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Button
              className="w-full"
              disabled={!tokenInput}
              onClick={() => {
                localStorage.setItem(TOKEN_KEY, tokenInput);
                setToken(tokenInput);
              }}
            >
              Deblochează
            </Button>
            {error && <p className="text-sm text-rose-600">{error}</p>}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header + controale */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Statistici vizite</h1>
          <p className="text-sm text-slate-500">Date din Google Analytics 4</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
            {PRESETS.map(p => (
              <button
                key={p.id}
                onClick={() => handlePreset(p)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  preset === p.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Interval custom */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-slate-500">Interval:</span>
        <input
          type="date"
          value={range.startDate}
          max={range.endDate}
          onChange={e => handleCustomDate('startDate', e.target.value)}
          className="h-8 px-2 rounded-md border border-slate-200 text-sm"
        />
        <span className="text-slate-400">→</span>
        <input
          type="date"
          value={range.endDate}
          min={range.startDate}
          max={iso(new Date())}
          onChange={e => handleCustomDate('endDate', e.target.value)}
          className="h-8 px-2 rounded-md border border-slate-200 text-sm"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700">
          {error}
        </div>
      )}

      {loading && !data ? (
        <div className="flex items-center justify-center py-24 text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : data ? (
        <>
          {/* Sumar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={Eye} label="Afișări pagini" value={data.summary.views.toLocaleString('ro-RO')} delta={data.summary.delta.views} />
            <StatCard icon={Users} label="Utilizatori" value={data.summary.users.toLocaleString('ro-RO')} delta={data.summary.delta.users} />
            <StatCard icon={MousePointerClick} label="Sesiuni" value={data.summary.sessions.toLocaleString('ro-RO')} delta={data.summary.delta.sessions} />
            <StatCard icon={Clock} label="Durată medie sesiune" value={fmtDuration(data.summary.avgDuration)} />
          </div>

          {/* Sugestii automate */}
          {data.suggestions.length > 0 && (
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <h2 className="text-sm font-semibold text-slate-900">Sugestii de îmbunătățire</h2>
                </div>
                <div className="space-y-2">
                  {data.suggestions.map((s, i) => {
                    const st = SEV_STYLE[s.severity];
                    const SIcon = st.icon;
                    return (
                      <div
                        key={i}
                        className={`flex items-start gap-3 rounded-lg border p-3 ${st.wrap}`}
                      >
                        <SIcon className={`h-4 w-4 mt-0.5 shrink-0 ${st.color}`} />
                        <p className="text-sm text-slate-700 leading-snug">{s.text}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Conversii */}
          {data.conversions.length > 0 && (
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-sm font-semibold text-slate-900">Conversii & interacțiuni</h2>
                  <span className="text-xs text-slate-500">
                    Rată lead-uri: <span className="font-semibold text-slate-900">{data.leadRate}%</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">Acțiuni cu intenție din partea vizitatorilor</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {data.conversions.map(ev => {
                    const meta = CONV_META[ev.name] ?? { label: ev.name, icon: Target };
                    const EIcon = meta.icon;
                    const isLead = ev.name === 'generate_lead';
                    return (
                      <div
                        key={ev.name}
                        className={`rounded-lg border p-3 ${
                          isLead ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'
                        }`}
                      >
                        <EIcon className={`h-4 w-4 mb-2 ${isLead ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <div className="text-xl font-bold text-slate-900 tabular-nums">
                          {ev.count.toLocaleString('ro-RO')}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5">{meta.label}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Funnel formular + Lead-uri pe sursă */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Funnel formular */}
            <Card>
              <CardContent className="p-5">
                <h2 className="text-sm font-semibold text-slate-900 mb-1">Funnel formular</h2>
                <p className="text-xs text-slate-500 mb-4">Câți încep formularul vs câți îl trimit</p>
                {(() => {
                  const started = data.conversions.find(c => c.name === 'form_start')?.count ?? 0;
                  const sent = data.conversions.find(c => c.name === 'generate_lead')?.count ?? 0;
                  const completion = started > 0 ? Math.round((sent / started) * 100) : 0;
                  const lost = started - sent;
                  const lostPct = started > 0 ? 100 - completion : 0;
                  const steps = [
                    { label: 'Au început formularul', value: started, pct: 100, color: '#2563eb' },
                    { label: 'Au trimis (lead)', value: sent, pct: completion, color: '#16a34a' },
                  ];
                  return (
                    <div className="space-y-4">
                      {steps.map(s => (
                        <div key={s.label}>
                          <div className="flex items-center justify-between mb-1.5 text-sm">
                            <span className="text-slate-700">{s.label}</span>
                            <span className="font-semibold text-slate-900 tabular-nums">
                              {s.value.toLocaleString('ro-RO')}{' '}
                              <span className="text-slate-400 font-normal">({s.pct}%)</span>
                            </span>
                          </div>
                          <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                          </div>
                        </div>
                      ))}
                      {started > 0 && (
                        <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3 mt-2">
                          <TrendingDown className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />
                          <p className="text-sm text-slate-700 leading-snug">
                            <span className="font-semibold">{lost.toLocaleString('ro-RO')} ({lostPct}%)</span> abandonează după ce încep formularul. Un formular mai scurt sau câmpuri mai puține pot recupera o parte.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Lead-uri pe sursă */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-slate-400" />
                  <h2 className="text-sm font-semibold text-slate-900">Lead-uri pe sursă</h2>
                </div>
                <p className="text-xs text-slate-500 mb-3">Care canal aduce clienți (nu doar vizite)</p>
                {data.leadsBySource.length > 0 ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data.leadsBySource} layout="vertical" margin={{ top: 0, right: 24, left: 8, bottom: 0 }}>
                      <XAxis type="number" hide allowDecimals={false} />
                      <YAxis type="category" dataKey="channel" width={110} tick={{ fontSize: 11, fill: '#64748b' }} />
                      <Tooltip
                        contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                        formatter={(v: number) => [v.toLocaleString('ro-RO'), 'lead-uri']}
                      />
                      <Bar dataKey="leads" radius={[0, 4, 4, 0]} maxBarSize={22}>
                        {data.leadsBySource.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-slate-400 py-8 text-center">Niciun lead în perioada selectată.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Overlay trenduri pe pagini */}
          <Card>
            <CardContent className="p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-1">
                Trend afișări pe pagină
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                {selectedPaths.length === 0
                  ? 'Top 5 pagini (selectează din listă pentru a compara alte pagini)'
                  : `${selectedPaths.length} pagini selectate`}
              </p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={chartRows} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                    labelFormatter={l => `Ziua ${l}`}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 11 }}
                    formatter={(v: string) => shortPath(v)}
                  />
                  {data.series.pages.map((pg, i) => (
                    <Line
                      key={pg.path}
                      type="monotone"
                      dataKey={pg.path}
                      name={pg.path}
                      stroke={COLORS[i % COLORS.length]}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Top pagini + selecție overlay */}
            <Card>
              <CardContent className="p-5">
                <h2 className="text-sm font-semibold text-slate-900 mb-1">Top pagini</h2>
                <p className="text-xs text-slate-500 mb-3">
                  Bifează pentru a le suprapune în grafic
                </p>
                <div className="space-y-1 max-h-[420px] overflow-y-auto">
                  {data.topPages.map(pg => {
                    const checked = selectedPaths.includes(pg.path);
                    const colorIdx = data.series.pages.findIndex(p => p.path === pg.path);
                    return (
                      <label
                        key={pg.path}
                        className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => togglePath(pg.path)}
                          className="rounded border-slate-300"
                        />
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{
                            background:
                              colorIdx >= 0 ? COLORS[colorIdx % COLORS.length] : '#cbd5e1',
                          }}
                        />
                        <span className="flex-1 min-w-0 text-sm text-slate-700 truncate" title={pg.path}>
                          {shortPath(pg.path)}
                        </span>
                        <DeltaBadge value={pg.delta} />
                        <span className="text-sm font-semibold text-slate-900 tabular-nums w-14 text-right">
                          {pg.views.toLocaleString('ro-RO')}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Surse trafic */}
            <Card>
              <CardContent className="p-5">
                <h2 className="text-sm font-semibold text-slate-900 mb-1">Surse de trafic</h2>
                <p className="text-xs text-slate-500 mb-3">De unde vin vizitatorii (sesiuni)</p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={data.sources}
                    layout="vertical"
                    margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="channel"
                      width={110}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                    />
                    <Tooltip
                      contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                      formatter={(v: number) => [v.toLocaleString('ro-RO'), 'sesiuni']}
                    />
                    <Bar dataKey="sessions" radius={[0, 4, 4, 0]} maxBarSize={22}>
                      {data.sources.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Geografie + Dispozitive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Geografie */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <h2 className="text-sm font-semibold text-slate-900">Geografie (orașe)</h2>
                </div>
                <p className="text-xs text-slate-500 mb-3">De unde sunt vizitatorii (utilizatori)</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={data.geography} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="city" width={100} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                      formatter={(v: number) => [v.toLocaleString('ro-RO'), 'utilizatori']}
                    />
                    <Bar dataKey="users" radius={[0, 4, 4, 0]} maxBarSize={20}>
                      {data.geography.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Dispozitive */}
            <Card>
              <CardContent className="p-5">
                <h2 className="text-sm font-semibold text-slate-900 mb-1">Dispozitive</h2>
                <p className="text-xs text-slate-500 mb-4">Pe ce intră vizitatorii</p>
                {(() => {
                  const total = data.devices.reduce((s, d) => s + d.users, 0) || 1;
                  return (
                    <div className="space-y-4 pt-2">
                      {data.devices.map((d, i) => {
                        const meta = DEVICE_META[d.category] ?? { label: d.category, icon: Monitor };
                        const DIcon = meta.icon;
                        const pct = Math.round((d.users / total) * 100);
                        return (
                          <div key={d.category}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="flex items-center gap-2 text-sm text-slate-700">
                                <DIcon className="h-4 w-4 text-slate-400" />
                                {meta.label}
                              </span>
                              <span className="text-sm font-semibold text-slate-900 tabular-nums">
                                {pct}% <span className="text-slate-400 font-normal">({d.users.toLocaleString('ro-RO')})</span>
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </div>

          {/* Surse detaliate + Landing pages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Source / medium */}
            <Card>
              <CardContent className="p-5">
                <h2 className="text-sm font-semibold text-slate-900 mb-1">Surse detaliate</h2>
                <p className="text-xs text-slate-500 mb-3">Platformă / canal exact (sesiuni)</p>
                <div className="space-y-1">
                  {data.sourceMedium.map((s, i) => (
                    <div key={s.label} className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-slate-50">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="flex-1 min-w-0 text-sm text-slate-700 truncate" title={s.label}>{s.label}</span>
                      <span className="text-sm font-semibold text-slate-900 tabular-nums">
                        {s.sessions.toLocaleString('ro-RO')}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Landing pages */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <LogIn className="h-4 w-4 text-slate-400" />
                  <h2 className="text-sm font-semibold text-slate-900">Pagini de intrare</h2>
                </div>
                <p className="text-xs text-slate-500 mb-3">Unde aterizează oamenii din Google/social (sesiuni)</p>
                <div className="space-y-1">
                  {data.landingPages.map((lp, i) => (
                    <div key={lp.path} className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-slate-50">
                      <span className="text-xs text-slate-300 tabular-nums w-4 text-right">{i + 1}</span>
                      <span className="flex-1 min-w-0 text-sm text-slate-700 truncate" title={lp.path}>
                        {shortPath(lp.path)}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 tabular-nums">
                        {lp.sessions.toLocaleString('ro-RO')}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : null}
    </div>
  );
}
