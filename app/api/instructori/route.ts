import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"

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
