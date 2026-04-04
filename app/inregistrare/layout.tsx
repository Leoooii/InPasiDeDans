import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Înregistrare | În Pași de Dans',
  description: 'Creează un cont nou pentru a te înscrie la cursurile preferate.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
