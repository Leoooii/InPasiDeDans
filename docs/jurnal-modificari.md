# Jurnal modificări și pași rămași

Ultima actualizare: 24–25 septembrie 2026.

## Ce s-a făcut

### Funcționalități
- **Admin / cursanți:** cursanții șterși nu mai rămân în listă (cache corectat, commit e60e650).
- **Homepage:** paletă redusă la culorile din logo, secțiuni reorganizate, secțiunea „Grupe în formare” mai compactă când nu există grupe.
- **Tarife lecții private:**
  - ședință la restaurant 300 lei, cu condițiile afișate;
  - valabilitate pe fiecare pachet: 4 ședințe 2 luni, 6 ședințe 3 luni, 8 ședințe 4 luni;
  - scos rândul „Pachetul poate fi prelungit”.
- **Pagina de cursuri copii:** scoasă secțiunea „primele 4 lecții”.
- **Petreceri:** etichetele nu se mai suprapun pe telefon; afișul se vede întreg pe desktop.
- **Formular de înscriere:**
  - prima opțiune este „Listă de așteptare”;
  - în admin există pagina **/admin/inscrieri**, cu evidența tuturor formularelor, filtru după sursă și status.
- **Site-ul e forțat pe tema luminoasă.**
- **Evenimente:** butoanele „Înapoi” duc la /noutati.

### SEO și AI (pachetele A–G)
- **A — titluri și indexare:**
  - titluri și descrieri corecte;
  - sitemap automat (`/sitemap.xml`) și `robots.txt`;
  - pagini inexistente care returnează 404;
  - fără redirecturi greșite.
- **B+E — conținut și costuri:**
  - prețurile, instructorii și grupele apar direct în HTML, deci și pentru Google și crawlerele AI;
  - datele sunt ținute în cache (consum mai mic pe Vercel);
  - cache-ul se reîmprospătează automat la salvarea din admin.
- **C — date structurate:** schema.org unitară (școala de dans, FAQ, breadcrumbs, oferte, evenimente, instructori), plus legătura cu profilul Google Business.
- **D — AI:**
  - `/llms.txt` generat automat;
  - FAQ-uri cu prețurile reale;
  - blocuri „Pe scurt” pe paginile principale.
- **F — performanță:**
  - imagini optimizate;
  - scos widget-ul efreecode;
  - Google Analytics măsoară o singură dată (înainte, fiecare vizită era numărată de două ori).
- **G — curățenie:** șterse paginile și endpoint-urile nefolosite.
- **Statistici:** în **/admin/statistici** există secțiunea „Evoluție după optimizarea SEO și AI”, cu comparația înainte/după 24.09.2026.

### Aspect și standardizare (pachetele V1–V4, S1–S3)
- **V1 — culori:** doar roșu, portocaliu și gri-albăstrui (slate) pe tot site-ul; fără albastru, mov sau verde rămase de la vechiul design.
- **V2 — butoane:** două stiluri principale (gradient roșu-portocaliu și contur), folosite peste tot.
- **V3 — titluri și carduri:** mărimi de titluri unitare, colțuri rotunjite la fel, grila de prețuri centrată.
- **V4 — mobil:**
  - butonul „Înscrie-te” e vizibil în antetul de pe telefon;
  - meniul nu se mai închide singur și arată pagina curentă;
  - în footer, telefonul și emailul se pot apăsa;
  - pe /program, butoanele de filtrare sunt mai mari și instructorul și sala se văd pe telefon;
  - bannerul de cookie-uri e un card mic, afișat pe toate paginile.
- **S1 — curățenie de cod:** fișiere nefolosite șterse; mesajele de confirmare din admin apar acum (înainte nu apăreau).
- **S2 — componente comune:** pentru FAQ, testimoniale, galerii foto, breadcrumbs, bannerul de final și „Descoperă și alte dansuri”.
- **S3 — alte componente comune:**
  - un singur card de preț și o singură listă de prețuri de rezervă;
  - formularele au aceeași logică de trimitere;
  - butonul „Grupe noi!” e pus o singură dată în layout;
  - paginile închise la culoare (blog, noutăți, instructori, petreceri, excursii) folosesc aceeași bază;
  - detaliile de petrecere și de excursie folosesc aceeași componentă.

### Evidență cursanți (refăcută, 25.09.2026)
- Prezență + abonamente + cursanți unite în **Admin → Evidență cursanți**: prezență pe zi și grupă (bife mari, anulare, recuperări, „toți prezenți"), statusul abonamentului vizibil peste tot, profil de cursant simplificat.
- Reguli: abonament = 4 săptămâni de la start (expirarea se calculează singură și contează în status); Full Pass pornește la prima ședință; fiecare prezență se scade din abonamentul valabil; ședințele fără abonament sunt semnalate și se leagă automat de abonamentul vândut ulterior.
- **Istoric** al tuturor acțiunilor (cine, ce, când) + avertizări automate (expiră în curând, expirat, epuizat, ședințe fără abonament).
- **Portal pentru instructori** (`/instructor`): cont separat, doar grupele atribuite de admin; prezență, cursanți, abonamente.
- **Export**: PDF, Excel, CSV pe lună / grupă / cursant / complet + backup complet JSON.
- Datele sunt protejate de reguli Firestore (înainte colecțiile `cursanti`/`prezente` erau deschise public).

### Evidență — completări (25.09.2026)
- Intrare unică pentru admin și instructori: **inpasidedans.ro/panou** (alegi poza, scrii parola); se poate instala pe telefon ca aplicație.
- Conturi pentru instructorii cu grupe (Cătălina, Nicholas, Luciana), cu pozele lor; „Parolă nouă” setată direct de admin (cheie de serviciu Firebase pe server).
- Grupe ca pagină principală: filtre pe zile și pe instructor (poze), ceas live, stare Urmează / LIVE / Terminată, „prezența e făcută”.
- Prezența se face doar pentru azi, din cardul grupei; istoricul (calendar) și exportul pe lună sunt în pagina grupei; adminul poate corecta zile trecute.
- Reînnoire rapidă a abonamentului, mesaj pe WhatsApp către cursant, „cât de des vine” (procent de prezență), pagina Încasări, înscrierile de pe site → cursanți dintr-un clic.
- Contul meu (nume, avatar, parolă), avatare ilustrate, bara din stânga restrângibilă, ghid actualizat.

### Securitate și conversie (15.11.2026, local, nepublicat încă)
- **Statistici:** rutele `/api/admin/analytics` și `/api/admin/evolutie` cer adminul logat (ID token Firebase). Vechea cheie `NEXT_PUBLIC_ANALYTICS_TOKEN` ajungea în JavaScript-ul public și nu mai e acceptată.
- **Conținut public (tarife, grupe, evenimente, excursii, petreceri, instructori):** scrierile din API au fost șterse (oricine le putea apela); petrecerile și instructorii se salvează acum din browser, ca admin. `firestore.rules`: scriere doar admin.
- **Telefon:** bară fixă jos cu Sună / WhatsApp / Înscrie-te (nu pe /inscriere); butonul plutitor „Grupe noi!” rămâne doar pe desktop.
- **Program:** filtru „Doar cu locuri libere”, ziua de azi evidențiată, „Înscrie-te” pe fiecare grupă cu locuri.
- **Înscriere:** câmpurile lipsă sunt marcate la trimitere (butonul nu mai e spălăcit); după trimitere apar pașii următori, WhatsApp și telefon. Video-ul vechi din mesajul de confirmare a fost scos.
- **Meniu:** „Cursuri ▾” grupează adulți (cu stilurile), copii, dansul mirilor, lecții private, grupe în formare; „Grupe noi” apare evidențiat doar când există grupe noi.
- **Păreri:** carduri albe, mai lizibile, pe toate paginile de cursuri.
- Contrast mai bun la textele gri mici; `TarifBanda` (nefolosit) șters.

### Design — prima pagină și conversie (15.11.2026, local, nepublicat încă)
- Când nu există grupe în formare publice, prima pagină și /grupe-in-formare arată **grupele de începători cu locuri libere** din orar (`lib/grupe-libere.ts`, `components/grupe-libere.tsx`); cardul duce la `/inscriere?curs=...` cu cursul preselectat. Butonul plutitor devine „Locuri libere!”.
- Prima pagină: cifre aliniate (12.000+ din 2009 / 300+ activi acum), păreri ale cursanților, secțiune „Instructorii care te învață” + locație (`components/echipa-si-locatie.tsx`), fără meniul plutitor din dreapta.
- Cursurile de pe prima pagină: grilă pe desktop, rând glisabil pe telefon (fără carusel cu autoplay).
- „Citește mai mult” la noutăți și blog e link simplu, nu buton portocaliu; butonul de înscriere rămâne singurul accent.
- Banner cookie-uri: bandă subțire jos, nu mai acoperă butoane și câmpuri.
- Tarife: carduri albe, doar „★ Cel mai popular” e evidențiat (câmpul `popular` din admin); diacritice corectate în titluri vizibile.
- Testimoniale: săgețile nu mai ies din pagină (scroll orizontal pe desktop).

## Ce rămâne de făcut

### De făcut de tine
- [ ] **După deploy-ul din 11.2026:** publică noul `firestore.rules` în consola Firebase (întâi deploy, apoi regulile). Apoi șterge din Vercel `NEXT_PUBLIC_ANALYTICS_TOKEN` și `ANALYTICS_API_SECRET` (nu mai sunt folosite).
- [ ] **Publică regulile Firestore noi** (conținutul din `firestore.rules`) în consola Firebase → Firestore → Rules. Fără ele evidența nouă nu poate citi/scrie.
- [ ] În **Evidență → Prezență**, apasă o dată „Mută datele” (cei 2 cursanți din formatul vechi).
- [ ] Creează conturile instructorilor în **Evidență → Conturi instructori** și atribuie-le grupele.
- [ ] **Backup automat:** setează `CRON_SECRET` în Vercel (Settings → Environment Variables, orice șir lung aleator). Cronul `/api/cron/backup` rulează pe 1 ale lunii la 02:00 UTC și urcă `backups/AAAA-LL-ZZ.json` în Firebase Storage. Fără variabilă, ruta răspunde 503.
- [ ] **Trimite un formular de test** pe /contact și pe /inscriere, de exemplu ca „Leo Test”. Verifică că vine emailul și că apare în /admin/inscrieri.
- [ ] **Google Search Console:** când `sitemap.xml` apare cu status „Success”, șterge cele 3 sitemap-uri vechi.
- [ ] **Vercel:** setează *Deployment Retention* (Project Settings → Security), ca să nu se adune deploy-uri vechi.
- [ ] **Google Ads vechi (AW-803044953):** spune dacă mai e folosit. Dacă nu, se scoate din `app/layout.tsx`. GTM folosește deja contul nou AW-17758302054.

- [ ] **Search Console → Evenimente:** apasă „Validează remedierea” (schema Event are acum endDate, performer și offers, commit a24832b).
- [ ] **Excursia „Măgura (Buzău)”:** linkul de Facebook din admin e stricat (două linkuri lipite unul în altul); corectează-l.
- [ ] *(opțional)* Câmp „Preț” la petreceri/excursii în admin, ca să dispară complet avertismentul Google despre `offers`.

### De urmărit în timp
- [ ] **Evoluția traficului**, în /admin/statistici → „Evoluție după optimizarea SEO și AI”. Primele concluzii relevante apar după **4–6 săptămâni**, adică pe la începutul lui noiembrie 2026.
  - Compară **utilizatorii, sesiunile și clicurile din Search Console**, nu vizualizările de pagină. De la 25.09.2026 GA4 nu mai numără dublu, așa că vizualizările scad artificial cu ~50%.
  - Urmărește și traficul venit din surse AI: chatgpt.com, perplexity.ai, gemini, copilot.
- [ ] **Consumul Vercel** (plan Hobby). Valorile de referință pe 30 de zile, până la 24.09.2026:

  | Indicator | Valoare |
  |---|---|
  | Fluid Active CPU | 2h53m din 4h |
  | Function Invocations | 143K |
  | Edge Requests | 226K |
  | Fast Data Transfer | 9,82 GB |

  Ar trebui să scadă datorită cache-ului.

### Idei tehnice pentru mai târziu (opționale)
- **Regulile Firestore** pentru `cursanti` și `prezente` sunt încă permisive, pentru că API-urile folosesc SDK-ul client. Soluția completă este mutarea API-urilor pe `firebase-admin`, cu verificarea tokenului de admin.
- **ESLint** e configurat (`eslint.config.mjs`, rulează și la `next build`): 0 erori, ~129 avertismente vechi (`any`, variabile nefolosite, dependențe de hook-uri). De curățat treptat; nu lăsa erori noi, că opresc deploy-ul.
- **Prețuri de rezervă:** când se schimbă prețurile din /admin/tarife, actualizează și `lib/tarife-fallback.ts`. Lista e folosită doar dacă Firestore nu răspunde, dar e bine să rămână la zi.

### 15.11.2026 — evidență și admin
- Admin → Grupe: „În evidență: N cursanți activi” pe fiecare grupă și actualizarea locurilor libere din evidență (manual, cu buton; `lib/evidenta/locuri.ts`).
- Admin → Înscrieri: buton WhatsApp (marchează „contactat”), evidențiere și filtru pentru înscrierile „nou” mai vechi de 24h.
- Evidență: listă „Expiră în 7 zile” cu „Trimite pe rând” pe WhatsApp; alertă „Prezența nu e făcută” (azi + ieri); Încasări cu comparație față de luna anterioară și estimare de reînnoiri.
- Backup lunar automat (cron Vercel, `app/api/cron/backup`).
- Teste pentru regulile abonamentelor: `npm test` (runner-ul din Node, fără pachete noi).
- Scos `report-uri /api/csp-report` din CSP (ruta nu exista).
