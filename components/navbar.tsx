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
import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Facebook, Instagram } from 'lucide-react';
import GrupeCountBadge from '@/components/grupe-count-badge';
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setIsAdmin(currentUser?.email === 'admin@gmail.com');
    });

    return () => unsubscribe();
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

  // Auto-close dropdown după 3 secunde
  useEffect(() => {
    if (openDropdown) {
      const timer = setTimeout(() => {
        setOpenDropdown(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [openDropdown]);

  const handleLogout = async () => {
    try {
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
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Social icons */}
            <div className="hidden sm:flex items-center gap-2 mr-1">
              <a href="https://www.facebook.com/scoaladedansinpasidedans" title="Facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="text-slate-400 hover:text-blue-600 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/inpasidedans/" title="Instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="text-slate-400 hover:text-pink-500 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.tiktok.com/@in.pasi.de.dans" title="TikTok" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="text-slate-400 hover:text-slate-800 transition-colors">
                <TikTokIcon />
              </a>
            </div>
            {user ? (
              <div className="flex items-center gap-2">
                <Link href={isAdmin ? '/admin' : '/cont'} rel="nofollow">
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {isAdmin ? 'Admin' : 'Contul meu'}
                    </span>
                  </Button>
                </Link>
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
                <Link href="/inscriere">
                  <Button
                    className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 hidden sm:flex"
                    title="Înscrie-te la Cursuri de Dans"
                  >
                    <span className="sm:inline">Înscrie-te</span>
                  </Button>
                </Link>
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
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pl-5">
                <SheetTitle className="sr-only">Meniu de navigare</SheetTitle>
                <MobileNav
                  setIsOpen={setIsOpen}
                  user={user}
                  isAdmin={isAdmin}
                  onLogout={handleLogout}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Second Row - Navigation Menu */}
        <div className="hidden lg:block border-t border-gray-200">
          <div className="flex justify-center py-3">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-wrap justify-center gap-1">
                {/* First Row - Main Services */}
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
                      <GrupeCountBadge />
                      Grupe de dans în formare
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                {/* Cursuri adulți -> open on click, aligned under button */}
                <NavigationMenuItem>
                  <DropdownMenu 
                    open={openDropdown === 'cursuri-adulti'} 
                    onOpenChange={(open) => setOpenDropdown(open ? 'cursuri-adulti' : null)}
                  >
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'hover:text-red-600 transition-colors cursor-pointer text-sm'
                        )}
                        title="Cursuri dans adulți"
                      >
                        Cursuri dans adulți
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" sideOffset={8} className="p-0">
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {dansuriPredate.map(item => (
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

                {/* Cursuri dans copii */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'hover:text-red-600 transition-colors cursor-pointer text-sm'
                    )}
                    title="Cursuri dans copii"
                  >
                    <Link href="/cursuri-dans-copii">Cursuri dans copii</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Dansul mirilor */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'hover:text-red-600 transition-colors cursor-pointer text-sm'
                    )}
                    title="Dansul mirilor"
                  >
                    <Link href="/dansul-mirilor">Dansul mirilor</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Despre noi -> click */}
                <NavigationMenuItem>
                  <DropdownMenu 
                    open={openDropdown === 'despre-noi'} 
                    onOpenChange={(open) => setOpenDropdown(open ? 'despre-noi' : null)}
                  >
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'hover:text-red-600 transition-colors cursor-pointer text-sm'
                        )}
                        title="Despre noi"
                      >
                        Despre noi
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" sideOffset={8} className="p-0">
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {despreNoi.map(item => (
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

                {/* Activități -> click */}
                <NavigationMenuItem>
                  <DropdownMenu 
                    open={openDropdown === 'activitati'} 
                    onOpenChange={(open) => setOpenDropdown(open ? 'activitati' : null)}
                  >
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'hover:text-red-600 transition-colors cursor-pointer text-sm'
                        )}
                        title="Activități"
                      >
                        Activități
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" sideOffset={8} className="p-0">
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {activitati.map(item => (
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

                {/* Program */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'hover:text-red-600 transition-colors cursor-pointer text-sm'
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
                      'hover:text-red-600 transition-colors cursor-pointer text-sm'
                    )}
                    title="Tarife Cursuri de Dans"
                  >
                    <Link href="/tarife">Tarife</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contact */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'hover:text-red-600 transition-colors cursor-pointer text-sm'
                    )}
                    title="Contact Școala de Dans"
                  >
                    <Link href={WEBSITE_URLS.CONTACT}>Contact</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Blog */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'hover:text-red-600 transition-colors cursor-pointer text-sm'
                    )}
                    title="Blog Dans București"
                  >
                    <Link href="/blog">Blog</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileNav({
  setIsOpen,
  user,
  isAdmin,
  onLogout,
}: {
  setIsOpen: (open: boolean) => void;
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
            className="object-contain object-left"
            priority
          />
        </div>
      </Link>
      <div className="grid gap-3">
        <Link
          href="/grupe-in-formare"
          onClick={() => setIsOpen(false)}
          className="py-2 font-medium text-red-600 bg-red-50 px-2 rounded-md"
          title="Grupe Noi Cursuri de Dans"
        >
          Grupe de dans în formare
        </Link>

        {/* Cursuri dans adulți */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="dansuri">
            <AccordionTrigger className="py-2 font-medium">
              Cursuri dans adulți
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2 pl-4">
                {dansuriPredate.map(item => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="py-1 text-muted-foreground hover:text-foreground"
                    title={item.title}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Cursuri dans copii */}
        <Link
          href="/cursuri-dans-copii"
          onClick={() => setIsOpen(false)}
          className="py-2 font-medium"
          title="Cursuri dans copii"
        >
          Cursuri dans copii
        </Link>

        {/* Dansul mirilor */}
        <Link
          href="/dansul-mirilor"
          onClick={() => setIsOpen(false)}
          className="py-2 font-medium"
          title="Dansul mirilor"
        >
          Dansul mirilor
        </Link>

        {/* Despre noi */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="despre">
            <AccordionTrigger className="py-2 font-medium">
              Despre noi
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2 pl-4">
                {despreNoi.map(item => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="py-1 text-muted-foreground hover:text-foreground"
                    title={item.title}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Activități */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="activitati">
            <AccordionTrigger className="py-2 font-medium">
              Activități
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2 pl-4">
                {activitati.map(item => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="py-1 text-muted-foreground hover:text-foreground"
                    title={item.title}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
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

const dansuriPredate = [
  {
    title: 'Dansuri latino',
    href: '/dansuri-latino',
    description:
      'Salsa, bachata, cha-cha, rumba și alte dansuri latino pline de pasiune.',
  },
  {
    title: 'Dansuri de societate',
    href: '/dansuri-de-societate',
    description: 'Vals, tango, foxtrot și alte dansuri elegante de societate.',
  },
  {
    title: 'Dansuri populare',
    href: '/dansuri-populare',
    description: 'Învață dansuri tradiționale românești și internaționale.',
  },
  {
    title: 'Cursuri particulare de dans',
    href: '/lectii-private',
    description:
      'Dansul mirilor, dansuri latino și de societate, dansuri populare etc.',
  },
];

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
