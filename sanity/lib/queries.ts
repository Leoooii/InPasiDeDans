// Queries GROQ pentru Sanity
// GROQ = GraphQL-like query language al Sanity

// ===== QUERIES PENTRU ARTICOLE =====

// Toate articolele publicate (pentru index blog)
export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->,
      alt
    },
    author->{
      name,
      slug,
      image {
        asset->
      }
    },
    category->{
      title,
      slug
    },
    publishedAt,
    tags
  }
`

// Articolele dintr-o categorie
export const postsByCategoryQuery = `
  *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->,
      alt
    },
    author->{
      name,
      slug
    },
    category->{
      title,
      slug
    },
    publishedAt,
    tags
  }
`

// Un articol individual (cu tot conținutul)
export const singlePostQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    metaDescription,
    mainImage {
      asset->,
      alt,
      caption
    },
    author->{
      name,
      slug,
      role,
      bio,
      image {
        asset->
      },
      experienceYears,
      specializations
    },
    category->{
      title,
      slug,
      description
    },
    body,
    tags,
    publishedAt,
    featured,
    seo
  }
`

// Articole de un autor
export const postsByAuthorQuery = `
  *[_type == "post" && author->slug.current == $authorSlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->,
      alt
    },
    author->{
      name,
      slug,
      image {
        asset->
      }
    },
    category->{
      title,
      slug
    },
    publishedAt,
    tags
  }
`

// Articole cu un tag specific
export const postsByTagQuery = `
  *[_type == "post" && $tag in tags] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->,
      alt
    },
    author->{
      name,
      slug,
      image {
        asset->
      }
    },
    category->{
      title,
      slug
    },
    publishedAt,
    tags
  }
`

// Articole evidențiate (featured)
export const featuredPostsQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->,
      alt
    },
    author->{
      name,
      slug
    },
    category->{
      title,
      slug
    },
    publishedAt
  }
`

// Articole înrudite (aceeași categorie, exclud articolul curent)
export const relatedPostsQuery = `
  *[_type == "post" && category->slug.current == $categorySlug && slug.current != $currentSlug] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->,
      alt
    },
    category->{
      title,
      slug
    },
    publishedAt
  }
`

// ===== QUERIES PENTRU CATEGORII =====

// Toate categoriile
export const allCategoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    metaDescription,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`

// O categorie individuală
export const singleCategoryQuery = `
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    metaDescription,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`

// ===== QUERIES PENTRU AUTORI =====

// Toți autorii
export const allAuthorsQuery = `
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    role,
    image {
      asset->
    },
    experienceYears,
    specializations,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`

// Un autor individual
export const singleAuthorQuery = `
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    bio,
    image {
      asset->
    },
    experienceYears,
    specializations,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`

// ===== QUERIES PENTRU SITEMAP =====

// Toate slug-urile articolelor (pentru generare sitemap)
export const allPostSlugsQuery = `
  *[_type == "post"] {
    "slug": slug.current,
    "category": category->slug.current,
    publishedAt,
    _updatedAt
  }
`

// Toate slug-urile categoriilor
export const allCategorySlugsQuery = `
  *[_type == "category"] {
    "slug": slug.current,
    _updatedAt
  }
`

// Toate slug-urile autorilor
export const allAuthorSlugsQuery = `
  *[_type == "author"] {
    "slug": slug.current,
    _updatedAt
  }
`

// ===== QUERIES PENTRU TAG-URI =====

// Toate tag-urile unice (pentru pagină "explorează tag-uri")
export const allTagsQuery = `
  array::unique(*[_type == "post"].tags[])
`

// Număr articole per tag
export const tagsWithCountQuery = `
  {
    "tags": array::unique(*[_type == "post"].tags[]) | {
      "name": @,
      "count": count(*[_type == "post" && @ in tags])
    }
  }
`

