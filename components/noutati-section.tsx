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
};

type NoutatiSectionProps = {
  itemsToShow?: number;
  variant?: 'default' | 'homepage';
};

export default function NoutatiSection({ itemsToShow, variant = 'default' }: NoutatiSectionProps) {
  const [evenimente, setEvenimente] = useState<Eveniment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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

  return (
    <div className="w-full">
      {evenimente.length === 0 ? (
        <div className="text-center py-12">
          <p className={cn(isHomepage ? 'text-slate-600' : 'text-white/70')}>
            Nu există evenimente disponibile în acest moment.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            {evenimente.slice(0, itemsToShow).map(eveniment => (
              <article
                key={eveniment.id}
                className={cn(
                  'group rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl flex flex-col',
                  isHomepage ? 'bg-white' : 'bg-white/5 border border-white/10'
                )}
              >
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
                  {/* Badge tip */}
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
                    <p className={cn('text-sm leading-relaxed line-clamp-4 flex-1', isHomepage ? 'text-slate-600' : 'text-white/70')}>
                      {eveniment.description}
                    </p>
                  )}

                  {eveniment.link && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <Link href={eveniment.link} target="_blank"
                        className={cn(
                          'inline-flex items-center text-sm font-medium transition-colors',
                          isHomepage ? 'text-orange-600 hover:text-orange-700' : 'text-white/80 hover:text-white'
                        )}
                      >
                        Vezi detalii <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            ))}
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
            hasMore && (
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
