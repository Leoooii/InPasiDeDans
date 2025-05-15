// app/delete-data/page.tsx
import Link from 'next/link';
export default function DeleteData() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Ștergere Date</h1>
      <p>
        Pentru a solicita ștergerea datelor dumneavoastră, contactați-ne la{' '}
        <Link
          href="mailto:lioneh39@gmail.com"
          className="text-blue-600 underline"
        >
          lioneh39@gmail.com
        </Link>
        .
      </p>
    </div>
  );
}
