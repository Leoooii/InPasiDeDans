'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function GifWrapper() {
  const [isClient, setIsClient] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && videoRef.current) {
      const video = videoRef.current;

      // Detectează dacă autoplay este suportat
      const detectAutoplay = async () => {
        try {
          await video.play();
          setCanAutoplay(true);
        } catch (error) {
          console.log('Autoplay nu este suportat:', error);
          setCanAutoplay(false);
          // Încearcă să pornească video-ul la primul click/touch
          const startVideo = () => {
            video.play().catch(console.error);
            document.removeEventListener('click', startVideo);
            document.removeEventListener('touchstart', startVideo);
          };
          document.addEventListener('click', startVideo);
          document.addEventListener('touchstart', startVideo);
        }
      };

      // Așteaptă ca video-ul să fie gata
      if (video.readyState >= 3) {
        detectAutoplay();
      } else {
        video.addEventListener('canplaythrough', detectAutoplay);
      }

      return () => {
        video.removeEventListener('canplaythrough', detectAutoplay);
      };
    }
  }, [isClient]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    console.error('Eroare la încărcarea video-ului');
    setVideoError(true);
    setVideoLoaded(false);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(console.error);
      }
    }
  };

  return (
    <div className="relative w-full h-full bg-orange-500">
      {/* Fallback image - se afișează până se încarcă video-ul sau dacă video-ul nu funcționează */}
      {(!videoLoaded || videoError) && (
        <div className="absolute inset-0 z-10">
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Școala de Dans</h1>
              <p className="text-xl">Descoperă pasiunea dansului</p>
            </div>
          </div>
        </div>
      )}

      {/* Video principal */}
      {isClient && (
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onClick={handleVideoClick}
        >
          <source src="/images/gif/presentation.mp4" type="video/mp4" />
        </video>
      )}

      {/* Indicator pentru cazul în care autoplay nu funcționează */}
      {isClient && !canAutoplay && !videoError && (
        <div className="absolute bottom-4 left-4 z-20">
          <button
            onClick={handleVideoClick}
            className="bg-black/50 text-white px-3 py-1 rounded-full text-sm hover:bg-black/70 transition-colors"
          >
            ▶ Pornește video
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {isClient && !videoLoaded && !videoError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="bg-black/50 rounded-full p-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
}
