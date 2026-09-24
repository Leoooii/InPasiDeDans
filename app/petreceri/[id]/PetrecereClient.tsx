'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';
import DetaliuActivitate, { useDetaliu, type TextePagina } from '@/components/detaliu-activitate';

export interface PetrecereDetaliu {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  facebookLink: string;
  imageUrl: string;
  isUpcoming: boolean;
  badge?: string;
  createdAt: number;
  mapEmbed?: string;
}

const TEXTE: TextePagina = {
  colectie: 'petreceri',
  titluListing: 'Petreceri',
  singular: 'petrecere',
  genitiv: 'petrecerii',
  articulat: 'Petrecerea',
  demonstrativ: 'această petrecere',
  accent: 'rosu',
  titluHarta: 'Harta locației',
};

export default function PetrecereClient({ initial }: { initial?: PetrecereDetaliu | null }) {
  const { id, item: p, loading, error } = useDetaliu(initial, TEXTE);

  return (
    <DetaliuActivitate
      t={TEXTE}
      id={id}
      loading={loading}
      error={error}
      continut={
        p && {
          title: p.title,
          imageUrl: p.imageUrl,
          badge: p.badge && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {p.badge}
            </div>
          ),
          meta: [
            { icon: Calendar, text: p.date },
            ...(p.time ? [{ icon: Clock, text: p.time }] : []),
            ...(p.location ? [{ icon: MapPin, text: p.location }] : []),
          ],
          description: p.description,
          facebookLink: p.facebookLink,
          infoRapide: [
            ['Tip eveniment', p.isUpcoming ? 'Petrecere viitoare' : 'Petrecere anterioară'],
            ['Organizator', 'În Pași de Dans'],
            ...(p.location ? [['Locație', p.location] as [string, string]] : []),
          ],
          mapEmbed: p.mapEmbed,
        }
      }
    />
  );
}
