'use client';

import type React from 'react';
import Image from 'next/image';
import { useState } from 'react';
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
import { Turnstile } from '@marsidev/react-turnstile';

// Interfață pentru tipizarea formData
interface FormData {
  danceclass: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  honey: string;
}

export default function Inscriere() {
  const [formData, setFormData] = useState<FormData>({
    danceclass: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    honey: '',
  });

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useSimpleToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🐝 Honeypot logic
    if (formData.honey) {
      console.warn('Spam detectat. Formularul nu a fost trimis.');
      setIsSubmitting(false);
      return;
    }

    // Verifică token-ul Turnstile
    if (!turnstileToken) {
      showToast('Te rugăm să completezi verificarea CAPTCHA.', 'error');
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
          'cf-turnstile-response': turnstileToken,
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

  // Verifică dacă siteKey există
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) {
    return (
      <div className="container py-12">
        <Head />
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent>
              <p className="text-red-600">
                Eroare: Cheia Turnstile nu este configurată. Contactați
                administratorul.
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
      <div className="max-w-3xl mx-auto">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Formular de înscriere
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Completează formularul de mai jos pentru a te înscrie la cursurile
            noastre de dans
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
                  <svg
                    className="h-6 w-6 text-green-600"
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
              <h3 className="text-xl font-bold mb-2 text-green-600">
                Formular trimis cu succes!
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Îți mulțumim pentru interesul arătat. Te vom contacta în cel mai
                scurt timp posibil pentru a confirma înscrierea.
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
              <CardDescription>
                Completează toate câmpurile obligatorii marcate cu *
              </CardDescription>
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
                    <Label htmlFor="danceclass">
                      Ce curs te interesează? *
                    </Label>
                    <Select
                      required
                      value={formData.danceclass}
                      onValueChange={value =>
                        handleSelectChange('danceclass', value)
                      }
                    >
                      <SelectTrigger id="danceclass" className="mt-1.5">
                        <SelectValue placeholder="Alege un curs" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dans-adulti-latino-societate">
                          Cursuri dans adulți latino si societate
                        </SelectItem>
                        <SelectItem value="dansuri-adulti-populare">
                          Cursuri dans adulti populare
                        </SelectItem>
                        <SelectItem value="dans-copii">
                          Cursuri dans copii
                        </SelectItem>
                        <SelectItem value="dans-privat">
                          Lectii private
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="name">Spune-ne numele tău *</Label>
                    <Input
                      id="name"
                      name="nume"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Numele tău"
                      required
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">
                      Pe ce adresă vrei să îți răspundem? *
                    </Label>
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
                    <Label htmlFor="phone">
                      Lasă-ne numărul dacă vrei să te sunăm
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Numărul tău de telefon"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">
                      Vrei să ne dai mai multe detalii?
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Scrie mesajul tău aici..."
                      className="mt-1.5 min-h-[120px]"
                    />
                  </div>
                </div>

                {/* Widget Turnstile */}
                <Turnstile
                  siteKey={siteKey}
                  onSuccess={token => setTurnstileToken(token)}
                  onError={() => {
                    setTurnstileToken(null);
                    showToast('Eroare la verificarea CAPTCHA.', 'error');
                  }}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting || !turnstileToken}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
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
