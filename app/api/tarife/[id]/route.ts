import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    if (!data.titlu || !data.pret || !data.categorie) {
      return NextResponse.json({ error: "Lipsesc câmpuri obligatorii" }, { status: 400 })
    }

    const tarifRef = doc(db, "tarife", params.id)
    const snap = await getDoc(tarifRef)
    if (!snap.exists()) {
      return NextResponse.json({ error: "Tariful nu a fost găsit" }, { status: 404 })
    }

    await updateDoc(tarifRef, {
      titlu: data.titlu,
      descriere: data.descriere || "",
      pret: Number(data.pret),
      moneda: "Lei",
      categorie: data.categorie,
      beneficii: data.beneficii || [],
      popular: data.popular || false,
      ordine: data.ordine ?? 99,
    })

    return NextResponse.json({ id: params.id })
  } catch (error) {
    console.error("Eroare la actualizarea tarifului:", error)
    return NextResponse.json({ error: "Eroare la actualizarea tarifului" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const tarifRef = doc(db, "tarife", params.id)
    const snap = await getDoc(tarifRef)
    if (!snap.exists()) {
      return NextResponse.json({ error: "Tariful nu a fost găsit" }, { status: 404 })
    }

    await deleteDoc(tarifRef)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Eroare la ștergerea tarifului:", error)
    return NextResponse.json({ error: "Eroare la ștergerea tarifului" }, { status: 500 })
  }
}
