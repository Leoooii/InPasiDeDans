'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CalendarDays, Clock, Edit, Eye, EyeOff, MapPin, Search, Trash2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Avatar } from '@/components/evidenta/avatar'
import { areZiua, FiltruPoza } from '@/components/evidenta/grupe-lista'
import { PozeGrupa, usePozeInstructori } from '@/components/evidenta/poze-instructori'
import { Chip } from '@/components/evidenta/ui'
import { azi, numeZi } from '@/lib/evidenta/date'
import { instructoriDin, predaInstructorul } from '@/lib/evidenta/instructori-grupe'
import type { GrupaEvidenta } from '@/lib/evidenta/tipuri'
import type { Grupa } from '@/lib/types'
import { cn } from '@/lib/utils'

// Grupele site-ului (program, „grupe în formare”), în același stil cu evidența.

interface GrupeListProps {
  grupe: Grupa[]
  onEdit: (grupa: Grupa) => void
  onDelete: (id: string) => void
}

const ZILE = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică']
const faraDiacritice = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/** Forma cerută de componentele evidenței (poze, zile). */
const caEvidenta = (g: Grupa): GrupaEvidenta => ({
  id: g.id ?? '',
  titlu: g.titlu,
  instructor: g.instructor,
  zile: g.zile ?? [],
  ora: g.program.match(/\d{1,2}:\d{2}(\s*-\s*\d{1,2}:\d{2})?/)?.[0] ?? '',
  publica: g.publica !== false,
  sala: g.sala,
  nivel: g.nivel,
})

export default function GrupeList({ grupe, onEdit, onDelete }: GrupeListProps) {
  const [deSters, setDeSters] = useState<Grupa | null>(null)
  const [cauta, setCauta] = useState('')
  const [zi, setZi] = useState('toate')
  const [instructor, setInstructor] = useState('')
  const [vizibil, setVizibil] = useState<'toate' | 'site' | 'interne'>('toate')
  const poza = usePozeInstructori()

  const evidenta = useMemo(() => grupe.map(caEvidenta), [grupe])
  const instructori = useMemo(() => instructoriDin(evidenta), [evidenta])
  const zileFolosite = ZILE.filter(z => evidenta.some(g => areZiua(g, z)))
  const ziAzi = numeZi(azi())

  const lista = useMemo(
    () =>
      grupe
        .map(g => ({ g, e: caEvidenta(g) }))
        .filter(({ g }) => !cauta.trim() || faraDiacritice(`${g.titlu} ${g.instructor} ${g.descriere}`).includes(faraDiacritice(cauta.trim())))
        .filter(({ e }) => zi === 'toate' || areZiua(e, zi))
        .filter(({ e }) => !instructor || predaInstructorul(e, instructor))
        .filter(({ g }) => vizibil === 'toate' || (vizibil === 'site' ? g.publica !== false : g.publica === false))
        .sort((a, b) => a.e.ora.localeCompare(b.e.ora) || a.g.titlu.localeCompare(b.g.titlu, 'ro')),
    [grupe, cauta, zi, instructor, vizibil],
  )

  const nrSite = grupe.filter(g => g.publica !== false).length

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input placeholder="Caută după titlu, instructor, descriere" value={cauta} onChange={e => setCauta(e.target.value)} className="h-11 bg-white pl-9" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Chip activ={zi === 'toate'} onClick={() => setZi('toate')}>
          Toate zilele
        </Chip>
        {zileFolosite.map(z => (
          <Chip key={z} activ={zi === z} onClick={() => setZi(z)}>
            {z}
            {z === ziAzi && <span className={cn('ml-1 rounded px-1 text-[10px] font-bold uppercase', zi === z ? 'bg-white/20' : 'bg-red-100 text-red-700')}>azi</span>}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {instructori.length > 1 && (
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
            <FiltruPoza activ={!instructor} eticheta="Toți" onClick={() => setInstructor('')}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo-dansatori.png" alt="" className="h-9 w-9" />
              </span>
            </FiltruPoza>
            {instructori.map(i => {
              const p = poza(i.cheie)
              return (
                <FiltruPoza key={i.cheie} activ={instructor === i.cheie} eticheta={i.nume} onClick={() => setInstructor(instructor === i.cheie ? '' : i.cheie)}>
                  <Avatar avatar={p?.avatar} nume={p?.nume ?? i.nume} className="h-12 w-12 text-sm" />
                </FiltruPoza>
              )
            })}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <Chip activ={vizibil === 'toate'} onClick={() => setVizibil('toate')}>
            Toate <span className="opacity-60">{grupe.length}</span>
          </Chip>
          <Chip activ={vizibil === 'site'} onClick={() => setVizibil('site')}>
            Pe site <span className="opacity-60">{nrSite}</span>
          </Chip>
          <Chip activ={vizibil === 'interne'} onClick={() => setVizibil('interne')}>
            Doar interne <span className="opacity-60">{grupe.length - nrSite}</span>
          </Chip>
        </div>
      </div>

      {lista.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-500">Nicio grupă pentru filtrele alese.</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3 [&>*]:min-w-0">
          {lista.map(({ g, e }) => {
            const ocupate = Math.max(0, g.locuriTotale - g.locuriDisponibile)
            const pct = g.locuriTotale > 0 ? Math.round((ocupate / g.locuriTotale) * 100) : 0
            const publica = g.publica !== false
            return (
              <section key={g.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <header className="flex items-start gap-3 bg-slate-50/70 px-4 py-3">
                  <PozeGrupa g={e} />
                  <div className="min-w-0 flex-1">
                    <h2 className="line-clamp-2 font-bold leading-snug text-slate-900">{g.titlu}</h2>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs text-slate-600">
                      {g.zile.length > 0 && <span className="whitespace-nowrap font-medium">{g.zile.join(', ')}</span>}
                      {e.ora && (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap">
                          <Clock className="h-3 w-3" />
                          {e.ora}
                        </span>
                      )}
                      {g.sala && (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap">
                          <MapPin className="h-3 w-3" />
                          {g.sala}
                        </span>
                      )}
                      {g.instructor && <span className="whitespace-nowrap">{g.instructor}</span>}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold',
                      publica ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600',
                    )}
                    title={publica ? 'Apare pe site (grupe în formare)' : 'Nu apare în „grupe în formare”'}
                  >
                    {publica ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {publica ? 'Pe site' : 'Internă'}
                  </span>
                </header>

                <div className="flex-1 space-y-3 px-4 py-3">
                  {(g.nivel || g.stiluri?.length > 0) && (
                    <div className="flex flex-wrap gap-1.5">
                      {g.nivel && <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-800">{g.nivel}</span>}
                      {g.stiluri?.map(s => (
                        <span key={s} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  {g.descriere && <p className="line-clamp-2 text-sm text-slate-600">{g.descriere}</p>}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    {g.dataStart && (
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" /> din {new Date(g.dataStart).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                  {g.locuriTotale > 0 && (
                    <div>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-slate-500">Locuri ocupate</span>
                        <span className={cn('font-semibold', g.locuriDisponibile === 0 ? 'text-red-600' : 'text-slate-700')}>
                          {ocupate}/{g.locuriTotale} · {g.locuriDisponibile === 0 ? 'complet' : `${g.locuriDisponibile} libere`}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className={cn('h-full rounded-full', pct >= 100 ? 'bg-red-500' : pct >= 80 ? 'bg-amber-400' : 'bg-emerald-500')} style={{ width: `${Math.min(100, pct)}%` }} />
                      </div>
                    </div>
                  )}
                </div>

                <footer className="flex items-center gap-1.5 border-t border-slate-100 px-3 py-2">
                  <Button variant="ghost" size="sm" className="h-9 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => setDeSters(g)} aria-label={`Șterge ${g.titlu}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="ml-auto h-9" asChild>
                    <Link href={`/admin/evidenta/grupe/${g.id}`}>
                      <Users className="mr-1.5 h-4 w-4" /> Cursanți
                    </Link>
                  </Button>
                  <Button variant="brand" size="sm" className="h-9" onClick={() => onEdit(g)}>
                    <Edit className="mr-1.5 h-4 w-4" /> Editează
                  </Button>
                </footer>
              </section>
            )
          })}
        </div>
      )}

      <AlertDialog open={!!deSters} onOpenChange={o => !o && setDeSters(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ștergi grupa „{deSters?.titlu}”?</AlertDialogTitle>
            <AlertDialogDescription>
              Dispare de pe site și din evidență. Prezențele și abonamentele cursanților rămân, dar nu vor mai fi legate de o grupă existentă.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Renunță</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                if (deSters?.id) onDelete(deSters.id)
                setDeSters(null)
              }}
            >
              Șterge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
