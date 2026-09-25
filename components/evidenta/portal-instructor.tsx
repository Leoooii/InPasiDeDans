'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { GraduationCap, HelpCircle, LogOut, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { contInstructor } from '@/lib/evidenta/repo';
import { laProfilActualizat } from '@/lib/evidenta/profil';
import { Avatar } from './avatar';
import { LogoPanou } from './logo';
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

  // după „Contul meu" → Salvează, numele și avatarul se reîncarcă
  useEffect(
    () =>
      laProfilActualizat(() => {
        const u = auth.currentUser;
        if (u) contInstructor(u.uid).then(setCont).catch(() => {});
      }),
    [],
  );

  useEffect(() => {
    if (user === null) router.replace('/panou');
  }, [user, router]);

  const actor = useMemo<Actor | null>(
    () => (user && cont ? { uid: user.uid, nume: cont.nume, rol: 'instructor' } : null),
    [user, cont],
  );

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

  const TABURI = [
    { href: '/instructor', eticheta: 'Grupele mele', Icon: Users, activ: pathname === '/instructor' || /^\/instructor\/(grupe|prezenta)/.test(pathname) },
    { href: '/instructor/cursanti', eticheta: 'Cursanți', Icon: GraduationCap, activ: pathname.startsWith('/instructor/cursanti') },
    { href: '/instructor/ghid', eticheta: 'Ghid', Icon: HelpCircle, activ: pathname === '/instructor/ghid' },
  ];

  return (
    <EvidentaProvider actor={actor!} grupePermise={cont.grupe}>
      <div className="min-h-svh bg-slate-50 pb-20 [--jos:calc(3.5rem+env(safe-area-inset-bottom))] sm:pb-0 sm:[--jos:0px]">
        <header className="sticky top-0 z-30 bg-slate-900">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2 sm:px-6">
            <Link href="/instructor" aria-label="Grupele mele">
              <LogoPanou />
            </Link>
            {/* taburile, pe ecrane mari */}
            <nav className="ml-3 hidden items-center gap-1 sm:flex">
              {TABURI.map(({ href, eticheta, Icon, activ }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium',
                    activ ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {eticheta}
                </Link>
              ))}
            </nav>
            <Link
              href="/instructor/cont"
              className="ml-auto flex min-w-0 items-center gap-2 rounded-xl px-1.5 py-1 hover:bg-white/10"
              title="Contul meu"
              aria-label="Contul meu"
            >
              <span className="hidden truncate text-xs text-slate-300 md:block">{cont.nume}</span>
              <Avatar avatar={cont.avatar} nume={cont.nume} className="h-9 w-9 text-xs" />
            </Link>
            <button
              onClick={() => signOut(auth)}
              className="flex h-11 w-10 items-center justify-center rounded-xl text-slate-400 hover:text-red-400"
              aria-label="Deconectare"
              title="Deconectare"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-3 sm:p-6">{children}</main>

        {/* taburile, pe telefon: jos, la îndemâna degetului */}
        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden">
          {TABURI.map(({ href, eticheta, Icon, activ }) => (
            <Link
              key={href}
              href={href}
              className={cn('flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium', activ ? 'text-red-600' : 'text-slate-500')}
            >
              <Icon className="h-5 w-5" />
              {eticheta}
            </Link>
          ))}
        </nav>
      </div>
    </EvidentaProvider>
  );
}
