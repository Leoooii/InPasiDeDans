'use client';

import { useState } from 'react';
import { FileSpreadsheet, FileText, Loader2, Sheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { azi } from '@/lib/evidenta/date';
import { construiesteRaport, exportCsv, exportExcel, exportPdf } from '@/lib/evidenta/export';

/** Exportul prezențelor unei grupe pe o lună (PDF, Excel, CSV). */
export function ExportLuna({ grupaId }: { grupaId: string }) {
  const { showToast } = useSimpleToast();
  const [luna, setLuna] = useState(azi().slice(0, 7));
  const [lucrez, setLucrez] = useState<string | null>(null);

  const exporta = async (format: 'pdf' | 'xlsx' | 'csv') => {
    setLucrez(format);
    try {
      const r = await construiesteRaport({ tip: 'luna', luna, grupaId });
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

  const Btn = ({ format, icon: Icon, text }: { format: 'pdf' | 'xlsx' | 'csv'; icon: typeof FileText; text: string }) => (
    <Button variant="outline" size="sm" className="h-10 flex-1" disabled={!luna || !!lucrez} onClick={() => exporta(format)}>
      {lucrez === format ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Icon className="mr-1.5 h-4 w-4" />}
      {text}
    </Button>
  );

  return (
    <div className="mt-4 border-t border-slate-100 pt-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Descarcă prezențele pe o lună</p>
      <div className="flex flex-col gap-2">
        <Input type="month" className="h-10" value={luna} max={azi().slice(0, 7)} onChange={e => setLuna(e.target.value)} aria-label="Luna" />
        <div className="flex gap-2">
          <Btn format="pdf" icon={FileText} text="PDF" />
          <Btn format="xlsx" icon={FileSpreadsheet} text="Excel" />
          <Btn format="csv" icon={Sheet} text="CSV" />
        </div>
      </div>
    </div>
  );
}
