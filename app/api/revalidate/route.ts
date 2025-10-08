import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret, path } = body

    // Verifică secret-ul pentru securitate
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidează doar când este necesar
    if (path) {
      revalidatePath(path)
      console.log(`✅ Revalidated path: ${path} at ${new Date().toISOString()}`)
    }

    return NextResponse.json({ 
      revalidated: true, 
      path,
      now: Date.now() 
    })

  } catch (err) {
    return NextResponse.json({ 
      message: 'Error revalidating' 
    }, { status: 500 })
  }
}
