import type { LucideIcon } from 'lucide-react';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';

// „Coaja" paginilor închise la culoare (blog, noutăți, instructori, petreceri, excursii):
// fundal gradient + lumini difuze + model decorativ, breadcrumbs, antete de secțiune.

const DELAYS = ['0s', '2s', '4s'];

export const ORBE_IMPLICITE: [string, string, string] = [
  '-top-40 -left-40 h-[36rem] w-[36rem] bg-orange-500/15',
  'top-1/3 -right-32 h-[30rem] w-[30rem] bg-red-600/15',
  'bottom-0 left-1/3 h-[28rem] w-[28rem] bg-orange-500/10',
];

/** Model de fundal: puncte sau diagonale; pentru altceva se trimite direct un element. */
export function ModelFundal({ tip, opacitate = 'opacity-[0.04]' }: { tip: 'puncte' | 'diagonale'; opacitate?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${opacitate}`}
      style={
        tip === 'puncte'
          ? { backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }
          : { backgroundImage: 'repeating-linear-gradient(45deg, white 0 1px, transparent 1px 22px)' }
      }
    />
  );
}

export function DarkPageShell({
  pagina,
  url,
  orbe = ORBE_IMPLICITE,
  fundal,
  children,
}: {
  /** numele paginii în breadcrumbs */
  pagina: string;
  url: string;
  /** poziție, mărime și culoare pentru cele 3 lumini difuze */
  orbe?: [string, string, string];
  fundal?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {orbe.map((cls, i) => (
          <div
            key={i}
            className={`absolute rounded-full blur-[120px] animate-pulse ${cls}`}
            style={i ? { animationDelay: DELAYS[i] } : undefined}
          />
        ))}
      </div>

      {fundal ?? <ModelFundal tip="puncte" />}

      <div className="relative container mx-auto py-10 md:py-16 px-4 md:px-6">
        <SEOBreadcrumbs
          items={[{ name: 'Acasă', url: '/' }, { name: pagina }]}
          currentPageUrl={url}
          tone="dark"
          className="mb-0"
        />
        {children}
      </div>
    </div>
  );
}

/** Eticheta mică de deasupra titlului din hero. */
export function DarkEticheta({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 mb-6 text-xs uppercase tracking-[0.2em] text-orange-300">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

export function DarkTitlu({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
      {children}
    </h1>
  );
}

/** Text cu gradient portocaliu-roșu, pentru cuvintele evidențiate din titlu. */
export function Evidentiat({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-orange-300 via-red-400 to-orange-400 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

/** Antet de secțiune: titlu cu punct pulsatil (sau iconiță) și subtitlu, subliniat. */
export function DarkAntetSectiune({
  titlu,
  subtitlu,
  icon: Icon,
}: {
  titlu: React.ReactNode;
  subtitlu?: React.ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          {Icon ? (
            <Icon className="h-6 w-6 text-orange-300" />
          ) : (
            <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
          )}
          {titlu}
        </h2>
        {subtitlu && <p className="text-white/50 text-sm mt-1">{subtitlu}</p>}
      </div>
    </div>
  );
}
