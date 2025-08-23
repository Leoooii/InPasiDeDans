'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSimpleToast } from '@/components/simple-toast-provider';

// Tipizări pentru form data
interface FormData {
  prenume: string;
  nume: string;
  email: string;
  telefon: string;
  dansLatinoType: string;
  honey: string;
}

// Lista stilurilor de dans latino disponibile
const dansLatinoOptions = [
  'Bachata',
  'Salsa',
  'Merengue',
  'Kizomba',
  'Rueda de Casino',
  'Salsa Cubana',
  'Bachata Sensual',
  'Cha Cha Cha',
  'Mambo'
];

export default function LatinoSignupForm() {
  const { showToast } = useSimpleToast();

  const [formData, setFormData] = useState<FormData>({
    prenume: '',
    nume: '',
    email: '',
    telefon: '',
    dansLatinoType: 'Bachata',
    honey: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Honeypot logic pentru protecție anti-spam
    if (formData.honey) {
      console.warn('Spam detectat. Formularul nu a fost trimis.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.prenume} ${formData.nume}`,
          email: formData.email,
          phone: formData.telefon,
          danceclass: `Dansuri Latino - ${formData.dansLatinoType}`,
          message: `Doresc să mă înscriu la cursurile de ${formData.dansLatinoType}. Vă rog să mă contactați pentru detalii despre program și înscriere.`,
          honey: formData.honey,
          consent: true, // Pentru form-ul de înscriere, considerăm că user-ul este de acord prin completare
        }),
      });

      if (!response.ok) {
        throw new Error('Eroare la trimiterea formularului');
      }

      // Reset form
      setFormData({
        prenume: '',
        nume: '',
        email: '',
        telefon: '',
        dansLatinoType: 'Bachata',
        honey: '',
      });

      showToast(
        'Înscrierea a fost trimisă cu succes! Te vom contacta în curând pentru confirmare.',
        'success'
      );
      setIsSent(true);
    } catch (error) {
      console.error('Eroare:', error);
      showToast(
        'Eroare la trimiterea înscrierIi. Te rugăm să încerci din nou mai târziu.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <div className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-600">
                Înscrierea a fost trimisă cu succes!
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Îți mulțumim pentru interesul arătat față de cursurile noastre de dans latino. 
                Te vom contacta în cel mai scurt timp posibil pentru a confirma înscrierea și 
                pentru a-ți oferi toate detaliile despre program.
              </p>
              <Button
                onClick={() => setIsSent(false)}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 px-8 py-3"
              >
                Completează o nouă înscriere
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Completează formularul și înscrie-te la cursurile de dans latino
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Începe-ți călătoria în lumea dansurilor latino! Completează formularul de mai jos 
            și te vom contacta pentru a-ți confirma locul în grupă.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field – invizibil pentru protecție anti-spam */}
              <div className="hidden">
                <input
                  name="honey"
                  type="text"
                  value={formData.honey}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              {/* Nume și Prenume pe același rând */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="prenume"
                    type="text"
                    placeholder="Prenume"
                    value={formData.prenume}
                    onChange={handleChange}
                    required
                    className="h-14 text-gray-700 placeholder-gray-400 bg-gray-50 border-gray-200 focus:bg-white focus:border-red-500 focus:ring-red-500 rounded-lg"
                  />
                </div>
                <div>
                  <Input
                    name="nume"
                    type="text"
                    placeholder="Nume"
                    value={formData.nume}
                    onChange={handleChange}
                    required
                    className="h-14 text-gray-700 placeholder-gray-400 bg-gray-50 border-gray-200 focus:bg-white focus:border-red-500 focus:ring-red-500 rounded-lg"
                  />
                </div>
              </div>

              {/* Email și Telefon pe același rând */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-14 text-gray-700 placeholder-gray-400 bg-gray-50 border-gray-200 focus:bg-white focus:border-red-500 focus:ring-red-500 rounded-lg"
                  />
                </div>
                <div>
                  <Input
                    name="telefon"
                    type="tel"
                    placeholder="Număr de telefon"
                    value={formData.telefon}
                    onChange={handleChange}
                    required
                    className="h-14 text-gray-700 placeholder-gray-400 bg-gray-50 border-gray-200 focus:bg-white focus:border-red-500 focus:ring-red-500 rounded-lg"
                  />
                </div>
              </div>

              {/* Selectare stil de dans latino */}
              <div>
                <select
                  name="dansLatinoType"
                  value={formData.dansLatinoType}
                  onChange={handleChange}
                  required
                  className="w-full h-16 px-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 1rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                  }}
                >
                  {dansLatinoOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Se trimite...
                    </div>
                  ) : (
                    'TRIMITE'
                  )}
                </Button>
              </div>

              {/* Privacy Notice */}
              <div className="text-center pt-2">
                <p className="text-sm text-gray-500">
                  Prin trimiterea formularului, ești de acord cu procesarea datelor personale 
                  în scopul contactării pentru confirmare înscriere.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
