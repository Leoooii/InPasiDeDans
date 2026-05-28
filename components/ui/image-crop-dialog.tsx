'use client';

import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Cropper, { type Area } from 'react-easy-crop';
import { Loader2, X } from 'lucide-react';

interface ImageCropDialogProps {
  /** Original (uncropped) image as a data URL or blob URL. */
  src: string;
  /** Aspect ratio width/height (ex. 4/3, 16/9, 1, 3/4). */
  aspect: number;
  /** Filename for the resulting cropped Blob. */
  filename: string;
  /** Output mime type. Defaults to image/jpeg for smaller files. */
  outputMime?: string;
  /** Output quality 0-1 (only used for image/jpeg | image/webp). */
  outputQuality?: number;
  isProcessing?: boolean;
  onCancel: () => void;
  onConfirm: (cropped: File) => void | Promise<void>;
}

async function getCroppedImage(
  src: string,
  cropPx: Area,
  filename: string,
  mime: string,
  quality: number,
): Promise<File> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.crossOrigin = 'anonymous';
    el.onload = () => resolve(el);
    el.onerror = (e) => reject(e);
    el.src = src;
  });

  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(cropPx.width));
  canvas.height = Math.max(1, Math.round(cropPx.height));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  ctx.drawImage(
    img,
    cropPx.x,
    cropPx.y,
    cropPx.width,
    cropPx.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, mime, quality),
  );
  if (!blob) throw new Error('Crop failed');
  return new File([blob], filename, { type: mime });
}

export function ImageCropDialog({
  src,
  aspect,
  filename,
  outputMime = 'image/jpeg',
  outputQuality = 0.92,
  isProcessing,
  onCancel,
  onConfirm,
}: ImageCropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, area: Area) => {
    setCroppedAreaPixels(area);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    const file = await getCroppedImage(
      src,
      croppedAreaPixels,
      filename,
      outputMime,
      outputQuality,
    );
    await onConfirm(file);
  };

  const ratioLabel =
    aspect === 1
      ? '1:1 (pătrat)'
      : aspect === 16 / 9
      ? '16:9 (peisaj)'
      : aspect === 4 / 3
      ? '4:3'
      : aspect === 3 / 4
      ? '3:4 (portret)'
      : aspect === 4 / 5
      ? '4:5 (portret)'
      : aspect.toFixed(2);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) onCancel();
      }}
    >
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <div>
            <h2 className="text-base font-semibold">Decupează imaginea</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Trage imaginea sau folosește zoom-ul. Raport fix:{' '}
              <span className="font-medium text-orange-600 dark:text-orange-400">{ratioLabel}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            aria-label="Închide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative bg-black h-[420px] shrink-0">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            objectFit="contain"
          />
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 w-12 shrink-0">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-orange-500"
            />
            <span className="text-xs tabular-nums w-12 text-right">{zoom.toFixed(2)}x</span>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isProcessing}
              className="px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-60"
            >
              Anulează
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isProcessing || !croppedAreaPixels}
              className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white transition-all disabled:opacity-60 inline-flex items-center gap-2 shadow-md shadow-orange-500/30"
            >
              {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
              Decupează și încarcă
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
