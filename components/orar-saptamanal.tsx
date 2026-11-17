'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, Clock, DoorOpen, MousePointerClick, Sparkles, UserRound, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { usePublicData } from '@/components/public-data-provider'
import type { Instructor } from '@/lib/types'

// Orar vizual: o zi (sau o pereche de zile) pe ecran, sălile pe coloane, timpul pe verticală.
// Blocurile care nu se potrivesc filtrelor rămân pe loc, estompate, ca orarul să-și păstreze forma.

export type GrupaOrar = {
  id: string
  titlu: string
  instructor: string
  program: string
  zile: string[]
  nivel?: string
  sala?: string
  rol?: string
  locuriDisponibile?: number
  locuriTotale?: number
  startTime: string
  styleKey: string
  dayGroupId: string
  inFormare: boolean
  /** încă n-a început: stă în coloana „Grupe noi”, nu în sala ei */
  viitoare: boolean
  dataStart?: string
  /** null = grupă deja pornită, fără înscrieri */
  linkInscriere: string | null
}

export type ZiOrar = { id: string; label: string; short: string; days: string[] }

const CULORI: Record<string, { bloc: string; accent: string; text: string; eticheta: string }> = {
  latino:    { bloc: 'bg-rose-50 hover:bg-rose-100',       accent: 'bg-rose-400',    text: 'text-rose-900',    eticheta: 'Latino' },
  populare:  { bloc: 'bg-emerald-50 hover:bg-emerald-100', accent: 'bg-emerald-500', text: 'text-emerald-900', eticheta: 'Populare' },
  standard:  { bloc: 'bg-blue-50 hover:bg-blue-100',       accent: 'bg-blue-400',    text: 'text-blue-900',    eticheta: 'Standard' },
  societate: { bloc: 'bg-violet-50 hover:bg-violet-100',   accent: 'bg-violet-400',  text: 'text-violet-900',  eticheta: 'Societate' },
  copii:     { bloc: 'bg-amber-50 hover:bg-amber-100',     accent: 'bg-amber-400',   text: 'text-amber-900',   eticheta: 'Copii' },
  general:   { bloc: 'bg-slate-50 hover:bg-slate-100',     accent: 'bg-slate-400',   text: 'text-slate-900',   eticheta: 'Dans' },
}

const PX_PE_MINUT = 1.15
const FARA_SALA = 'Fără sală'
const GRUPE_NOI = 'Grupe noi'

const LUNI = ['ian.', 'feb.', 'mar.', 'apr.', 'mai', 'iun.', 'iul.', 'aug.', 'sept.', 'oct.', 'nov.', 'dec.']
const LUNI_LUNGI = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie']

function dataScurta(iso?: string, lung = false): string | null {
  const m = iso?.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!m) return null
  const luna = (lung ? LUNI_LUNGI : LUNI)[+m[2] - 1]
  return lung ? `${+m[3]} ${luna} ${m[1]}` : `${+m[3]} ${luna}`
}

function minute(t: string): number {
  const m = t.match(/(\d{1,2}):(\d{2})/)
  return m ? +m[1] * 60 + +m[2] : 0
}

function interval(program: string): [number, number] {
  const ore = program.match(/\d{1,2}:\d{2}/g) ?? []
  const start = ore[0] ? minute(ore[0]) : 0
  const sfarsit = ore[1] ? minute(ore[1]) : start + 60
  return [start, sfarsit > start ? sfarsit : start + 60]
}

const hhmm = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`

function minuteAcum(): number {
  const [h, m] = new Intl.DateTimeFormat('ro-RO', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Bucharest' })
    .format(new Date()).split(':').map(Number)
  return h * 60 + m
}

type Plasare = GrupaOrar & { start: number; sfarsit: number; culoar: number; culoare: number }

// Grupele care se suprapun în aceeași sală stau una lângă alta (culoare).
function aseaza(grupe: GrupaOrar[]): Plasare[] {
  const sortate = grupe
    .map(g => { const [start, sfarsit] = interval(g.program); return { ...g, start, sfarsit, culoar: 0, culoare: 1 } })
    .sort((a, b) => a.start - b.start || b.sfarsit - a.sfarsit)
  let grup: Plasare[] = []
  let capat = -1
  const inchide = () => { const n = Math.max(...grup.map(g => g.culoar)) + 1; grup.forEach(g => { g.culoare = n }) }
  for (const g of sortate) {
    if (grup.length && g.start >= capat) { inchide(); grup = []; capat = -1 }
    const ocupate = new Set(grup.filter(x => x.sfarsit > g.start).map(x => x.culoar))
    let c = 0
    while (ocupate.has(c)) c++
    g.culoar = c
    grup.push(g)
    capat = Math.max(capat, g.sfarsit)
  }
  if (grup.length) inchide()
  return sortate
}

export default function OrarSaptamanal({
  grupe,
  zile,
  potrivite,
  azi,
}: {
  grupe: GrupaOrar[]
  zile: ZiOrar[]
  potrivite: Set<string>
  azi: string
}) {
  const ziAzi = zile.find(z => z.days.includes(azi))?.id
  const [zi, setZi] = useState(zile[0]?.id ?? '')
  const [selectat, setSelectat] = useState<string | null>(null)
  const [eDesktop, setEDesktop] = useState(true)
  const [acum, setAcum] = useState<number | null>(null)

  // Ziua de azi și ora curentă se stabilesc după montare (HTML-ul de pe server e cache-uit).
  useEffect(() => {
    if (ziAzi) setZi(ziAzi)
  }, [ziAzi])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => setEDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    setAcum(minuteAcum())
    const t = setInterval(() => setAcum(minuteAcum()), 60_000)
    return () => { mq.removeEventListener('change', sync); clearInterval(t) }
  }, [])

  const grupaSelectata = grupe.find(g => g.id === selectat) ?? null

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <div className="min-w-0 space-y-4">
        {/* Zilele */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl w-fit" role="tablist" aria-label="Zilele săptămânii">
          {zile.map(z => (
            <button
              key={z.id}
              role="tab"
              aria-selected={zi === z.id}
              onClick={() => { setZi(z.id); setSelectat(null) }}
              className={`min-h-10 flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                zi === z.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <span className="sm:hidden">{z.short}</span>
              <span className="hidden sm:inline">{z.label}</span>
              {z.id === ziAzi && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" aria-label="azi" />}
            </button>
          ))}
        </div>

        {/* Toate zilele sunt în HTML (pentru motoarele de căutare); se vede doar cea aleasă. */}
        {zile.map(z => (
          <div key={z.id} role="tabpanel" hidden={z.id !== zi}>
            <GrilaZi
              grupe={grupe.filter(g => g.dayGroupId === z.id)}
              potrivite={potrivite}
              selectat={selectat}
              onSelect={setSelectat}
              acum={z.id === ziAzi ? acum : null}
            />
          </div>
        ))}

        <Legenda />
      </div>

      {/* Detalii: panou lateral pe desktop, foaie de jos pe telefon */}
      <aside className="hidden lg:block lg:sticky lg:top-24">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {grupaSelectata ? (
            <DetaliuGrupa g={grupaSelectata} />
          ) : (
            <div className="p-6 text-center text-slate-500">
              <MousePointerClick className="mx-auto h-6 w-6 text-slate-400" />
              <p className="mt-2 text-sm font-medium text-slate-700">Alege o grupă din orar</p>
              <p className="mt-1 text-xs">
                Vezi instructorul, sala și locurile. Te poți înscrie la grupele în formare și la cele de începători.
              </p>
            </div>
          )}
        </div>
      </aside>

      <Sheet open={!eDesktop && !!grupaSelectata} onOpenChange={o => { if (!o) setSelectat(null) }}>
        <SheetContent side="bottom" className="rounded-t-2xl p-0 max-h-[85vh] overflow-y-auto">
          <SheetHeader className="sr-only">
            <SheetTitle>{grupaSelectata?.titlu ?? 'Detalii grupă'}</SheetTitle>
          </SheetHeader>
          {grupaSelectata && <DetaliuGrupa g={grupaSelectata} />}
        </SheetContent>
      </Sheet>
    </div>
  )
}

function GrilaZi({
  grupe,
  potrivite,
  selectat,
  onSelect,
  acum,
}: {
  grupe: GrupaOrar[]
  potrivite: Set<string>
  selectat: string | null
  onSelect: (id: string) => void
  acum: number | null
}) {
  const { sali, inceput, sfarsit } = useMemo(() => {
    const peSala = new Map<string, GrupaOrar[]>()
    for (const g of grupe) {
      const s = g.viitoare ? GRUPE_NOI : g.sala?.trim() || FARA_SALA
      peSala.set(s, [...(peSala.get(s) ?? []), g])
    }
    const ordine = (s: string) => (s === GRUPE_NOI ? 2 : s === FARA_SALA ? 1 : 0)
    const sali = [...peSala.entries()]
      .sort(([a], [b]) => ordine(a) - ordine(b) || a.localeCompare(b, 'ro', { numeric: true }))
      .map(([nume, lista]) => ({ nume, plasari: aseaza(lista) }))
    const toate = sali.flatMap(s => s.plasari)
    const inceput = Math.floor(Math.min(...toate.map(p => p.start)) / 60) * 60
    const sfarsit = Math.ceil(Math.max(...toate.map(p => p.sfarsit)) / 60) * 60
    return { sali, inceput, sfarsit }
  }, [grupe])

  if (grupe.length === 0) {
    return <p className="py-12 text-center text-sm text-slate-500">Nu sunt grupe în această zi.</p>
  }

  const inaltime = (sfarsit - inceput) * PX_PE_MINUT
  const ore = Array.from({ length: (sfarsit - inceput) / 60 + 1 }, (_, i) => inceput + i * 60)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      {/* Antet săli */}
      <div className="flex border-b border-slate-200 bg-slate-50/80">
        <div className="w-11 sm:w-14 shrink-0" />
        {sali.map(s => s.nume === GRUPE_NOI ? (
          <div key={s.nume} className="flex-1 min-w-0 px-1 py-2.5 text-center text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 border-l border-emerald-200">
            <Sparkles className="hidden sm:inline h-3.5 w-3.5 mr-1 -mt-0.5" />
            {s.nume}
          </div>
        ) : (
          <div key={s.nume} className="flex-1 min-w-0 px-1 py-2.5 text-center text-xs sm:text-sm font-semibold text-slate-700 border-l border-slate-200">
            <DoorOpen className="hidden sm:inline h-3.5 w-3.5 mr-1 -mt-0.5 text-slate-400" />
            {s.nume}
          </div>
        ))}
      </div>

      <div className="relative flex" style={{ height: inaltime + 16 }}>
        {/* Axa orelor */}
        <div className="relative w-11 sm:w-14 shrink-0">
          {ore.map(o => (
            <span
              key={o}
              className="absolute right-1.5 sm:right-2 -translate-y-1/2 text-[10px] sm:text-xs font-medium tabular-nums text-slate-400"
              style={{ top: (o - inceput) * PX_PE_MINUT + 8 }}
            >
              {hhmm(o)}
            </span>
          ))}
        </div>

        {/* Liniile orelor */}
        <div className="pointer-events-none absolute inset-y-0 left-11 sm:left-14 right-0">
          {ore.map(o => (
            <div key={o} className="absolute inset-x-0 border-t border-slate-100" style={{ top: (o - inceput) * PX_PE_MINUT + 8 }} />
          ))}
        </div>

        {/* Coloanele sălilor */}
        {sali.map(s => (
          <div
            key={s.nume}
            className={`relative flex-1 min-w-0 border-l ${s.nume === GRUPE_NOI ? 'border-emerald-200 bg-emerald-50/40' : 'border-slate-100'}`}
          >
            {s.plasari.map(p => {
              const c = CULORI[p.styleKey] ?? CULORI.general
              const activ = potrivite.has(p.id)
              const ales = selectat === p.id
              const latime = 100 / p.culoare
              const h = (p.sfarsit - p.start) * PX_PE_MINUT
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelect(p.id)}
                  aria-pressed={ales}
                  aria-label={`${p.titlu.trim()}, ${p.nivel ?? ''}, ${hhmm(p.start)}–${hhmm(p.sfarsit)}, ${p.instructor}`}
                  className={`absolute overflow-hidden rounded-lg text-left transition-all duration-200 ${c.bloc} ${
                    p.viitoare ? 'border border-dashed border-emerald-400' : ''
                  } ${
                    ales ? 'ring-2 ring-slate-900 z-10 shadow-lg' : 'hover:shadow-md hover:z-10'
                  } ${activ ? '' : 'opacity-25 saturate-50'}`}
                  style={{
                    top: (p.start - inceput) * PX_PE_MINUT + 8 + 1,
                    height: h - 2,
                    left: `calc(${p.culoar * latime}% + 3px)`,
                    width: `calc(${latime}% - 6px)`,
                  }}
                >
                  <span className={`absolute inset-y-0 left-0 w-1 ${c.accent}`} />
                  <span className={`block pl-2.5 pr-1.5 py-1.5 ${c.text}`}>
                    <span className="block text-[10px] sm:text-[11px] font-semibold tabular-nums opacity-70">
                      {hhmm(p.start)}<span className="hidden sm:inline">–{hhmm(p.sfarsit)}</span>
                    </span>
                    {p.viitoare && (p.sala || p.dataStart) && (
                      <span className="block text-[10px] sm:text-[11px] font-semibold leading-tight text-emerald-700 truncate">
                        {[p.sala, dataScurta(p.dataStart) && `din ${dataScurta(p.dataStart)}`].filter(Boolean).join(' · ')}
                      </span>
                    )}
                    <span className="block text-[11px] sm:text-[13px] font-semibold leading-tight line-clamp-2">{p.titlu.trim()}</span>
                    {p.nivel && <span className="block text-[10px] sm:text-xs leading-tight opacity-75 truncate">{p.nivel}</span>}

                    {h > 70 && !p.viitoare && p.instructor && (
                      <span className="hidden sm:block mt-0.5 text-[11px] leading-tight opacity-60 truncate">{p.instructor}</span>
                    )}
                  </span>
                  {p.linkInscriere && (
                    <>
                      <span className="hidden sm:block absolute right-1 bottom-1 rounded bg-emerald-600 px-1 text-[10px] font-bold uppercase tracking-wide text-white">
                        {p.inFormare ? 'Nou' : 'Înscrieri'}
                      </span>
                      <span className="sm:hidden absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </>
                  )}
                </button>
              )
            })}
          </div>
        ))}

        {/* Ora curentă */}
        {acum !== null && acum >= inceput && acum <= sfarsit && (
          <div
            className="pointer-events-none absolute left-11 sm:left-14 right-0 z-20 flex items-center"
            style={{ top: (acum - inceput) * PX_PE_MINUT + 8 }}
          >
            <span className="-ml-1 h-2 w-2 rounded-full bg-orange-500" />
            <span className="h-px flex-1 bg-orange-500" />
          </div>
        )}
      </div>
    </div>
  )
}

function Legenda() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
      {Object.entries(CULORI).filter(([k]) => k !== 'general').map(([k, c]) => (
        <span key={k} className="flex items-center gap-1.5">
          <span className={`h-2.5 w-2.5 rounded-sm ${c.accent}`} />
          {c.eticheta}
        </span>
      ))}
      <span className="flex items-center gap-1.5">
        <span className="rounded bg-emerald-600 px-1 text-[9px] font-bold uppercase text-white">Înscrieri</span>
        primește începători
      </span>
      <span className="flex items-center gap-1.5">
        <span className="rounded bg-emerald-600 px-1 text-[9px] font-bold uppercase text-white">Nou</span>
        grupă în formare
      </span>
    </div>
  )
}

// „Cataalina” → „catalina”: fără diacritice, fără litere dublate din greșeală.
const normalizeaza = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/(.)\1+/g, '$1').trim()

type InstructorAfisat = { nume: string; numeComplet?: string; poza?: string }

// Câmpul „instructor” al grupei e text liber („Alexandra și Nicholas”); îl potrivim după prenume.
function instructoriGrupa(text: string, toti: Instructor[] | null): InstructorAfisat[] {
  return text
    .split(/\s+(?:și|si|ş|&)\s+|,|\/|\s&\s/i)
    .map(n => n.trim())
    .filter(Boolean)
    .map(nume => {
      const cheie = normalizeaza(nume)
      const gasit = toti?.find(i => {
        const complet = normalizeaza(i.name)
        return complet === cheie || complet.split(/\s+/)[0] === cheie.split(/\s+/)[0]
      })
      return { nume, numeComplet: gasit?.name, poza: gasit?.imageUrl || undefined }
    })
}

function DetaliuGrupa({ g }: { g: GrupaOrar }) {
  const c = CULORI[g.styleKey] ?? CULORI.general
  const { instructori } = usePublicData()
  const persoane = instructoriGrupa(g.instructor, instructori)
  const [start, sfarsit] = interval(g.program)
  const locTot = g.locuriTotale ?? 0
  const locDisp = g.locuriDisponibile ?? 0
  const rol = g.rol && g.rol !== 'All' ? ` (${g.rol.toLowerCase()}s)` : ''

  return (
    <div>
      <div className={`h-1.5 ${c.accent}`} />
      <div className="p-6 space-y-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-semibold uppercase tracking-wider ${c.text} opacity-70`}>{c.eticheta}</span>
            {g.inFormare && (
              <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                în formare
              </span>
            )}
          </div>
          <h3 className="mt-1 text-xl font-bold text-slate-900 leading-snug">{g.titlu.trim()}</h3>
          {g.nivel && <p className="text-sm font-medium text-slate-500">{g.nivel}</p>}
        </div>

        <ul className="space-y-2.5 text-sm text-slate-700">
          <li className="flex items-center gap-2.5">
            <CalendarDays className="h-4 w-4 text-slate-400 shrink-0" />
            {g.zile.join(' și ')}
          </li>
          {g.viitoare && dataScurta(g.dataStart, true) && (
            <li className="flex items-center gap-2.5 font-semibold text-emerald-700">
              <Sparkles className="h-4 w-4 shrink-0" />
              Începe pe {dataScurta(g.dataStart, true)}
            </li>
          )}
          <li className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 text-slate-400 shrink-0" />
            {hhmm(start)} – {hhmm(sfarsit)}
          </li>
          {g.sala && (
            <li className="flex items-center gap-2.5">
              <DoorOpen className="h-4 w-4 text-slate-400 shrink-0" />
              {g.sala}
            </li>
          )}
          {locTot > 0 && (
            <li className="flex items-center gap-2.5">
              <Users className="h-4 w-4 text-slate-400 shrink-0" />
              {locDisp === 0 ? 'Grupă completă' : `${locDisp} din ${locTot} locuri libere${rol}`}
            </li>
          )}
        </ul>

        {persoane.length > 0 && (
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-3">
            <p className="text-[11px] uppercase tracking-wider text-slate-400">
              {persoane.length > 1 ? 'Instructori' : 'Instructor'}
            </p>
            {persoane.map(p => (
              <div key={p.nume} className="flex items-center gap-3">
                {p.poza ? (
                  <Image
                    src={p.poza}
                    alt={p.numeComplet ?? p.nume}
                    width={112}
                    height={112}
                    className="h-14 w-14 shrink-0 rounded-full object-cover object-top ring-2 ring-white shadow-sm"
                  />
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200">
                    <UserRound className="h-6 w-6 text-slate-400" />
                  </span>
                )}
                <p className="font-semibold text-slate-900 leading-tight">{p.numeComplet ?? p.nume}</p>
              </div>
            ))}
          </div>
        )}

        {g.linkInscriere ? (
          <Button asChild variant="brand" className="w-full">
            <Link href={g.linkInscriere}>Înscrie-te la această grupă</Link>
          </Button>
        ) : (
          <p className="text-xs text-slate-500 leading-relaxed">
            {locTot > 0 && locDisp === 0
              ? 'Grupa e completă momentan.'
              : 'Grupă deja pornită — nu primește începători. Pentru a te alătura, vorbește cu instructorul.'}
          </p>
        )}
      </div>
    </div>
  )
}
