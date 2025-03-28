import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { kv } from "@vercel/kv"

/**
 * API pentru gestionarea unei grupe specifice
 *
 * Acest API permite:
 * - Actualizarea unei grupe existente
 * - Ștergerea unei grupe
 *
 * Toate operațiunile necesită autentificare
 */

// Verifică dacă utilizatorul este autentificat
async function isAuthenticated() {
  const session = await getServerSession()
  return !!session?.user
}

// Handler pentru PUT - actualizează o grupă existentă
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verifică autentificarea
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, message: "Neautorizat" }, { status: 401 })
    }

    const id = params.id

    // Verifică dacă grupa există
    const exists = await kv.sismember("grupe:ids", id)
    if (!exists) {
      return NextResponse.json({ success: false, message: "Grupa nu a fost găsită" }, { status: 404 })
    }

    // Obține datele din request
    const data = await request.json()

    // Validează datele
    if (!data.titlu || !data.descriere || !data.dataStart || !data.program || !data.instructor) {
      return NextResponse.json({ success: false, message: "Lipsesc câmpuri obligatorii" }, { status: 400 })
    }

    // Actualizează grupa în Vercel KV
    await kv.set(`grupe:${id}`, {
      titlu: data.titlu,
      descriere: data.descriere,
      dataStart: data.dataStart,
      program: data.program,
      instructor: data.instructor,
      locuriDisponibile: data.locuriDisponibile || 0,
      locuriTotale: data.locuriTotale || 0,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Eroare la actualizarea grupei:", error)
    return NextResponse.json({ success: false, message: "Eroare la actualizarea grupei" }, { status: 500 })
  }
}

// Handler pentru DELETE - șterge o grupă
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verifică autentificarea
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, message: "Neautorizat" }, { status: 401 })
    }

    const id = params.id

    // Verifică dacă grupa există
    const exists = await kv.sismember("grupe:ids", id)
    if (!exists) {
      return NextResponse.json({ success: false, message: "Grupa nu a fost găsită" }, { status: 404 })
    }

    // Șterge grupa din Vercel KV
    await kv.del(`grupe:${id}`)
    await kv.srem("grupe:ids", id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Eroare la ștergerea grupei:", error)
    return NextResponse.json({ success: false, message: "Eroare la ștergerea grupei" }, { status: 500 })
  }
}

