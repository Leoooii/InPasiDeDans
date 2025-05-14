import fs from 'fs';
import path from 'path';

const pages = [
  { folder: '', title: 'În Pași de Dans | Școală de Dans București', description: 'Descoperă cursuri de dans pentru toate vârstele și nivelurile, în inima Bucureștiului. Te așteptăm să dansezi cu noi!' },
  { folder: 'autentificare', title: 'Autentificare | În Pași de Dans', description: 'Autentifică-te pentru a accesa contul tău de dansator sau administrator.' },
  { folder: 'cont', title: 'Contul Meu | În Pași de Dans', description: 'Vizualizează și gestionează informațiile contului tău.' },
  { folder: 'contact', title: 'Contact | În Pași de Dans', description: 'Ia legătura cu noi pentru întrebări, programări sau colaborări.' },
  { folder: 'cursuri-dans-adulti', title: 'Cursuri de Dans pentru Adulți | În Pași de Dans', description: 'Alege cursuri de dans pentru adulți de la începători la avansați. Ambianță prietenoasă și profesori pasionați.' },
  { folder: 'cursuri-dans-copii', title: 'Cursuri Dans Copii | În Pași de Dans', description: 'Cursuri de dans pentru copii, adaptate pe grupe de vârstă și nivel. Distracție, mișcare și încredere în sine.' },
  { folder: 'dansuri-de-societate', title: 'Dansuri de Societate | În Pași de Dans', description: 'Învață vals, tango și alte dansuri elegante în cadrul nostru profesionist.' },
  { folder: 'dansuri-latino', title: 'Dansuri Latino | În Pași de Dans', description: 'Explorează ritmurile pasionale ale dansurilor latino precum salsa, bachata și cha-cha.' },
  { folder: 'dansuri-populare', title: 'Dansuri Populare | În Pași de Dans', description: 'Învață tradițiile dansurilor românești autentice. Lecții pentru toate vârstele.' },
  { folder: 'despre-noi', title: 'Despre Noi | În Pași de Dans', description: 'Află povestea noastră, misiunea școlii și valorile care ne ghidează.' },
  { folder: 'excursii', title: 'Excursii & Evenimente | În Pași de Dans', description: 'Participă la excursii tematice și evenimente de dans în afara sălii.' },
  { folder: 'grupe-in-formare', title: 'Grupe în Formare | În Pași de Dans', description: 'Vezi ce grupe noi de dans se formează și când te poți alătura.' },
  { folder: 'inregistrare', title: 'Înregistrare | În Pași de Dans', description: 'Creează un cont nou pentru a te înscrie la cursurile preferate.' },
  { folder: 'inscriere', title: 'Înscriere Cursuri | În Pași de Dans', description: 'Completează formularul de înscriere la cursurile noastre de dans.' },
  { folder: 'instructori', title: 'Instructorii Noștri | În Pași de Dans', description: 'Cunoaște echipa noastră de instructori dedicați și talentați.' },
  { folder: 'lectii-private', title: 'Lecții Private | În Pași de Dans', description: 'Programează lecții private adaptate nevoilor tale și progresează rapid.' },
  { folder: 'petreceri', title: 'Petreceri & Social Dance | În Pași de Dans', description: 'Vino la petrecerile noastre tematice și pune în practică ce ai învățat.' },
  { folder: 'program', title: 'Program Cursuri | În Pași de Dans', description: 'Verifică orarul complet al cursurilor de dans din această săptămână.' },
  { folder: 'tarife', title: 'Tarife | În Pași de Dans', description: 'Consultă prețurile și ofertele disponibile pentru toate cursurile.' },
];

const appDir = path.join(process.cwd(), 'app');

pages.forEach(({ folder, title, description }) => {
  const dir = path.join(appDir, folder);
  const file = path.join(dir, 'head.tsx');

  const content = `export default function Head() {
  return (
    <>
      <title>${title}</title>
      <meta name="description" content="${description}" />
    </>
  );
}
`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✔️  Creat: ${file}`);
});
