'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { db } from '@/lib/firebase'
import {
  doc, getDoc, updateDoc, collection, getDocs,
  arrayUnion, arrayRemove, Timestamp,
} from 'firebase/firestore'
import {
  Loader2, ArrowLeft, User, GraduationCap, CreditCard,
  Calendar, Trash2, BookOpen, Clock, UserCircle2, Plus, AlertTriangle,
} from 'lucide-react'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'

/* ─── Tipuri ─────────────────────────────────────────────────── */
type RawTimestamp = { toDate: () => Date }

type Abonament = {
  tip: string
  sedinteTotal: number
  dataStart: RawTimestamp
  dataExpirare: RawTimestamp
}

type Prezenta = {
  data: RawTimestamp
  grupaId: string
  grupaTitlu: string
  profesor: string
}

type Cursant = {
  id: string
  nume: string
  createdAt: number
  grupe: string[]
  prezente: Prezenta[]
  abonamente: Abonament[]
}

type Grupa = {
  id: string
  titlu: string
  instructor: string
  stiluri: string[]
  zile: string[]
  ora: string
}

const TIPURI_ABONAMENT = [
  { label: 'Abonament 8 ședințe', sedinteTotal: 8 },
  { label: 'Abonament 12 ședințe', sedinteTotal: 12 },
  { label: 'Abonament 16 ședințe', sedinteTotal: 16 },
  { label: 'Abonament Full Pass', sedinteTotal: 99 },
  { label: 'Plata la ședință', sedinteTotal: 1 },
]

/* ─── Dot indicator ──────────────────────────────────────────── */
function DotIndicator({ sedinteTotal, sedinteFacute }: { sedinteTotal: number; sedinteFacute: number }) {
  const overLimit = sedinteFacute > sedinteTotal
  const greenCount = overLimit ? sedinteTotal : sedinteFacute
  const redCount = overLimit ? sedinteFacute - sedinteTotal : 0
  const grayCount = overLimit ? 0 : sedinteTotal - sedinteFacute

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: greenCount }).map((_, i) => (
          <span key={`g${i}`} className="inline-block w-4 h-4 rounded-full bg-green-500" />
        ))}
        {Array.from({ length: redCount }).map((_, i) => (
          <span key={`r${i}`} className="inline-block w-4 h-4 rounded-full bg-red-500" />
        ))}
        {Array.from({ length: Math.min(grayCount, 40) }).map((_, i) => (
          <span key={`gr${i}`} className="inline-block w-4 h-4 rounded-full bg-slate-200" />
        ))}
      </div>
      {overLimit && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
          ⚠ Depășit cu <strong>{redCount}</strong> {redCount === 1 ? 'ședință' : 'ședințe'}. Necesită abonament nou.
        </p>
      )}
    </div>
  )
}

/* ─── Group card ─────────────────────────────────────────────── */
function GrupaCard({ g, action }: {
  g: Grupa
  action: { label: string; onClick: () => void; variant: 'remove' | 'add' }
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white overflow-hidden">
      <div className="flex gap-0">
        {/* Accent bar */}
        <div className={`w-1 shrink-0 ${action.variant === 'remove' ? 'bg-indigo-400' : 'bg-slate-200'}`} />
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 text-sm leading-tight">{g.titlu}</p>
              {g.instructor && (
                <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                  <UserCircle2 className="h-3 w-3 shrink-0" />
                  <span>{g.instructor}</span>
                </div>
              )}
            </div>
            <button
              onClick={action.onClick}
              className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${
                action.variant === 'remove'
                  ? 'text-red-500 hover:text-red-700 hover:bg-red-50'
                  : 'text-green-600 hover:text-green-800 hover:bg-green-50'
              }`}
            >
              {action.variant === 'add' && <Plus className="h-3 w-3 inline mr-0.5 -mt-px" />}
              {action.label}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Days */}
            {g.zile.map((z, i) => (
              <span key={i} className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                {z}
              </span>
            ))}
            {/* Time */}
            {g.ora && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3 w-3" />{g.ora}
              </span>
            )}
          </div>

          {/* Styles */}
          {g.stiluri.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {g.stiluri.map((s, i) => (
                <span key={i} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Pagina principală ──────────────────────────────────────── */
export default function CursantProfilPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [cursant, setCursant] = useState<Cursant | null>(null)
  const [toateGrupele, setToateGrupele] = useState<Grupa[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [showAddGroup, setShowAddGroup] = useState(false)

  const [tipAb, setTipAb] = useState('')
  const [dataStartAb, setDataStartAb] = useState('')
  const [dataExpirareAb, setDataExpirareAb] = useState('')
  const [isSavingAb, setIsSavingAb] = useState(false)
  const [deleteAbIdx, setDeleteAbIdx] = useState<number | null>(null)
  const [showDeleteCursant, setShowDeleteCursant] = useState(false)
  const [isDeletingCursant, setIsDeletingCursant] = useState(false)

  const { toast } = useToast()

  const fetchData = useCallback(async () => {
    try {
      const [cursantSnap, grupeSnap] = await Promise.all([
        getDoc(doc(db, 'cursanti', id)),
        getDocs(collection(db, 'grupe')),
      ])
      if (!cursantSnap.exists()) { setNotFound(true); return }
      const data = cursantSnap.data()
      setCursant({
        id: cursantSnap.id,
        nume: data.nume || '',
        createdAt: data.createdAt || 0,
        grupe: data.grupe || [],
        prezente: data.prezente || [],
        abonamente: data.abonamente || [],
      })
      setToateGrupele(grupeSnap.docs.map(d => {
        const raw = d.data()
        return {
          id: d.id,
          titlu: raw.titlu,
          instructor: raw.instructor || '',
          stiluri: raw.stiluri || (raw.stil ? [raw.stil] : []),
          zile: raw.zile || [],
          ora: raw.program?.split(',').pop()?.trim() || '',
        }
      }))
    } catch {
      setNotFound(true)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => { fetchData() }, [fetchData])

  const grupaCursant = toateGrupele.filter(g => cursant?.grupe?.includes(g.id))
  const grupeDisponibile = toateGrupele.filter(g => !cursant?.grupe?.includes(g.id))

  const abonamentCurent = cursant?.abonamente?.length
    ? [...cursant.abonamente].sort((a, b) => b.dataStart.toDate().getTime() - a.dataStart.toDate().getTime())[0]
    : null

  const sedinteFacuteActual = abonamentCurent && cursant
    ? cursant.prezente.filter(p => p.data?.toDate().getTime() >= abonamentCurent.dataStart.toDate().getTime()).length
    : 0

  const sedinteRamase = abonamentCurent ? abonamentCurent.sedinteTotal - sedinteFacuteActual : 0

  const handleAddGrupa = async (grupaId: string) => {
    try {
      await updateDoc(doc(db, 'cursanti', id), { grupe: arrayUnion(grupaId) })
      toast({ title: 'Cursant adăugat în grupă.' })
      fetchData()
    } catch { toast({ title: 'Eroare', variant: 'destructive' }) }
  }

  const handleRemoveGrupa = async (grupaId: string) => {
    try {
      await updateDoc(doc(db, 'cursanti', id), { grupe: arrayRemove(grupaId) })
      toast({ title: 'Cursant eliminat din grupă.' })
      fetchData()
    } catch { toast({ title: 'Eroare', variant: 'destructive' }) }
  }

  const handleAddAbonament = async () => {
    if (!tipAb || !dataStartAb || !dataExpirareAb) {
      toast({ title: 'Completează toate câmpurile.', variant: 'destructive' }); return
    }
    const tipObj = TIPURI_ABONAMENT.find(t => t.label === tipAb)
    if (!tipObj) return
    setIsSavingAb(true)
    try {
      await updateDoc(doc(db, 'cursanti', id), {
        abonamente: arrayUnion({
          tip: tipObj.label,
          sedinteTotal: tipObj.sedinteTotal,
          dataStart: Timestamp.fromDate(new Date(dataStartAb)),
          dataExpirare: Timestamp.fromDate(new Date(dataExpirareAb)),
        })
      })
      toast({ title: 'Abonament adăugat.' })
      setTipAb(''); setDataStartAb(''); setDataExpirareAb('')
      fetchData()
    } catch { toast({ title: 'Eroare', variant: 'destructive' }) }
    finally { setIsSavingAb(false) }
  }

  const handleDeleteAbonament = async () => {
    if (deleteAbIdx === null || !cursant) return
    try {
      await updateDoc(doc(db, 'cursanti', id), { abonamente: arrayRemove(cursant.abonamente[deleteAbIdx]) })
      toast({ title: 'Abonament șters.' })
      setDeleteAbIdx(null)
      fetchData()
    } catch { toast({ title: 'Eroare', variant: 'destructive' }) }
  }

  const handleDeleteCursant = async () => {
    setIsDeletingCursant(true)
    try {
      const res = await fetch(`/api/cursanti/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast({ title: 'Cursant șters.' })
      router.push('/admin/cursanti')
    } catch {
      toast({ title: 'Eroare la ștergere.', variant: 'destructive' })
      setIsDeletingCursant(false)
      setShowDeleteCursant(false)
    }
  }

  /* ── Render states ── */
  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto" />
        <p className="mt-3 text-sm text-slate-500">Se încarcă profilul...</p>
      </div>
    </div>
  )

  if (notFound || !cursant) return (
    <div className="space-y-4">
      <Button asChild variant="outline" size="sm">
        <Link href="/admin/cursanti"><ArrowLeft className="h-4 w-4 mr-1" />Înapoi</Link>
      </Button>
      <p className="text-sm text-slate-500">Cursantul nu a fost găsit.</p>
    </div>
  )

  /* ── Abonament status chip ── */
  const abChip = !abonamentCurent
    ? { label: 'Fără abonament', cls: 'bg-red-50 text-red-700 border-red-200' }
    : sedinteRamase <= 0
    ? { label: 'Abonament depășit', cls: 'bg-red-50 text-red-700 border-red-200' }
    : sedinteRamase <= 2
    ? { label: `${sedinteRamase} ședințe rămase`, cls: 'bg-amber-50 text-amber-700 border-amber-200' }
    : { label: `${sedinteRamase} ședințe rămase`, cls: 'bg-green-50 text-green-700 border-green-200' }

  return (
    <div className="space-y-6">

      {/* ─── Header ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <Link href="/admin/cursanti"><ArrowLeft className="h-4 w-4 mr-1" />Toți cursanții</Link>
        </Button>
        <div className="w-px h-6 bg-slate-200 hidden sm:block" />
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <User className="h-5 w-5 text-slate-400" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-slate-900 leading-tight truncate">{cursant.nume}</h1>
            <p className="text-xs text-slate-400">
              Înregistrat la {new Date(cursant.createdAt).toLocaleDateString('ro-RO')}
            </p>
          </div>
        </div>
        {/* Quick status chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 rounded-full border bg-slate-50 px-3 py-1 text-xs text-slate-600">
            <GraduationCap className="h-3 w-3" />
            {grupaCursant.length} {grupaCursant.length === 1 ? 'grupă' : 'grupe'}
          </span>
          <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${abChip.cls}`}>
            <CreditCard className="h-3 w-3" />
            {abChip.label}
          </span>
        </div>
      </div>

      {/* ─── Main grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Grupe (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-900">Grupe înscrise</span>
                {grupaCursant.length > 0 && (
                  <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {grupaCursant.length}
                  </span>
                )}
              </div>
              {grupeDisponibile.length > 0 && (
                <button
                  onClick={() => setShowAddGroup(v => !v)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {showAddGroup ? 'Închide' : 'Adaugă în grupă'}
                </button>
              )}
            </div>

            <div className="p-4">
              {grupaCursant.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">
                  Cursantul nu e înscris în nicio grupă.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {grupaCursant.map(g => (
                    <GrupaCard
                      key={g.id}
                      g={g}
                      action={{ label: 'Elimină', onClick: () => handleRemoveGrupa(g.id), variant: 'remove' }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Expandable: Add to group */}
            {showAddGroup && grupeDisponibile.length > 0 && (
              <div className="border-t border-slate-100">
                <div className="px-5 py-3 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Grupe disponibile
                    </span>
                  </div>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {grupeDisponibile.map(g => (
                    <GrupaCard
                      key={g.id}
                      g={g}
                      action={{ label: 'Adaugă', onClick: () => handleAddGrupa(g.id), variant: 'add' }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Abonament status (1/3 width) */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-900">Situație abonament</span>
            </div>
            <div className="p-5">
              {abonamentCurent ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Tip</p>
                      <p className="text-xs font-semibold text-slate-800 leading-snug">{abonamentCurent.tip}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Ședințe</p>
                      <p className="text-xs font-semibold text-slate-800">
                        {sedinteFacuteActual} / {abonamentCurent.sedinteTotal}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Start</p>
                      <p className="text-xs font-semibold text-slate-800">
                        {abonamentCurent.dataStart.toDate().toLocaleDateString('ro-RO')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Expiră</p>
                      <p className="text-xs font-semibold text-slate-800">
                        {abonamentCurent.dataExpirare.toDate().toLocaleDateString('ro-RO')}
                      </p>
                    </div>
                  </div>
                  <DotIndicator
                    sedinteTotal={abonamentCurent.sedinteTotal}
                    sedinteFacute={sedinteFacuteActual}
                  />
                </div>
              ) : (
                <p className="text-sm text-slate-400 text-center py-4">Niciun abonament activ.</p>
              )}
            </div>
          </div>

          {/* Prezente count card */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-900">Prezențe</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{cursant.prezente.length}</p>
            <p className="text-xs text-slate-400 mt-0.5">ședințe totale înregistrate</p>
          </div>
        </div>
      </div>

      {/* ─── Abonamente ─────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-900">Abonamente</span>
        </div>
        <div className="p-5 space-y-6">
          {/* Form */}
          <div className="bg-slate-50 rounded-lg p-4 space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Abonament nou</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-slate-500">Tip abonament</Label>
                <Select value={tipAb} onValueChange={setTipAb}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Alege..." />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPURI_ABONAMENT.map(t => (
                      <SelectItem key={t.label} value={t.label}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-slate-500">Data start</Label>
                <Input type="date" value={dataStartAb} onChange={e => setDataStartAb(e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-slate-500">Data expirare</Label>
                <Input type="date" value={dataExpirareAb} onChange={e => setDataExpirareAb(e.target.value)} className="h-9 text-sm" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="sm" onClick={handleAddAbonament} disabled={isSavingAb} className="bg-slate-900 hover:bg-slate-800">
                {isSavingAb && <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />}
                Salvează abonament
              </Button>
            </div>
          </div>

          {/* History table */}
          {cursant.abonamente.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Istoric</p>
              <div className="rounded-lg border border-slate-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-4 py-2.5 text-left font-medium text-slate-600">Tip</th>
                      <th className="px-4 py-2.5 text-left font-medium text-slate-600 hidden sm:table-cell">Perioadă</th>
                      <th className="px-4 py-2.5 text-center font-medium text-slate-600">Ședințe</th>
                      <th className="px-4 py-2.5" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[...cursant.abonamente]
                      .sort((a, b) => b.dataStart.toDate().getTime() - a.dataStart.toDate().getTime())
                      .map((ab, idx) => {
                        const realIdx = cursant.abonamente.indexOf(ab)
                        const facute = cursant.prezente.filter(
                          p => p.data?.toDate().getTime() >= ab.dataStart.toDate().getTime()
                        ).length
                        const over = facute > ab.sedinteTotal
                        return (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="px-4 py-2.5 font-medium text-slate-800">{ab.tip}</td>
                            <td className="px-4 py-2.5 text-slate-500 hidden sm:table-cell text-xs">
                              {ab.dataStart.toDate().toLocaleDateString('ro-RO')} →{' '}
                              {ab.dataExpirare.toDate().toLocaleDateString('ro-RO')}
                            </td>
                            <td className="px-4 py-2.5 text-center">
                              <span className={`font-semibold text-sm ${over ? 'text-red-500' : 'text-slate-800'}`}>
                                {facute} / {ab.sedinteTotal}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-right">
                              <Button
                                variant="ghost" size="icon"
                                onClick={() => setDeleteAbIdx(realIdx)}
                                className="h-7 w-7 text-slate-300 hover:text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Prezențe detaliat ──────────────────────────────── */}
      {cursant.prezente.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-semibold text-slate-900">Istoric prezențe</span>
            </div>
            <span className="text-xs text-slate-400">{cursant.prezente.length} total</span>
          </div>
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-2.5 text-left font-medium text-slate-600">Data</th>
                  <th className="px-5 py-2.5 text-left font-medium text-slate-600">Grupă</th>
                  <th className="px-5 py-2.5 text-left font-medium text-slate-600 hidden sm:table-cell">Profesor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[...cursant.prezente]
                  .sort((a, b) => b.data.toDate().getTime() - a.data.toDate().getTime())
                  .map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="px-5 py-2.5 text-slate-800 tabular-nums">
                        {p.data.toDate().toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-2.5 text-slate-600">{p.grupaTitlu}</td>
                      <td className="px-5 py-2.5 text-slate-400 hidden sm:table-cell">{p.profesor}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── Danger zone ────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-red-50 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <span className="text-sm font-semibold text-slate-900">Zonă periculoasă</span>
        </div>
        <div className="p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-700">Șterge cursant</p>
            <p className="text-xs text-slate-400 mt-0.5">Acțiunea este permanentă și nu poate fi anulată.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteCursant(true)}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 shrink-0"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Șterge cursant
          </Button>
        </div>
      </div>

      {/* Dialog confirmare ștergere abonament */}
      <AlertDialog open={deleteAbIdx !== null} onOpenChange={open => { if (!open) setDeleteAbIdx(null) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ștergi abonamentul?</AlertDialogTitle>
            <AlertDialogDescription>Acțiunea nu poate fi anulată.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anulează</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAbonament} className="bg-red-600 hover:bg-red-700">Șterge</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog confirmare ștergere cursant */}
      <AlertDialog open={showDeleteCursant} onOpenChange={open => { if (!open) setShowDeleteCursant(false) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ștergi cursantul {cursant?.nume}?</AlertDialogTitle>
            <AlertDialogDescription>
              Toate datele (prezențe, abonamente, grupe) vor fi șterse permanent. Această acțiune nu poate fi anulată.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anulează</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCursant}
              disabled={isDeletingCursant}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeletingCursant && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Șterge definitiv
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
