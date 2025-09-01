import Link from 'next/link';

export const metadata = {
  title: 'Sitemap | In Pasi de Dans',
  description: 'Toate paginile importante ale site-ului In Pasi de Dans, pentru utilizatori si crawlere.'
};

export default function SitemapPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Sitemap - In Pasi de Dans</h1>
      <ul className="space-y-2 text-lg">
        <li><Link href="/">Acasă</Link></li>
        <li><Link href="/grupe-in-formare">Grupe în formare</Link></li>
        <li><Link href="/cursuri-dans-adulti">Cursuri dans adulți</Link></li>
        <li><Link href="/cursuri-dans-copii">Cursuri dans copii</Link></li>
        <li><Link href="/lectii-private">Lecții private</Link></li>
        <li><Link href="/tarife">Tarife</Link></li>
        <li><Link href="/program">Program</Link></li>
        <li><Link href="/inscriere">Înscriere</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/dansuri-latino">Dansuri latino</Link></li>
        <li><Link href="/dansuri-de-societate">Dansuri de societate</Link></li>
        <li><Link href="/dansuri-populare">Dansuri populare</Link></li>
        <li><Link href="/despre-noi">Despre noi</Link></li>
        <li><Link href="/instructori">Instructori</Link></li>
        <li><Link href="/excursii">Excursii</Link></li>
        <li><Link href="/petreceri">Petreceri</Link></li>
        <li><Link href="/noutati">Noutăți</Link></li>
        <li><Link href="/evenimente">Evenimente</Link></li>
        <li><Link href="/autentificare">Autentificare</Link></li>
        <li><Link href="/cont">Contul meu</Link></li>
        <li><Link href="/inregistrare">Înregistrare</Link></li>
      </ul>
      <p className="mt-8 text-gray-500">Dacă nu găsești o pagină, folosește meniul principal sau contactul pentru asistență.</p>
    </div>
  );
} 