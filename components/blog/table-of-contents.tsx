'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: any[] // Sanity block content
}

// Funcție pentru a estima timpul de citire
function calculateReadingTime(content: any[]): number {
  if (!content) return 0
  
  const text = content
    .filter((block) => block._type === 'block')
    .map((block) => block.children?.map((child: any) => child.text).join(' '))
    .join(' ')
  
  const words = text.split(/\s+/).length
  const readingTime = Math.ceil(words / 200) // 200 cuvinte pe minut
  
  return readingTime
}

// Extrage headings din conținutul Sanity
function extractHeadings(content: any[]): TOCItem[] {
  if (!content) return []
  
  return content
    .filter((block) => block._type === 'block' && ['h2', 'h3'].includes(block.style))
    .map((block, index) => ({
      id: `heading-${index}`,
      text: block.children?.map((child: any) => child.text).join(' ') || '',
      level: block.style === 'h2' ? 2 : 3,
    }))
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(true)
  const readingTime = calculateReadingTime(content)

  useEffect(() => {
    const items = extractHeadings(content)
    setHeadings(items)

    // Adaugă ID-uri la headings din DOM
    const headingElements = document.querySelectorAll('h2, h3')
    headingElements.forEach((heading, index) => {
      heading.id = `heading-${index}`
    })

    // Scroll spy - detectează heading-ul activ
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    headingElements.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [content])

  if (headings.length === 0) return null

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="my-8 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div 
        className="flex cursor-pointer items-center justify-between p-4 md:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Cuprins Articol
          </h2>
        </div>
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Toggle TOC"
        >
          {isOpen ? '▼' : '▶'}
        </button>
      </div>

      {/* Content */}
      <div className={`border-t border-gray-200 dark:border-gray-700 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <nav className="p-4">
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={`${heading.level === 3 ? 'ml-4' : ''}`}
              >
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={`w-full text-left transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    activeId === heading.id
                      ? 'font-semibold text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {heading.level === 3 && '• '}
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>

          {/* Reading Time */}
          <div className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Timp estimat citire: {readingTime} {readingTime === 1 ? 'minut' : 'minute'}</span>
          </div>
        </nav>
      </div>
    </div>
  )
}

