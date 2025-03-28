import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { kv } from "@vercel/kv"
import { v4 as uuidv4 } from "uuid"

/**
 * API pentru gestionarea grupelor în formare
 *
 * Acest API permite:
 * - Obținerea listei de grupe
 * - Adăugarea unei grupe noi
 *
 * Toate operațiunile necesită autentificare
 */

// Verifică dacă utilizatorul este autentificat
async function isAuthenticated() {
  const session = await getServerSession()
  return !!session?.user
}

// Handler pentru GET - obține lista de grupe
export async function GET() {
  try {
    // Verifică autentificarea
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, message: "Neautorizat" }, { status: 401 })
    }

    // Obține toate grupele din Vercel KV
    const grupeIds = await kv.smembers("grupe:ids")

    // Dacă nu există grupe, returnează o listă goală
    if (!grupeIds || grupeIds.length === 0) {
      return NextResponse.json({ success: true, grupe: [] })
    }

    // Obține detaliile pentru fiecare grupă
    const grupe = []
    for (const id of grupeIds) {
      const grupa = await kv.get(`grupe:${id}`)
      if (grupa) {
        grupe.push({ ...grupa, id })
      }
    }

    return NextResponse.json({ success: true, grupe })
  } catch (error) {
    console.error("Eroare la obținerea grupelor:", error)
    return NextResponse.json({ success: false, message: "Eroare la obținerea grupelor" }, { status: 500 })
  }
}

// Handler pentru POST - adaugă o grupă nouă
export async function POST(request: NextRequest) {
  try {
    // Verifică autentificarea
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, message: "Neautorizat" }, { status: 401 })
    }

    // Obține datele din request
    const data = await request.json()

    // Validează datele
    if (!data.titlu || !data.descriere || !data.dataStart || !data.program || !data.instructor) {
      return NextResponse.json({ success: false, message: "Lipsesc câmpuri obligatorii" }, { status: 400 })
    }

    // Generează un ID unic pentru grupă
    const id = uuidv4()

    // Salvează grupa în Vercel KV
    await kv.set(`grupe:${id}`, {
      titlu: data.titlu,
      descriere: data.descriere,
      dataStart: data.dataStart,
      program: data.program,
      instructor: data.instructor,
      locuriDisponibile: data.locuriDisponibile || 0,
      locuriTotale: data.locuriTotale || 0,
    })

    // Adaugă ID-ul grupei în setul de ID-uri
    await kv.sadd("grupe:ids", id)

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error("Eroare la adăugarea grupei:", error)
    return NextResponse.json({ success: false, message: "Eroare la adăugarea grupei" }, { status: 500 })
  }
}

