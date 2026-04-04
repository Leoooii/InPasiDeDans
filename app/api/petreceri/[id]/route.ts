import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const petrecereDoc = doc(db, "petreceri", id)
    const petrecereSnapshot = await getDoc(petrecereDoc)

    if (!petrecereSnapshot.exists()) {
      return NextResponse.json({ message: "Petrecerea nu a fost găsită" }, { status: 404 })
    }

    return NextResponse.json({ id: petrecereSnapshot.id, ...petrecereSnapshot.data() })
  } catch (error) {
    console.error("Eroare la obținerea petrecerii:", error)
    return NextResponse.json({ message: "Eroare la obținerea petrecerii" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()

    if (!data.title || !data.date || !data.facebookLink || !data.imageUrl) {
      return NextResponse.json(
        { message: "Titlul, data, link-ul Facebook și URL-ul imaginii sunt obligatorii" },
        { status: 400 },
      )
    }

    const petrecereDoc = doc(db, "petreceri", id)
    const petrecereSnapshot = await getDoc(petrecereDoc)

    if (!petrecereSnapshot.exists()) {
      return NextResponse.json({ message: "Petrecerea nu a fost găsită" }, { status: 404 })
    }

    await updateDoc(petrecereDoc, data)
    return NextResponse.json({ id, ...data })
  } catch (error) {
    console.error("Eroare la actualizarea petrecerii:", error)
    return NextResponse.json({ message: "Eroare la actualizarea petrecerii" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const petrecereDoc = doc(db, "petreceri", id)
    const petrecereSnapshot = await getDoc(petrecereDoc)

    if (!petrecereSnapshot.exists()) {
      return NextResponse.json({ message: "Petrecerea nu a fost găsită" }, { status: 404 })
    }

    await deleteDoc(petrecereDoc)
    return NextResponse.json({ message: "Petrecerea a fost ștearsă cu succes" }, { status: 200 })
  } catch (error) {
    console.error("Eroare la ștergerea petrecerii:", error)
    return NextResponse.json({ message: "Eroare la ștergerea petrecerii" }, { status: 500 })
  }
}
