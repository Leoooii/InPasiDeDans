import type { Metadata } from 'next';
import { getInstructori, safe } from '@/lib/public-data';
import { BUSINESS } from '@/lib/schema-constants';

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

export default async function InstructoriLayout({ children }: { children: React.ReactNode }) {
  const instructori = (await safe(getInstructori, null)) ?? [];

  const jsonLd = instructori.length > 0 && {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Instructorii școlii de dans În Pași de Dans',
    itemListElement: instructori.map((ins, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        name: ins.name,
        jobTitle: ins.role,
        description: ins.bio,
        image: ins.imageUrl || undefined,
        sameAs: [ins.facebookUrl, ins.instagramUrl, ins.youtubeUrl].filter(Boolean),
        worksFor: { '@type': 'DanceSchool', '@id': `${BUSINESS.url}/#organization`, name: BUSINESS.name },
      },
    })),
  };

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      {children}
    </>
  );
}
