import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { postsByTagQuery, allTagsQuery } from '@/sanity/lib/queries'
import PostCard from '@/components/blog/post-card'
import SEOBreadcrumbs from '@/components/seo-breadcrumbs'

// ISR - revalidează cache-ul la fiecare 60 de secunde
export const revalidate = 3600

// Generate static params
export async function generateStaticParams() {
  try {
    const tags = await client.fetch(allTagsQuery)
    return tags.map((tag: string) => ({
      slug: tag.toLowerCase().replace(/\s+/g, '-'),
    }))
  } catch (error) {
    return []
  }
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tag = slug.replace(/-/g, ' ')
  
  return {
    title: `Articole despre ${tag} | Blog În Pași de Dans`,
    description: `Toate articolele etichetate cu ${tag}. Sfaturi, ghiduri și povești despre dans. Citiți mai mult!`,
  }
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tag = slug.replace(/-/g, ' ')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = await client.fetch(postsByTagQuery, { tag } as any)

  if (!posts || posts.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50 ">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <SEOBreadcrumbs
            items={[
              { name: 'Acasă', url: '/' },
              { name: 'Blog', url: '/blog' },
              { name: 'Tag-uri', url: '/blog' },
              { name: tag }
            ]}
            currentPageUrl={`https://www.inpasidedans.ro/blog/tag/${slug}`}
            tone="dark"
          />
          
          <div className="max-w-4xl mx-auto text-center mt-8">
            <div className="inline-block bg-white/20 rounded-full px-4 py-2 mb-4">
              <span className="text-2xl">🏷️</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              #{tag}
            </h1>
            
            <p className="text-xl text-red-100 mb-4">
              {posts.length} {posts.length === 1 ? 'articol' : 'articole'} cu acest tag
            </p>
          </div>
        </div>
      </section>

      {/* Articole */}
      <section className="py-12 bg-white ">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Explorează Mai Multe Articole
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Descoperă toate articolele noastre despre dans și alege-ți subiectul preferat!
          </p>
          <a
            href="/blog"
            className="inline-flex items-center bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            Vezi Toate Articolele
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}

