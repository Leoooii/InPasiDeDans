import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Excursii cu Școala de Dans | În Pași de Dans',
  description:
    'Excursii și ieșiri tematice organizate de școala de dans În Pași de Dans din București – dans, prieteni și amintiri în afara sălii.',
  alternates: { canonical: '/excursii' },
  openGraph: {
    title: 'Excursii cu Școala de Dans | În Pași de Dans',
    description: 'Excursii și ieșiri tematice organizate de școala de dans În Pași de Dans din București – dans, prieteni și amintiri în afara sălii.',
    url: '/excursii',
  },
};

export default function ExcursiiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
