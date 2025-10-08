import Link from 'next/link'
import Image from 'next/image'
import { client, urlForImage } from '@/sanity/lib/client'

// Query pentru ultimele 3 articole
const latestPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->,
      alt
    },
    category->{
      title,
      slug
    },
    publishedAt
  }
`

export default async function LatestBlogPosts() {
  let posts = []
  
  try {
    posts = await client.fetch(latestPostsQuery)
  } catch (error) {
    console.error('Error fetching latest posts:', error)
    return null
  }

  if (!posts || posts.length === 0) return null

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📚 Ultimele Articole din Blog
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Descoperă sfaturi, ghiduri și povești despre dans direct de la instructorii noștri
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post: any) => {
            // Verificări de siguranță pentru datele lipsă
            if (!post) return null
            
            const imageUrl = post.mainImage?.asset 
              ? urlForImage(post.mainImage).width(400).height(250).fit('crop').url()
              : '/placeholder.jpg'

            const publishedDate = new Date(post.publishedAt).toLocaleDateString('ro-RO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })

            return (
              <article key={post._id} className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                {/* Imagine */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={post.mainImage?.alt || post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  {/* Badge categorie */}
                  <div className="absolute top-4 left-4">
                    <Link 
                      href={`/blog/${post.category?.slug?.current || ''}`}
                      className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                    >
                      {post.category?.title || 'Categorie necunoscută'}
                    </Link>
                  </div>
                </div>

                {/* Conținut */}
                <div className="p-6">
                  <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                    {publishedDate}
                  </p>

                  <h3 className="mb-3 text-xl font-bold leading-tight">
                    <Link 
                      href={`/blog/${post.category?.slug?.current || ''}/${post.slug?.current || ''}`}
                      className="text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  {post.excerpt && (
                    <p className="mb-4 text-gray-600 line-clamp-2 dark:text-gray-300">
                      {post.excerpt}
                    </p>
                  )}

                  <Link 
                    href={`/blog/${post.category?.slug?.current || ''}/${post.slug?.current || ''}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  >
                    Citește mai mult
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {/* CTA către blog */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Vezi Toate Articolele
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

