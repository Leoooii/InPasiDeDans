'use client';

import { Calendar, MapPin, Users } from 'lucide-react';
import DetaliuActivitate, { useDetaliu, type TextePagina } from '@/components/detaliu-activitate';

export interface ExcursieDetaliu {
  id: string;
  title: string;
  date?: string;
  eventDate: string;
  location?: string;
  spots?: string;
  description?: string;
  facebookLink?: string;
  imageUrl: string;
  isUpcoming: boolean;
  createdAt: number;
  mapEmbed?: string;
}

const TEXTE: TextePagina = {
  colectie: 'excursii',
  titluListing: 'Excursii',
  singular: 'excursie',
  genitiv: 'excursiei',
  articulat: 'Excursia',
  demonstrativ: 'această excursie',
  accent: 'portocaliu',
  titluHarta: 'Harta destinației',
};

export default function ExcursieClient({ initial }: { initial?: ExcursieDetaliu | null }) {
  const { id, item: e, loading, error } = useDetaliu(initial, TEXTE);

  return (
    <DetaliuActivitate
      t={TEXTE}
      id={id}
      loading={loading}
      error={error}
      continut={
        e && {
          title: e.title,
          imageUrl: e.imageUrl,
          badge: e.spots && (
            <div className="absolute top-4 right-4 inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              <Users className="h-4 w-4" />
              {e.spots}
            </div>
          ),
          meta: [
            { icon: Calendar, text: e.eventDate },
            ...(e.location ? [{ icon: MapPin, text: e.location }] : []),
            ...(e.spots ? [{ icon: Users, text: e.spots }] : []),
          ],
          description: e.description,
          facebookLink: e.facebookLink,
          infoRapide: [
            ['Tip', e.isUpcoming ? 'Excursie viitoare' : 'Excursie anterioară'],
            ['Dată', e.eventDate],
            ['Organizator', 'În Pași de Dans'],
            ...(e.location ? [['Destinație', e.location] as [string, string]] : []),
            ...(e.spots ? [['Locuri', e.spots] as [string, string]] : []),
          ],
          mapEmbed: e.mapEmbed,
        }
      }
    />
  );
}
