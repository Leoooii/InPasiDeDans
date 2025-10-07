# 📝 Sanity Blog Setup - În Pași de Dans

## 🚀 Pași pentru Setup Complet

### 1. Instalează Dependențele

```bash
npm install next-sanity @sanity/vision @sanity/image-url --legacy-peer-deps
npm install -D @sanity/cli
```

### 2. Inițializează Proiectul Sanity

```bash
npx sanity init
```

**Răspunde la întrebări:**
- Login with: `Google / GitHub / Email`
- Create new project: `YES`
- Project name: `inpasidedans-blog`
- Use default dataset: `YES` (production)
- Output path: `./sanity` (default)

### 3. Configurează Variabilele de Mediu

După ce rulezi `npx sanity init`, vei primi un **Project ID**.

Creează fișierul `.env.local` în root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 4. Pornește Sanity Studio

```bash
cd sanity
npx sanity dev
```

Studio-ul va porni la: `http://localhost:3333`

### 5. Creează Datele Inițiale

În Sanity Studio, creează în această ordine:

#### A. **Categorii** (📂 Categorii)
1. Dansuri Latino
   - Slug: `dansuri-latino`
   - Descriere: "Articole despre salsa, bachata, cha-cha și alte dansuri latino"

2. Dansuri Populare
   - Slug: `dansuri-populare`
   - Descriere: "Dansuri tradiționale românești"

3. Dansuri de Societate
   - Slug: `dansuri-de-societate`
   - Descriere: "Vals, tango, quickstep, foxtrot"

4. Dansul Mirilor
   - Slug: `dansul-mirilor`
   - Descriere: "Ghiduri pentru pregătirea dansului de nuntă"

5. Sfaturi Dansatori
   - Slug: `sfaturi-dansatori`
   - Descriere: "Tips tehnici, exerciții, echipament"

6. Evenimente
   - Slug: `evenimente`
   - Descriere: "Recap evenimente, excursii, competiții"

7. Povești Cursanți
   - Slug: `povesti-cursanti`
   - Descriere: "Testimoniale extinse, success stories"

#### B. **Autori** (👤 Autori)
1. Alexandra Dumitrache
   - Slug: `alexandra-dumitrache`
   - Rol: "Instructor Dansuri Latino și Populare"
   - Bio: "Instructor cu 16 ani experiență..."
   - Ani Experiență: `16`
   - Specializări: `Salsa, Bachata, Dansuri Populare`

2. Lucian Popescu (sau alți instructori)
   - Similar cu Alexandra

#### C. **Primul Articol** (📝 Articole)
- Titlu: "Ghid Complet: Cum să Înveți Salsa pentru Începători"
- Slug: va genera automat `ghid-invata-salsa-incepatori`
- Autor: Selectează Alexandra
- Categorie: Selectează Dansuri Latino
- Imagine: Încarcă o poză cu salsa
- Excerpt: "Descoperiți tot ce trebuie să știți pentru a începe să dansați salsa..."
- Meta Description: "Ghid complet pentru începători: pași de bază, tehnici, sfaturi..."
- Conținut: Scrie articolul
- Tags: `incepatori`, `salsa`, `tutorial`
- Status: `published`
- Data Publicare: Selectează data curentă

### 6. Deploy Sanity Studio (Opțional)

Pentru a avea Studio accesibil online:

```bash
npx sanity deploy
```

Vei primi un URL de tipul: `https://inpasidedans-blog.sanity.studio`

---

## 📁 Structura Fișierelor

```
sanity/
├── README.md                    ← Această documentație
├── sanity.config.ts             ← Configurație Sanity Studio
├── schemas/
│   ├── index.ts                 ← Export toate schema-urile
│   ├── category.ts              ← Schema categorii
│   ├── author.ts                ← Schema autori
│   └── post.ts                  ← Schema articole
└── lib/
    ├── client.ts                ← Client Sanity + helpers imagini
    └── queries.ts               ← Queries GROQ predefinite
```

---

## 🔍 Cum Funcționează

### 1. **Scrii Articole în Sanity Studio** (http://localhost:3333)
   - Interfață vizuală, ca WordPress
   - Editor WYSIWYG
   - Upload imagini drag-and-drop

### 2. **Sanity salvează datele** (în cloud-ul lor)
   - Datele sunt stocate în Sanity
   - API disponibil instant

### 3. **Next.js preia datele prin API**
   - Folosește queries din `lib/queries.ts`
   - Afișează pe site-ul tău

---

## 📝 Exemple de Utilizare

### Obține toate articolele:

```typescript
import { client } from '@/sanity/lib/client'
import { allPostsQuery } from '@/sanity/lib/queries'

const posts = await client.fetch(allPostsQuery)
```

### Obține un articol specific:

```typescript
import { singlePostQuery } from '@/sanity/lib/queries'

const post = await client.fetch(singlePostQuery, { 
  slug: 'ghid-invata-salsa-incepatori' 
})
```

### Generează URL imagine optimizat:

```typescript
import { urlForImage } from '@/sanity/lib/client'

const imageUrl = urlForImage(post.mainImage)
  .width(800)
  .height(600)
  .fit('crop')
  .url()
```

---

## 🎯 Următorii Pași

După ce ai configurat Sanity, vom crea:
1. **Pagina index blog** (`/blog`)
2. **Pagini categorii** (`/blog/dansuri-latino`)
3. **Pagini articole** (`/blog/dansuri-latino/ghid-invata-salsa`)
4. **Componente blog** (card articol, breadcrumbs, etc.)
5. **SEO automation** (meta tags, sitemap, schema markup)

---

## 🆘 Troubleshooting

### Eroare: "Project ID not found"
- Verifică că ai setat `NEXT_PUBLIC_SANITY_PROJECT_ID` în `.env.local`
- Restart server Next.js după modificarea `.env.local`

### Eroare: "Dataset not found"
- Verifică că dataset-ul există în Sanity Dashboard
- Default: `production`

### Articolele nu apar pe site
- Verifică că Status = `published`
- Verifică Data Publicare (trebuie să fie în trecut)
- Check console pentru erori

---

## 📚 Resurse Utile

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs)

