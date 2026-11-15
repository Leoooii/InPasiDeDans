'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, User } from 'lucide-react';
import { cn, WEBSITE_URLS } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { usePathname, useRouter } from 'next/navigation';
import { Facebook, Instagram } from 'lucide-react';
import GrupeCountBadge from '@/components/grupe-count-badge';
import { usePublicData } from '@/components/public-data-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Component pentru TikTok
const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <title>Icoană TikTok</title>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const router = useRouter();
  const pathname = usePathname();
  const activ = (href: string) => (pathname?.startsWith(href) ? 'bg-red-50 text-red-600' : '');
  const activInGrup = (items: { href: string }[]) =>
    items.some(item => pathname?.startsWith(item.href)) ? 'bg-red-50 text-red-600' : '';
  const { grupe } = usePublicData();
  const areGrupeNoi = !!grupe && grupe.length > 0;

  // Firebase (~110 KB) se încarcă abia după ce pagina e gata: vizitatorii nu au nevoie de el,
  // iar butonul „Contul meu” apare oricum doar celor logați.
  useEffect(() => {
    let anulat = false;
    let opreste: (() => void) | undefined;
    const porneste = async () => {
      const [{ auth }, { onAuthStateChanged }] = await Promise.all([import('@/lib/firebase'), import('firebase/auth')]);
      if (anulat) return;
      opreste = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setIsAdmin(currentUser?.email === 'admin@gmail.com');
      });
    };
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) ric(() => void porneste(), { timeout: 4000 });
    else setTimeout(() => void porneste(), 2000);
    return () => {
      anulat = true;
      opreste?.();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY < 80) {
        setVisible(true)
      } else if (currentY > lastScrollY.current) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const handleLogout = async () => {
    try {
      const [{ auth }, { signOut }] = await Promise.all([import('@/lib/firebase'), import('firebase/auth')]);
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Eroare la deconectare:', error);
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* Main Navigation */}
      <div className="container max-w-full px-4 md:px-6">
        {/* First Row - Logo and User Actions */}
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-14 w-[180px]">
              <Image
                src="/images/logo.png"
                alt="Logo În Pași de Dans"
                title="Acasă - În Pași de Dans"
                fill
                sizes="180px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Social icons */}
            <div className="hidden sm:flex items-center gap-2 mr-1">
              <a href="https://www.facebook.com/scoaladedansinpasidedans" title="Facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="text-slate-400 hover:text-red-600 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/inpasidedans/" title="Instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="text-slate-400 hover:text-red-600 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.tiktok.com/@inpasidedans" title="TikTok" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="text-slate-400 hover:text-red-600 transition-colors">
                <TikTokIcon />
              </a>
            </div>
            {user ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex items-center gap-2" asChild><Link href={isAdmin ? '/admin' : '/cont'} rel="nofollow">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {isAdmin ? 'Admin' : 'Contul meu'}
                    </span>
                  </Link></Button>
                <Button
                  variant="ghost"
                  className="hidden sm:flex"
                  onClick={handleLogout}
                >
                  Deconectare
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="brand"
                    className="h-9 px-3 sm:h-10 sm:px-4"
                    title="Înscrie-te la Cursuri de Dans" asChild><Link href="/inscriere">
                    <span className="sm:inline">Înscrie-te</span>
                  </Link></Button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="mx-2 lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                  <span className="sr-only">Deschide meniul</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pl-5">
                <SheetTitle className="sr-only">Meniu de navigare</SheetTitle>
                <MobileNav
                  setIsOpen={setIsOpen}
                  areGrupeNoi={areGrupeNoi}
                  user={user}
                  isAdmin={isAdmin}
                  onLogout={handleLogout}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Second Row - Navigation Menu */}
        <div className="hidden lg:block border-t border-slate-200">
          <div className="flex justify-center py-3">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-wrap justify-center gap-1">
                {/* „Grupe noi” apare doar când există grupe publice în formare */}
                {areGrupeNoi && (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'hover:text-red-600 transition-colors cursor-pointer bg-red-50 text-red-600 font-semibold text-sm'
                      )}
                      title="Grupe de dans în formare"
                    >
                      <Link href="/grupe-in-formare" className="flex items-center gap-1">
                        Grupe noi
                        <GrupeCountBadge />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}

                {/* Cursuri -> click */}
                <NavigationMenuItem>
                  <DropdownMenu
                    open={openDropdown === 'cursuri'}
                    onOpenChange={(open) => setOpenDropdown(open ? 'cursuri' : null)}
                  >
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'hover:text-red-600 transition-colors cursor-pointer text-sm',
                          activInGrup(toateCursurile)
                        )}
                        title="Cursuri de dans"
                      >
                        Cursuri
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" sideOffset={8} className="p-0">
                      <div className="grid w-[560px] grid-cols-2 gap-3 p-4 lg:w-[640px]">
                        <div>
                          <Link
                            href={cursuriAdulti.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            title={cursuriAdulti.title}
                          >
                            <div className="text-sm font-semibold leading-none">{cursuriAdulti.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {cursuriAdulti.description}
                            </p>
                          </Link>
                          <ul className="ml-3 mt-1 grid gap-0.5 border-l border-slate-200 pl-2">
                            {dansuriAdulti.map(item => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className={cn(
                                    'block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                                    item.indent && 'pl-6 text-muted-foreground'
                                  )}
                                  title={item.title}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <ul className="grid content-start gap-1">
                          {alteCursuri.map(item => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setOpenDropdown(null)}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                                title={item.title}
                              >
                                <div className="flex items-center text-sm font-medium leading-none">
                                  {item.title}
                                  {item.href === '/grupe-in-formare' && <GrupeCountBadge />}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>

                {/* Program */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'hover:text-red-600 transition-colors cursor-pointer text-sm',
                      activ('/program')
                    )}
                    title="Program Cursuri de Dans"
                  >
                    <Link href="/program">Program</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Tarife */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'hover:text-red-600 transition-colors cursor-pointer text-sm',
                      activ('/tarife')
                    )}
                    title="Tarife Cursuri de Dans"
                  >
                    <Link href="/tarife">Tarife</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Activități + Despre noi -> click */}
                {meniuriSimple.map(meniu => (
                  <NavigationMenuItem key={meniu.id}>
                    <DropdownMenu
                      open={openDropdown === meniu.id}
                      onOpenChange={(open) => setOpenDropdown(open ? meniu.id : null)}
                    >
                      <DropdownMenuTrigger asChild>
                        <button
                          className={cn(
                            navigationMenuTriggerStyle(),
                            'hover:text-red-600 transition-colors cursor-pointer text-sm',
                            activInGrup(meniu.items)
                          )}
                          title={meniu.title}
                        >
                          {meniu.title}
                          <ChevronDown className="ml-1 h-3 w-3" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" sideOffset={8} className="p-0">
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {meniu.items.map(item => (
                            <li key={item.title}>
                              <Link
                                href={item.href}
                                onClick={() => setOpenDropdown(null)}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                                title={item.title}
                              >
                                <div className="text-sm font-medium leading-none">{item.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </NavigationMenuItem>
                ))}

                {/* Blog */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'hover:text-red-600 transition-colors cursor-pointer text-sm',
                      activ('/blog')
                    )}
                    title="Blog Dans București"
                  >
                    <Link href="/blog">Blog</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contact */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'hover:text-red-600 transition-colors cursor-pointer text-sm',
                      activ('/contact')
                    )}
                    title="Contact Școala de Dans"
                  >
                    <Link href={WEBSITE_URLS.CONTACT}>Contact</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileNav({
  setIsOpen,
  areGrupeNoi,
  user,
  isAdmin,
  onLogout,
}: {
  setIsOpen: (open: boolean) => void;
  areGrupeNoi: boolean;
  user: any;
  isAdmin: boolean;
  onLogout: () => void;
}) {
  return (
    <div className="grid gap-6 text-base">
      <Link
        href="/"
        className="flex items-center gap-1"
        onClick={() => setIsOpen(false)}
        title="Acasă - În Pași de Dans"
      >
        <div className="relative h-14 w-[180px]">
          <Image
            src="/images/logo.png"
            alt="Logo În Pași de Dans"
            fill
            sizes="180px"
            className="object-contain object-left"
            priority
          />
        </div>
      </Link>
      <div className="grid gap-3">
        {areGrupeNoi && (
          <Link
            href="/grupe-in-formare"
            onClick={() => setIsOpen(false)}
            className="flex items-center py-2 font-medium text-red-600 bg-red-50 px-2 rounded-md"
            title="Grupe de dans în formare"
          >
            Grupe noi
            <GrupeCountBadge />
          </Link>
        )}

        <Accordion type="single" collapsible className="w-full">
          {/* Cursuri */}
          <AccordionItem value="cursuri">
            <AccordionTrigger className="py-2 font-medium">
              Cursuri
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-1 pl-4">
                <Link
                  href={cursuriAdulti.href}
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 font-medium text-foreground"
                  title={cursuriAdulti.title}
                >
                  {cursuriAdulti.title}
                </Link>
                <div className="grid gap-1 border-l border-slate-200 pl-3">
                  {dansuriAdulti.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn('py-2 text-muted-foreground hover:text-foreground', item.indent && 'pl-4')}
                      title={item.title}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
                {alteCursuri.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center py-2.5 font-medium text-foreground"
                    title={item.title}
                  >
                    {item.title}
                    {item.href === '/grupe-in-formare' && <GrupeCountBadge />}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Activități + Despre noi */}
          {meniuriSimple.map(meniu => (
            <AccordionItem key={meniu.id} value={meniu.id}>
              <AccordionTrigger className="py-2 font-medium">
                {meniu.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 pl-4">
                  {meniu.items.map(item => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="py-2.5 text-muted-foreground hover:text-foreground"
                      title={item.title}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Program */}
        <Link
          href="/program"
          onClick={() => setIsOpen(false)}
          className="py-2 font-medium"
          title="Program Cursuri de Dans"
        >
          Program
        </Link>

        {/* Tarife */}
        <Link
          href="/tarife"
          onClick={() => setIsOpen(false)}
          className="py-2 font-medium"
          title="Tarife Cursuri de Dans"
        >
          Tarife
        </Link>

        {/* Contact */}
        <Link
          href={WEBSITE_URLS.CONTACT}
          onClick={() => setIsOpen(false)}
          className="py-2 font-medium"
          title="Contact Școala de Dans"
        >
          Contact
        </Link>

        {/* Blog */}
        <Link
          href="/blog"
          onClick={() => setIsOpen(false)}
          className="py-2 font-medium"
          title="Blog Dans București"
        >
          Blog
        </Link>
        {user ? (
          <>
            <Link
              href={isAdmin ? '/admin' : '/cont'}
              onClick={() => setIsOpen(false)}
              className="py-2 font-medium"
              title={isAdmin ? 'Panou Admin' : 'Contul meu'}
              rel="nofollow"
            >
              {isAdmin ? 'Panou Admin' : 'Contul meu'}
            </Link>
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="py-2 font-medium text-left"
            >
              Deconectare
            </button>
          </>
        ) : (
          <Link
            href="/inscriere"
            onClick={() => setIsOpen(false)}
            className="py-2 font-medium"
            title="Înscrie-te la Cursuri de Dans"
          >
            Înscrie-te
          </Link>
        )}
        
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          title={title}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

type ItemMeniu = { title: string; href: string; description?: string };

const cursuriAdulti: ItemMeniu = {
  title: 'Cursuri dans adulți',
  href: '/cursuri-dans-adulti',
  description: 'Toate cursurile de grup pentru adulți, de la începători la avansați.',
};

const dansuriAdulti: (ItemMeniu & { indent?: boolean })[] = [
  { title: 'Dansuri latino', href: '/dansuri-latino' },
  { title: 'Salsa și bachata', href: '/dansuri-latino/salsa-bachata', indent: true },
  { title: 'Dansuri de societate', href: '/dansuri-de-societate' },
  { title: 'Dansuri populare', href: '/dansuri-populare' },
];

const alteCursuri: ItemMeniu[] = [
  {
    title: 'Cursuri dans copii',
    href: '/cursuri-dans-copii',
    description: 'Grupe de dans pentru copii, pe vârste.',
  },
  {
    title: 'Dansul mirilor',
    href: '/dansul-mirilor',
    description: 'Pregătire pentru primul dans la nuntă.',
  },
  {
    title: 'Lecții private',
    href: '/lectii-private',
    description: 'Dansul mirilor, dansuri latino și de societate, dansuri populare etc.',
  },
  {
    title: 'Grupe în formare',
    href: '/grupe-in-formare',
    description: 'Grupele noi care încep în curând.',
  },
];

const toateCursurile: ItemMeniu[] = [cursuriAdulti, ...dansuriAdulti, ...alteCursuri];

const despreNoi = [
  {
    title: 'Cine suntem',
    href: '/despre-noi',
    description:
      'Când a fost înființată școala de dans și cine coordonează activitatea',
  },
  {
    title: 'Instructori',
    href: '/instructori',
    description:
      'Cunoaște echipa noastră de instructori profesioniști cu experiență.',
  },
];

const activitati = [
  {
    title: 'Excursii',
    href: '/excursii',
    description: 'Excursii pentru cursanții noștri, în țară și în afară',
  },
  {
    title: 'Petreceri',
    href: '/petreceri',
    description: 'Petreceri memorabile cu mult dans și voie bună',
  },
  {
    title: 'Noutăți',
    href: '/noutati',
    description: 'Concursuri de dans, festivaluri și congrese.',
  },
];

const meniuriSimple: { id: string; title: string; items: ItemMeniu[] }[] = [
  { id: 'activitati', title: 'Activități', items: activitati },
  { id: 'despre-noi', title: 'Despre noi', items: despreNoi },
];
