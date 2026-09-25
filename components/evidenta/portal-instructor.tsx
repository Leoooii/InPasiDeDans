'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { Calendar, GraduationCap, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { contInstructor } from '@/lib/evidenta/repo';
import type { Actor, ContInstructor } from '@/lib/evidenta/tipuri';
import { cn } from '@/lib/utils';
import { EvidentaProvider } from './context';
import { Incarcare } from './ui';

/** Garda și cadrul portalului: doar conturile din `conturiInstructori`, active. */
export function PortalInstructor({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [cont, setCont] = useState<ContInstructor | null | undefined>(undefined);
  const laLogin = pathname === '/instructor/login';

  useEffect(
    () =>
      onAuthStateChanged(auth, async u => {
        setUser(u);
        if (!u) {
          setCont(null);
          return;
        }
        try {
          setCont(await contInstructor(u.uid));
        } catch {
          setCont(null);
        }
      }),
    [],
  );

  useEffect(() => {
    if (user === null && !laLogin) router.replace('/instructor/login');
    if (user && cont?.activ && laLogin) router.replace('/instructor');
  }, [user, cont, laLogin, router]);

  const actor = useMemo<Actor | null>(
    () => (user && cont ? { uid: user.uid, nume: cont.nume, rol: 'instructor' } : null),
    [user, cont],
  );

  if (laLogin) return <div className="min-h-svh bg-slate-50">{children}</div>;
  if (user === undefined || (user && cont === undefined)) return <Incarcare />;
  if (!user) return null;

  if (!cont || !cont.activ) {
    return (
      <div className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-lg font-semibold text-slate-900">Contul nu are acces la evidență</p>
        <p className="text-sm text-slate-600">
          {cont ? 'Contul tău de instructor a fost dezactivat.' : 'Acest cont nu e un cont de instructor.'} Vorbește cu administratorul școlii.
        </p>
        <Button variant="outline" onClick={() => signOut(auth)}>
          Deconectare
        </Button>
      </div>
    );
  }

  const tab = (href: string, eticheta: string, Icon: typeof Calendar, activ: boolean) => (
    <Link
      href={href}
      className={cn(
        'flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium',
        activ ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white',
      )}
    >
      <Icon className="h-4 w-4" />
      {eticheta}
    </Link>
  );

  return (
    <EvidentaProvider actor={actor!} grupePermise={cont.grupe}>
      <div className="min-h-svh bg-slate-50">
        <header className="sticky top-0 z-30 bg-slate-900">
          <div className="mx-auto flex max-w-6xl items-center gap-1 px-3 py-2 sm:px-6">
            <span className="mr-2 hidden h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-400 text-xs font-bold text-white sm:flex">
              IP
            </span>
            {tab('/instructor', 'Prezență', Calendar, pathname === '/instructor')}
            {tab('/instructor/cursanti', 'Cursanți', GraduationCap, pathname.startsWith('/instructor/cursanti'))}
            <span className="ml-auto hidden truncate text-xs text-slate-400 sm:block">{cont.nume}</span>
            <button
              onClick={() => signOut(auth)}
              className="ml-2 flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:text-red-400"
              aria-label="Deconectare"
              title="Deconectare"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-3 sm:p-6">{children}</main>
      </div>
    </EvidentaProvider>
  );
}
