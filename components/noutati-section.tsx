'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Calendar, ArrowRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

type Eveniment = {
  id: string;
  date: Date;
  eventDate?: Date | null;
  title?: string;
  description?: string;
  link?: string;
  imageUrl?: string;
  location?: string;
  slug?: string;
};

type NoutatiSectionProps = {
  itemsToShow?: number;
  variant?: 'default' | 'homepage';
  showFilters?: boolean;
  featuredFirst?: boolean;
};

type Filter = 'all' | 'events' | 'news';

export default function NoutatiSection({
  itemsToShow,
  variant = 'default',
  showFilters = false,
  featuredFirst = false,
}: NoutatiSectionProps) {
  const [evenimente, setEvenimente] = useState<Eveniment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const lastDoc = useRef<QueryDocumentSnapshot<DocumentData> | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = itemsToShow || 5;

  const fetchEvenimente = async (isInitial = false) => {
    try {
      const evenimenteRef = collection(db, 'evenimente');
      let q = query(
        evenimenteRef,
        orderBy('date', 'desc'),
        limit(ITEMS_PER_PAGE)
      );

      if (!isInitial && lastDoc.current && !itemsToShow) {
        q = query(
          evenimenteRef,
          orderBy('date', 'desc'),
          startAfter(lastDoc.current),
          limit(ITEMS_PER_PAGE)
        );
      }

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setHasMore(false);
        return;
      }

      lastDoc.current = snapshot.docs[snapshot.docs.length - 1];

      const evenimenteData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          date: data.date?.toDate() || new Date(),
          eventDate: data.eventDate?.toDate() || null,
          title: data.title || '',
          description: data.description || '',
          link: data.link || '',
          imageUrl: data.imageUrl || '',
          location: data.location || '',
          slug: data.slug || '',
        } as Eveniment;
      });

      if (isInitial) {
        setEvenimente(evenimenteData);
      } else {
        setEvenimente(prev => [...prev, ...evenimenteData]);
      }

      setHasMore(snapshot.docs.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Eroare la încărcarea evenimentelor:', error);
    }
  };

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || itemsToShow) return;

    setLoadingMore(true);
    await fetchEvenimente(false);
    setLoadingMore(false);
  }, [loadingMore, hasMore, itemsToShow]);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await fetchEvenimente(true);
      setLoading(false);
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (loading || itemsToShow) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore, loadMore, itemsToShow]);

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date | null | undefined) => {
    if (!date) return '';
    return date.toLocaleTimeString('ro-RO', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isHomepage = variant === 'homepage';

  if (loading) {
    return (
              <div className="w-full flex justify-center py-16">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
            <p className={cn('mt-4', isHomepage ? 'text-slate-600' : 'text-white/70')}>
              Se încarcă noutățile...
            </p>
          </div>
        </div>
    );
  }

  const filtered = evenimente.filter(e => {
    if (filter === 'events') return Boolean(e.eventDate);
    if (filter === 'news') return !e.eventDate;
    return true;
  });

  const visible = filtered.slice(0, itemsToShow);
  const [featured, ...rest] = visible;
  const useFeatured = featuredFirst && featured && !itemsToShow;

  const filterTabs: { key: Filter; label: string; count: number }[] = [
    { key: 'all', label: 'Toate', count: evenimente.length },
    { key: 'events', label: 'Evenimente', count: evenimente.filter(e => e.eventDate).length },
    { key: 'news', label: 'Noutăți', count: evenimente.filter(e => !e.eventDate).length },
  ];

  return (
    <div className="w-full">
      {showFilters && evenimente.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {filterTabs.map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all border',
                filter === tab.key
                  ? isHomepage
                    ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white border-transparent shadow-md shadow-orange-500/30'
                    : 'bg-gradient-to-r from-red-600 to-orange-500 text-white border-transparent shadow-md shadow-orange-500/30'
                  : isHomepage
                    ? 'bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:text-orange-600'
                    : 'bg-white/5 text-white/80 border-white/15 hover:bg-white/10 hover:border-white/30'
              )}
            >
              {tab.label}
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-xs',
                  filter === tab.key ? 'bg-white/25' : isHomepage ? 'bg-slate-100' : 'bg-white/10'
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className={cn(
          'text-center py-16 rounded-2xl border border-dashed',
          isHomepage ? 'border-slate-200 bg-slate-50/50' : 'border-white/10 bg-white/[0.02]'
        )}>
          <p className={cn('text-base', isHomepage ? 'text-slate-600' : 'text-white/70')}>
            {evenimente.length === 0
              ? 'Nu există articole publicate momentan.'
              : 'Nu există articole în această categorie.'}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {useFeatured && <FeaturedCard item={featured!} isHomepage={isHomepage} formatDate={formatDate} />}

          <div className="grid md:grid-cols-3 gap-6">
            {(useFeatured ? rest : visible).map(eveniment => {
              const targetKind = eveniment.eventDate ? 'evenimente' : 'noutati';
              const hasDetailPage = Boolean(eveniment.slug);
              const detailHref = hasDetailPage ? `/${targetKind}/${eveniment.slug}` : null;

              const cardInner = (
                <>
                  {/* Imagine */}
                  <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0">
                    {eveniment.imageUrl ? (
                      <Image
                        src={eveniment.imageUrl}
                        alt={eveniment.title || 'Eveniment In Pasi de Dans'}
                        fill
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-200 to-pink-300 flex items-center justify-center">
                        <span className="text-slate-500 text-sm">Imagine în curând</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={cn(
                        'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
                        eveniment.eventDate
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-800/80 text-white backdrop-blur-sm'
                      )}>
                        {eveniment.eventDate ? 'Eveniment' : 'Noutate'}
                      </span>
                    </div>
                  </div>

                  {/* Conținut */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className={cn('text-xs mb-2', isHomepage ? 'text-slate-400' : 'text-white/50')}>
                      {formatDate(eveniment.date)}
                    </p>

                    {eveniment.title && (
                      <h3 className={cn(
                        'font-semibold text-base mb-2 line-clamp-2 transition-colors',
                        isHomepage
                          ? 'text-slate-900 group-hover:text-orange-600'
                          : 'text-white group-hover:text-orange-300'
                      )}>
                        {eveniment.title}
                      </h3>
                    )}

                    {eveniment.eventDate && (
                      <div className="flex items-center gap-1.5 text-sm mb-3">
                        <Calendar className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                        <span className={cn('font-medium text-xs', isHomepage ? 'text-slate-700' : 'text-white/80')}>
                          {formatDate(eveniment.eventDate)}
                          {eveniment.location && ` · ${eveniment.location}`}
                        </span>
                      </div>
                    )}

                    {eveniment.description && (
                      <p className={cn('text-sm leading-relaxed line-clamp-3 flex-1', isHomepage ? 'text-slate-600' : 'text-white/70')}>
                        {eveniment.description}
                      </p>
                    )}

                    <div className="mt-4 pt-4 border-t border-slate-100/40">
                      {hasDetailPage ? (
                        <span
                          className={cn(
                            'inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition-all',
                            'bg-gradient-to-r from-red-600 to-orange-500 text-white',
                            'group-hover:from-red-700 group-hover:to-orange-600 group-hover:shadow-md group-hover:shadow-orange-500/30'
                          )}
                        >
                          Citește mai mult
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      ) : eveniment.link ? (
                        <span className={cn(
                          'inline-flex items-center text-sm font-medium',
                          isHomepage ? 'text-orange-600' : 'text-white/80'
                        )}>
                          Vezi detalii <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </span>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                </>
              );

              const cardClasses = cn(
                'group rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl flex flex-col',
                isHomepage ? 'bg-white' : 'bg-white/5 border border-white/10',
                hasDetailPage && 'cursor-pointer hover:-translate-y-1'
              );

              if (detailHref) {
                return (
                  <Link key={eveniment.id} href={detailHref} className={cardClasses}>
                    {cardInner}
                  </Link>
                );
              }

              return (
                <article key={eveniment.id} className={cardClasses}>
                  {cardInner}
                </article>
              );
            })}
          </div>

          {itemsToShow ? (
            <div className="flex justify-center">
              <Link href="/noutati" passHref>
                <Button
                  variant={isHomepage ? 'outline' : 'outline'}
                  className={cn(isHomepage ? 'border-slate-300 text-slate-800' : 'text-white border-white/40')}
                >
                  Mai multe noutăți <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            hasMore && filter === 'all' && (
              <div ref={loadMoreRef} className="flex justify-center mt-8 mb-16">
                {loadingMore && (
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600" />
                    <p className={cn('mt-2 text-sm', isHomepage ? 'text-slate-500' : 'text-white/70')}>
                      Se încarcă mai multe noutăți...
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

type FeaturedCardProps = {
  item: Eveniment;
  isHomepage: boolean;
  formatDate: (date: Date | null | undefined) => string;
};

function FeaturedCard({ item, isHomepage, formatDate }: FeaturedCardProps) {
  const targetKind = item.eventDate ? 'evenimente' : 'noutati';
  const detailHref = item.slug ? `/${targetKind}/${item.slug}` : null;
  const isEvent = Boolean(item.eventDate);

  const inner = (
    <>
      {/* Imagine */}
      <div className="relative h-56 sm:h-72 md:h-auto md:min-h-[360px] overflow-hidden bg-slate-900">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title || 'Articol În Pași de Dans'}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 via-red-600/40 to-pink-500/40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/30" />

        {/* Featured + type badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/40">
            ★ În prim plan
          </span>
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm',
              isEvent ? 'bg-white/90 text-slate-900' : 'bg-slate-900/80 text-white'
            )}
          >
            {isEvent ? 'Eveniment' : 'Noutate'}
          </span>
        </div>
      </div>

      {/* Conținut */}
      <div className="p-6 md:p-10 flex flex-col justify-center">
        <p className={cn('text-xs uppercase tracking-widest mb-3', isHomepage ? 'text-orange-600' : 'text-orange-300')}>
          Publicat {formatDate(item.date)}
        </p>

        {item.title && (
          <h3
            className={cn(
              'text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-4 transition-colors',
              isHomepage ? 'text-slate-900 group-hover:text-orange-600' : 'text-white group-hover:text-orange-200'
            )}
          >
            {item.title}
          </h3>
        )}

        {item.eventDate && (
          <div
            className={cn(
              'inline-flex items-center gap-2 self-start rounded-full px-4 py-1.5 mb-4 text-sm font-semibold',
              isHomepage ? 'bg-orange-50 text-orange-700' : 'bg-orange-500/15 text-orange-200 border border-orange-400/30'
            )}
          >
            <Calendar className="h-4 w-4" />
            {formatDate(item.eventDate)}
            {item.location && <span className="opacity-70">· {item.location}</span>}
          </div>
        )}

        {item.description && (
          <p
            className={cn(
              'text-base leading-relaxed line-clamp-4 mb-6',
              isHomepage ? 'text-slate-600' : 'text-white/75'
            )}
          >
            {item.description}
          </p>
        )}

        {detailHref && (
          <span
            className={cn(
              'inline-flex items-center justify-center gap-2 self-start rounded-xl px-6 py-3 text-sm font-semibold shadow-lg transition-all',
              'bg-gradient-to-r from-red-600 to-orange-500 text-white',
              'group-hover:from-red-700 group-hover:to-orange-600 group-hover:shadow-xl group-hover:shadow-orange-500/40'
            )}
          >
            Citește mai mult
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </>
  );

  const cardClasses = cn(
    'group grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300',
    isHomepage
      ? 'bg-white border border-slate-200 hover:-translate-y-1 hover:shadow-orange-500/20'
      : 'bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/15 hover:border-orange-400/40 hover:-translate-y-1',
    detailHref && 'cursor-pointer'
  );

  if (detailHref) {
    return (
      <Link href={detailHref} className={cardClasses}>
        {inner}
      </Link>
    );
  }
  return <article className={cardClasses}>{inner}</article>;
}
