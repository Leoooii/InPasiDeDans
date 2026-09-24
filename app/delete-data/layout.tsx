import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ștergerea datelor | În Pași de Dans',
  description:
    'Cum poți solicita ștergerea datelor tale personale, conform GDPR.',
  alternates: { canonical: '/delete-data' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Ștergerea datelor | În Pași de Dans',
    description: 'Cum poți solicita ștergerea datelor tale personale, conform GDPR.',
    url: '/delete-data',
  },
};

export default function DeleteDataLayout({ children }: { children: React.ReactNode }) {
  return children;
}
