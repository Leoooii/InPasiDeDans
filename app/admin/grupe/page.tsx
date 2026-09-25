'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, doc, updateDoc, orderBy, addDoc, deleteDoc } from 'firebase/firestore'
import { BookOpen, Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Incarcare } from '@/components/evidenta/ui'
import GrupaForm from '@/components/admin/grupa-form'
import GrupeList from '@/components/admin/grupe-list'
import type { Grupa } from '@/lib/types'
import { reimprospateazaSite } from '@/lib/reimprospatare-site'

export default function GrupePage() {
  const [grupe, setGrupe] = useState<Grupa[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingGrupa, setEditingGrupa] = useState<Grupa | null>(null)

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
      await reimprospateazaSite('grupe')
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
      await reimprospateazaSite('grupe')
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
      await reimprospateazaSite('grupe')
      toast({ title: 'Grupă ștearsă.' })
      fetchGrupe()
    } catch {
      toast({ title: 'Eroare', description: 'Nu s-a putut șterge grupa.', variant: 'destructive' })
    }
  }

  const handleEditGrupa = (grupa: Grupa) => {
    setEditingGrupa(grupa)
    setShowForm(false)
  }

  if (isLoading) return <Incarcare text="Se încarcă grupele..." />

  const formDeschis = showForm || !!editingGrupa
  const inchideForm = () => {
    setShowForm(false)
    setEditingGrupa(null)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Grupe</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Grupele școlii, așa cum apar pe site (program, grupe în formare). Evidența și prezența folosesc aceleași grupe.
          </p>
        </div>
        <Button
          variant="brand"
          className="h-11"
          onClick={() => {
            setEditingGrupa(null)
            setShowForm(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Grupă nouă
        </Button>
      </div>

      {grupe.length === 0 ? (
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-slate-400">
          <div className="text-center">
            <BookOpen className="mx-auto mb-2 h-8 w-8 opacity-30" />
            <p className="text-sm">Nu există grupe încă.</p>
          </div>
        </div>
      ) : (
        <GrupeList grupe={grupe} onEdit={handleEditGrupa} onDelete={handleDeleteGrupa} />
      )}

      <Dialog open={formDeschis} onOpenChange={o => !o && inchideForm()}>
        <DialogContent className="max-h-[92svh] w-[calc(100vw-1.5rem)] overflow-y-auto overflow-x-hidden rounded-2xl [&>*]:min-w-0 sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingGrupa ? `Editează: ${editingGrupa.titlu}` : 'Grupă nouă'}</DialogTitle>
            <DialogDescription>Modificările apar pe site imediat după salvare.</DialogDescription>
          </DialogHeader>
          {editingGrupa ? (
            <GrupaForm key={editingGrupa.id} onSubmit={handleUpdateGrupa} initialData={editingGrupa} onCancel={inchideForm} />
          ) : (
            <GrupaForm key="new" onSubmit={handleAddGrupa} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
