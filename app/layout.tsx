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
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'În Pași de Dans | Școală de dans',
  description:
    'Școală de dans cu tradiție din 2009; organizăm cursuri pentru adulți și copii (dansuri latino,  dansuri de societate,  dansuri populare, lecții private pentru miri).',
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
        <Analytics />
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
        
      </body>
    </html>
  );
}

import './globals.css';
