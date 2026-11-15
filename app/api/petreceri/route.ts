import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

// Dezactivăm cache-ul pentru acest API route
export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET: Obține toate petrecerile
export async function GET(request: NextRequest) {
  try {
    const petreceriCollection = collection(db, "petreceri")
    const petreceriSnapshot = await getDocs(petreceriCollection)
    const petreceri = petreceriSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Adăugăm headere pentru a preveni cache-ul
    return NextResponse.json(petreceri, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error("Eroare la obținerea petrecerilor:", error)
    return NextResponse.json({ message: "Eroare la obținerea petrecerilor" }, { status: 500 })
  }
}

// POST: Adaugă o petrecere nouă
