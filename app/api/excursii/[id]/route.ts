import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"

// GET /api/excursii/[id] - Obține o excursie specifică
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
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

// PUT /api/excursii/[id] - Actualizează o excursie
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    // Validăm datele primite
    if (!data.title || !data.eventDate || !data.imageUrl) {
      return NextResponse.json({ error: "Titlul, data excursiei și URL-ul imaginii sunt obligatorii" }, { status: 400 })
    }

    // Verificăm dacă excursia există
    const excursieDoc = doc(db, "excursii", id)
    const excursieSnapshot = await getDoc(excursieDoc)

    if (!excursieSnapshot.exists()) {
      return NextResponse.json({ error: "Excursia nu a fost găsită" }, { status: 404 })
    }

    // Actualizăm excursia
    const excursieData = {
      ...data,
      updatedAt: Date.now(),
    }

    await updateDoc(excursieDoc, excursieData)

    return NextResponse.json({
      id,
      ...excursieData,
    })
  } catch (error) {
    console.error("Eroare la actualizarea excursiei:", error)
    return NextResponse.json({ error: "Eroare la actualizarea excursiei" }, { status: 500 })
  }
}

// DELETE /api/excursii/[id] - Șterge o excursie
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Verificăm dacă excursia există
    const excursieDoc = doc(db, "excursii", id)
    const excursieSnapshot = await getDoc(excursieDoc)

    if (!excursieSnapshot.exists()) {
      return NextResponse.json({ error: "Excursia nu a fost găsită" }, { status: 404 })
    }

    // Ștergem excursia
    await deleteDoc(excursieDoc)

    return NextResponse.json({ message: "Excursia a fost ștearsă cu succes" }, { status: 200 })
  } catch (error) {
    console.error("Eroare la ștergerea excursiei:", error)
    return NextResponse.json({ error: "Eroare la ștergerea excursiei" }, { status: 500 })
  }
}
