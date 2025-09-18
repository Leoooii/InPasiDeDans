import fs from 'fs';
import path from 'path';

const pages = [
  { folder: '', title: 'In Pasi de Dans | Scoala de Dans Bucuresti', description: 'Descopera cursuri de dans pentru toate varstele si nivelurile, in inima Bucurestiului. Te asteptam sa dansezi cu noi!' },
  { folder: 'autentificare', title: 'Autentificare | In Pasi de Dans', description: 'Autentifica-te pentru a accesa contul tau de dansator sau administrator.' },
  { folder: 'cont', title: 'Contul Meu | In Pasi de Dans', description: 'Vizualizeaza si gestioneaza informatiile contului tau.' },
  { folder: 'contact', title: 'Contact | In Pasi de Dans', description: 'Ia legatura cu noi pentru intrebari, programari sau colaborari.' },
  { folder: 'cursuri-dans-adulti', title: 'Cursuri de Dans pentru Adulti | In Pasi de Dans', description: 'Alege cursuri de dans pentru adulti de la incepatori la avansati. Ambianța prietenoasa si profesori pasionati.' },
  { folder: 'cursuri-dans-copii', title: 'Cursuri Dans Copii | In Pasi de Dans', description: 'Cursuri de dans pentru copii, adaptate pe grupe de varsta si nivel. Distractie, miscare si incredere in sine.' },
  { folder: 'dansuri-de-societate', title: 'Dansuri de Societate | In Pasi de Dans', description: 'Invata vals, tango si alte dansuri elegante in cadrul nostru profesionist.' },
  { folder: 'dansuri-latino', title: 'Dansuri Latino | In Pasi de Dans', description: 'Exploreaza ritmurile pasionale ale dansurilor latino precum salsa, bachata si cha-cha.' },
  { folder: 'dansuri-populare', title: 'Dansuri Populare | In Pasi de Dans', description: 'Invata traditiile dansurilor romanesti autentice. Lectii pentru toate varstele.' },
  { folder: 'despre-noi', title: 'Despre Noi | In Pasi de Dans', description: 'Afla povestea noastra, misiunea scolii si valorile care ne ghideaza.' },
  { folder: 'excursii', title: 'Excursii & Evenimente | In Pasi de Dans', description: 'Participa la excursii tematice si evenimente de dans in afara salii.' },
  { folder: 'grupe-in-formare', title: 'Grupe in Formare | In Pasi de Dans', description: 'Vezi ce grupe noi de dans se formeaza si cand te poti alatura.' },
  { folder: 'inregistrare', title: 'Inregistrare | In Pasi de Dans', description: 'Creeaza un cont nou pentru a te inscrie la cursurile preferate.' },
  { folder: 'inscriere', title: 'Inscriere Cursuri | In Pasi de Dans', description: 'Completeaza formularul de inscriere la cursurile noastre de dans.' },
  { folder: 'instructori', title: 'Instructorii Nostri | In Pasi de Dans', description: 'Cunoaste echipa noastra de instructori dedicati si talentati.' },
  { folder: 'lectii-private', title: 'Lectii Private | In Pasi de Dans', description: 'Programeaza lectii private adaptate nevoilor tale si progreseaza rapid.' },
  { folder: 'petreceri', title: 'Petreceri & Social Dance | In Pasi de Dans', description: 'Vino la petrecerile noastre tematice si pune in practica ce ai invatat.' },
  { folder: 'program', title: 'Program Cursuri | In Pasi de Dans', description: 'Verifica orarul complet al cursurilor de dans din aceasta saptamana.' },
  { folder: 'tarife', title: 'Tarife | In Pasi de Dans', description: 'Consulta preturile si ofertele disponibile pentru toate cursurile.' },
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
