import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, User } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/client'

interface FeaturedPostCardProps {
  post: {
    _id: string
    title: string
    slug: { current?: string }
    excerpt: string
    mainImage: {
      asset: { _ref: string }
      alt: string
    }
    author: {
      name: string
      slug?: { current?: string }
    }
    category: {
      title: string
      slug?: { current?: string }
    }
    publishedAt: string
    tags?: string[]
  }
}

export default function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  if (!post) return null

  const imageUrl = post.mainImage?.asset
    ? urlForImage(post.mainImage).width(1200).height(800).fit('crop').url()
    : '/placeholder.jpg'

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const detailHref = `/blog/${post.category?.slug?.current || ''}/${post.slug?.current || ''}`

  return (
    <Link
      href={detailHref}
      className="group grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/15 hover:border-orange-400/40 hover:-translate-y-1"
    >
      <div className="relative h-64 sm:h-80 md:h-auto md:min-h-[380px] overflow-hidden bg-slate-900">
        <Image
          src={imageUrl}
          alt={post.mainImage?.alt || post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/30" />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/40">
            ★ Recomandat
          </span>
          {post.category?.title && (
            <span className="rounded-full bg-white/90 text-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
              {post.category.title}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 md:p-10 flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-orange-300 uppercase tracking-widest">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {publishedDate}
          </span>
          {post.author?.name && (
            <>
              <span className="text-white/30">·</span>
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {post.author.name}
              </span>
            </>
          )}
        </div>

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-4 text-white group-hover:text-orange-200 transition-colors">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-base leading-relaxed line-clamp-4 mb-6 text-white/75">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {post.tags.slice(0, 4).map(tag => (
              <span
                key={tag}
                className="rounded-full bg-white/5 border border-white/10 text-white/70 px-2.5 py-0.5 text-[11px]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <span className="inline-flex items-center justify-center gap-2 self-start rounded-xl px-6 py-3 text-sm font-semibold shadow-lg bg-gradient-to-r from-red-600 to-orange-500 text-white group-hover:from-red-700 group-hover:to-orange-600 group-hover:shadow-xl group-hover:shadow-orange-500/40 transition-all">
          Citește articolul
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
