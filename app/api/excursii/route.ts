import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

// GET /api/excursii - Obține toate excursiile
export async function GET() {
  try {
    const excursiiCollection = collection(db, "excursii")
    const excursiiSnapshot = await getDocs(excursiiCollection)
    const excursii = excursiiSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json(excursii)
  } catch (error) {
    console.error("Eroare la obținerea excursiilor:", error)
    return NextResponse.json({ error: "Eroare la obținerea excursiilor" }, { status: 500 })
  }
}

// POST /api/excursii - Adaugă o nouă excursie
