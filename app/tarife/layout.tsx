import type { Metadata } from 'next'
import { getTarife, safe } from '@/lib/public-data'
import FaqBlock from '@/components/faq-block'
import { faqTarife } from '@/lib/faq-continut'
import { BUSINESS } from '@/lib/schema-constants'

const CATEGORIE: Record<string, string> = {
  grup: 'Cursuri de grup adulți',
  privat: 'Lecții private',
  copii: 'Cursuri copii',
}

export const metadata: Metadata = {
  title: 'Prețuri Cursuri de Dans București | În Pași de Dans',
  description:
    'Prețurile cursurilor de dans pentru adulți și copii și ale lecțiilor private la În Pași de Dans, București. Alege abonamentul potrivit.',
  keywords:
    'tarife cursuri dans, preturi scoala de dans, cursuri dans adulti, cursuri dans copii, lectii private dans',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/tarife',
  },
  openGraph: {
    type: 'website',
    title: 'Prețuri Cursuri de Dans București | În Pași de Dans',
    description:
      'Prețurile cursurilor de dans pentru adulți și copii și ale lecțiilor private la În Pași de Dans, București. Alege abonamentul potrivit.',
    url: 'https://www.inpasidedans.ro/tarife',
    siteName: 'In Pasi de Dans',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/tarife.png',
        width: 1200,
        height: 630,
        alt: 'Tarife Cursuri de Dans',
      },
    ],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prețuri Cursuri de Dans București | În Pași de Dans',
    description:
      'Prețurile cursurilor de dans pentru adulți și copii și ale lecțiilor private la În Pași de Dans, București. Alege abonamentul potrivit.',
    images: ['https://www.inpasidedans.ro/images/tarife.png'],
  },
}

export default async function TarifeLayout({ children }: { children: React.ReactNode }) {
  const tarife = await safe(getTarife, null)
  const oferte = tarife ? [...tarife.grup, ...tarife.privat, ...tarife.copii] : []

  const jsonLd = oferte.length > 0 && {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Tarife cursuri de dans – În Pași de Dans',
    url: `${BUSINESS.url}/tarife`,
    itemListElement: oferte.map(t => ({
      '@type': 'Offer',
      name: `${CATEGORIE[t.categorie]}: ${t.titlu}`,
      description: [t.descriere, ...t.beneficii].filter(Boolean).join('. ') || undefined,
      price: t.pret,
      priceCurrency: 'RON',
      category: CATEGORIE[t.categorie],
      offeredBy: { '@type': 'DanceSchool', '@id': `${BUSINESS.url}/#organization`, name: BUSINESS.name },
    })),
  }

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      {children}
      <div className="container pb-16">
        <FaqBlock intrebari={faqTarife(tarife)} />
      </div>
    </>
  )
}
