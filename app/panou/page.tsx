'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, type User } from 'firebase/auth';
import { ArrowLeft, Eye, EyeOff, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar } from '@/components/evidenta/avatar';
import { InstaleazaAplicatia } from '@/components/evidenta/instaleaza-aplicatia';
import { auth } from '@/lib/firebase';
import { incarcaConturiPublice, type ContPublic } from '@/lib/evidenta/conturi-publice';
import { contInstructor } from '@/lib/evidenta/repo';

// Intrarea unică pentru admin și instructori: alegi profilul, scrii parola.

async function destinatie(u: User): Promise<string> {
  if (u.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) return '/admin/evidenta';
  const c = await contInstructor(u.uid).catch(() => null);
  return c?.activ ? '/instructor' : '/cont';
}

export default function Panou() {
  const router = useRouter();
  const [conturi, setConturi] = useState<ContPublic[] | null>(null);
  const [ales, setAles] = useState<ContPublic | null>(null);
  const [cuEmail, setCuEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [arata, setArata] = useState(false);
  const [eroare, setEroare] = useState('');
  const [info, setInfo] = useState('');
  const [lucrez, setLucrez] = useState(false);

  // deja logat → direct în panou
  useEffect(
    () =>
      onAuthStateChanged(auth, async u => {
        if (u) router.replace(await destinatie(u));
      }),
    [router],
  );

  useEffect(() => {
    incarcaConturiPublice()
      .then(setConturi)
      .catch(() => {
        setConturi([]);
        setCuEmail(true);
      });
  }, []);

  const alege = (c: ContPublic | null) => {
    setAles(c);
    setParola('');
    setEroare('');
    setInfo('');
  };

  const intra = async (e: React.FormEvent) => {
    e.preventDefault();
    const adresa = ales?.email ?? email.trim();
    if (!adresa || !parola) return;
    setLucrez(true);
    setEroare('');
    try {
      const { user } = await signInWithEmailAndPassword(auth, adresa, parola);
      router.replace(await destinatie(user));
    } catch {
      setEroare('Parola nu e corectă.');
      setLucrez(false);
    }
  };

  const uitata = async () => {
    if (ales?.rol === 'instructor') {
      setEroare('');
      return setInfo('Cere-i administratorului o parolă nouă (din Conturi instructori → Parolă nouă).');
    }
    const adresa = ales?.email ?? email.trim();
    if (!adresa.includes('@')) return setEroare('Scrie mai întâi emailul.');
    try {
      await sendPasswordResetEmail(auth, adresa);
      setInfo(`Am trimis un link de resetare la ${adresa}. Dacă nu ai acces la această adresă, cere-i administratorului o parolă nouă.`);
    } catch {
      setEroare('Emailul de resetare nu a putut fi trimis.');
    }
  };

  const formularParola = (
    <form onSubmit={intra} className="space-y-3">
      {cuEmail && !ales && (
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="username" autoFocus className="mt-1.5 h-12" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      )}
      {ales && <input type="email" autoComplete="username" value={ales.email} readOnly hidden />}
      <div>
        <Label htmlFor="parola">Parola</Label>
        <div className="relative mt-1.5">
          <Input
            id="parola"
            type={arata ? 'text' : 'password'}
            autoComplete="current-password"
            autoFocus={!!ales}
            className="h-12 pr-12 text-base"
            value={parola}
            onChange={e => setParola(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setArata(!arata)}
            className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-slate-400"
            aria-label={arata ? 'Ascunde parola' : 'Arată parola'}
          >
            {arata ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {eroare && <p className="text-sm text-red-600">{eroare}</p>}
      {info && <p className="text-sm text-emerald-700">{info}</p>}
      <Button variant="brand" type="submit" className="h-12 w-full text-base" disabled={lucrez || !parola}>
        {lucrez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Intră
      </Button>
      <button type="button" onClick={uitata} className="w-full py-1 text-center text-sm text-slate-500 hover:text-slate-800">
        Am uitat parola
      </button>
    </form>
  );

  return (
    <div className="flex min-h-svh items-center justify-center bg-gradient-to-br from-slate-100 via-white to-orange-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="În Pași de Dans" className="mx-auto h-20 w-auto" />
          <h1 className="mt-2 text-xl font-bold text-slate-900">{ales ? `Bună, ${ales.nume.split(' ')[0]}!` : cuEmail ? 'Intrare' : 'Cine intră?'}</h1>
          <p className="text-sm text-slate-500">{ales ? 'Scrie-ți parola.' : cuEmail ? 'Scrie emailul și parola.' : 'Alege-ți profilul.'}</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
          {ales ? (
            <div className="space-y-4">
              <button type="button" onClick={() => alege(null)} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800">
                <ArrowLeft className="h-4 w-4" /> Alt profil
              </button>
              <div className="flex items-center gap-3">
                <Avatar avatar={ales.avatar} nume={ales.nume} className="h-16 w-16 text-lg" />
                <div>
                  <p className="font-semibold text-slate-900">{ales.nume}</p>
                  <p className="text-xs text-slate-500">{ales.rol === 'admin' ? 'Administrator' : 'Instructor'}</p>
                </div>
              </div>
              {formularParola}
            </div>
          ) : cuEmail ? (
            <div className="space-y-4">
              {conturi && conturi.length > 0 && (
                <button type="button" onClick={() => setCuEmail(false)} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800">
                  <ArrowLeft className="h-4 w-4" /> Înapoi la profiluri
                </button>
              )}
              {formularParola}
            </div>
          ) : conturi === null ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-red-600" />
            </div>
          ) : (
            <>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {conturi.map(c => (
                  <li key={c.uid}>
                    <button
                      type="button"
                      onClick={() => alege(c)}
                      className="flex w-full flex-col items-center gap-2 rounded-2xl border border-transparent px-2 py-3 text-center transition-colors hover:border-red-200 hover:bg-red-50/50"
                    >
                      <Avatar avatar={c.avatar} nume={c.nume} className="h-20 w-20 text-xl ring-2 ring-white shadow-md" />
                      <span className="text-sm font-semibold leading-tight text-slate-900">{c.nume}</span>
                      <span className="text-[11px] uppercase tracking-wide text-slate-400">{c.rol === 'admin' ? 'admin' : 'instructor'}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setCuEmail(true)}
                className="mt-4 flex w-full items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
              >
                <Mail className="h-4 w-4" /> Intră cu emailul
              </button>
            </>
          )}
        </div>
        <InstaleazaAplicatia />
      </div>
    </div>
  );
}
