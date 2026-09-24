import type { Metadata } from 'next';
import FaqBlock from '@/components/faq-block';
import { faqLectiiPrivate } from '@/lib/faq-continut';
import { getTarife, safe } from '@/lib/public-data';

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

export default async function LectiiPrivateLayout({ children }: { children: React.ReactNode }) {
  const tarife = await safe(getTarife, null);
  return (
    <>
      {children}
      <div className="container pb-16">
        <FaqBlock intrebari={faqLectiiPrivate(tarife)} />
      </div>
    </>
  );
}
