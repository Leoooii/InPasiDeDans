import Link from 'next/link';
import { ArrowRight, Clock, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GrupaLibera } from '@/lib/grupe-libere';

// Carduri compacte pentru grupele care primesc începători (vezi lib/grupe-libere.ts).
export default function GrupeLibere({
  grupe,
  ton = 'deschis',
}: {
  grupe: GrupaLibera[];
  ton?: 'deschis' | 'inchis';
}) {
  const inchis = ton === 'inchis';

  if (grupe.length === 0) {
    return (
      <div className={cn(
        'rounded-xl border border-dashed px-5 py-4 text-center text-sm',
        inchis ? 'border-white/20 bg-white/[0.03] text-white/80' : 'border-slate-300 bg-white/60 text-slate-600'
      )}>
        Momentan toate grupele sunt pline — completează{' '}
        <Link href="/inscriere" className="font-semibold text-orange-600 underline underline-offset-2 hover:text-orange-700">
          formularul de înscriere
        </Link>{' '}
        și te anunțăm când pornesc grupe noi.
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {grupe.map(g => {
        const putine = g.locuri <= 3;
        return (
          <li key={g.id}>
            <Link
              href={`/inscriere?curs=${g.curs}`}
              className={cn(
                'group flex h-full flex-col rounded-2xl border p-5 transition-all hover:-translate-y-0.5',
                inchis
                  ? 'border-white/10 bg-white/5 text-white hover:border-orange-400/50 hover:bg-white/10'
                  : 'border-slate-200 bg-white text-slate-900 shadow-sm hover:border-orange-300 hover:shadow-lg'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className={cn('text-xs font-semibold uppercase tracking-wide', inchis ? 'text-orange-300' : 'text-emerald-700')}>
                    {g.pentruCopii ? 'Copii · ' : ''}{g.nivel === 'All levels' ? 'Toate nivelurile' : 'Începători'}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold leading-snug">{g.titlu}</h3>
                </div>
                <span className={cn(
                  'shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold',
                  putine
                    ? 'bg-amber-100 text-amber-800'
                    : inchis ? 'bg-emerald-400/15 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                )}>
                  {putine ? `Doar ${g.locuri} ${g.locuri === 1 ? 'loc' : 'locuri'}` : `${g.locuri} locuri libere`}
                  {g.rol && g.rol.toLowerCase() !== 'all' ? ` · ${g.rol.toLowerCase()}` : ''}
                </span>
              </div>

              <dl className={cn('mt-4 space-y-1.5 text-sm', inchis ? 'text-white/75' : 'text-slate-600')}>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-orange-500" aria-hidden />
                  <dt className="sr-only">Când</dt>
                  <dd>{g.zile.join(' și ')}{g.ora ? `, ora ${g.ora}` : ''}</dd>
                </div>
                {g.instructor && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 shrink-0 text-orange-500" aria-hidden />
                    <dt className="sr-only">Instructor</dt>
                    <dd>{g.instructor}</dd>
                  </div>
                )}
                {g.sala && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-orange-500" aria-hidden />
                    <dt className="sr-only">Sala</dt>
                    <dd>{g.sala}</dd>
                  </div>
                )}
              </dl>

              <span className={cn(
                'mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors',
                inchis ? 'text-orange-300 group-hover:text-orange-200' : 'text-red-600 group-hover:text-orange-600'
              )}>
                Rezervă-ți locul
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
