'use client';

import { useState } from 'react';
import { Download, FileSpreadsheet, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { construiesteRaport, exportExcel, exportPdf } from '@/lib/evidenta/export';

/** Buton „Exportă" pentru fișa unui cursant sau o grupă (toată perioada). */
export function ExportRapid({ tip, id }: { tip: 'cursant' | 'grupa'; id: string }) {
  const { showToast } = useSimpleToast();
  const [lucrez, setLucrez] = useState(false);

  const exporta = async (format: 'pdf' | 'xlsx') => {
    setLucrez(true);
    try {
      const r = await construiesteRaport(tip === 'cursant' ? { tip, cursantId: id } : { tip: 'grupa', grupaId: id });
      await (format === 'pdf' ? exportPdf(r) : exportExcel(r));
    } catch (e) {
      console.error(e);
      showToast('Exportul nu a reușit.', 'error');
    } finally {
      setLucrez(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8" disabled={lucrez}>
          {lucrez ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Download className="mr-1.5 h-4 w-4" />}
          Exportă
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => exporta('pdf')}>
          <FileText className="mr-2 h-4 w-4" /> PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exporta('xlsx')}>
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
