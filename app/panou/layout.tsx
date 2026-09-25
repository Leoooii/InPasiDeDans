import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intrare · În Pași de Dans',
  robots: { index: false, follow: false },
  manifest: '/evidenta/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'Evidență', statusBarStyle: 'default' },
  icons: { apple: '/evidenta/apple-touch-icon.png' },
};

export default function PanouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
