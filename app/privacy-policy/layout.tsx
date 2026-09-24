import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Confidențialitate | În Pași de Dans',
  description:
    'Cum colectăm, folosim și protejăm datele tale personale la școala de dans În Pași de Dans.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Politica de Confidențialitate | În Pași de Dans',
    description: 'Cum colectăm, folosim și protejăm datele tale personale la școala de dans În Pași de Dans.',
    url: '/privacy-policy',
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
