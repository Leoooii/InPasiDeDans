import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc } from "firebase/firestore"

// GET: Obține toate petrecerile
export async function GET(request: NextRequest) {
  try {
    const petreceriCollection = collection(db, "petreceri")
    const petreceriSnapshot = await getDocs(petreceriCollection)
    const petreceri = petreceriSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json(petreceri)
  } catch (error) {
    console.error("Eroare la obținerea petrecerilor:", error)
    return NextResponse.json({ message: "Eroare la obținerea petrecerilor" }, { status: 500 })
  }
}

// POST: Adaugă o petrecere nouă
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validăm datele primite
    if (!data.title || !data.date || !data.facebookLink || !data.imageUrl) {
      return NextResponse.json(
        { message: "Titlul, data, link-ul Facebook și URL-ul imaginii sunt obligatorii" },
        { status: 400 },
      )
    }

    // Adăugăm petrecerea în Firestore
    const petreceriCollection = collection(db, "petreceri")
    const docRef = await addDoc(petreceriCollection, {
      ...data,
      createdAt: Date.now(),
    })

    return NextResponse.json({ id: docRef.id, ...data }, { status: 201 })
  } catch (error) {
    console.error("Eroare la adăugarea petrecerii:", error)
    return NextResponse.json({ message: "Eroare la adăugarea petrecerii" }, { status: 500 })
  }
}
