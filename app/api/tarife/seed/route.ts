import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc, query } from "firebase/firestore"

const INITIAL_TARIFE = [
  // Grup adulți
  { titlu: "Abonament 8", descriere: "Valabil 4 săptămâni", pret: 250, moneda: "Lei", categorie: "grup", beneficii: ["8 ședințe pe lună", "Acces la o singură grupă", "Valabil pentru orice grupă (dans popular, dansuri latino & de societate, bachata & salsa)"], popular: false, ordine: 1 },
  { titlu: "Abonament 16", descriere: "Valabil 4 săptămâni", pret: 350, moneda: "Lei", categorie: "grup", beneficii: ["16 ședințe pe lună", "Acces la 2 grupe", "Valabil pentru orice grupă (dans popular, dansuri latino & de societate, bachata & salsa)"], popular: true, ordine: 2 },
  { titlu: "Abonament Full Pass", descriere: "Valabil 4 săptămâni", pret: 420, moneda: "Lei", categorie: "grup", beneficii: ["Acces nelimitat la grupe", "Valabil începând cu prima ședință efectuată", "Permite acces la toate grupele în desfășurare la momentul achiziționării"], popular: false, ordine: 3 },
  { titlu: "Plata la ședință", descriere: "Orice stil de dans", pret: 45, moneda: "Lei", categorie: "grup", beneficii: ["O ședință la grup", "Tarif valabil pentru orice grupă (dans popular, dansuri latino & de societate, bachata & salsa)"], popular: false, ordine: 4 },
  // Lecții private
  { titlu: "Pachet 4 ședințe", descriere: "", pret: 640, moneda: "Lei", categorie: "privat", beneficii: ["4 ședințe private", "Instructor dedicat"], popular: false, ordine: 1 },
  { titlu: "Pachet 6 ședințe", descriere: "", pret: 900, moneda: "Lei", categorie: "privat", beneficii: ["6 ședințe private", "Instructor dedicat"], popular: false, ordine: 2 },
  { titlu: "Pachet 8 ședințe", descriere: "", pret: 1120, moneda: "Lei", categorie: "privat", beneficii: ["8 ședințe private", "Instructor dedicat"], popular: false, ordine: 3 },
  { titlu: "Plata la ședință", descriere: "", pret: 180, moneda: "Lei", categorie: "privat", beneficii: ["O ședință privată", "Instructor dedicat"], popular: false, ordine: 4 },
  // Copii
  { titlu: "Abonament 4", descriere: "Valabil o lună (4 ședințe)", pret: 110, moneda: "Lei", categorie: "copii", beneficii: ["4 ședințe pe lună", "O ședință pe săptămână", "Acces la grupe pentru copii"], popular: false, ordine: 1 },
  { titlu: "Abonament 8", descriere: "Valabil o lună (8 ședințe)", pret: 200, moneda: "Lei", categorie: "copii", beneficii: ["8 ședințe pe lună", "2 ședințe pe săptămână", "Acces la grupe pentru copii"], popular: false, ordine: 2 },
  { titlu: "Abonament 12", descriere: "Valabil o lună (12 ședințe)", pret: 250, moneda: "Lei", categorie: "copii", beneficii: ["12 ședințe pe lună", "3 ședințe pe săptămână", "Acces la grupe pentru copii"], popular: false, ordine: 3 },
  { titlu: "Plata la ședință", descriere: "Ședință de grup", pret: 35, moneda: "Lei", categorie: "copii", beneficii: ["O ședință la grup", "Acces la grupe pentru copii"], popular: false, ordine: 4 },
]

export async function POST() {
  try {
    const existing = await getDocs(query(collection(db, "tarife")))
    if (!existing.empty) {
      return NextResponse.json({ message: "Tarifele există deja", count: existing.size })
    }

    for (const tarif of INITIAL_TARIFE) {
      await addDoc(collection(db, "tarife"), tarif)
    }

    return NextResponse.json({ success: true, seeded: INITIAL_TARIFE.length })
  } catch (error) {
    console.error("Eroare seed tarife:", error)
    return NextResponse.json({ error: "Eroare la seeding" }, { status: 500 })
  }
}
