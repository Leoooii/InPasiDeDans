# InPasiDeDans — note pentru Claude

## Stack
- Next.js 15 (App Router) + TypeScript
- Firebase (Web SDK) pentru auth + Firestore + Storage. Folosit atât pe client cât și pe server (în API routes) — NU există `firebase-admin`.
- Sanity pentru blog
- Tailwind + shadcn/ui

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
[firestore.rules](firestore.rules) sunt scrise pentru emailul admin hardcodat `admin@gmail.com` (corespunde cu `NEXT_PUBLIC_ADMIN_EMAIL` din `.env.local`). Colecțiile `cursanti` și `prezente` au reguli **permisive** deoarece API routes folosesc client SDK fără auth — limitare arhitecturală. Pentru a strânge regulile, ar trebui migrate API routes la `firebase-admin` SDK + verificare token admin pe server.

### Admin folosește email-check, nu role-based
[app/admin/layout.tsx](app/admin/layout.tsx) compară `user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL`. Nu există câmp `isAdmin` pe documentul user, nu există custom claims.

## Formulare contact
[components/contact-form.tsx](components/contact-form.tsx), [components/LatinoSignupForm.tsx](components/LatinoSignupForm.tsx), [app/inscriere/InscriereForm.tsx](app/inscriere/InscriereForm.tsx) — toate cer telefon obligatoriu (atât HTML5 `required` cât și validare server-side în [app/api/send/route.ts](app/api/send/route.ts) cu Zod).
