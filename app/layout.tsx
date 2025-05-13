import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { SimpleToastProvider } from '@/components/simple-toast-provider';
const inter = Inter({ subsets: ['latin'] });
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'In pasi de Dans | Școală de dans',
  description:
    'Școală de dans cu tradiție din 2009, oferind cursuri pentru adulți și copii',
  generator: 'v0.dev',
  icons: '/images/favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SimpleToastProvider>
            <Navbar />
            <main className="min-h-screen ">{children}</main>
            <Footer />
          </SimpleToastProvider>
        </ThemeProvider>
        <Link
          href="/grupe-in-formare"
          className="fixed bottom-8 right-8 z-50 group"
        >
          <div className="relative">
            <Button
              size="lg"
              className="bg-red-600 text-white hover:bg-red-700 shadow-lg animate-bounce"
            >
              <span className="flex items-center gap-2">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                </span>
                Grupe în formare!
              </span>
            </Button>
          </div>
        </Link>
      </body>
    </html>
  );
}

import './globals.css';
