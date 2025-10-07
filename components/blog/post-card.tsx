import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/client'

interface PostCardProps {
  post: {
    _id: string
    title: string
    slug: { current: string }
    excerpt: string
    mainImage: {
      asset: { _ref: string }
      alt: string
    }
    author: {
      name: string
      slug: { current: string }
    }
    category: {
      title: string
      slug: { current: string }
    }
    publishedAt: string
    tags?: string[]
  }
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = post.mainImage?.asset 
    ? urlForImage(post.mainImage).width(600).height(400).fit('crop').url()
    : '/placeholder.jpg'

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <article className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
      {/* Imagine */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={post.mainImage?.alt || post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        
        {/* Overlay cu categoria */}
        <div className="absolute top-4 left-4">
          <Link 
            href={`/blog/${post.category.slug.current}`}
            className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
          >
            {post.category.title}
          </Link>
        </div>
      </div>

      {/* Conținut */}
      <div className="p-6">
        {/* Metadate */}
        <div className="mb-3 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <span>{publishedDate}</span>
          <span>•</span>
          <Link 
            href={`/blog/autor/${post.author.slug.current}`}
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            {post.author.name}
          </Link>
        </div>

        {/* Titlu */}
        <h2 className="mb-3 text-xl font-bold leading-tight">
          <Link 
            href={`/blog/${post.category.slug.current}/${post.slug.current}`}
            className="text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="mb-4 text-gray-600 line-clamp-3 dark:text-gray-300">
          {post.excerpt}
        </p>

        {/* Tag-uri */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Link citire */}
        <div className="mt-4">
          <Link 
            href={`/blog/${post.category.slug.current}/${post.slug.current}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Citește mai mult
            <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
