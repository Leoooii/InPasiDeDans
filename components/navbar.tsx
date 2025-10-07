'use client';

import React, { useState, useEffect } from 'react';
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
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <title>Icoană TikTok</title>
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
    <path d="M15 8h.01"></path>
    <path d="M12 2v7a4 4 0 0 0 4 4h1"></path>
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setIsAdmin(currentUser?.email === 'admin@gmail.com');
    });

    return () => unsubscribe();
  }, []);

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Social Media Bar */}
      <div className="w-full border-b bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container flex h-10 items-center max-w-full px-4 md:px-6">
          <div className="w-1/4 flex items-center space-x-4">
            <a
              href="https://www.facebook.com/scoaladedansinpasidedans"
              title="Urmărește-ne pe Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/inpasidedans/"
              title="Urmărește-ne pe Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.tiktok.com/@in.pasi.de.dans"
              title="Urmărește-ne pe TikTok"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
          </div>
          <div className="w-3/4"></div>
        </div>
      </div>

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

          <div className="flex items-center gap-2">
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
                  <Link href="/grupe-in-formare" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'hover:text-red-600 transition-colors cursor-pointer bg-red-50 text-red-600 font-semibold animate-bounce text-sm'
                      )}
                      title="Grupe de dans în formare"
                    >
                      Grupe de dans în formare
                    </NavigationMenuLink>
                  </Link>
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

                <NavigationMenuItem>
                  <Link href="/dansul-mirilor" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'hover:text-red-600 transition-colors cursor-pointer text-sm'
                      )}
                      title="Dansul mirilor"
                    >
                      Dansul mirilor
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/cursuri-dans-copii" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'hover:text-red-600 transition-colors cursor-pointer text-sm'
                      )}
                      title="Cursuri dans copii"
                    >
                      Cursuri dans copii
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Second Row - Info & Activities */}
                <NavigationMenuItem>
                  <Link href="/program" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'hover:text-red-600 transition-colors cursor-pointer text-sm'
                      )}
                      title="Program Cursuri de Dans"
                    >
                      Program
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/tarife" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'hover:text-red-600 transition-colors cursor-pointer text-sm'
                      )}
                      title="Tarife Cursuri de Dans"
                    >
                      Tarife
                    </NavigationMenuLink>
                  </Link>
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

                <NavigationMenuItem>
                  <Link href={WEBSITE_URLS.CONTACT} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'hover:text-red-600 transition-colors cursor-pointer text-sm'
                      )}
                      title="Contact Școala de Dans"
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
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
        <Link
          href="/cursuri-dans-copii"
          onClick={() => setIsOpen(false)}
          className="py-2 font-medium"
          title="Program Cursuri de Dans"
        >
          Cursuri dans copii
        </Link>
        <Link
          href="/dansul-mirilor"
          onClick={() => setIsOpen(false)}
          className="py-2 font-medium"
          title="Program Cursuri de Dans"
        >
          Dansul mirilor
        </Link>
        <Link
          href="/program"
          onClick={() => setIsOpen(false)}
          className="py-2 font-medium"
          title="Program Cursuri de Dans"
        >
          Program
        </Link>
        <Link
          href="/tarife"
          onClick={() => setIsOpen(false)}
          className="py-2 font-medium"
          title="Tarife Cursuri de Dans"
        >
          Tarife
        </Link>
        <Link
          href={WEBSITE_URLS.CONTACT}
          onClick={() => setIsOpen(false)}
          className="py-2 font-medium"
          title="Contact Școala de Dans"
        >
          Contact
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
