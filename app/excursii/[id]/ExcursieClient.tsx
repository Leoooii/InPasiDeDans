'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Users, MapPin, ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';

export interface ExcursieDetaliu {
  id: string;
  title: string;
  date?: string;
  eventDate: string;
  location?: string;
  spots?: string;
  description?: string;
  facebookLink?: string;
  imageUrl: string;
  isUpcoming: boolean;
  createdAt: number;
  mapEmbed?: string;
}

export default function ExcursieClient({ initial }: { initial?: ExcursieDetaliu | null }) {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [excursie, setExcursie] = useState<ExcursieDetaliu | null>(initial ?? null);
  const [loading, setLoading] = useState(!initial);
  const [error, setError] = useState<string | null>(null);

  const id = params?.id;

  useEffect(() => {
    if (!id || initial) return;

    const fetchExcursie = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/excursii/${id}`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          if (res.status === 404) {
            setError('Excursia nu a fost găsită.');
          } else {
            setError('A apărut o eroare la încărcarea excursiei.');
          }
          return;
        }

        const data = (await res.json()) as ExcursieDetaliu;
        setExcursie(data);
      } catch (err) {
        console.error('Eroare la încărcarea excursiei:', err);
        setError('A apărut o eroare la încărcarea excursiei.');
      } finally {
        setLoading(false);
      }
    };

    void fetchExcursie();
  }, [id, initial]);

  const breadcrumbItems = [
    { name: 'Acasă', url: '/' },
    { name: 'Excursii', url: '/excursii' },
    { name: excursie?.title || 'Detalii excursie' },
  ];

  const canonicalUrl = `https://www.inpasidedans.ro/excursii/${id}`;

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-orange-500" />
          <p className="mt-4 text-gray-500">Se încarcă detaliile excursiei...</p>
        </div>
      </div>
    );
  }

  if (error || !excursie) {
    return (
      <div className="container py-12 max-w-3xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push('/excursii')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Înapoi la excursii
        </Button>
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-orange-700 mb-2">
              Excursia nu a fost găsită
            </h1>
            <p className="text-orange-600">
              {error ||
                'Este posibil ca această excursie să fi fost ștearsă sau link-ul să fie greșit.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>

      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-black py-10">
        <div className="mx-auto w-full max-w-[1400px] px-3 sm:px-6 lg:px-8 space-y-6">
          <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl={canonicalUrl} />

          <Button
            variant="ghost"
            className="mb-2 text-slate-200 hover:text-white"
            onClick={() => router.push('/excursii')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la excursii
          </Button>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
            {/* Coloană principală */}
            <div>
              <Card className="overflow-hidden border-orange-500 bg-slate-950/70 text-slate-50">
                <div className="relative aspect-video lg:aspect-auto lg:h-[400px] w-full overflow-hidden">
                  <Image
                    src={excursie.imageUrl || '/placeholder.svg'}
                    alt={excursie.title}
                    fill
                    className="object-cover hover:scale-125 transition-transform duration-300"
                  />
                  {excursie.spots && (
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      <Users className="h-4 w-4" />
                      {excursie.spots}
                    </div>
                  )}
                </div>
                <CardContent className="p-6 space-y-4">
                  <h1 className="text-3xl font-bold mb-2">{excursie.title}</h1>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-200">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-orange-400" />
                      <span>{excursie.eventDate}</span>
                    </div>
                    {excursie.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-orange-400" />
                        <span>{excursie.location}</span>
                      </div>
                    )}
                    {excursie.spots && (
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-orange-400" />
                        <span>{excursie.spots}</span>
                      </div>
                    )}
                  </div>

                  {excursie.description && (
                    <div className="mt-4 text-slate-100 leading-relaxed">
                      <h2 className="text-lg font-semibold mb-2">
                        Despre această excursie
                      </h2>
                      <p style={{ whiteSpace: 'pre-wrap' }}>{excursie.description}</p>
                    </div>
                  )}

                  {excursie.facebookLink && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href={excursie.facebookLink} target="_blank">
                        <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                          Vezi evenimentul pe Facebook
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Coloană laterală: informații rapide + hartă */}
            <div className="space-y-4">
              <Card className="bg-slate-900/80 border-slate-800 text-slate-100">
                <CardContent className="p-6 space-y-3">
                  <h2 className="text-lg font-semibold">Informații rapide</h2>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <span className="font-medium">Tip:</span>{' '}
                      {excursie.isUpcoming ? 'Excursie viitoare' : 'Excursie anterioară'}
                    </li>
                    <li>
                      <span className="font-medium">Dată:</span> {excursie.eventDate}
                    </li>
                    <li>
                      <span className="font-medium">Organizator:</span> În Pași de Dans
                    </li>
                    {excursie.location && (
                      <li>
                        <span className="font-medium">Destinație:</span> {excursie.location}
                      </li>
                    )}
                    {excursie.spots && (
                      <li>
                        <span className="font-medium">Locuri:</span> {excursie.spots}
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>

              {excursie.mapEmbed && (
                <Card className="bg-slate-900/80 border-slate-800 text-slate-100">
                  <CardContent className="p-4 space-y-3">
                    <h2 className="text-lg font-semibold">Harta destinației</h2>
                    <div
                      className="aspect-video w-full rounded-lg overflow-hidden border border-slate-700 shadow-lg [&>iframe]:w-full [&>iframe]:h-full"
                      dangerouslySetInnerHTML={{ __html: excursie.mapEmbed }}
                    />
                    <p className="text-xs text-slate-300">
                      Locația este aproximativă, conform adresei introduse pentru această excursie.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
