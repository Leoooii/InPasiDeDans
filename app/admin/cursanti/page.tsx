'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import CursantForm from '@/components/admin/cursant-form'
import { Input } from '@/components/ui/input'
import { Loader2, Plus, User, Pencil, X, Search } from 'lucide-react'

export interface Cursant {
  id: string
  nume: string
  createdAt: number
}

function initiale(nume: string) {
  const parts = nume.trim().split(' ').filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return nume.slice(0, 2).toUpperCase()
}

export default function CursantiPage() {
  const [cursanti, setCursanti] = useState<Cursant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedCursant, setSelectedCursant] = useState<Cursant | null>(null)
  const [search, setSearch] = useState('')
  const { toast } = useToast()

  const fetchCursanti = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/cursanti')
      if (!res.ok) throw new Error()
      setCursanti(await res.json())
    } catch {
      toast({ title: 'Eroare la încărcare', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchCursanti() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSuccess = () => {
    setShowForm(false)
    setSelectedCursant(null)
    fetchCursanti()
    toast({ title: 'Cursant salvat.' })
  }

  const handleCancel = () => {
    setShowForm(false)
    setSelectedCursant(null)
  }

  const handleEdit = (e: React.MouseEvent, c: Cursant) => {
    e.preventDefault()
    setSelectedCursant(c)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isAddingNew = showForm && !selectedCursant

  return (
    <div className="space-y-6">

      {/* ─── Header ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Cursanți</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {isLoading ? '...' : `${cursanti.length} ${cursanti.length === 1 ? 'cursant înregistrat' : 'cursanți înregistrați'}`}
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            if (isAddingNew) {
              setShowForm(false)
            } else {
              setSelectedCursant(null)
              setShowForm(true)
            }
          }}
          className="bg-slate-900 hover:bg-slate-800 shrink-0"
        >
          {isAddingNew
            ? <><X className="h-4 w-4 mr-1.5" />Anulează</>
            : <><Plus className="h-4 w-4 mr-1.5" />Cursant nou</>}
        </Button>
      </div>

      {/* ─── Inline form ────────────────────────────────────── */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">
              {selectedCursant ? `Editează — ${selectedCursant.nume}` : 'Cursant nou'}
            </span>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-5">
            <CursantForm
              cursant={selectedCursant}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      {/* ─── Search ─────────────────────────────────────────── */}
      {!isLoading && cursanti.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Caută după nume..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm bg-white border-slate-200"
          />
        </div>
      )}

      {/* ─── Grid ───────────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
        </div>
      ) : cursanti.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center py-20 text-slate-400">
          <User className="h-10 w-10 mb-3 opacity-30" />
          <p className="text-sm">Nu există cursanți înregistrați.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {[...cursanti]
            .filter(c => !search || c.nume.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => a.nume.localeCompare(b.nume, 'ro'))
            .map(c => (
              <Link
                key={c.id}
                href={`/admin/cursanti/${c.id}`}
                className="relative bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex flex-col items-center gap-3 hover:shadow-md hover:border-slate-200 transition-all group"
              >
                {/* Edit button — visible on hover */}
                <button
                  onClick={(e) => handleEdit(e, c)}
                  title="Editează"
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>

                {/* Avatar with initials */}
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                  <span className="text-lg font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
                    {initiale(c.nume)}
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-800 text-center leading-tight line-clamp-2 w-full">
                  {c.nume}
                </p>
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}
