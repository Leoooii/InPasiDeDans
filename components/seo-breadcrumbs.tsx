import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface SEOBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  currentPageUrl?: string;
  /** light = pe fundal deschis; dark = pe fundal închis sau colorat (text alb). */
  tone?: 'light' | 'dark';
}

const SITE = 'https://www.inpasidedans.ro';
const absolut = (url: string) => (url.startsWith('http') ? url : `${SITE}${url}`);

const STIL = {
  light: {
    home: 'text-red-600',
    primul: 'text-red-600 hover:text-red-700 hover:underline',
    link: 'text-slate-600 hover:text-red-600 hover:underline',
    curent: 'text-slate-900 font-semibold bg-red-50 px-2 py-1 rounded-md',
    separator: 'text-slate-400',
  },
  dark: {
    home: 'text-orange-300',
    primul: 'text-white/80 hover:text-white',
    link: 'text-white/80 hover:text-white',
    curent: 'text-white font-semibold',
    separator: 'text-white/40',
  },
};

// Singura componentă de breadcrumbs: afișare + schema BreadcrumbList pentru Google.
export default function SEOBreadcrumbs({ items, className = '', currentPageUrl, tone = 'light' }: SEOBreadcrumbsProps) {
  const s = STIL[tone];
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
      .map((item, index) => {
        const url = item.url || (index === items.length - 1 ? currentPageUrl : undefined);
        return url ? { '@type': 'ListItem', position: index + 1, name: item.name, item: absolut(url) } : null;
      })
      .filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      <nav className={`text-sm mb-6 ${className}`} aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-y-1">
          {items.map((item, index) => {
            const ultimul = index === items.length - 1;
            return (
              <li key={index} className="flex items-center">
                {index > 0 && <ChevronRight aria-hidden className={`h-4 w-4 mx-2 ${s.separator}`} />}
                {index === 0 && <Home aria-hidden className={`h-4 w-4 mr-1 ${s.home}`} />}
                {item.url && !ultimul ? (
                  <Link
                    href={item.url}
                    className={`font-medium transition-colors duration-200 ${index === 0 ? s.primul : s.link}`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span aria-current={ultimul ? 'page' : undefined} className={s.curent}>
                    {item.name}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
