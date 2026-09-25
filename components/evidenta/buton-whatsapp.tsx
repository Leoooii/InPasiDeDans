'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, MessageCircle, Pencil, RotateCcw, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useSimpleToast } from '@/components/simple-toast-provider';
import type { StatusCursant } from '@/lib/evidenta/abonament';
import type { Cursant } from '@/lib/evidenta/tipuri';
import {
  completeaza,
  incarcaSabloane,
  laSabloaneSchimbate,
  linkWhatsapp,
  SABLOANE_IMPLICITE,
  salveazaSablon,
  tipMesaj,
  TIPURI_MESAJ,
  valori,
  VARIABILE,
  type Sabloane,
  type TipMesaj,
} from '@/lib/evidenta/whatsapp';
import { cn } from '@/lib/utils';
import { useEvidenta } from './context';

function useSabloane() {
  const [s, setS] = useState<Sabloane>(SABLOANE_IMPLICITE);
  useEffect(() => {
    const incarca = () => void incarcaSabloane().then(setS);
    incarca();
    return laSabloaneSchimbate(incarca);
  }, []);
  return s;
}

/**
 * Butonul verde WhatsApp (mesaj pregătit după statusul abonamentului) + creionul
 * care deschide editorul: textul cu variabile și previzualizarea mesajului trimis.
 */
export function ButonWhatsapp({ cursant, status, mic = false }: { cursant: Cursant; status: StatusCursant; mic?: boolean }) {
  const sabloane = useSabloane();
  const [editez, setEditez] = useState(false);
  if (!cursant.telefon || !linkWhatsapp(cursant.telefon, '')) return null;
  const text = completeaza(sabloane[tipMesaj(status.cod)], valori(cursant.nume, status));

  return (
    <span className="inline-flex shrink-0 overflow-hidden rounded-lg border border-emerald-200">
      <a
        href={linkWhatsapp(cursant.telefon, text)!}
        target="_blank"
        rel="noopener noreferrer"
        title="Trimite pe WhatsApp"
        className={cn('inline-flex items-center gap-1.5 bg-white font-medium text-emerald-700 hover:bg-emerald-50', mic ? 'h-8 px-2 text-xs' : 'h-9 px-3 text-sm')}
      >
        <MessageCircle className="h-4 w-4" />
        {!mic && 'WhatsApp'}
      </a>
      <button
        type="button"
        onClick={() => setEditez(true)}
        title="Modifică mesajul"
        aria-label="Modifică mesajul de WhatsApp"
        className={cn('inline-flex items-center justify-center border-l border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50', mic ? 'h-8 w-7' : 'h-9 w-8')}
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>
      <EditorMesaj deschis={editez} onInchide={() => setEditez(false)} cursant={cursant} status={status} sabloane={sabloane} />
    </span>
  );
}

function EditorMesaj({
  deschis,
  onInchide,
  cursant,
  status,
  sabloane,
}: {
  deschis: boolean;
  onInchide: () => void;
  cursant: Cursant;
  status: StatusCursant;
  sabloane: Sabloane;
}) {
  const { esteAdmin } = useEvidenta();
  const { showToast } = useSimpleToast();
  const [tip, setTip] = useState<TipMesaj>(tipMesaj(status.cod));
  const [text, setText] = useState('');
  const [salvez, setSalvez] = useState(false);
  const zona = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (deschis) {
      const t = tipMesaj(status.cod);
      setTip(t);
      setText(sabloane[t]);
    }
  }, [deschis]); // eslint-disable-line react-hooks/exhaustive-deps

  const v = valori(cursant.nume, status);
  const final = completeaza(text, v);
  const link = cursant.telefon ? linkWhatsapp(cursant.telefon, final) : null;

  const insereaza = (cheie: string) => {
    const el = zona.current;
    if (!el) return setText(t => t + cheie);
    const [a, b] = [el.selectionStart, el.selectionEnd];
    setText(t => t.slice(0, a) + cheie + t.slice(b));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(a + cheie.length, a + cheie.length);
    });
  };

  const salveaza = async () => {
    setSalvez(true);
    try {
      await salveazaSablon(tip, text);
      showToast('Mesajul a fost salvat pentru toți cursanții.', 'success');
    } catch (e) {
      console.error(e);
      showToast('Mesajul nu a putut fi salvat.', 'error');
    } finally {
      setSalvez(false);
    }
  };

  return (
    <Dialog open={deschis} onOpenChange={o => !o && onInchide()}>
      <DialogContent className="max-h-[92svh] w-[calc(100vw-1.5rem)] overflow-y-auto overflow-x-hidden rounded-2xl [&>*]:min-w-0 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Mesaj pe WhatsApp către {cursant.nume}</DialogTitle>
          <DialogDescription>Modifică textul; variabilele din acolade se completează automat pentru fiecare cursant.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-1.5">
          {TIPURI_MESAJ.map(t => (
            <button
              key={t.tip}
              type="button"
              onClick={() => {
                setTip(t.tip);
                setText(sabloane[t.tip]);
              }}
              className={cn('rounded-full border px-3 py-1 text-xs', tip === t.tip ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-700 hover:bg-slate-50')}
            >
              {t.eticheta}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Textul</p>
            <Textarea ref={zona} rows={9} value={text} onChange={e => setText(e.target.value)} className="text-sm" />
            <div className="flex flex-wrap gap-1.5">
              {VARIABILE.map(x => (
                <button
                  key={x.cheie}
                  type="button"
                  onClick={() => insereaza(x.cheie)}
                  title={x.descriere}
                  className="rounded-md border border-sky-200 bg-sky-50 px-2 py-0.5 font-mono text-[11px] text-sky-800 hover:bg-sky-100"
                >
                  {x.cheie}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              {VARIABILE.map(x => `${x.cheie} = ${v[x.cheie]}`).join(' · ')}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cum arată mesajul</p>
            <div className="rounded-2xl bg-[#e5ddd5] p-3">
              <div className="ml-auto max-w-[92%] whitespace-pre-wrap break-words rounded-xl rounded-tr-sm bg-[#dcf8c6] px-3 py-2 text-sm text-slate-900 shadow-sm">
                {final || <span className="text-slate-400">(mesaj gol)</span>}
                <span className="mt-1 block text-right text-[10px] text-slate-500">acum ✓✓</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
          <Button variant="ghost" size="sm" className="h-10 sm:mr-auto" onClick={() => setText(SABLOANE_IMPLICITE[tip])}>
            <RotateCcw className="mr-1.5 h-4 w-4" /> Textul inițial
          </Button>
          {esteAdmin && (
            <Button variant="outline" className="h-11" onClick={salveaza} disabled={salvez || text === sabloane[tip]}>
              {salvez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvează pentru toți
            </Button>
          )}
          <Button className="h-11 bg-emerald-600 text-white hover:bg-emerald-700" asChild disabled={!link}>
            <a href={link ?? '#'} target="_blank" rel="noopener noreferrer" onClick={() => onInchide()}>
              <Send className="mr-2 h-4 w-4" /> Trimite pe WhatsApp
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
