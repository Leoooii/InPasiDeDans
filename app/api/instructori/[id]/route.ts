import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"

// GET - Obține un instructor specific
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const instructorId = params.id
    const instructorRef = doc(db, "instructori", instructorId)
    const instructorSnap = await getDoc(instructorRef)

    if (!instructorSnap.exists()) {
      return NextResponse.json({ error: "Instructorul nu a fost găsit" }, { status: 404 })
    }

    return NextResponse.json({
      id: instructorSnap.id,
      ...instructorSnap.data(),
    })
  } catch (error) {
    console.error("Eroare la obținerea instructorului:", error)
    return NextResponse.json({ error: "Eroare la obținerea instructorului" }, { status: 500 })
  }
}

// PUT - Actualizează un instructor
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const instructorId = params.id
    const data = await request.json()

    // Validăm datele
    if (!data.name || !data.role || !data.bio || !data.imageUrl) {
      return NextResponse.json({ error: "Lipsesc câmpuri obligatorii" }, { status: 400 })
    }

    // Verificăm dacă instructorul există
    const instructorRef = doc(db, "instructori", instructorId)
    const instructorSnap = await getDoc(instructorRef)

    if (!instructorSnap.exists()) {
      return NextResponse.json({ error: "Instructorul nu a fost găsit" }, { status: 404 })
    }

    // Actualizăm instructorul
    const updatedInstructor = {
      name: data.name,
      role: data.role,
      bio: data.bio,
      imageUrl: data.imageUrl,
      facebookUrl: data.facebookUrl || null,
      instagramUrl: data.instagramUrl || null,
      youtubeUrl: data.youtubeUrl || null,
      order: data.order || 0,
      createdAt: data.createdAt,
    }

    await updateDoc(instructorRef, updatedInstructor)

    return NextResponse.json({
      id: instructorId,
      ...updatedInstructor,
    })
  } catch (error) {
    console.error("Eroare la actualizarea instructorului:", error)
    return NextResponse.json({ error: "Eroare la actualizarea instructorului" }, { status: 500 })
  }
}

// DELETE - Șterge un instructor
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const instructorId = params.id

    // Verificăm dacă instructorul există
    const instructorRef = doc(db, "instructori", instructorId)
    const instructorSnap = await getDoc(instructorRef)

    if (!instructorSnap.exists()) {
      return NextResponse.json({ error: "Instructorul nu a fost găsit" }, { status: 404 })
    }

    // Ștergem instructorul
    await deleteDoc(instructorRef)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Eroare la ștergerea instructorului:", error)
    return NextResponse.json({ error: "Eroare la ștergerea instructorului" }, { status: 500 })
  }
}
