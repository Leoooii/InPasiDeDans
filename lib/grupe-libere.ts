// Grupele deja pornite care primesc încă începători și au locuri libere.
// Se afișează când nu există „grupe în formare” publice, ca vizitatorul să
// aibă mereu unde să se înscrie (aceleași date ca orarul de pe /program).

export type GrupaLibera = {
  id: string;
  titlu: string;
  instructor: string;
  zile: string[];
  ora: string;
  nivel: string;
  sala?: string;
  locuri: number;
  rol?: string;
  /** id-ul cursului general din formularul de înscriere (?curs=) */
  curs: 'dans-adulti-latino-societate' | 'dansuri-adulti-populare' | 'dans-copii';
  pentruCopii: boolean;
};

const NIVELURI_PENTRU_INCEPATORI = ['Începători', 'Copii Începători', 'All levels'];
const ORDINE_ZILE = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];

function ora(program: string): string {
  return program.match(/(\d{1,2}:\d{2})/)?.[1] ?? '';
}

function minute(t: string): number {
  const m = t.match(/(\d{1,2}):(\d{2})/);
  return m ? +m[1] * 60 + +m[2] : 0;
}

/** Cursul general din formularul de înscriere (?curs=) potrivit unei grupe. */
export function cursPentruGrupa(d: Record<string, any>): GrupaLibera['curs'] {
  const text = [d.titlu, d.nivel, ...(d.stiluri || []), d.stil].filter(Boolean).join(' ').toLowerCase();
  if (text.includes('copii') || text.includes('formație') || text.includes('formatie')) return 'dans-copii';
  if (text.includes('popular')) return 'dansuri-adulti-populare';
  return 'dans-adulti-latino-societate';
}

export function grupeCuLocuriPentruIncepatori(docs: Record<string, any>[] | null, limita?: number): GrupaLibera[] {
  const lista = (docs ?? [])
    .filter(d => NIVELURI_PENTRU_INCEPATORI.includes(d.nivel) && Number(d.locuriDisponibile) > 0)
    .map<GrupaLibera>(d => {
      const curs = cursPentruGrupa(d);
      return {
        id: d.id,
        titlu: (d.titlu || '').trim(),
        instructor: (d.instructor || '').trim(),
        zile: d.zile || [],
        ora: ora(d.program || ''),
        nivel: d.nivel,
        sala: d.sala,
        locuri: Number(d.locuriDisponibile),
        rol: d.rol,
        curs,
        pentruCopii: curs === 'dans-copii',
      };
    })
    .sort((a, b) => {
      const za = Math.min(...a.zile.map(z => ORDINE_ZILE.indexOf(z)).filter(i => i >= 0), 99);
      const zb = Math.min(...b.zile.map(z => ORDINE_ZILE.indexOf(z)).filter(i => i >= 0), 99);
      return za - zb || minute(a.ora) - minute(b.ora);
    });
  return typeof limita === 'number' ? lista.slice(0, limita) : lista;
}
