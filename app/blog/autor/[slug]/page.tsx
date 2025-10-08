import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { client, urlForImage } from '@/sanity/lib/client'
import { postsByAuthorQuery, singleAuthorQuery, allAuthorsQuery } from '@/sanity/lib/queries'
import PostCard from '@/components/blog/post-card'
import Breadcrumbs from '@/components/blog/breadcrumbs'

// ISR - revalidează cache-ul la fiecare 60 de secunde
export const revalidate = 60

// Generate static params
export async function generateStaticParams() {
  try {
    const authors = await client.fetch(allAuthorsQuery)
    return authors.map((author: any) => ({
      slug: author.slug?.current || '',
    }))
  } catch (error) {
    return []
  }
}

// Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params
    const author = await client.fetch(singleAuthorQuery, { slug })
    
    if (!author) {
      return {
        title: 'Autor nu găsit | În Pași de Dans',
      }
    }

    return {
      title: `Articole de ${author.name} | Blog În Pași de Dans`,
      description: `Citiți articolele scrise de ${author.name}${author.role ? `, ${author.role}` : ''}. ${author.experienceYears ? `Experiență de ${author.experienceYears} ani în predarea dansului.` : ''} Descoperiți acum!`,
    }
  } catch (error) {
    return {
      title: 'Autor | Blog În Pași de Dans',
    }
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [author, posts] = await Promise.all([
    client.fetch(singleAuthorQuery, { slug }),
    client.fetch(postsByAuthorQuery, { authorSlug: slug })
  ])

  if (!author) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: 'Blog', href: '/blog' },
              { label: 'Autori', href: '/blog' },
              { label: author.name }
            ]} 
          />
          
          <div className="max-w-4xl mx-auto text-center mt-8">
            {author.image?.asset && (
              <Image
                src={urlForImage(author.image).width(150).height(150).fit('crop').url()}
                alt={author.name}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
              />
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {author.name}
            </h1>
            
            {author.role && (
              <p className="text-xl text-blue-100 mb-4">
                {author.role}
              </p>
            )}
            
            {author.experienceYears && (
              <p className="text-lg text-blue-100 mb-6">
                Experiență: {author.experienceYears} ani în predarea dansului
              </p>
            )}
            
            {author.bio && author.bio.length > 0 && (
              <div className="text-lg text-blue-100 max-w-3xl mx-auto space-y-3">
                {author.bio.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    const text = block.children?.map((child: any) => child.text).join('') || ''
                    return text ? <p key={index}>{text}</p> : null
                  }
                  return null
                })}
              </div>
            )}
            
            <p className="mt-6 text-blue-100">
              {posts.length} {posts.length === 1 ? 'articol publicat' : 'articole publicate'}
            </p>
          </div>
        </div>
      </section>

      {/* Articole */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                Acest autor nu a publicat încă articole.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

