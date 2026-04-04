'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { db } from '@/lib/firebase'
import {
  collection, getDocs, query, where, doc,
  updateDoc, arrayUnion, Timestamp,
} from 'firebase/firestore'
import {
  Loader2, Check, Calendar, Clock, AlertCircle, Users,
  ChevronLeft, ChevronRight, UserCircle2,
} from 'lucide-react'

type Grupa = {
  id: string
  titlu: string
  instructor: string
  stiluri: string[]
  zile: string[]
  ora: string
}

type Abonament = {
  tip: string
  sedinteTotal: number
  dataStart: { toDate: () => Date }
  dataExpirare: { toDate: () => Date }
}

type Prezenta = {
  data: { toDate: () => Date }
  grupaId: string
  grupaTitlu: string
  profesor: string
}

type Cursant = {
  id: string
  nume: string
  abonamente?: Abonament[]
  prezente?: Prezenta[]
}

const ZILE_RO = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă']
const MONTHS_RO = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
  'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']
const DAYS_SHORT = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

/* ─── Mini calendar ──────────────────────────────────────── */
function MiniCalendar({ value, onChange }: { value: string; onChange: (d: string) => void }) {
  const todayStr = new Date().toISOString().split('T')[0]

  const [viewYear, setViewYear] = useState(() => parseInt(value.split('-')[0]))
  const [viewMonth, setViewMonth] = useState(() => parseInt(value.split('-')[1]) - 1)

  // Sync view when parent changes value (e.g., "Înapoi la azi")
  useEffect(() => {
    setViewYear(parseInt(value.split('-')[0]))
    setViewMonth(parseInt(value.split('-')[1]) - 1)
  }, [value])

  const firstDow = new Date(viewYear, viewMonth, 1).getDay() // 0=Sun
  // Convert to Mon-based: Mon=0 … Sun=6
  const startOffset = (firstDow + 6) % 7
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const toStr = (day: number) => {
    const m = String(viewMonth + 1).padStart(2, '0')
    const d = String(day).padStart(2, '0')
    return `${viewYear}-${m}-${d}`
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold text-slate-900">
          {MONTHS_RO[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-semibold text-slate-400 py-1">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const ds = toStr(day)
          const isSelected = ds === value
          const isToday = ds === todayStr
          const isFuture = ds > todayStr
          return (
            <button
              key={i}
              onClick={() => !isFuture && onChange(ds)}
              disabled={isFuture}
              className={[
                'mx-auto w-8 h-8 rounded-full text-xs flex items-center justify-center transition-colors',
                isSelected ? 'bg-slate-900 text-white font-bold' : '',
                isToday && !isSelected ? 'ring-2 ring-red-500 text-red-600 font-semibold' : '',
                !isSelected && !isToday && !isFuture ? 'text-slate-700 hover:bg-slate-100' : '',
                isFuture ? 'text-slate-300 cursor-not-allowed' : '',
              ].filter(Boolean).join(' ')}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Pagina ─────────────────────────────────────────────── */
export default function PrezentaPage() {
  const [grupeAzi, setGrupeAzi] = useState<Grupa[]>([])
  const [selectedGrupa, setSelectedGrupa] = useState<Grupa | null>(null)
  const [cursanti, setCursanti] = useState<Cursant[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingCursanti, setIsLoadingCursanti] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const todayStr = new Date().toISOString().split('T')[0]
  const [dataSelectata, setDataSelectata] = useState(todayStr)

  const { toast } = useToast()

  const dataObj = new Date(dataSelectata + 'T12:00:00')
  const ziuaSelectata = ZILE_RO[dataObj.getDay()]
  const esteAzi = dataSelectata === todayStr

  const dataCurenta = dataObj.toLocaleDateString('ro-RO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  useEffect(() => { fetchGrupe() }, [ziuaSelectata]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchGrupe = async () => {
    setIsLoading(true)
    setSelectedGrupa(null)
    setCursanti([])
    setSelectedIds([])
    try {
      const snapshot = await getDocs(collection(db, 'grupe'))
      const all: Grupa[] = snapshot.docs.map(d => {
        const raw = d.data()
        return {
          id: d.id,
          titlu: raw.titlu,
          instructor: raw.instructor || '',
          stiluri: raw.stiluri || (raw.stil ? [raw.stil] : []),
          zile: raw.zile || [],
          ora: raw.program?.split(',').pop()?.trim() || '',
        }
      })
      setGrupeAzi(all.filter(g => g.zile.includes(ziuaSelectata)))
    } catch {
      toast({ title: 'Eroare', description: 'Nu s-au putut încărca grupele.', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCursantiGrupa = async (grupa: Grupa) => {
    setIsLoadingCursanti(true)
    setSelectedGrupa(grupa)
    setSelectedIds([])
    try {
      const snapshot = await getDocs(
        query(collection(db, 'cursanti'), where('grupe', 'array-contains', grupa.id))
      )
      setCursanti(snapshot.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Cursant, 'id'>) })))
    } catch {
      toast({ title: 'Eroare', description: 'Nu s-au putut încărca cursanții.', variant: 'destructive' })
    } finally {
      setIsLoadingCursanti(false)
    }
  }

  const hasAttendanceOn = (cursant: Cursant, grupaId: string) => {
    if (!cursant.prezente) return false
    const target = new Date(dataSelectata + 'T12:00:00')
    target.setHours(0, 0, 0, 0)
    return cursant.prezente.some(p => {
      if (!p.data?.toDate) return false
      const d = p.data.toDate(); d.setHours(0, 0, 0, 0)
      return d.getTime() === target.getTime() && p.grupaId === grupaId
    })
  }

  const getAbonamentCurent = (cursant: Cursant): Abonament | null => {
    if (!cursant.abonamente?.length) return null
    return [...cursant.abonamente].sort(
      (a, b) => b.dataStart.toDate().getTime() - a.dataStart.toDate().getTime()
    )[0]
  }

  const sedinteFacute = (cursant: Cursant, ab: Abonament) => {
    if (!cursant.prezente) return 0
    const start = ab.dataStart.toDate().getTime()
    return cursant.prezente.filter(p => p.data?.toDate().getTime() >= start).length
  }

  const toggle = (id: string) =>
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const handleSave = async () => {
    if (!selectedGrupa || selectedIds.length === 0) return
    setIsSaving(true)
    try {
      const timestamp = Timestamp.fromDate(new Date(dataSelectata + 'T12:00:00'))
      let salvati = 0
      for (const cursantId of selectedIds) {
        const cursant = cursanti.find(c => c.id === cursantId)
        if (!cursant || hasAttendanceOn(cursant, selectedGrupa.id)) continue
        await updateDoc(doc(db, 'cursanti', cursantId), {
          prezente: arrayUnion({
            data: timestamp,
            grupaId: selectedGrupa.id,
            grupaTitlu: selectedGrupa.titlu,
            profesor: selectedGrupa.instructor,
          }),
        })
        salvati++
      }
      toast({ title: 'Prezența salvată', description: `${salvati} cursanți marcați.` })
      await fetchCursantiGrupa(selectedGrupa)
      setSelectedIds([])
    } catch {
      toast({ title: 'Eroare', description: 'Nu s-a putut salva prezența.', variant: 'destructive' })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto" />
          <p className="mt-3 text-sm text-slate-500">Se încarcă...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* ─── Header ─────────────────────────────────────────── */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Prezență</h1>
        <p className="text-sm text-slate-500 mt-0.5 capitalize">{dataCurenta}</p>
      </div>

      {/* ─── Past date warning ───────────────────────────────── */}
      {!esteAzi && (
        <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 px-3 py-2.5 rounded-lg">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Marchezi prezența pentru o dată din trecut: <strong className="ml-1 capitalize">{dataCurenta}</strong>
        </div>
      )}

      {/* ─── Main grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left: Calendar + Grupe ── */}
        <div className="space-y-4">

          {/* Calendar card */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-900">Calendar</span>
              </div>
              {!esteAzi && (
                <button
                  onClick={() => setDataSelectata(todayStr)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Azi
                </button>
              )}
            </div>
            <div className="p-4">
              <MiniCalendar value={dataSelectata} onChange={setDataSelectata} />
            </div>
          </div>

          {/* Grupe for selected day */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-50">
              <p className="text-sm font-semibold text-slate-900">Grupe — {ziuaSelectata}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {grupeAzi.length === 0
                  ? 'Nicio grupă programată'
                  : `${grupeAzi.length} ${grupeAzi.length === 1 ? 'grupă' : 'grupe'}`}
              </p>
            </div>
            <div className="p-3">
              {grupeAzi.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">Nicio grupă în această zi.</p>
              ) : (
                <div className="space-y-2">
                  {grupeAzi.map(grupa => {
                    const isSelected = selectedGrupa?.id === grupa.id
                    return (
                      <button
                        key={grupa.id}
                        onClick={() => fetchCursantiGrupa(grupa)}
                        className={`w-full text-left rounded-lg border p-3 transition-all ${
                          isSelected
                            ? 'border-red-200 bg-red-50'
                            : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className={`font-medium text-sm ${isSelected ? 'text-red-700' : 'text-slate-800'}`}>
                            {grupa.titlu}
                          </span>
                          {isSelected && <span className="shrink-0 w-2 h-2 mt-1 rounded-full bg-red-500" />}
                        </div>
                        {grupa.instructor && (
                          <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                            <UserCircle2 className="h-3 w-3" />
                            {grupa.instructor}
                          </div>
                        )}
                        {grupa.ora && (
                          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            {grupa.ora}
                          </div>
                        )}
                        {grupa.stiluri.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {grupa.stiluri.map((s, i) => (
                              <span key={i} className="inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right: Cursanți ── */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden h-full">
            <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-900">
                {selectedGrupa ? `Cursanți — ${selectedGrupa.titlu}` : 'Cursanți'}
              </span>
              {selectedGrupa && cursanti.length > 0 && (
                <span className="ml-auto text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  {cursanti.length}
                </span>
              )}
            </div>

            <div className="p-4">
              {!selectedGrupa ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Calendar className="h-10 w-10 mb-3 opacity-30" />
                  <p className="text-sm">Selectează o grupă din stânga</p>
                </div>
              ) : isLoadingCursanti ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
                </div>
              ) : cursanti.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Users className="h-10 w-10 mb-3 opacity-30" />
                  <p className="text-sm">Nu există cursanți înscriși în această grupă.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg border border-slate-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="px-4 py-3 text-left font-medium text-slate-600">Nume</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-600 hidden sm:table-cell">Abonament</th>
                          <th className="px-4 py-3 text-left font-medium text-slate-600 hidden sm:table-cell">Ședințe</th>
                          <th className="px-4 py-3 text-center font-medium text-slate-600">Prezent</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {cursanti.map(cursant => {
                          const ab = getAbonamentCurent(cursant)
                          const facute = ab ? sedinteFacute(cursant, ab) : 0
                          const ramase = ab ? ab.sedinteTotal - facute : null
                          const depasit = ramase !== null && ramase < 0
                          const arePrezenta = hasAttendanceOn(cursant, selectedGrupa.id)
                          const isSelected = selectedIds.includes(cursant.id)

                          return (
                            <tr key={cursant.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-4 py-3 font-medium text-slate-800">{cursant.nume}</td>
                              <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">
                                {ab
                                  ? <span className="text-xs">{ab.tip}</span>
                                  : <span className="text-xs text-red-500">Fără abonament</span>
                                }
                              </td>
                              <td className="px-4 py-3 hidden sm:table-cell">
                                {ab ? (
                                  <span className={`text-sm font-medium ${depasit ? 'text-red-500' : 'text-slate-800'}`}>
                                    {facute} / {ab.sedinteTotal}
                                    {depasit && ' ⚠'}
                                  </span>
                                ) : (
                                  <span className="text-slate-300">—</span>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex justify-center">
                                  {arePrezenta ? (
                                    <span className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                                      <Check className="h-4 w-4 text-white" />
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => toggle(cursant.id)}
                                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                                        isSelected ? 'bg-green-500 border-green-500' : 'border-slate-200 hover:border-slate-300'
                                      }`}
                                    >
                                      {isSelected && <Check className="h-4 w-4 text-white" />}
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                  {cursanti.some(c => hasAttendanceOn(c, selectedGrupa.id)) && (
                    <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 px-3 py-2.5 rounded-lg">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      Cursanții cu bifa verde au prezența deja înregistrată pentru această dată.
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button
                      onClick={handleSave}
                      disabled={selectedIds.length === 0 || isSaving}
                      className="bg-slate-900 hover:bg-slate-800"
                    >
                      {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Salvează prezența
                      {selectedIds.length > 0 && (
                        <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded text-xs">{selectedIds.length}</span>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
