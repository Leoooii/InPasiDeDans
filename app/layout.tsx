import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { SimpleToastProvider } from '@/components/simple-toast-provider';
const inter = Inter({ subsets: ['latin'] });
import { Analytics } from '@vercel/analytics/next';

import Script from 'next/script';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WW2XMBSS');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-WW2XMBSS"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <Script
          id="schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'DanceSchool',
              name: 'În Pași de Dans',
              description:
                'Școală de dans cu tradiție din 2009, oferind cursuri de dansuri latino, de societate, populare și lecții private în București.',
              url: 'https://inpasidedans.ro/',
              logo: 'https://inpasidedans.ro/images/logo.png',
              sameAs: [
                'https://www.facebook.com/scoaladedansinpasidedans',
                'https://www.instagram.com/inpasidedans/',
                'https://www.tiktok.com/@in.pasi.de.dans',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+40722675126',
                contactType: 'customer service',
                areaServed: 'RO',
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Calea Rahovei 262',
                addressLocality: 'București',
                addressRegion: 'Sector 5',
                postalCode: '050897',
                addressCountry: 'RO',
              },
            }),
          }}
        />
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SimpleToastProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SimpleToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
