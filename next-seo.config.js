const SEO = {
  titleTemplate: '%s | In Pasi de Dans',
  defaultTitle: 'In Pasi de Dans | Scoala de Dans Bucuresti',
  description:
    'Descopera cursuri de dans pentru toate varstele si nivelurile, in inima Bucurestiului. Te asteptam sa dansezi cu noi!',
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://www.inpasidedans.ro/',
    title: 'In Pasi de Dans | Scoala de Dans Bucuresti',
    description:
      'Descopera cursuri de dans pentru toate varstele si nivelurile, in inima Bucurestiului. Te asteptam cu noi!',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/logo.png',
        width: 800,
        height: 600,
        alt: 'In Pasi de Dans',
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
