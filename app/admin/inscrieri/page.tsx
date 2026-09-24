'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSimpleToast } from '@/components/simple-toast-provider'
import { ChevronDown, ClipboardList, Download, MessageSquare, Loader2, Mail, Phone, RotateCcw, Search, Trash2 } from 'lucide-react'

type Sursa = 'inscriere' | 'contact' | 'latino'
type Tip = 'lista-asteptare' | 'grupa' | 'curs' | 'mesaj'
type Status = 'nou' | 'contactat' | 'inscris' | 'renuntat'

interface Inscriere {
  id: string
  name: string
  email: string
  phone: string
  message: string
  danceclass: string
  instructor: string
  sursa: Sursa
  tip: Tip
  grupaId: string
  status: Status
  createdAt: number
}

const SURSA_LABEL: Record<Sursa, string> = {
  inscriere: 'Formular înscriere',
  contact: 'Formular contact',
  latino: 'Formular latino',
}

const TIP_LABEL: Record<Tip, string> = {
  'lista-asteptare': 'Listă de așteptare',
  grupa: 'Grupă în formare',
  curs: 'Curs',
  mesaj: 'Mesaj contact',
}

const TIP_STYLE: Record<Tip, string> = {
  'lista-asteptare': 'bg-amber-50 text-amber-700 border-amber-200',
  grupa: 'bg-orange-50 text-orange-700 border-orange-200',
  curs: 'bg-slate-100 text-slate-700 border-slate-200',
  mesaj: 'bg-sky-50 text-sky-700 border-sky-200',
}

const STATUS_LABEL: Record<Status, string> = {
  nou: 'Nou',
  contactat: 'Contactat',
  inscris: 'Înscris',
  renuntat: 'Renunțat',
}

const STATUS_STYLE: Record<Status, string> = {
  nou: 'border-red-300 text-red-700 bg-red-50',
  contactat: 'border-amber-300 text-amber-700 bg-amber-50',
  inscris: 'border-green-300 text-green-700 bg-green-50',
  renuntat: 'border-slate-300 text-slate-500 bg-slate-50',
}

const TOATE = 'toate'

const EMPTY_FILTERS = {
  search: '',
  tip: TOATE,
  grupa: TOATE,
  sursa: TOATE,
  status: TOATE,
  dela: '',
  panala: '',
}

function formatData(ms: number) {
  return new Date(ms).toLocaleString('ro-RO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function csvCell(value: string) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`
}

export default function InscrieriPage() {
  const [inscrieri, setInscrieri] = useState<Inscriere[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { showToast } = useSimpleToast()

  useEffect(() => {
    const fetchInscrieri = async () => {
      try {
        const snapshot = await getDocs(query(collection(db, 'inscrieri'), orderBy('createdAt', 'desc')))
        setInscrieri(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Inscriere)))
      } catch {
        showToast('Nu s-au putut încărca înscrierile', 'error')
      } finally {
        setIsLoading(false)
      }
    }
    fetchInscrieri()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const setFilter = (key: keyof typeof EMPTY_FILTERS, value: string) =>
    setFilters(prev => ({ ...prev, [key]: value, ...(key === 'tip' && value !== 'grupa' ? { grupa: TOATE } : {}) }))

  const grupeDisponibile = useMemo(() => {
    const map = new Map<string, string>()
    inscrieri.filter(i => i.tip === 'grupa' && i.grupaId).forEach(i => map.set(i.grupaId, i.danceclass))
    return Array.from(map, ([id, label]) => ({ id, label }))
  }, [inscrieri])

  const filtered = useMemo(() => {
    const search = filters.search.trim().toLowerCase()
    const dela = filters.dela ? new Date(`${filters.dela}T00:00:00`).getTime() : null
    const panala = filters.panala ? new Date(`${filters.panala}T23:59:59.999`).getTime() : null
    return inscrieri.filter(i => {
      if (search && ![i.name, i.email, i.phone].some(v => v?.toLowerCase().includes(search))) return false
      if (filters.tip !== TOATE && i.tip !== filters.tip) return false
      if (filters.grupa !== TOATE && i.grupaId !== filters.grupa) return false
      if (filters.sursa !== TOATE && i.sursa !== filters.sursa) return false
      if (filters.status !== TOATE && i.status !== filters.status) return false
      if (dela !== null && i.createdAt < dela) return false
      if (panala !== null && i.createdAt > panala) return false
      return true
    })
  }, [inscrieri, filters])

  const hasFilters = JSON.stringify(filters) !== JSON.stringify(EMPTY_FILTERS)
  const countNoi = filtered.filter(i => i.status === 'nou').length
  const countAsteptare = filtered.filter(i => i.tip === 'lista-asteptare').length

  const handleStatus = async (id: string, status: Status) => {
    try {
      await updateDoc(doc(db, 'inscrieri', id), { status })
      setInscrieri(prev => prev.map(i => (i.id === id ? { ...i, status } : i)))
    } catch {
      showToast('Statusul nu a putut fi salvat', 'error')
    }
  }

  const handleDelete = async (i: Inscriere) => {
    if (!confirm(`Ștergi definitiv înscrierea lui ${i.name}?`)) return
    try {
      await deleteDoc(doc(db, 'inscrieri', i.id))
      setInscrieri(prev => prev.filter(x => x.id !== i.id))
      showToast('Înscriere ștearsă', 'success')
    } catch {
      showToast('Înscrierea nu a putut fi ștearsă', 'error')
    }
  }

  const handleExport = () => {
    const header = ['Data', 'Nume', 'Telefon', 'Email', 'Tip', 'Curs / grupă', 'Instructor', 'Sursă', 'Status', 'Mesaj']
    const rows = filtered.map(i => [
      formatData(i.createdAt), i.name, i.phone, i.email, TIP_LABEL[i.tip] ?? i.tip, i.danceclass,
      i.instructor, SURSA_LABEL[i.sursa] ?? i.sursa, STATUS_LABEL[i.status] ?? i.status, i.message,
    ])
    // BOM + ';' ca Excel-ul românesc să deschidă corect diacriticele și coloanele
    const csv = '\uFEFF' + [header, ...rows].map(r => r.map(csvCell).join(';')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `inscrieri-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const StatusSelect = ({ i }: { i: Inscriere }) => (
    <Select value={i.status} onValueChange={v => handleStatus(i.id, v as Status)}>
      <SelectTrigger className={`h-8 w-[120px] text-xs font-medium ${STATUS_STYLE[i.status]}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(STATUS_LABEL) as Status[]).map(s => (
          <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  const TipBadge = ({ i }: { i: Inscriere }) => (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${TIP_STYLE[i.tip] ?? TIP_STYLE.curs}`}>
      {TIP_LABEL[i.tip] ?? i.tip}
    </span>
  )

  return (
    <div className="space-y-6">
      {/* ─── Header ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Înscrieri</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {isLoading
              ? '...'
              : `${filtered.length} din ${inscrieri.length} · ${countNoi} noi · ${countAsteptare} pe lista de așteptare`}
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleExport}
          disabled={isLoading || filtered.length === 0}
          className="shrink-0"
        >
          <Download className="h-4 w-4 mr-1.5" />
          Export CSV
        </Button>
      </div>

      {/* ─── Filtre ─────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Caută după nume, email sau telefon..."
            value={filters.search}
            onChange={e => setFilter('search', e.target.value)}
            className="pl-9 h-9 text-sm bg-white border-slate-200"
          />
        </div>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          <div className="space-y-1">
            <Label className="text-xs text-slate-500">Tip</Label>
            <Select value={filters.tip} onValueChange={v => setFilter('tip', v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={TOATE}>Toate</SelectItem>
                {(Object.keys(TIP_LABEL) as Tip[]).map(t => (
                  <SelectItem key={t} value={t}>{TIP_LABEL[t]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {filters.tip === 'grupa' && (
            <div className="space-y-1">
              <Label className="text-xs text-slate-500">Grupă</Label>
              <Select value={filters.grupa} onValueChange={v => setFilter('grupa', v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={TOATE}>Toate grupele</SelectItem>
                  {grupeDisponibile.map(g => (
                    <SelectItem key={g.id} value={g.id}>{g.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-1">
            <Label className="text-xs text-slate-500">Sursă</Label>
            <Select value={filters.sursa} onValueChange={v => setFilter('sursa', v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={TOATE}>Toate</SelectItem>
                {(Object.keys(SURSA_LABEL) as Sursa[]).map(s => (
                  <SelectItem key={s} value={s}>{SURSA_LABEL[s]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-slate-500">Status</Label>
            <Select value={filters.status} onValueChange={v => setFilter('status', v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={TOATE}>Toate</SelectItem>
                {(Object.keys(STATUS_LABEL) as Status[]).map(s => (
                  <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-slate-500">De la</Label>
            <Input type="date" value={filters.dela} onChange={e => setFilter('dela', e.target.value)} className="h-9 text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-slate-500">Până la</Label>
            <Input type="date" value={filters.panala} onChange={e => setFilter('panala', e.target.value)} className="h-9 text-sm" />
          </div>
        </div>
        {hasFilters && (
          <button
            onClick={() => setFilters(EMPTY_FILTERS)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Resetează filtrele
          </button>
        )}
      </div>

      {/* ─── Listă ──────────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center py-20 text-slate-400">
          <ClipboardList className="h-10 w-10 mb-3 opacity-30" />
          <p className="text-sm">
            {inscrieri.length === 0 ? 'Nu există înscrieri încă.' : 'Nicio înscriere nu corespunde filtrelor.'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop: tabel */}
          <p className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 -mb-3">
            <MessageSquare className="h-3.5 w-3.5 text-orange-500" />
            Apasă pe o înscriere marcată cu „Vezi mesajul” pentru a citi mesajul trimis.
          </p>
          <div className="hidden lg:block bg-white rounded-xl border border-slate-100 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                  <th className="px-4 py-3 font-medium">Data</th>
                  <th className="px-4 py-3 font-medium">Nume</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Curs / grupă</th>
                  <th className="px-4 py-3 font-medium">Sursă</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(i => (
                  <Fragment key={i.id}>
                    <tr
                      onClick={() => i.message && setExpandedId(expandedId === i.id ? null : i.id)}
                      className={`group border-b border-slate-50 align-top ${i.message ? 'cursor-pointer hover:bg-slate-50/60' : ''}`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">{formatData(i.createdAt)}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {i.name}
                        {i.message && (
                          <span className="mt-1 flex w-fit items-center gap-1 rounded-md bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700 group-hover:bg-orange-100">
                            <MessageSquare className="h-3.5 w-3.5" />
                            {expandedId === i.id ? 'Ascunde mesajul' : 'Vezi mesajul'}
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expandedId === i.id ? 'rotate-180' : ''}`} />
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        <a href={`tel:${i.phone}`} className="flex items-center gap-1.5 text-slate-700 hover:text-red-600">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />{i.phone}
                        </a>
                        <a href={`mailto:${i.email}`} className="flex items-center gap-1.5 text-slate-500 hover:text-red-600 mt-0.5">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />{i.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <TipBadge i={i} />
                        {i.tip !== 'lista-asteptare' && i.danceclass && (
                          <p className="text-slate-700 mt-1">{i.danceclass}</p>
                        )}
                        {i.instructor && <p className="text-xs text-slate-400">cu {i.instructor}</p>}
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{SURSA_LABEL[i.sursa] ?? i.sursa}</td>
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        <StatusSelect i={i} />
                      </td>
                      <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => handleDelete(i)}
                          title="Șterge"
                          className="p-1.5 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                    {expandedId === i.id && i.message && (
                      <tr className="border-b border-slate-50 bg-slate-50/60">
                        <td />
                        <td colSpan={6} className="px-4 py-3">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-1">Mesaj</p>
                          <p className="text-slate-700 whitespace-pre-line">{i.message}</p>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobil: carduri */}
          <div className="lg:hidden space-y-3">
            {filtered.map(i => (
              <div key={i.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">{i.name}</p>
                    <p className="text-xs text-slate-400">{formatData(i.createdAt)} · {SURSA_LABEL[i.sursa] ?? i.sursa}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(i)}
                    title="Șterge"
                    className="p-1.5 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <TipBadge i={i} />
                  {i.tip !== 'lista-asteptare' && i.danceclass && (
                    <p className="text-sm text-slate-700 mt-1">{i.danceclass}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <a href={`tel:${i.phone}`} className="flex items-center gap-1.5 text-slate-700">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />{i.phone}
                  </a>
                  <a href={`mailto:${i.email}`} className="flex items-center gap-1.5 text-slate-500 break-all">
                    <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />{i.email}
                  </a>
                </div>
                {i.message && (
                  <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 whitespace-pre-line">{i.message}</p>
                )}
                <StatusSelect i={i} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
