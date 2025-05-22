"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import GrupeInFormare from "@/components/grupe-in-formare"

// Definim interfața pentru instructor
interface Instructor {
  id: string
  name: string
  role: string
  bio: string
  imageUrl: string
  facebookUrl?: string
  instagramUrl?: string
  youtubeUrl?: string
  order?: number
}

export default function Instructori() {
  const [instructori, setInstructori] = useState<Instructor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Încărcăm instructorii din Firebase
  useEffect(() => {
    const fetchInstructori = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/instructori")
        if (!response.ok) {
          throw new Error("Nu s-au putut încărca instructorii")
        }
        const data = await response.json()

        // Sortăm instructorii după ordinea de afișare
        const sortedInstructori = [...data].sort((a, b) => {
          const orderA = a.order || 0
          const orderB = b.order || 0
          return orderA - orderB
        })

        setInstructori(sortedInstructori)
      } catch (error) {
        console.error("Eroare:", error)
        setError("Nu s-au putut încărca instructorii. Încercați să reîmprospătați pagina.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInstructori()
  }, [])

  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Instructori</h1>
          <p className="text-gray-500 dark:text-gray-400">Cunoaște echipa noastră de instructori profesioniști</p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Echipa noastră de profesioniști</h2>
            <div>
              <p>
                Instructorii noștri sunt dansatori profesioniști cu experiență vastă atât în competiții naționale și
                internaționale, cât și în predarea dansului pentru toate nivelurile și vârstele.
              </p>
              <p>
                Pasionați și dedicați, ei sunt mereu pregătiți să împărtășească cunoștințele și dragostea lor pentru
                dans cu toți elevii. Fiecare instructor are propriul stil de predare, adaptat nevoilor și nivelului
                cursanților.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-8">Instructorii noștri</h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-red-600" />
              <span className="ml-2 text-gray-500">Se încarcă instructorii...</span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-8 border border-red-200 rounded-lg">{error}</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {instructori.map((instructor) => (
                <InstructorCard
                  key={instructor.id}
                  name={instructor.name}
                  role={instructor.role}
                  bio={instructor.bio}
                  src={instructor.imageUrl}
                  facebook={instructor.facebookUrl}
                  insta={instructor.instagramUrl}
                  youtube={instructor.youtubeUrl}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Specializări</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Formare continuă</h3>
              <p className="text-gray-500 text-sm">
                Echipa noastră participă regulat la workshop-uri și seminarii nationale și internaționale, pentru a fi
                la curent cu cele mai noi tendințe și tehnici.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Experiență competițională</h3>
              <p className="text-gray-500 text-sm">
                Majoritatea instructorilor noștri au participat la competiții naționale și internaționale, unii fiind
                campioni naționali sau finaliști internaționali.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Pedagogie adaptată</h3>
              <p className="text-gray-500 text-sm">
                Instructorii sunt pregătiți să adapteze metodele de predare în funcție de vârsta, nivelul și obiectivele
                cursanților.
              </p>
            </div>
          </div>
        </div>
      </div>
      <GrupeInFormare />
    </div>
  )
}

function InstructorCard({
  name,
  role,
  bio,
  src,
  insta,
  facebook,
  youtube,
}: {
  name: string
  role: string
  bio: string
  src: string
  insta?: string
  facebook?: string
  youtube?: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-[32rem] w-full overflow-hidden">
        <Image src={src || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-red-600 mb-4">{role}</p>
        <p className="text-gray-500 text-sm mb-4">{bio}</p>
        <div className="flex space-x-3">
          {facebook && (
            <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
              <Facebook size={18} />
              <span className="sr-only">Facebook</span>
            </a>
          )}
          {insta && (
            <a href={insta} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600">
              <Instagram size={18} />
              <span className="sr-only">Instagram</span>
            </a>
          )}
          {youtube && (
            <a href={youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600">
              <Youtube size={18} />
              <span className="sr-only">YouTube</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
