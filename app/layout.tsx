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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5MHT7TMSZN"
          strategy="afterInteractive"
        />
        <Script
          id="google-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5MHT7TMSZN');
              gtag('config', 'AW-803044953');
            `,
          }}
        />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHOOL_SCHEMA) }}
        />
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SimpleToastProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </SimpleToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
