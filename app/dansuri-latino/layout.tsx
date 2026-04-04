import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cursuri Dansuri Latino București – Salsa, Bachata, Cha-Cha | În Pași de Dans',
  description: 'Cursuri de dansuri latino în București – salsa, bachata, cha-cha, samba pentru toate nivelurile. Instructori profesioniști, Sector 4-5-6. Înscrie-te acum!',
  keywords: 'dansuri latino, salsa, bachata, cha-cha, cursuri latino',
  alternates: { canonical: 'https://www.inpasidedans.ro/dansuri-latino' },
  openGraph: {
    title: 'Dansuri Latino București | Salsa, Bachata | În Pași de Dans',
    description: 'Ritmuri pasionale și distracție garantată la cursurile noastre de dansuri latino.',
    url: 'https://www.inpasidedans.ro/dansuri-latino',
    images: [{ url: 'https://www.inpasidedans.ro/images/logo.png', alt: 'Dansuri latino București' }],
    locale: 'ro_RO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
