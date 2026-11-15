import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/client'

// Definiție de marcaj din Portable Text: span-ul are în `marks` cheia (`_key`) a definiției din `markDefs`
type DefinitieMarcaj = { _key: string; _type: string; href?: string; blank?: boolean }

// Bloc Sanity (Portable Text) — doar câmpurile folosite la randare
export type BlocSanity = {
  _type: string
  style?: string
  children?: { _type: string; text?: string; marks?: string[] }[]
  markDefs?: DefinitieMarcaj[]
  asset?: { _ref: string }
  alt?: string
  caption?: string
  url?: string
}

interface PostContentProps {
  content: BlocSanity[] // Sanity block content
}

// Componentă pentru a renderiza conținutul Sanity
function PortableText({ content }: PostContentProps) {
  if (!content) return null

  return (
    <div className="prose prose-lg max-w-none ">
      {content.map((block, index) => {
        // Text blocks (paragraf, heading, etc.)
        if (block._type === 'block') {
          const style = block.style || 'normal'
          const children = block.children?.map((child, childIndex) => {
            if (child._type === 'span') {
              let element: React.ReactNode = child.text

              // Apply marks (bold, italic, etc.)
              if (child.marks?.includes('strong')) {
                element = <strong key={childIndex}>{element}</strong>
              }
              if (child.marks?.includes('em')) {
                element = <em key={childIndex}>{element}</em>
              }
              if (child.marks?.includes('underline')) {
                element = <u key={childIndex}>{element}</u>
              }

              // Handle links
              const linkMark = block.markDefs?.find(
                def => def._type === 'link' && child.marks?.includes(def._key)
              )
              if (linkMark?.href) {
                element = (
                  <a
                    key={childIndex}
                    href={linkMark.href}
                    target={linkMark.blank ? '_blank' : '_self'}
                    rel={linkMark.blank ? 'noopener noreferrer' : undefined}
                    className="text-red-600 hover:text-red-700 underline"
                  >
                    {element}
                  </a>
                )
              }

              return element
            }
            return null
          })

          // Render different block styles
          switch (style) {
            case 'h2':
              return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-slate-900 ">{children}</h2>
            case 'h3':
              return <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-slate-900 ">{children}</h3>
            case 'h4':
              return <h4 key={index} className="text-lg font-semibold mt-4 mb-2 text-slate-900 ">{children}</h4>
            case 'blockquote':
              return (
                <blockquote key={index} className="border-l-4 border-red-500 pl-4 italic text-slate-700 my-6">
                  {children}
                </blockquote>
              )
            case 'normal':
            default:
              return <p key={index} className="mb-4 text-slate-700 leading-relaxed ">{children}</p>
          }
        }

        // Image blocks
        if (block._type === 'image' && block.asset) {
          const imageUrl = urlForImage(block).width(800).height(600).fit('crop').url()
          return (
            <div key={index} className="my-8">
              <Image
                src={imageUrl}
                alt={block.alt || ''}
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              {block.caption && (
                <p className="mt-2 text-center text-sm text-slate-600 italic">
                  {block.caption}
                </p>
              )}
            </div>
          )
        }

        // YouTube video blocks
        if (block._type === 'youtube' && block.url) {
          // Extract video ID from YouTube URL
          const videoId = block.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
          
          if (videoId) {
            return (
              <div key={index} className="my-8">
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )
          }
        }

        return null
      })}
    </div>
  )
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <PortableText content={content} />
    </div>
  )
}
