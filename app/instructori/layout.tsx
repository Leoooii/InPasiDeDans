import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instructori de Dans București | În Pași de Dans',
  description:
    'Cunoaște echipa de instructori În Pași de Dans: dansatori cu experiență în dans sportiv, latino, de societate și populare, care predau în București.',
  alternates: { canonical: '/instructori' },
  openGraph: {
    title: 'Instructori de Dans București | În Pași de Dans',
    description: 'Cunoaște echipa de instructori În Pași de Dans: dansatori cu experiență în dans sportiv, latino, de societate și populare, care predau în București.',
    url: '/instructori',
  },
};

export default function InstructoriLayout({ children }: { children: React.ReactNode }) {
  return children;
}
