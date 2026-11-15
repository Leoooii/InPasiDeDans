'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, doc, updateDoc, orderBy, addDoc, deleteDoc, writeBatch } from 'firebase/firestore'
import { BookOpen, Plus, RefreshCw } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Incarcare } from '@/components/evidenta/ui'
import GrupaForm from '@/components/admin/grupa-form'
import GrupeList from '@/components/admin/grupe-list'
import type { Grupa } from '@/lib/types'
import { reimprospateazaSite } from '@/lib/reimprospatare-site'
import { incarcaAbonamente, incarcaCursanti } from '@/lib/evidenta/repo'
import { libereDinEvidenta, ocupatePeGrupe } from '@/lib/evidenta/locuri'

type ModificareLocuri = { id: string; titlu: string; inainte: number; dupa: number }

export default function GrupePage() {
  const [grupe, setGrupe] = useState<Grupa[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingGrupa, setEditingGrupa] = useState<Grupa | null>(null)

  // Locuri ocupate după evidență (cursanți activi cu abonament în curs), încărcate o singură dată.
  const [ocupate, setOcupate] = useState<Record<string, number> | null>(null)
  const [eroareEvidenta, setEroareEvidenta] = useState(false)
  const [confirmaToate, setConfirmaToate] = useState(false)
  const [seSalveazaLocuri, setSeSalveazaLocuri] = useState(false)

  const { toast } = useToast()

  useEffect(() => { fetchGrupe() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    Promise.all([incarcaCursanti(), incarcaAbonamente()])
      .then(([cursanti, abonamente]) => setOcupate(ocupatePeGrupe(cursanti, abonamente)))
      .catch(() => setEroareEvidenta(true))
  }, [])

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

  /** Grupele la care locurile libere din evidență diferă de cele de pe site. */
  const modificariLocuri: ModificareLocuri[] = ocupate
    ? grupe.flatMap(g => {
        const libere = g.id ? libereDinEvidenta(g.locuriTotale, ocupate[g.id] ?? 0) : null
        return g.id && libere !== null && libere !== g.locuriDisponibile
          ? [{ id: g.id, titlu: g.titlu, inainte: g.locuriDisponibile, dupa: libere }]
          : []
      })
    : []

  const salveazaLocuri = async (modificari: { id: string; dupa: number }[]) => {
    if (!modificari.length) return
    setSeSalveazaLocuri(true)
    try {
      const batch = writeBatch(db)
      modificari.forEach(m => batch.update(doc(db, 'grupe', m.id), { locuriDisponibile: m.dupa }))
      await batch.commit()
      await reimprospateazaSite('grupe')
      setGrupe(prev =>
        prev.map(g => {
          const m = modificari.find(x => x.id === g.id)
          return m ? { ...g, locuriDisponibile: m.dupa } : g
        }),
      )
      toast({ title: modificari.length === 1 ? 'Locuri libere actualizate.' : `Locuri libere actualizate la ${modificari.length} grupe.` })
      setConfirmaToate(false)
    } catch {
      toast({ title: 'Eroare', description: 'Locurile libere nu au putut fi salvate.', variant: 'destructive' })
    } finally {
      setSeSalveazaLocuri(false)
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
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <p className="max-w-2xl text-xs text-slate-500">
              {eroareEvidenta
                ? 'Nu s-au putut citi cursanții din evidență, deci locurile libere nu pot fi calculate.'
                : ocupate === null
                  ? 'Se calculează locurile ocupate din evidență...'
                  : 'Locurile ocupate se calculează din evidență (cursanți activi cu abonament în curs) și sunt corecte doar dacă toți cursanții sunt trecuți acolo. Nimic nu se schimbă pe site fără să apeși.'}
            </p>
            {ocupate && (
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                disabled={modificariLocuri.length === 0 || seSalveazaLocuri}
                onClick={() => setConfirmaToate(true)}
              >
                <RefreshCw className="mr-1.5 h-4 w-4" />
                {modificariLocuri.length === 0 ? 'Locurile sunt la zi' : `Actualizează toate din evidență (${modificariLocuri.length})`}
              </Button>
            )}
          </div>
          <GrupeList
            grupe={grupe}
            onEdit={handleEditGrupa}
            onDelete={handleDeleteGrupa}
            ocupateEvidenta={ocupate}
            seSalveazaLocuri={seSalveazaLocuri}
            onActualizeazaLocuri={(id, libere) => salveazaLocuri([{ id, dupa: libere }])}
          />
        </>
      )}

      <Dialog open={confirmaToate} onOpenChange={o => !o && !seSalveazaLocuri && setConfirmaToate(false)}>
        <DialogContent className="w-[calc(100vw-1.5rem)] rounded-2xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Actualizezi locurile libere?</DialogTitle>
            <DialogDescription>
              Se schimbă pe site locurile libere la {modificariLocuri.length === 1 ? 'o grupă' : `${modificariLocuri.length} grupe`}, după evidență.
            </DialogDescription>
          </DialogHeader>
          <ul className="max-h-[50svh] divide-y divide-slate-100 overflow-y-auto rounded-xl border border-slate-200 text-sm">
            {modificariLocuri.map(m => (
              <li key={m.id} className="flex items-center justify-between gap-3 px-3 py-2">
                <span className="min-w-0 truncate text-slate-800">{m.titlu}</span>
                <span className="shrink-0 whitespace-nowrap text-slate-500">
                  {m.inainte} → <span className="font-semibold text-slate-900">{m.dupa}</span> libere
                </span>
              </li>
            ))}
          </ul>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConfirmaToate(false)} disabled={seSalveazaLocuri}>
              Renunță
            </Button>
            <Button variant="brand" onClick={() => salveazaLocuri(modificariLocuri)} disabled={seSalveazaLocuri}>
              {seSalveazaLocuri ? 'Se salvează...' : 'Actualizează'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
