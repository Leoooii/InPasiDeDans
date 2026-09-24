import CtaBanner from '@/components/cta-banner';
import GrupeInFormare from '@/components/grupe-in-formare';
import type { Metadata } from 'next';
import DanceLevels from '@/components/dance-levels';
import SEOBreadcrumbs from '@/components/seo-breadcrumbs';
import ProgramDinamic from '@/components/program-dinamic';
import { getToateGrupele, safe } from '@/lib/public-data';

export const metadata: Metadata = {
  title: 'Program Cursuri de Dans București | În Pași de Dans',
  description:
    'Programul actualizat al cursurilor de dans pentru copii și adulți, pe toate nivelurile, la În Pași de Dans, București.',
  keywords:
    'program cursuri dans, orar dans, cursuri dans adulti, cursuri dans copii, scoala dans Bucuresti',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.inpasidedans.ro/program',
  },
  openGraph: {
    type: 'website',
    title: 'Program Cursuri de Dans București | În Pași de Dans',
    description:
      'Programul actualizat al cursurilor de dans pentru copii și adulți, pe toate nivelurile, la În Pași de Dans, București.',
    url: 'https://www.inpasidedans.ro/program',
    siteName: 'In Pasi de Dans',
    images: [
      {
        url: 'https://www.inpasidedans.ro/images/program.png',
        width: 1200,
        height: 630,
        alt: 'Program Cursuri de Dans',
      },
    ],
    locale: 'ro_RO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Program Cursuri Dans Bucuresti: Sector 4,5 si 6 | In Pasi de Dans',
    description:
      'Programul actualizat al cursurilor de dans pentru copii și adulți, pe toate nivelurile, la În Pași de Dans, București.',
    images: ['https://www.inpasidedans.ro/images/program.png'],
  },
};

export default async function Program() {
  const grupe = await safe(getToateGrupele, null);

  const breadcrumbItems = [
    { name: "Acasă", url: "/" },
    { name: "Program" }
  ];

  return (
    <>
      <div className="container py-12">
        <SEOBreadcrumbs items={breadcrumbItems} currentPageUrl="https://www.inpasidedans.ro/program" />
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
            Program cursuri de dans din Bucuresti
            </h1>
            <p className="text-gray-500 ">
              Verifică orarul complet al cursurilor de dans pentru adulți și
              copii la În Pași de Dans, București.
            </p>
          </div>

          <ProgramDinamic initial={grupe} />
          <DanceLevels />
          <CtaBanner
            titlu="Înscrie-te la cursurile preferate"
            text="Locurile sunt limitate pentru a asigura o experiență de calitate. Rezervă-ți locul acum sau contactează-ne pentru detalii."
          />
        </div>
        <GrupeInFormare />
      </div>
    </>
  );
}
