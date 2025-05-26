'use client';

import dynamic from 'next/dynamic';

const GifWrapper = dynamic(() => import('@/components/gif-wrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Se încarcă...</p>
      </div>
    </div>
  ),
});

export default function GifWrapperClient() {
  return <GifWrapper />;
}
