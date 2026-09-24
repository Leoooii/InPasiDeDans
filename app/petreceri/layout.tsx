import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Petreceri de Dans București | În Pași de Dans',
  description:
    'Petreceri tematice și social dance organizate de În Pași de Dans în București. Vino să dansezi într-o atmosferă relaxată!',
  alternates: { canonical: '/petreceri' },
  openGraph: {
    title: 'Petreceri de Dans București | În Pași de Dans',
    description: 'Petreceri tematice și social dance organizate de În Pași de Dans în București. Vino să dansezi într-o atmosferă relaxată!',
    url: '/petreceri',
  },
};

export default function PetreceriLayout({ children }: { children: React.ReactNode }) {
  return children;
}
