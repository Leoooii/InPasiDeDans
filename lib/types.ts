// Tipurile de date comune (Firestore), folosite atât pe site cât și în admin.

export type Tarif = {
  id: string;
  titlu: string;
  descriere: string;
  pret: number;
  moneda: string;
  categorie: 'grup' | 'privat' | 'copii';
  beneficii: string[];
  popular: boolean;
  ordine: number;
};

export type TarifeGrupate = Record<Tarif['categorie'], Tarif[]>;

export type Instructor = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  order?: number;
  createdAt?: number;
};

export type Grupa = {
  id?: string;
  titlu: string;
  descriere: string;
  dataStart: string;
  program: string;
  instructor: string;
  locuriDisponibile: number;
  locuriTotale: number;
  stiluri: string[];
  zile: string[];
  publica?: boolean;
  nivel?: string;
  rol?: string;
  sala?: string;
};
