'use client';
import { useState, useEffect } from 'react';

export default function GifWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // evita probleme SSR cu <video>
  }, []);

  return (
    <div className="relative w-full h-full bg-orange-500">
      {isClient && (
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="images/gif/presentation.mp4" type="video/mp4" />
          Browserul tău nu suportă video HTML5.
        </video>
      )}
    </div>
  );
}
