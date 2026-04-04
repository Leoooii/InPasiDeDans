'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { db } from '@/lib/firebase'
import { collection, getDocs, doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore'
import {
  Loader2, AlertTriangle, XCircle, CheckCircle2, ChevronRight, CreditCard, Plus,
} from 'lucide-react'

/* ─── Tipuri ─────────────────────────────────────────────────── */
type RawTimestamp = { toDate: () => Date }

type Abonament = {
  tip: string
  sedinteTotal: number
  dataStart: RawTimestamp
  dataExpirare: RawTimestamp
}

type Prezenta = { data: RawTimestamp }

type Cursant = {
  id: string
  nume: string
  abonamente: Abonament[]
  prezente: Prezenta[]
}

type CursantStatus = {
  cursant: Cursant
  urgenta: 'fara' | 'depasit' | 'critic' | 'ok'
  sedinteRamase: number
  sedinteTotal: number
  sedinteFacute: number
  abonamentCurent: Abonament | null
}

const TIPURI_ABONAMENT = [
  { label: 'Abonament 8 ședințe', sedinteTotal: 8 },
  { label: 'Abonament 12 ședințe', sedinteTotal: 12 },
  { label: 'Abonament 16 ședințe', sedinteTotal: 16 },
  { label: 'Abonament Full Pass', sedinteTotal: 99 },
  { label: 'Plata la ședință', sedinteTotal: 1 },
]

/* ─── Calcul status ──────────────────────────────────────────── */
function calcStatus(c: Cursant): CursantStatus {
  if (!c.abonamente?.length) {
    return { cursant: c, urgenta: 'fara', sedinteRamase: 0, sedinteTotal: 0, sedinteFacute: 0, abonamentCurent: null }
  }
  const ab = [...c.abonamente].sort(
    (a, b) => b.dataStart.toDate().getTime() - a.dataStart.toDate().getTime()
  )[0]
  const sedinteFacute = (c.prezente || []).filter(
    p => p.data?.toDate().getTime() >= ab.dataStart.toDate().getTime()
  ).length
  const sedinteRamase = ab.sedinteTotal - sedinteFacute
  const urgenta: CursantStatus['urgenta'] =
    sedinteRamase <= 0 ? 'depasit' : sedinteRamase <= 2 ? 'critic' : 'ok'
  return { cursant: c, urgenta, sedinteRamase, sedinteTotal: ab.sedinteTotal, sedinteFacute, abonamentCurent: ab }
}

const URGENTA_ORDER = { fara: 0, depasit: 1, critic: 2, ok: 3 }

const URGENTA_CFG = {
  fara:    { dot: 'bg-red-500',    badge: 'bg-red-50 border-red-200 text-red-700',       icon: XCircle,       iconCls: 'text-red-500' },
  depasit: { dot: 'bg-red-500',    badge: 'bg-red-50 border-red-200 text-red-700',       icon: XCircle,       iconCls: 'text-red-500' },
  critic:  { dot: 'bg-amber-400',  badge: 'bg-amber-50 border-amber-200 text-amber-700', icon: AlertTriangle, iconCls: 'text-amber-500' },
  ok:      { dot: 'bg-green-500',  badge: 'bg-green-50 border-green-200 text-green-700', icon: CheckCircle2,  iconCls: 'text-green-500' },
}

/* ─── Pagina ─────────────────────────────────────────────────── */
export default function AbonamentePage() {
  const [statuses, setStatuses] = useState<CursantStatus[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [selectedCursant, setSelectedCursant] = useState('')
  const [tipAb, setTipAb] = useState('')
  const [dataStart, setDataStart] = useState('')
  const [dataExpirare, setDataExpirare] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const { toast } = useToast()

  const fetchData = useCallback(async () => {
    const snap = await getDocs(collection(db, 'cursanti'))
    const cursanti: Cursant[] = snap.docs.map(d => {
      const raw = d.data()
      return { id: d.id, nume: raw.nume || '', abonamente: raw.abonamente || [], prezente: raw.prezente || [] }
    })
    const sorted = cursanti
      .map(calcStatus)
      .sort((a, b) => URGENTA_ORDER[a.urgenta] - URGENTA_ORDER[b.urgenta])
    setStatuses(sorted)
    setIsLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleAddAbonament = async () => {
    if (!selectedCursant || !tipAb || !dataStart || !dataExpirare) {
      toast({ title: 'Completează toate câmpurile.', variant: 'destructive' }); return
    }
    const tipObj = TIPURI_ABONAMENT.find(t => t.label === tipAb)
    if (!tipObj) return
    setIsSaving(true)
    try {
      await updateDoc(doc(db, 'cursanti', selectedCursant), {
        abonamente: arrayUnion({
          tip: tipObj.label,
          sedinteTotal: tipObj.sedinteTotal,
          dataStart: Timestamp.fromDate(new Date(dataStart)),
          dataExpirare: Timestamp.fromDate(new Date(dataExpirare)),
        }),
      })
      const cursantNume = statuses.find(s => s.cursant.id === selectedCursant)?.cursant.nume || ''
      toast({ title: `Abonament adăugat pentru ${cursantNume}.` })
      setSelectedCursant(''); setTipAb(''); setDataStart(''); setDataExpirare('')
      setShowForm(false)
      setIsLoading(true)
      fetchData()
    } catch {
      toast({ title: 'Eroare la salvare.', variant: 'destructive' })
    } finally {
      setIsSaving(false)
    }
  }

  /* ── Summary counts ── */
  const counts = {
    urgent: statuses.filter(s => s.urgenta === 'fara' || s.urgenta === 'depasit').length,
    critic: statuses.filter(s => s.urgenta === 'critic').length,
    ok: statuses.filter(s => s.urgenta === 'ok').length,
  }

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto" />
        <p className="mt-3 text-sm text-slate-500">Se încarcă abonamentele...</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">

      {/* ─── Header ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Abonamente</h1>
          <p className="text-sm text-slate-500 mt-0.5">Situația abonamentelor tuturor cursanților.</p>
        </div>
        <Button
          size="sm"
          onClick={() => setShowForm(v => !v)}
          className="bg-slate-900 hover:bg-slate-800 shrink-0"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Abonament nou
        </Button>
      </div>

      {/* ─── Form ───────────────────────────────────────────── */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-900">Adaugă abonament</span>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Cursant</Label>
                <Select value={selectedCursant} onValueChange={setSelectedCursant}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Alege cursant..." />
                  </SelectTrigger>
                  <SelectContent>
                    {[...statuses]
                      .sort((a, b) => a.cursant.nume.localeCompare(b.cursant.nume, 'ro'))
                      .map(s => (
                        <SelectItem key={s.cursant.id} value={s.cursant.id}>
                          {s.cursant.nume}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Tip abonament</Label>
                <Select value={tipAb} onValueChange={setTipAb}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Tip..." />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPURI_ABONAMENT.map(t => (
                      <SelectItem key={t.label} value={t.label}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Data start</Label>
                <Input type="date" value={dataStart} onChange={e => setDataStart(e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Data expirare</Label>
                <Input type="date" value={dataExpirare} onChange={e => setDataExpirare(e.target.value)} className="h-9 text-sm" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Anulează</Button>
              <Button size="sm" onClick={handleAddAbonament} disabled={isSaving} className="bg-slate-900 hover:bg-slate-800">
                {isSaving && <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />}
                Salvează
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Summary chips ──────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        {counts.urgent > 0 && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm font-semibold text-red-700">{counts.urgent} necesită atenție</span>
          </div>
        )}
        {counts.critic > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-700">{counts.critic} la limită</span>
          </div>
        )}
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span className="text-sm font-semibold text-green-700">{counts.ok} în regulă</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5">
          <span className="text-sm text-slate-500">
            Total: <span className="font-semibold text-slate-700">{statuses.length}</span> cursanți
          </span>
        </div>
      </div>

      {/* ─── List ───────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        {statuses.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-12">Niciun cursant înregistrat.</p>
        ) : (
          <div className="divide-y divide-slate-50">
            {statuses.map(({ cursant, urgenta, sedinteRamase, sedinteTotal, sedinteFacute, abonamentCurent }) => {
              const cfg = URGENTA_CFG[urgenta]
              const Icon = cfg.icon

              const badgeText = urgenta === 'fara'
                ? 'Fără abonament'
                : urgenta === 'depasit'
                ? `Depășit cu ${sedinteFacute - sedinteTotal}`
                : urgenta === 'critic'
                ? `${sedinteRamase} ${sedinteRamase === 1 ? 'ședință rămasă' : 'ședințe rămase'}`
                : `${sedinteRamase} rămase`

              return (
                <Link
                  key={cursant.id}
                  href={`/admin/cursanti/${cursant.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors group"
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                  <span className="flex-1 text-sm font-medium text-slate-800 group-hover:text-slate-900">
                    {cursant.nume}
                  </span>
                  <div className="flex items-center gap-4">
                    {abonamentCurent && (
                      <>
                        <span className="text-xs text-slate-400 hidden md:block">{abonamentCurent.tip}</span>
                        <span className="text-xs text-slate-500 hidden sm:block tabular-nums">
                          {sedinteFacute} / {sedinteTotal} ședințe
                        </span>
                      </>
                    )}
                    <span className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold border ${cfg.badge}`}>
                      <Icon className={`h-3 w-3 ${cfg.iconCls}`} />
                      {badgeText}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300 shrink-0 group-hover:text-slate-400" />
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
