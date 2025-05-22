import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"

// GET: Obține o petrecere după ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const petrecereDoc = doc(db, "petreceri", id)
    const petrecereSnapshot = await getDoc(petrecereDoc)

    if (!petrecereSnapshot.exists()) {
      return NextResponse.json({ message: "Petrecerea nu a fost găsită" }, { status: 404 })
    }

    return NextResponse.json({
      id: petrecereSnapshot.id,
      ...petrecereSnapshot.data(),
    })
  } catch (error) {
    console.error("Eroare la obținerea petrecerii:", error)
    return NextResponse.json({ message: "Eroare la obținerea petrecerii" }, { status: 500 })
  }
}

// PUT: Actualizează o petrecere
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    // Validăm datele primite
    if (!data.title || !data.date || !data.facebookLink || !data.imageUrl) {
      return NextResponse.json(
        { message: "Titlul, data, link-ul Facebook și URL-ul imaginii sunt obligatorii" },
        { status: 400 },
      )
    }

    // Verificăm dacă petrecerea există
    const petrecereDoc = doc(db, "petreceri", id)
    const petrecereSnapshot = await getDoc(petrecereDoc)

    if (!petrecereSnapshot.exists()) {
      return NextResponse.json({ message: "Petrecerea nu a fost găsită" }, { status: 404 })
    }

    // Actualizăm petrecerea
    await updateDoc(petrecereDoc, data)

    return NextResponse.json({
      id,
      ...data,
    })
  } catch (error) {
    console.error("Eroare la actualizarea petrecerii:", error)
    return NextResponse.json({ message: "Eroare la actualizarea petrecerii" }, { status: 500 })
  }
}

// DELETE: Șterge o petrecere
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Verificăm dacă petrecerea există
    const petrecereDoc = doc(db, "petreceri", id)
    const petrecereSnapshot = await getDoc(petrecereDoc)

    if (!petrecereSnapshot.exists()) {
      return NextResponse.json({ message: "Petrecerea nu a fost găsită" }, { status: 404 })
    }

    // Ștergem petrecerea
    await deleteDoc(petrecereDoc)

    return NextResponse.json({ message: "Petrecerea a fost ștearsă cu succes" }, { status: 200 })
  } catch (error) {
    console.error("Eroare la ștergerea petrecerii:", error)
    return NextResponse.json({ message: "Eroare la ștergerea petrecerii" }, { status: 500 })
  }
}
