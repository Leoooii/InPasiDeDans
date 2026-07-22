import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { client, urlForImage } from '@/sanity/lib/client'

// Query pentru ultimele 3 articole
const latestPostsQuery = `
  *[_type == "post" && status == "published"] | order(publishedAt desc) [0...3] {
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
    <section className="bg-slate-100 py-16">
      <div className="container space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-2">
              Blog
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Ultimele articole din blog
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mt-4">
              Descoperă sfaturi, ghiduri și povești despre dans direct de la
              instructorii noștri.
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="border-slate-300 text-slate-800">
              Vezi toate articolele
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post: any) => {
            if (!post) return null

            const imageUrl = post.mainImage?.asset
              ? urlForImage(post.mainImage).width(400).height(250).fit('crop').url()
              : '/placeholder.jpg'

            const publishedDate = new Date(post.publishedAt).toLocaleDateString('ro-RO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })

            const postHref = `/blog/${post.category?.slug?.current || ''}/${post.slug?.current || ''}`

            return (
              <Link
                key={post._id}
                href={postHref}
                className="group rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl flex flex-col bg-white cursor-pointer hover:-translate-y-1"
              >
                {/* Imagine */}
                <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={imageUrl}
                    alt={post.mainImage?.alt || post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-slate-800/80 text-white backdrop-blur-sm">
                      {post.category?.title || 'Blog'}
                    </span>
                  </div>
                </div>

                {/* Conținut */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs mb-2 text-slate-400">{publishedDate}</p>

                  <h3 className="font-semibold text-base mb-2 line-clamp-2 transition-colors text-slate-900 group-hover:text-orange-600">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="text-sm leading-relaxed line-clamp-3 flex-1 text-slate-600">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-4 pt-4 border-t border-slate-100/40">
                    <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition-all bg-gradient-to-r from-red-600 to-orange-500 text-white group-hover:from-red-700 group-hover:to-orange-600 group-hover:shadow-md group-hover:shadow-orange-500/30">
                      Citește mai mult
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
