'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';
import { Avatar } from '@/components/evidenta/avatar';
import { LogoPanou } from '@/components/evidenta/logo';
import { useProfilAdmin } from '@/lib/evidenta/profil';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  Loader2,
  LayoutDashboard,
  Users,
  Calendar,
  Menu,
  FileText,
  Map,
  Music,
  UserCog,
  LogOut,
  ChevronRight,
  X,
  Tag,
  GraduationCap,
  BookOpen,
  Image,
  BarChart3,
  ClipboardList,
  History,
  KeyRound,
  Download,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Wallet,
} from 'lucide-react';

const navGroups = [
  {
    label: 'Management',
    items: [
      {
        href: '/admin',
        label: 'Dashboard',
        icon: LayoutDashboard,
        exact: true,
      },
      { href: '/admin/inscrieri', label: 'Înscrieri', icon: ClipboardList },
      { href: '/admin/grupe', label: 'Grupe', icon: BookOpen },
      { href: '/admin/statistici', label: 'Statistici', icon: BarChart3 },
    ],
  },
  {
    label: 'Evidență cursanți',
    items: [
      { href: '/admin/evidenta', label: 'Grupe și prezență', icon: Users, exact: true },
      { href: '/admin/evidenta/cursanti', label: 'Cursanți', icon: GraduationCap },
      { href: '/admin/evidenta/istoric', label: 'Istoric', icon: History },
      { href: '/admin/evidenta/incasari', label: 'Încasări', icon: Wallet },
      { href: '/admin/evidenta/instructori', label: 'Conturi instructori', icon: KeyRound },
      { href: '/admin/evidenta/export', label: 'Export și backup', icon: Download },
      { href: '/admin/evidenta/ghid', label: 'Ghid', icon: HelpCircle },
    ],
  },
  {
    label: 'Conținut site',
    items: [
      // { href: '/admin/utilizatori', label: 'Utilizatori', icon: Users },
      { href: '/admin/evenimente', label: 'Evenimente', icon: FileText },
      { href: '/admin/excursii', label: 'Excursii', icon: Map },
      { href: '/admin/petreceri', label: 'Petreceri', icon: Music },
      { href: '/admin/instructori', label: 'Instructori', icon: UserCog },
      { href: '/admin/tarife', label: 'Tarife', icon: Tag },
      // { href: '/admin/galerie', label: 'Galerie', icon: Image },
    ],
  },
];

// flat list used for active-state detection
const navItems = navGroups.flatMap(g => g.items);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // bara laterală restrânsă (doar iconițe) pe desktop; ținută minte în browser
  const [restrans, setRestrans] = useState(false);
  const profil = useProfilAdmin();

  useEffect(() => {
    try {
      setRestrans(localStorage.getItem('admin-bara-restransa') === '1');
    } catch {}
  }, []);

  const comutaBara = () => {
    setRestrans(r => {
      try {
        localStorage.setItem('admin-bara-restransa', r ? '0' : '1');
      } catch {}
      return !r;
    });
  };
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        if (user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
          setIsAdmin(true);
        } else {
          // instructorii au portalul lor; /panou îi trimite unde trebuie
          router.push('/panou');
        }
      } else {
        router.push('/panou');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/panou');
  };

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return (
        pathname === href ||
        (pathname === '/admin' &&
          !navItems.some(
            item => !item.exact && pathname?.startsWith(item.href + '/'),
          ))
      );
    }
    return pathname === href || pathname?.startsWith(href + '/');
  };

  const isDashboardActive =
    pathname === '/admin' &&
    !navItems
      .filter(i => !i.exact)
      .some(i => pathname?.startsWith(i.href + '/'));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-red-600" />
          <p className="mt-3 text-sm text-slate-500">Se încarcă panoul...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const SidebarContent = ({
    onNavigate = () => {},
    compact = false,
  }: {
    onNavigate?: () => void;
    /** doar iconițele (bara restrânsă pe desktop) */
    compact?: boolean;
  }) => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className={`border-b border-white/10 ${compact ? 'px-3 py-5' : 'px-5 py-6'}`}>
        <div className={`flex items-center gap-3 ${compact ? 'flex-col' : ''}`}>
          <Link href="/admin" onClick={onNavigate} aria-label="Dashboard" className={compact ? '' : 'min-w-0'}>
            <LogoPanou compact={compact} />
          </Link>
          {!compact && <p className="min-w-0 flex-1 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Panou admin</p>}
          <button
            onClick={comutaBara}
            className="hidden md:flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white"
            aria-label={compact ? 'Extinde meniul' : 'Restrânge meniul'}
            title={compact ? 'Extinde meniul' : 'Restrânge meniul'}
          >
            {compact ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className={`flex-1 py-4 space-y-4 overflow-y-auto ${compact ? 'px-2' : 'px-3'}`}>
        {navGroups.map(group => (
          <div key={group.label}>
            {compact ? (
              <div className="mx-2 mb-2 border-t border-white/10" />
            ) : (
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">{group.label}</p>
            )}
            <div className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon, exact }) => {
                const active =
                  href === '/admin'
                    ? isDashboardActive
                    : href === '/admin/evidenta'
                      ? pathname === href || !!pathname?.match(/^\/admin\/evidenta\/(grupe|prezenta)/)
                      : exact
                        ? pathname === href
                        : isActive(href);
                return (
                  <Link key={href} href={href} onClick={onNavigate} title={compact ? label : undefined} aria-label={label}>
                    <span
                      className={`flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-150 group cursor-pointer ${
                        compact ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5'
                      } ${active ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <Icon
                        className={`h-4 w-4 flex-shrink-0 ${active ? 'text-red-400' : 'text-slate-500 group-hover:text-slate-300'}`}
                      />
                      {!compact && label}
                      {!compact && active && <ChevronRight className="h-3 w-3 ml-auto text-slate-500" />}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Cont + deconectare */}
      <div className={`py-3 border-t border-white/10 space-y-1 ${compact ? 'px-2' : 'px-3'}`}>
        <Link
          href="/admin/cont"
          onClick={onNavigate}
          title="Contul meu"
          className={`flex items-center gap-3 rounded-lg py-2 hover:bg-white/5 ${compact ? 'justify-center' : 'px-2'} ${
            pathname === '/admin/cont' ? 'bg-white/10' : ''
          }`}
        >
          <Avatar avatar={profil?.avatar} nume={profil?.nume ?? 'Admin'} className="h-9 w-9 text-xs" />
          {!compact && (
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-white">{profil?.nume ?? 'Admin'}</span>
              <span className="block text-xs text-slate-400">Contul meu</span>
            </span>
          )}
        </Link>
        <button
          onClick={handleLogout}
          title="Deconectare"
          className={`flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 w-full ${
            compact ? 'justify-center' : 'px-3'
          }`}
        >
          <LogOut className="h-4 w-4" />
          {!compact && 'Deconectare'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* evidența se poate instala ca aplicație (vezi /panou); React mută link-urile în <head> */}
      <link rel="manifest" href="/evidenta/manifest.webmanifest" />
      <link rel="apple-touch-icon" href="/evidenta/apple-touch-icon.png" />
      {/* Desktop sidebar */}
      <aside className={`hidden md:flex flex-col bg-slate-900 fixed inset-y-0 left-0 z-30 transition-[width] duration-200 ${restrans ? 'w-16' : 'w-60'}`}>
        <SidebarContent compact={restrans} />
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-slate-900 transform transition-transform duration-300 md:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent onNavigate={() => setIsMobileOpen(false)} />
      </aside>

      {/* Main area */}
      <div className={`flex-1 min-w-0 flex flex-col min-h-screen transition-[margin] duration-200 ${restrans ? 'md:ml-16' : 'md:ml-60'}`}>
        {/* Mobile topbar */}
        <header className="md:hidden sticky top-0 z-20 bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-slate-700">
            Panou Admin
          </span>
          <div className="w-9" />
        </header>

        {/* Page content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}
