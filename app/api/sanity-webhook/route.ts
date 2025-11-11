import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verifică webhook secret
    const secret = request.headers.get('sanity-webhook-secret')
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid webhook secret' }, { status: 401 })
    }

    const { _type, _id, slug, category } = body
    console.log(`🔄 Webhook received for ${_type}:`, _id)

    if (_type === 'post') {
      // Revalidează doar paginile afectate
      revalidatePath('/blog')
      revalidatePath('/') // Revalidează și homepage-ul pentru componenta LatestBlogPosts
      
      if (category?.slug?.current) {
        revalidatePath(`/blog/${category.slug.current}`)
      }
      
      if (slug?.current) {
        revalidatePath(`/blog/${category?.slug?.current || 'uncategorized'}/${slug.current}`)
      }
      
      console.log(`✅ Revalidated post: ${slug?.current}`)
    }

    if (_type === 'category') {
      revalidatePath('/blog')
      revalidatePath('/') // Revalidează și homepage-ul pentru componenta LatestBlogPosts
      if (slug?.current) {
        revalidatePath(`/blog/${slug.current}`)
      }
      console.log(`✅ Revalidated category: ${slug?.current}`)
    }

    if (_type === 'author') {
      revalidatePath('/blog')
      revalidatePath('/') // Revalidează și homepage-ul pentru componenta LatestBlogPosts
      if (slug?.current) {
        revalidatePath(`/blog/autor/${slug.current}`)
      }
      console.log(`✅ Revalidated author: ${slug?.current}`)
    }

    return NextResponse.json({ 
      revalidated: true, 
      type: _type,
      now: Date.now() 
    })

  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ 
      message: 'Error processing webhook' 
    }, { status: 500 })
  }
}
