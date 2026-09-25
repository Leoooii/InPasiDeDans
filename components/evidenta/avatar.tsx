'use client';

import { useCallback, useRef, useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';
import { Loader2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePublicData } from '@/components/public-data-provider';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { cn } from '@/lib/utils';
import { ILUSTRATII, Ilustratie, type CategorieIlustratie } from './ilustratii';

// Avatarul e un șir: „logo", „ilustratie:<id>" sau un URL / data URL (poză decupată).
// Gol = inițialele numelui.

export function Avatar({ avatar, nume, className }: { avatar?: string | null; nume: string; className?: string }) {
  const baza = cn('relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full', className);
  if (avatar?.startsWith('ilustratie:')) return <Ilustratie id={avatar.slice(11)} className={baza} />;
  if (avatar === 'logo')
    return (
      <span className={cn(baza, 'bg-white ring-1 ring-slate-200')}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.png" alt="Logo În Pași de Dans" className="h-[80%] w-[80%] object-contain" />
      </span>
    );
  if (avatar)
    return (
      <span className={baza}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatar} alt={nume} className="h-full w-full object-cover" />
      </span>
    );
  const init = nume
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase())
    .join('');
  return <span className={cn(baza, 'bg-gradient-to-br from-red-500 to-orange-400 text-sm font-semibold text-white')}>{init || '?'}</span>;
}

const CATEGORII: { cod: CategorieIlustratie; eticheta: string }[] = [
  { cod: 'femei', eticheta: 'Femei' },
  { cod: 'barbati', eticheta: 'Bărbați' },
  { cod: 'copii', eticheta: 'Copii' },
];

function Optiune({ ales, onClick, titlu, children }: { ales: boolean; onClick: () => void; titlu: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={titlu}
      aria-label={titlu}
      aria-pressed={ales}
      className={cn('rounded-full p-0.5 transition-shadow', ales ? 'ring-[3px] ring-red-500' : 'ring-1 ring-transparent hover:ring-slate-300')}
    >
      {children}
    </button>
  );
}

/**
 * Alegerea avatarului. Pentru conturi: logo, pozele instructorilor, poză proprie (decupată rotund)
 * și ilustrații; pentru cursanți doar ilustrații (`doarIlustratii`).
 */
export function AlegeAvatar({
  valoare,
  nume,
  onChange,
  doarIlustratii = false,
}: {
  valoare: string;
  nume: string;
  onChange: (v: string) => void;
  doarIlustratii?: boolean;
}) {
  const { instructori } = usePublicData();
  const { showToast } = useSimpleToast();
  const [deDecupat, setDeDecupat] = useState<string | null>(null);
  const fisier = useRef<HTMLInputElement>(null);
  const marime = 'h-12 w-12 sm:h-14 sm:w-14';

  const incarca = (f: File | undefined) => {
    if (!f) return;
    if (!f.type.startsWith('image/')) return showToast('Alege o imagine (JPG, PNG).', 'error');
    const r = new FileReader();
    r.onload = () => setDeDecupat(String(r.result));
    r.readAsDataURL(f);
  };


  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar avatar={valoare} nume={nume || '?'} className="h-16 w-16 text-lg" />
        <div className="text-sm text-slate-600">
          <p className="font-medium text-slate-900">Avatarul ales</p>
          <button type="button" className="text-xs text-red-600 hover:underline" onClick={() => onChange('')}>
            Folosește inițialele
          </button>
        </div>
      </div>

      {!doarIlustratii && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Poză</p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fisier.current?.click()}
              className={cn(marime, 'flex flex-col items-center justify-center rounded-full border-2 border-dashed border-slate-300 text-slate-500 hover:border-red-400 hover:text-red-600')}
              title="Încarcă o poză"
            >
              <Upload className="h-5 w-5" />
            </button>
            <input
              ref={fisier}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                incarca(e.target.files?.[0]);
                e.target.value = ''; // aceeași poză se poate alege din nou
              }}
            />
            <Optiune ales={valoare === 'logo'} onClick={() => onChange('logo')} titlu="Logo">
              <Avatar avatar="logo" nume="Logo" className={marime} />
            </Optiune>
            {(instructori ?? [])
              .filter(i => i.imageUrl)
              .map(i => (
                <Optiune key={i.id} ales={false} onClick={() => setDeDecupat(i.imageUrl)} titlu={`Poza lui ${i.name} (decupează)`}>
                  <Avatar avatar={i.imageUrl} nume={i.name} className={marime} />
                </Optiune>
              ))}
          </div>
          <p className="mt-1.5 text-xs text-slate-500">Poza încărcată sau a unui instructor se decupează rotund înainte de salvare.</p>
        </div>
      )}

      {CATEGORII.map(c => (
        <div key={c.cod}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{c.eticheta}</p>
          <div className="flex flex-wrap gap-2">
            {ILUSTRATII.filter(i => i.categorie === c.cod).map(i => (
              <Optiune key={i.id} ales={valoare === `ilustratie:${i.id}`} onClick={() => onChange(`ilustratie:${i.id}`)} titlu={i.eticheta}>
                <Ilustratie id={i.id} className={cn(marime, 'rounded-full')} />
              </Optiune>
            ))}
          </div>
        </div>
      ))}

      <DecupareRotunda
        src={deDecupat}
        onRenunta={() => setDeDecupat(null)}
        onGata={url => {
          onChange(url);
          setDeDecupat(null);
        }}
        onEroare={() => showToast('Poza nu a putut fi decupată. Încearcă o poză JPG sau PNG.', 'error')}
      />
    </div>
  );
}

/** Decupează zona din cerc și o micșorează la 320px (JPEG), ca data URL. */
async function decupeaza(src: string, zona: Area): Promise<string> {
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const el = new Image();
    el.crossOrigin = 'anonymous';
    el.onload = () => res(el);
    el.onerror = rej;
    el.src = src;
  });
  const latura = Math.min(320, Math.round(zona.width));
  const canvas = document.createElement('canvas');
  canvas.width = latura;
  canvas.height = latura;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, latura, latura);
  ctx.drawImage(img, zona.x, zona.y, zona.width, zona.height, 0, 0, latura, latura);
  return canvas.toDataURL('image/jpeg', 0.85);
}

/**
 * Fereastra de decupare, ca dialog propriu: merge și când selectorul de avatar
 * e deja într-un dialog (un portal separat ar fi blocat de dialogul de dedesubt).
 */
function DecupareRotunda({
  src,
  onRenunta,
  onGata,
  onEroare,
}: {
  src: string | null;
  onRenunta: () => void;
  onGata: (url: string) => void;
  onEroare: () => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [zona, setZona] = useState<Area | null>(null);
  const [lucrez, setLucrez] = useState(false);
  const laGata = useCallback((_: Area, px: Area) => setZona(px), []);

  const confirma = async () => {
    if (!src || !zona) return;
    setLucrez(true);
    try {
      onGata(await decupeaza(src, zona));
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    } catch (e) {
      console.error(e);
      onEroare();
    } finally {
      setLucrez(false);
    }
  };

  return (
    <Dialog open={!!src} onOpenChange={o => !o && onRenunta()}>
      <DialogContent className="w-[calc(100vw-1.5rem)] gap-3 overflow-hidden rounded-2xl p-4 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Decupează poza</DialogTitle>
          <DialogDescription>Trage poza și folosește zoom-ul. Ce e în cerc devine avatarul.</DialogDescription>
        </DialogHeader>
        <div className="relative h-[min(360px,55svh)] overflow-hidden rounded-xl bg-slate-900">
          {src && (
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={laGata}
            />
          )}
        </div>
        <label className="flex items-center gap-3 text-xs text-slate-500">
          Zoom
          <input type="range" min={1} max={4} step={0.01} value={zoom} onChange={e => setZoom(Number(e.target.value))} className="flex-1 accent-red-600" />
        </label>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" className="h-11" onClick={onRenunta}>
            Renunță
          </Button>
          <Button variant="brand" className="h-11" onClick={confirma} disabled={!zona || lucrez}>
            {lucrez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Folosește poza
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
