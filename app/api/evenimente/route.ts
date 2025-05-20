import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore"

export async function GET() {
  try {
    const evenimenteRef = collection(db, "evenimente")
    const q = query(evenimenteRef, orderBy("date", "desc"))
    const snapshot = await getDocs(q)

    const evenimente = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        date: data.date?.toDate().toISOString() || new Date().toISOString(),
        eventDate: data.eventDate?.toDate().toISOString() || null,
        title: data.title || "",
        description: data.description || "",
        link: data.link || "",
        imageUrl: data.imageUrl || "",
      }
    })

    return NextResponse.json(evenimente)
  } catch (error) {
    console.error("Eroare la obținerea evenimentelor:", error)
    return NextResponse.json({ error: "Eroare la obținerea evenimentelor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const evenimenteRef = collection(db, "evenimente")
    const docRef = await addDoc(evenimenteRef, {
      ...data,
      date: serverTimestamp(),
      createdAt: serverTimestamp(),
    })

    return NextResponse.json({ id: docRef.id, ...data })
  } catch (error) {
    console.error("Eroare la adăugarea evenimentului:", error)
    return NextResponse.json({ error: "Eroare la adăugarea evenimentului" }, { status: 500 })
  }
}
