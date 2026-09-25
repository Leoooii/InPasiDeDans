'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePublicData } from '@/components/public-data-provider';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { auth } from '@/lib/firebase';
import { cheie, predaInstructorul } from '@/lib/evidenta/instructori-grupe';
import { salveazaProfilAdmin, useProfilAdmin } from '@/lib/evidenta/profil';
import { creeazaContInstructor } from '@/lib/evidenta/repo';
import type { ContInstructor } from '@/lib/evidenta/tipuri';
import { cn } from '@/lib/utils';
import { Avatar } from './avatar';
import { useEvidenta } from './context';

// Instructorul care folosește contul de admin (nu primește cont de instructor).
const INSTRUCTOR_ADMIN = 'Alexandra Dumitrache';
const DOMENIU = 'inpasidedans.ro';

const parolaNoua = () => {
  const litere = 'abcdefghjkmnpqrstuvwxyz23456789';
  return Array.from(crypto.getRandomValues(new Uint32Array(10)), n => litere[n % litere.length]).join('');
};

type Rezultat = { nume: string; email: string; parola: string };

/**
 * Creează dintr-un clic conturile instructorilor din pagina Instructori care au grupe:
 * email prenume@inpasidedans.ro, poza de pe site ca avatar, grupele lor atribuite.
 */
export function ConturiAutomate({ conturi, onGata }: { conturi: ContInstructor[]; onGata: () => void }) {
  const { instructori } = usePublicData();
  const { toateGrupele: grupe, actor } = useEvidenta();
  const profilAdmin = useProfilAdmin();
  const { showToast } = useSimpleToast();
  const [debifati, setDebifati] = useState<Set<string>>(new Set());
  const [lucrez, setLucrez] = useState(false);
  const [rezultate, setRezultate] = useState<Rezultat[] | null>(null);
  const [copiat, setCopiat] = useState(false);

  const propuneri = useMemo(() => {
    return (instructori ?? [])
      .filter(i => cheie(i.name) !== cheie(INSTRUCTOR_ADMIN))
      .map(i => {
        const prenume = cheie(i.name.split(/\s+/)[0]);
        const email = `${prenume.replace(/[^a-z]/g, '')}@${DOMENIU}`;
        const grupeLui = grupe.filter(g => predaInstructorul(g, prenume));
        const existent = conturi.find(c => c.email.replace(/\+[^@]*/, '') === email || cheie(c.nume) === cheie(i.name));
        return { id: i.id, nume: i.name, avatar: i.imageUrl, email, grupe: grupeLui, existent };
      })
      .filter(p => p.grupe.length > 0);
  }, [instructori, grupe, conturi]);

  const deCreat = propuneri.filter(p => !p.existent && !debifati.has(p.id));
  const adminDeSetat =
    profilAdmin && profilAdmin.nume === 'Admin' ? (instructori ?? []).find(i => cheie(i.name) === cheie(INSTRUCTOR_ADMIN)) : undefined;

  if (!rezultate && !propuneri.some(p => !p.existent) && !adminDeSetat) return null;

  const creeaza = async () => {
    setLucrez(true);
    const create: Rezultat[] = [];
    try {
      if (adminDeSetat && auth.currentUser) {
        await salveazaProfilAdmin(auth.currentUser.uid, { nume: adminDeSetat.name, avatar: adminDeSetat.imageUrl });
      }
      for (const p of deCreat) {
        const parola = parolaNoua();
        await creeazaContInstructor({ nume: p.nume, email: p.email, parola, grupe: p.grupe.map(g => g.id), avatar: p.avatar }, actor);
        create.push({ nume: p.nume, email: p.email, parola });
      }
      setRezultate(create);
      showToast(`${create.length} conturi create.`, 'success');
    } catch (e) {
      setRezultate(create);
      showToast(e instanceof Error ? e.message : 'Nu s-au putut crea toate conturile.', 'error');
    } finally {
      setLucrez(false);
      onGata();
    }
  };

  const copiaza = async () => {
    const text = (rezultate ?? []).map(r => `${r.nume}: ${r.email} / parola: ${r.parola}`).join('\n');
    await navigator.clipboard.writeText(`Evidență În Pași de Dans — intrare: https://www.${DOMENIU}/panou\n\n${text}`);
    setCopiat(true);
  };

  if (rezultate) {
    return (
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <p className="font-semibold text-emerald-900">Conturile au fost create</p>
        <p className="mt-1 text-sm text-emerald-800">
          Notează parolele acum (nu mai apar a doua oară) și trimite-le instructorilor. Ei intră pe <strong>{DOMENIU}/panou</strong>, își aleg
          poza și scriu parola; o pot schimba din „Contul meu”.
        </p>
        <ul className="mt-3 divide-y divide-emerald-100 rounded-xl bg-white">
          {rezultate.map(r => (
            <li key={r.email} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-3 py-2 text-sm">
              <span className="font-medium text-slate-900">{r.nume}</span>
              <span className="text-slate-500">{r.email}</span>
              <span className="ml-auto rounded bg-slate-100 px-2 py-0.5 font-mono text-slate-900">{r.parola}</span>
            </li>
          ))}
        </ul>
        <Button variant="outline" className="mt-3 h-10" onClick={copiaza}>
          {copiat ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
          {copiat ? 'Copiat' : 'Copiază tot'}
        </Button>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4">
      <p className="flex items-center gap-2 font-semibold text-sky-900">
        <Sparkles className="h-4 w-4" /> Conturi pentru instructorii de pe site
      </p>
      <p className="mt-1 text-sm text-sky-800">
        Instructorii din pagina Instructori care au grupe primesc cont cu poza lor și grupele deja atribuite (grupele comune apar la amândoi).
      </p>
      <ul className="mt-3 space-y-2">
        {adminDeSetat && (
          <li className="flex items-center gap-3 rounded-xl bg-white px-3 py-2">
            <Avatar avatar={adminDeSetat.imageUrl} nume={adminDeSetat.name} />
            <span className="min-w-0 flex-1 text-sm">
              <span className="block font-medium text-slate-900">{adminDeSetat.name}</span>
              <span className="block text-xs text-slate-500">Profilul contului de admin (nume și poză)</span>
            </span>
          </li>
        )}
        {propuneri.map(p => {
          const ales = !p.existent && !debifati.has(p.id);
          return (
            <li key={p.id} className={cn('flex items-center gap-3 rounded-xl bg-white px-3 py-2', p.existent && 'opacity-60')}>
              <Avatar avatar={p.avatar} nume={p.nume} />
              <span className="min-w-0 flex-1 text-sm">
                <span className="block font-medium text-slate-900">{p.nume}</span>
                <span className="block truncate text-xs text-slate-500">
                  {p.existent ? 'are deja cont' : p.email} · {p.grupe.length} {p.grupe.length === 1 ? 'grupă' : 'grupe'}
                </span>
              </span>
              {!p.existent && (
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-red-600"
                  checked={ales}
                  aria-label={`Creează cont pentru ${p.nume}`}
                  onChange={() =>
                    setDebifati(d => {
                      const n = new Set(d);
                      if (n.has(p.id)) n.delete(p.id);
                      else n.add(p.id);
                      return n;
                    })
                  }
                />
              )}
            </li>
          );
        })}
      </ul>
      <Button variant="brand" className="mt-3 h-11" onClick={creeaza} disabled={lucrez || (!deCreat.length && !adminDeSetat)}>
        {lucrez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {deCreat.length ? `Creează ${deCreat.length} ${deCreat.length === 1 ? 'cont' : 'conturi'}` : 'Salvează profilul de admin'}
      </Button>
    </section>
  );
}
