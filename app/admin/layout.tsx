'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  Loader2,
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  Menu,
  CreditCard,
  FileText,
  Map,
  Music,
  UserCog,
  LogOut,
  ChevronRight,
  X,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/utilizatori', label: 'Utilizatori', icon: Users },
  { href: '/admin/grupe', label: 'Grupe', icon: BookOpen },
  { href: '/admin/prezenta', label: 'Prezență zilnică', icon: Calendar },
  { href: '/admin/abonamente', label: 'Abonamente', icon: CreditCard },
  { href: '/admin/evenimente', label: 'Evenimente', icon: FileText },
  { href: '/admin/excursii', label: 'Excursii', icon: Map },
  { href: '/admin/petreceri', label: 'Petreceri', icon: Music },
  { href: '/admin/instructori', label: 'Instructori', icon: UserCog },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        if (user.email === 'admin@gmail.com') {
          setIsAdmin(true);
        } else {
          router.push('/cont');
        }
      } else {
        router.push('/autentificare');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/autentificare');
  };

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return (
        pathname === href ||
        (pathname === '/admin' &&
          !navItems.some(
            item => !item.exact && pathname?.startsWith(item.href + '/')
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

  const SidebarContent = ({ onNavigate = () => {} }: { onNavigate?: () => void }) => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">IP</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">În Pași de Dans</p>
            <p className="text-slate-400 text-xs">Panou Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? isDashboardActive : isActive(href);
          return (
            <Link key={href} href={href} onClick={onNavigate}>
              <span
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group cursor-pointer ${
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`h-4 w-4 flex-shrink-0 ${active ? 'text-red-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                {label}
                {active && <ChevronRight className="h-3 w-3 ml-auto text-slate-500" />}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 w-full"
        >
          <LogOut className="h-4 w-4" />
          Deconectare
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-slate-900 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
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
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        {/* Mobile topbar */}
        <header className="md:hidden sticky top-0 z-20 bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-slate-700">Panou Admin</span>
          <div className="w-9" />
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
