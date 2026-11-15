import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"

export async function GET() {
  try {
    const tarife = query(collection(db, "tarife"), orderBy("ordine", "asc"))
    const snapshot = await getDocs(tarife)
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json(data)
  } catch (error) {
    console.error("Eroare la obținerea tarifelor:", error)
    return NextResponse.json({ error: "Eroare la obținerea tarifelor" }, { status: 500 })
  }
}

