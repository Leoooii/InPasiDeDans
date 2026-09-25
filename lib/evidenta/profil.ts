'use client';

import { useCallback, useEffect, useState } from 'react';
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { actualizeazaContPublic, scrieContPublic } from './conturi-publice';

// Profilul contului logat: numele afișat și avatarul.
// Adminul → `profiluri/{uid}`; instructorii → propriul document din `conturiInstructori`.

export type Profil = { nume: string; avatar: string };

const EVENIMENT = 'profil-actualizat';
const anunta = () => window.dispatchEvent(new Event(EVENIMENT));

export async function incarcaProfilAdmin(uid: string): Promise<Profil> {
  const d = await getDoc(doc(db, 'profiluri', uid));
  const p = (d.data() ?? {}) as Partial<Profil>;
  return { nume: p.nume || 'Admin', avatar: p.avatar || '' };
}

export async function salveazaProfilAdmin(uid: string, p: Profil) {
  await setDoc(doc(db, 'profiluri', uid), { nume: p.nume.trim() || 'Admin', avatar: p.avatar }, { merge: true });
  await scrieContPublic({ uid, nume: p.nume.trim() || 'Admin', avatar: p.avatar, email: auth.currentUser?.email ?? '', rol: 'admin', activ: true }).catch(
    console.error,
  );
  anunta();
}

export async function salveazaProfilInstructor(uid: string, p: Profil) {
  await updateDoc(doc(db, 'conturiInstructori', uid), { nume: p.nume.trim(), avatar: p.avatar });
  // lista de la intrare; dacă lipsește, o recreează adminul din Conturi instructori
  await actualizeazaContPublic(uid, { nume: p.nume.trim(), avatar: p.avatar }).catch(console.error);
  anunta();
}

/** Profilul adminului logat, actualizat automat după salvare. */
export function useProfilAdmin(): Profil | null {
  const [profil, setProfil] = useState<Profil | null>(null);
  const incarca = useCallback(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    incarcaProfilAdmin(uid)
      .then(setProfil)
      .catch(() => setProfil({ nume: 'Admin', avatar: '' }));
  }, []);
  useEffect(() => {
    const stop = onAuthStateChanged(auth, u => u && incarca());
    window.addEventListener(EVENIMENT, incarca);
    return () => {
      stop();
      window.removeEventListener(EVENIMENT, incarca);
    };
  }, [incarca]);
  return profil;
}

/** Ascultă salvările de profil (ex. portalul instructorului își reîncarcă contul). */
export function laProfilActualizat(fn: () => void) {
  window.addEventListener(EVENIMENT, fn);
  return () => window.removeEventListener(EVENIMENT, fn);
}

const MESAJE: Record<string, string> = {
  'auth/wrong-password': 'Parola actuală nu e corectă.',
  'auth/invalid-credential': 'Parola actuală nu e corectă.',
  'auth/weak-password': 'Parola nouă trebuie să aibă cel puțin 6 caractere.',
  'auth/too-many-requests': 'Prea multe încercări. Mai încearcă peste câteva minute.',
};

/** Schimbă parola contului logat (Firebase cere reconfirmarea parolei actuale). */
export async function schimbaParola(actuala: string, noua: string) {
  const u = auth.currentUser;
  if (!u?.email) throw new Error('Nu ești autentificat.');
  try {
    await reauthenticateWithCredential(u, EmailAuthProvider.credential(u.email, actuala));
    await updatePassword(u, noua);
  } catch (e) {
    const cod = (e as { code?: string }).code ?? '';
    throw new Error(MESAJE[cod] ?? 'Parola nu a putut fi schimbată.');
  }
}
