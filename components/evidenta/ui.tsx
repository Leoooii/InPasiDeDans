'use client';

import { Loader2 } from 'lucide-react';
import { STIL_STATUS, type StatusCursant } from '@/lib/evidenta/abonament';
import { cn } from '@/lib/utils';

// Piese mici folosite peste tot în evidență.

export function StatusBadge({ status, className }: { status: StatusCursant; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        STIL_STATUS[status.cod].badge,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', STIL_STATUS[status.cod].punct)} />
      {status.eticheta}
    </span>
  );
}

export function Initiale({ nume, className }: { nume: string; className?: string }) {
  const init = nume
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase())
    .join('');
  return (
    <span
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-400 text-sm font-semibold text-white',
        className,
      )}
    >
      {init || '?'}
    </span>
  );
}

export function Incarcare({ text = 'Se încarcă...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500">
      <Loader2 className="h-5 w-5 animate-spin text-red-600" />
      {text}
    </div>
  );
}

export function Gol({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-500">{children}</p>;
}

export function Panou({
  titlu,
  actiune,
  children,
  className,
}: {
  titlu?: React.ReactNode;
  actiune?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('rounded-2xl border border-slate-200 bg-white shadow-sm', className)}>
      {(titlu || actiune) && (
        <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
          <h2 className="text-sm font-semibold text-slate-900">{titlu}</h2>
          {actiune}
        </header>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

export function AntetPagina({ titlu, descriere, actiune }: { titlu: string; descriere?: string; actiune?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{titlu}</h1>
        {descriere && <p className="mt-1 text-sm text-slate-500">{descriere}</p>}
      </div>
      {actiune}
    </div>
  );
}

/** Buton-chip pentru filtre. */
export function Chip({ activ, onClick, children }: { activ: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'min-h-9 rounded-full border px-3 py-1.5 text-sm transition-colors',
        activ ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
      )}
    >
      {children}
    </button>
  );
}
