'use client';

import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { CheckCircle2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useSimpleToast } from '@/components/simple-toast-provider';
import Image from 'next/image';

const ContactForm = () => {
  const { toast } = useToast();
  const { showToast } = useSimpleToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honey: '', // honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🐝 Honeypot logic
    if (formData.honey) {
      console.warn('Spam detectat. Formularul nu a fost trimis.');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Form data:', formData);
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honey: '',
      });

      showToast(
        'Mesaj trimis cu succes! Îți mulțumim pentru mesaj. Te vom contacta în curând.',
        'success'
      );
      setIsSent(true);
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

  return (
    <Card>
      <CardContent className="p-6 border-orange-600 border-2 rounded-md">
        {!isSent ? (
          <>
            <h2 className="text-xl font-bold mb-4">Trimite-ne un mesaj</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* 🐝 Honeypot field – invizibil */}
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

              <div className="grid gap-2">
                <Label htmlFor="name">Nume</Label>
                <Input
                  id="name"
                  placeholder="Numele tău"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplu.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subiect</Label>
                <Input
                  id="subject"
                  placeholder="Subiectul mesajului"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Mesaj</Label>
                <Textarea
                  id="message"
                  placeholder="Scrie mesajul tău aici..."
                  className="min-h-[150px]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Se trimite...' : 'Trimite mesajul'}
              </Button>
            </form>
          </>
        ) : (
          <Card>
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
                onClick={() => setIsSent(false)}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              >
                Completează un nou formular
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactForm;
