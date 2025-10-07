// Exportăm schema-urile pentru Sanity Studio
import { type SchemaTypeDefinition } from 'sanity'

import category from './schemas/category'
import author from './schemas/author'
import post from './schemas/post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, author, post],
}

