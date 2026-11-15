# Plan: galerie și showcase video (următorul update)

Scris pe 15.11.2026. Nimic din ce e mai jos nu e implementat încă.

## Ce vrem
- **O pagină `/galerie`** cu toate clipurile, filtrabile după stil (salsa, bachata, vals, populare...) și categorie (cursuri, copii, miri, petreceri, excursii, spectacole).
- **Secțiuni scurte „Din sală”** pe paginile existente, fiecare cu clipurile care i se potrivesc: prima pagină, paginile de stil, copii, miri, lecții private, petreceri și excursii (pe pagina de detaliu), instructori.
- **Adăugare din admin**, fără cod: lipești un link și bifezi unde apare clipul.

## Decizia principală: unde stau clipurile

| Variantă | Cost | Avantaje | Dezavantaje |
|---|---|---|---|
| Fișiere în `public/` (Vercel) | Gratuit până la limită | Simplu | Planul Hobby are 100 GB transfer pe lună, iar acum se folosesc deja ~10 GB. Câteva clipuri de 20 MB văzute de câteva mii de ori depășesc limita. În plus, umflă repo-ul. **Nu.** |
| Firebase Storage | ~0,12 $/GB descărcat | Upload-ul din admin există deja | Fără streaming adaptiv: clipul se descarcă întreg, la calitate maximă, și pe 4G. Costul crește cu traficul. |
| **YouTube** (public sau nelistat) + player încărcat doar la click | **Gratuit** | Streaming adaptiv, zero trafic pe serverele noastre, clipurile apar și în căutarea YouTube și Google | Siglă YouTube, iar la final apar clipuri sugerate. Cookie-urile YouTube se pun doar după ce vizitatorul apasă play. |
| Bunny Stream | ~1–3 €/lună la traficul de acum | Player propriu, fără reclame și sugestii, HLS, previzualizări animate, upload direct din admin | Cont nou cu card. Mai mult de construit: upload, procesare, cheie API. |

**Recomandare:** pornim cu **YouTube**, dar construim totul independent de sursă (câmpul `sursa`). Așa putem adăuga **Bunny** mai târziu, fără să refacem paginile. Bunny ar servi doar unde contează aspectul: clipuri scurte, mute, care pornesc singure în buclă, ca la hero.

## Infrastructură

### 1. Date: colecția Firestore `videoclipuri`
```ts
type Videoclip = {
  id: string;
  titlu: string;
  descriere?: string;
  sursa: 'youtube';            // mai târziu și 'bunny'
  videoId: string;             // ID-ul YouTube (din link)
  orientare: 'vertical' | 'orizontal'; // Shorts/reels 9:16 sau 16:9
  durataSec?: number;
  poster?: string;             // opțional; implicit miniatura YouTube
  stiluri: string[];           // 'salsa', 'bachata', 'vals', 'populare'...
  categorii: string[];         // 'cursuri', 'copii', 'miri', 'petreceri', 'excursii', 'spectacole'
  instructori: string[];       // id-uri din `instructori`
  legatura?: { tip: 'petrecere' | 'excursie' | 'eveniment'; id: string };
  dataFilmare?: string;        // YYYY-MM-DD
  recomandat: boolean;         // apare pe prima pagină
  publicat: boolean;
  ordine: number;
  createdAt: number;
};
```
- `firestore.rules`: citire publică, scriere doar admin (ca la `petreceri`). Se publică manual din consola Firebase.
- Lista de stiluri și categorii stă într-un singur loc, `lib/videoclipuri.ts`, ca admin și site să folosească aceleași valori.

### 2. Citire pe server (ca restul conținutului public)
- `getVideoclipuri()` în `lib/public-data.ts`, cu `unstable_cache` și tagul `videoclipuri`.
- Adminul face `reimprospateazaSite('videoclipuri')` după salvare. Același mecanism ca la grupe și tarife, deci fără cost suplimentar de ISR.
- Filtrare pe server: `filtreazaVideoclipuri(lista, { stil?, categorie?, instructor?, legatura?, limita })`.

### 3. Componente
- **`VideoFacada`** (client): o poză plus un buton de play. `iframe`-ul de la `youtube-nocookie.com` se încarcă doar la click. Fără asta, fiecare clip ar încărca ~1 MB de JavaScript YouTube și ar strica viteza paginii. Respectă formatul vertical (9:16) sau orizontal (16:9).
- **`VideoShowcase`** (server): `<VideoShowcase stil="bachata" titlu="Bachata la noi în sală" limita={6} />`.
  - Pe telefon e un rând care se derulează lateral, pe desktop o grilă.
  - **Nu afișează nimic** dacă nu există clipuri, deci poate fi pus pe pagini dinainte.
- **`VideoLightbox`** (client): clipul mare, cu Înainte/Înapoi. Linkul direct `/galerie?v=<id>` se poate trimite pe WhatsApp.
- **Pagina `/galerie`**: filtre după stil și categorie, cu butoane, și grilă cu încărcare treptată.

### 4. Admin: `/admin/videoclipuri`
- **Adăugare:** lipești linkul YouTube (watch, youtu.be sau shorts), iar ID-ul se extrage automat. Titlul și miniatura vin din oEmbed-ul YouTube, care nu cere cheie API.
- **Clasificare:** bifezi stilurile, categoriile, instructorii și, opțional, petrecerea sau excursia.
- **Ordonare:** butoane sus/jos, plus comutatoare pentru „Publicat” și „Pe prima pagină”.
- Scrierea se face cu SDK-ul client autentificat, ca restul conținutului. **Nu** prin API routes.

### 5. Setări de securitate și imagini
- CSP în `vercel.json`:
  - `frame-src` primește `https://www.youtube-nocookie.com`;
  - `img-src` primește `https://i.ytimg.com`.
- `next.config.mjs` → `remotePatterns`: `i.ytimg.com`, pentru miniaturi optimizate.
- **Bug existent, de reparat odată cu asta:** clipurile YouTube din articolele de blog sunt probabil **blocate** acum, pentru că `frame-src` nu include YouTube.

### 6. SEO
- Schema `VideoObject` pe fiecare pagină cu clipuri: `name`, `description`, `thumbnailUrl`, `uploadDate`, `embedUrl`, `duration`.
- `/galerie` intră în `app/sitemap.ts`, iar clipurile intră ca `videos` în sitemap pe paginile unde apar.
- `/galerie` intră și în `llms.txt`.

### 7. Teste
- `npm test`: extragerea ID-ului din toate formele de link YouTube și filtrarea după stil sau categorie.

## Unde apar clipurile la început
| Pagină | Filtru |
|---|---|
| Prima pagină | `recomandat`, maxim 6 |
| `/dansuri-latino`, `/dansuri-de-societate`, `/dansuri-populare` | stilurile paginii |
| `/cursuri-dans-copii` | categoria `copii` |
| `/dansul-mirilor` | categoria `miri` |
| `/petreceri/[id]`, `/excursii/[id]` | `legatura` cu petrecerea sau excursia |
| `/instructori` | clipuri cu instructorul respectiv (opțional, în faza 2) |

## Etape
1. **Faza 1, fundația:** colecția și regulile, `lib/videoclipuri.ts` cu teste, admin, CSP și `remotePatterns`, `VideoFacada`, `VideoShowcase`, pagina `/galerie`, sitemap și schema.
2. **Faza 2, pe pagini:** secțiunile pe paginile din tabel, lightbox cu link direct, clipuri pe paginile de petreceri și excursii.
3. **Faza 3 (opțional), Bunny Stream:** clipuri scurte, mute, care pornesc singure în buclă.
   - Upload direct din admin prin TUS, cu o rută API care verifică tokenul de admin (`cerereDeLaAdmin`).
   - Variabile `BUNNY_LIBRARY_ID` și `BUNNY_API_KEY`, plus `media-src` în CSP.

## Ce trebuie pregătit de tine
- **Canalul YouTube** al școlii: există unul sau facem unul nou? Clipurile pot fi publice (aduc vizibilitate) sau nelistate (apar doar pe site).
- **Clipurile:** cel mai bine verticale, de 15–45 de secunde. Câte 2–3 pe stil sunt suficiente pentru început.
- **Acordul celor filmați (GDPR):** pentru adulți, un acord scris sau un anunț clar la curs. **Pentru copii e obligatoriu acordul părinților.** Se poate adăuga o bifă în formularul de înscriere și în evidență.
- **Politica de confidențialitate:** un paragraf despre clipurile YouTube încărcate la click.
