/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'scontent.fotp3-2.fna.fbcdn.net',
      'i.imgur.com',
      'res.cloudinary.com',
    ],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
    nextScriptWorkers: true,
  },
  // Redirects pentru link-urile vechi
  redirects: async () => {
    return [
      // Redirects pentru pagini care și-au schimbat numele
      {
        source: '/evenimente',
        destination: '/noutati',
        permanent: true,
      },
      {
        source: '/testimoniale',
        destination: '/lectii-private',
        permanent: true,
      },
      {
        source: '/inscrieri-cursuri-de-dans',
        destination: '/grupe-in-formare',
        permanent: true,
      },
      {
        source: '/cursuri-de-dans/cursuri-dans-copii',
        destination: '/cursuri-dans-copii',
        permanent: true,
      },
      {
        source: '/grupe-formare',
        destination: '/grupe-in-formare',
        permanent: true,
      },
      {
        source: '/grupe_formare',
        destination: '/grupe-in-formare',
        permanent: true,
      },
      {
        source: '/cursuri-dans',
        destination: '/cursuri-dans-adulti',
        permanent: true,
      },
      {
        source: '/cursuri_dans',
        destination: '/cursuri-dans-adulti',
        permanent: true,
      },
      {
        source: '/dans-copii',
        destination: '/cursuri-dans-copii',
        permanent: true,
      },
      {
        source: '/dans_copii',
        destination: '/cursuri-dans-copii',
        permanent: true,
      },
      {
        source: '/societate',
        destination: '/dansuri-de-societate',
        permanent: true,
      },
      {
        source: '/latino',
        destination: '/dansuri-latino',
        permanent: true,
      },
      {
        source: '/populare',
        destination: '/dansuri-populare',
        permanent: true,
      },
      {
        source: '/nunta',
        destination: '/cursuri-dans-nunta',
        permanent: true,
      },
      {
        source: '/dans-nunta',
        destination: '/cursuri-dans-nunta',
        permanent: true,
      },
      {
        source: '/dans_nunta',
        destination: '/cursuri-dans-nunta',
        permanent: true,
      },
      {
        source: '/preturi',
        destination: '/tarife',
        permanent: true,
      },
      {
        source: '/profesori',
        destination: '/instructori',
        permanent: true,
      },
      {
        source: '/echipa',
        destination: '/instructori',
        permanent: true,
      },
      {
        source: '/despre',
        destination: '/despre-noi',
        permanent: true,
      },
      {
        source: '/despre_noi',
        destination: '/despre-noi',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/autentificare',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/inregistrare',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/inregistrare',
        permanent: true,
      },
      {
        source: '/account',
        destination: '/cont',
        permanent: true,
      },
      {
        source: '/profile',
        destination: '/cont',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pages/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/page/:slug',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },
  // Optimizăm politica de cache pentru resurse statice
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        source: '/:path*.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.avif',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: [
              '<https://fonts.googleapis.com>; rel=preconnect',
              '<https://fonts.gstatic.com>; rel=preconnect; crossorigin',
            ].join(', '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;