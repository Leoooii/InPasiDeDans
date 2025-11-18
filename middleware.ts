
import { NextResponse, NextRequest } from 'next/server';

// Lista de pagini valide pentru verificare
const validPages = [
  '/',
  '/dansul-mirilor',
  '/lectii-private',
  '/cursuri-dans-adulti',
  '/cursuri-dans-copii',
  '/dansuri-de-societate',
  '/dansuri-latino',
  '/dansuri-latino/salsa-bachata',
  '/dansuri-populare',
  '/cursuri-dans-nunta',
  '/grupe-in-formare',
  '/program',
  '/tarife',
  '/instructori',
  '/despre-noi',
  '/contact',
  '/galerie',
  '/noutati',
  '/evenimente',
  '/excursii',
  '/petreceri',
  '/testimoniale',
  '/inscriere',
  '/inregistrare',
  '/autentificare',
  '/cont',
  '/admin',
];

// Mapări pentru redirects dinamice bazate pe similaritate
const similarityMappings: Record<string, string> = {
  grupe: '/grupe-in-formare',
  formare: '/grupe-in-formare',
  cursuri: '/cursuri-dans-adulti',
  dans: '/cursuri-dans-adulti',
  copii: '/cursuri-dans-copii',
  adulti: '/cursuri-dans-adulti',
  societate: '/dansuri-de-societate',
  latino: '/dansuri-latino',
  populare: '/dansuri-populare',
  nunta: '/cursuri-dans-nunta',
  program: '/program',
  tarife: '/tarife',
  preturi: '/tarife',
  instructori: '/instructori',
  profesori: '/instructori',
  echipa: '/instructori',
  despre: '/despre-noi',
  contact: '/contact',
  galerie: '/galerie',
  poze: '/galerie',
  imagini: '/galerie',
  evenimente: '/noutati',
  noutati: '/noutati',
  excursii: '/excursii',
  petreceri: '/petreceri',
  testimoniale: '/testimoniale',
  pareri: '/testimoniale',
  inscriere: '/inscriere',
  inregistrare: '/inregistrare',
  register: '/inregistrare',
  signup: '/inregistrare',
  autentificare: '/autentificare',
  login: '/autentificare',
  cont: '/cont',
  account: '/cont',
  profile: '/cont',
  admin: '/admin',
};

function findSimilarPage(pathname: string): string | null {
  // Normalizează path-ul (elimină slash-uri multiple, convertește la lowercase)
  const normalizedPath = pathname.toLowerCase().replace(/\/+/g, '/').replace(/\/$/, '') || '/';

  // Verifică dacă pagina există deja
  if (validPages.includes(normalizedPath)) {
    return null; // Nu e nevoie de redirect
  }

  // Elimină extensiile comune
  const pathWithoutExtension = normalizedPath.replace(/\.(html|php|asp|aspx)$/, '');
  if (validPages.includes(pathWithoutExtension)) {
    return pathWithoutExtension;
  }

  // Caută în mapările de similaritate
  for (const [keyword, destination] of Object.entries(similarityMappings)) {
    if (normalizedPath.includes(keyword)) {
      return destination;
    }
  }

  // Caută pattern-uri comune
  if (normalizedPath.includes('page') || normalizedPath.includes('pages')) {
    const cleanPath = normalizedPath.replace(/\/(page|pages)\//, '/').replace(/^\/page\//, '/');
    if (validPages.includes(cleanPath)) {
      return cleanPath;
    }
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignoră fișierele statice, API routes, blog și admin
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname.startsWith("/admin") || // Ignoră toate rutele admin (inclusiv /admin/studio)
    pathname.startsWith('/admin/api/') ||
    pathname.startsWith('/blog') // Ignoră toate rutele blog
  ) {
    const response = NextResponse.next();
    // Adaugă headere CORS pentru rutele API
    if (pathname.startsWith('/api/')) {
      response.headers.set(
        'Access-Control-Allow-Origin',
        process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.vercel.app'
      );
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    }
    return response;
  }

  // Permite rutele dinamice pentru grupele în formare
  if (pathname.startsWith('/grupe-in-formare/')) {
    return NextResponse.next();
  }

  // Încearcă să găsească o pagină similară
  const similarPage = findSimilarPage(pathname);

  if (similarPage) {
    console.log(`Redirecting ${pathname} to ${similarPage}`);
    // Redirect permanent pentru SEO
    return NextResponse.redirect(new URL(similarPage, request.url), 301);
  }

  // Loghează încercările de acces la pagini inexistente pentru debugging
  if (!validPages.includes(pathname) && pathname !== '/not-found') {
    console.log(`404 attempt: ${pathname} from ${request.headers.get('referer') || 'direct'}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};