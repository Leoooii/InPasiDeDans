import type { Metadata } from 'next';
import SalsaBachataClient from './SalsaBachataClient';

export const metadata: Metadata = {
  title: 'Cursuri Salsa & Bachata București | Grupă Începători Sector 5-6 | În Pași de Dans',
  description: 'Descoperă cursuri de salsa și bachata în București, create pentru începători și intermediari. Lecții interactive, instructori cu experiență, Sector 5 & Sector 6. Înscrie-te acum!',
  keywords: 'salsa, bachata, cursuri salsa, cursuri bachata, dansuri latino, București, sector 5, sector 6',
  authors: [{ name: 'Scoala de dans In Pasi de Dans' }],
  alternates: {
    canonical: 'https://www.inpasidedans.ro/dansuri-latino/salsa-bachata',
  },
  openGraph: {
    title: 'Cursuri Salsa & Bachata în București | În Pași de Dans',
    description: 'Descoperă cursuri de salsa și bachata în București, create pentru începători și intermediari. Lecții interactive cu instructori cu experiență.',
    url: 'https://www.inpasidedans.ro/dansuri-latino/salsa-bachata',
    siteName: 'In Pasi de Dans',
    locale: 'ro_RO',
    type: 'website',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Cursuri Salsa Bachata București – În Pași de Dans',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function SalsaBachataPage() {
  return <SalsaBachataClient />;
}
