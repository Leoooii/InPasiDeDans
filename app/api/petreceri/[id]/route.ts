import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

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

