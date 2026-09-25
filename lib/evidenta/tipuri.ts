// Modelul evidenței (colecțiile Firestore `cursanti`, `abonamente`, `prezente`,
// `conturiInstructori`, `jurnal`). Grupele se citesc din colecția `grupe` a site-ului.

export type Rol = 'admin' | 'instructor';

export type Actor = { uid: string; nume: string; rol: Rol };

export type Cursant = {
  id: string;
  nume: string;
  telefon?: string;
  email?: string;
  observatii?: string;
  /** „ilustratie:<id>” sau gol (inițiale) */
  avatar?: string;
  /** id-uri din colecția `grupe` (numele câmpului e păstrat pentru tabul Grupe) */
  grupe: string[];
  activ: boolean;
  createdAt: number;
  createdBy?: Actor;
};

export type CategorieAbonament = 'adulti' | 'copii';

export type Abonament = {
  id: string;
  cursantId: string;
  cursantNume: string;
  tarifId: string;
  tip: string;
  categorie: CategorieAbonament;
  pret: number;
  /** null = nelimitat (Full Pass) */
  sedinteTotal: number | null;
  sedinteFolosite: number;
  /** ziua vânzării */
  dataVanzare: string;
  /** null = Full Pass neînceput (pornește la prima ședință) */
  dataStart: string | null;
  /** exclusivă: ultima zi valabilă e ziua dinainte */
  dataExpirare: string | null;
  anulat: boolean;
  createdAt: number;
  createdBy: Actor;
};

export type Prezenta = {
  id: string;
  cursantId: string;
  cursantNume: string;
  grupaId: string;
  grupaTitlu: string;
  data: string;
  abonamentId: string | null;
  /** cursantul nu e înscris în grupa respectivă (recuperare) */
  recuperare: boolean;
  createdAt: number;
  createdBy: Actor;
};

export type ContInstructor = {
  uid: string;
  nume: string;
  email: string;
  avatar?: string;
  grupe: string[];
  activ: boolean;
  createdAt: number;
};

export type TipJurnal =
  | 'cursant_adaugat'
  | 'cursant_modificat'
  | 'cursant_arhivat'
  | 'cursant_sters'
  | 'adaugat_in_grupa'
  | 'scos_din_grupa'
  | 'abonament_creat'
  | 'abonament_anulat'
  | 'prezenta_salvata'
  | 'prezenta_anulata'
  | 'prezenta_neacoperita'
  | 'cont_instructor'
  // calculate la afișare, nu se salvează
  | 'abonament_expira'
  | 'abonament_expirat'
  | 'abonament_epuizat';

export type IntrareJurnal = {
  id: string;
  tip: TipJurnal;
  mesaj: string;
  cursantId?: string;
  grupaId?: string;
  abonamentId?: string;
  actor: Actor;
  createdAt: number;
  /** avertizare calculată (nu există în Firestore) */
  calculat?: boolean;
};

export type GrupaEvidenta = {
  id: string;
  titlu: string;
  instructor: string;
  zile: string[];
  ora: string;
  publica: boolean;
  sala?: string;
  nivel?: string;
};
