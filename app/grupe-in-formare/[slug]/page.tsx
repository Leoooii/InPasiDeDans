import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import { cache } from "react"
import { Calendar, Clock, Users } from "lucide-react"
import { doc, getDoc } from "firebase/firestore"

import { db } from "@/lib/firebase"
import { buildGrupaSlug, extractGrupaIdFromSlug } from "@/lib/utils"
import SEOBreadcrumbs from "@/components/seo-breadcrumbs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type PublicGrupa = {
  id: string
  titlu: string
  descriere: string
  dataStart: string
  program: string
  instructor: string
  locuriDisponibile: number
  locuriTotale: number
  stiluri: string[]
  zile: string[]
  publica?: boolean
}

const getGrupa = cache(async (slug: string): Promise<PublicGrupa | null> => {
  const grupaId = extractGrupaIdFromSlug(slug)
  if (!grupaId) return null

  const grupaRef = doc(db, "grupe", grupaId)
  const grupaSnapshot = await getDoc(grupaRef)

  if (!grupaSnapshot.exists()) {
    return null
  }

  const data = grupaSnapshot.data() as Partial<PublicGrupa>

  if (data.publica === false) {
    return null
  }

  const stiluri =
    Array.isArray(data.stiluri) && data.stiluri.length > 0
      ? data.stiluri
      : data && typeof (data as Record<string, unknown>).stil === "string"
        ? [(data as { stil?: string }).stil as string]
        : []

  const zile = Array.isArray(data.zile) ? data.zile : []

  return {
    id: grupaSnapshot.id,
    titlu: data.titlu || "Grupă de dans",
    descriere: data.descriere || "Descoperă această grupă în formare la In Pasi de Dans.",
    dataStart: data.dataStart || "",
    program: data.program || "",
    instructor: data.instructor || "Instructorii In Pasi de Dans",
    locuriDisponibile: Number(data.locuriDisponibile ?? 0),
    locuriTotale: Number(data.locuriTotale ?? 0),
    stiluri,
    zile,
  }
})

const formatDate = (value: string) => {
  if (!value) return "Anunțăm în curând"
  try {
    return new Date(value).toLocaleDateString("ro-RO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch {
    return value
  }
}

const truncate = (text: string, limit = 155) => {
  if (!text) return text
  if (text.length <= limit) return text
  return `${text.slice(0, limit - 3)}...`
}

const buildPageUrl = (slug: string) => `https://www.inpasidedans.ro/grupe-in-formare/${slug}`

export const revalidate = 1800

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const grupa = await getGrupa(params.slug)

  if (!grupa) {
    return {
      title: "Grupa nu a fost găsită | In Pasi de Dans",
      description: "Ne pare rău, grupa solicitată nu mai este disponibilă.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const canonicalSlug = buildGrupaSlug(grupa.titlu, grupa.id)
  const pageUrl = buildPageUrl(canonicalSlug)
  const description = truncate(grupa.descriere, 160)

  return {
    title: `${grupa.titlu} | Grupe în Formare | In Pasi de Dans`,
    description,
    keywords: [
      grupa.titlu,
      "grupă dans în formare",
      "începători dans București",
      "cursuri dans",
      "In Pasi de Dans",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "article",
      title: `${grupa.titlu} | In Pasi de Dans`,
      description,
      url: pageUrl,
      siteName: "In Pasi de Dans",
      locale: "ro_RO",
      images: [
        {
          url: "https://www.inpasidedans.ro/images/logo.png",
          width: 1200,
          height: 630,
          alt: grupa.titlu,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${grupa.titlu} | In Pasi de Dans`,
      description,
      images: ["https://www.inpasidedans.ro/images/logo.png"],
    },
  }
}

export default async function GrupaInFormareDetails({ params }: { params: { slug: string } }) {
  const grupa = await getGrupa(params.slug)

  if (!grupa) {
    notFound()
  }

  const canonicalSlug = buildGrupaSlug(grupa.titlu, grupa.id)
  const pageUrl = buildPageUrl(canonicalSlug)

  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Grupe în formare", url: "/grupe-in-formare" },
    { name: grupa.titlu },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: grupa.titlu,
    description: grupa.descriere,
    startDate: grupa.dataStart,
    endDate: grupa.dataStart,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Școala In Pasi de Dans",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calea Rahovei 262",
        addressLocality: "București",
        postalCode: "050897",
        addressCountry: "RO",
      },
    },
    organizer: {
      "@type": "DanceGroup",
      name: "In Pasi de Dans",
      url: "https://www.inpasidedans.ro",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.inpasidedans.ro/inscriere?grupa=${grupa.id}`,
      availability:
        grupa.locuriDisponibile > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      price: "0",
      priceCurrency: "RON",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl={pageUrl} className="text-white/90" />

        <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
          <section className="space-y-6 rounded-3xl bg-white/5 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur">
            <div className="space-y-4">
              <p className="inline-flex rounded-full bg-orange-500/15 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-orange-200">
                Grupă în formare
              </p>
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                {grupa.titlu}
              </h1>
              <p className="text-lg text-white/80">{grupa.descriere}</p>
            </div>

            {grupa.stiluri.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {grupa.stiluri.map((stil) => (
                  <Badge
                    key={stil}
                    variant="secondary"
                    className="bg-white/15 text-white backdrop-blur-md"
                  >
                    {stil}
                  </Badge>
                ))}
              </div>
            )}

            <div className="grid gap-6 rounded-2xl bg-black/30 p-6 sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <Calendar className="text-orange-300" />
                <p className="text-sm uppercase text-white/60">Data de start</p>
                <p className="text-lg font-semibold text-white">{formatDate(grupa.dataStart)}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Clock className="text-orange-300" />
                <p className="text-sm uppercase text-white/60">Program</p>
                <p className="text-lg font-semibold text-white">
                  {grupa.program || "Program afișat după confirmare"}
                </p>
                {grupa.zile.length > 0 && (
                  <p className="text-sm text-white/70">Zile: {grupa.zile.join(", ")}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Users className="text-orange-300" />
                <p className="text-sm uppercase text-white/60">Locuri disponibile</p>
                <p className="text-lg font-semibold text-white">
                  {grupa.locuriDisponibile > 0
                    ? `${grupa.locuriDisponibile} / ${grupa.locuriTotale}`
                    : "Lista de așteptare"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 p-6">
              <h2 className="text-2xl font-semibold text-white">Ce primești în această grupă</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-white/80">
                <li>Coordonare dedicată de la {grupa.instructor}</li>
                <li>Atmosferă prietenoasă pentru începători și intermediari</li>
                <li>Structură clară a cursurilor și feedback personalizat</li>
              </ul>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href={`/inscriere?grupa=${grupa.id}`} className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-orange-500 text-white hover:bg-orange-400">
                  Înscrie-te acum
                </Button>
              </Link>
              {/* <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10"
                >
                  Pune o întrebare
                </Button>
              </Link> */}
            </div>
          </section>

          <aside className="space-y-6 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
            <div>
              <p className="text-sm uppercase text-white/60">Instructori</p>
              <p className="text-xl font-semibold text-white">{grupa.instructor}</p>
            </div>
            <div className="space-y-2 text-white/80">
              <p>
                Ne întâlnim la studioul In Pasi de Dans din Calea Rahovei 262 –
                o sală luminoasă și primitoare, pregătită pentru energia fiecărei grupe noi.
              </p>
             
            </div>
            <div className="rounded-2xl bg-black/30 p-5">
              <p className="text-sm uppercase text-white/60">Întrebări rapide?</p>
              <p className="text-2xl font-bold text-white">0722.675.126</p>
              <p className="text-white/70">Sună-ne sau scrie-ne pe WhatsApp pentru detalii.</p>
            </div>
          </aside>
        </div>
      </div>

      <Script
        id={`grupa-ldjson-${grupa.id}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}

