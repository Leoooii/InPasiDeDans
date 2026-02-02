'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';

interface PetrecereDetaliu {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  facebookLink: string;
  imageUrl: string;
  isUpcoming: boolean;
  badge?: string;
  createdAt: number;
  mapEmbed?: string;
}

export default function PetrecereDetaliuPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [petrecere, setPetrecere] = useState<PetrecereDetaliu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const id = params?.id;

  useEffect(() => {
    if (!id) return;

    const fetchPetrecere = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/petreceri/${id}`);

        if (!res.ok) {
          if (res.status === 404) {
            setError('Petrecerea nu a fost găsită.');
          } else {
            setError('A apărut o eroare la încărcarea petrecerii.');
          }
          return;
        }

        const data = (await res.json()) as PetrecereDetaliu;
        setPetrecere(data);
      } catch (err) {
        console.error('Eroare la încărcarea petrecerii:', err);
        setError('A apărut o eroare la încărcarea petrecerii.');
      } finally {
        setLoading(false);
      }
    };

    void fetchPetrecere();
  }, [id]);

  const breadcrumbItems = [
    { name: 'Acasă', url: '/' },
    { name: 'Petreceri', url: '/petreceri' },
    { name: petrecere?.title || 'Detalii petrecere' },
  ];

  const canonicalUrl = `https://www.inpasidedans.ro/petreceri/${id}`;
  const seoTitle = petrecere
    ? `${petrecere.title} | Petreceri În Pași de Dans`
    : 'Detalii petrecere | În Pași de Dans';
  const seoDescription =
    (petrecere?.description && petrecere.description.slice(0, 155)) ||
    'Detalii despre petrecerea organizată de școala de dans În Pași de Dans. Află data, locația și toate informațiile importante.';

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
          <p className="mt-4 text-gray-500">Se încarcă detaliile petrecerii...</p>
        </div>
      </div>
    );
  }

  if (error || !petrecere) {
    return (
      <div className="container py-12 max-w-3xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push('/petreceri')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Înapoi la petreceri
        </Button>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-red-700 mb-2">
              Petrecerea nu a fost găsită
            </h1>
            <p className="text-red-600">
              {error ||
                'Este posibil ca această petrecere să fi fost ștearsă sau link-ul să fie greșit.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="event" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content={petrecere.imageUrl || 'https://www.inpasidedans.ro/images/logo.png'}
        />
        <meta property="og:site_name" content="În Pași de Dans" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta
          name="twitter:image"
          content={petrecere.imageUrl || 'https://www.inpasidedans.ro/images/logo.png'}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: petrecere.title,
              description: petrecere.description,
              url: canonicalUrl,
              startDate: petrecere.date,
              eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
              eventStatus: 'https://schema.org/EventScheduled',
              image: petrecere.imageUrl,
              location: petrecere.location
                ? {
                    '@type': 'Place',
                    name: 'În Pași de Dans',
                    address: petrecere.location,
                  }
                : undefined,
              organizer: {
                '@type': 'Organization',
                name: 'În Pași de Dans',
                url: 'https://www.inpasidedans.ro',
              },
            }),
          }}
        />
      </Head>

      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-black py-10">
        <div className="container space-y-6">
          <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl={canonicalUrl} />

          <Button
            variant="ghost"
            className="mb-2 text-slate-200 hover:text-white"
            onClick={() => router.push('/petreceri')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la petreceri
          </Button>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
            {/* Coloană principală */}
            <div>
              <Card className="overflow-hidden border-red-600 bg-slate-950/70 text-slate-50">
              <div className="relative h-60 lg:h-[400px] w-full overflow-hidden">
                  <Image
                    src={petrecere.imageUrl || '/placeholder.svg'}
                    alt={petrecere.title}
                    fill
                      className="object-cover hover:scale-125 transition-transform duration-300"
                  />
                  {petrecere.badge && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {petrecere.badge}
                    </div>
                  )}
                </div>
                <CardContent className="p-6 space-y-4">
                  <h1 className="text-3xl font-bold mb-2">{petrecere.title}</h1>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-200">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-red-400" />
                      <span>{petrecere.date}</span>
                    </div>
                    {petrecere.time && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-red-400" />
                        <span>{petrecere.time}</span>
                      </div>
                    )}
                    {petrecere.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-red-400" />
                        <span>{petrecere.location}</span>
                      </div>
                    )}
                  </div>

                  {petrecere.description && (
                    <div className="mt-4 text-slate-100 leading-relaxed">
                      <h2 className="text-lg font-semibold mb-2">
                        Despre această petrecere
                      </h2>
                      <p style={{ whiteSpace: 'pre-wrap' }}>{petrecere.description}</p>
                    </div>
                  )}

                  {petrecere.facebookLink && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href={petrecere.facebookLink} target="_blank">
                        <Button className="bg-red-600 hover:bg-red-700">
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
                      <span className="font-medium">Tip eveniment:</span>{' '}
                      {petrecere.isUpcoming ? 'Petrecere viitoare' : 'Petrecere anterioară'}
                    </li>
                    <li>
                      <span className="font-medium">Organizator:</span> În Pași de Dans
                    </li>
                    {petrecere.location && (
                      <li>
                        <span className="font-medium">Locație:</span> {petrecere.location}
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>

              {petrecere.mapEmbed && (
                <Card className="bg-slate-900/80 border-slate-800 text-slate-100">
                  <CardContent className="p-4 space-y-3">
                    <h2 className="text-lg font-semibold">Harta locației</h2>
                    <div
                      className="aspect-video w-full rounded-lg overflow-hidden border border-slate-700 shadow-lg [&>iframe]:w-full [&>iframe]:h-full"
                      dangerouslySetInnerHTML={{ __html: petrecere.mapEmbed }}
                    />
                    <p className="text-xs text-slate-300">
                      Locația este aproximativă, conform adresei introduse pentru această petrecere.
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

