import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/client'
import { cn } from '@/lib/utils'

interface PostCardProps {
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
  variant?: 'light' | 'dark'
}

export default function PostCard({ post, variant = 'light' }: PostCardProps) {
  if (!post) return null

  const imageUrl = post.mainImage?.asset
    ? urlForImage(post.mainImage).width(600).height(400).fit('crop').url()
    : '/placeholder.jpg'

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const isDark = variant === 'dark'
  const detailHref = `/blog/${post.category?.slug?.current || ''}/${post.slug?.current || ''}`

  return (
    <Link
      href={detailHref}
      className={cn(
        'group flex flex-col rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1',
        isDark
          ? 'bg-white/[0.04] border border-white/10 hover:border-orange-400/40 hover:shadow-orange-500/20'
          : 'bg-white hover:shadow-xl dark:bg-gray-800'
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={post.mainImage?.alt || post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute top-4 left-4">
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm',
              isDark
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md shadow-black/40'
                : 'bg-blue-600 text-white'
            )}
          >
            {post.category?.title || 'Categorie'}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div
          className={cn(
            'mb-3 flex items-center gap-2 text-xs',
            isDark ? 'text-white/50' : 'text-gray-500 dark:text-gray-400'
          )}
        >
          <span>{publishedDate}</span>
          <span>·</span>
          <span>{post.author?.name || 'Alexandra Dumitrache'}</span>
        </div>

        <h2
          className={cn(
            'mb-3 text-xl font-bold leading-tight line-clamp-2 transition-colors',
            isDark
              ? 'text-white group-hover:text-orange-300'
              : 'text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400'
          )}
        >
          {post.title}
        </h2>

        <p
          className={cn(
            'mb-4 line-clamp-3 text-sm leading-relaxed flex-1',
            isDark ? 'text-white/70' : 'text-gray-600 dark:text-gray-300'
          )}
        >
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px]',
                  isDark
                    ? 'bg-white/10 text-white/70 border border-white/10'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                )}
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px]',
                  isDark
                    ? 'bg-white/10 text-white/70 border border-white/10'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                )}
              >
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className={cn('pt-4 border-t', isDark ? 'border-white/10' : 'border-gray-100 dark:border-gray-700')}>
          <span
            className={cn(
              'inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all',
              isDark
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white group-hover:from-red-700 group-hover:to-orange-600 group-hover:shadow-md group-hover:shadow-orange-500/30'
                : 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
            )}
          >
            Citește mai mult
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
