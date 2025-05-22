'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { Loader2, Calendar, LinkIcon, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import type { Excursie } from '@/app/admin/excursii/page';

// Schema de validare pentru formular
const formSchema = z.object({
  title: z.string().min(1, 'Titlul este obligatoriu'),
  date: z.string().optional(),
  eventDate: z.string().min(1, 'Data excursiei este obligatorie'),
  location: z.string().optional(),
  spots: z.string().optional(),
  description: z.string().optional(),
  facebookLink: z
    .string()
    .url('Link-ul trebuie să fie valid')
    .optional()
    .or(z.literal('')),
  imageUrl: z
    .string()
    .url('URL-ul imaginii trebuie să fie valid')
    .min(1, 'URL-ul imaginii este obligatoriu'),
  isUpcoming: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface ExcursieFormProps {
  excursie: Excursie | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ExcursieForm({
  excursie,
  onSuccess,
  onCancel,
}: ExcursieFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Inițializăm formularul
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: '',
      eventDate: '',
      location: '',
      spots: '',
      description: '',
      facebookLink: '',
      imageUrl: '',
      isUpcoming: false,
    },
  });

  // Actualizăm valorile formularului când se schimbă excursia selectată
  useEffect(() => {
    if (excursie) {
      form.reset({
        title: excursie.title || '',
        date: excursie.date || '',
        eventDate: excursie.eventDate || '',
        location: excursie.location || '',
        spots: excursie.spots || '',
        description: excursie.description || '',
        facebookLink: excursie.facebookLink || '',
        imageUrl: excursie.imageUrl || '',
        isUpcoming: excursie.isUpcoming || false,
      });

      if (excursie.imageUrl) {
        setImagePreview(excursie.imageUrl);
      }
    } else {
      form.reset({
        title: '',
        date: '',
        eventDate: '',
        location: '',
        spots: '',
        description: '',
        facebookLink: '',
        imageUrl: '',
        isUpcoming: false,
      });
      setImagePreview(null);
    }
  }, [excursie, form]);

  // Funcție pentru a actualiza previzualizarea imaginii când se schimbă URL-ul
  const handleImageUrlChange = (url: string) => {
    setImagePreview(url);
  };

  // Funcție pentru a salva excursia
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const excursieData = {
        ...data,
        createdAt: excursie?.createdAt || Date.now(),
        updatedAt: Date.now(),
      };

      if (excursie?.id) {
        // Actualizăm o excursie existentă
        await setDoc(doc(db, 'excursii', excursie.id), excursieData, {
          merge: true,
        });
      } else {
        // Adăugăm o excursie nouă
        await addDoc(collection(db, 'excursii'), excursieData);
      }

      onSuccess();
    } catch (error) {
      console.error('Eroare la salvarea excursiei:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titlu</FormLabel>
                    <FormControl>
                      <Input placeholder="Titlul excursiei" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data excursiei</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        <Input
                          placeholder="ex: 5-7 Septembrie 2025"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Introduceți perioada excursiei (ex: 5-7 Septembrie 2025)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Locație</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex: Mahmudia, Delta Dunării"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="spots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Locuri disponibile</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: 77 locuri" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebookLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link Facebook</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <LinkIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <Input
                          placeholder="https://www.facebook.com/..."
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Link către postarea sau evenimentul de pe Facebook
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isUpcoming"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Excursie viitoare
                      </FormLabel>
                      <FormDescription>
                        Activați pentru a afișa această excursie în secțiunea
                        "Următoarele excursii"
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Imagine</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <ImageIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                          onChange={e => {
                            field.onChange(e);
                            handleImageUrlChange(e.target.value);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Introduceți URL-ul imaginii de copertă
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Previzualizare imagine */}
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">
                  Previzualizare imagine
                </p>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    {imagePreview ? (
                      <div className="relative h-60 w-full">
                        <img
                          src={imagePreview || '/placeholder.svg'}
                          alt="Previzualizare"
                          className="w-full h-full object-cover"
                          onError={() => setImagePreview(null)}
                        />
                      </div>
                    ) : (
                      <div className="h-60 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <p className="text-gray-500 dark:text-gray-400">
                          Introduceți un URL valid pentru a vedea
                          previzualizarea
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descriere</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descrierea excursiei..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
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
              {excursie ? 'Actualizează excursia' : 'Adaugă excursia'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
