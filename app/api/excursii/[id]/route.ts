import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

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

