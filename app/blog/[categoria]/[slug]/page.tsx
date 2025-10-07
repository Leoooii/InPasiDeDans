import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { singlePostQuery, relatedPostsQuery, allPostSlugsQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/client'
import PostContent from '@/components/blog/post-content'
import Breadcrumbs from '@/components/blog/breadcrumbs'
import PostCard from '@/components/blog/post-card'
import TableOfContents from '@/components/blog/table-of-contents'
import FAQSection from '@/components/blog/faq-section'
import RelatedPosts from '@/components/blog/related-posts'

// Generate static params pentru toate articolele
export async function generateStaticParams() {
  try {
    const posts = await client.fetch(allPostSlugsQuery)
    
    return posts.map((post: any) => ({
      categoria: post.category,
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Metadata dinamic pentru SEO
export async function generateMetadata({ params }: { params: { categoria: string; slug: string } }): Promise<Metadata> {
  try {
    const post = await client.fetch(singlePostQuery, { slug: params.slug })
    
    if (!post) {
      return {
        title: 'Articol nu găsit | În Pași de Dans',
        description: 'Articolul căutat nu a fost găsit.',
      }
    }

    const title = `${post.title} | În Pași de Dans`
    const description = post.metaDescription || post.excerpt || `Citește articolul complet: ${post.title}`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author.name],
        tags: post.tags,
        images: post.mainImage?.asset ? [
          {
            url: urlForImage(post.mainImage).width(1200).height(630).fit('crop').url(),
            width: 1200,
            height: 630,
            alt: post.mainImage.alt || post.title,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: post.mainImage?.asset ? [urlForImage(post.mainImage).width(1200).height(630).fit('crop').url()] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Articol | Blog În Pași de Dans',
      description: 'Citește articolul complet pe blog-ul nostru.',
    }
  }
}

// Funcție pentru a preia datele
async function getPostData(categoria: string, slug: string) {
  try {
    const [post, relatedPosts] = await Promise.all([
      client.fetch(singlePostQuery, { slug }),
      client.fetch(relatedPostsQuery, { categorySlug: categoria, currentSlug: slug })
    ])

    return {
      post,
      relatedPosts: relatedPosts || []
    }
  } catch (error) {
    console.error('Error fetching post data:', error)
    return {
      post: null,
      relatedPosts: []
    }
  }
}

export default async function PostPage({ params }: { params: { categoria: string; slug: string } }) {
  const { post, relatedPosts } = await getPostData(params.categoria, params.slug)

  // Dacă articolul nu există, afișează 404
  if (!post) {
    notFound()
  }

  const imageUrl = post.mainImage?.asset 
    ? urlForImage(post.mainImage).width(1200).height(630).fit('crop').url()
    : '/placeholder.jpg'

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Schema markup pentru articol
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription || post.excerpt,
    "image": post.mainImage?.asset ? urlForImage(post.mainImage).width(1200).height(630).fit('crop').url() : undefined,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "url": `https://www.inpasidedans.ro/blog/autor/${post.author.slug.current}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "În Pași de Dans",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.inpasidedans.ro/logo.png"
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.inpasidedans.ro/blog/${params.categoria}/${params.slug}`
    },
    "articleSection": post.category.title,
    "keywords": post.tags?.join(', '),
    // Adăugăm Course schema pentru articole educaționale (ghiduri)
    "mentions": [{
      "@type": "Course",
      "name": `${post.category.title} - ${post.title}`,
      "description": post.metaDescription || post.excerpt,
      "provider": {
        "@type": "Organization",
        "name": "În Pași de Dans",
        "url": "https://www.inpasidedans.ro",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Calea Rahovei 262, sector 5",
          "addressLocality": "București",
          "addressCountry": "RO"
        },
        "telephone": "+40 722 675 126",
        "email": "inpasidedans@gmail.com"
      },
      "courseMode": "blended",
      "educationalLevel": "beginner",
      "inLanguage": "ro"
    }]
  }

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Breadcrumbs */}
        <div className="bg-white dark:bg-gray-800 py-4">
          <div className="container mx-auto px-4">
            <Breadcrumbs 
              items={[
                { label: 'Blog', href: '/blog' },
                { label: post.category.title, href: `/blog/${post.category.slug.current}` },
                { label: post.title }
              ]} 
            />
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          
          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <Link 
                href={`/blog/${post.category.slug.current}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 hover:bg-blue-700 transition-colors"
              >
                {post.category.title}
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <Link 
                  href={`/blog/autor/${post.author.slug.current}`}
                  className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {post.author.image?.asset && (
                    <Image
                      src={urlForImage(post.author.image).width(40).height(40).fit('crop').url()}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <span className="font-medium">{post.author.name}</span>
                </Link>
              </div>
              <span>•</span>
              <time dateTime={post.publishedAt}>{publishedDate}</time>
              {post.tags && post.tags.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Table of Contents */}
            <TableOfContents content={post.body} />

            {/* Main content */}
            <PostContent content={post.body} />

            {/* FAQ Section */}
            {post.faq && post.faq.length > 0 && (
              <FAQSection 
                faqs={post.faq} 
                postUrl={`https://www.inpasidedans.ro/blog/${post.category.slug.current}/${post.slug.current}`}
              />
            )}

            {/* Author info */}
            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-start gap-4">
                {post.author.image?.asset && (
                  <Image
                    src={urlForImage(post.author.image).width(80).height(80).fit('crop').url()}
                    alt={post.author.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {post.author.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {post.author.role}
                  </p>
                  {post.author.experienceYears && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                      Experiență: {post.author.experienceYears} ani
                    </p>
                  )}
                  {post.author.bio && (
                    <div className="text-gray-700 dark:text-gray-300">
                      {/* Render author bio */}
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        {/* Aici ar trebui să renderizezi bio-ul autorului similar cu PostContent */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts Carousel */}
        {relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} currentPostTitle={post.title} />
        )}

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Vrei să Înveți {post.category.title.toLowerCase()}?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Alătură-te cursurilor noastre și descoperă bucuria dansului cu instructori profesioniști!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inscriere"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Înscrie-te la Cursuri
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contactează-ne
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
