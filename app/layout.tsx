import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import ConditionalLayout from '@/components/conditional-layout';
import { SimpleToastProvider } from '@/components/simple-toast-provider';
const inter = Inter({ subsets: ['latin'] });
import { Analytics } from '@vercel/analytics/next';
import { SCHOOL_SCHEMA } from '@/lib/schema-constants';
import Script from 'next/script';
import { PublicDataProvider } from '@/components/public-data-provider';
import { getGrupePublice, getInstructori, getTarife, safe } from '@/lib/public-data';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.inpasidedans.ro'),
  title: 'Școală de Dans București | În Pași de Dans',
  description:
    'Școală de dans în București din 2009: cursuri pentru adulți și copii, dansuri latino, de societate, populare și dansul mirilor.',
  openGraph: {
    type: 'website',
    siteName: 'În Pași de Dans',
    locale: 'ro_RO',
    images: [{ url: '/images/logo.png', alt: 'În Pași de Dans' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [tarife, instructori, grupe] = await Promise.all([
    safe(getTarife, null),
    safe(getInstructori, null),
    safe(getGrupePublice, null),
  ]);

  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager — „lazyOnload”: se încarcă după pagină, ca să nu încetinească telefonul */}
        <Script
          id="google-tag-manager"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WW2XMBSS');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* GA4 (G-5MHT7TMSZN) și ambele conturi Ads (AW-803044953, AW-17758302054) se încarcă din containerul GTM;
            tag-ul direct AW-803044953 de aici era o dublură și a fost scos. */}
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
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHOOL_SCHEMA) }}
        />
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <PublicDataProvider value={{ tarife, instructori, grupe }}>
            <SimpleToastProvider>
              <ConditionalLayout>{children}</ConditionalLayout>
            </SimpleToastProvider>
          </PublicDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
