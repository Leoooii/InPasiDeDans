import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { allPostsQuery, allCategoriesQuery, featuredPostsQuery } from '@/sanity/lib/queries'
import PostCard from '@/components/blog/post-card'
import Breadcrumbs from '@/components/blog/breadcrumbs'

// On-Demand Revalidation - se actualizează doar când este necesar
export const revalidate = 60 // Activează ISR pentru a actualiza periodic conținutul

// Metadata pentru SEO
export const metadata: Metadata = {
  title: 'Blog Dans București | Sfaturi, Ghiduri și Povești | În Pași de Dans',
  description: 'Descoperiți articole despre dans latino, popular și de societate. Ghiduri pentru începători, sfaturi de la instructori și povești inspiraționale. Citiți acum!',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/blog',
  },
  openGraph: {
    title: 'Blog Dans București | În Pași de Dans',
    description: 'Descoperiți articole despre dans latino, popular și de societate. Ghiduri pentru începători, sfaturi de la instructori și povești inspiraționale.',
    url: 'https://www.inpasidedans.ro/blog',
    siteName: 'În Pași de Dans',
    locale: 'ro_RO',
    type: 'website',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Blog Dans București - În Pași de Dans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Dans București | În Pași de Dans',
    description: 'Descoperiți articole despre dans latino, popular și de societate. Ghiduri pentru începători, sfaturi de la instructori.',
    images: ['https://www.inpasidedans.ro/images/logo.png'],
  },
}

// Funcție pentru a preia datele
async function getBlogData() {
  // Log pentru a vedea când se revalidează
  console.log('🔄 Blog data fetched at:', new Date().toISOString())
  
  try {
    const [posts, categories, featuredPosts] = await Promise.all([
      client.fetch(allPostsQuery),
      client.fetch(allCategoriesQuery),
      client.fetch(featuredPostsQuery)
    ])

    return {
      posts: posts || [],
      categories: categories || [],
      featuredPosts: featuredPosts || []
    }
  } catch (error) {
    console.error('Error fetching blog data:', error)
    return {
      posts: [],
      categories: [],
      featuredPosts: []
    }
  }
}

export default async function BlogPage() {
  const { posts, categories, featuredPosts } = await getBlogData()

  // Schema WebPage pentru SEO
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Blog Dans București | În Pași de Dans",
    "description": "Descoperiți articole despre dans latino, popular și de societate. Ghiduri pentru începători, sfaturi de la instructori și povești inspiraționale.",
    "url": "https://www.inpasidedans.ro/blog",
    "publisher": {
      "@type": "Organization",
      "name": "În Pași de Dans",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.inpasidedans.ro/images/logo.png"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Acasă",
          "item": "https://www.inpasidedans.ro"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://www.inpasidedans.ro/blog"
        }
      ]
    }
  }

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: 'Blog', href: '/blog' }
            ]} 
          />
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog Dans București
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Sfaturi, Ghiduri și Povești din Lumea Dansului
            </p>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Descoperiți articole despre dans latino, popular și de societate. 
              Ghiduri pentru începători, tehnici avansate și povești inspiraționale de la instructori profesioniști.
            </p>
          </div>
        </div>
      </section>

      {/* Categorii */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Explorează Categoriile
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category: any) => (
              <a
                key={category._id}
                href={`/blog/${category?.slug?.current || ''}`}
                className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                  {category?.title || 'Categorie necunoscută'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {category?.postCount || 0} articole
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {category?.description || 'Descriere indisponibilă'}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Articole Evidențiate */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              ⭐ Articole Recomandate
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Toate Articolele */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Toate Articolele
          </h2>
          
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Încă nu sunt articole publicate
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reveniți în curând pentru a descoperi conținut nou despre dans!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Vrei să Înveți să Dansezi?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Alătură-te celor peste 12000 de cursanți care au descoperit bucuria dansului la școala noastră!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/inscriere"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Înscrie-te la Cursuri
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contactează-ne
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
