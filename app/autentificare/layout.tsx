import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autentificare | În Pași de Dans',
  description: 'Autentifică-te pentru a accesa contul tău de dansator sau administrator.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
