'use client';

import { useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { perioada } from '@/lib/evidenta/abonament';
import { adaugaZile, azi, dataScurta, VALABILITATE_ZILE } from '@/lib/evidenta/date';
import { vindeAbonament } from '@/lib/evidenta/repo';
import type { Cursant } from '@/lib/evidenta/tipuri';
import { cn } from '@/lib/utils';
import { useEvidenta } from './context';

/** Înregistrează un abonament vândut: tipul din tarife, 4 săptămâni de la data de start. */
export function DialogAbonament({
  cursant,
  deschis,
  onInchide,
}: {
  cursant: Cursant | null;
  deschis: boolean;
  onInchide: () => void;
}) {
  const { tipuri, actor, esteAdmin, reincarca } = useEvidenta();
  const { showToast } = useSimpleToast();
  const [tarifId, setTarifId] = useState('');
  const [start, setStart] = useState(azi());
  const [expirare, setExpirare] = useState('');
  const [salvez, setSalvez] = useState(false);

  useEffect(() => {
    if (deschis) {
      setTarifId('');
      setStart(azi());
      setExpirare('');
    }
  }, [deschis]);

  const tip = tipuri.find(t => t.tarifId === tarifId);
  const per = tip ? perioada(tip, start) : null;
  const ultimaZi = expirare || (per?.dataExpirare ? adaugaZile(per.dataExpirare, -1) : '');

  const grupate = useMemo(
    () => [
      { titlu: 'Adulți', lista: tipuri.filter(t => t.categorie === 'adulti') },
      { titlu: 'Copii', lista: tipuri.filter(t => t.categorie === 'copii') },
    ],
    [tipuri],
  );

  const salveaza = async () => {
    if (!cursant || !tip) return;
    setSalvez(true);
    try {
      const expManual = expirare && per?.dataExpirare && expirare !== adaugaZile(per.dataExpirare, -1) ? adaugaZile(expirare, 1) : undefined;
      const { atasate } = await vindeAbonament(cursant, tip, start, actor, expManual);
      showToast(
        `Abonament înregistrat pentru ${cursant.nume}${atasate ? ` (${atasate} ședințe anterioare incluse)` : ''}.`,
        'success',
      );
      await reincarca();
      onInchide();
    } catch (e) {
      console.error(e);
      showToast('Abonamentul nu a putut fi salvat.', 'error');
    } finally {
      setSalvez(false);
    }
  };

  return (
    <Dialog open={deschis} onOpenChange={o => !o && onInchide()}>
      <DialogContent className="max-h-[90svh] w-[calc(100vw-1.5rem)] overflow-y-auto overflow-x-hidden rounded-2xl [&>*]:min-w-0 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Abonament nou</DialogTitle>
          <DialogDescription>{cursant?.nume}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {grupate.map(
            g =>
              g.lista.length > 0 && (
                <div key={g.titlu}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{g.titlu}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {g.lista.map(t => (
                      <button
                        key={t.tarifId}
                        type="button"
                        onClick={() => {
                          setTarifId(t.tarifId);
                          setExpirare('');
                        }}
                        className={cn(
                          'min-h-16 rounded-xl border-2 px-3 py-2 text-left transition-colors',
                          tarifId === t.tarifId ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300',
                        )}
                      >
                        <span className="block text-sm font-semibold leading-tight text-slate-900">{t.tip}</span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          {t.pret} lei · {t.sedinteTotal === null ? 'nelimitat' : `${t.sedinteTotal} ${t.sedinteTotal === 1 ? 'ședință' : 'ședințe'}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ),
          )}

          {tip && tip.sedinteTotal !== null && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="ab-start">Începe pe</Label>
                <Input
                  id="ab-start"
                  type="date"
                  className="mt-1.5 h-11"
                  value={start}
                  onChange={e => {
                    setStart(e.target.value || azi());
                    setExpirare('');
                  }}
                />
              </div>
              <div>
                <Label htmlFor="ab-final">Ultima zi valabilă</Label>
                <Input
                  id="ab-final"
                  type="date"
                  className="mt-1.5 h-11"
                  value={ultimaZi}
                  disabled={!esteAdmin}
                  onChange={e => setExpirare(e.target.value)}
                />
              </div>
            </div>
          )}

          {tip && (
            <p className="rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
              {tip.sedinteTotal === null
                ? `Full Pass: cele ${VALABILITATE_ZILE / 7} săptămâni încep de la prima ședință efectuată.`
                : `Valabil ${VALABILITATE_ZILE / 7} săptămâni: ${dataScurta(start)} – ${dataScurta(ultimaZi)}.`}{' '}
              Ședințele făcute deja fără abonament în această perioadă se includ automat.
            </p>
          )}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={onInchide} className="h-11">
              Renunță
            </Button>
            <Button variant="brand" onClick={salveaza} disabled={!tip || salvez} className="h-11">
              {salvez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvează abonamentul
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
