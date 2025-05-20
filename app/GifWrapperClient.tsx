'use client';

import dynamic from 'next/dynamic';

const GifWrapper = dynamic(() => import('@/components/gif-wrapper'), {
  ssr: false,
});

export default function GifWrapperClient() {
  return <GifWrapper />;
}
