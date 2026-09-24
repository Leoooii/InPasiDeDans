'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Loader2, type LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';

// Pagina de detaliu comună pentru petreceri și excursii.

type Accent = 'rosu' | 'portocaliu';

const ACCENT: Record<Accent, { card: string; icon: string; spinner: string; eroare: string; eroareTitlu: string; eroareText: string }> = {
  rosu: {
    card: 'border-red-600',
    icon: 'text-red-400',
    spinner: 'text-red-600',
    eroare: 'border-red-200 bg-red-50',
    eroareTitlu: 'text-red-700',
    eroareText: 'text-red-600',
  },
  portocaliu: {
    card: 'border-orange-500',
    icon: 'text-orange-400',
    spinner: 'text-orange-500',
    eroare: 'border-orange-200 bg-orange-50',
    eroareTitlu: 'text-orange-700',
    eroareText: 'text-orange-600',
  },
};

export type TextePagina = {
  /** segmentul din URL, ex. „petreceri" */
  colectie: string;
  /** „Petreceri" — în breadcrumbs */
  titluListing: string;
  /** „petrecere" / „excursie" */
  singular: string;
  /** „petrecerii" / „excursiei" */
  genitiv: string;
  /** „Petrecerea" / „Excursia" */
  articulat: string;
  /** „această petrecere" / „această excursie" */
  demonstrativ: string;
  accent: Accent;
  titluHarta: string;
};

/** Datele încărcate pe server (`initial`), altfel citite din /api/<colectie>/<id>. */
export function useDetaliu<T>(initial: T | null | undefined, t: TextePagina) {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [item, setItem] = useState<T | null>(initial ?? null);
  const [loading, setLoading] = useState(!initial);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || initial) return;

    const incarca = async () => {
      const mesajEroare = `A apărut o eroare la încărcarea ${t.genitiv}.`;
      try {
        setLoading(true);
        const res = await fetch(`/api/${t.colectie}/${id}`, { cache: 'no-store' });
        if (!res.ok) {
          setError(res.status === 404 ? `${t.articulat} nu a fost găsită.` : mesajEroare);
          return;
        }
        setItem((await res.json()) as T);
      } catch (err) {
        console.error(`Eroare la încărcarea ${t.genitiv}:`, err);
        setError(mesajEroare);
      } finally {
        setLoading(false);
      }
    };

    void incarca();
  }, [id, initial, t]);

  return { id, item, loading, error };
}

type Props = {
  t: TextePagina;
  id?: string;
  loading: boolean;
  error: string | null;
  continut: null | {
    title: string;
    imageUrl: string;
    badge?: React.ReactNode;
    meta: { icon: LucideIcon; text: string }[];
    description?: string;
    facebookLink?: string;
    infoRapide: [string, string][];
    mapEmbed?: string;
  };
};

export default function DetaliuActivitate({ t, id, loading, error, continut }: Props) {
  const router = useRouter();
  const a = ACCENT[t.accent];
  const inapoi = () => router.push(`/${t.colectie}`);

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className={`h-12 w-12 animate-spin mx-auto ${a.spinner}`} />
          <p className="mt-4 text-slate-500">Se încarcă detaliile {t.genitiv}...</p>
        </div>
      </div>
    );
  }

  if (error || !continut) {
    return (
      <div className="container py-12 max-w-3xl">
        <Button variant="ghost" className="mb-6" onClick={inapoi}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Înapoi la {t.colectie}
        </Button>
        <Card className={a.eroare}>
          <CardContent className="p-6">
            <h1 className={`text-2xl font-bold mb-2 ${a.eroareTitlu}`}>{t.articulat} nu a fost găsită</h1>
            <p className={a.eroareText}>
              {error || `Este posibil ca ${t.demonstrativ} să fi fost ștearsă sau link-ul să fie greșit.`}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: 'Acasă', url: '/' },
    { name: t.titluListing, url: `/${t.colectie}` },
    { name: continut.title || `Detalii ${t.singular}` },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-black py-10">
      <div className="mx-auto w-full max-w-[1400px] px-3 sm:px-6 lg:px-8 space-y-6">
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl={`https://www.inpasidedans.ro/${t.colectie}/${id}`} />

        <Button variant="ghost" className="mb-2 text-slate-200 hover:text-white" onClick={inapoi}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Înapoi la {t.colectie}
        </Button>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          {/* Coloană principală */}
          <div>
            <Card className={`overflow-hidden bg-slate-950/70 text-slate-50 ${a.card}`}>
              <div className="relative aspect-video lg:aspect-auto lg:h-[400px] w-full overflow-hidden">
                <Image
                  src={continut.imageUrl || '/placeholder.svg'}
                  alt={continut.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover hover:scale-125 transition-transform duration-300"
                />
                {continut.badge}
              </div>
              <CardContent className="p-6 space-y-4">
                <h1 className="text-3xl font-bold mb-2">{continut.title}</h1>

                <div className="flex flex-wrap gap-4 text-sm text-slate-200">
                  {continut.meta.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center">
                      <Icon className={`w-4 h-4 mr-2 ${a.icon}`} />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                {continut.description && (
                  <div className="mt-4 text-slate-100 leading-relaxed">
                    <h2 className="text-lg font-semibold mb-2">Despre {t.demonstrativ}</h2>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{continut.description}</p>
                  </div>
                )}

                {continut.facebookLink && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button variant="brand" asChild>
                      <Link href={continut.facebookLink} target="_blank">
                        Vezi evenimentul pe Facebook
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
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
                  {continut.infoRapide.map(([eticheta, valoare]) => (
                    <li key={eticheta}>
                      <span className="font-medium">{eticheta}:</span> {valoare}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {continut.mapEmbed && (
              <Card className="bg-slate-900/80 border-slate-800 text-slate-100">
                <CardContent className="p-4 space-y-3">
                  <h2 className="text-lg font-semibold">{t.titluHarta}</h2>
                  <div
                    className="aspect-video w-full rounded-lg overflow-hidden border border-slate-700 shadow-lg [&>iframe]:w-full [&>iframe]:h-full"
                    dangerouslySetInnerHTML={{ __html: continut.mapEmbed }}
                  />
                  <p className="text-xs text-slate-300">
                    Locația este aproximativă, conform adresei introduse pentru {t.demonstrativ}.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
