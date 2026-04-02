import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore"

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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.titlu || !data.pret || !data.categorie) {
      return NextResponse.json({ error: "Lipsesc câmpuri obligatorii" }, { status: 400 })
    }

    const docRef = await addDoc(collection(db, "tarife"), {
      titlu: data.titlu,
      descriere: data.descriere || "",
      pret: Number(data.pret),
      moneda: "Lei",
      categorie: data.categorie,
      beneficii: data.beneficii || [],
      popular: data.popular || false,
      ordine: data.ordine ?? 99,
    })

    return NextResponse.json({ id: docRef.id }, { status: 201 })
  } catch (error) {
    console.error("Eroare la adăugarea tarifului:", error)
    return NextResponse.json({ error: "Eroare la adăugarea tarifului" }, { status: 500 })
  }
}
