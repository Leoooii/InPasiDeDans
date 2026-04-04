import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dansuri Populare București – Horă, Sârbă, Brașoveancă | În Pași de Dans',
  description: 'Cursuri dansuri populare București – horă, sârbă, brașoveancă și multe altele. Instructori profesioniști, Sector 4-5-6. Înscrie-te acum!',
  keywords: 'dansuri populare, traditii romanesti, dansuri romanesti, lectii populare',
  alternates: { canonical: 'https://www.inpasidedans.ro/dansuri-populare' },
  openGraph: {
    title: 'Dansuri Populare București | În Pași de Dans',
    description: 'Tradiție, cultură și distracție în lecțiile noastre de dansuri populare românești.',
    url: 'https://www.inpasidedans.ro/dansuri-populare',
    images: [{ url: 'https://www.inpasidedans.ro/images/logo.png', alt: 'Dansuri populare românești București' }],
    locale: 'ro_RO',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Ce beneficii aduc dansurile populare practicate în cadrul școlii În Pași de Dans?',
      acceptedAnswer: { '@type': 'Answer', text: 'Participarea la dansurile populare ajută la menținerea tradițiilor românești vii, îmbunătățește coordonarea și oferă o activitate socială plină de energie și bucurie.' },
    },
    {
      '@type': 'Question',
      name: 'Ce presupune un curs de dans popular pentru începători?',
      acceptedAnswer: { '@type': 'Answer', text: 'Un curs de dans popular pentru începători include învățarea pașilor de bază și a ritmurilor tradiționale din diferite regiuni, într-un mod accesibil și plin de voie bună.' },
    },
    {
      '@type': 'Question',
      name: 'De ce merită să aleg cursuri de dansuri populare pentru adulți în București la școala În Pași de Dans?',
      acceptedAnswer: { '@type': 'Answer', text: 'Prin cursurile pe care le oferim, participanții redescoperă cultura românească, se relaxează și se conectează cu alți pasionați într-o atmosferă autentică și prietenoasă.' },
    },
    {
      '@type': 'Question',
      name: 'Care este structura unui program de cursuri de dansuri populare în București?',
      acceptedAnswer: { '@type': 'Answer', text: 'Un modul include lecții săptămânale, exerciții de coordonare și repetiții coregrafice, adaptate nivelului fiecărui participant.' },
    },
    {
      '@type': 'Question',
      name: 'Pot participa fără experiență la cursurile de dansuri populare pentru adulți în București la școala În Pași de Dans?',
      acceptedAnswer: { '@type': 'Answer', text: 'Da, dansurile populare sunt deschise tuturor, inclusiv celor fără experiență, instructorii adaptând ritmul și pașii în funcție de nivelul grupului.' },
    },
    {
      '@type': 'Question',
      name: 'Ce zone folclorice se studiază în cadrul cursurilor de dansuri populare la școala În Pași de Dans?',
      acceptedAnswer: { '@type': 'Answer', text: 'Cursurile noastre de dansuri populare includ stiluri din regiuni diverse ale României — Ardeal, Oltenia, Moldova sau Muntenia — pentru o experiență completă.' },
    },
    {
      '@type': 'Question',
      name: 'Care sunt beneficiile fizice aduse de participarea la cursurile de dansuri populare de la școala În Pași de Dans?',
      acceptedAnswer: { '@type': 'Answer', text: 'Practicarea unui dans popular contribuie la îmbunătățirea echilibrului, tonusului muscular și rezistenței fizice, fiind o formă excelentă de mișcare recreativă.' },
    },
    {
      '@type': 'Question',
      name: 'Ce durată are un modul de cursuri de dansuri populare pentru adulți în București?',
      acceptedAnswer: { '@type': 'Answer', text: 'Un modul se desfășoară pe o perioadă de câteva luni, cu întâlniri săptămânale ce asigură progres constant.' },
    },
    {
      '@type': 'Question',
      name: 'Este nevoie de echipament special pentru cursurile de dansuri populare de la școala În Pași de Dans?',
      acceptedAnswer: { '@type': 'Answer', text: 'Pentru cursurile noastre, se recomandă îmbrăcăminte comodă și încălțăminte flexibilă; costumele tradiționale sunt folosite doar la evenimente sau spectacole.' },
    },
    {
      '@type': 'Question',
      name: 'Cum mă pot înscrie la cursurile de dansuri populare pentru adulți în București?',
      acceptedAnswer: { '@type': 'Answer', text: 'Înscrierea se face online, prin completarea formularului de pe site, sau direct la sediul școlii, în funcție de programul grupelor.' },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
