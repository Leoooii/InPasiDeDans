import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lecții Private de Dans București | În Pași de Dans',
  description:
    'Lecții private de dans în București pentru toate vârstele: instructor dedicat, sală privată, program flexibil și progres rapid. Pachete de la 4 ședințe.',
  alternates: { canonical: '/lectii-private' },
  openGraph: {
    title: 'Lecții Private de Dans București | În Pași de Dans',
    description: 'Lecții private de dans în București pentru toate vârstele: instructor dedicat, sală privată, program flexibil și progres rapid. Pachete de la 4 ședințe.',
    url: '/lectii-private',
  },
};

export default function LectiiPrivateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
