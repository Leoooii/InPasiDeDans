"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  Users,
  Calendar,
  Clock,
} from "lucide-react"
import type { Grupa } from "@/app/admin/page"

interface GrupeListProps {
  grupe: Grupa[]
  onEdit: (grupa: Grupa) => void
  onDelete: (id: string) => void
  onManageCursanti?: (grupa: Grupa) => void
}

type SortField = "titlu" | "dataStart" | "locuriDisponibile" | "ocupare" | "publica"
type SortDir = "asc" | "desc"

export default function GrupeList({ grupe, onEdit, onDelete, onManageCursanti }: GrupeListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [grupaToDelete, setGrupaToDelete] = useState<string | null>(null)

  // Filters
  const [search, setSearch] = useState("")
  const [filterInstructor, setFilterInstructor] = useState("all")
  const [filterStil, setFilterStil] = useState("all")
  const [filterVizibilitate, setFilterVizibilitate] = useState("all")
  const [filterZi, setFilterZi] = useState("all")

  // Sort
  const [sortField, setSortField] = useState<SortField>("dataStart")
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  // Derive unique filter options from data
  const instructori = useMemo(
    () => [...new Set(grupe.map((g) => g.instructor))].sort(),
    [grupe]
  )
  const stiluri = useMemo(
    () => [...new Set(grupe.flatMap((g) => g.stiluri || []))].sort(),
    [grupe]
  )
  const zile = useMemo(
    () => [...new Set(grupe.flatMap((g) => g.zile || []))].sort(),
    [grupe]
  )

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
    return sortDir === "asc"
      ? <ArrowUp className="h-3.5 w-3.5 text-slate-700" />
      : <ArrowDown className="h-3.5 w-3.5 text-slate-700" />
  }

  const processed = useMemo(() => {
    let result = [...grupe]

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (g) =>
          g.titlu.toLowerCase().includes(q) ||
          g.instructor.toLowerCase().includes(q) ||
          g.descriere?.toLowerCase().includes(q)
      )
    }

    // Filter instructor
    if (filterInstructor !== "all")
      result = result.filter((g) => g.instructor === filterInstructor)

    // Filter stil
    if (filterStil !== "all")
      result = result.filter((g) => g.stiluri?.includes(filterStil))

    // Filter vizibilitate
    if (filterVizibilitate === "publica")
      result = result.filter((g) => g.publica !== false)
    else if (filterVizibilitate === "privata")
      result = result.filter((g) => g.publica === false)

    // Filter zi
    if (filterZi !== "all")
      result = result.filter((g) => g.zile?.includes(filterZi))

    // Sort
    result.sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case "titlu":
          cmp = a.titlu.localeCompare(b.titlu, "ro")
          break
        case "dataStart":
          cmp = new Date(a.dataStart).getTime() - new Date(b.dataStart).getTime()
          break
        case "locuriDisponibile":
          cmp = a.locuriDisponibile - b.locuriDisponibile
          break
        case "ocupare":
          const ocupA = a.locuriTotale > 0 ? (a.locuriTotale - a.locuriDisponibile) / a.locuriTotale : 0
          const ocupB = b.locuriTotale > 0 ? (b.locuriTotale - b.locuriDisponibile) / b.locuriTotale : 0
          cmp = ocupA - ocupB
          break
        case "publica":
          cmp = (a.publica !== false ? 1 : 0) - (b.publica !== false ? 1 : 0)
          break
      }
      return sortDir === "asc" ? cmp : -cmp
    })

    return result
  }, [grupe, search, filterInstructor, filterStil, filterVizibilitate, filterZi, sortField, sortDir])

  const activeFilters = [
    search && { label: `"${search}"`, clear: () => setSearch("") },
    filterInstructor !== "all" && { label: filterInstructor, clear: () => setFilterInstructor("all") },
    filterStil !== "all" && { label: filterStil, clear: () => setFilterStil("all") },
    filterVizibilitate !== "all" && { label: filterVizibilitate === "publica" ? "Publice" : "Private", clear: () => setFilterVizibilitate("all") },
    filterZi !== "all" && { label: filterZi, clear: () => setFilterZi("all") },
  ].filter(Boolean) as { label: string; clear: () => void }[]

  const clearAll = () => {
    setSearch("")
    setFilterInstructor("all")
    setFilterStil("all")
    setFilterVizibilitate("all")
    setFilterZi("all")
  }

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" })

  const ocuparePct = (g: Grupa) =>
    g.locuriTotale > 0 ? Math.round(((g.locuriTotale - g.locuriDisponibile) / g.locuriTotale) * 100) : 0

  return (
    <>
      {/* ── Bara de filtre ─────────────────────────────────────────────── */}
      <div className="space-y-3 mb-5">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Caută după titlu, instructor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-slate-200 h-9 text-sm"
            />
          </div>

          {/* Instructor */}
          <Select value={filterInstructor} onValueChange={setFilterInstructor}>
            <SelectTrigger className="w-full sm:w-44 h-9 text-sm bg-white border-slate-200">
              <SelectValue placeholder="Instructor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toți instructorii</SelectItem>
              {instructori.map((i) => (
                <SelectItem key={i} value={i}>{i}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Stil */}
          <Select value={filterStil} onValueChange={setFilterStil}>
            <SelectTrigger className="w-full sm:w-44 h-9 text-sm bg-white border-slate-200">
              <SelectValue placeholder="Stil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate stilurile</SelectItem>
              {stiluri.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Zi */}
          <Select value={filterZi} onValueChange={setFilterZi}>
            <SelectTrigger className="w-full sm:w-36 h-9 text-sm bg-white border-slate-200">
              <SelectValue placeholder="Zi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate zilele</SelectItem>
              {zile.map((z) => (
                <SelectItem key={z} value={z}>{z}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Vizibilitate */}
          <Select value={filterVizibilitate} onValueChange={setFilterVizibilitate}>
            <SelectTrigger className="w-full sm:w-36 h-9 text-sm bg-white border-slate-200">
              <SelectValue placeholder="Vizibilitate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate</SelectItem>
              <SelectItem value="publica">Publice</SelectItem>
              <SelectItem value="privata">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active filter chips + counter */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">
              {processed.length} din {grupe.length} grupe
            </span>
            {activeFilters.map((f, i) => (
              <button
                key={i}
                onClick={f.clear}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs transition-colors"
              >
                {f.label}
                <X className="h-3 w-3" />
              </button>
            ))}
            {activeFilters.length > 1 && (
              <button
                onClick={clearAll}
                className="text-xs text-red-500 hover:text-red-700 underline"
              >
                Șterge toate
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Tabel ─────────────────────────────────────────────────────────── */}
      {processed.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">Nicio grupă nu corespunde filtrelor aplicate.</p>
          <button onClick={clearAll} className="mt-2 text-xs text-red-500 hover:underline">
            Resetează filtrele
          </button>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {/* Titlu */}
                <th className="text-left px-4 py-3 font-medium text-slate-600">
                  <button
                    onClick={() => handleSort("titlu")}
                    className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                  >
                    Grupă <SortIcon field="titlu" />
                  </button>
                </th>
                {/* Data */}
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">
                  <button
                    onClick={() => handleSort("dataStart")}
                    className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                  >
                    Start <SortIcon field="dataStart" />
                  </button>
                </th>
                {/* Program */}
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">
                  Program
                </th>
                {/* Locuri */}
                <th className="text-left px-4 py-3 font-medium text-slate-600">
                  <button
                    onClick={() => handleSort("locuriDisponibile")}
                    className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                  >
                    Locuri <SortIcon field="locuriDisponibile" />
                  </button>
                </th>
                {/* Ocupare */}
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden sm:table-cell">
                  <button
                    onClick={() => handleSort("ocupare")}
                    className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                  >
                    Ocupare <SortIcon field="ocupare" />
                  </button>
                </th>
                {/* Vizibilitate */}
                <th className="text-left px-4 py-3 font-medium text-slate-600">
                  <button
                    onClick={() => handleSort("publica")}
                    className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                  >
                    Vizib. <SortIcon field="publica" />
                  </button>
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {processed.map((grupa) => {
                const pct = ocuparePct(grupa)
                const epuizat = grupa.locuriDisponibile === 0
                return (
                  <tr
                    key={grupa.id}
                    className="bg-white hover:bg-slate-50 transition-colors group"
                  >
                    {/* Grupă: titlu + stiluri + nivel + sala + instructor */}
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900 leading-snug">{grupa.titlu}</p>
                      <div className="flex flex-wrap items-center gap-1 mt-1">
                        {(grupa.stiluri || []).map((s) => (
                          <span
                            key={s}
                            className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-50 text-blue-700 rounded"
                          >
                            {s}
                          </span>
                        ))}
                        {grupa.nivel && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-violet-50 text-violet-700 rounded">
                            {grupa.nivel}
                          </span>
                        )}
                        {grupa.sala && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">
                            {grupa.sala}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <Users className="h-3 w-3" /> {grupa.instructor}
                      </p>
                    </td>

                    {/* Data start */}
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap hidden md:table-cell">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {formatDate(grupa.dataStart)}
                      </span>
                    </td>

                    {/* Program (zile + ora) */}
                    <td className="px-4 py-3 text-slate-500 text-xs hidden lg:table-cell">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                        {grupa.program}
                      </span>
                    </td>

                    {/* Locuri */}
                    <td className="px-4 py-3">
                      <span
                        className={`font-semibold ${
                          epuizat ? "text-red-600" : "text-emerald-600"
                        }`}
                      >
                        {grupa.locuriDisponibile}
                      </span>
                      <span className="text-slate-400 text-xs"> / {grupa.locuriTotale}</span>
                      {epuizat && (
                        <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-medium bg-red-50 text-red-600 rounded">
                          epuizat
                        </span>
                      )}
                    </td>

                    {/* Ocupare bar */}
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              pct >= 90 ? "bg-red-500" : pct >= 60 ? "bg-orange-400" : "bg-emerald-500"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 w-8">{pct}%</span>
                      </div>
                    </td>

                    {/* Vizibilitate */}
                    <td className="px-4 py-3">
                      {grupa.publica !== false ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 font-normal text-xs">
                          <Eye className="h-3 w-3" /> Publică
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200 gap-1 font-normal text-xs">
                          <EyeOff className="h-3 w-3" /> Privată
                        </Badge>
                      )}
                    </td>

                    {/* Acțiuni */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onManageCursanti && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                            onClick={() => onManageCursanti(grupa)}
                            title="Gestionează cursanți"
                          >
                            <Users className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                          onClick={() => onEdit(grupa)}
                          title="Editează"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => { setGrupaToDelete(grupa.id!); setDeleteDialogOpen(true) }}
                          title="Șterge"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ștergi această grupă?</AlertDialogTitle>
            <AlertDialogDescription>
              Acțiunea este ireversibilă. Toți cursanții asociați vor pierde accesul la grupă.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anulează</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (grupaToDelete) {
                  onDelete(grupaToDelete)
                  setDeleteDialogOpen(false)
                  setGrupaToDelete(null)
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Șterge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
