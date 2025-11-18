'use client';

import type React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSimpleToast } from '@/components/simple-toast-provider';
import Head from './head';
import Link from 'next/link';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';

interface FormData {
  danceclass: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  honey: string;
  consent: boolean;
}

type GrupaOption = {
  id: string;
  label: string;
  value: string;
};

export default function InscriereForm() {
  const breadcrumbItems = [
    { name: 'Acasă', url: '/' },
    { name: 'Înscriere' },
  ];

  const [formData, setFormData] = useState<FormData>({
    danceclass: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    honey: '',
    consent: false,
  });

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [grupeOptions, setGrupeOptions] = useState<GrupaOption[]>([]);
  const [isGrupeLoading, setIsGrupeLoading] = useState(true);
  const { showToast } = useSimpleToast();
  const searchParams = useSearchParams();
  const preselectedGrupaId = searchParams.get('grupa');

  const defaultOptions: GrupaOption[] = [
    {
      id: 'dans-adulti-latino-societate',
      value: 'dans-adulti-latino-societate',
      label: 'Cursuri dans adulți latino și societate',
    },
    {
      id: 'dansuri-adulti-populare',
      value: 'dansuri-adulti-populare',
      label: 'Cursuri dans adulți populare',
    },
    {
      id: 'dans-copii',
      value: 'dans-copii',
      label: 'Cursuri dans copii',
    },
    {
      id: 'dans-privat',
      value: 'dans-privat',
      label: 'Lecții private',
    },
  ];

  useEffect(() => {
    const fetchGrupe = async () => {
      try {
        const grupeQuery = query(collection(db, 'grupe'), where('publica', '==', true));
        const snapshot = await getDocs(grupeQuery);
        const options = snapshot.docs.map(doc => {
          const data = doc.data() as { titlu?: string };
          return {
            id: doc.id,
            value: `grupa-${doc.id}`,
            label: data.titlu || 'Grupă în formare',
          };
        });
        setGrupeOptions(options);
      } catch (error) {
        console.error('Eroare la încărcarea grupelor pentru formular', error);
      } finally {
        setIsGrupeLoading(false);
      }
    };
    fetchGrupe();
  }, []);

  useEffect(() => {
    if (!preselectedGrupaId || !grupeOptions.length) return;
    const matchedOption = grupeOptions.find(option => option.id === preselectedGrupaId);
    if (matchedOption) {
      setFormData(prev => ({ ...prev, danceclass: matchedOption.value }));
    }
  }, [preselectedGrupaId, grupeOptions]);

  const isFieldComplete = (field: keyof FormData) => {
    const value = formData[field];
    if (typeof value === 'boolean') {
      return value;
    }
    return Boolean(value && String(value).trim().length > 0);
  };

  const requiredFields: (keyof FormData)[] = ['danceclass', 'name', 'email', 'consent'];
  const isFormValid = requiredFields.every(isFieldComplete);

  const renderCompletionIcon = (field: keyof FormData) => {
    if (!isFieldComplete(field)) return null;
    return (
      <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.honey) {
      console.warn('Spam detectat. Formularul nu a fost trimis.');
      showToast('Spam detectat. Formularul nu a fost trimis.', 'error');
      setIsSubmitting(false);
      return;
    }

    if (!formData.consent) {
      showToast(
        'Trebuie să acceptați Politica de Confidențialitate pentru a continua.',
        'error'
      );
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
          ...formData,
        }),
      });
      if (!response.ok) {
        throw new Error('Eroare la trimiterea formularului');
      }

      setFormData({
        danceclass: '',
        name: '',
        email: '',
        phone: '',
        message: '',
        honey: '',
        consent: false,
      });
      setTurnstileToken(null);
      showToast(
        'Mesaj trimis cu succes! Îți mulțumim pentru mesaj. Te vom contacta în curând.',
        'success'
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error('Eroare:', error);
      showToast(
        'Eroare la trimiterea mesajului. Te rugăm să încerci din nou mai târziu.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) {
    return (
      <div className="container py-12">
        <Head />
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent>
              <p className="text-red-600">
                Eroare: Cheia Turnstile nu este configurată. Contactați administratorul.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Head />
      <SEOBreadcrumbs
        items={breadcrumbItems}
        currentPageUrl="https://www.inpasidedans.ro/inscriere"
      />
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
                <Image
                  src="/images/Rick.gif"
                  alt="Școala de dans"
                  width={300}
                  height={200}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                  priority
                />
              </div>
              <div className="mb-4 flex justify-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-600">Formular trimis cu succes!</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Îți mulțumim pentru interesul arătat. Te vom contacta în cel mai scurt timp posibil
                pentru a confirma înscrierea.
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
          <Card className="border-red-500 border-2">
            <CardHeader>
              <CardTitle>Informații înscriere</CardTitle>
              <CardDescription>Completează toate câmpurile obligatorii marcate cu *</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="hidden">
                  <Label htmlFor="honey">Nu completa acest câmp</Label>
                  <Input
                    id="honey"
                    name="honey"
                    type="text"
                    value={formData.honey}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="danceclass">Ce curs te interesează? *</Label>
                    <div className="relative">
                      <Select
                        required
                        value={formData.danceclass}
                        onValueChange={value => handleSelectChange('danceclass', value)}
                      >
                        <SelectTrigger
                          id="danceclass"
                          className={cn(
                            'mt-1.5',
                            isFieldComplete('danceclass') && 'border-green-500 ring-1 ring-green-400 pr-8'
                          )}
                        >
                          <SelectValue
                            placeholder={isGrupeLoading ? 'Se încarcă grupele...' : 'Alege un curs'}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {defaultOptions.map(option => (
                            <SelectItem key={option.id} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                          {grupeOptions.length > 0 && (
                            <>
                              <SelectItem value="grupe-divider" disabled>
                                — Grupe în formare —
                              </SelectItem>
                              {grupeOptions.map(option => (
                                <SelectItem key={option.id} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      {renderCompletionIcon('danceclass')}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="name">Spune-ne numele tău complet*</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nume complet"
                        required
                        className={cn(
                          'mt-1.5 pr-10',
                          isFieldComplete('name') && 'border-green-500 ring-1 ring-green-400'
                        )}
                      />
                      {renderCompletionIcon('name')}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Pe ce adresă vrei să îți răspundem? *</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Adresa ta de e-mail"
                        required
                        className={cn(
                          'mt-1.5 pr-10',
                          isFieldComplete('email') && 'border-green-500 ring-1 ring-green-400'
                        )}
                      />
                      {renderCompletionIcon('email')}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Lasă-ne numărul dacă vrei să te sunăm</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Numărul tău de telefon"
                        className={cn(
                          'mt-1.5 pr-10',
                          isFieldComplete('phone') && 'border-green-500 ring-1 ring-green-400'
                        )}
                      />
                      {renderCompletionIcon('phone')}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Vrei să ne dai mai multe detalii?</Label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Scrie mesajul tău aici..."
                        className={cn(
                          'mt-1.5 min-h-[120px] pr-10',
                          isFieldComplete('message') && 'border-green-500 ring-1 ring-green-400'
                        )}
                      />
                      {renderCompletionIcon('message')}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <Input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        required
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Am citit și sunt de acord cu{' '}
                        <Link href="/privacy-policy" className="text-blue-600 underline">
                          Politica de Confidențialitate
                        </Link>{' '}
                        și cu procesarea datelor mele personale pentru înscrierea la grupe.
                      </span>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={cn(
                    'w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600',
                    (!isFormValid || isSubmitting) && 'opacity-60 cursor-not-allowed'
                  )}
                >
                  {isSubmitting ? 'Se trimite...' : 'Trimite formularul'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

