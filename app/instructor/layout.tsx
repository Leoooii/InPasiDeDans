import type { Metadata } from 'next';
import { PortalInstructor } from '@/components/evidenta/portal-instructor';

export const metadata: Metadata = {
  title: 'Instructori · În Pași de Dans',
  robots: { index: false, follow: false },
  manifest: '/evidenta/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'Evidență', statusBarStyle: 'default' },
  icons: { apple: '/evidenta/apple-touch-icon.png' },
};

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return <PortalInstructor>{children}</PortalInstructor>;
}
