// Avatare ilustrate (SVG desenat aici, fără fișiere externe).
// Folosite pentru conturi (admin, instructori) și pentru cursanți.

type TipPar = 'scurt' | 'lateral' | 'lung' | 'coc' | 'cret' | 'bob' | 'coada' | 'chel';

type Persoana = {
  fundal: string;
  piele: string;
  par: string;
  tipPar: TipPar;
  haina: string;
  barba?: boolean;
  ochelari?: boolean;
  copil?: boolean;
};

const OCHI = '#1f2937';

function parSpate(p: Persoana) {
  switch (p.tipPar) {
    case 'lung':
      return <path d="M27 46 C26 23 39 16 50 16 C61 16 74 23 73 46 L76 79 C66 84 34 84 24 79 Z" fill={p.par} />;
    case 'bob':
      return <path d="M28 46 C27 24 39 17 50 17 C61 17 73 24 72 46 L72 60 C66 63 34 63 28 60 Z" fill={p.par} />;
    case 'coada':
      return <path d="M66 30 C80 32 82 52 76 70 C74 60 72 50 66 42 Z" fill={p.par} />;
    case 'coc':
      return <circle cx="50" cy="19" r="9" fill={p.par} />;
    default:
      return null;
  }
}

function parFata(p: Persoana) {
  switch (p.tipPar) {
    case 'scurt':
      return <path d="M31 45 C29 26 40 19 51 19 C62 19 72 26 69 45 C67 36 61 30 50 30 C40 30 33 36 31 45 Z" fill={p.par} />;
    case 'lateral':
      return <path d="M31 44 C29 25 40 18 52 18 C64 18 72 27 69 44 C66 34 58 30 49 31 C44 32 40 35 37 39 C35 36 33 39 31 44 Z" fill={p.par} />;
    case 'lung':
    case 'bob':
      return <path d="M31 44 C31 27 41 20 50 20 C60 20 69 27 69 44 C62 33 54 29 45 31 C39 33 34 37 31 44 Z" fill={p.par} />;
    case 'coc':
    case 'coada':
      return <path d="M31 44 C30 27 40 21 50 21 C60 21 70 27 69 44 C65 34 58 30 50 30 C42 30 35 34 31 44 Z" fill={p.par} />;
    case 'cret':
      return (
        <g fill={p.par}>
          {[
            [32, 40], [33, 31], [39, 24], [47, 21], [55, 21], [62, 24], [67, 31], [68, 40], [42, 29], [50, 27], [58, 29],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="7" />
          ))}
        </g>
      );
    case 'chel':
      return (
        <g fill={p.par}>
          <path d="M31 46 C31 40 32 37 34 35 L35 44 Z" />
          <path d="M69 46 C69 40 68 37 66 35 L65 44 Z" />
        </g>
      );
  }
}

function persoana(p: Persoana) {
  const cap = p.copil ? 18 : 19;
  return (
    <>
      <circle cx="50" cy="50" r="50" fill={p.fundal} />
      {/* umeri */}
      <path d="M18 100 C18 80 32 70 50 70 C68 70 82 80 82 100 Z" fill={p.haina} />
      <path d="M42 70 L50 79 L58 70 Z" fill="#fff" opacity=".85" />
      {parSpate(p)}
      <rect x="44" y="58" width="12" height="14" rx="5" fill={p.piele} />
      <circle cx="31" cy="47" r="4" fill={p.piele} />
      <circle cx="69" cy="47" r="4" fill={p.piele} />
      <circle cx="50" cy="45" r={cap} fill={p.piele} />
      {p.barba && (
        <path d="M33 47 C34 61 42 66 50 66 C58 66 66 61 67 47 C63 55 58 57 50 57 C42 57 37 55 33 47 Z" fill={p.par} />
      )}
      {parFata(p)}
      <ellipse cx="43" cy="46" rx="2.1" ry="2.5" fill={OCHI} />
      <ellipse cx="57" cy="46" rx="2.1" ry="2.5" fill={OCHI} />
      {p.ochelari && (
        <g fill="none" stroke="#334155" strokeWidth="1.6">
          <circle cx="43" cy="46" r="5" />
          <circle cx="57" cy="46" r="5" />
          <path d="M48 46 L52 46" />
        </g>
      )}
      <circle cx="38.5" cy="52.5" r="3" fill="#f87171" opacity=".3" />
      <circle cx="61.5" cy="52.5" r="3" fill="#f87171" opacity=".3" />
      <path d={p.barba ? 'M45 53 Q50 56 55 53' : 'M44.5 53 Q50 58 55.5 53'} fill="none" stroke="#7f1d1d" strokeWidth="1.8" strokeLinecap="round" />
    </>
  );
}

const PIELE = { deschis: '#fcd9bd', mediu: '#e9b48a', masliniu: '#c98d5e', inchis: '#8d5a3b' };

const OAMENI: Record<string, { eticheta: string; categorie: 'barbati' | 'femei' | 'copii'; p: Persoana }> = {
  b1: { eticheta: 'Bărbat, păr scurt', categorie: 'barbati', p: { fundal: '#fee2e2', piele: PIELE.deschis, par: '#3f2a1d', tipPar: 'scurt', haina: '#dc2626' } },
  b2: { eticheta: 'Bărbat cu barbă', categorie: 'barbati', p: { fundal: '#ffedd5', piele: PIELE.mediu, par: '#5b3a24', tipPar: 'lateral', haina: '#f97316', barba: true } },
  b3: { eticheta: 'Bărbat, păr creț', categorie: 'barbati', p: { fundal: '#e2e8f0', piele: PIELE.inchis, par: '#111827', tipPar: 'cret', haina: '#334155' } },
  b4: { eticheta: 'Bărbat cu ochelari', categorie: 'barbati', p: { fundal: '#fef3c7', piele: PIELE.deschis, par: '#d6a23c', tipPar: 'lateral', haina: '#0f766e', ochelari: true } },
  b5: { eticheta: 'Bărbat, chel', categorie: 'barbati', p: { fundal: '#dbeafe', piele: PIELE.masliniu, par: '#3f3f46', tipPar: 'chel', haina: '#1e3a8a', barba: true } },
  f1: { eticheta: 'Femeie, păr lung', categorie: 'femei', p: { fundal: '#fee2e2', piele: PIELE.deschis, par: '#6b3e23', tipPar: 'lung', haina: '#dc2626' } },
  f2: { eticheta: 'Femeie cu coc (dansatoare)', categorie: 'femei', p: { fundal: '#fce7f3', piele: PIELE.deschis, par: '#e0b04a', tipPar: 'coc', haina: '#be185d' } },
  f3: { eticheta: 'Femeie, păr creț', categorie: 'femei', p: { fundal: '#ffedd5', piele: PIELE.inchis, par: '#1f1512', tipPar: 'cret', haina: '#f97316' } },
  f4: { eticheta: 'Femeie, bob roșcat', categorie: 'femei', p: { fundal: '#ecfccb', piele: PIELE.deschis, par: '#b4461e', tipPar: 'bob', haina: '#4d7c0f' } },
  f5: { eticheta: 'Femeie, coadă', categorie: 'femei', p: { fundal: '#ede9fe', piele: PIELE.mediu, par: '#2b1b12', tipPar: 'coada', haina: '#6d28d9', ochelari: true } },
  c1: { eticheta: 'Băiat', categorie: 'copii', p: { fundal: '#e0f2fe', piele: PIELE.deschis, par: '#9a5b2e', tipPar: 'scurt', haina: '#0284c7', copil: true } },
  c2: { eticheta: 'Fată', categorie: 'copii', p: { fundal: '#fce7f3', piele: PIELE.mediu, par: '#4a2c1a', tipPar: 'coada', haina: '#db2777', copil: true } },
};

export type CategorieIlustratie = 'barbati' | 'femei' | 'copii';

export const ILUSTRATII: { id: string; eticheta: string; categorie: CategorieIlustratie }[] = [
  ...Object.entries(OAMENI).map(([id, o]) => ({ id, eticheta: o.eticheta, categorie: o.categorie })),
];

export function Ilustratie({ id, className }: { id: string; className?: string }) {
  const om = OAMENI[id] ?? OAMENI.f1;
  const eticheta = om.eticheta;
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={eticheta}>
      <clipPath id={`clip-${id}`}>
        <circle cx="50" cy="50" r="50" />
      </clipPath>
      <g clipPath={`url(#clip-${id})`}>{persoana(om.p)}</g>
    </svg>
  );
}
