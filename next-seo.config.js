const SEO = {
  titleTemplate: '%s | În Pași de Dans',
  defaultTitle: 'În Pași de Dans | Școală de Dans București',
  description:
    'Descoperă cursuri de dans pentru toate vârstele și nivelurile, în inima Bucureștiului. Te așteptăm să dansezi cu noi!',
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://www.inpasidedans.ro/',
    title: 'În Pași de Dans | Școală de Dans București',
    description:
      'Descoperă cursuri de dans pentru toate vârstele și nivelurile, în inima Bucureștiului. Te așteptăm să dansezi cu noi!',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/logo.png',
        width: 800,
        height: 600,
        alt: 'În Pași de Dans',
      },
    ],
  },
  twitter: {
    handle: '@inpasidedans',
    site: '@inpasidedans',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'cursuri de dans București, școală de dans, dans copii, dans adulți, dansuri populare',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
};

export default SEO;
