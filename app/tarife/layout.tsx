import type { Metadata } from 'next'

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

export default function TarifeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
