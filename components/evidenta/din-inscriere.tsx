'use client';

import { useState } from 'react';
import Link from 'next/link';
import { doc, updateDoc } from 'firebase/firestore';
import { Loader2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { auth, db } from '@/lib/firebase';
import { incarcaProfilAdmin } from '@/lib/evidenta/profil';
import { creeazaCursant, incarcaCursanti, incarcaGrupe } from '@/lib/evidenta/repo';

type Inscriere = { id: string; name: string; phone: string; email: string; message: string; grupaId: string; tip: string; createdAt: number; cursantId?: string };

const cifre = (t: string) => t.replace(/\D/g, '').slice(-9);

/**
 * Înscrierea din formularul site-ului → cursant în evidență (cu grupa aleasă, dacă e una din grupe),
 * iar înscrierea trece pe „Înscris”. Dacă există deja un cursant cu același telefon, trimite la el.
 */
export function CursantDinInscriere({ i, onGata }: { i: Inscriere; onGata: (cursantId: string) => void }) {
  const { showToast } = useSimpleToast();
  const [lucrez, setLucrez] = useState(false);

  if (i.cursantId) {
    return (
      <Link href={`/admin/evidenta/cursanti/${i.cursantId}`} className="whitespace-nowrap text-xs font-medium text-emerald-700 hover:underline">
        ✓ Vezi cursantul
      </Link>
    );
  }

  const creeaza = async () => {
    setLucrez(true);
    try {
      const [cursanti, grupe] = await Promise.all([incarcaCursanti(), incarcaGrupe()]);
      const existent = i.phone ? cursanti.find(c => c.telefon && cifre(c.telefon) === cifre(i.phone)) : undefined;
      let cursantId = existent?.id;
      if (existent) {
        if (!confirm(`Există deja cursantul ${existent.nume} cu același telefon. Leg înscrierea de el?`)) return;
      } else {
        const grupa = grupe.find(g => g.id === i.grupaId);
        if (!confirm(`Creezi cursantul ${i.name}${grupa ? ` în grupa ${grupa.titlu}` : ''}?`)) return;
        const u = auth.currentUser;
        const profil = u ? await incarcaProfilAdmin(u.uid) : null;
        cursantId = await creeazaCursant(
          {
            nume: i.name,
            telefon: i.phone,
            email: i.email,
            observatii: `Înscris din formularul de pe site pe ${new Date(i.createdAt).toLocaleDateString('ro-RO')}${i.message ? `: „${i.message.slice(0, 300)}”` : ''}`,
            grupe: grupa ? [grupa.id] : [],
          },
          { uid: u?.uid ?? 'admin', nume: profil?.nume ?? 'Admin', rol: 'admin' },
          grupe,
        );
      }
      await updateDoc(doc(db, 'inscrieri', i.id), { status: 'inscris', cursantId });
      showToast(existent ? 'Înscriere legată de cursant.' : `${i.name} a fost adăugat în evidență.`, 'success');
      onGata(cursantId!);
    } catch (e) {
      console.error(e);
      showToast('Cursantul nu a putut fi creat.', 'error');
    } finally {
      setLucrez(false);
    }
  };

  return (
    <Button variant="outline" size="sm" className="h-8 whitespace-nowrap text-xs" onClick={creeaza} disabled={lucrez}>
      {lucrez ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <UserPlus className="mr-1 h-3.5 w-3.5" />}
      Fă-l cursant
    </Button>
  );
}
