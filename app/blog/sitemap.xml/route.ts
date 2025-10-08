import { client } from '@/sanity/lib/client'
import { allPostSlugsQuery, allCategoriesQuery } from '@/sanity/lib/queries'

export async function GET() {
  try {
    const [posts, categories] = await Promise.all([
      client.fetch(allPostSlugsQuery),
      client.fetch(allCategoriesQuery)
    ])

    const baseUrl = 'https://www.inpasidedans.ro'
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Blog Index -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Categorii -->
  ${categories
    .filter((category: any) => category.slug?.current)
    .map((category: any) => `
  <url>
    <loc>${baseUrl}/blog/${category.slug.current}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`)
    .join('')}

  <!-- Articole -->
  ${posts
    .map((post: any) => `
  <url>
    <loc>${baseUrl}/blog/${post.category}/${post.slug}</loc>
    <lastmod>${post._updatedAt || post.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)
    .join('')}
</urlset>`

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate'
      }
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}

