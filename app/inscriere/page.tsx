"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Inscriere() {
  const [formData, setFormData] = useState({
    curs: "",
    perioada: "",
    nume: "",
    email: "",
    telefon: "",
    mesaj: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulăm trimiterea formularului
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        curs: "",
        perioada: "",
        nume: "",
        email: "",
        telefon: "",
        mesaj: "",
      })
    }, 1500)
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Formular de înscriere</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Completează formularul de mai jos pentru a te înscrie la cursurile noastre de dans
          </p>
        </div>

        {isSubmitted ? (
          <Card className="border-green-500">
            <CardContent className="pt-6 pb-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-600">Formular trimis cu succes!</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Îți mulțumim pentru interesul arătat. Te vom contacta în cel mai scurt timp posibil pentru a confirma
                înscrierea.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              >
                Completează un nou formular
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Informații înscriere</CardTitle>
              <CardDescription>Completează toate câmpurile obligatorii marcate cu *</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="curs">Ce curs te interesează? *</Label>
                    <Select required value={formData.curs} onValueChange={(value) => handleSelectChange("curs", value)}>
                      <SelectTrigger id="curs" className="mt-1.5">
                        <SelectValue placeholder="Alege un curs" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dans-adulti">Cursuri dans adulți</SelectItem>
                        <SelectItem value="dans-copii">Cursuri dans copii</SelectItem>
                        <SelectItem value="dansuri-populare">Dansuri populare</SelectItem>
                        <SelectItem value="dansuri-societate">Dansuri de societate</SelectItem>
                        <SelectItem value="dansuri-latino">Dansuri latino</SelectItem>
                        <SelectItem value="dans-nunta">Dans pentru nuntă</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Când dorești să participi la curs? *</Label>
                    <RadioGroup
                      required
                      value={formData.perioada}
                      onValueChange={(value) => handleSelectChange("perioada", value)}
                      className="mt-1.5 grid grid-cols-1 md:grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cat-mai-curand" id="cat-mai-curand" />
                        <Label htmlFor="cat-mai-curand" className="cursor-pointer">
                          Cât mai curând
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="luna-urmatoare" id="luna-urmatoare" />
                        <Label htmlFor="luna-urmatoare" className="cursor-pointer">
                          Luna următoare
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="urmatoarele-3-luni" id="urmatoarele-3-luni" />
                        <Label htmlFor="urmatoarele-3-luni" className="cursor-pointer">
                          În următoarele 3 luni
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="doar-informatii" id="doar-informatii" />
                        <Label htmlFor="doar-informatii" className="cursor-pointer">
                          Doar doresc informații
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="border-t pt-4">
                    <Label htmlFor="nume">Spune-ne numele tău *</Label>
                    <Input
                      id="nume"
                      name="nume"
                      value={formData.nume}
                      onChange={handleChange}
                      placeholder="Numele tău"
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Pe ce adresă vrei să îți răspundem? *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Adresa ta de e-mail"
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefon">Lasă-ne numărul dacă vrei să te sunăm</Label>
                    <Input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      value={formData.telefon}
                      onChange={handleChange}
                      placeholder="Numărul tău de telefon"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mesaj">Vrei să ne dai mai multe detalii?</Label>
                    <Textarea
                      id="mesaj"
                      name="mesaj"
                      value={formData.mesaj}
                      onChange={handleChange}
                      placeholder="Scrie mesajul tău aici..."
                      className="mt-1.5 min-h-[120px]"
                    />
                  </div>

                  <div className="border p-4 rounded-md bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 border rounded bg-white dark:bg-gray-700"></div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">I'm not a robot</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-gray-400"
                        >
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 12H22"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-xs text-gray-400 ml-1">reCAPTCHA</span>
                      </div>
                      <span className="text-xs text-gray-400">Privacy - Terms</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                >
                  {isSubmitting ? "Se trimite..." : "Trimite formularul"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

