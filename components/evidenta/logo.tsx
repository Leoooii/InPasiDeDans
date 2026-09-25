/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';

/**
 * Logo-ul școlii pe fundal închis (bara admin, portalul instructorilor).
 * `compact` = doar dansatorii (public/images/logo-dansatori.png, decupați din logo), într-un pătrat.
 */
export function LogoPanou({ compact = false, className }: { compact?: boolean; className?: string }) {
  if (compact) {
    return (
      <span className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm', className)}>
        <img src="/images/logo-dansatori.png" alt="În Pași de Dans" className="h-8 w-8" />
      </span>
    );
  }
  return (
    <span className={cn('flex shrink-0 items-center rounded-xl bg-white px-2.5 py-1 shadow-sm', className)}>
      <img src="/images/logo.png" alt="În Pași de Dans" className="h-9 w-auto" />
    </span>
  );
}
