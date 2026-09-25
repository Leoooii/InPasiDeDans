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

## Ce rămâne de făcut

### De făcut de tine
- [ ] **Publică regulile Firestore noi** (conținutul din `firestore.rules`) în consola Firebase → Firestore → Rules. Fără ele evidența nouă nu poate citi/scrie.
- [ ] În **Evidență → Prezență**, apasă o dată „Mută datele” (cei 2 cursanți din formatul vechi).
- [ ] Creează conturile instructorilor în **Evidență → Conturi instructori** și atribuie-le grupele.
- [ ] Fă un backup din **Export și backup** o dată pe lună.
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
- **`next lint`** nu mai e suportat în Next.js 16 și nu există o configurație ESLint. Dacă se face upgrade la Next 16, trebuie configurat ESLint.
- **Prețuri de rezervă:** când se schimbă prețurile din /admin/tarife, actualizează și `lib/tarife-fallback.ts`. Lista e folosită doar dacă Firestore nu răspunde, dar e bine să rămână la zi.
