import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Constants for website URLs
export const WEBSITE_URLS = {
  CONTACT:
    "https://www.inpasidedans.ro/contact?utm_source=google&utm_medium=trafic+organic&utm_campaign=google+business+profile",
  CONTACT_BASIC: "https://www.inpasidedans.ro/contact",
} as const

const removeDiacritics = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ș/g, "s")
    .replace(/ț/g, "t")
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")

export const slugifyText = (value: string) =>
  removeDiacritics(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

export const buildGrupaSlug = (title: string, id: string) => {
  const safeTitle = slugifyText(title || "grupa-dans")
  return `${safeTitle}-${id}`
}

export const extractGrupaIdFromSlug = (slug: string) => {
  if (!slug) return ""
  const parts = slug.split("-")
  return parts[parts.length - 1] || slug
}
