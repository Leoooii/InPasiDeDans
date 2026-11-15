import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const instructorRef = doc(db, "instructori", id)
    const instructorSnap = await getDoc(instructorRef)

    if (!instructorSnap.exists()) {
      return NextResponse.json({ error: "Instructorul nu a fost găsit" }, { status: 404 })
    }

    return NextResponse.json({ id: instructorSnap.id, ...instructorSnap.data() })
  } catch (error) {
    console.error("Eroare la obținerea instructorului:", error)
    return NextResponse.json({ error: "Eroare la obținerea instructorului" }, { status: 500 })
  }
}

