import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/client'

interface PostContentProps {
  content: any[] // Sanity block content
}

// Componentă pentru a renderiza conținutul Sanity
function PortableText({ content }: PostContentProps) {
  if (!content) return null

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {content.map((block, index) => {
        // Text blocks (paragraf, heading, etc.)
        if (block._type === 'block') {
          const style = block.style || 'normal'
          const children = block.children?.map((child: any, childIndex: number) => {
            if (child._type === 'span') {
              let element = child.text

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
              if (child.marks?.includes('link')) {
                const linkMark = child.marks.find((mark: any) => mark._type === 'link')
                if (linkMark?.href) {
                  element = (
                    <a 
                      key={childIndex}
                      href={linkMark.href}
                      target={linkMark.blank ? '_blank' : '_self'}
                      rel={linkMark.blank ? 'noopener noreferrer' : undefined}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {element}
                    </a>
                  )
                }
              }

              return element
            }
            return null
          })

          // Render different block styles
          switch (style) {
            case 'h2':
              return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h2>
            case 'h3':
              return <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">{children}</h3>
            case 'h4':
              return <h4 key={index} className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white">{children}</h4>
            case 'blockquote':
              return (
                <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 my-6">
                  {children}
                </blockquote>
              )
            case 'normal':
            default:
              return <p key={index} className="mb-4 text-gray-700 leading-relaxed dark:text-gray-300">{children}</p>
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
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 italic">
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
