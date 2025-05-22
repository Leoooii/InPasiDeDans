import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore"

// GET - Obține toți instructorii
export async function GET() {
  try {
    const instructoriRef = collection(db, "instructori")
    const q = query(instructoriRef, orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)

    const instructori = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json(instructori)
  } catch (error) {
    console.error("Eroare la obținerea instructorilor:", error)
    return NextResponse.json({ error: "Eroare la obținerea instructorilor" }, { status: 500 })
  }
}

// POST - Adaugă un instructor nou
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validăm datele
    if (!data.name || !data.role || !data.bio || !data.imageUrl) {
      return NextResponse.json({ error: "Lipsesc câmpuri obligatorii" }, { status: 400 })
    }

    // Adăugăm instructorul în Firestore
    const instructorRef = collection(db, "instructori")
    const newInstructor = {
      name: data.name,
      role: data.role,
      bio: data.bio,
      imageUrl: data.imageUrl,
      facebookUrl: data.facebookUrl || null,
      instagramUrl: data.instagramUrl || null,
      youtubeUrl: data.youtubeUrl || null,
      order: data.order || 0,
      createdAt: data.createdAt || Date.now(),
    }

    const docRef = await addDoc(instructorRef, newInstructor)

    return NextResponse.json(
      {
        id: docRef.id,
        ...newInstructor,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Eroare la adăugarea instructorului:", error)
    return NextResponse.json({ error: "Eroare la adăugarea instructorului" }, { status: 500 })
  }
}
