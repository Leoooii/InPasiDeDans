"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, User } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter } from "next/navigation"

// Adaugă importul pentru ThemeToggle
import ThemeToggle from "@/components/theme-toggle"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      // Verificăm dacă utilizatorul este admin (are email-ul admin@gmail.com)
      setIsAdmin(currentUser?.email === "admin@gmail.com")
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Eroare la deconectare:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center max-w-full px-4 md:px-6">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
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
          <SheetContent side="left" className="pr-0">
            <SheetTitle className="sr-only">Meniu de navigare</SheetTitle>
            <MobileNav setIsOpen={setIsOpen} user={user} isAdmin={isAdmin} onLogout={handleLogout} />
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="relative h-16 w-[200px]">
            <Image src="/images/logo.png" alt="In pasi de Dans" fill className="object-contain object-left" priority />
          </div>
        </Link>
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-wrap justify-center">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-red-600 transition-colors cursor-pointer">
                  Dansuri predate
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {dansuriPredate.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/program" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "hover:text-red-600 transition-colors cursor-pointer")}
                  >
                    Program
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/tarife" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "hover:text-red-600 transition-colors cursor-pointer")}
                  >
                    Tarife
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/galerie" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "hover:text-red-600 transition-colors cursor-pointer")}
                  >
                    Galerie
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/despre-noi" legacyBehavior passHref>
                  <NavigationMenuTrigger className="hover:text-red-600 transition-colors cursor-pointer">
                    Despre noi
                  </NavigationMenuTrigger>
                </Link>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {despreNoi.map((item) => (
                      <ListItem key={item.title} title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "hover:text-red-600 transition-colors cursor-pointer")}
                  >
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-2">
              <Link href={isAdmin ? "/admin" : "/cont"}>
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{isAdmin ? "Admin" : "Contul meu"}</span>
                </Button>
              </Link>
              <Button variant="ghost" className="hidden sm:flex" onClick={handleLogout}>
                Deconectare
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/autentificare">
                <Button variant="outline" className="hidden sm:flex">
                  Autentificare
                </Button>
              </Link>
              <Link href="/inscriere">
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  <span className="sm:inline">Înscrie-te</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function MobileNav({
  setIsOpen,
  user,
  isAdmin,
  onLogout,
}: {
  setIsOpen: (open: boolean) => void
  user: any
  isAdmin: boolean
  onLogout: () => void
}) {
  const [openDansuri, setOpenDansuri] = useState(false)
  const [openDespre, setOpenDespre] = useState(false)

  return (
    <div className="grid gap-6 text-base">
      <Link href="/" className="flex items-center gap-1" onClick={() => setIsOpen(false)}>
        <div className="relative h-14 w-[180px]">
          <Image src="/images/logo.png" alt="In pasi de Dans" fill className="object-contain object-left" priority />
        </div>
      </Link>
      <div className="grid gap-3">
        <div>
          <button
            onClick={() => setOpenDansuri(!openDansuri)}
            className="flex w-full items-center justify-between py-2 font-medium"
          >
            Dansuri predate
            <ChevronDown className={cn("h-4 w-4 transition-transform", openDansuri ? "rotate-180" : "")} />
          </button>
          {openDansuri && (
            <div className="grid gap-2 pl-4">
              {dansuriPredate.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="py-1 text-muted-foreground hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link href="/program" onClick={() => setIsOpen(false)} className="py-2 font-medium">
          Program
        </Link>
        <Link href="/tarife" onClick={() => setIsOpen(false)} className="py-2 font-medium">
          Tarife
        </Link>
        <Link href="/galerie" onClick={() => setIsOpen(false)} className="py-2 font-medium">
          Galerie
        </Link>
        <div>
          <Link href="/despre-noi" className="flex w-full items-center justify-between py-2 font-medium">
            Despre noi
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", openDespre ? "rotate-180" : "")}
              onClick={(e) => {
                e.preventDefault()
                setOpenDespre(!openDespre)
              }}
            />
          </Link>
          {openDespre && (
            <div className="grid gap-2 pl-4">
              {despreNoi.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="py-1 text-muted-foreground hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link href="/contact" onClick={() => setIsOpen(false)} className="py-2 font-medium">
          Contact
        </Link>

        {user ? (
          <>
            <Link href={isAdmin ? "/admin" : "/cont"} onClick={() => setIsOpen(false)} className="py-2 font-medium">
              {isAdmin ? "Panou Admin" : "Contul meu"}
            </Link>
            <button
              onClick={() => {
                onLogout()
                setIsOpen(false)
              }}
              className="py-2 font-medium text-left"
            >
              Deconectare
            </button>
          </>
        ) : (
          <>
            <Link href="/autentificare" onClick={() => setIsOpen(false)} className="py-2 font-medium">
              Autentificare
            </Link>
            <Link href="/inscriere" onClick={() => setIsOpen(false)} className="py-2 font-medium">
              Înscrie-te
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

const dansuriPredate = [
  {
    title: "Cursuri dans adulți",
    href: "/cursuri-dans-adulti",
    description: "Cursuri de dans pentru adulți de toate vârstele și nivelurile de experiență.",
  },
  {
    title: "Cursuri dans copii",
    href: "/cursuri-dans-copii",
    description: "Cursuri de dans pentru copii adaptate pe grupe de vârstă și nivel.",
  },
  {
    title: "Dansuri populare",
    href: "/dansuri-populare",
    description: "Învață dansuri tradiționale românești și internaționale.",
  },
  {
    title: "Dansuri de societate",
    href: "/dansuri-de-societate",
    description: "Vals, tango, foxtrot și alte dansuri elegante de societate.",
  },
  {
    title: "Dansuri latino",
    href: "/dansuri-latino",
    description: "Salsa, bachata, cha-cha, rumba și alte dansuri latino pline de pasiune.",
  },
  {
    title: "Grupe în formare",
    href: "/grupe-in-formare",
    description: "Noi grupe de dans în curs de formare. Înscrie-te acum!",
  },
]

const despreNoi = [
  {
    title: "Instructori",
    href: "/instructori",
    description: "Cunoaște echipa noastră de instructori profesioniști cu experiență.",
  },
  {
    title: "Excursii în pași de dans",
    href: "/excursii",
    description: "Participă la excursiile noastre tematice dedicate dansului.",
  },
  {
    title: "Testimoniale",
    href: "/testimoniale",
    description: "Vezi ce spun elevii noștri despre experiența lor la cursurile noastre.",
  },
  {
    title: "Petreceri în pași de dans",
    href: "/petreceri",
    description: "Participă la petrecerile noastre tematice unde poți practica ce ai învățat.",
  },
]

