import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Sparkles, BookOpen, Tag, ArrowRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { allPostsQuery, allCategoriesQuery, featuredPostsQuery } from '@/sanity/lib/queries'
import PostCard from '@/components/blog/post-card'
import FeaturedPostCard from '@/components/blog/featured-post-card'

export const revalidate = 60

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

async function getBlogData() {
  console.log('🔄 Blog data fetched at:', new Date().toISOString())

  try {
    const [posts, categories, featuredPosts] = await Promise.all([
      client.fetch(allPostsQuery),
      client.fetch(allCategoriesQuery),
      client.fetch(featuredPostsQuery),
    ])

    return {
      posts: posts || [],
      categories: categories || [],
      featuredPosts: featuredPosts || [],
    }
  } catch (error) {
    console.error('Error fetching blog data:', error)
    return { posts: [], categories: [], featuredPosts: [] }
  }
}

export default async function BlogPage() {
  const { posts, categories, featuredPosts } = await getBlogData()

  const [primaryFeatured, ...secondaryFeatured] = featuredPosts

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog Dans București | În Pași de Dans',
    description:
      'Descoperiți articole despre dans latino, popular și de societate. Ghiduri pentru începători, sfaturi de la instructori și povești inspiraționale.',
    url: 'https://www.inpasidedans.ro/blog',
    publisher: {
      '@type': 'Organization',
      name: 'În Pași de Dans',
      logo: { '@type': 'ImageObject', url: 'https://www.inpasidedans.ro/images/logo.png' },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://www.inpasidedans.ro' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.inpasidedans.ro/blog' },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">
        {/* Animated background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-orange-500/15 blur-[120px] animate-pulse" />
          <div
            className="absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-red-600/15 blur-[120px] animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-pink-500/10 blur-[120px] animate-pulse"
            style={{ animationDelay: '4s' }}
          />
        </div>

        {/* Decorative dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative container mx-auto py-10 md:py-16 px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Acasă
            </Link>
            <ChevronRight className="h-4 w-4 text-white/30" />
            <span className="text-white font-medium">Blog</span>
          </nav>

          {/* HERO */}
          <section className="mt-10 md:mt-16 mb-12 md:mb-20">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 mb-6 text-xs uppercase tracking-[0.2em] text-orange-300">
                <Sparkles className="h-3.5 w-3.5" />
                Articole din lumea dansului
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                <span className="bg-gradient-to-r from-orange-300 via-red-400 to-pink-400 bg-clip-text text-transparent">
                  Blog
                </span>{' '}
                <span className="text-white">Dans București</span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                Ghiduri pentru începători, tehnici avansate și povești inspiraționale de la
                <span className="text-white"> instructorii noștri</span> — totul despre dans
                latino, popular și de societate.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 px-4 py-1.5 text-orange-200">
                  <BookOpen className="h-4 w-4" />
                  {posts.length} {posts.length === 1 ? 'articol publicat' : 'articole publicate'}
                </span>
                {categories.length > 0 && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-4 py-1.5 text-white/80">
                    <Tag className="h-4 w-4" />
                    {categories.length} categorii
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* CATEGORII — chip style */}
          {categories.length > 0 && (
            <section className="mb-16 md:mb-20">
              <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                    Explorează categoriile
                  </h2>
                  <p className="text-white/50 text-sm mt-1">
                    Sari direct la subiectul care te interesează
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {categories.map((category: any) => (
                  <Link
                    key={category._id}
                    href={`/blog/${category?.slug?.current || ''}`}
                    className="group inline-flex items-center gap-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-orange-400/40 px-5 py-3 transition-all hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-orange-300 transition-colors">
                        {category?.title || 'Categorie'}
                      </div>
                      {category?.description && (
                        <div className="text-xs text-white/50 mt-0.5 max-w-[200px] truncate">
                          {category.description}
                        </div>
                      )}
                    </div>
                    <span className="inline-flex items-center justify-center min-w-[2rem] h-7 rounded-full bg-gradient-to-r from-orange-500/30 to-red-500/30 border border-orange-400/30 px-2 text-xs font-bold text-orange-200">
                      {category?.postCount || 0}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ARTICOLE RECOMANDATE */}
          {featuredPosts.length > 0 && (
            <section className="mb-16 md:mb-20">
              <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-orange-400" />
                    Articole recomandate
                  </h2>
                  <p className="text-white/50 text-sm mt-1">
                    Selecția editorilor — cele mai citite și apreciate
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {primaryFeatured && <FeaturedPostCard post={primaryFeatured} />}

                {secondaryFeatured.length > 0 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {secondaryFeatured.map((post: any) => (
                      <PostCard key={post._id} post={post} variant="dark" />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* TOATE ARTICOLELE */}
          <section className="mb-16 md:mb-20">
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                  Toate articolele
                </h2>
                <p className="text-white/50 text-sm mt-1">
                  De la cele mai recente, cronologic
                </p>
              </div>
            </div>

            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: any) => (
                  <PostCard key={post._id} post={post} variant="dark" />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 rounded-3xl border border-dashed border-white/10 bg-white/[0.02]">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-4">
                  <BookOpen className="h-8 w-8 text-orange-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Încă nu sunt articole publicate
                </h3>
                <p className="text-white/60 max-w-md mx-auto">
                  Reveniți în curând pentru a descoperi conținut nou despre dans!
                </p>
              </div>
            )}
          </section>

          {/* CTA */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-px shadow-2xl shadow-orange-500/20">
            <div className="relative rounded-[calc(1.5rem-1px)] bg-gradient-to-br from-slate-950/90 via-red-950/30 to-slate-950/90 p-10 md:p-16 text-center overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 rounded-full bg-orange-500/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-red-600/30 blur-3xl" />

              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                  Vrei să înveți să dansezi?
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  Alătură-te celor peste 12.000 de cursanți care au descoperit bucuria dansului
                  la școala noastră!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/inscriere"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 px-8 py-3.5 font-semibold hover:bg-orange-50 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Înscrie-te la cursuri
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 backdrop-blur-sm text-white px-8 py-3.5 font-semibold hover:bg-white/10 hover:border-white/50 transition-all"
                  >
                    Contactează-ne
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
