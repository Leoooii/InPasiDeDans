'use client';

import { useState } from 'react';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/firebase';

export default function LoginInstructor() {
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [eroare, setEroare] = useState('');
  const [info, setInfo] = useState('');
  const [lucrez, setLucrez] = useState(false);

  const intra = async (e: React.FormEvent) => {
    e.preventDefault();
    setLucrez(true);
    setEroare('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), parola);
    } catch {
      setEroare('Email sau parolă greșită.');
      setLucrez(false);
    }
  };

  const reset = async () => {
    if (!email.includes('@')) return setEroare('Scrie mai întâi emailul, apoi apasă „Am uitat parola”.');
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setInfo('Ți-am trimis un email cu linkul de resetare a parolei.');
      setEroare('');
    } catch {
      setEroare('Emailul de resetare nu a putut fi trimis.');
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <form onSubmit={intra} className="w-full max-w-sm space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-center">
          <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-400 text-sm font-bold text-white">
            IP
          </span>
          <h1 className="text-xl font-bold text-slate-900">Evidență instructori</h1>
          <p className="text-sm text-slate-500">În Pași de Dans</p>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" className="mt-1.5 h-11" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="parola">Parolă</Label>
          <Input
            id="parola"
            type="password"
            autoComplete="current-password"
            className="mt-1.5 h-11"
            value={parola}
            onChange={e => setParola(e.target.value)}
            required
          />
        </div>
        {eroare && <p className="text-sm text-red-600">{eroare}</p>}
        {info && <p className="text-sm text-emerald-700">{info}</p>}
        <Button variant="brand" type="submit" className="h-11 w-full" disabled={lucrez}>
          {lucrez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Intră
        </Button>
        <button type="button" onClick={reset} className="w-full text-center text-sm text-slate-500 hover:text-slate-800">
          Am uitat parola
        </button>
      </form>
    </div>
  );
}
