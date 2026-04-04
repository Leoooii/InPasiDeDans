import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Școala de Dans În Pași de Dans București',
  description: 'Contact În Pași de Dans București – ia legătură cu echipa pentru înscrieri, întrebări sau colaborări. Răspundem rapid!',
  keywords: 'contact dans, scoala de dans, intrebari dans, inscriere dans, colaborare dans Bucuresti',
  alternates: { canonical: 'https://www.inpasidedans.ro/contact' },
  openGraph: {
    title: 'Contact | În Pași de Dans București',
    description: 'Ia legătură cu echipa În Pași de Dans pentru întrebări, înscrieri sau colaborări. Răspundem rapid!',
    url: 'https://www.inpasidedans.ro/contact',
    images: [{ url: 'https://www.inpasidedans.ro/images/logo.png', alt: 'Contact În Pași de Dans' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | În Pași de Dans',
    description: 'Ia legătură cu echipa În Pași de Dans pentru întrebări, înscrieri sau colaborări.',
    images: ['https://www.inpasidedans.ro/images/logo.png'],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
