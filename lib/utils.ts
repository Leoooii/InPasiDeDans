import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Constants for website URLs
export const WEBSITE_URLS = {
  CONTACT: 'https://www.inpasidedans.ro/contact?utm_source=google&utm_medium=trafic+organic&utm_campaign=google+business+profile',
  CONTACT_BASIC: 'https://www.inpasidedans.ro/contact'
} as const
