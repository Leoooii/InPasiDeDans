// Schema pentru Categorii Blog
// Ex: Dansuri Latino, Dansuri Populare, Dansul Mirilor, etc.

export default {
  name: 'category',
  title: 'Categorii Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nume Categorie',
      type: 'string',
      description: 'Ex: Dansuri Latino',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Ex: dansuri-latino (se generează automat din titlu)',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Descriere',
      type: 'text',
      rows: 3,
      description: 'Descriere scurtă pentru pagina categoriei (folosită și pentru SEO)'
    },
    {
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 2,
      description: '150-160 caractere pentru Google',
      validation: (Rule: any) => Rule.max(160)
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
}

