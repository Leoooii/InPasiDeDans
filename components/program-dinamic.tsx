'use client'

import { useState, useEffect, useMemo } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Grupa = {
  id: string
  titlu: string
  instructor: string
  program: string
  zile: string[]
  stiluri: string[]
  nivel?: string
  sala?: string
}

type DayGroupId = 'all' | 'lm' | 'mj' | 'vineri' | 'sambata'
type StyleKey = 'latino' | 'populare' | 'standard' | 'societate' | 'copii' | 'general'
type NivelGroup = 'all' | 'incepatori' | 'intermediari' | 'avansati' | 'copii'

// ─── Config ───────────────────────────────────────────────────────────────────

const DAY_GROUPS: { id: DayGroupId; label: string; short: string; days: string[] }[] = [
  { id: 'all',     label: 'Toate zilele',    short: 'Toate',    days: [] },
  { id: 'lm',     label: 'Luni & Miercuri', short: 'L · M',    days: ['Luni', 'Miercuri'] },
  { id: 'mj',     label: 'Marți & Joi',     short: 'Ma · J',   days: ['Marți', 'Joi'] },
  { id: 'vineri', label: 'Vineri',           short: 'Vineri',   days: ['Vineri'] },
  { id: 'sambata',label: 'Sâmbătă',         short: 'Sâmbătă',  days: ['Sâmbătă'] },
]

const STYLES: { id: StyleKey; label: string; dot: string; chip: string }[] = [
  { id: 'latino',    label: 'Latino',    dot: 'bg-rose-400',    chip: 'bg-rose-50 text-rose-700 border-rose-200'    },
  { id: 'populare',  label: 'Populare',  dot: 'bg-emerald-400', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'standard',  label: 'Standard',  dot: 'bg-blue-400',    chip: 'bg-blue-50 text-blue-700 border-blue-200'    },
  { id: 'societate', label: 'Dansuri de Societate', dot: 'bg-violet-400',  chip: 'bg-violet-50 text-violet-700 border-violet-200' },
  { id: 'copii',     label: 'Copii',     dot: 'bg-amber-400',   chip: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'general',   label: 'Dans',      dot: 'bg-slate-400',   chip: 'bg-slate-100 text-slate-600 border-slate-200' },
]

const NIVEL_GROUPS: Record<Exclude<NivelGroup, 'all'>, string[]> = {
  incepatori:   ['Începători', 'Începători 2', 'Începători 3', 'Începători (în formare)'],
  intermediari: ['Intermediari 1', 'Intermediari 2', 'Intermediari 3', 'Intermediari/Avansați'],
  avansati:     ['Avansați', 'Avansați 1', 'Avansați 2', 'Avansați 3'],
  copii:        ['Copii Începători', 'Copii Intermediari', 'Copii Avansați', 'Formație'],
}

const NIVEL_FILTER_OPTIONS: { id: NivelGroup; label: string }[] = [
  { id: 'incepatori',   label: 'Începători'  },
  { id: 'intermediari', label: 'Intermediari' },
  { id: 'avansati',     label: 'Avansați'    },
  { id: 'copii',        label: 'Copii'       },
]

function matchesNivelGroup(nivel: string | undefined, group: NivelGroup): boolean {
  if (group === 'all') return true
  if (!nivel) return false
  return NIVEL_GROUPS[group].includes(nivel)
}

const NIVEL_COLOR: Record<string, string> = {
  'Începători':              'text-emerald-600',
  'Începători 2':            'text-emerald-600',
  'Începători 3':            'text-emerald-700',
  'Începători (în formare)': 'text-emerald-600',
  'Intermediari 1':          'text-sky-600',
  'Intermediari 2':          'text-blue-600',
  'Intermediari 3':          'text-indigo-600',
  'Intermediari/Avansați':   'text-indigo-600',
  'Avansați':                'text-purple-600',
  'Avansați 1':              'text-purple-500',
  'Avansați 2':              'text-purple-600',
  'Avansați 3':              'text-purple-700',
  'Copii Începători':        'text-amber-600',
  'Copii Intermediari':      'text-orange-600',
  'Copii Avansați':          'text-red-600',
  'Formație':                'text-pink-600',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getStyleKey(stiluri: string[], titlu: string): StyleKey {
  // Verificăm mai întâi stiluri[] cu match exact — evită coliziuni între categorii
  if (stiluri.some(s => s.toLowerCase().includes('societate'))) return 'societate'
  if (stiluri.some(s => s.toLowerCase().includes('popular'))) return 'populare'
  if (stiluri.some(s => s.toLowerCase().includes('latin') || s.toLowerCase().includes('salsa') || s.toLowerCase().includes('bachata'))) return 'latino'
  if (stiluri.some(s => s.toLowerCase().includes('standard'))) return 'standard'
  if (stiluri.some(s => s.toLowerCase().includes('copii') || s.toLowerCase().includes('formați') || s.toLowerCase().includes('formatie'))) return 'copii'
  // Fallback pe titlu
  const t = titlu.toLowerCase()
  if (t.includes('societate') || t.includes('vals') || t.includes('tango') || t.includes('foxtrot')) return 'societate'
  if (t.includes('popular')) return 'populare'
  if (t.includes('salsa') || t.includes('bachata') || t.includes('latino')) return 'latino'
  if (t.includes('standard')) return 'standard'
  if (t.includes('copii') || t.includes('formație') || t.includes('formatie')) return 'copii'
  return 'general'
}

function getDayGroupId(zile: string[]): Exclude<DayGroupId, 'all'> {
  if (zile.some(z => ['Luni', 'Miercuri'].includes(z))) return 'lm'
  if (zile.some(z => ['Marți', 'Joi'].includes(z))) return 'mj'
  if (zile.includes('Vineri')) return 'vineri'
  if (zile.includes('Sâmbătă')) return 'sambata'
  return 'lm'
}

function extractStartTime(program: string): string {
  const m = program.match(/(\d{1,2}:\d{2})/)
  return m ? m[1] : ''
}

function toMinutes(t: string): number {
  const m = t.match(/(\d{1,2}):(\d{2})/)
  return m ? +m[1] * 60 + +m[2] : 0
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProgramDinamic() {
  const [grupe, setGrupe] = useState<Grupa[]>([])
  const [loading, setLoading] = useState(true)
  const [filterDay, setFilterDay]         = useState<DayGroupId>('all')
  const [filterStyle, setFilterStyle]     = useState<StyleKey | 'all'>('all')
  const [filterNivel, setFilterNivel]     = useState<NivelGroup>('all')
  const [filterInstructor, setFilterInstructor] = useState('all')
  const [filterTime, setFilterTime]       = useState('all')

  useEffect(() => {
    getDocs(query(collection(db, 'grupe')))
      .then(snap => {
        const data: Grupa[] = []
        snap.forEach(doc => {
          const d = doc.data()
          data.push({
            id: doc.id,
            titlu: d.titlu || '',
            instructor: (d.instructor || '').trim(),
            program: d.program || '',
            zile: d.zile || [],
            stiluri: d.stiluri || (d.stil ? [d.stil] : []),
            nivel: d.nivel,
            sala: d.sala,
          })
        })
        setGrupe(data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const enriched = useMemo(() =>
    grupe
      .map(g => ({
        ...g,
        startTime:   extractStartTime(g.program),
        styleKey:    getStyleKey(g.stiluri, g.titlu),
        dayGroupId:  getDayGroupId(g.zile),
      }))
      .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime)),
    [grupe]
  )

  const instructori = useMemo(() =>
    [...new Set(enriched.map(g => g.instructor).filter(Boolean))].sort(),
    [enriched]
  )

  // Nivel groups that actually exist in data
  const usedNivelGroups = useMemo(() =>
    NIVEL_FILTER_OPTIONS.filter(opt =>
      enriched.some(g => matchesNivelGroup(g.nivel, opt.id))
    ),
    [enriched]
  )

  // Times available given current filters (excluding time filter itself)
  const availableTimes = useMemo(() => {
    const base = enriched.filter(g => {
      if (filterDay !== 'all' && g.dayGroupId !== filterDay) return false
      if (filterStyle !== 'all' && g.styleKey !== filterStyle) return false
      if (filterNivel !== 'all' && !matchesNivelGroup(g.nivel, filterNivel)) return false
      if (filterInstructor !== 'all' && g.instructor !== filterInstructor) return false
      return true
    })
    return [...new Set(base.map(g => g.startTime).filter(Boolean))]
      .sort((a, b) => toMinutes(a) - toMinutes(b))
  }, [enriched, filterDay, filterStyle, filterInstructor])

  // Reset time filter if it's no longer available
  const safeFilterTime = availableTimes.includes(filterTime) ? filterTime : 'all'

  const processed = useMemo(() =>
    enriched.filter(g => {
      if (filterDay !== 'all' && g.dayGroupId !== filterDay) return false
      if (filterStyle !== 'all' && g.styleKey !== filterStyle) return false
      if (filterNivel !== 'all' && !matchesNivelGroup(g.nivel, filterNivel)) return false
      if (filterInstructor !== 'all' && g.instructor !== filterInstructor) return false
      if (safeFilterTime !== 'all' && g.startTime !== safeFilterTime) return false
      return true
    }),
    [enriched, filterDay, filterStyle, filterNivel, filterInstructor, safeFilterTime]
  )

  const usedStyleKeys = useMemo(() =>
    [...new Set(enriched.map(g => g.styleKey))],
    [enriched]
  )

  // Grouped by day section for display
  const sections = useMemo(() => {
    if (filterDay !== 'all') {
      const dg = DAY_GROUPS.find(d => d.id === filterDay)!
      return [{ id: filterDay, label: dg.label, grupe: processed }]
    }
    return DAY_GROUPS
      .filter(d => d.id !== 'all')
      .map(d => ({ id: d.id, label: d.label, grupe: processed.filter(g => g.dayGroupId === d.id) }))
      .filter(s => s.grupe.length > 0)
  }, [processed, filterDay])

  const resetAll = () => {
    setFilterDay('all')
    setFilterStyle('all')
    setFilterNivel('all')
    setFilterInstructor('all')
    setFilterTime('all')
  }

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-12 rounded-lg bg-slate-100 animate-pulse" />
        ))}
      </div>
    )
  }

  if (grupe.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <Loader2 className="h-6 w-6 mb-2 animate-spin" />
        <p className="text-sm">Programul va fi disponibil în curând.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">

      {/* ── Filters ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">

        {/* Rând 1: Zile */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl w-fit">
          {DAY_GROUPS.map(dg => (
            <button
              key={dg.id}
              onClick={() => setFilterDay(dg.id)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filterDay === dg.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {dg.id === 'all' ? 'Toate' : dg.short}
            </button>
          ))}
        </div>

        {/* Rând 2: Stiluri */}
        <div className="flex flex-wrap gap-2">
          {STYLES.filter(s => usedStyleKeys.includes(s.id)).map(s => {
            const active = filterStyle === s.id
            return (
              <button
                key={s.id}
                onClick={() => setFilterStyle(active ? 'all' : s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  active ? s.chip : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${active ? s.dot : 'bg-slate-300'}`} />
                {s.label}
              </button>
            )
          })}
        </div>

        {/* Rând 3: Nivel + Dropdowns (2 coloane pe mobile) */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Nivel chips */}
          {usedNivelGroups.length > 0 && (
            <div className="flex flex-wrap gap-2 flex-1">
              {usedNivelGroups.map(opt => {
                const active = filterNivel === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => setFilterNivel(active ? 'all' : opt.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      active
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          )}

          {/* Dropdowns */}
          <div className="grid grid-cols-2 sm:flex gap-2 shrink-0">
            <Select value={filterInstructor} onValueChange={setFilterInstructor}>
              <SelectTrigger className="h-8 w-full sm:min-w-36 text-xs bg-white border-slate-200 rounded-lg">
                <SelectValue placeholder="Instructor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toți instructorii</SelectItem>
                {instructori.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={safeFilterTime} onValueChange={setFilterTime}>
              <SelectTrigger className="h-8 w-full sm:min-w-28 text-xs bg-white border-slate-200 rounded-lg">
                <SelectValue placeholder="Oră start" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate orele</SelectItem>
                {availableTimes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

      </div>

      {/* ── Schedule ────────────────────────────────────────────────────── */}
      {processed.length === 0 ? (
        <div className="text-center py-12 text-sm text-slate-400">
          Nicio grupă nu corespunde filtrelor aplicate.{' '}
          <button onClick={resetAll} className="underline hover:text-slate-600">Resetează</button>
        </div>
      ) : (
        <div className="space-y-7">
          {sections.map(section => {
            const styleCfgMap = Object.fromEntries(STYLES.map(s => [s.id, s]))
            return (
              <div key={section.id}>
                {filterDay === 'all' && (
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{section.label}</span>
                    <div className="flex-1 h-px bg-slate-100" />
                    <span className="text-xs text-slate-300">{section.grupe.length}</span>
                  </div>
                )}

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {section.grupe.map(g => {
                    const sc = styleCfgMap[g.styleKey]
                    return (
                      <div
                        key={g.id}
                        className="flex items-center gap-4 px-5 py-3 bg-white hover:bg-slate-50 transition-colors"
                      >
                        {/* Start time */}
                        <span className="w-12 shrink-0 text-sm font-bold text-slate-800 tabular-nums">
                          {g.startTime}
                        </span>

                        {/* Style dot */}
                        <span className={`w-2 h-2 rounded-full shrink-0 ${sc?.dot ?? 'bg-slate-300'}`} />

                        {/* Title + nivel */}
                        <div className="flex-1 min-w-0 flex items-baseline gap-2">
                          <span className="font-medium text-slate-900 text-sm leading-snug">{g.titlu}</span>
                          {g.nivel && (
                            <span className={`text-xs font-medium shrink-0 ${NIVEL_COLOR[g.nivel] ?? 'text-slate-500'}`}>
                              {g.nivel}
                            </span>
                          )}
                        </div>

                        {/* Instructor */}
                        <span className="hidden sm:block text-sm text-slate-400 w-40 shrink-0 text-right truncate">
                          {g.instructor}
                        </span>

                        {/* Sala */}
                        {g.sala ? (
                          <span className="hidden md:block text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md shrink-0">
                            {g.sala}
                          </span>
                        ) : (
                          <span className="hidden md:block w-16 shrink-0" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
