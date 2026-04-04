/**
 * Date de business unificate pentru schema markup (JSON-LD).
 * Importă din acest fișier în toate paginile care au schema.org.
 * Verifică periodic că datele sunt corecte (telefon, adresă, ore).
 */

export const BUSINESS = {
  name: 'În Pași de Dans',
  nameSimple: 'In Pasi de Dans',
  url: 'https://www.inpasidedans.ro',
  telephone: '+40722675126',
  email: 'inpasidedans@gmail.com',
  description:
    'Școala de dans cu tradiție din 2009, oferind cursuri de dansuri latino, de societate, populare și lecții private în București.',
  logo: 'https://www.inpasidedans.ro/images/logo.png',
  image: 'https://www.inpasidedans.ro/images/logo.png',
  foundingDate: '2009',
  priceRange: '$$',
  currenciesAccepted: 'RON',
  paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
  address: {
    '@type': 'PostalAddress' as const,
    streetAddress: 'Calea Rahovei, Nr. 262',
    addressLocality: 'București',
    addressRegion: 'Sector 5',
    postalCode: '050897',
    addressCountry: 'RO',
  },
  geo: {
    '@type': 'GeoCoordinates' as const,
    latitude: 44.4153536,
    longitude: 26.0774895,
  },
  // ore de birou/recepție — verifică și actualizează dacă e cazul
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: 'Saturday',
      opens: '14:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/scoaladedansinpasidedans',
    'https://www.instagram.com/inpasidedans/',
    'https://www.tiktok.com/@in.pasi.de.dans',
    'https://www.youtube.com/@inpasidedans',
  ],
  areaServed: {
    '@type': 'City' as const,
    name: 'București',
    addressCountry: 'RO',
  },
} as const;

/** Schema de bază School/DanceSchool pentru layout global */
export const SCHOOL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'DanceSchool',
  additionalType: 'https://www.productontology.org/id/Dance_school',
  name: BUSINESS.name,
  description: BUSINESS.description,
  url: BUSINESS.url,
  logo: BUSINESS.logo,
  image: BUSINESS.image,
  telephone: BUSINESS.telephone,
  email: BUSINESS.email,
  foundingDate: BUSINESS.foundingDate,
  address: BUSINESS.address,
  geo: BUSINESS.geo,
  openingHoursSpecification: BUSINESS.openingHoursSpecification,
  priceRange: BUSINESS.priceRange,
  currenciesAccepted: BUSINESS.currenciesAccepted,
  paymentAccepted: BUSINESS.paymentAccepted,
  areaServed: BUSINESS.areaServed,
  sameAs: BUSINESS.sameAs,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: BUSINESS.telephone,
    contactType: 'customer service',
    areaServed: 'RO',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cursuri de Dans',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Course', name: 'Dansuri Latino', description: 'Salsa, bachata, cha-cha și multe altele' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Course', name: 'Dansuri de Societate', description: 'Vals, tango, foxtrot și alte dansuri elegante' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Course', name: 'Dansuri Populare', description: 'Peste 200 de jocuri populare românești' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Course', name: 'Cursuri Copii', description: 'Cursuri de dans pentru copii și juniori' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Course', name: 'Lecții Private', description: 'Lecții private și dansul mirilor' },
      },
    ],
  },
};
