// Import toate schema-urile
import category from './category'
import author from './author'
import post from './post'

// Exportăm toate schema-urile într-un array
export const schemaTypes = [
  // Documentele de bază trebuie create ÎNAINTE de articole
  category,  // 1. Categorii (Dansuri Latino, etc.)
  author,    // 2. Autori (Alexandra, Lucian, etc.)
  post,      // 3. Articole (se bazează pe categorii și autori)
]

