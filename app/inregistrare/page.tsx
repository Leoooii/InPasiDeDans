'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import Head from './head';

export default function InregistrarePage() {
  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useSimpleToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast('Parolele nu coincid', 'info');
      return;
    }

    setIsLoading(true);

    try {
      // Creăm utilizatorul în Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Actualizăm profilul utilizatorului
      await updateProfile(user, {
        displayName: `${nume} ${prenume}`,
      });

      // Salvăm datele utilizatorului în Firestore
      await setDoc(doc(db, 'users', user.uid), {
        nume,
        prenume,
        email,
        telefon,
        dataInregistrare: Timestamp.now(),
        aprobat: false, // Utilizatorul trebuie aprobat de admin
        role: 'cursant',
        dataInceputCursuri: null,
        grupe: [],
        abonamente: [],
      });

      showToast(
        'Înregistrare reușită. Contul tău a fost creat. Așteptăm aprobarea administratorului.',
        'success'
      );

      // Redirecționăm către pagina de cont
      router.push('/cont');
    } catch (error: any) {
      console.error('Eroare la înregistrare:', error);

      let errorMessage = 'A apărut o eroare la înregistrare';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Există deja un cont cu acest email';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Parola este prea slabă';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Adresa de email nu este validă';
      }

      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-5rem)] py-12">
      <Head />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Înregistrare cont nou
          </CardTitle>
          <CardDescription>
            Completează formularul pentru a crea un cont nou
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nume">Nume</Label>
                <Input
                  id="nume"
                  value={nume}
                  onChange={e => setNume(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenume">Prenume</Label>
                <Input
                  id="prenume"
                  value={prenume}
                  onChange={e => setPrenume(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nume@exemplu.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefon">Telefon</Label>
              <Input
                id="telefon"
                type="tel"
                placeholder="07xxxxxxxx"
                value={telefon}
                onChange={e => setTelefon(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Parolă</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmă parola</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Se procesează...' : 'Înregistrare'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center mt-2">
            <p>
              Ai deja cont?{' '}
              <Link
                href="/autentificare"
                className="text-red-600 hover:underline"
              >
                Autentifică-te
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
