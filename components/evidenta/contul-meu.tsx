'use client';

import { useEffect, useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { auth } from '@/lib/firebase';
import { contInstructor } from '@/lib/evidenta/repo';
import { incarcaProfilAdmin, salveazaProfilAdmin, salveazaProfilInstructor, schimbaParola } from '@/lib/evidenta/profil';
import { AlegeAvatar } from './avatar';
import { InstaleazaAplicatia } from './instaleaza-aplicatia';
import { Incarcare, Panou } from './ui';

/** „Contul meu": nume afișat, avatar, parolă. Pentru admin și pentru instructori. */
export function ContulMeu({ rol }: { rol: 'admin' | 'instructor' }) {
  const { showToast } = useSimpleToast();
  const [nume, setNume] = useState('');
  const [avatar, setAvatar] = useState('');
  const [gata, setGata] = useState(false);
  const [salvez, setSalvez] = useState(false);
  const [parole, setParole] = useState({ actuala: '', noua: '', confirmare: '' });
  const [arata, setArata] = useState(false);
  const [schimb, setSchimb] = useState(false);
  const email = auth.currentUser?.email ?? '';

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const p = rol === 'admin' ? incarcaProfilAdmin(uid) : contInstructor(uid).then(c => ({ nume: c?.nume ?? '', avatar: c?.avatar ?? '' }));
    p.then(x => {
      setNume(x.nume);
      setAvatar(x.avatar);
    })
      .catch(console.error)
      .finally(() => setGata(true));
  }, [rol]);

  const salveaza = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid || nume.trim().length < 2) return;
    setSalvez(true);
    try {
      await (rol === 'admin' ? salveazaProfilAdmin : salveazaProfilInstructor)(uid, { nume, avatar });
      showToast('Profil salvat.', 'success');
    } catch (e) {
      console.error(e);
      showToast('Profilul nu a putut fi salvat.', 'error');
    } finally {
      setSalvez(false);
    }
  };

  const parolaNoua = async () => {
    if (parole.noua !== parole.confirmare) return showToast('Parolele noi nu coincid.', 'error');
    setSchimb(true);
    try {
      await schimbaParola(parole.actuala, parole.noua);
      setParole({ actuala: '', noua: '', confirmare: '' });
      showToast('Parola a fost schimbată.', 'success');
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Parola nu a putut fi schimbată.', 'error');
    } finally {
      setSchimb(false);
    }
  };

  if (!gata) return <Incarcare />;

  const tipParola = arata ? 'text' : 'password';

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Contul meu</h1>

      <Panou titlu="Profil">
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 [&>*]:min-w-0">
            <div>
              <Label htmlFor="p-nume">Numele afișat</Label>
              <Input id="p-nume" className="mt-1.5 h-11" value={nume} onChange={e => setNume(e.target.value)} />
              <p className="mt-1 text-xs text-slate-500">Apare în istoric, la acțiunile făcute de tine.</p>
            </div>
            <div>
              <Label>Email de autentificare</Label>
              <Input className="mt-1.5 h-11" value={email} disabled />
            </div>
          </div>
          <AlegeAvatar valoare={avatar} nume={nume} onChange={setAvatar} />
          <Button variant="brand" className="h-11 w-full sm:w-auto" onClick={salveaza} disabled={salvez || nume.trim().length < 2}>
            {salvez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvează profilul
          </Button>
        </div>
      </Panou>

      <Panou
        titlu="Parolă"
        actiune={
          <button type="button" className="flex items-center gap-1 text-xs text-slate-500" onClick={() => setArata(!arata)}>
            {arata ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} {arata ? 'Ascunde' : 'Arată'}
          </button>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3 [&>*]:min-w-0">
          <div>
            <Label htmlFor="p-act">Parola actuală</Label>
            <Input id="p-act" type={tipParola} autoComplete="current-password" className="mt-1.5 h-11" value={parole.actuala} onChange={e => setParole({ ...parole, actuala: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="p-noua">Parola nouă</Label>
            <Input id="p-noua" type={tipParola} autoComplete="new-password" className="mt-1.5 h-11" value={parole.noua} onChange={e => setParole({ ...parole, noua: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="p-conf">Repetă parola nouă</Label>
            <Input id="p-conf" type={tipParola} autoComplete="new-password" className="mt-1.5 h-11" value={parole.confirmare} onChange={e => setParole({ ...parole, confirmare: e.target.value })} />
          </div>
        </div>
        <Button
          variant="outline"
          className="mt-4 h-11 w-full sm:w-auto"
          onClick={parolaNoua}
          disabled={schimb || !parole.actuala || parole.noua.length < 6 || !parole.confirmare}
        >
          {schimb && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Schimbă parola
        </Button>
        <p className="mt-2 text-xs text-slate-500">Cel puțin 6 caractere. {rol === 'instructor' && 'Dacă ai uitat parola actuală, cere-i administratorului o parolă nouă.'}</p>
      </Panou>

      <InstaleazaAplicatia />
    </div>
  );
}
