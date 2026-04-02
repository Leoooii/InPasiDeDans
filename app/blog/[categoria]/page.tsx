import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { postsByCategoryQuery, singleCategoryQuery, allCategoriesQuery } from '@/sanity/lib/queries'
import PostCard from '@/components/blog/post-card'
import Breadcrumbs from '@/components/blog/breadcrumbs'

// ISR - revalidează cache-ul la fiecare 60 de secunde
export const revalidate = 60

// Generate static params pentru toate categoriile
export async function generateStaticParams() {
  try {
    const categories = await client.fetch(allCategoriesQuery)
    
    return categories.map((category: any) => ({
      categoria: category.slug?.current || '',
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Metadata dinamic pentru SEO
export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }): Promise<Metadata> {
  try {
    const { categoria } = await params
    const category = await client.fetch(singleCategoryQuery, { slug: categoria })
    
    if (!category) {
      return {
        title: 'Categorie nu găsită | În Pași de Dans',
        description: 'Categoria căutată nu a fost găsită.',
      }
    }

    return {
      title: `${category.title} | Blog În Pași de Dans`,
      description: category.metaDescription || category.description || `Articole despre ${category.title.toLowerCase()}: ghiduri, sfaturi și povești de la instructori profesioniști.`,
      alternates: {
        canonical: `https://www.inpasidedans.ro/blog/${categoria}`,
      },
      openGraph: {
        title: `${category.title} | Blog În Pași de Dans`,
        description: category.metaDescription || category.description || `Articole despre ${category.title.toLowerCase()}`,
        url: `https://www.inpasidedans.ro/blog/${categoria}`,
        siteName: 'În Pași de Dans',
        locale: 'ro_RO',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${category.title} | Blog În Pași de Dans`,
        description: category.metaDescription || category.description || `Articole despre ${category.title.toLowerCase()}`,
      },
    }
  } catch (error) {
    return {
      title: 'Categorie | Blog În Pași de Dans',
      description: 'Descoperă articole din această categorie.',
    }
  }
}

// Funcție pentru a preia datele
async function getCategoryData(categoria: string) {
  try {
    const [category, posts] = await Promise.all([
      client.fetch(singleCategoryQuery, { slug: categoria }),
      client.fetch(postsByCategoryQuery, { categorySlug: categoria })
    ])

    return {
      category,
      posts: posts || []
    }
  } catch (error) {
    console.error('Error fetching category data:', error)
    return {
      category: null,
      posts: []
    }
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params
  const { category, posts } = await getCategoryData(categoria)

  // Dacă categoria nu există, afișează 404
  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: 'Blog', href: '/blog' },
              { label: category.title }
            ]} 
          />
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {category.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4">
              {category.description}
            </p>
            <p className="text-lg text-blue-100">
              {posts.length} {posts.length === 1 ? 'articol' : 'articole'} disponibile
            </p>
          </div>
        </div>
      </section>

      {/* Articole din Categorie */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Încă nu sunt articole în această categorie
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Categoria "{category.title}" va fi populată în curând cu conținut nou.
              </p>
              <a
                href="/blog"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Vezi toate articolele
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Interesat de {category.title.toLowerCase()}?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Descoperă cursurile noastre de {category.title.toLowerCase()} și începe să înveți cu instructori profesioniști!
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
              Află Mai Multe
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
