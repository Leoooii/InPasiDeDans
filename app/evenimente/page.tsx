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

export default function EvenimentePage() {
  const [evenimente, setEvenimente] = useState<Eveniment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastDoc = useRef<QueryDocumentSnapshot<DocumentData> | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 5;

  const fetchEvenimente = async (isInitial = false) => {
    try {
      const evenimenteRef = collection(db, 'evenimente');
      let q = query(
        evenimenteRef,
        orderBy('date', 'desc'),
        limit(ITEMS_PER_PAGE)
      );

      if (!isInitial && lastDoc.current) {
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
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    await fetchEvenimente(false);
    setLoadingMore(false);
  }, [loadingMore, hasMore]);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await fetchEvenimente(true);
      setLoading(false);
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (loading) return;

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
  }, [loading, hasMore, loadMore]);

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
      <div className="container py-16 flex justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-red-600" />
          <p className="mt-4 text-gray-500">Se încarcă evenimentele...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16 px-4 md:px-0">
      <h1 className="text-4xl font-bold mb-12 text-center">Noutăți</h1>

      {evenimente.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Nu există evenimente disponibile în acest moment.
          </p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          {evenimente.map(eveniment => (
            <Card
              key={eveniment.id}
              className="mb-6 overflow-hidden   border-2 shadow-sm border-red-600"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                <div className="h-10 w-10 mr-3 ">
                  {/* <AvatarImage src="/images/logo.png" alt="Școala de Dans" /> */}
                  <Image
                    src="/images/logo.png"
                    width={100}
                    height={100}
                    alt="Școala de Dans"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">In Pasi De Dans</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{formatDate(eveniment.date)}</span>
                    <span className="mx-1">•</span>
                    <span>{formatTime(eveniment.date)}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 pt-3">
                {eveniment.title && (
                  <h3 className="text-xl font-semibold mb-2">
                    {eveniment.title}
                  </h3>
                )}

                {eveniment.eventDate && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-3 bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                    <Calendar className="h-4 w-4 mr-2 text-red-600" />
                    <span>
                      Data eveniment: {formatDate(eveniment.eventDate)}
                    </span>
                  </div>
                )}

                {eveniment.description && (
                  <p
                    className="text-gray-700 dark:text-gray-300 mb-4"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {eveniment.description}
                  </p>
                )}

                {eveniment.imageUrl && (
                  <div className="relative -mx-4 aspect-video mb-4 overflow-hidden">
                    <Image
                      src={eveniment.imageUrl || '/placeholder.svg'}
                      alt={eveniment.title || 'Imagine eveniment'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </CardContent>

              {eveniment.link && (
                <CardFooter className="p-4 pt-0">
                  <Link href={eveniment.link} passHref target="_blank">
                    <Button variant="outline" className="w-full">
                      Mai multe detalii <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              )}
            </Card>
          ))}

          {hasMore && (
            <div ref={loadMoreRef} className="flex justify-center mt-8 mb-16">
              {loadingMore && (
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600" />
                  <p className="mt-2 text-gray-500">
                    Se încarcă mai multe evenimente...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
