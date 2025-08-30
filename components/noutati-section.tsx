'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Calendar, ArrowRight } from 'lucide-react';
import { db } from '@/lib/firebase';
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
};

type NoutatiSectionProps = {
  itemsToShow?: number;
};

export default function NoutatiSection({ itemsToShow }: NoutatiSectionProps) {
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

  if (loading) {
    return (
              <div className="w-full flex justify-center py-16">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
            <p className="mt-4 text-white/70">Se încarcă noutățile...</p>
          </div>
        </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-0">
      {evenimente.length === 0 ? (
        <div className="text-center py-12 col-span-full">
          <p className="text-white/70">
            Nu există evenimente disponibile în acest moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-16">
          {evenimente.slice(0, itemsToShow).map(eveniment => (
            <Card
              key={eveniment.id}
              className="overflow-hidden border-2 shadow-lg border-red-500 bg-white/5 backdrop-blur-sm flex flex-col"
            >
              {/* Header cu logo și dată */}
              <div className="p-4 border-b border-white/20 flex items-center">
                <div className="h-10 w-10 mr-3">
                  <Image
                    src="/images/logo.png"
                    width={100}
                    height={100}
                    alt="Școala de Dans"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white">In Pasi De Dans</h3>
                  <div className="flex items-center text-sm text-white/70">
                    <span>{formatDate(eveniment.date)}</span>
                    <span className="mx-1">•</span>
                    <span>{formatTime(eveniment.date)}</span>
                  </div>
                </div>
              </div>

              {/* Conținut principal - sus */}
              <CardContent className="p-4 pt-3 flex-1">
                {eveniment.title && (
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {eveniment.title}
                  </h3>
                )}

                {eveniment.eventDate && (
                  <div className="flex items-center text-sm text-white/90 mb-3 bg-white/10 p-2 rounded-md">
                    <Calendar className="h-4 w-4 mr-2 text-red-600" />
                    <span>
                      Data eveniment: {formatDate(eveniment.eventDate)}
                    </span>
                  </div>
                )}

                {eveniment.description && (
                  <p
                    className="text-white/90 mb-4"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {eveniment.description}
                  </p>
                )}
              </CardContent>

              {/* Imagine și buton - jos */}
              <div className="mt-auto">
                {eveniment.imageUrl && (
                  <div className="px-4 pb-4">
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={eveniment.imageUrl || '/placeholder.svg'}
                        alt={eveniment.title || 'Imagine eveniment'}
                        width={600}
                        height={300}
                        className="object-cover w-full h-auto"
                      />
                    </div>
                  </div>
                )}

                {eveniment.link && (
                  <CardFooter className="p-4 pt-0">
                    <Link href={eveniment.link} passHref target="_blank">
                      <Button variant="outline" className="w-full">
                        Mai multe detalii <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                )}
              </div>
            </Card>
          ))}

          {itemsToShow ? (
            <div className="col-span-full flex justify-center mt-8 mb-16">
              <Link href="/noutati" passHref>
                <Button variant="default" className="w-full max-w-xs">
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
