'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Calendar, ArrowRight, MapPin, Clock3 } from 'lucide-react';
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
    <div className="w-full px-4 md:px-0">
      {evenimente.length === 0 ? (
        <div className="text-center py-12 col-span-full">
          <p className={cn(isHomepage ? 'text-slate-600' : 'text-white/70')}>
            Nu există evenimente disponibile în acest moment.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {evenimente.slice(0, itemsToShow).map(eveniment => (
            <div
              key={eveniment.id}
              className={cn(
                'grid gap-6 rounded-3xl border p-6 lg:grid-cols-[minmax(0,1fr)_320px]',
                isHomepage
                  ? 'border-slate-200 bg-white text-slate-900 shadow-lg'
                  : 'border-white/15 bg-white/5 text-white backdrop-blur'
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'rounded-full px-4 py-1 text-xs uppercase tracking-[0.3em]',
                      isHomepage ? 'bg-orange-50 text-orange-600' : 'bg-white/10 text-white/90'
                    )}
                  >
                    {eveniment.eventDate ? 'Eveniment' : 'Noutate'}
                  </div>
                  <span className={cn('text-sm', isHomepage ? 'text-slate-500' : 'text-white/70')}>
                    {formatDate(eveniment.date)} · {formatTime(eveniment.date)}
                  </span>
                </div>
              <div
                className={cn(
                  'rounded-2xl p-4 border flex flex-col gap-4',
                  isHomepage ? 'border-slate-100 bg-slate-50/80' : 'border-white/15 bg-black/30'
                )}
              >
                {eveniment.eventDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">
                      {formatDate(eveniment.eventDate)}
                      {eveniment.location && ` · ${eveniment.location}`}
                    </span>
                  </div>
                )}
                {eveniment.description && (
                  <p className={isHomepage ? 'text-slate-700' : 'text-white/90'}>
                    {eveniment.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em]">
                  <span className="text-white/60">Latino</span>
                  <span className="text-white/60">Workshop</span>
                  <span className="text-white/60">Comunitate</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-inner">
                {eveniment.imageUrl ? (
                  <Image
                    src={eveniment.imageUrl}
                    alt={eveniment.title || 'Eveniment In Pasi de Dans'}
                    width={320}
                    height={220}
                    className="h-64 w-full object-contain"
                  />
                ) : (
                  <div className="h-52 w-full bg-gradient-to-br from-orange-200 to-pink-200 flex items-center justify-center text-slate-700">
                    Imagine în curând
                  </div>
                )}
                {eveniment.link && (
                  <div className="p-4 border-t border-slate-100">
                    <Link href={eveniment.link} target="_blank">
                      <Button
                        variant="outline"
                        className="w-full border-slate-300 text-slate-800 hover:bg-slate-50"
                      >
                        Vezi detalii <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}

          {itemsToShow ? (
            <div className="col-span-full flex justify-center mt-8 mb-16">
              <Link href="/noutati" passHref>
                <Button
                  variant={isHomepage ? 'default' : 'outline'}
                  className={cn('w-full max-w-xs', isHomepage ? '' : 'text-white border-white/40')}
                >
                  Mai multe noutăți <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            hasMore && (
              <div
                ref={loadMoreRef}
                className="col-span-full flex justify-center mt-8 mb-16"
              >
                {loadingMore && (
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600" />
                    <p className="mt-2 text-white/70">
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
