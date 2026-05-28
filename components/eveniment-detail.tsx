'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Facebook,
  Link2,
  Loader2,
  Share2,
  Sparkles,
  ExternalLink,
  Check,
  CalendarDays,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type EvenimentDetail = {
  id: string;
  slug: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  date: string;
  eventDate: string | null;
};

type Props = {
  kind: 'eveniment' | 'noutate';
  initialSlug: string;
  initialItem?: EvenimentDetail | null;
};

const SITE_URL = 'https://www.inpasidedans.ro';

function formatDateLong(value: string | null) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatTime(value: string | null) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleTimeString('ro-RO', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function renderRichText(text: string) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split('\n').map((paragraph, pIdx) => {
    if (!paragraph.trim()) return <br key={`br-${pIdx}`} />;
    const parts = paragraph.split(urlRegex);
    return (
      <p key={pIdx} className="mb-4 last:mb-0">
        {parts.map((part, i) =>
          urlRegex.test(part) ? (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 underline decoration-orange-300 underline-offset-2 hover:text-orange-700 hover:decoration-orange-500 transition-colors"
            >
              {part}
            </a>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
    );
  });
}

export default function EvenimentDetail({ kind, initialSlug, initialItem }: Props) {
  const [item, setItem] = useState<EvenimentDetail | null>(initialItem ?? null);
  const [related, setRelated] = useState<EvenimentDetail[]>([]);
  const [loading, setLoading] = useState(!initialItem);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const listingHref = kind === 'eveniment' ? '/evenimente' : '/noutati';
  const listingLabel = kind === 'eveniment' ? 'Evenimente' : 'Noutăți';

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        let current = initialItem;

        if (!current) {
          const res = await fetch(`/api/evenimente/by-slug/${initialSlug}`, {
            cache: 'no-store',
          });
          if (!res.ok) {
            if (!cancelled) setNotFound(true);
            return;
          }
          current = (await res.json()) as EvenimentDetail;
          if (!cancelled) setItem(current);
        }

        if (!current) return;

        const listRes = await fetch('/api/evenimente', { cache: 'no-store' });
        if (listRes.ok) {
          const all = (await listRes.json()) as EvenimentDetail[];
          const others = all
            .filter(x => x.id !== current!.id && x.slug)
            .slice(0, 3);
          if (!cancelled) setRelated(others);
        }
      } catch (err) {
        console.error('Eroare la încărcarea detaliilor:', err);
        if (!cancelled && !initialItem) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [initialSlug, initialItem]);

  useEffect(() => {
    if (typeof window !== 'undefined' && item) {
      const path = item.eventDate ? '/evenimente' : '/noutati';
      setShareUrl(`${SITE_URL}${path}/${item.slug}`);
    }
  }, [item]);

  const copyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-orange-500" />
          <p className="mt-4 text-white/70">Se încarcă...</p>
        </div>
      </div>
    );
  }

  if (notFound || !item) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4">
        <div className="max-w-md text-center text-white">
          <div className="mb-6 inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 ring-1 ring-orange-500/30">
            <Sparkles className="h-10 w-10 text-orange-400" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Nu am găsit această pagină</h1>
          <p className="text-white/70 mb-6">
            Articolul căutat nu există sau a fost mutat. Verifică linkul sau revino la
            listă.
          </p>
          <Link href={listingHref}>
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Înapoi la {listingLabel.toLowerCase()}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isEvent = Boolean(item.eventDate);
  const typeLabel = isEvent ? 'Eveniment' : 'Noutate';

  const shareText = encodeURIComponent(
    item.title ? `${item.title} – In Pași de Dans` : 'Vezi această noutate'
  );
  const encodedUrl = encodeURIComponent(shareUrl);

  const jsonLd = isEvent
    ? {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: item.title,
        description: item.description,
        startDate: item.eventDate,
        image: item.imageUrl ? [item.imageUrl] : undefined,
        url: shareUrl,
        eventStatus: 'https://schema.org/EventScheduled',
        organizer: {
          '@type': 'Organization',
          name: 'In Pași de Dans',
          url: SITE_URL,
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: item.title,
        description: item.description,
        datePublished: item.date,
        image: item.imageUrl ? [item.imageUrl] : undefined,
        url: shareUrl,
        publisher: {
          '@type': 'Organization',
          name: 'In Pași de Dans',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/images/logo.png`,
          },
        },
      };

  return (
    <article className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO — fundal blurat full-bleed, imagine completă deasupra */}
      <header className="relative isolate overflow-hidden">
        {/* Backdrop blurred (umple ecranul, intentionat decupat) */}
        <div className="absolute inset-0">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt=""
              fill
              priority
              aria-hidden="true"
              className="object-cover scale-110 blur-2xl opacity-50"
              sizes="100vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.35),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(239,68,68,0.4),transparent_55%),linear-gradient(135deg,#1e293b,#0f172a)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-slate-950" />

          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl animate-pulse" />
          <div
            className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-red-600/20 blur-3xl animate-pulse"
            style={{ animationDelay: '1.5s' }}
          />
        </div>

        {/* Floating nav */}
        <nav className="relative z-10 px-4 md:px-8 pt-6 flex items-center justify-between">
          <Link
            href={listingHref}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-sm font-medium text-white border border-white/15 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {listingLabel}
          </Link>

          <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-xs text-white/80 border border-white/15">
            <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
            <span>/</span>
            <Link href={listingHref} className="hover:text-white transition-colors">
              {listingLabel}
            </Link>
            <span>/</span>
            <span className="text-white truncate max-w-[180px]">
              {item.title || 'Detalii'}
            </span>
          </div>
        </nav>

        {/* Conținut hero: text + poza completă */}
        <div className="relative z-10 px-4 md:px-8 pt-10 md:pt-14 pb-14 md:pb-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,520px)] gap-10 lg:gap-14 items-center">
            {/* Text */}
            <div>
              <div
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5 shadow-lg shadow-black/30 backdrop-blur-sm',
                  isEvent
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                    : 'bg-white/15 border border-white/25 text-white'
                )}
              >
                <Sparkles className="h-3.5 w-3.5" />
                {typeLabel}
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight drop-shadow-2xl">
                {item.title || 'Fără titlu'}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm md:text-base text-white/85">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3 py-1.5 border border-white/15">
                  <Clock className="h-4 w-4" />
                  Publicat {formatDateLong(item.date)}
                </span>
                {isEvent && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/20 backdrop-blur-md px-3 py-1.5 border border-orange-400/40 text-orange-100">
                    <CalendarDays className="h-4 w-4" />
                    Eveniment pe {formatDateLong(item.eventDate)}
                  </span>
                )}
              </div>
            </div>

            {/* Imagine completă în ramă cu glow */}
            {item.imageUrl && (
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-orange-400/40 via-red-500/30 to-pink-500/40 blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl shadow-black/60 bg-slate-950">
                  <img
                    src={item.imageUrl}
                    alt={item.title || typeLabel}
                    className="w-full h-auto max-h-[70vh] object-contain bg-slate-950"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* BODY */}
      <section className="relative px-4 md:px-8 -mt-8 md:-mt-12 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12">
          {/* Main */}
          <div className="relative rounded-3xl bg-gradient-to-br from-white via-white to-orange-50 text-slate-900 shadow-2xl shadow-black/40 ring-1 ring-white/10 p-6 md:p-10">
            <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent" />

            {item.description ? (
              <div className="prose prose-slate max-w-none text-base md:text-lg leading-relaxed">
                {renderRichText(item.description)}
              </div>
            ) : (
              <p className="text-slate-500 italic">
                Pentru această noutate nu există o descriere detaliată. Verifică linkul
                de mai jos sau contactează-ne pentru mai multe informații.
              </p>
            )}

            {item.link && (
              <div className="mt-8 pt-8 border-t border-slate-200">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 px-6 py-3.5 text-white font-semibold shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5"
                >
                  Vezi mai multe detalii
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 self-start space-y-5">
            {/* Share card */}
            <div className="rounded-3xl bg-white/[0.04] backdrop-blur-xl ring-1 ring-white/10 p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <Share2 className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-base font-bold">Distribuie</h3>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Distribuie pe Facebook"
                  className="group flex flex-col items-center gap-1.5 rounded-xl bg-white/[0.03] hover:bg-[#1877F2]/20 ring-1 ring-white/10 hover:ring-[#1877F2]/40 px-3 py-3 transition-all"
                >
                  <Facebook className="h-5 w-5 text-white group-hover:text-[#5599FF] transition-colors" />
                  <span className="text-[10px] text-white/70 group-hover:text-white">Facebook</span>
                </a>
                <a
                  href={`https://wa.me/?text=${shareText}%20${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Distribuie pe WhatsApp"
                  className="group flex flex-col items-center gap-1.5 rounded-xl bg-white/[0.03] hover:bg-[#25D366]/20 ring-1 ring-white/10 hover:ring-[#25D366]/40 px-3 py-3 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-white group-hover:text-[#25D366] transition-colors" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.711.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="text-[10px] text-white/70 group-hover:text-white">WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={copyLink}
                  aria-label="Copiază linkul"
                  className="group flex flex-col items-center gap-1.5 rounded-xl bg-white/[0.03] hover:bg-orange-500/20 ring-1 ring-white/10 hover:ring-orange-500/40 px-3 py-3 transition-all"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Link2 className="h-5 w-5 text-white group-hover:text-orange-300 transition-colors" />
                  )}
                  <span className="text-[10px] text-white/70 group-hover:text-white">
                    {copied ? 'Copiat!' : 'Copy link'}
                  </span>
                </button>
              </div>
            </div>

            {/* Event date card */}
            {isEvent && (
              <div className="relative overflow-hidden rounded-3xl p-px bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 shadow-2xl shadow-orange-500/20">
                <div className="rounded-[calc(1.5rem-1px)] bg-slate-950 p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-orange-300 mb-3">
                    <Calendar className="h-3.5 w-3.5" />
                    Data evenimentului
                  </div>
                  <div className="text-3xl font-black text-white leading-tight">
                    {formatDateLong(item.eventDate)}
                  </div>
                  {formatTime(item.eventDate) !== '00:00' && (
                    <div className="mt-1 text-sm text-white/60">
                      ora {formatTime(item.eventDate)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA card */}
            <div className="rounded-3xl bg-white/[0.04] backdrop-blur-xl ring-1 ring-white/10 p-6">
              <h3 className="font-bold text-white mb-2">Vrei să dansezi cu noi?</h3>
              <p className="text-sm text-white/70 mb-4">
                Rezervă un loc la o lecție introductivă sau scrie-ne pentru detalii.
              </p>
              <Link href="/contact">
                <Button className="w-full bg-white text-slate-900 hover:bg-orange-50 font-semibold">
                  Contactează-ne
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="border-t border-white/10 px-4 md:px-8 py-16 bg-black/40">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Și alte noutăți</h2>
                <p className="text-white/60 mt-1">
                  Mai multe articole din comunitatea noastră
                </p>
              </div>
              <Link
                href={listingHref}
                className="hidden sm:inline-flex items-center gap-2 text-sm text-orange-300 hover:text-orange-200 transition-colors"
              >
                Vezi tot
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {related.map(r => {
                const targetKind = r.eventDate ? 'evenimente' : 'noutati';
                return (
                  <Link
                    key={r.id}
                    href={`/${targetKind}/${r.slug}`}
                    className="group rounded-2xl overflow-hidden bg-white/[0.04] ring-1 ring-white/10 hover:ring-orange-400/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/20"
                  >
                    <div className="relative h-44 bg-slate-800">
                      {r.imageUrl ? (
                        <Image
                          src={r.imageUrl}
                          alt={r.title || 'Noutate'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-700/30" />
                      )}
                      <div className="absolute top-3 left-3">
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm',
                            r.eventDate
                              ? 'bg-orange-500/90 text-white'
                              : 'bg-white/15 text-white border border-white/20'
                          )}
                        >
                          {r.eventDate ? 'Eveniment' : 'Noutate'}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-white/50 mb-1.5">
                        {formatDateLong(r.date)}
                      </div>
                      <h3 className="font-semibold text-white line-clamp-2 group-hover:text-orange-300 transition-colors">
                        {r.title || 'Fără titlu'}
                      </h3>
                      {r.description && (
                        <p className="text-sm text-white/60 line-clamp-2 mt-2">
                          {r.description}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
