'use client';

import type React from 'react';
import { useState } from 'react';
import { useSimpleToast } from '@/components/simple-toast-provider';

type CampuriComune = { honey: string; consent: boolean };

/**
 * Logica comună a formularelor publice care trimit la /api/send:
 * stare câmpuri, honeypot, consimțământ, trimitere, mesaje și resetare.
 * `extra` se evaluează la trimitere (ex. sursa, tipul selecției).
 */
export function useTrimitereFormular<T extends CampuriComune>(gol: T, extra: () => Record<string, unknown>) {
  const [formData, setFormData] = useState<T>(gol);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { showToast } = useSimpleToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot completat = robot; ieșim în liniște
    if (formData.honey) return;

    if (!formData.consent) {
      showToast('Trebuie să acceptați Politica de Confidențialitate pentru a continua.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ...extra() }),
      });
      if (!response.ok) throw new Error('Eroare la trimiterea formularului');

      setFormData(gol);
      showToast('Mesaj trimis cu succes! Îți mulțumim pentru mesaj. Te vom contacta în curând.', 'success');
      setIsSent(true);
    } catch (error) {
      console.error('Eroare:', error);
      showToast('Eroare la trimiterea mesajului. Te rugăm să încerci din nou mai târziu.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, setFormData, handleChange, handleSubmit, isSubmitting, isSent, setIsSent };
}
