'use client';

import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Lista de pe pagina de intrare (/panou): cine are cont, cu nume și avatar, ca să-și aleagă
// profilul și să scrie doar parola. E citibilă public, deci conține strictul necesar.

export type ContPublic = {
  uid: string;
  nume: string;
  avatar: string;
  email: string;
  rol: 'admin' | 'instructor';
  activ: boolean;
};

export async function incarcaConturiPublice(): Promise<ContPublic[]> {
  const snap = await getDocs(query(collection(db, 'conturiPublice'), where('activ', '==', true)));
  return snap.docs
    .map(d => ({ uid: d.id, ...(d.data() as Omit<ContPublic, 'uid'>) }))
    .sort((a, b) => (a.rol === b.rol ? a.nume.localeCompare(b.nume, 'ro') : a.rol === 'admin' ? -1 : 1));
}

export async function scrieContPublic(c: ContPublic) {
  const { uid, ...date } = c;
  await setDoc(doc(db, 'conturiPublice', uid), { ...date, avatar: date.avatar ?? '' });
}

/** Doar numele și avatarul (ce are voie și proprietarul contului să schimbe). */
export async function actualizeazaContPublic(uid: string, date: { nume: string; avatar: string }) {
  await setDoc(doc(db, 'conturiPublice', uid), date, { merge: true });
}

export async function stergeContPublic(uid: string) {
  await deleteDoc(doc(db, 'conturiPublice', uid));
}
