'use client';

import { useMemo, useState } from 'react';
import { DatabaseBackup, FileSpreadsheet, FileText, Loader2, Sheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { azi } from '@/lib/evidenta/date';
import { backupComplet, construiesteRaport, exportCsv, exportExcel, exportPdf, type FiltruRaport } from '@/lib/evidenta/export';
import { useEvidenta } from './context';
import { instructoriDin } from '@/lib/evidenta/instructori-grupe';
import { Chip, Panou } from './ui';

const TIPURI: { cod: FiltruRaport['tip']; eticheta: string; descriere: string }[] = [
  { cod: 'luna', eticheta: 'Pe lună', descriere: 'Prezențe și abonamente dintr-o lună' },
  { cod: 'grupa', eticheta: 'Pe grupă', descriere: 'Cursanții, prezențele și abonamentele unei grupe' },
  { cod: 'cursant', eticheta: 'Pe cursant', descriere: 'Fișa completă a unui cursant' },
  { cod: 'complet', eticheta: 'Complet', descriere: 'Toate datele, pe o perioadă aleasă' },
];

/** Rapoarte (PDF, Excel, CSV) după filtre + backup complet JSON. */
export function ExportPagina() {
  const { cursanti, toateGrupele: grupe } = useEvidenta();
  const { showToast } = useSimpleToast();
  const [tip, setTip] = useState<FiltruRaport['tip']>('luna');
  const [luna, setLuna] = useState(azi().slice(0, 7));
  const [grupaId, setGrupaId] = useState('');
  const [cursantId, setCursantId] = useState('');
  const [instructor, setInstructor] = useState('');
  const [deLa, setDeLa] = useState('');
  const [panaLa, setPanaLa] = useState('');
  const [lucrez, setLucrez] = useState<string | null>(null);

  const instructori = useMemo(() => instructoriDin(grupe).map(i => i.nume), [grupe]);

  const filtru: FiltruRaport = {
    tip,
    luna: tip === 'luna' ? luna : undefined,
    grupaId: tip === 'grupa' ? grupaId : undefined,
    cursantId: tip === 'cursant' ? cursantId : undefined,
    instructor: tip !== 'cursant' && instructor ? instructor : undefined,
    deLa: tip !== 'luna' ? deLa || undefined : undefined,
    panaLa: tip !== 'luna' ? panaLa || undefined : undefined,
  };
  const valid = (tip !== 'grupa' || grupaId) && (tip !== 'cursant' || cursantId) && (tip !== 'luna' || luna);

  const exporta = async (format: 'pdf' | 'xlsx' | 'csv') => {
    setLucrez(format);
    try {
      const r = await construiesteRaport(filtru);
      if (format === 'pdf') await exportPdf(r);
      else if (format === 'xlsx') await exportExcel(r);
      else exportCsv(r);
    } catch (e) {
      console.error(e);
      showToast('Exportul nu a reușit.', 'error');
    } finally {
      setLucrez(null);
    }
  };

  const backup = async () => {
    setLucrez('backup');
    try {
      const n = await backupComplet();
      showToast(`Backup descărcat: ${n.cursanti} cursanți, ${n.abonamente} abonamente, ${n.prezente} prezențe.`, 'success');
    } catch (e) {
      console.error(e);
      showToast('Backup-ul nu a reușit.', 'error');
    } finally {
      setLucrez(null);
    }
  };

  const Btn = ({ format, icon: Icon, text }: { format: 'pdf' | 'xlsx' | 'csv'; icon: typeof FileText; text: string }) => (
    <Button variant={format === 'pdf' ? 'brand' : 'outline'} className="h-11 flex-1" disabled={!valid || !!lucrez} onClick={() => exporta(format)}>
      {lucrez === format ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Icon className="mr-2 h-4 w-4" />}
      {text}
    </Button>
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] [&>*]:min-w-0">
      <Panou titlu="Raport">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {TIPURI.map(t => (
              <Chip key={t.cod} activ={tip === t.cod} onClick={() => setTip(t.cod)}>
                {t.eticheta}
              </Chip>
            ))}
          </div>
          <p className="text-sm text-slate-500">{TIPURI.find(t => t.cod === tip)?.descriere}</p>

          <div className="grid gap-3 sm:grid-cols-2 [&>*]:min-w-0">
            {tip === 'luna' && (
              <div>
                <Label htmlFor="x-luna">Luna</Label>
                <Input id="x-luna" type="month" className="mt-1.5 h-11" value={luna} onChange={e => setLuna(e.target.value)} />
              </div>
            )}
            {tip === 'grupa' && (
              <div className="sm:col-span-2">
                <Label htmlFor="x-grupa">Grupa</Label>
                <select id="x-grupa" className="mt-1.5 h-11 w-full min-w-0 rounded-md border border-input bg-white px-3 text-sm" value={grupaId} onChange={e => setGrupaId(e.target.value)}>
                  <option value="">Alege grupa</option>
                  {grupe.map(g => (
                    <option key={g.id} value={g.id}>
                      {g.titlu} · {g.zile.join(', ')} {g.ora} · {g.instructor}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {tip === 'cursant' && (
              <div className="sm:col-span-2">
                <Label htmlFor="x-cursant">Cursant</Label>
                <select id="x-cursant" className="mt-1.5 h-11 w-full min-w-0 rounded-md border border-input bg-white px-3 text-sm" value={cursantId} onChange={e => setCursantId(e.target.value)}>
                  <option value="">Alege cursantul</option>
                  {cursanti.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.nume}
                      {!c.activ ? ' (arhivat)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {tip !== 'luna' && (
              <>
                <div>
                  <Label htmlFor="x-de">De la (opțional)</Label>
                  <Input id="x-de" type="date" className="mt-1.5 h-11" value={deLa} onChange={e => setDeLa(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="x-pana">Până la (opțional)</Label>
                  <Input id="x-pana" type="date" className="mt-1.5 h-11" value={panaLa} onChange={e => setPanaLa(e.target.value)} />
                </div>
              </>
            )}
            {tip !== 'cursant' && tip !== 'grupa' && (
              <div>
                <Label htmlFor="x-instr">Instructor (opțional)</Label>
                <select id="x-instr" className="mt-1.5 h-11 w-full min-w-0 rounded-md border border-input bg-white px-3 text-sm" value={instructor} onChange={e => setInstructor(e.target.value)}>
                  <option value="">Toți</option>
                  {instructori.map(i => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Btn format="pdf" icon={FileText} text="PDF" />
            <Btn format="xlsx" icon={FileSpreadsheet} text="Excel" />
            <Btn format="csv" icon={Sheet} text="CSV" />
          </div>
          <p className="text-xs text-slate-500">
            Excel are câte o foaie pentru rezumat, cursanți, abonamente și prezențe, cu filtre pe coloane. PDF-ul e pentru printat sau trimis.
          </p>
        </div>
      </Panou>

      <Panou titlu="Backup complet">
        <p className="mb-3 text-sm text-slate-600">
          Toate datele evidenței (cursanți, abonamente, prezențe, istoric, conturi) într-un fișier JSON. Păstrează-l ca arhivă, de exemplu lunar.
        </p>
        <Button variant="outline" className="h-11 w-full" disabled={!!lucrez} onClick={backup}>
          {lucrez === 'backup' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <DatabaseBackup className="mr-2 h-4 w-4" />}
          Descarcă backup
        </Button>
      </Panou>
    </div>
  );
}
