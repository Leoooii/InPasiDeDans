# InPasiDeDans — note pentru Claude

## Stack
- Next.js 15 (App Router) + TypeScript
- Firebase (Web SDK) pentru auth + Firestore + Storage. Folosit atât pe client cât și pe server (în API routes) — NU există `firebase-admin`.
- Sanity pentru blog
- Tailwind + shadcn/ui

## Statistici admin (GA4 Data API)
Pagina [app/admin/statistici/page.tsx](app/admin/statistici/page.tsx) afișează vizite din Google Analytics 4 prin [app/api/admin/analytics/route.ts](app/api/admin/analytics/route.ts) (folosește `@google-analytics/data` + service account, server-only — vezi [lib/ga.ts](lib/ga.ts)). Route-ul e păzit de un token static `ANALYTICS_API_SECRET` (header `x-analytics-token`); UI-ul cere cheia o dată și o ține în `localStorage` (nu e în bundle). Env necesare: `GA_PROPERTY_ID` (ID numeric, NU measurement ID `G-...`), `GA_CLIENT_EMAIL`, `GA_PRIVATE_KEY` (cu `\n` literal), `ANALYTICS_API_SECRET`. Service account-ul trebuie adăugat ca Viewer în GA4 → Property Access.

## Instalare dependențe: `--legacy-peer-deps` obligatoriu
`npm install` simplu eșuează cu ERESOLVE (`react-day-picker@8` cere `date-fns@^2||^3`, root are `date-fns@3.6`). Folosește mereu `npm install <pkg> --legacy-peer-deps`.

## Gotchas care s-au pierdut deja timp

### Middleware redirects prin keyword similarity
[middleware.ts](middleware.ts) rulează `findSimilarPage()` pe orice request non-API/non-blog. Verifică `validPages` (allowlist) și un dicționar `similarityMappings` cu cuvinte cheie (`evenimente`, `noutati`, `cursuri`, etc.). Match-ul e `pathname.includes(keyword)` — orice rută nouă care conține un keyword cunoscut și nu e în `validPages` va fi 301-redirectată spre destinația mapată.

**Când adaugi o rută dinamică nouă** sub un segment cu keyword (ex. `/cursuri-dans-adulti/[slug]`, `/petreceri/[id]`), pune un `if (pathname.startsWith('/prefix/')) return NextResponse.next()` în middleware **înainte** de apelul `findSimilarPage`. Există deja excepții pentru `/grupe-in-formare/`, `/petreceri/`, `/noutati/`, `/evenimente/` — urmează pattern-ul. Simptom dacă uiți: pagina returnează 301 către listing-ul părinte.

### Colecția `evenimente` ține atât evenimente cât și noutăți
Distincția se face pe câmpul `eventDate`:
- are `eventDate` → e Eveniment, ruta `/evenimente/[slug]`
- nu are `eventDate` → e Noutate, ruta `/noutati/[slug]`

Listings: [components/noutati-section.tsx](components/noutati-section.tsx) (folosit pe `/noutati` și homepage).
Detail page UI: [components/eveniment-detail.tsx](components/eveniment-detail.tsx).
Slug-uri generate cu [lib/slug.ts](lib/slug.ts) (curăță diacritice + asigură unicitate).

### Migrarea de slug-uri rulează automat la build
[scripts/migrate-slugs.mjs](scripts/migrate-slugs.mjs) e idempotent, citește env din `.env.local`/`.env` local sau din `process.env` pe Vercel, hook-uit prin `postbuild` în [package.json](package.json). Nu îl invoca manual decât în dev pentru a face debugging.

### Securitate Firestore
[firestore.rules](firestore.rules) sunt scrise pentru emailul admin hardcodat `admin@gmail.com` (corespunde cu `NEXT_PUBLIC_ADMIN_EMAIL` din `.env.local`). Regulile se publică **manual** din consola Firebase (nu există firebase CLI în proiect). Colecțiile evidenței sunt protejate (admin + instructori activi); conținutul public al site-ului (tarife, grupe, evenimente...) are încă scriere permisivă din cauza API routes cu client SDK fără auth.

### Admin folosește email-check, nu role-based
[app/admin/layout.tsx](app/admin/layout.tsx) compară `user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL`. Nu există câmp `isAdmin` pe documentul user, nu există custom claims.

## Formulare contact
[components/contact-form.tsx](components/contact-form.tsx), [components/LatinoSignupForm.tsx](components/LatinoSignupForm.tsx), [app/inscriere/InscriereForm.tsx](app/inscriere/InscriereForm.tsx) — toate cer telefon obligatoriu (atât HTML5 `required` cât și validare server-side în [app/api/send/route.ts](app/api/send/route.ts) cu Zod).

## Componente comune (nu mai crea variante noi)
- Butoane: `<Button variant="brand">` (gradient), `outline`, `outlineLight` (pe fundal închis); link-uri cu `<Button asChild><Link>`.
- Prețuri: [components/tarif-card.tsx](components/tarif-card.tsx) (`useTarife`, `TarifCard`, `TarifTile`, `TarifBanda`); rezervă în [lib/tarife-fallback.ts](lib/tarife-fallback.ts) — ține-o aliniată cu Firestore.
- FAQ: [components/faq-block.tsx](components/faq-block.tsx) (emite și schema FAQPage); conținut în `lib/faq-*.ts`.
- Pagini închise la culoare: [components/dark-page.tsx](components/dark-page.tsx); detalii petreceri/excursii: [components/detaliu-activitate.tsx](components/detaliu-activitate.tsx).
- Formulare publice: hook-ul [hooks/use-trimitere-formular.ts](hooks/use-trimitere-formular.ts).
- Butonul plutitor „Grupe noi!” e montat în [components/conditional-layout.tsx](components/conditional-layout.tsx) (lista de rute acolo).

Istoric modificări și pași rămași: [docs/jurnal-modificari.md](docs/jurnal-modificari.md).

## Evidență cursanți (abonamente + prezență)
- Admin: `/admin/evidenta` (prezență, cursanți, istoric, conturi instructori, export). Portal instructori: `/instructor` (vede doar grupele atribuite în `conturiInstructori/{uid}.grupe`).
- Intrare unică pentru admin și instructori: `/panou` (alegi profilul, scrii parola). Lista vine din colecția `conturiPublice` (citire publică: nume, avatar, email, rol), sincronizată la crearea/editarea conturilor și la deschiderea „Conturi instructori”. `/admin/login` și `/instructor/login` redirecționează acolo.
- Logica e în [lib/evidenta/](lib/evidenta/): `abonament.ts` (reguli: 4 săptămâni = start + 28 zile, Full Pass pornește la prima ședință, status), `repo.ts` (toate scrierile Firestore + intrare în `jurnal` în același batch), `export.ts` (PDF/Excel/CSV/backup). UI comun în [components/evidenta/](components/evidenta/).
- Colecții: `cursanti` (câmpul `grupe` = id-uri din colecția `grupe`, păstrat pentru tabul Grupe), `abonamente`, `prezente` (id `{grupaId}_{data}_{cursantId}`), `jurnal` (doar adăugare), `conturiInstructori`. Datele sunt șiruri `YYYY-MM-DD` în ora României (`azi()` din `lib/evidenta/date.ts`, nu `toISOString`).
- Tipurile de abonament vin din `tarife` (categoriile grup + copii); pachetele private nu intră în evidență.
- Tabul „Grupe" rămâne separat (site-ul de prezentare); evidența doar citește grupele.
- Conturile de instructor se creează prin REST Identity Toolkit `accounts:signUp` (SDK-ul ar deloga adminul).
