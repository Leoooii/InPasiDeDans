'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { db } from '@/lib/firebase'
import {
  collection, getDocs, query, where, doc, updateDoc,
  arrayUnion, arrayRemove, orderBy, addDoc, deleteDoc,
} from 'firebase/firestore'
import {
  Loader2, Users, Search, UserPlus, UserMinus, ArrowLeft,
  GraduationCap, UserCircle2, BookOpen, Plus, X,
} from 'lucide-react'
import Link from 'next/link'
import GrupaForm from '@/components/admin/grupa-form'
import GrupeList from '@/components/admin/grupe-list'
import type { Grupa } from '@/app/admin/page'

type CursantInGrupa = {
  id: string
  nume: string
  grupe: string[]
}

export default function GrupePage() {
  const [grupe, setGrupe] = useState<Grupa[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingGrupa, setEditingGrupa] = useState<Grupa | null>(null)

  // Cursanți management
  const [selectedGrupa, setSelectedGrupa] = useState<Grupa | null>(null)
  const [cursantiGrupa, setCursantiGrupa] = useState<CursantInGrupa[]>([])
  const [cursantiDisponibili, setCursantiDisponibili] = useState<CursantInGrupa[]>([])
  const [search, setSearch] = useState('')
  const [isLoadingCursanti, setIsLoadingCursanti] = useState(false)

  const { toast } = useToast()

  useEffect(() => { fetchGrupe() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchGrupe = async () => {
    try {
      const snapshot = await getDocs(query(collection(db, 'grupe'), orderBy('dataStart')))
      const data: Grupa[] = snapshot.docs.map(d => {
        const raw = d.data()
        return {
          id: d.id,
          titlu: raw.titlu || '',
          descriere: raw.descriere || '',
          dataStart: raw.dataStart || '',
          program: raw.program || '',
          instructor: raw.instructor || '',
          locuriDisponibile: raw.locuriDisponibile ?? 0,
          locuriTotale: raw.locuriTotale ?? 0,
          stiluri: raw.stiluri || (raw.stil ? [raw.stil] : []),
          zile: raw.zile || [],
          publica: raw.publica !== undefined ? raw.publica : true,
          nivel: raw.nivel,
          rol: raw.rol,
          sala: raw.sala,
        }
      })
      setGrupe(data)
    } catch {
      toast({ title: 'Eroare', description: 'Nu s-au putut încărca grupele.', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddGrupa = async (grupa: Grupa) => {
    try {
      const { id, ...grupaData } = grupa
      await addDoc(collection(db, 'grupe'), grupaData)
      toast({ title: 'Grupă adăugată.' })
      setShowForm(false)
      fetchGrupe()
    } catch {
      toast({ title: 'Eroare', description: 'Nu s-a putut adăuga grupa.', variant: 'destructive' })
    }
  }

  const handleUpdateGrupa = async (grupa: Grupa) => {
    if (!grupa.id) return
    try {
      const { id, ...grupaData } = grupa
      await updateDoc(doc(db, 'grupe', grupa.id), grupaData)
      toast({ title: 'Grupă actualizată.' })
      setEditingGrupa(null)
      fetchGrupe()
    } catch {
      toast({ title: 'Eroare', description: 'Nu s-a putut actualiza grupa.', variant: 'destructive' })
    }
  }

  const handleDeleteGrupa = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'grupe', id))
      toast({ title: 'Grupă ștearsă.' })
      fetchGrupe()
    } catch {
      toast({ title: 'Eroare', description: 'Nu s-a putut șterge grupa.', variant: 'destructive' })
    }
  }

  const handleEditGrupa = (grupa: Grupa) => {
    setEditingGrupa(grupa)
    setShowForm(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const fetchCursantiGrupa = async (grupa: Grupa) => {
    setIsLoadingCursanti(true)
    setSelectedGrupa(grupa)
    setSearch('')
    try {
      const inGrupa = await getDocs(
        query(collection(db, 'cursanti'), where('grupe', 'array-contains', grupa.id))
      )
      const insc: CursantInGrupa[] = inGrupa.docs.map(d => ({
        id: d.id,
        ...(d.data() as Omit<CursantInGrupa, 'id'>),
      }))
      setCursantiGrupa(insc)

      const toti = await getDocs(query(collection(db, 'cursanti'), orderBy('nume')))
      const inscIds = new Set(insc.map(c => c.id))
      const disponibili: CursantInGrupa[] = toti.docs
        .filter(d => !inscIds.has(d.id))
        .map(d => ({ id: d.id, ...(d.data() as Omit<CursantInGrupa, 'id'>) }))
      setCursantiDisponibili(disponibili)
    } catch {
      toast({ title: 'Eroare', description: 'Nu s-au putut încărca cursanții.', variant: 'destructive' })
    } finally {
      setIsLoadingCursanti(false)
    }
  }

  const handleAddToCursanti = async (cursantId: string) => {
    if (!selectedGrupa) return
    try {
      await updateDoc(doc(db, 'cursanti', cursantId), { grupe: arrayUnion(selectedGrupa.id) })
      toast({ title: 'Cursant adăugat în grupă.' })
      fetchCursantiGrupa(selectedGrupa)
    } catch {
      toast({ title: 'Eroare', description: 'Nu s-a putut adăuga cursantul.', variant: 'destructive' })
    }
  }

  const handleRemoveFromGrupa = async (cursantId: string) => {
    if (!selectedGrupa) return
    try {
      await updateDoc(doc(db, 'cursanti', cursantId), { grupe: arrayRemove(selectedGrupa.id) })
      toast({ title: 'Cursant eliminat din grupă.' })
      fetchCursantiGrupa(selectedGrupa)
    } catch {
      toast({ title: 'Eroare', description: 'Nu s-a putut elimina cursantul.', variant: 'destructive' })
    }
  }

  const filteredDisponibili = cursantiDisponibili.filter(c =>
    !search || c.nume.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto" />
          <p className="mt-3 text-sm text-slate-500">Se încarcă grupele...</p>
        </div>
      </div>
    )
  }

  /* ── Vista: gestionare cursanți ─────────────────────────────── */
  if (selectedGrupa) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => setSelectedGrupa(null)}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Înapoi la grupe
          </Button>
          <div className="w-px h-6 bg-slate-200 hidden sm:block" />
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-slate-900 leading-tight">{selectedGrupa.titlu}</h1>
            {selectedGrupa.instructor && (
              <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-500">
                <UserCircle2 className="h-3 w-3" />
                {selectedGrupa.instructor}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedGrupa.stiluri.map((s, i) => (
              <span key={i} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                {s}
              </span>
            ))}
          </div>
        </div>

        {isLoadingCursanti ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cursanți înscriși */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-900">Cursanți înscriși</span>
                {cursantiGrupa.length > 0 && (
                  <span className="ml-auto text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {cursantiGrupa.length}
                  </span>
                )}
              </div>
              <div className="p-4">
                {cursantiGrupa.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-8">Niciun cursant înscris încă.</p>
                ) : (
                  <div className="divide-y divide-slate-50">
                    {cursantiGrupa.map(c => (
                      <div key={c.id} className="flex items-center justify-between py-2.5">
                        <Link
                          href={`/admin/cursanti/${c.id}`}
                          className="text-sm font-medium text-slate-800 hover:text-indigo-600 transition-colors"
                        >
                          {c.nume}
                        </Link>
                        <button
                          onClick={() => handleRemoveFromGrupa(c.id)}
                          className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-colors"
                        >
                          <UserMinus className="h-3.5 w-3.5" />
                          Elimină
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Adaugă cursanți */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-900">Adaugă cursanți</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Caută după nume..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 text-sm h-9"
                  />
                </div>
                {filteredDisponibili.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-8">
                    {search ? 'Niciun rezultat.' : 'Toți cursanții sunt deja în grupă.'}
                  </p>
                ) : (
                  <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                    {filteredDisponibili.map(c => (
                      <div key={c.id} className="flex items-center justify-between py-2.5">
                        <span className="text-sm text-slate-700">{c.nume}</span>
                        <button
                          onClick={() => handleAddToCursanti(c.id)}
                          className="text-xs text-green-600 hover:text-green-800 hover:bg-green-50 px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-colors"
                        >
                          <UserPlus className="h-3.5 w-3.5" />
                          Adaugă
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  /* ── Vista: lista grupe ──────────────────────────────────────── */
  const isAddingNew = showForm && !editingGrupa

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Grupe</h1>
          <p className="text-sm text-slate-500 mt-0.5">{grupe.length} {grupe.length === 1 ? 'grupă' : 'grupe'}</p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            if (isAddingNew) {
              setShowForm(false)
            } else {
              setEditingGrupa(null)
              setShowForm(true)
            }
          }}
          className="bg-slate-900 hover:bg-slate-800 shrink-0"
        >
          {isAddingNew
            ? <><X className="h-4 w-4 mr-1.5" />Anulează</>
            : <><Plus className="h-4 w-4 mr-1.5" />Grupă nouă</>}
        </Button>
      </div>

      {/* Form: adaugă */}
      {showForm && !editingGrupa && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">Grupă nouă</span>
            <button
              onClick={() => setShowForm(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-5">
            <GrupaForm key="new" onSubmit={handleAddGrupa} />
          </div>
        </div>
      )}

      {/* Form: editează */}
      {editingGrupa && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">
              Editează — {editingGrupa.titlu}
            </span>
            <button
              onClick={() => setEditingGrupa(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-5">
            <GrupaForm
              key={editingGrupa.id}
              onSubmit={handleUpdateGrupa}
              initialData={editingGrupa}
              onCancel={() => setEditingGrupa(null)}
            />
          </div>
        </div>
      )}

      {/* Lista */}
      {grupe.length === 0 && !showForm && !editingGrupa ? (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-center py-16 text-slate-400">
          <div className="text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Nu există grupe încă.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5">
            <GrupeList
              grupe={grupe}
              onEdit={handleEditGrupa}
              onDelete={handleDeleteGrupa}
              onManageCursanti={fetchCursantiGrupa}
            />
          </div>
        </div>
      )}
    </div>
  )
}
