'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react';
import { MapPin, MousePointerClick, Music2 } from 'lucide-react';
import { REGIUNI_DANSURI, TOTAL_DANSURI, type RegiuneDansuri } from '@/lib/dansuri-regiuni';
import { CONTUR_JUDETE, CONTUR_TARA, FORME_REGIUNI, HARTA_INALTIME, HARTA_LATIME } from '@/lib/harta-romania';

type Hover = { id: string; x: number; y: number; latime: number };

const dupaId = (id: string) => REGIUNI_DANSURI.find((r) => r.id === id) ?? REGIUNI_DANSURI[0];

// Motiv geometric (romb de ie) folosit ca bandă decorativă, colorat cu culoarea regiunii.
function BandaMotiv({ culoare }: { culoare: string }) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12'><path d='M0 6 L6 0 L12 6 L6 12 Z M12 6 L18 0 L24 6 L18 12 Z' fill='none' stroke='white' stroke-opacity='0.55' stroke-width='1.4'/><circle cx='6' cy='6' r='1.4' fill='white' fill-opacity='0.8'/><circle cx='18' cy='6' r='1.4' fill='white' fill-opacity='0.8'/></svg>`;
  return (
    <div
      aria-hidden
      className="h-3 w-full transition-colors duration-500"
      style={{ backgroundColor: culoare, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")` }}
    />
  );
}

export default function FolkDancesRegions() {
  const [selectat, setSelectat] = useState('muntenia');
  const [hover, setHover] = useState<Hover | null>(null);
  const hartaRef = useRef<HTMLDivElement>(null);
  const panouRef = useRef<HTMLDivElement>(null);

  const regiune = dupaId(selectat);
  const regiuneHover = hover ? dupaId(hover.id) : null;

  const alege = (id: string, deLaHarta = false) => {
    setSelectat(id);
    // Pe mobil panoul e sub hartă: îl aducem în vizor după un tap pe hartă.
    if (deLaHarta && window.matchMedia('(max-width: 1023px)').matches) {
      panouRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const misca = (e: MouseEvent, id: string) => {
    const box = hartaRef.current?.getBoundingClientRect();
    if (!box) return;
    setHover({ id, x: e.clientX - box.left, y: e.clientY - box.top, latime: box.width });
  };

  const tasta = (e: KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      alege(id, true);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Dansuri din toate regiunile României</h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Peste {Math.floor(TOTAL_DANSURI / 10) * 10} de jocuri din {REGIUNI_DANSURI.length} regiuni folclorice.
          Alege o zonă de pe hartă ca să vezi ce dansăm de acolo.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start">
        {/* Harta */}
        <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50/80 via-white to-red-50/60 p-3 sm:p-6 shadow-sm">
          <div
            ref={hartaRef}
            className="relative"
            onMouseLeave={() => setHover(null)}
          >
            <svg
              viewBox={`0 0 ${HARTA_LATIME} ${HARTA_INALTIME}`}
              className="block h-auto w-full overflow-visible"
              role="group"
              aria-label="Harta României pe regiuni folclorice"
            >
              <defs>
                <filter id="umbra-regiune" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#7c2d12" floodOpacity="0.25" />
                </filter>
              </defs>

              {REGIUNI_DANSURI.map((r) => {
                const forma = FORME_REGIUNI[r.id];
                if (!forma) return null;
                const activ = r.id === selectat;
                const peste = hover?.id === r.id;
                const opacitate = activ ? 1 : peste ? 0.6 : hover ? 0.14 : 0.24;
                return (
                  <path
                    key={r.id}
                    d={forma.d}
                    role="button"
                    tabIndex={0}
                    aria-label={`${r.nume}: ${r.dansuri.length} dansuri`}
                    aria-pressed={activ}
                    onClick={() => alege(r.id, true)}
                    onKeyDown={(e) => tasta(e, r.id)}
                    onMouseMove={(e) => misca(e, r.id)}
                    onFocus={() => setHover(null)}
                    className="cursor-pointer outline-none transition-[fill-opacity] duration-300 focus-visible:[stroke:#0f172a] focus-visible:[stroke-width:4]"
                    style={{ fill: r.culoare, fillOpacity: opacitate, stroke: '#fff', strokeWidth: 3, strokeLinejoin: 'round' }}
                  />
                );
              })}

              {/* Granițele județelor, discret, doar ca textură */}
              <path d={CONTUR_JUDETE} fill="none" stroke="#7c2d12" strokeOpacity={0.12} strokeWidth={1} pointerEvents="none" />

              {/* Regiunea selectată, redesenată deasupra cu umbră */}
              {FORME_REGIUNI[selectat] && (
                <path
                  d={FORME_REGIUNI[selectat].d}
                  pointerEvents="none"
                  filter="url(#umbra-regiune)"
                  style={{ fill: regiune.culoare, stroke: '#fff', strokeWidth: 4, strokeLinejoin: 'round' }}
                />
              )}

              <path d={CONTUR_TARA} fill="none" stroke="#9a3412" strokeOpacity={0.45} strokeWidth={2} pointerEvents="none" />
            </svg>

            {/* Etichete în HTML, ca să rămână lizibile la orice lățime */}
            {REGIUNI_DANSURI.map((r) => {
              const forma = FORME_REGIUNI[r.id];
              if (!forma) return null;
              const activ = r.id === selectat;
              const aprins = activ || hover?.id === r.id;
              return (
                <div
                  key={r.id}
                  aria-hidden
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-center leading-tight"
                  style={{ left: `${(forma.eticheta[0] / HARTA_LATIME) * 100}%`, top: `${(forma.eticheta[1] / HARTA_INALTIME) * 100}%` }}
                >
                  <div
                    className={`text-[9px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${aprins ? 'text-white drop-shadow' : ''}`}
                    style={aprins ? undefined : { color: r.culoare }}
                  >
                    {r.nume}
                  </div>
                  <div
                    className={`hidden sm:inline-block mt-0.5 rounded-full px-1.5 text-[10px] font-semibold transition-colors duration-300 ${activ ? 'bg-white/90' : 'bg-white/70'}`}
                    style={{ color: r.culoare }}
                  >
                    {r.dansuri.length}
                  </div>
                </div>
              );
            })}

            {/* Tooltip la hover (doar pe dispozitive cu mouse) */}
            {hover && regiuneHover && (
              <div
                className="pointer-events-none absolute z-10 hidden w-56 md:block"
                style={{
                  left: Math.min(hover.x + 16, hover.latime - 232),
                  top: hover.y + 16,
                }}
              >
                <div className="overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/5">
                  <div className="h-1.5" style={{ backgroundColor: regiuneHover.culoare }} />
                  <div className="p-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-bold text-slate-900">{regiuneHover.nume}</span>
                      <span className="text-xs font-semibold" style={{ color: regiuneHover.culoare }}>
                        {regiuneHover.dansuri.length} dansuri
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                      {regiuneHover.dansuri.slice(0, 4).join(' · ')}
                      {regiuneHover.dansuri.length > 4 ? ' …' : ''}
                    </p>
                    {regiuneHover.id !== selectat && (
                      <p className="mt-2 flex items-center gap-1 text-[11px] font-medium text-slate-400">
                        <MousePointerClick className="h-3 w-3" /> Click pentru toate dansurile
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Selector rapid pe regiuni (util mai ales pe mobil) */}
          <div className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Regiuni">
            {REGIUNI_DANSURI.map((r) => {
              const activ = r.id === selectat;
              return (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={activ}
                  onClick={() => alege(r.id)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activ ? 'text-white shadow-md border-transparent' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                  style={activ ? { backgroundColor: r.culoare } : undefined}
                >
                  {!activ && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: r.culoare }} />}
                  {r.nume}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panoul regiunii */}
        <PanouRegiune regiune={regiune} panouRef={panouRef} />
      </div>

      <p className="text-center text-xs text-slate-400">
        Hartă orientativă: Crișana e inclusă în Ardeal, iar Țara Oașului în Maramureș.
      </p>
    </div>
  );
}

function PanouRegiune({ regiune, panouRef }: { regiune: RegiuneDansuri; panouRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={panouRef}
      aria-live="polite"
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
      style={{ '--regiune': regiune.culoare } as CSSProperties}
    >
      <BandaMotiv culoare={regiune.culoare} />

      <div key={regiune.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: regiune.culoare }}>
              <MapPin className="h-3.5 w-3.5" /> Regiune folclorică
            </p>
            <h3 className="mt-1 text-3xl font-bold text-slate-900">{regiune.nume}</h3>
          </div>
          <div
            className="flex shrink-0 flex-col items-center justify-center rounded-2xl px-4 py-2 text-white"
            style={{ backgroundColor: regiune.culoare }}
          >
            <span className="text-2xl font-bold leading-none">{regiune.dansuri.length}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider opacity-90">dansuri</span>
          </div>
        </div>

        <p className="mt-3 text-slate-600 leading-relaxed">{regiune.descriere}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {regiune.dansuri.map((dans) => (
            <li
              key={dans}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm text-slate-700 transition-colors hover:text-slate-900"
              style={{
                borderColor: `color-mix(in srgb, ${regiune.culoare} 25%, white)`,
                backgroundColor: `color-mix(in srgb, ${regiune.culoare} 6%, white)`,
              }}
            >
              <Music2 className="h-3 w-3 shrink-0" style={{ color: regiune.culoare }} />
              {dans}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
