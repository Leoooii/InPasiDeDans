import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc } from "firebase/firestore"

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
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validăm datele primite
    if (!data.title || !data.eventDate || !data.imageUrl) {
      return NextResponse.json({ error: "Titlul, data excursiei și URL-ul imaginii sunt obligatorii" }, { status: 400 })
    }

    // Adăugăm excursia în baza de date
    const excursieData = {
      ...data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    const docRef = await addDoc(collection(db, "excursii"), excursieData)

    return NextResponse.json(
      {
        id: docRef.id,
        ...excursieData,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Eroare la adăugarea excursiei:", error)
    return NextResponse.json({ error: "Eroare la adăugarea excursiei" }, { status: 500 })
  }
}
