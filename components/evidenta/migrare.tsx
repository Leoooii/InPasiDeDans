'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { areDateVechi, migreazaDateVechi } from '@/lib/evidenta/repo';
import { useEvidenta } from './context';

/** Apare doar cât timp există cursanți salvați în formatul vechi. */
export function MigrareDateVechi() {
  const { cursanti, actor, toateGrupele, reincarca, esteAdmin } = useEvidenta();
  const { showToast } = useSimpleToast();
  const [lucrez, setLucrez] = useState(false);
  const vechi = cursanti.filter(areDateVechi);
  if (!esteAdmin || !vechi.length) return null;

  const muta = async () => {
    setLucrez(true);
    try {
      const r = await migreazaDateVechi(actor, toateGrupele);
      showToast(`Mutat: ${r.cursanti} cursanți, ${r.abonamente} abonamente, ${r.prezente} prezențe.`, 'success');
      await reincarca();
    } catch (e) {
      console.error(e);
      showToast('Mutarea nu a reușit. Sunt publicate regulile Firestore noi?', 'error');
    } finally {
      setLucrez(false);
    }
  };

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
      <span className="min-w-0 flex-1">
        {vechi.length} {vechi.length === 1 ? 'cursant are' : 'cursanți au'} date în formatul vechi al evidenței. Mută-le o singură dată în formatul nou.
      </span>
      <Button variant="outline" className="h-10" onClick={muta} disabled={lucrez}>
        {lucrez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Mută datele
      </Button>
    </div>
  );
}
