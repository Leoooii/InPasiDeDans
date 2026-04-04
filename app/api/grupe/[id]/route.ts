import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { kv } from "@vercel/kv"

async function isAuthenticated() {
  const session = await getServerSession()
  return !!session?.user
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, message: "Neautorizat" }, { status: 401 })
    }

    const { id } = await params
    const exists = await kv.sismember("grupe:ids", id)
    if (!exists) {
      return NextResponse.json({ success: false, message: "Grupa nu a fost găsită" }, { status: 404 })
    }

    const data = await request.json()
    if (!data.titlu || !data.descriere || !data.dataStart || !data.program || !data.instructor) {
      return NextResponse.json({ success: false, message: "Lipsesc câmpuri obligatorii" }, { status: 400 })
    }

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

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, message: "Neautorizat" }, { status: 401 })
    }

    const { id } = await params
    const exists = await kv.sismember("grupe:ids", id)
    if (!exists) {
      return NextResponse.json({ success: false, message: "Grupa nu a fost găsită" }, { status: 404 })
    }

    await kv.del(`grupe:${id}`)
    await kv.srem("grupe:ids", id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Eroare la ștergerea grupei:", error)
    return NextResponse.json({ success: false, message: "Eroare la ștergerea grupei" }, { status: 500 })
  }
}
