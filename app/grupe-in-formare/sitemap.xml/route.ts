import { collection, getDocs, query, where } from "firebase/firestore"

import { db } from "@/lib/firebase"
import { buildGrupaSlug } from "@/lib/utils"

export async function GET() {
  try {
    const grupeQuery = query(collection(db, "grupe"), where("publica", "==", true))
    const snapshot = await getDocs(grupeQuery)

    const baseUrl = "https://www.inpasidedans.ro"
    const urls = snapshot.docs
      .map((docSnap) => {
        const data = docSnap.data() as {
          titlu?: string
          dataStart?: string
        }
        const slug = buildGrupaSlug(data.titlu || "grupa-dans", docSnap.id)

        return `
  <url>
    <loc>${baseUrl}/grupe-in-formare/${slug}</loc>
    <lastmod>${data.dataStart || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
      })
      .join("")

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
      },
    })
  } catch (error) {
    console.error("Error generating grupe sitemap:", error)
    return new Response("Error generating sitemap", { status: 500 })
  }
}

