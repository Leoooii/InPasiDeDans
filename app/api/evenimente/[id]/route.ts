import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const evenimentRef = doc(db, "evenimente", id)
    const evenimentSnap = await getDoc(evenimentRef)

    if (!evenimentSnap.exists()) {
      return NextResponse.json({ error: "Evenimentul nu a fost găsit" }, { status: 404 })
    }

    const data = evenimentSnap.data()
    return NextResponse.json({
      id: evenimentSnap.id,
      date: data.date?.toDate().toISOString() || new Date().toISOString(),
      eventDate: data.eventDate?.toDate().toISOString() || null,
      title: data.title || "",
      description: data.description || "",
      link: data.link || "",
      imageUrl: data.imageUrl || "",
    })
  } catch (error) {
    console.error("Eroare la obținerea evenimentului:", error)
    return NextResponse.json({ error: "Eroare la obținerea evenimentului" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    const evenimentRef = doc(db, "evenimente", id)
    await updateDoc(evenimentRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })

    return NextResponse.json({ id, ...data })
  } catch (error) {
    console.error("Eroare la actualizarea evenimentului:", error)
    return NextResponse.json({ error: "Eroare la actualizarea evenimentului" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const evenimentRef = doc(db, "evenimente", id)
    await deleteDoc(evenimentRef)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Eroare la ștergerea evenimentului:", error)
    return NextResponse.json({ error: "Eroare la ștergerea evenimentului" }, { status: 500 })
  }
}
