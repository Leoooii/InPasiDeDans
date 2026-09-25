'use client';

import { useEffect, useMemo, useState } from 'react';
import { Loader2, Search, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { creeazaCursant, schimbaGrupa } from '@/lib/evidenta/repo';
import type { Cursant, GrupaEvidenta } from '@/lib/evidenta/tipuri';
import { useEvidenta } from './context';
import { StatusBadge } from './ui';
import { Avatar } from './avatar';
import { AlegeGrupa } from './alege-grupa';

const faraDiacritice = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export const potrivire = (nume: string, q: string) => faraDiacritice(nume).includes(faraDiacritice(q.trim()));

/**
 * Adaugă un cursant: caută mai întâi printre cei existenți (ca să nu apară dubluri),
 * altfel creează unul nou. Cu `grupa`, îl pune direct în grupă.
 * Cu `laAlegere`, doar întoarce cursantul ales (ex. prezență la recuperare).
 */
export function DialogCursant({
  deschis,
  onInchide,
  grupa,
  titlu,
  descriere,
  laAlegere,
}: {
  deschis: boolean;
  onInchide: () => void;
  grupa?: GrupaEvidenta;
  titlu?: string;
  descriere?: string;
  laAlegere?: (c: Cursant) => void;
}) {
  const { cursanti, actor, toateGrupele, grupe: grupePermise, status, reincarca, esteAdmin } = useEvidenta();
  const { showToast } = useSimpleToast();
  const [q, setQ] = useState('');
  const [nou, setNou] = useState(false);
  const [form, setForm] = useState({ nume: '', telefon: '', email: '', observatii: '' });
  const [grupeAlese, setGrupeAlese] = useState<string[]>([]);
  const [salvez, setSalvez] = useState(false);

  useEffect(() => {
    if (deschis) {
      setQ('');
      setNou(false);
      setForm({ nume: '', telefon: '', email: '', observatii: '' });
      setGrupeAlese(grupa ? [grupa.id] : []);
    }
  }, [deschis, grupa]);

  const rezultate = useMemo(
    () => (q.trim().length < 2 ? [] : cursanti.filter(c => c.activ && potrivire(c.nume, q)).slice(0, 8)),
    [q, cursanti],
  );

  const alege = async (c: Cursant) => {
    if (laAlegere) {
      laAlegere(c);
      onInchide();
      return;
    }
    if (!grupa) return;
    if (c.grupe.includes(grupa.id)) {
      showToast(`${c.nume} e deja în grupă.`, 'info');
      return;
    }
    setSalvez(true);
    try {
      await schimbaGrupa(c, grupa, true, actor);
      showToast(`${c.nume} a fost adăugat în ${grupa.titlu}.`, 'success');
      await reincarca();
      onInchide();
    } catch (e) {
      console.error(e);
      showToast('Nu s-a putut adăuga în grupă.', 'error');
    } finally {
      setSalvez(false);
    }
  };

  const creeaza = async () => {
    if (form.nume.trim().length < 3) return;
    setSalvez(true);
    try {
      const id = await creeazaCursant({ ...form, grupe: grupeAlese }, actor, toateGrupele);
      showToast(`${form.nume.trim()} a fost adăugat.`, 'success');
      await reincarca();
      if (laAlegere) laAlegere({ id, ...form, nume: form.nume.trim(), grupe: grupeAlese, activ: true, createdAt: Date.now() });
      onInchide();
    } catch (e) {
      console.error(e);
      showToast('Cursantul nu a putut fi salvat.', 'error');
    } finally {
      setSalvez(false);
    }
  };

  return (
    <Dialog open={deschis} onOpenChange={o => !o && onInchide()}>
      <DialogContent className="max-h-[90svh] w-[calc(100vw-1.5rem)] overflow-y-auto overflow-x-hidden rounded-2xl [&>*]:min-w-0 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{titlu ?? (grupa ? `Adaugă în ${grupa.titlu}` : 'Cursant nou')}</DialogTitle>
          <DialogDescription>
            {descriere ?? (nou ? 'Completează datele cursantului.' : 'Caută mai întâi: poate e deja înregistrat.')}
          </DialogDescription>
        </DialogHeader>

        {!nou ? (
          <div className="space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                autoFocus
                placeholder="Numele cursantului"
                className="h-11 pl-9"
                value={q}
                onChange={e => setQ(e.target.value)}
              />
            </div>
            {rezultate.length > 0 && (
              <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
                {rezultate.map(c => (
                  <li key={c.id}>
                    <button
                      type="button"
                      disabled={salvez}
                      onClick={() => alege(c)}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-slate-50"
                    >
                      <Avatar avatar={c.avatar} nume={c.nume} className="h-9 w-9 text-xs" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-slate-900">{c.nume}</span>
                        <span className="block truncate text-xs text-slate-500">
                          {c.grupe.map(id => toateGrupele.find(g => g.id === id)?.titlu).filter(Boolean).join(', ') ||
                            'fără grupă'}
                        </span>
                      </span>
                      <StatusBadge status={status(c.id)} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {q.trim().length >= 2 && rezultate.length === 0 && (
              <p className="text-sm text-slate-500">Niciun cursant cu acest nume.</p>
            )}
            {!laAlegere && <Button
              variant="outline"
              className="h-11 w-full"
              onClick={() => {
                setNou(true);
                setForm(f => ({ ...f, nume: q.trim() }));
              }}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Cursant nou{q.trim() ? `: „${q.trim()}"` : ''}
            </Button>}
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <Label htmlFor="c-nume">Nume și prenume *</Label>
              <Input id="c-nume" className="mt-1.5 h-11" value={form.nume} onChange={e => setForm({ ...form, nume: e.target.value })} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 [&>*]:min-w-0">
              <div>
                <Label htmlFor="c-tel">Telefon</Label>
                <Input
                  id="c-tel"
                  type="tel"
                  className="mt-1.5 h-11"
                  value={form.telefon}
                  onChange={e => setForm({ ...form, telefon: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="c-email">Email</Label>
                <Input
                  id="c-email"
                  type="email"
                  className="mt-1.5 h-11"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            {!grupa && !laAlegere && (
              <div>
                <Label>Grupe{!esteAdmin && ' *'}</Label>
                <div className="mt-1.5 space-y-2">
                  <AlegeGrupa grupe={grupePermise} exclude={grupeAlese} onAlege={g => setGrupeAlese([...grupeAlese, g.id])} />
                  {grupeAlese.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {grupeAlese.map(id => {
                        const g = toateGrupele.find(x => x.id === id);
                        return (
                          <span key={id} className="inline-flex max-w-full items-center gap-1 rounded-full border border-red-200 bg-red-50 py-1 pl-3 pr-1 text-xs text-red-800">
                            <span className="truncate">
                              {g?.titlu} {g?.zile.length ? `· ${g.zile.join(', ')}` : ''}
                            </span>
                            <button
                              type="button"
                              aria-label={`Scoate ${g?.titlu}`}
                              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full hover:bg-red-100"
                              onClick={() => setGrupeAlese(grupeAlese.filter(x => x !== id))}
                            >
                              ×
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="c-obs">Observații</Label>
              <Textarea
                id="c-obs"
                rows={2}
                className="mt-1.5"
                value={form.observatii}
                onChange={e => setForm({ ...form, observatii: e.target.value })}
              />
            </div>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" className="h-11" onClick={() => setNou(false)}>
                Înapoi la căutare
              </Button>
              <Button variant="brand" className="h-11" onClick={creeaza} disabled={salvez || form.nume.trim().length < 3 || (!esteAdmin && grupeAlese.length === 0)}>
                {salvez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvează
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
