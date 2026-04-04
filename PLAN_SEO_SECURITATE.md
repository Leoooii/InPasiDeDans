# Plan SEO + Securitate — inpasidedans.ro
**Audit realizat:** Aprilie 2026 · Stack: Next.js 15.5.7 · React 19 · App Router · Firebase · Sanity CMS · Vercel

---

## Context proiect

- Școală de dans din București, activa din 2009, 12.000+ cursanți
- Stiluri: salsa, bachata, dansuri de societate, populare, cursuri copii, dansul mirilor, lecții private
- Locație: Sectoarele 4, 5, 6 din București
- Prezență: Facebook, Instagram, YouTube, TikTok, Google Business Profile
- Blog cu articole semnate de instructori (Sanity CMS)

---

## PROBLEME IDENTIFICATE (prioritate descrescătoare)

### CRITIC — Securitate

#### S1. Email admin hardcodat în codul sursă (GIT)
- **Fișier:** `app/admin/layout.tsx` linia 67
- **Problema:** `if (user.email === 'admin@gmail.com')` — expus public în repo
- **Fix:** Mută în env var `NEXT_PUBLIC_ADMIN_EMAIL` sau folosește Firebase Custom Claims
- **Efort:** 15 minute

#### S2. Content-Security-Policy complet absent
- **Problema:** Nicio CSP în `vercel.json` sau `next.config.mjs`
- **Context:** Site-ul folosește GTM, GA4, Google Ads, Firebase, Sanity, Cloudflare Turnstile — fiecare necesită permisiuni CSP
- **Fix:** Adaugă CSP în `vercel.json`, pornește cu `Content-Security-Policy-Report-Only`
- **Efort:** 2-4 ore (testare + iterare)

```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://cdn.sanity.io https://res.cloudinary.com https://www.google-analytics.com; connect-src 'self' https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://www.google-analytics.com; frame-src https://challenges.cloudflare.com;"
}
```

#### S3. Cloudflare Turnstile CAPTCHA dezactivat
- **Fișier:** `app/inscriere/InscriereForm.tsx` (cod comentat)
- **Problema:** Formularul de înscriere nu are CAPTCHA — vulnerabil la spam/abuz
- **Fix:** Decomentează codul Turnstile — dependința și cheile `.env` există deja
- **Efort:** 30 minute

#### S4. Rate limiter in-memory (ineficient pe Vercel)
- **Fișier:** `lib/rateLimiter.ts` — folosește `RateLimiterMemory`
- **Problema:** Pe Vercel serverless, fiecare instanță are memorie separată — limiterul nu funcționează la request-uri paralele
- **Fix:** Înlocuiește cu `RateLimiterRedis` + `@vercel/kv` (deja instalat în proiect)
- **Efort:** 1 oră

```ts
import { kv } from '@vercel/kv';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterRedis({
  storeClient: kv,
  keyPrefix: 'rl_send',
  points: 10,
  duration: 60,
});
```

#### S5. CORS bug în middleware
- **Fișier:** `middleware.ts`
- **Problema:** Blocul CORS pentru `/api/` nu este atins niciodată — codul returnează `NextResponse.next()` înainte
- **Fix:** Reordonează logica din middleware sau mută CORS headers direct în API routes
- **Efort:** 30 minute

---

### CRITIC — SEO

#### SEO1. head.tsx — JSON-LD ajunge în `<body>` (20+ pagini afectate)
- **Problema:** Fișierele `head.tsx` sunt importate ca componente React în `page.tsx` și randate în `<body>`.
  - React 19 hoistează `<title>`, `<meta>`, `<link>` → OK
  - React 19 **NU hoistează `<script>`** → JSON-LD (schema FAQPage) este în `<body>` și poate fi ignorat de Google
- **Impact:** Rich snippets FAQ nu apar în SERP pentru 10+ pagini de cursuri
- **Fix:** Migrează fiecare `head.tsx` la `export const metadata` (App Router) + mută `<script>` JSON-LD direct în `page.tsx`
- **Efort:** 4-6 ore total

**Pagini afectate (toate au JSON-LD invalid):**
- `app/cursuri-dans-adulti/` — FAQPage cu 10 întrebări
- `app/cursuri-dans-copii/`
- `app/dansuri-latino/` și `app/dansuri-latino/salsa-bachata/`
- `app/dansuri-de-societate/`
- `app/dansuri-populare/`
- `app/lectii-private/`
- `app/dansul-mirilor/`
- `app/instructori/`
- `app/despre-noi/`
- `app/contact/`
- `app/inscriere/`
- `app/excursii/`
- `app/grupe-in-formare/`
- `app/autentificare/`, `app/cont/`, `app/inregistrare/`, `app/cookie-policy/`, `app/privacy-policy/`, `app/delete-data/`

**Pattern de migrare:**
```tsx
// ÎNAINTE: app/cursuri-dans-adulti/page.tsx
import Head from './head';
export default function Page() {
  return <div><Head /><RestOfPage /></div>
}

// DUPĂ: app/cursuri-dans-adulti/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cursuri de Dans Adulți București 2025 – Salsa, Bachata, Vals | În Pași de Dans',
  description: 'Cursuri dans adulți București: salsa, bachata, vals, tango. Grupe mici, instructori certificați, Sector 4-5-6. 12.000+ cursanți din 2009. Înscrie-te acum!',
  alternates: { canonical: 'https://www.inpasidedans.ro/cursuri-dans-adulti' },
  openGraph: {
    title: 'Cursuri de Dans Adulți București',
    description: '...',
    url: 'https://www.inpasidedans.ro/cursuri-dans-adulti',
    images: [{ url: 'https://www.inpasidedans.ro/images/og-cursuri-adulti.jpg', width: 1200, height: 630 }],
    locale: 'ro_RO',
    type: 'website',
  },
};

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", ... };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div><RestOfPage /></div>
    </>
  );
}
```

#### SEO2. og:image cu cale relativă în toate head.tsx
- **Problema:** `<meta property="og:image" content="/images/logo.png" />` — Open Graph necesită URL absolut
- **Impact:** Preview-uri fără imagine la partajare pe Facebook, WhatsApp, Twitter
- **Fix:** Înlocuiește cu `https://www.inpasidedans.ro/images/logo.png` (sau imagini OG dedicate per pagină)
- **Efort:** 30 minute (find & replace în toate head.tsx)

#### SEO3. Inconsistențe schema markup (date factuale contradictorii)
- **Problema identificată:**

| Câmp | Valoare A | Valoare B |
|---|---|---|
| Coordonate GPS | `44.4268, 26.1025` (blog posts) | `44.415353, 26.0774895` (contact) |
| URL logo | `/logo.png` (layout schema) | `/images/logo.png` (contact schema) |
| Opening Hours | `Luni-Vineri 10:00-17:00` | `Mo-Fr 18:00-22:00` |
| Schema type | `School` (layout) | `Organization` (homepage) |

- **Fix:** Creează `lib/schema-constants.ts` cu toate datele de business unificate, importat în toate schemele
- **Efort:** 1-2 ore

```ts
// lib/schema-constants.ts
export const BUSINESS = {
  name: 'În Pași de Dans',
  url: 'https://www.inpasidedans.ro',
  telephone: '+40-XXX-XXX-XXX',  // VERIFICĂ numărul real
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ADRESA REALĂ',  // VERIFICĂ
    addressLocality: 'București',
    postalCode: 'CODUL REAL',       // VERIFICĂ
    addressCountry: 'RO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 44.415353,    // din pagina contact — VERIFICĂ pe Google Maps
    longitude: 26.0774895,
  },
  openingHours: ['Mo-Fr 18:00-22:00', 'Sa 10:00-14:00'],  // VERIFICĂ orele reale
  logo: 'https://www.inpasidedans.ro/images/logo.png',
  foundingDate: '2009',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
} as const;
```

#### SEO4. Pagini private indexabile în sitemap
- **Problema:** `/autentificare`, `/inregistrare`, `/cont` sunt în sitemap cu prioritate 0.4
- **Fix:** Adaugă `export const metadata: Metadata = { robots: { index: false, follow: false } }` în aceste pagini și exclude-le din sitemap
- **Efort:** 30 minute

---

### MEDIU — SEO On-Page

#### SEO5. Titluri neoptimizate pentru Local SEO (Sector 5/4/6)
- **Problema:** Paginile de cursuri nu menționează sectoarele în H1
- **Oportunități:**
  - Adaugă "Sector 4-5-6" sau "lângă [landmark cunoscut]" în H1/H2 pe paginile de cursuri
  - Meta description: include număr telefon + rating Google

**Titluri recomandate:**
| Pagină | Actual | Recomandat |
|---|---|---|
| Cursuri adulți | `Cursuri de Dans Adulti Bucuresti` | `Cursuri Dans Adulți București 2025 – Salsa, Bachata, Vals` |
| Salsa/Bachata | (verifică) | `Cursuri Salsa Bachata București \| Grupă Începători Sector 5` |
| Dansul mirilor | (verifică) | `Dans Nuntă București – Coregrafie Mirilor \| 3-4 Lecții` |
| Lecții private | (verifică) | `Lecții Private Dans București – Instructor Dedicat` |

#### SEO6. Thin content pe paginile de cursuri
- **Problema:** Descrierile cursurilor sunt generice — lipsesc detalii practice
- **Fix:** Adaugă pe fiecare pagină de curs:
  - Secțiune „Ce înveți în primele 4 lecții" (cu exemple concrete de pași/figuri)
  - Testimoniale cu: nume, foto, tipul cursului, luna/anul
  - Instructor dedicat cu biografie scurtă + ani experiență
  - Schema `Review` în JSON-LD
- **Prioritate pagini:** `dansuri-latino/salsa-bachata`, `dansul-mirilor`, `cursuri-dans-copii`

#### SEO7. Testimoniale fără E-E-A-T
- **Problema:** Lipsesc testimoniale cu poze, nume complete și dată
- **Fix:** Colectează 3-5 testimoniale reale per pagină principală de curs
- **Schema recomandată:**
```json
{
  "@type": "Review",
  "author": { "@type": "Person", "name": "Maria Ionescu" },
  "datePublished": "2025-11-01",
  "reviewBody": "Am învățat bachata de la zero în 2 luni...",
  "reviewRating": { "@type": "Rating", "ratingValue": "5" }
}
```

---

### SCĂZUT — Tehnice + Cod

#### T1. Build cu erori ignorate
- **Fișier:** `next.config.mjs`
- **Problema:** `eslint: { ignoreDuringBuilds: true }` și `typescript: { ignoreBuildErrors: true }`
- **Fix:** Elimină ambele flag-uri, rezolvă erorile existente
- **Efort:** 1-2 ore (depinde de câte erori există)

#### T2. Versiuni `latest` pentru pachete critice
- **Problema:** `firebase: "latest"`, `next-auth: "latest"`, `@vercel/kv: "latest"`, `uuid: "latest"`
- **Fix:** Fixează versiunile semantice în `package.json` (ex: `"firebase": "^11.x.x"`)
- **Efort:** 30 minute

#### T3. next-seo instalat dar nefolosit
- **Problema:** `next-seo: ^6.8.0` în package.json, dar nicio pagină nu îl importă
- **Fix:** Dezinstalează: `npm uninstall next-seo`
- **Efort:** 5 minute

#### T4. Permissions-Policy header absent
- **Fix:** Adaugă în `vercel.json`:
```json
{ "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(self)" }
```

---

## PLAN 30 ZILE (Aprilie 2026)

### Săptămâna 1 — Fixes critice SEO (impact maxim, efort mediu)
- [x] SEO1: Migrare `head.tsx` → `export const metadata` pentru top 3 pagini: `cursuri-dans-adulti`, `dansuri-latino/salsa-bachata`, `dansul-mirilor`
- [x] SEO2: Fix `og:image` URL absolut în toate `head.tsx` (find & replace)
- [x] SEO3: Creează `lib/schema-constants.ts` + unifică toate schemele
- [x] SEO4: Exclude `/autentificare`, `/cont`, `/inregistrare` din index + sitemap

### Săptămâna 2 — Securitate
- [x] S1: Mută email admin în env var
- [x] S3: Reactivează Cloudflare Turnstile
- [x] S2: Adaugă CSP (început cu `Report-Only`) + Permissions-Policy (T4)
- [x] T1: Elimină `ignoreBuildErrors` și `ignoreDuringBuilds`, rezolvă erorile

### Săptămâna 3 — Conținut E-E-A-T
- [x] SEO6: Adaugă secțiunea „Ce înveți în primele 4 lecții" pe `salsa-bachata`, `dansul-mirilor`, `cursuri-dans-copii`
- [x] SEO7: Adaugă testimoniale cu date (luna/an) + schema Review cu `datePublished` în `TestimonialsSection`; testimoniale copii (părinți) adăugate; `cursuri-dans-copii` include acum `TestimonialsSection`
- [x] SEO5: Adaugă sector/locație în H1/H2 pe paginile de cursuri

### Săptămâna 4 — Migrare completă + optimizări tehnice
- [x] SEO1: Migrare completă `head.tsx` → `export const metadata` pentru toate paginile rămase (11 pagini); `'use client'` pages rezolvate cu `layout.tsx`; `import Head from './head'` eliminat din tot proiectul
- [x] S4: Rate limiter Redis cu `@vercel/kv` — `lib/rateLimiter.ts` rescris; fail-open dacă KV indisponibil (local dev)
- [x] S5: Fix CORS în middleware — eliminat `api` din matcher exclusion; CORS headers active pentru toate rutele `/api/`
- [x] T2: Fixează versiunile `latest` în package.json — 7 pachete fixate cu versiuni semantice
- [x] T3: Dezinstalează `next-seo` — `npm uninstall next-seo` executat

---

## Ce să urmărești în Google Search Console

- **Rich Results Test:** testează `https://www.inpasidedans.ro/cursuri-dans-adulti` după fix SEO1 — ar trebui să apară FAQPage
- **Acoperire index:** verifică dacă `/autentificare`, `/cont` au dispărut din index după fix SEO4
- **Core Web Vitals:** raportul „Experiență pagini" — LCP < 2.5s, INP < 200ms
- **Interogări locale:** filtrează după „sector 5", „sector 4", „București" — monitorizează evoluția CTR
- **PageSpeed Insights:** rulează lunar pe homepage + 2-3 pagini de curs

---

## Instrucțiuni pentru Claude când preiei acest plan

Citește acest fișier la începutul fiecărei sesiuni de lucru. Înainte de orice modificare:
1. Verifică ce itemi din plan au `[x]` (completați)
2. Întreabă utilizatorul pe ce task-uri vrea să lucreze în sesiunea curentă
3. Citește fișierul relevant înainte de a propune modificări
4. Marchează task-urile ca `[x]` imediat după ce sunt finalizate și testate
5. Dacă descoperi probleme noi în timp ce lucrezi, adaugă-le la planul corespunzător

**Stack reminder:** Next.js 15 App Router + React 19 + TypeScript. Metadata SEO se face cu `export const metadata: Metadata` (nu `head.tsx`, nu `next/head`). Schema JSON-LD se pune ca `<script>` în JSX-ul paginii.
