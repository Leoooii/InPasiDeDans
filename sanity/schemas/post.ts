// Schema pentru Articole Blog
// Aici se definește structura fiecărui articol

export default {
  name: 'post',
  title: 'Articole Blog',
  type: 'document',
  fields: [
    // ===== INFORMAȚII DE BAZĂ =====
    {
      name: 'title',
      title: 'Titlu Articol (H1)',
      type: 'string',
      description: 'Ex: Ghid Complet: Cum să Înveți Salsa pentru Începători',
      validation: (Rule: any) => Rule.required().max(100)
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Ex: ghid-invata-salsa-incepatori (se generează automat)',
      validation: (Rule: any) => Rule.required()
    },

    // ===== REFERINȚE =====
    {
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
      description: 'Selectează autorul articolului',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Categorie',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Selectează categoria principală',
      validation: (Rule: any) => Rule.required()
    },

    // ===== IMAGINI =====
    {
      name: 'mainImage',
      title: 'Imagine Principală',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Text Alternativ (SEO)',
          type: 'string',
          description: 'Descrie imaginea pentru SEO și accesibilitate',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'caption',
          title: 'Legendă (opțional)',
          type: 'string',
          description: 'Text care apare sub imagine'
        }
      ],
      description: 'Imagine featured (recomandată: 1200x630px)',
      validation: (Rule: any) => Rule.required()
    },

    // ===== DESCRIERI =====
    {
      name: 'excerpt',
      title: 'Extras (Preview)',
      type: 'text',
      rows: 4,
      description: 'Scurtă descriere care apare în listele de articole (150-200 caractere)',
      validation: (Rule: any) => Rule.required().max(200)
    },
    {
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
      description: 'Descriere pentru Google (150-160 caractere). Dacă nu completezi, se va folosi excerpt-ul.',
      validation: (Rule: any) => Rule.max(160)
    },

    // ===== CONȚINUT PRINCIPAL =====
    {
      name: 'body',
      title: 'Conținut Articol',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Citat', value: 'blockquote' },
          ],
          lists: [
            { title: 'Listă cu puncte', value: 'bullet' },
            { title: 'Listă numerotată', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                title: 'Link URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule: any) => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    title: 'Deschide în tab nou',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: true
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Text Alternativ',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Legendă',
            }
          ]
        },
        // Cod YouTube embed (opțional - pentru tutorial-uri video)
        {
          type: 'object',
          name: 'youtube',
          title: 'Video YouTube',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'YouTube URL',
              description: 'Link complet YouTube (ex: https://www.youtube.com/watch?v=...)'
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required()
    },

    // ===== TAG-URI ȘI ORGANIZARE =====
    {
      name: 'tags',
      title: 'Tag-uri',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Ex: incepatori, tehnici, salsa, tutorial'
    },
    {
      name: 'featured',
      title: 'Articol Evidențiat',
      type: 'boolean',
      description: 'Apare în secțiunea "Articole Recomandate"',
      initialValue: false
    },

    // ===== PUBLICARE =====
    {
      name: 'publishedAt',
      title: 'Data Publicare',
      type: 'datetime',
      description: 'Când vrei să fie publicat articolul. Dacă nu completezi, se publică imediat.',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Publicat', value: 'published' },
          { title: 'Arhivat', value: 'archived' }
        ],
        layout: 'radio'
      },
      initialValue: 'draft',
      validation: (Rule: any) => Rule.required()
    },

    // ===== SCHEMA MARKUP (pentru SEO rich snippets) =====
    {
      name: 'howTo',
      title: 'Schema HowTo (pentru ghiduri pas-cu-pas)',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        {
          name: 'enabled',
          title: 'Activează Schema HowTo',
          type: 'boolean',
          description: 'Bifează dacă acest articol este un ghid "Cum să..." cu pași',
          initialValue: false
        },
        {
          name: 'totalTime',
          title: 'Timp Total (ex: PT30D pentru 30 zile)',
          type: 'string',
          description: 'Format ISO 8601: PT30M (30 min), PT2H (2 ore), PT30D (30 zile)'
        },
        {
          name: 'estimatedCost',
          title: 'Cost Estimat (RON)',
          type: 'number',
          description: 'Ex: 250 pentru cursuri de dans'
        },
        {
          name: 'supply',
          title: 'Materiale Necesare',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Ex: Pantofi de dans, Îmbrăcăminte lejeră'
        },
        {
          name: 'tools',
          title: 'Echipamente/Spații Necesare',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Ex: Sală de dans, Sistem audio'
        },
        {
          name: 'steps',
          title: 'Pașii Ghidului',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'name',
                title: 'Nume Pas',
                type: 'string',
                description: 'Ex: Învățați Pasul de Bază'
              },
              {
                name: 'text',
                title: 'Descriere Detaliată',
                type: 'text',
                rows: 4
              },
              {
                name: 'image',
                title: 'Imagine (Opțional)',
                type: 'image'
              }
            ]
          }]
        }
      ]
    },
    {
      name: 'faq',
      title: 'FAQ (Întrebări Frecvente)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'question',
            title: 'Întrebare',
            type: 'string',
            description: 'Ex: Cât timp durează să înveț salsa?'
          },
          {
            name: 'answer',
            title: 'Răspuns',
            type: 'text',
            rows: 4,
            description: 'Răspuns complet (40-300 cuvinte recomandat)'
          }
        ],
        preview: {
          select: {
            title: 'question',
            subtitle: 'answer'
          }
        }
      }],
      description: 'Minim 3 întrebări recomandat pentru Schema FAQPage'
    },

    // ===== SEO AVANSAT (OPȚIONAL) =====
    {
      name: 'seo',
      title: 'SEO Avansat (Opțional)',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        {
          name: 'keywords',
          title: 'Cuvinte Cheie',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          },
          description: 'Ex: dans salsa, invata salsa bucuresti'
        },
        {
          name: 'noIndex',
          title: 'Nu indexa în Google (noindex)',
          type: 'boolean',
          description: 'Folosește doar pentru articole temporare sau test'
        }
      ]
    }
  ],

  // ===== PREVIEW ÎN LISTĂ =====
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      category: 'category.title',
      media: 'mainImage',
      status: 'status'
    },
    prepare(selection: any) {
      const { author, category, status } = selection
      const statusEmoji = status === 'published' ? '✅' : status === 'draft' ? '📝' : '📦'
      return {
        ...selection,
        subtitle: `${statusEmoji} ${category} · de ${author}`
      }
    },
  },

  // ===== ORDONARE =====
  orderings: [
    {
      title: 'Data Publicare (Nou → Vechi)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Data Publicare (Vechi → Nou)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }]
    },
    {
      title: 'Titlu (A → Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ]
}

