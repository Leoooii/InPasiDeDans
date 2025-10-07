import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// Project: inpasidedans-blog
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hik8yavy'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'inpasidedans-blog',
  title: 'În Pași de Dans - Blog',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conținut Blog')
          .items([
            // Articole Blog (cel mai important)
            S.listItem()
              .title('📝 Articole')
              .icon(() => '📝')
              .child(
                S.documentTypeList('post')
                  .title('Articole Blog')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            
            // Categorii
            S.listItem()
              .title('📂 Categorii')
              .icon(() => '📂')
              .child(
                S.documentTypeList('category')
                  .title('Categorii Blog')
              ),
            
            // Autori
            S.listItem()
              .title('👤 Autori')
              .icon(() => '👤')
              .child(
                S.documentTypeList('author')
                  .title('Autori')
              ),

            // Divider
            S.divider(),

            // Articole după status
            S.listItem()
              .title('📊 Articole după Status')
              .icon(() => '📊')
              .child(
                S.list()
                  .title('Status')
                  .items([
                    S.listItem()
                      .title('✅ Publicate')
                      .child(
                        S.documentTypeList('post')
                          .title('Articole Publicate')
                          .filter('status == "published"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('📝 Draft')
                      .child(
                        S.documentTypeList('post')
                          .title('Articole Draft')
                          .filter('status == "draft"')
                      ),
                    S.listItem()
                      .title('📦 Arhivate')
                      .child(
                        S.documentTypeList('post')
                          .title('Articole Arhivate')
                          .filter('status == "archived"')
                      ),
                  ])
              ),

            // Articole evidențiate
            S.listItem()
              .title('⭐ Articole Evidențiate')
              .icon(() => '⭐')
              .child(
                S.documentTypeList('post')
                  .title('Articole Evidențiate')
                  .filter('featured == true')
              ),
          ]),
    }),
    visionTool(), // Tool pentru testare queries
  ],

  schema: {
    types: schemaTypes,
  },
})

