import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preturi Cursuri de Dans Bucuresti | In Pasi de Dans',
  description:
    'Preturi cursuri de dans Bucuresti - Vezi preturile de cursuri de dans pentru copii si adulti din Bucuresti ✅ Alege pachetul ideal pentru tine pe In Pasi de Dans ✅',
  keywords:
    'tarife cursuri dans, preturi scoala de dans, cursuri dans adulti, cursuri dans copii, lectii private dans',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/tarife',
  },
  openGraph: {
    type: 'website',
    title: 'Preturi Cursuri de Dans Bucuresti | In Pasi de Dans',
    description:
      'Preturi cursuri de dans Bucuresti - Vezi preturile de cursuri de dans pentru copii si adulti din Bucuresti ✅ Alege pachetul ideal pentru tine pe In Pasi de Dans ✅',
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
    title: 'Preturi Cursuri de Dans Bucuresti | In Pasi de Dans',
    description:
      'Preturi cursuri de dans Bucuresti - Vezi preturile de cursuri de dans pentru copii si adulti din Bucuresti ✅ Alege pachetul ideal pentru tine pe In Pasi de Dans ✅',
    images: ['https://inpasidedans.ro/images/tarife.png'],
  },
}

export default function TarifeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
