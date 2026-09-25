'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Archive, ArrowLeft, CreditCard, Loader2, Mail, Pencil, Phone, Plus, RefreshCw, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSimpleToast } from '@/components/simple-toast-provider';
import { avertizari, perioada, ramase, tipPentruReinnoire, ultimaZi } from '@/lib/evidenta/abonament';
import { statisticaPrezenta } from '@/lib/evidenta/statistici';
import { adaugaZile, azi, dataScurta, lunaAn, oraDin, ziuaDin } from '@/lib/evidenta/date';
import {
  actualizeazaCursant,
  anuleazaAbonament,
  anuleazaPrezenta,
  arhiveazaCursant,
  incarcaJurnal,
  incarcaPrezente,
  schimbaGrupa,
  stergeCursant,
  vindeAbonament,
} from '@/lib/evidenta/repo';
import type { Abonament, Cursant, IntrareJurnal, Prezenta } from '@/lib/evidenta/tipuri';
import { cn } from '@/lib/utils';
import { useEvidenta } from './context';
import { DialogAbonament } from './dialog-abonament';
import { ExportRapid } from './export-rapid';
import { Gol, Incarcare, Panou, StatusBadge } from './ui';
import { AlegeAvatar, Avatar } from './avatar';
import { AlegeGrupa } from './alege-grupa';
import { ButonWhatsapp } from './buton-whatsapp';

export function ProfilCursant({ id, inapoi }: { id: string; inapoi: string }) {
  const ev = useEvidenta();
  const { cursanti, status, abonamenteCursant, grupa: grupaDupaId, grupe, esteAdmin, actor, reincarca, loading, tipuri } = ev;
  const { showToast } = useSimpleToast();
  const router = useRouter();
  const [prezente, setPrezente] = useState<Prezenta[] | null>(null);
  // prezențele grupelor lui (ședințele ținute), pentru procentul de prezență
  const [prezenteGrupe, setPrezenteGrupe] = useState<Prezenta[]>([]);
  const [jurnal, setJurnal] = useState<IntrareJurnal[]>([]);
  const [dialogAbonament, setDialogAbonament] = useState(false);
  const [editez, setEditez] = useState(false);
  const [adaugGrupa, setAdaugGrupa] = useState(false);
  const [lucrez, setLucrez] = useState(false);

  const cursant = cursanti.find(c => c.id === id);
  const abonamente = abonamenteCursant(id);

  const incarca = useCallback(async () => {
    try {
      const [p, j] = await Promise.all([incarcaPrezente({ cursantId: id }), esteAdmin ? incarcaJurnal(1000) : Promise.resolve([])]);
      setPrezente(p);
      setJurnal(j.filter(x => x.cursantId === id));
      const c = cursanti.find(x => x.id === id);
      if (c?.grupe.length) {
        const deLa = adaugaZile(azi(), -60);
        const toate = await Promise.all(c.grupe.map(g => incarcaPrezente({ grupaId: g, deLa })));
        setPrezenteGrupe(toate.flat());
      }
    } catch (e) {
      console.error(e);
      setPrezente([]);
    }
  }, [id, esteAdmin, cursanti]);

  useEffect(() => {
    void incarca();
  }, [incarca]);

  const activitate = useMemo(
    () => [...jurnal, ...avertizari(abonamente)].sort((a, b) => b.createdAt - a.createdAt),
    [jurnal, abonamente],
  );

  const peLuni = useMemo(() => {
    const m = new Map<string, Prezenta[]>();
    for (const p of prezente ?? []) m.set(lunaAn(p.data), [...(m.get(lunaAn(p.data)) ?? []), p]);
    return [...m.entries()];
  }, [prezente]);

  if (loading) return <Incarcare />;
  if (!cursant) {
    return (
      <div className="space-y-4">
        <Link href={inapoi} className="inline-flex items-center gap-1 text-sm text-slate-600">
          <ArrowLeft className="h-4 w-4" /> Înapoi
        </Link>
        <Gol>Cursantul nu există sau nu ai acces la el.</Gol>
      </div>
    );
  }

  const st = status(id);
  const curent = st.abonament;
  const reinnoire = tipPentruReinnoire(abonamente, tipuri);
  const reinnoieste = async () => {
    if (!reinnoire) return;
    const per = perioada(reinnoire, azi());
    const text = per.dataStart
      ? `${dataScurta(per.dataStart)} – ${dataScurta(adaugaZile(per.dataExpirare!, -1))}`
      : 'de la prima ședință';
    if (!confirm(`Reînnoiești ${reinnoire.tip} (${reinnoire.pret} lei) pentru ${cursant.nume}, ${text}?`)) return;
    await dupa(() => vindeAbonament(cursant, reinnoire, azi(), actor), 'Abonament reînnoit.');
  };
  const azii = azi();
  // ședințele grupelor lui + prezențele lui (inclusiv recuperări), fără dubluri
  const toatePrezentele = [...new Map([...prezenteGrupe, ...(prezente ?? [])].map(p => [p.id, p])).values()];
  const statistica = {
    luna: statisticaPrezenta(toatePrezentele, id, cursant.grupe, adaugaZile(azii, -30), azii),
    abonament:
      curent?.dataStart && curent.dataStart <= azii ? statisticaPrezenta(toatePrezentele, id, cursant.grupe, curent.dataStart, azii) : null,
  };
  const poateModificaPrezenta = (p: Prezenta) => esteAdmin || grupe.some(g => g.id === p.grupaId);
  const dupa = async (fn: () => Promise<unknown>, ok: string) => {
    setLucrez(true);
    try {
      await fn();
      showToast(ok, 'success');
      await Promise.all([reincarca(), incarca()]);
    } catch (e) {
      console.error(e);
      showToast('Operația nu a reușit.', 'error');
    } finally {
      setLucrez(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <button
        type="button"
        onClick={() => (window.history.length > 1 ? router.back() : router.push(inapoi))}
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" /> Înapoi
      </button>

      {/* Antet */}
      <div className="flex flex-wrap items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <Avatar avatar={cursant.avatar} nume={cursant.nume} className="h-14 w-14 text-lg" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">{cursant.nume}</h1>
            {!cursant.activ && <span className="rounded bg-slate-200 px-2 py-0.5 text-xs text-slate-700">arhivat</span>}
          </div>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
            {cursant.telefon && (
              <a href={`tel:${cursant.telefon}`} className="inline-flex items-center gap-1 hover:text-red-600">
                <Phone className="h-3.5 w-3.5" /> {cursant.telefon}
              </a>
            )}
            {cursant.email && (
              <a href={`mailto:${cursant.email}`} className="inline-flex items-center gap-1 hover:text-red-600">
                <Mail className="h-3.5 w-3.5" /> {cursant.email}
              </a>
            )}
            {!cursant.telefon && !cursant.email && <span className="text-slate-400">Fără date de contact</span>}
          </div>
          {cursant.observatii && <p className="mt-2 text-sm text-slate-600">{cursant.observatii}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <ButonWhatsapp cursant={cursant} status={st} />
          <Button variant="outline" size="sm" className="h-9" onClick={() => setEditez(true)}>
            <Pencil className="mr-1.5 h-4 w-4" /> Editează
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] [&>*]:min-w-0">
        <div className="space-y-4">
          {/* Abonament curent */}
          <Panou
            titlu="Abonament"
            actiune={
              <div className="flex flex-wrap justify-end gap-2">
                {reinnoire && ['expirat', 'epuizat', 'la_limita'].includes(st.cod) && (
                  <Button variant="brand" size="sm" className="h-9" disabled={lucrez} onClick={reinnoieste}>
                    <RefreshCw className="mr-1.5 h-4 w-4" /> Reînnoiește
                  </Button>
                )}
                <Button variant="outline" size="sm" className="h-9" onClick={() => setDialogAbonament(true)}>
                  <CreditCard className="mr-1.5 h-4 w-4" /> Abonament nou
                </Button>
              </div>
            }
          >
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={st} />
              <span className="text-sm text-slate-600">{st.detaliu}</span>
            </div>
            {curent && curent.sedinteTotal !== null && (
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>{curent.tip}</span>
                  <span>
                    {curent.sedinteFolosite} din {curent.sedinteTotal} ședințe
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={cn('h-full rounded-full', ramase(curent) <= 0 ? 'bg-red-500' : ramase(curent) <= 2 ? 'bg-amber-400' : 'bg-emerald-500')}
                    style={{ width: `${Math.min(100, (curent.sedinteFolosite / curent.sedinteTotal) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </Panou>

          {statistica.luna.tinute > 0 && (
            <Panou titlu="Cât de des vine">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { t: 'Ultimele 30 de zile', s: statistica.luna },
                  ...(statistica.abonament ? [{ t: `Abonamentul curent (${curent?.tip})`, s: statistica.abonament }] : []),
                ].map(({ t, s }) => (
                  <div key={t} className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">{t}</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {s.venit} din {s.tinute} ședințe
                      {s.procent !== null && (
                        <span className={cn('ml-2 text-sm font-semibold', s.procent >= 75 ? 'text-emerald-600' : s.procent >= 50 ? 'text-amber-600' : 'text-red-600')}>
                          {s.procent}%
                        </span>
                      )}
                    </p>
                    {s.recuperari > 0 && <p className="text-xs text-slate-500">+ {s.recuperari} la recuperare, în alte grupe</p>}
                  </div>
                ))}
              </div>
            </Panou>
          )}

          {/* Prezențe */}
          <Panou titlu={`Prezențe${prezente ? ` (${prezente.length})` : ''}`} actiune={esteAdmin ? <ExportRapid tip="cursant" id={id} /> : undefined}>
            {prezente === null ? (
              <Incarcare />
            ) : prezente.length === 0 ? (
              <Gol>Nicio prezență înregistrată.</Gol>
            ) : (
              <div className="space-y-4">
                {peLuni.map(([luna, lista]) => (
                  <div key={luna}>
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {luna} · {lista.length}
                    </p>
                    <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100">
                      {lista.map(p => (
                        <li key={p.id} className="flex items-center gap-3 px-3 py-2 text-sm">
                          <span className="w-14 shrink-0 font-medium text-slate-900">{dataScurta(p.data)}</span>
                          <span className="min-w-0 flex-1 truncate text-slate-600">{p.grupaTitlu}</span>
                          {p.recuperare && <span className="rounded bg-sky-100 px-1.5 text-[10px] font-semibold uppercase text-sky-700">recuperare</span>}
                          {!p.abonamentId && (
                            <span className="rounded bg-red-100 px-1.5 text-[10px] font-semibold uppercase text-red-700">fără abonament</span>
                          )}
                          {poateModificaPrezenta(p) && (
                            <button
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                              aria-label="Anulează prezența"
                              disabled={lucrez}
                              onClick={() =>
                                confirm(`Anulezi prezența din ${dataScurta(p.data)}?`) &&
                                dupa(() => anuleazaPrezenta(p, actor), 'Prezență anulată.')
                              }
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </Panou>

          {esteAdmin && (
            <Panou titlu="Activitate">
              {activitate.length === 0 ? (
                <Gol>Nicio acțiune înregistrată.</Gol>
              ) : (
                <ul className="space-y-2.5">
                  {activitate.slice(0, 40).map(j => (
                    <li key={j.id} className="flex gap-3 text-sm">
                      <span className="w-16 shrink-0 text-xs text-slate-400">{dataScurta(ziuaDin(j.createdAt))}</span>
                      <span className={cn('min-w-0 flex-1', j.calculat ? 'text-amber-700' : 'text-slate-700')}>
                        {j.mesaj}
                        <span className="block text-xs text-slate-400">
                          {j.calculat ? 'avertizare automată' : `${j.actor.nume} · ${oraDin(j.createdAt)}`}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Panou>
          )}
        </div>

        <div className="space-y-4">
          {/* Grupe */}
          <Panou
            titlu="Grupe"
            actiune={
              <Button variant="ghost" size="sm" className="h-8" onClick={() => setAdaugGrupa(!adaugGrupa)}>
                <Plus className="mr-1 h-4 w-4" /> Adaugă
              </Button>
            }
          >
            {adaugGrupa && (
              <div className="mb-3">
                <AlegeGrupa
                  grupe={grupe}
                  exclude={cursant.grupe}
                  onAlege={g => void dupa(() => schimbaGrupa(cursant, g, true, actor), `Adăugat în ${g.titlu}.`).then(() => setAdaugGrupa(false))}
                />
              </div>
            )}
            {cursant.grupe.length === 0 ? (
              <p className="text-sm text-slate-500">Nu e în nicio grupă.</p>
            ) : (
              <ul className="space-y-2">
                {cursant.grupe.map(gid => {
                  const g = grupaDupaId(gid);
                  const poate = esteAdmin || grupe.some(x => x.id === gid);
                  return (
                    <li key={gid} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-slate-900">{g?.titlu ?? 'Grupă ștearsă'}</span>
                        {g && <span className="block truncate text-xs text-slate-500">{[g.zile.join(', '), g.ora, g.instructor].filter(Boolean).join(' · ')}</span>}
                      </span>
                      {poate && g && (
                        <button
                          aria-label={`Scoate din ${g.titlu}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                          disabled={lucrez}
                          onClick={() =>
                            confirm(`Scoți pe ${cursant.nume} din ${g.titlu}?`) &&
                            dupa(() => schimbaGrupa(cursant, g, false, actor), `Scos din ${g.titlu}.`)
                          }
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </Panou>

          {/* Istoric abonamente */}
          <Panou titlu={`Abonamente (${abonamente.length})`}>
            {abonamente.length === 0 ? (
              <p className="text-sm text-slate-500">Niciun abonament.</p>
            ) : (
              <ul className="space-y-2">
                {abonamente.map(a => (
                  <RandAbonament
                    key={a.id}
                    a={a}
                    curent={a.id === curent?.id}
                    esteAdmin={esteAdmin}
                    lucrez={lucrez}
                    onAnuleaza={() =>
                      confirm(`Anulezi ${a.tip} din ${dataScurta(a.dataVanzare)}? Ședințele lui vor apărea ca fără abonament.`) &&
                      dupa(() => anuleazaAbonament(a, actor), 'Abonament anulat.')
                    }
                  />
                ))}
              </ul>
            )}
          </Panou>

          {esteAdmin && (
            <Panou titlu="Administrare">
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="h-10 justify-start"
                  disabled={lucrez}
                  onClick={() => dupa(() => arhiveazaCursant(cursant, !cursant.activ, actor), cursant.activ ? 'Cursant arhivat.' : 'Cursant reactivat.')}
                >
                  <Archive className="mr-2 h-4 w-4" />
                  {cursant.activ ? 'Arhivează (nu mai vine)' : 'Reactivează'}
                </Button>
                <Button
                  variant="outline"
                  className="h-10 justify-start border-red-200 text-red-700 hover:bg-red-50"
                  disabled={lucrez}
                  onClick={async () => {
                    if (!confirm(`Ștergi definitiv pe ${cursant.nume}, cu toate abonamentele și prezențele? Nu se poate reveni.`)) return;
                    setLucrez(true);
                    try {
                      await stergeCursant(cursant, actor);
                      showToast('Cursant șters.', 'success');
                      await reincarca();
                      router.push(inapoi);
                    } catch (e) {
                      console.error(e);
                      showToast('Nu s-a putut șterge.', 'error');
                      setLucrez(false);
                    }
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Șterge definitiv
                </Button>
              </div>
            </Panou>
          )}
        </div>
      </div>

      <DialogAbonament cursant={cursant} deschis={dialogAbonament} onInchide={() => setDialogAbonament(false)} />
      <DialogEditare cursant={cursant} deschis={editez} onInchide={() => setEditez(false)} onSalvat={incarca} />
    </div>
  );
}

function RandAbonament({
  a,
  curent,
  esteAdmin,
  lucrez,
  onAnuleaza,
}: {
  a: Abonament;
  curent: boolean;
  esteAdmin: boolean;
  lucrez: boolean;
  onAnuleaza: () => void;
}) {
  const expirat = a.dataExpirare && a.dataExpirare <= azi();
  const stare = a.anulat ? 'anulat' : curent ? 'curent' : expirat ? 'expirat' : ramase(a) <= 0 ? 'epuizat' : a.dataStart === null ? 'neînceput' : 'valabil';
  return (
    <li className={cn('rounded-xl border px-3 py-2', curent ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-100', a.anulat && 'opacity-60')}>
      <div className="flex items-center gap-2">
        <span className={cn('min-w-0 flex-1 truncate text-sm font-medium text-slate-900', a.anulat && 'line-through')}>{a.tip}</span>
        <span className="text-xs text-slate-500">{stare}</span>
      </div>
      <p className="text-xs text-slate-500">
        {a.dataStart ? `${dataScurta(a.dataStart)} – ${dataScurta(ultimaZi(a))}` : 'pornește la prima ședință'} ·{' '}
        {a.sedinteTotal === null ? `${a.sedinteFolosite} ședințe` : `${a.sedinteFolosite}/${a.sedinteTotal} ședințe`} · {a.pret} lei
      </p>
      <p className="text-[11px] text-slate-400">
        vândut pe {dataScurta(a.dataVanzare)} de {a.createdBy?.nume ?? '—'}
      </p>
      {esteAdmin && !a.anulat && (
        <button className="mt-1 text-xs font-medium text-red-600 hover:underline" disabled={lucrez} onClick={onAnuleaza}>
          Anulează abonamentul
        </button>
      )}
    </li>
  );
}

function DialogEditare({
  cursant,
  deschis,
  onInchide,
  onSalvat,
}: {
  cursant: Cursant;
  deschis: boolean;
  onInchide: () => void;
  onSalvat: () => void;
}) {
  const { actor, reincarca } = useEvidenta();
  const { showToast } = useSimpleToast();
  const [f, setF] = useState({ nume: '', telefon: '', email: '', observatii: '', avatar: '' });
  const [salvez, setSalvez] = useState(false);

  useEffect(() => {
    if (deschis)
      setF({ nume: cursant.nume, telefon: cursant.telefon ?? '', email: cursant.email ?? '', observatii: cursant.observatii ?? '', avatar: cursant.avatar ?? '' });
  }, [deschis, cursant]);

  const salveaza = async () => {
    const modif = Object.fromEntries(
      Object.entries(f)
        .map(([k, v]) => [k, v.trim()])
        .filter(([k, v]) => v !== ((cursant as Record<string, unknown>)[k] ?? '')),
    );
    if (!Object.keys(modif).length) return onInchide();
    if ('nume' in modif && String(modif.nume).length < 3) return;
    setSalvez(true);
    try {
      await actualizeazaCursant(cursant, modif, actor);
      showToast('Date salvate.', 'success');
      await reincarca();
      onSalvat();
      onInchide();
    } catch (e) {
      console.error(e);
      showToast('Nu s-a putut salva.', 'error');
    } finally {
      setSalvez(false);
    }
  };

  return (
    <Dialog open={deschis} onOpenChange={o => !o && onInchide()}>
      <DialogContent className="max-h-[90svh] w-[calc(100vw-1.5rem)] overflow-y-auto overflow-x-hidden rounded-2xl [&>*]:min-w-0 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editează datele</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {(['nume', 'telefon', 'email'] as const).map(k => (
            <div key={k}>
              <Label htmlFor={`e-${k}`} className="capitalize">
                {k}
              </Label>
              <Input id={`e-${k}`} className="mt-1.5 h-11" value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })} />
            </div>
          ))}
          <div>
            <Label>Avatar</Label>
            <div className="mt-1.5 rounded-xl border border-slate-200 p-3">
              <AlegeAvatar valoare={f.avatar} nume={f.nume} onChange={avatar => setF({ ...f, avatar })} doarIlustratii />
            </div>
          </div>
          <div>
            <Label htmlFor="e-obs">Observații</Label>
            <Textarea id="e-obs" rows={3} className="mt-1.5" value={f.observatii} onChange={e => setF({ ...f, observatii: e.target.value })} />
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" className="h-11" onClick={onInchide}>
              Renunță
            </Button>
            <Button variant="brand" className="h-11" onClick={salveaza} disabled={salvez}>
              {salvez && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvează
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
