"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageSkeleton from "@/components/image-skeleton"

export default function Galerie() {
  const [fbLoaded, setFbLoaded] = useState(false)

  useEffect(() => {
    // Load Facebook SDK
    const script = document.createElement("script")
    script.src = "https://connect.facebook.net/ro_RO/sdk.js#xfbml=1&version=v18.0"
    script.async = true
    script.defer = true
    script.crossOrigin = "anonymous"
    document.body.appendChild(script)

    // Parse Facebook elements when SDK is loaded
    script.onload = () => {
      if (window.FB) {
        window.FB.XFBML.parse()
        setFbLoaded(true)
      }
    }

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Galerie</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Imagini și videoclipuri din cursurile și evenimentele noastre
          </p>
        </div>

        <Tabs defaultValue="toate" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="toate">Toate</TabsTrigger>
            <TabsTrigger value="cursuri">Cursuri</TabsTrigger>
            <TabsTrigger value="evenimente">Evenimente</TabsTrigger>
            <TabsTrigger value="spectacole">Spectacole</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>

          <TabsContent value="toate" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <GalleryItem key={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cursuri" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <GalleryItem key={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="evenimente" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <GalleryItem key={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="spectacole" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <GalleryItem key={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="video" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-video w-full overflow-hidden bg-gray-100 rounded-lg">
                <div
                  className="fb-video"
                  data-href="https://www.facebook.com/scoaladedansinpasidedans/videos/1234567890"
                  data-width="500"
                  data-show-text="false"
                >
                  <div className="fb-xfbml-parse-ignore">
                    <ImageSkeleton width={700} height={400} className="w-full h-full" />
                  </div>
                </div>
              </div>

              <div className="aspect-video w-full overflow-hidden bg-gray-100 rounded-lg">
                <div
                  className="fb-video"
                  data-href="https://www.facebook.com/scoaladedansinpasidedans/videos/0987654321"
                  data-width="500"
                  data-show-text="false"
                >
                  <div className="fb-xfbml-parse-ignore">
                    <ImageSkeleton width={700} height={400} className="w-full h-full" />
                  </div>
                </div>
              </div>

              <div className="aspect-video w-full overflow-hidden bg-gray-100 rounded-lg">
                <div
                  className="fb-video"
                  data-href="https://www.facebook.com/scoaladedansinpasidedans/videos/1357924680"
                  data-width="500"
                  data-show-text="false"
                >
                  <div className="fb-xfbml-parse-ignore">
                    <ImageSkeleton width={700} height={400} className="w-full h-full" />
                  </div>
                </div>
              </div>

              <div className="aspect-video w-full overflow-hidden bg-gray-100 rounded-lg">
                <div
                  className="fb-video"
                  data-href="https://www.facebook.com/scoaladedansinpasidedans/videos/2468013579"
                  data-width="500"
                  data-show-text="false"
                >
                  <div className="fb-xfbml-parse-ignore">
                    <ImageSkeleton width={700} height={400} className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">
            Încarcă mai multe
          </Button>
        </div>

        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold dark:text-black">Urmărește-ne pe rețelele sociale</h2>
            <p className="dark:text-black">
              Pentru mai multe fotografii și videoclipuri din activitățile noastre, urmărește-ne pe Facebook și
              Instagram.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <Button
                variant="outline"
                className="bg-white dark:text-black"
                onClick={() => window.open("https://www.facebook.com/scoaladedansinpasidedans", "_blank")}
              >
                Facebook
              </Button>
              <Button variant="outline" className="bg-white dark:text-black">
                Instagram
              </Button>
              <Button variant="outline" className="bg-white dark:text-black">
                YouTube
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GalleryItem() {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="aspect-square w-full overflow-hidden">
        <ImageSkeleton width={600} height={600} className="w-full h-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-4 text-white">
          <h3 className="font-bold">Titlu imagine</h3>
          <p className="text-sm text-white/80">Descriere scurtă a imaginii</p>
        </div>
      </div>
    </div>
  )
}

