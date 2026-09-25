import type { Metadata } from 'next';
import { PortalInstructor } from '@/components/evidenta/portal-instructor';

export const metadata: Metadata = {
  title: 'Instructori · În Pași de Dans',
  robots: { index: false, follow: false },
};

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return <PortalInstructor>{children}</PortalInstructor>;
}
