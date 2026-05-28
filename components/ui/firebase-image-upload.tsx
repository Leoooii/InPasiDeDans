'use client';

import { useRef, useState } from 'react';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { ImageCropDialog } from '@/components/ui/image-crop-dialog';

interface FirebaseImageUploadProps {
  /** Current image URL (passed in to display existing image, used to clear). */
  currentUrl?: string;
  /** Folder in Firebase Storage under which files are saved (e.g. "instructori"). */
  folder?: string;
  /** Max accepted file size in MB. Default 10. */
  maxSize?: number;
  /** When set, opens crop dialog before upload and enforces this aspect (w/h). */
  cropAspect?: number;
  /** Button label. */
  label?: string;
  /** Callback after successful upload with the Firebase download URL. */
  onUploadComplete: (url: string) => void;
  className?: string;
}

export function FirebaseImageUpload({
  currentUrl,
  folder = 'uploads',
  maxSize = 10,
  cropAspect,
  label = 'Încarcă imagine',
  onUploadComplete,
  className,
}: FirebaseImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [cropFilename, setCropFilename] = useState<string>('image.jpg');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSize) {
      toast({
        title: 'Fișier prea mare',
        description: `Dimensiunea maximă este ${maxSize}MB.`,
        variant: 'destructive',
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Crop flow for images when an aspect ratio is requested
    if (cropAspect && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCropSrc(reader.result);
          setCropFilename(file.name.replace(/\.[^.]+$/, '') + '.jpg');
        }
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      reader.readAsDataURL(file);
      return;
    }

    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const path = `${folder}/${Date.now()}_${safeName}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      onUploadComplete(url);
      toast({ title: 'Imagine încărcată cu succes' });
    } catch (error: any) {
      console.error('Eroare upload Firebase Storage:', error);
      toast({
        title: 'Eroare la încărcare',
        description: error?.message || 'Nu s-a putut încărca imaginea.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
        className="hidden"
      />

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Se încarcă...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              {currentUrl ? 'Înlocuiește imaginea' : label}
            </>
          )}
        </Button>

        {currentUrl && !uploading && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onUploadComplete('')}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-1" />
            Șterge
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {cropAspect ? 'Imaginea va fi decupată după upload. ' : ''}
        Dimensiune maximă: {maxSize}MB.
      </p>

      {currentUrl && !uploading && (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentUrl}
            alt="Imagine curentă"
            className="h-24 w-auto rounded-md border border-slate-200 dark:border-slate-700 object-cover"
          />
        </div>
      )}

      {!currentUrl && !uploading && (
        <div className="flex h-24 w-32 items-center justify-center rounded-md border border-dashed border-slate-300 dark:border-slate-700 text-slate-400">
          <ImageIcon className="h-6 w-6" />
        </div>
      )}

      {cropSrc && cropAspect && (
        <ImageCropDialog
          src={cropSrc}
          aspect={cropAspect}
          filename={cropFilename}
          isProcessing={uploading}
          onCancel={() => setCropSrc(null)}
          onConfirm={async (cropped) => {
            setCropSrc(null);
            await uploadFile(cropped);
          }}
        />
      )}
    </div>
  );
}
