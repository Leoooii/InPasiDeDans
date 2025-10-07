// Schema pentru Autori
// Ex: Alexandra Dumitrache, Lucian Popescu, etc.

export default {
  name: 'author',
  title: 'Autori',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nume Complet',
      type: 'string',
      description: 'Ex: Alexandra Dumitrache',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description: 'Ex: alexandra-dumitrache (se generează automat)',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Poză Profil',
      type: 'image',
      options: {
        hotspot: true, // Permite recadrare inteligentă
      },
      description: 'Poză instructor/autor (recomandată: 400x400px)'
    },
    {
      name: 'bio',
      title: 'Biografie',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          }
        }
      ],
      description: 'Scurtă descriere despre autor (2-3 paragrafe)'
    },
    {
      name: 'role',
      title: 'Rol',
      type: 'string',
      description: 'Ex: Instructor Dansuri Latino și Populare',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'experienceYears',
      title: 'Ani Experiență',
      type: 'number',
      description: 'Număr ani de predare dans'
    },
    {
      name: 'specializations',
      title: 'Specializări',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Ex: Salsa, Bachata, Dansuri Populare'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
}

