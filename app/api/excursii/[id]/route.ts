import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const excursieDoc = doc(db, "excursii", id)
    const excursieSnapshot = await getDoc(excursieDoc)

    if (!excursieSnapshot.exists()) {
      return NextResponse.json({ error: "Excursia nu a fost găsită" }, { status: 404 })
    }

    return NextResponse.json({
      id: excursieSnapshot.id,
      ...excursieSnapshot.data(),
    })
  } catch (error) {
    console.error("Eroare la obținerea excursiei:", error)
    return NextResponse.json({ error: "Eroare la obținerea excursiei" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()

    if (!data.title || !data.eventDate || !data.imageUrl) {
      return NextResponse.json({ error: "Titlul, data excursiei și URL-ul imaginii sunt obligatorii" }, { status: 400 })
    }

    const excursieDoc = doc(db, "excursii", id)
    const excursieSnapshot = await getDoc(excursieDoc)

    if (!excursieSnapshot.exists()) {
      return NextResponse.json({ error: "Excursia nu a fost găsită" }, { status: 404 })
    }

    const excursieData = { ...data, updatedAt: Date.now() }
    await updateDoc(excursieDoc, excursieData)

    return NextResponse.json({ id, ...excursieData })
  } catch (error) {
    console.error("Eroare la actualizarea excursiei:", error)
    return NextResponse.json({ error: "Eroare la actualizarea excursiei" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const excursieDoc = doc(db, "excursii", id)
    const excursieSnapshot = await getDoc(excursieDoc)

    if (!excursieSnapshot.exists()) {
      return NextResponse.json({ error: "Excursia nu a fost găsită" }, { status: 404 })
    }

    await deleteDoc(excursieDoc)
    return NextResponse.json({ message: "Excursia a fost ștearsă cu succes" }, { status: 200 })
  } catch (error) {
    console.error("Eroare la ștergerea excursiei:", error)
    return NextResponse.json({ error: "Eroare la ștergerea excursiei" }, { status: 500 })
  }
}
