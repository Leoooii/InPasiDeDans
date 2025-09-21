import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface SEOBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function SEOBreadcrumbs({ items, className = "" }: SEOBreadcrumbsProps) {
  // Generăm schema markup pentru breadcrumbs
  const schemaMarkup = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@id": item.url || undefined,
        "name": item.name
      }
    })).filter(item => item.item["@id"]) // Filtrează elementele fără URL (pagina curentă)
  };

  return (
    <>
      {/* Schema markup pentru SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaMarkup)
        }}
      />
      
      {/* Breadcrumb visual */}
      <nav className={`flex items-center space-x-1 text-sm mb-6 ${className}`} aria-label="Breadcrumb">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            )}
            
            {index === 0 ? (
              <div className="flex items-center">
                <Home className="h-4 w-4 mr-1 text-red-600" />
                {item.url ? (
                  <Link 
                    href={item.url}
                    className="text-red-600 hover:text-red-700 transition-colors duration-200 font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-gray-900 dark:text-gray-100 font-semibold">
                    {item.name}
                  </span>
                )}
              </div>
            ) : (
              <>
                {item.url ? (
                  <Link 
                    href={item.url}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors duration-200 font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-gray-900 dark:text-gray-100 font-semibold bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md">
                    {item.name}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
