'use client';

import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  type QueryConstraint,
  type WriteBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { acoperaZiua, alegeAbonament, laSedintaNoua, perioada, type TipAbonament } from './abonament';
import { adaugaZile, azi, dataScurta, ziuaDin } from './date';
import type {
  Abonament,
  Actor,
  ContInstructor,
  Cursant,
  GrupaEvidenta,
  IntrareJurnal,
  Prezenta,
  TipJurnal,
} from './tipuri';

// Toate citirile/scrierile evidenței. Rulează în browser, cu utilizatorul autentificat,
// deci regulile Firestore (firestore.rules) decid ce are voie adminul vs. instructorul.
// Fiecare acțiune scrie și o intrare în `jurnal`, în același batch.

const col = (nume: string) => collection(db, nume);
const cuId = <T,>(d: { id: string; data: () => unknown }) => ({ id: d.id, ...(d.data() as object) }) as T;

function jurnal(
  b: WriteBatch,
  actor: Actor,
  tip: TipJurnal,
  mesaj: string,
  extra: { cursantId?: string; grupaId?: string; abonamentId?: string } = {},
) {
  const curat = Object.fromEntries(Object.entries(extra).filter(([, v]) => v !== undefined));
  b.set(doc(col('jurnal')), { tip, mesaj, ...curat, actor, createdAt: Date.now() });
}

// ── Grupe (doar citire din colecția site-ului) ──────────────────────────

export async function incarcaGrupe(): Promise<GrupaEvidenta[]> {
  const snap = await getDocs(col('grupe'));
  return snap.docs
    .map(d => {
      const g = d.data() as Record<string, unknown>;
      const program = String(g.program ?? '');
      const ora = program.match(/\d{1,2}:\d{2}(\s*-\s*\d{1,2}:\d{2})?/)?.[0] ?? '';
      return {
        id: d.id,
        titlu: String(g.titlu ?? 'Grupă').trim(),
        instructor: String(g.instructor ?? ''),
        zile: Array.isArray(g.zile) ? (g.zile as string[]) : [],
        ora,
        publica: g.publica === true,
      };
    })
    .sort((a, b) => a.ora.localeCompare(b.ora) || a.titlu.localeCompare(b.titlu, 'ro'));
}

// ── Citiri ──────────────────────────────────────────────────────────────

export async function incarcaCursanti(): Promise<Cursant[]> {
  const snap = await getDocs(col('cursanti'));
  return snap.docs
    .map(d => {
      const c = cuId<Cursant>(d);
      return { ...c, grupe: c.grupe ?? [], activ: c.activ !== false };
    })
    .sort((a, b) => a.nume.localeCompare(b.nume, 'ro'));
}

export async function incarcaCursant(id: string): Promise<Cursant | null> {
  const d = await getDoc(doc(db, 'cursanti', id));
  if (!d.exists()) return null;
  const c = cuId<Cursant>(d);
  return { ...c, grupe: c.grupe ?? [], activ: c.activ !== false };
}

export async function incarcaAbonamente(cursantId?: string): Promise<Abonament[]> {
  const q = cursantId ? query(col('abonamente'), where('cursantId', '==', cursantId)) : col('abonamente');
  const snap = await getDocs(q);
  return snap.docs.map(d => cuId<Abonament>(d)).sort((a, b) => b.createdAt - a.createdAt);
}

export async function incarcaPrezente(f: {
  grupaId?: string;
  data?: string;
  cursantId?: string;
  deLa?: string;
  panaLa?: string;
  neacoperite?: boolean;
}): Promise<Prezenta[]> {
  const c: QueryConstraint[] = [];
  if (f.grupaId) c.push(where('grupaId', '==', f.grupaId));
  if (f.data) c.push(where('data', '==', f.data));
  if (f.cursantId) c.push(where('cursantId', '==', f.cursantId));
  if (f.neacoperite) c.push(where('abonamentId', '==', null));
  // intervalul se aplică pe server doar când nu există alte filtre (evită indecșii compuși)
  const interval = !c.length && (f.deLa || f.panaLa);
  if (interval && f.deLa) c.push(where('data', '>=', f.deLa));
  if (interval && f.panaLa) c.push(where('data', '<=', f.panaLa));
  const snap = await getDocs(query(col('prezente'), ...c));
  return snap.docs
    .map(d => cuId<Prezenta>(d))
    .filter(p => (!f.deLa || p.data >= f.deLa) && (!f.panaLa || p.data <= f.panaLa))
    .sort((a, b) => b.data.localeCompare(a.data) || a.cursantNume.localeCompare(b.cursantNume, 'ro'));
}

export async function incarcaJurnal(max = 500): Promise<IntrareJurnal[]> {
  const snap = await getDocs(query(col('jurnal'), orderBy('createdAt', 'desc'), limit(max)));
  return snap.docs.map(d => cuId<IntrareJurnal>(d));
}

export async function incarcaConturi(): Promise<ContInstructor[]> {
  const snap = await getDocs(col('conturiInstructori'));
  return snap.docs
    .map(d => ({ uid: d.id, ...(d.data() as Omit<ContInstructor, 'uid'>) }))
    .map(c => ({ ...c, grupe: c.grupe ?? [] }))
    .sort((a, b) => a.nume.localeCompare(b.nume, 'ro'));
}

export async function contInstructor(uid: string): Promise<ContInstructor | null> {
  const d = await getDoc(doc(db, 'conturiInstructori', uid));
  if (!d.exists()) return null;
  const c = d.data() as Omit<ContInstructor, 'uid'>;
  return { ...c, uid, grupe: c.grupe ?? [] };
}

// ── Cursanți ────────────────────────────────────────────────────────────

export async function creeazaCursant(
  date: { nume: string; telefon?: string; email?: string; observatii?: string; grupe: string[] },
  actor: Actor,
  grupe: GrupaEvidenta[] = [],
): Promise<string> {
  const b = writeBatch(db);
  const ref = doc(col('cursanti'));
  b.set(ref, {
    nume: date.nume.trim(),
    telefon: date.telefon?.trim() || '',
    email: date.email?.trim() || '',
    observatii: date.observatii?.trim() || '',
    grupe: date.grupe,
    activ: true,
    createdAt: Date.now(),
    createdBy: actor,
  });
  const inGrupe = grupe.filter(g => date.grupe.includes(g.id)).map(g => g.titlu);
  jurnal(b, actor, 'cursant_adaugat', `${date.nume.trim()} a fost adăugat${inGrupe.length ? ` în ${inGrupe.join(', ')}` : ''}`, {
    cursantId: ref.id,
    grupaId: date.grupe[0],
  });
  await b.commit();
  return ref.id;
}

export async function actualizeazaCursant(
  c: Cursant,
  modif: Partial<Pick<Cursant, 'nume' | 'telefon' | 'email' | 'observatii'>>,
  actor: Actor,
) {
  const b = writeBatch(db);
  b.update(doc(db, 'cursanti', c.id), modif);
  const campuri = Object.keys(modif)
    .map(k => ({ nume: 'nume', telefon: 'telefon', email: 'email', observatii: 'observații' })[k as 'nume'])
    .join(', ');
  jurnal(b, actor, 'cursant_modificat', `${c.nume}: modificat ${campuri}`, { cursantId: c.id });
  await b.commit();
}

export async function schimbaGrupa(c: Cursant, grupa: GrupaEvidenta, adauga: boolean, actor: Actor) {
  const b = writeBatch(db);
  b.update(doc(db, 'cursanti', c.id), { grupe: adauga ? arrayUnion(grupa.id) : arrayRemove(grupa.id) });
  jurnal(
    b,
    actor,
    adauga ? 'adaugat_in_grupa' : 'scos_din_grupa',
    `${c.nume} ${adauga ? 'a fost adăugat în' : 'a fost scos din'} ${grupa.titlu}`,
    { cursantId: c.id, grupaId: grupa.id },
  );
  await b.commit();
}

export async function arhiveazaCursant(c: Cursant, activ: boolean, actor: Actor) {
  const b = writeBatch(db);
  b.update(doc(db, 'cursanti', c.id), { activ });
  jurnal(b, actor, 'cursant_arhivat', `${c.nume} a fost ${activ ? 'reactivat' : 'arhivat'}`, { cursantId: c.id });
  await b.commit();
}

/** Șterge definitiv cursantul, abonamentele și prezențele lui (doar admin). */
export async function stergeCursant(c: Cursant, actor: Actor) {
  const [ab, pr] = await Promise.all([incarcaAbonamente(c.id), incarcaPrezente({ cursantId: c.id })]);
  const refs = [doc(db, 'cursanti', c.id), ...ab.map(a => doc(db, 'abonamente', a.id)), ...pr.map(p => doc(db, 'prezente', p.id))];
  for (let i = 0; i < refs.length; i += 400) {
    const b = writeBatch(db);
    refs.slice(i, i + 400).forEach(r => b.delete(r));
    if (i === 0) {
      jurnal(b, actor, 'cursant_sters', `${c.nume} a fost șters definitiv (${ab.length} abonamente, ${pr.length} prezențe)`, {
        cursantId: c.id,
      });
    }
    await b.commit();
  }
}

// ── Abonamente ──────────────────────────────────────────────────────────

/**
 * Înregistrează un abonament. Ședințele deja făcute fără abonament în perioada lui
 * (ex. a plătit după a doua ședință) se leagă automat de el.
 */
export async function vindeAbonament(
  c: Cursant,
  tip: TipAbonament,
  dataStart: string,
  actor: Actor,
  expirareManuala?: string,
): Promise<{ id: string; atasate: number }> {
  const per = perioada(tip, dataStart);
  const ab: Omit<Abonament, 'id'> = {
    cursantId: c.id,
    cursantNume: c.nume,
    tarifId: tip.tarifId,
    tip: tip.tip,
    categorie: tip.categorie,
    pret: tip.pret,
    sedinteTotal: tip.sedinteTotal,
    sedinteFolosite: 0,
    dataVanzare: azi(),
    dataStart: per.dataStart,
    dataExpirare: expirareManuala && per.dataStart ? expirareManuala : per.dataExpirare,
    anulat: false,
    createdAt: Date.now(),
    createdBy: actor,
  };
  const ref = doc(col('abonamente'));

  // ședințe neacoperite care intră în perioada noului abonament
  const neacoperite = (await incarcaPrezente({ cursantId: c.id }))
    .filter(p => !p.abonamentId && (per.dataStart ? p.data >= per.dataStart : p.data >= ab.dataVanzare))
    .sort((a, b) => a.data.localeCompare(b.data));
  let curent = { ...ab, id: ref.id } as Abonament;
  const atasate: Prezenta[] = [];
  for (const p of neacoperite) {
    if (!acoperaZiua(curent, p.data)) continue;
    curent = { ...curent, ...laSedintaNoua(curent, p.data) };
    atasate.push(p);
  }

  const b = writeBatch(db);
  const { id: _omit, ...deSalvat } = curent;
  b.set(ref, deSalvat);
  atasate.forEach(p => b.update(doc(db, 'prezente', p.id), { abonamentId: ref.id }));
  const perioadaText = curent.dataStart
    ? `${dataScurta(curent.dataStart)} – ${dataScurta(curent.dataExpirare ? adaugaZile(curent.dataExpirare, -1) : null)}`
    : 'pornește la prima ședință';
  jurnal(
    b,
    actor,
    'abonament_creat',
    `${c.nume}: ${tip.tip} (${tip.pret} lei), ${perioadaText}${atasate.length ? ` · ${atasate.length} ședințe anterioare incluse` : ''}`,
    { cursantId: c.id, abonamentId: ref.id },
  );
  await b.commit();
  return { id: ref.id, atasate: atasate.length };
}

/** Anulează (nu șterge) un abonament; ședințele lui devin neacoperite. Doar admin. */
export async function anuleazaAbonament(a: Abonament, actor: Actor, motiv = '') {
  const legate = (await incarcaPrezente({ cursantId: a.cursantId })).filter(p => p.abonamentId === a.id);
  const b = writeBatch(db);
  b.update(doc(db, 'abonamente', a.id), { anulat: true });
  legate.forEach(p => b.update(doc(db, 'prezente', p.id), { abonamentId: null }));
  jurnal(b, actor, 'abonament_anulat', `${a.cursantNume}: ${a.tip} anulat${motiv ? ` (${motiv})` : ''}`, {
    cursantId: a.cursantId,
    abonamentId: a.id,
  });
  await b.commit();
}

// ── Prezență ────────────────────────────────────────────────────────────

export const idPrezenta = (grupaId: string, data: string, cursantId: string) => `${grupaId}_${data}_${cursantId}`;

export type RezultatPrezenta = { salvate: number; neacoperite: string[] };

/** Salvează prezența pentru o grupă într-o zi; fiecare ședință se scade din abonamentul valabil. */
export async function salveazaPrezente(
  grupa: GrupaEvidenta,
  data: string,
  lista: { cursant: Cursant; recuperare: boolean }[],
  actor: Actor,
): Promise<RezultatPrezenta> {
  const existente = new Set((await incarcaPrezente({ grupaId: grupa.id, data })).map(p => p.cursantId));
  const noi = lista.filter(x => !existente.has(x.cursant.id));
  if (!noi.length) return { salvate: 0, neacoperite: [] };

  const abonamente = await Promise.all(noi.map(x => incarcaAbonamente(x.cursant.id)));
  const b = writeBatch(db);
  const neacoperite: string[] = [];

  noi.forEach(({ cursant, recuperare }, i) => {
    const ab = alegeAbonament(abonamente[i], data);
    b.set(doc(db, 'prezente', idPrezenta(grupa.id, data, cursant.id)), {
      cursantId: cursant.id,
      cursantNume: cursant.nume,
      grupaId: grupa.id,
      grupaTitlu: grupa.titlu,
      data,
      abonamentId: ab?.id ?? null,
      recuperare,
      createdAt: Date.now(),
      createdBy: actor,
    });
    if (ab) {
      const m = laSedintaNoua(ab, data);
      b.update(doc(db, 'abonamente', ab.id), { ...m, sedinteFolosite: increment(1) });
    } else {
      neacoperite.push(cursant.nume);
      jurnal(b, actor, 'prezenta_neacoperita', `${cursant.nume} a venit pe ${dataScurta(data)} la ${grupa.titlu} fără abonament valabil`, {
        cursantId: cursant.id,
        grupaId: grupa.id,
      });
    }
  });

  const recuperari = noi.filter(x => x.recuperare).length;
  jurnal(
    b,
    actor,
    'prezenta_salvata',
    `Prezență ${grupa.titlu}, ${dataScurta(data)}: ${noi.map(x => x.cursant.nume).join(', ')}${recuperari ? ` (${recuperari} la recuperare)` : ''}`,
    { grupaId: grupa.id },
  );
  await b.commit();
  return { salvate: noi.length, neacoperite };
}

export async function anuleazaPrezenta(p: Prezenta, actor: Actor) {
  const b = writeBatch(db);
  b.delete(doc(db, 'prezente', p.id));
  if (p.abonamentId) {
    const ref = doc(db, 'abonamente', p.abonamentId);
    const ab = await getDoc(ref);
    if (ab.exists()) {
      const a = ab.data() as Abonament;
      const modif: { [k: string]: ReturnType<typeof increment> | null } = { sedinteFolosite: increment(-1) };
      // Full Pass pornit chiar de această ședință: revine la „neînceput"
      if (a.sedinteTotal === null && a.sedinteFolosite <= 1 && a.dataStart === p.data) {
        modif.dataStart = null;
        modif.dataExpirare = null;
      }
      b.update(ref, modif);
    }
  }
  jurnal(b, actor, 'prezenta_anulata', `Prezență anulată: ${p.cursantNume}, ${p.grupaTitlu}, ${dataScurta(p.data)}`, {
    cursantId: p.cursantId,
    grupaId: p.grupaId,
  });
  await b.commit();
}

// ── Conturi instructori (doar admin) ────────────────────────────────────

const MESAJE_AUTH: Record<string, string> = {
  EMAIL_EXISTS: 'Există deja un cont cu acest email.',
  INVALID_EMAIL: 'Adresa de email nu e validă.',
  WEAK_PASSWORD: 'Parola trebuie să aibă cel puțin 6 caractere.',
  OPERATION_NOT_ALLOWED: 'Autentificarea cu email și parolă nu e activată în Firebase.',
};

/**
 * Creează contul prin REST (Identity Toolkit), nu prin SDK: createUserWithEmailAndPassword
 * ar autentifica noul cont în locul adminului.
 */
export async function creeazaContInstructor(date: { nume: string; email: string; parola: string; grupe: string[] }, actor: Actor) {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: date.email.trim(), password: date.parola, returnSecureToken: false }),
    },
  );
  const json = await res.json();
  if (!res.ok) {
    const cod = String(json?.error?.message ?? '').split(' ')[0];
    throw new Error(MESAJE_AUTH[cod] ?? `Contul nu a putut fi creat (${cod || res.status}).`);
  }
  const uid = json.localId as string;
  await setDoc(doc(db, 'conturiInstructori', uid), {
    nume: date.nume.trim(),
    email: date.email.trim().toLowerCase(),
    grupe: date.grupe,
    activ: true,
    createdAt: Date.now(),
  });
  const b = writeBatch(db);
  jurnal(b, actor, 'cont_instructor', `Cont de instructor creat: ${date.nume.trim()} (${date.email.trim()})`);
  await b.commit();
  return uid;
}

export async function actualizeazaCont(
  cont: ContInstructor,
  modif: Partial<Pick<ContInstructor, 'nume' | 'grupe' | 'activ'>>,
  actor: Actor,
  grupe: GrupaEvidenta[],
) {
  const b = writeBatch(db);
  b.update(doc(db, 'conturiInstructori', cont.uid), modif);
  const parti: string[] = [];
  if (modif.activ !== undefined) parti.push(modif.activ ? 'activat' : 'dezactivat');
  if (modif.grupe) {
    const titluri = grupe.filter(g => modif.grupe!.includes(g.id)).map(g => g.titlu);
    parti.push(`grupe: ${titluri.join(', ') || 'niciuna'}`);
  }
  if (modif.nume) parti.push(`nume: ${modif.nume}`);
  jurnal(b, actor, 'cont_instructor', `Cont ${cont.nume}: ${parti.join('; ')}`);
  await b.commit();
}

// ── Migrarea din formatul vechi (abonamente/prezențe ca liste în documentul cursantului) ──

type TimestampVechi = { toDate: () => Date };
type CursantVechi = Cursant & {
  abonamente?: { tip: string; sedinteTotal: number; dataStart: TimestampVechi }[];
  prezente?: { data: TimestampVechi; grupaId: string; grupaTitlu?: string }[];
};

export const areDateVechi = (c: Cursant) => {
  const v = c as CursantVechi;
  return Array.isArray(v.abonamente) || Array.isArray(v.prezente) || (c as { activ?: unknown }).activ === undefined;
};

/** Mută abonamentele și prezențele vechi în colecțiile noi; o singură dată, din admin. */
export async function migreazaDateVechi(actor: Actor, grupe: GrupaEvidenta[]) {
  const snap = await getDocs(col('cursanti'));
  let nrAb = 0;
  let nrPr = 0;
  let nrC = 0;
  for (const d of snap.docs) {
    const c = { id: d.id, ...(d.data() as object) } as CursantVechi;
    if (!areDateVechi(c)) continue;
    nrC++;
    const b = writeBatch(db);
    const ziDin = (t: TimestampVechi) => ziuaDin(t.toDate().getTime());

    const abonamente: Abonament[] = (c.abonamente ?? []).map(a => {
      const ref = doc(col('abonamente'));
      const start = ziDin(a.dataStart);
      const nelimitat = a.sedinteTotal >= 99;
      return {
        id: ref.id,
        cursantId: c.id,
        cursantNume: c.nume,
        tarifId: '',
        tip: a.tip,
        categorie: 'adulti',
        pret: 0,
        sedinteTotal: nelimitat ? null : a.sedinteTotal,
        sedinteFolosite: 0,
        dataVanzare: start,
        dataStart: start,
        dataExpirare: adaugaZile(start, 28),
        anulat: false,
        createdAt: a.dataStart.toDate().getTime(),
        createdBy: actor,
      };
    });

    const prezente = [...(c.prezente ?? [])].sort((x, y) => x.data.toDate().getTime() - y.data.toDate().getTime());
    for (const p of prezente) {
      const data = ziDin(p.data);
      const ab = alegeAbonament(abonamente, data);
      if (ab) ab.sedinteFolosite++;
      b.set(doc(db, 'prezente', idPrezenta(p.grupaId, data, c.id)), {
        cursantId: c.id,
        cursantNume: c.nume,
        grupaId: p.grupaId,
        grupaTitlu: p.grupaTitlu || grupe.find(g => g.id === p.grupaId)?.titlu || 'Grupă',
        data,
        abonamentId: ab?.id ?? null,
        recuperare: !(c.grupe ?? []).includes(p.grupaId),
        createdAt: p.data.toDate().getTime(),
        createdBy: actor,
      });
      nrPr++;
    }
    abonamente.forEach(({ id, ...a }) => b.set(doc(db, 'abonamente', id), a));
    nrAb += abonamente.length;

    b.update(doc(db, 'cursanti', c.id), {
      abonamente: deleteField(),
      prezente: deleteField(),
      grupe: c.grupe ?? [],
      activ: true,
      telefon: c.telefon ?? '',
      email: c.email ?? '',
      observatii: c.observatii ?? '',
    });
    await b.commit();
  }
  const b = writeBatch(db);
  jurnal(b, actor, 'cursant_modificat', `Date mutate din evidența veche: ${nrC} cursanți, ${nrAb} abonamente, ${nrPr} prezențe`);
  await b.commit();
  return { cursanti: nrC, abonamente: nrAb, prezente: nrPr };
}
