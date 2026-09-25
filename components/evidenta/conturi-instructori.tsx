'use client';

import { useCallback, useEffect, useState } from 'react';
import { Check, Copy, KeyRound, Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { auth } from '@/lib/firebase';
import { actualizeazaCont, creeazaContInstructor, incarcaConturi, parolaNouaInstructor } from '@/lib/evidenta/repo';
import { scrieContPublic } from '@/lib/evidenta/conturi-publice';
import { incarcaProfilAdmin } from '@/lib/evidenta/profil';
import { ConturiAutomate } from './conturi-automate';
import type { ContInstructor, GrupaEvidenta } from '@/lib/evidenta/tipuri';
import { cn } from '@/lib/utils';
import { useEvidenta } from './context';
import { Gol, Incarcare } from './ui';
import { AlegeAvatar, Avatar } from './avatar';

function AlegeGrupe({ grupe, alese, onChange }: { grupe: GrupaEvidenta[]; alese: string[]; onChange: (g: string[]) => void }) {
  return (
    <div className="flex max-h-64 min-w-0 flex-col gap-1 overflow-y-auto overflow-x-hidden rounded-xl border border-slate-200 p-1.5">
      {grupe.map(g => {
        const ales = alese.includes(g.id);
        return (
          <button
            key={g.id}
            type="button"
            onClick={() => onChange(ales ? alese.filter(x => x !== g.id) : [...alese, g.id])}
            className={cn('flex w-full min-w-0 items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm', ales ? 'bg-red-50 text-red-800' : 'hover:bg-slate-50')}
          >
            <span className={cn('h-4 w-4 shrink-0 rounded border', ales ? 'border-red-500 bg-red-500' : 'border-slate-300')} />
            <span className="min-w-0 flex-1 truncate">
              {g.titlu}
              <span className="text-slate-400"> · {[g.zile.join(', '), g.ora, g.instructor].filter(Boolean).join(' · ')}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Conturile instructorilor: creare, grupe atribuite, activare, resetare parolă. */
export function ConturiInstructori() {
  const { toateGrupele: grupe, actor } = useEvidenta();
  const { showToast } = useSimpleToast();
  const [conturi, setConturi] = useState<ContInstructor[] | null>(null);
  const [nou, setNou] = useState(false);
  const [editat, setEditat] = useState<ContInstructor | null>(null);
  const [profil, setProfil] = useState<ContInstructor | null>(null);
  const [profilNou, setProfilNou] = useState({ nume: '', avatar: '' });
  const [f, setF] = useState({ nume: '', email: '', parola: '' });
  const [alese, setAlese] = useState<string[]>([]);
  const [lucrez, setLucrez] = useState(false);

  const incarca = useCallback(async () => {
    try {
      const lista = await incarcaConturi();
      setConturi(lista);
      // ține la zi lista de profiluri de pe pagina de intrare (/panou)
      const u = auth.currentUser;
      const admin = u ? await incarcaProfilAdmin(u.uid) : null;
      await Promise.all([
        ...lista.map(c =>
          scrieContPublic({ uid: c.uid, nume: c.nume, avatar: c.avatar ?? '', email: c.email, rol: 'instructor', activ: c.activ }),
        ),
        ...(u && admin ? [scrieContPublic({ uid: u.uid, nume: admin.nume, avatar: admin.avatar, email: u.email ?? '', rol: 'admin', activ: true })] : []),
      ]).catch(console.error);
    } catch (e) {
      console.error(e);
      setConturi([]);
    }
  }, []);
  useEffect(() => {
    void incarca();
  }, [incarca]);

  const deschideNou = () => {
    setF({ nume: '', email: '', parola: Math.random().toString(36).slice(2, 10) });
    setAlese([]);
    setNou(true);
  };

  const creeaza = async () => {
    setLucrez(true);
    try {
      await creeazaContInstructor({ ...f, grupe: alese }, actor);
      showToast(`Cont creat pentru ${f.nume}. Trimite-i emailul și parola temporară.`, 'success');
      setNou(false);
      await incarca();
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Contul nu a putut fi creat.', 'error');
    } finally {
      setLucrez(false);
    }
  };

  const salveazaGrupe = async () => {
    if (!editat) return;
    setLucrez(true);
    try {
      await actualizeazaCont(editat, { grupe: alese }, actor, grupe);
      showToast('Grupe actualizate.', 'success');
      setEditat(null);
      await incarca();
    } catch (e) {
      console.error(e);
      showToast('Nu s-a putut salva.', 'error');
    } finally {
      setLucrez(false);
    }
  };

  const salveazaProfil = async () => {
    if (!profil || profilNou.nume.trim().length < 2) return;
    setLucrez(true);
    try {
      await actualizeazaCont(profil, { nume: profilNou.nume.trim(), avatar: profilNou.avatar }, actor, grupe);
      showToast('Profil actualizat.', 'success');
      setProfil(null);
      await incarca();
    } catch (e) {
      console.error(e);
      showToast('Nu s-a putut salva.', 'error');
    } finally {
      setLucrez(false);
    }
  };

  const comutaActiv = async (c: ContInstructor) => {
    try {
      await actualizeazaCont(c, { activ: !c.activ }, actor, grupe);
      await incarca();
    } catch (e) {
      console.error(e);
      showToast('Nu s-a putut modifica.', 'error');
    }
  };

  const [pentruParola, setPentruParola] = useState<ContInstructor | null>(null);
  const [parolaSetata, setParolaSetata] = useState<string | null>(null);
  const [parolaAleasa, setParolaAleasa] = useState('');
  const [copiat, setCopiat] = useState(false);

  const deschideParola = (c: ContInstructor) => {
    setParolaAleasa(Math.random().toString(36).slice(2, 10));
    setParolaSetata(null);
    setCopiat(false);
    setPentruParola(c);
  };

  const seteazaParola = async () => {
    if (!pentruParola || parolaAleasa.length < 6) return;
    setLucrez(true);
    try {
      await parolaNouaInstructor(pentruParola, parolaAleasa, actor);
      setParolaSetata(parolaAleasa);
      await incarca();
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Parola nu a putut fi schimbată.', 'error');
    } finally {
      setLucrez(false);
    }
  };

  if (conturi === null) return <Incarcare />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-100/70 p-4 text-sm text-slate-600">
        <p className="max-w-2xl">
          Toată lumea (și tu) intră pe <strong>inpasidedans.ro/panou</strong>: își alege poza și scrie parola. Văd doar grupele atribuite
          aici: marchează prezența, adaugă cursanți și înregistrează abonamente.
        </p>
        <Button variant="brand" className="h-11" onClick={deschideNou}>
          <Plus className="mr-2 h-4 w-4" /> Cont nou
        </Button>
      </div>

      <ConturiAutomate conturi={conturi} onGata={() => void incarca()} />

      {conturi.length === 0 ? (
        <Gol>Niciun cont de instructor încă.</Gol>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {conturi.map(c => {
            const titluri = grupe.filter(g => c.grupe.includes(g.id));
            return (
              <li key={c.uid} className={cn('rounded-2xl border border-slate-200 bg-white p-4 shadow-sm', !c.activ && 'opacity-60')}>
                <div className="flex items-center gap-3">
                  <Avatar avatar={c.avatar} nume={c.nume} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-900">{c.nume}</p>
                    <p className="truncate text-xs text-slate-500">{c.email}</p>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-slate-500">
                    {c.activ ? 'activ' : 'dezactivat'}
                    <Switch checked={c.activ} onCheckedChange={() => comutaActiv(c)} />
                  </label>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {titluri.length ? (
                    titluri.map(g => (
                      <span key={g.id} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                        {g.titlu} · {g.zile.join(', ')} {g.ora}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-amber-700">Nicio grupă atribuită</span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9"
                    onClick={() => {
                      setAlese(c.grupe);
                      setEditat(c);
                    }}
                  >
                    Grupe
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9"
                    onClick={() => {
                      setProfilNou({ nume: c.nume, avatar: c.avatar ?? '' });
                      setProfil(c);
                    }}
                  >
                    Profil
                  </Button>
                  <Button variant="ghost" size="sm" className="h-9" onClick={() => deschideParola(c)}>
                    <KeyRound className="mr-1.5 h-4 w-4" /> Parolă nouă
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Dialog open={nou} onOpenChange={setNou}>
        <DialogContent className="max-h-[90svh] w-[calc(100vw-1.5rem)] overflow-y-auto overflow-x-hidden rounded-2xl [&>*]:min-w-0 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Cont nou de instructor</DialogTitle>
            <DialogDescription>Instructorul intră de pe inpasidedans.ro/panou, apăsând pe poza lui. Emailul e doar pentru sistem (nu trebuie să existe).</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="i-nume">Nume</Label>
              <Input id="i-nume" className="mt-1.5 h-11" value={f.nume} onChange={e => setF({ ...f, nume: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="i-email">Email</Label>
              <Input id="i-email" type="email" className="mt-1.5 h-11" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="i-parola">Parolă temporară</Label>
              <div className="mt-1.5 flex gap-2">
                <Input id="i-parola" className="h-11 font-mono" value={f.parola} onChange={e => setF({ ...f, parola: e.target.value })} />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 shrink-0"
                  onClick={() => setF({ ...f, parola: Math.random().toString(36).slice(2, 10) })}
                  aria-label="Generează altă parolă"
                >
                  <KeyRound className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label>Grupele instructorului</Label>
              <div className="mt-1.5">
                <AlegeGrupe grupe={grupe} alese={alese} onChange={setAlese} />
              </div>
            </div>
            <Button
              variant="brand"
              className="h-11 w-full"
              onClick={creeaza}
              disabled={lucrez || f.nume.trim().length < 2 || !f.email.includes('@') || f.parola.length < 6}
            >
              {lucrez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Creează contul
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!pentruParola} onOpenChange={o => !o && setPentruParola(null)}>
        <DialogContent className="w-[calc(100vw-1.5rem)] overflow-x-hidden rounded-2xl [&>*]:min-w-0 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Parolă nouă pentru {pentruParola?.nume}</DialogTitle>
            <DialogDescription>
              {parolaSetata
                ? 'Gata. Trimite-i instructorului parola; o poate schimba din „Contul meu”.'
                : 'Parola veche nu va mai funcționa.'}
            </DialogDescription>
          </DialogHeader>
          {parolaSetata ? (
            <div className="space-y-3">
              <p className="rounded-xl bg-slate-100 px-4 py-3 text-center font-mono text-xl tracking-wider text-slate-900">{parolaSetata}</p>
              <Button
                variant="outline"
                className="h-11 w-full"
                onClick={async () => {
                  await navigator.clipboard.writeText(parolaSetata);
                  setCopiat(true);
                }}
              >
                {copiat ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copiat ? 'Copiată' : 'Copiază parola'}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <Label htmlFor="pn-parola">Parola nouă</Label>
                <div className="mt-1.5 flex gap-2">
                  <Input id="pn-parola" className="h-11 font-mono" value={parolaAleasa} onChange={e => setParolaAleasa(e.target.value)} />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 shrink-0"
                    onClick={() => setParolaAleasa(Math.random().toString(36).slice(2, 10))}
                    aria-label="Generează altă parolă"
                  >
                    <KeyRound className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button variant="brand" className="h-11 w-full" onClick={seteazaParola} disabled={lucrez || parolaAleasa.length < 6}>
                {lucrez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Setează parola
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!profil} onOpenChange={o => !o && setProfil(null)}>
        <DialogContent className="max-h-[90svh] w-[calc(100vw-1.5rem)] overflow-y-auto overflow-x-hidden rounded-2xl [&>*]:min-w-0 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Profilul lui {profil?.nume}</DialogTitle>
            <DialogDescription>Numele și avatarul afișate în evidență. Instructorul le poate schimba și singur din contul lui.</DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="pi-nume">Nume</Label>
            <Input id="pi-nume" className="mt-1.5 h-11" value={profilNou.nume} onChange={e => setProfilNou({ ...profilNou, nume: e.target.value })} />
          </div>
          <AlegeAvatar valoare={profilNou.avatar} nume={profilNou.nume} onChange={avatar => setProfilNou({ ...profilNou, avatar })} />
          <Button variant="brand" className="h-11" onClick={salveazaProfil} disabled={lucrez || profilNou.nume.trim().length < 2}>
            {lucrez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvează profilul
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editat} onOpenChange={o => !o && setEditat(null)}>
        <DialogContent className="max-h-[90svh] w-[calc(100vw-1.5rem)] overflow-y-auto overflow-x-hidden rounded-2xl [&>*]:min-w-0 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Grupele lui {editat?.nume}</DialogTitle>
          </DialogHeader>
          <AlegeGrupe grupe={grupe} alese={alese} onChange={setAlese} />
          <Button variant="brand" className="h-11" onClick={salveazaGrupe} disabled={lucrez}>
            {lucrez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvează
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
