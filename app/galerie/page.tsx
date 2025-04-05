"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageSkeleton from "@/components/image-skeleton"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import type { ImagineData } from "@/components/admin/imagine-form"

export default function Galerie() {
  const [imagini, setImagini] = useState<ImagineData[]>([])
  const [filteredImagini, setFilteredImagini] = useState<ImagineData[]>([])
  const [activeTab, setActiveTab] = useState("toate")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Încarcă imaginile din Firestore
    const fetchImagini = async () => {
      try {
        const imaginiQuery = query(collection(db, "imagini"), orderBy("dataAdaugare", "desc"))
        const querySnapshot = await getDocs(imaginiQuery)

        const imaginiData: ImagineData[] = []
        querySnapshot.forEach((doc) => {
          imaginiData.push({ id: doc.id, ...doc.data() } as ImagineData)
        })

        setImagini(imaginiData)
        setFilteredImagini(imaginiData)
        setIsLoading(false)
      } catch (error) {
        console.error("Eroare la încărcarea imaginilor:", error)
        setIsLoading(false)
      }
    }

    fetchImagini()
  }, [])

  // Filtrează imaginile în funcție de tab-ul activ
  useEffect(() => {
    if (activeTab === "toate") {
      setFilteredImagini(imagini)
    } else {
      setFilteredImagini(imagini.filter((imagine) => imagine.categorie === activeTab))
    }
  }, [activeTab, imagini])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Galerie</h1>
          <p className="text-gray-500 dark:text-gray-400">Imagini din cursurile și evenimentele noastre</p>
        </div>

        <Tabs defaultValue="toate" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="toate">Toate</TabsTrigger>
            <TabsTrigger value="cursuri">Cursuri</TabsTrigger>
            <TabsTrigger value="evenimente">Evenimente</TabsTrigger>
            <TabsTrigger value="spectacole">Spectacole</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <ImageSkeleton width={600} height={600} className="w-full h-full" />
                  </div>
                ))}
              </div>
            ) : filteredImagini.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImagini.map((imagine) => (
                  <GalleryItem key={imagine.id} imagine={imagine} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Nu există imagini în această categorie</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {filteredImagini.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg">
              Încarcă mai multe
            </Button>
          </div>
        )}

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold">Urmărește-ne pe rețelele sociale</h2>
            <p>
              Pentru mai multe fotografii și videoclipuri din activitățile noastre, urmărește-ne pe Facebook și
              Instagram.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <Button
                variant="outline"
                className="bg-white"
                onClick={() => window.open("https://www.facebook.com/scoaladedansinpasidedans", "_blank")}
              >
                Facebook
              </Button>
              <Button variant="outline" className="bg-white">
                Instagram
              </Button>
              <Button variant="outline" className="bg-white">
                YouTube
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type GalleryItemProps = {
  imagine: ImagineData
}

function GalleryItem({ imagine }: GalleryItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="group relative overflow-hidden rounded-lg cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={imagine.url || "/placeholder.svg"}
            alt={imagine.titlu}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <h3 className="font-bold">{imagine.titlu}</h3>
            <p className="text-sm text-white/80">{imagine.descriere}</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="max-w-4xl max-h-[90vh] overflow-hidden bg-white dark:bg-gray-900 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={imagine.url || "/placeholder.svg"} alt={imagine.titlu} className="max-h-[80vh] w-auto mx-auto" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{imagine.titlu}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{imagine.descriere}</p>
            </div>
          </div>
          <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setIsModalOpen(false)}>
            ✕
          </button>
        </div>
      )}
    </>
  )
}

