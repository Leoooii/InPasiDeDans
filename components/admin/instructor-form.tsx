'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import type { Instructor } from '@/app/admin/instructori/page';

// Schema de validare pentru formular
const instructorSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Numele trebuie să aibă cel puțin 2 caractere' }),
  role: z
    .string()
    .min(2, { message: 'Rolul trebuie să aibă cel puțin 2 caractere' }),
  bio: z
    .string()
    .min(10, { message: 'Biografia trebuie să aibă cel puțin 10 caractere' }),
  imageUrl: z
    .string()
    .url({ message: 'Introduceți un URL valid pentru imagine' }),
  facebookUrl: z
    .string()
    .url({ message: 'Introduceți un URL valid pentru Facebook' })
    .optional()
    .or(z.literal('')),
  instagramUrl: z
    .string()
    .url({ message: 'Introduceți un URL valid pentru Instagram' })
    .optional()
    .or(z.literal('')),
  youtubeUrl: z
    .string()
    .url({ message: 'Introduceți un URL valid pentru YouTube' })
    .optional()
    .or(z.literal('')),
  order: z.coerce.number().int().positive().optional(),
});

type InstructorFormValues = z.infer<typeof instructorSchema>;

interface InstructorFormProps {
  instructor: Instructor | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function InstructorForm({
  instructor,
  onSuccess,
  onCancel,
}: InstructorFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Inițializăm formularul
  const form = useForm<InstructorFormValues>({
    resolver: zodResolver(instructorSchema),
    defaultValues: {
      name: '',
      role: '',
      bio: '',
      imageUrl: '',
      facebookUrl: '',
      instagramUrl: '',
      youtubeUrl: '',
      order: 0,
    },
  });

  // Actualizăm valorile formularului când se schimbă instructorul selectat
  useEffect(() => {
    if (instructor) {
      form.reset({
        name: instructor.name,
        role: instructor.role,
        bio: instructor.bio,
        imageUrl: instructor.imageUrl,
        facebookUrl: instructor.facebookUrl || '',
        instagramUrl: instructor.instagramUrl || '',
        youtubeUrl: instructor.youtubeUrl || '',
        order: instructor.order || 0,
      });
      setImagePreview(instructor.imageUrl);
    } else {
      form.reset({
        name: '',
        role: '',
        bio: '',
        imageUrl: '',
        facebookUrl: '',
        instagramUrl: '',
        youtubeUrl: '',
        order: 0,
      });
      setImagePreview(null);
    }
  }, [instructor, form]);

  // Actualizăm previzualizarea imaginii când se schimbă URL-ul
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'imageUrl' && value.imageUrl) {
        setImagePreview(value.imageUrl as string);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Funcție pentru a trimite formularul
  const onSubmit = async (data: InstructorFormValues) => {
    setIsSubmitting(true);
    try {
      const url = instructor
        ? `/api/instructori/${instructor.id}`
        : '/api/instructori';
      const method = instructor ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          createdAt: instructor?.createdAt || Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error('Eroare la salvarea instructorului');
      }

      onSuccess();
    } catch (error) {
      console.error('Eroare:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nume</FormLabel>
                  <FormControl>
                    <Input placeholder="Nume instructor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol / Poziție</FormLabel>
                  <FormControl>
                    <Input placeholder="Rol instructor" {...field} />
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
                        className="rounded-r-none"
                      />
                      <div className="bg-muted flex items-center px-3 rounded-r-md border border-l-0 border-input">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ordine afișare</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Facebook (opțional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://facebook.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagramUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Instagram (opțional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtubeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link YouTube (opțional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biografie</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descriere instructor"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {imagePreview && (
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm font-medium mb-2">
                    Previzualizare imagine:
                  </p>
                  <div className="relative h-[300px] w-full overflow-hidden rounded-md border">
                    <Image
                      src={imagePreview || '/placeholder.svg'}
                      alt="Previzualizare"
                      fill
                      className="object-cover"
                      onError={() => setImagePreview(null)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Anulează
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {instructor ? 'Actualizează' : 'Adaugă'} Instructor
          </Button>
        </div>
      </form>
    </Form>
  );
}
