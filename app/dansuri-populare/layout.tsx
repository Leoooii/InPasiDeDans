import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dansuri Populare București – Horă, Sârbă | În Pași de Dans',
  description: 'Cursuri dansuri populare București – horă, sârbă, brașoveancă și multe altele. Instructori profesioniști, Sector 4-5-6. Înscrie-te acum!',
  keywords: 'dansuri populare, traditii romanesti, dansuri romanesti, lectii populare',
  alternates: { canonical: 'https://www.inpasidedans.ro/dansuri-populare' },
  openGraph: {
    title: 'Dansuri Populare București | În Pași de Dans',
    description: 'Tradiție, cultură și distracție în lecțiile noastre de dansuri populare românești.',
    url: 'https://www.inpasidedans.ro/dansuri-populare',
    images: [{ url: 'https://www.inpasidedans.ro/images/logo.png', alt: 'Dansuri populare românești București' }],
    locale: 'ro_RO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
  );
}
