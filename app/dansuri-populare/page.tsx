"use client"

import { use, useState,useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// import ImageSkeleton from "@/components/image-skeleton"

// Definim regiunile României
const regiuni = [
  { id: "toate", nume: "Toate regiunile", culoare: "#e5e7eb" },
  { id: "moldova", nume: "Moldova", culoare: "#fecaca" },
  { id: "muntenia", nume: "Muntenia", culoare: "#bfdbfe" },
  { id: "oltenia", nume: "Oltenia", culoare: "#bbf7d0" },
  { id: "banat", nume: "Banat", culoare: "#fed7aa" },
  { id: "transilvania", nume: "Transilvania", culoare: "#c7d2fe" },
  { id: "maramures", nume: "Maramureș", culoare: "#fde68a" },
  { id: "dobrogea", nume: "Dobrogea", culoare: "#d8b4fe" },
]

// Definim dansurile populare cu regiunile lor
const dansuriPopulare = [
  // Moldova
  {
    nume: "Hora moldovenească",
    regiune: "moldova",
    descriere: "Dans tradițional din Moldova, cu pași ritmați și figuri simple.",
  },
  {
    nume: "Bătuta moldovenească",
    regiune: "moldova",
    descriere: "Dans energic din Moldova, cu bătăi din picioare și mișcări dinamice.",
  },
  {
    nume: "Corăgheasca",
    regiune: "moldova",
    descriere: "Dans complex cu figuri dificile și ritm specific, pentru dansatori experimentați.",
  },
  {
    nume: "Hangul",
    regiune: "moldova",
    descriere: "Dans tradițional moldovenesc, cu mișcări elegante și ritm moderat.",
  },

  // Muntenia
  {
    nume: "Brâul muntenesc",
    regiune: "muntenia",
    descriere: "Dans tradițional din Muntenia, cu pași încrucișați și ritm alert.",
  },
  {
    nume: "Sârba muntenească",
    regiune: "muntenia",
    descriere: "Variantă de sârbă specifică Munteniei, cu elemente distinctive.",
  },
  {
    nume: "Geampara",
    regiune: "muntenia",
    descriere: "Dans cu influențe balcanice, cu ritm specific și mișcări expresive.",
  },
  { nume: "Breaza", regiune: "muntenia", descriere: "Dans din zona Prahova, cu pași complicați și ritm specific." },

  // Oltenia
  { nume: "Hora oltenească", regiune: "oltenia", descriere: "Horă specifică Olteniei, cu ritm alert și pași vioi." },
  {
    nume: "Rustemul oltenesc",
    regiune: "oltenia",
    descriere: "Dans complex din Oltenia, cu figuri dificile și ritm alert.",
  },
  {
    nume: "Alunelul",
    regiune: "oltenia",
    descriere: "Dans popular cu pași laterali și sincronizați, executat în linie.",
  },
  { nume: "Ciuleandra", regiune: "oltenia", descriere: "Dans în cerc cu ritm progresiv, de la lent la foarte rapid." },

  // Banat
  {
    nume: "Brâul bănățean",
    regiune: "banat",
    descriere: "Dans tradițional din Banat, cu pași specifici și ritm alert.",
  },
  {
    nume: "Ardeleana bănățeană",
    regiune: "banat",
    descriere: "Dans în pereche specific zonei Banatului, cu ritm și pași caracteristici.",
  },
  {
    nume: "De doi din Banat",
    regiune: "banat",
    descriere: "Dans în pereche cu mișcări sincronizate și ritm specific.",
  },
  {
    nume: "Hora din Banat",
    regiune: "banat",
    descriere: "Horă specifică regiunii Banatului, cu pași și ritm caracteristic.",
  },

  // Transilvania
  {
    nume: "Învârtita",
    regiune: "transilvania",
    descriere: "Dans în pereche din Transilvania, cu rotiri și pași sincronizați.",
  },
  {
    nume: "Hațegana",
    regiune: "transilvania",
    descriere: "Dans tradițional din zona Hațeg, cu ritm specific și pași caracteristici.",
  },
  { nume: "Fecioreasca", regiune: "transilvania", descriere: "Dans bărbătesc cu elemente acrobatice și ritm alert." },
  {
    nume: "Jiana",
    regiune: "transilvania",
    descriere: "Dans tradițional din Transilvania, cu pași specifici și ritm caracteristic.",
  },

  // Maramureș
  {
    nume: "Învârtita maramureșeană",
    regiune: "maramures",
    descriere: "Variantă de învârtită specifică Maramureșului, cu elemente distinctive.",
  },
  {
    nume: "Jocul fecioresc",
    regiune: "maramures",
    descriere: "Dans bărbătesc cu elemente acrobatice și bătăi din picioare.",
  },
  { nume: "Roata", regiune: "maramures", descriere: "Dans în cerc cu pași sincronizați și ritm specific." },
  {
    nume: "Bărbătescul",
    regiune: "maramures",
    descriere: "Dans tradițional executat de bărbați, cu elemente de virtuozitate.",
  },

  // Dobrogea
  {
    nume: "Cadâneasca",
    regiune: "dobrogea",
    descriere: "Dans cu influențe orientale, cu mișcări grațioase și ritm specific.",
  },
  {
    nume: "Geamparalele",
    regiune: "dobrogea",
    descriere: "Dans cu influențe turcești, cu ritm specific și mișcări expresive.",
  },
  {
    nume: "Hora dobrogeană",
    regiune: "dobrogea",
    descriere: "Horă specifică Dobrogei, cu elemente distinctive și ritm caracteristic.",
  },
  {
    nume: "Ghiordumul",
    regiune: "dobrogea",
    descriere: "Dans tradițional din Dobrogea, cu influențe balcanice și orientale.",
  },
]

export default function DansuriPopulare() {
  const [regiuneSelectata, setRegiuneSelectata] = useState("toate")
  const [dansuriFiltrare, setDansuriFiltrare] = useState(dansuriPopulare)
  // Filtrăm dansurile în funcție de regiunea selectată
  useEffect(() => {
     const dansurifiltrate =
    regiuneSelectata === "toate" ? dansuriPopulare : dansuriPopulare.filter((dans) => dans.regiune === regiuneSelectata)
    setDansuriFiltrare(dansurifiltrate)
  }, [regiuneSelectata])

  return (
    <div className="container py-12"  >
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dansuri Populare</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Descoperă frumusețea și energia dansurilor tradiționale românești din diferite regiuni
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Tradiție și pasiune</h2>
            <p>
              Dansurile populare reprezintă o parte importantă a patrimoniului cultural, transmițând obiceiuri, tradiții
              și povești din generație în generație. Fiecare regiune a României are propriile dansuri tradiționale, cu
              stiluri și ritmuri distincte.
            </p>
            <p>
              Explorează harta României și descoperă dansurile specifice fiecărei regiuni. Selectează o regiune pentru a
              vedea dansurile tradiționale din acea zonă.
            </p>
            <div className="pt-4">
              <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                Înscrie-te la curs
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            {/* <ImageSkeleton width={600} height={400} className="w-full h-full" /> */}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Harta dansurilor populare din România</h2>

          {/* Harta interactivă a României */}
          <div className="mb-8">
            <div className="relative w-full h-[500px] border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              {/* Harta simplificată a României cu regiuni */}
              <svg viewBox="0 0 800 500" className="w-full h-full">
                {/* Regiunile României - forme simplificate */}
                <path
                  d="M500,100 L600,120 L650,200 L600,280 L500,300 L450,250 L460,180 Z"
                  fill={regiuni.find((r) => r.id === "moldova")?.culoare || "#ccc"}
                  stroke="#000"
                  strokeWidth="2"
                  className={`cursor-pointer transition-opacity duration-300 ${regiuneSelectata !== "toate" && regiuneSelectata !== "moldova" ? "opacity-50" : "opacity-100"}`}
                  onClick={() => setRegiuneSelectata("moldova")}
                />
                <path
                  d="M450,250 L500,300 L480,380 L400,400 L350,350 L380,280 L420,240 Z"
                  fill={regiuni.find((r) => r.id === "muntenia")?.culoare || "#ccc"}
                  stroke="#000"
                  strokeWidth="2"
                  className={`cursor-pointer transition-opacity duration-300 ${regiuneSelectata !== "toate" && regiuneSelectata !== "muntenia" ? "opacity-50" : "opacity-100"}`}
                  onClick={() => setRegiuneSelectata("muntenia")}
                />
                <path
                  d="M280,300 L350,350 L400,400 L380,450 L300,450 L250,400 Z"
                  fill={regiuni.find((r) => r.id === "oltenia")?.culoare || "#ccc"}
                  stroke="#000"
                  strokeWidth="2"
                  className={`cursor-pointer transition-opacity duration-300 ${regiuneSelectata !== "toate" && regiuneSelectata !== "oltenia" ? "opacity-50" : "opacity-100"}`}
                  onClick={() => setRegiuneSelectata("oltenia")}
                />
                <path
                  d="M150,300 L280,300 L250,400 L180,380 Z"
                  fill={regiuni.find((r) => r.id === "banat")?.culoare || "#ccc"}
                  stroke="#000"
                  strokeWidth="2"
                  className={`cursor-pointer transition-opacity duration-300 ${regiuneSelectata !== "toate" && regiuneSelectata !== "banat" ? "opacity-50" : "opacity-100"}`}
                  onClick={() => setRegiuneSelectata("banat")}
                />
                <path
                  d="M200,150 L380,180 L420,240 L380,280 L350,350 L280,300 L150,300 L180,200 Z"
                  fill={regiuni.find((r) => r.id === "transilvania")?.culoare || "#ccc"}
                  stroke="#000"
                  strokeWidth="2"
                  className={`cursor-pointer transition-opacity duration-300 ${regiuneSelectata !== "toate" && regiuneSelectata !== "transilvania" ? "opacity-50" : "opacity-100"}`}
                  onClick={() => setRegiuneSelectata("transilvania")}
                />
                <path
                  d="M200,150 L300,100 L380,180 Z"
                  fill={regiuni.find((r) => r.id === "maramures")?.culoare || "#ccc"}
                  stroke="#000"
                  strokeWidth="2"
                  className={`cursor-pointer transition-opacity duration-300 ${regiuneSelectata !== "toate" && regiuneSelectata !== "maramures" ? "opacity-50" : "opacity-100"}`}
                  onClick={() => setRegiuneSelectata("maramures")}
                />
                <path
                  d="M500,300 L600,280 L620,350 L550,400 L480,380 Z"
                  fill={regiuni.find((r) => r.id === "dobrogea")?.culoare || "#ccc"}
                  stroke="#000"
                  strokeWidth="2"
                  className={`cursor-pointer transition-opacity duration-300 ${regiuneSelectata !== "toate" && regiuneSelectata !== "dobrogea" ? "opacity-50" : "opacity-100"}`}
                  onClick={() => setRegiuneSelectata("dobrogea")}
                />

                {/* Etichetele regiunilor */}
                <text x="550" y="200" className="text-sm font-medium" textAnchor="middle">
                  Moldova
                </text>
                <text x="420" y="320" className="text-sm font-medium" textAnchor="middle">
                  Muntenia
                </text>
                <text x="320" y="380" className="text-sm font-medium" textAnchor="middle">
                  Oltenia
                </text>
                <text x="200" y="340" className="text-sm font-medium" textAnchor="middle">
                  Banat
                </text>
                <text x="280" y="220" className="text-sm font-medium" textAnchor="middle">
                  Transilvania
                </text>
                <text x="290" y="130" className="text-sm font-medium" textAnchor="middle">
                  Maramureș
                </text>
                <text x="550" y="350" className="text-sm font-medium" textAnchor="middle">
                  Dobrogea
                </text>
              </svg>

              {/* Legendă */}
              <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 p-2 rounded-md shadow-md">
                <div className="text-sm font-medium mb-1">Selectează o regiune:</div>
                <div className="flex flex-wrap gap-2">
                  {regiuni.map((regiune) => (
                    <button
                      key={regiune.id}
                      className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                        regiuneSelectata === regiune.id
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                      }`}
                      style={{ backgroundColor: regiuneSelectata === regiune.id ? undefined : regiune.culoare }}
                      onClick={() => setRegiuneSelectata(regiune.id)}
                    >
                      {regiune.nume}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lista de dansuri filtrate după regiune */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {regiuneSelectata === "toate"
                  ? "Dansuri populare din toate regiunile"
                  : `Dansuri populare din ${regiuni.find((r) => r.id === regiuneSelectata)?.nume}`}
              </h2>

              {dansuriFiltrare.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {dansuriFiltrare.map((dans, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                      <h3 className="font-semibold mb-2">{dans.nume}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{dans.descriere}</p>
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          {regiuni.find((r) => r.id === dans.regiune)?.nume}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nu există dansuri înregistrate pentru această regiune</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">Programul Cursurilor</h2>
          <div className="grid gap-4">
            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dansuri Românești - Începători</h3>
                <p className="text-gray-500">Instructor: Ion Marin</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Marți, 18:00 - 19:30</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dansuri Balcanice - Mixt</h3>
                <p className="text-gray-500">Instructor: Elena Popescu</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Joi, 19:00 - 20:30</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Dansuri Internaționale - Mixt</h3>
                <p className="text-gray-500">Instructor: Mihai Ionescu</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-gray-500">Sâmbătă, 11:00 - 13:00</p>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  )
}

