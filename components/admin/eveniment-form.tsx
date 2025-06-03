'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Calendar, Link2, ImageIcon } from 'lucide-react';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import type { Eveniment } from '@/app/admin/evenimente/page';

interface EventFormProps {
  eveniment: Eveniment | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EventForm({
  eveniment,
  onSuccess,
  onCancel,
}: EventFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [link, setLink] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (eveniment) {
      setTitle(eveniment.title || '');
      setDescription(eveniment.description || '');

      if (eveniment.eventDate) {
        const date =
          eveniment.eventDate instanceof Date
            ? eveniment.eventDate
            : new Date(eveniment.eventDate);

        // Format date to YYYY-MM-DD for input[type="date"]
        setEventDate(date.toISOString().split('T')[0]);
      } else {
        setEventDate('');
      }

      setLink(eveniment.link || '');
      setImageUrl(eveniment.imageUrl || '');
      setImagePreview(eveniment.imageUrl || null);
    } else {
      resetForm();
    }
  }, [eveniment]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEventDate('');
    setLink('');
    setImageUrl('');
    setImagePreview(null);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);

    // Update preview if URL is not empty
    if (url.trim()) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const eventData: any = {
        title: title.trim() || null,
        description: description || null,
        link: link.trim() || null,
        imageUrl: imageUrl.trim() || null,
      };

      // Add event date if provided
      if (eventDate) {
        eventData.eventDate = Timestamp.fromDate(new Date(eventDate));
      }

      if (eveniment) {
        // Update existing event
        const eventRef = doc(db, 'evenimente', eveniment.id);
        await updateDoc(eventRef, eventData);
      } else {
        // Add new event with server timestamp
        eventData.date = serverTimestamp();
        await addDoc(collection(db, 'evenimente'), eventData);
      }

      onSuccess();
      resetForm();
    } catch (error) {
      console.error('Eroare la salvarea evenimentului:', error);
      toast({
        title: 'Eroare',
        description: 'Nu s-a putut salva evenimentul. Încercați din nou.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titlu</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Titlul evenimentului (opțional)"
                />
              </div>

              <div>
                <Label htmlFor="eventDate">Data evenimentului</Label>
                <div className="relative">
                  <Input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="link">Link</Label>
                <div className="relative">
                  <Input
                    id="link"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    placeholder="Link către eveniment (opțional)"
                    className="pl-10"
                  />
                  <Link2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="imageUrl">URL Imagine</Label>
                <div className="relative">
                  <Input
                    id="imageUrl"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                    placeholder="URL către imagine (opțional)"
                    className="pl-10"
                  />
                  <ImageIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descriere</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Descrierea evenimentului (opțional)"
                  rows={5}
                />
              </div>
            </div>

            <div>
              <Label>Previzualizare imagine</Label>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {imagePreview ? (
                    <div className="relative aspect-video w-full">
                      <Image
                        src={imagePreview || '/placeholder.svg'}
                        alt="Previzualizare imagine"
                        fill
                        className="object-cover"
                        onError={() => {
                          toast({
                            title: 'Eroare',
                            description:
                              'Nu s-a putut încărca imaginea. Verificați URL-ul.',
                            variant: 'destructive',
                          });
                          setImagePreview(null);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-200 dark:bg-gray-700 aspect-video w-full flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        Fără imagine
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Anulează
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {eveniment ? 'Actualizează' : 'Adaugă'} Eveniment
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
