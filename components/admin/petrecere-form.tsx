'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { toast } from '@/components/ui/use-toast';

// Definim schema de validare pentru formular
const petrecereSchema = z.object({
  title: z.string().min(1, 'Titlul este obligatoriu'),
  date: z.string().min(1, 'Data este obligatorie'),
  time: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  facebookLink: z.string().url('Link-ul Facebook trebuie să fie un URL valid'),
  imageUrl: z.string().url('URL-ul imaginii trebuie să fie valid'),
  isUpcoming: z.boolean().default(false),
  badge: z.string().optional(),
});

// Tipul pentru datele formularului
type PetrecereFormValues = z.infer<typeof petrecereSchema>;

// Interfața pentru props
interface PetrecereFormProps {
  petrecere: any | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PetrecereForm({
  petrecere,
  onSuccess,
  onCancel,
}: PetrecereFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Inițializăm formularul
  const form = useForm<PetrecereFormValues>({
    resolver: zodResolver(petrecereSchema),
    defaultValues: {
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      facebookLink: '',
      imageUrl: '',
      isUpcoming: false,
      badge: '',
    },
  });

  // Actualizăm valorile implicite când se schimbă petrecerea selectată
  useEffect(() => {
    if (petrecere) {
      form.reset({
        title: petrecere.title || '',
        date: petrecere.date || '',
        time: petrecere.time || '',
        location: petrecere.location || '',
        description: petrecere.description || '',
        facebookLink: petrecere.facebookLink || '',
        imageUrl: petrecere.imageUrl || '',
        isUpcoming: petrecere.isUpcoming || false,
        badge: petrecere.badge || '',
      });

      if (petrecere.imageUrl) {
        setImagePreview(petrecere.imageUrl);
      }
    } else {
      form.reset({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        facebookLink: '',
        imageUrl: '',
        isUpcoming: false,
        badge: '',
      });
      setImagePreview(null);
    }
  }, [petrecere, form]);

  // Actualizăm previzualizarea imaginii când se schimbă URL-ul
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'imageUrl' && value.imageUrl) {
        setImagePreview(value.imageUrl as string);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Handler pentru trimiterea formularului
  const onSubmit = async (data: PetrecereFormValues) => {
    try {
      setIsSubmitting(true);

      // Adăugăm timestamp-ul de creare
      const petrecereData = {
        ...data,
        createdAt: petrecere?.createdAt || Date.now(),
      };

      // Determinăm metoda și URL-ul în funcție de dacă este o editare sau o adăugare
      const method = petrecere ? 'PUT' : 'POST';
      const url = petrecere
        ? `/api/petreceri/${petrecere.id}`
        : '/api/petreceri';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petrecereData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || 'A apărut o eroare la salvarea petrecerii'
        );
      }

      onSuccess();
    } catch (error: any) {
      console.error('Eroare:', error);
      toast({
        title: 'Eroare',
        description:
          error.message || 'A apărut o eroare la salvarea petrecerii',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
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
                        <Input placeholder="Titlul petrecerii" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: 15 Decembrie 2025" {...field} />
                      </FormControl>
                      <FormDescription>
                        Introduceți data în format text (ex: 15 Decembrie 2025)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ora (opțional)</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: 19:00 - 23:00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Locație (opțional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Locația petrecerii" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="badge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Badge (opțional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: În curând, Locuri limitate"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Text care va apărea ca badge pe imagine (ex: În curând,
                        Locuri limitate)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="facebookLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link Facebook</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.facebook.com/events/..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Imagine</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Input
                            placeholder="https://example.com/image.jpg"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Introduceți URL-ul către imaginea petrecerii
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
                          Petrecere viitoare
                        </FormLabel>
                        <FormDescription>
                          Activați pentru a marca această petrecere ca viitoare
                          și a o afișa în secțiunea "Următoarele petreceri"
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

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descriere (opțional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descrierea petrecerii"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Previzualizare imagine */}
            {imagePreview && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">
                  Previzualizare imagine:
                </h3>
                <div className="relative h-60 w-full md:w-1/2 overflow-hidden rounded-md border">
                  <Image
                    src={imagePreview || '/placeholder.svg'}
                    alt="Previzualizare"
                    fill
                    className="object-cover"
                    onError={() => {
                      setImagePreview(null);
                      toast({
                        title: 'Eroare',
                        description:
                          'Nu s-a putut încărca imaginea. Verificați URL-ul.',
                        variant: 'destructive',
                      });
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Anulează
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {petrecere ? 'Actualizează petrecerea' : 'Adaugă petrecerea'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
