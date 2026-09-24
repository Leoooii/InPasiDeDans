// Datele petrecerilor/excursiilor sunt introduse ca text în admin
// („19 decembrie 2026", „5-7 Septembrie 2025", ora „19:30 - 02:00").
// Schema.org cere ISO 8601; unde ziua lipsește („Decembrie 2023"), nu se poate.

const LUNI: Record<string, number> = {
  ianuarie: 1, februarie: 2, martie: 3, aprilie: 4, mai: 5, iunie: 6,
  iulie: 7, august: 8, septembrie: 9, octombrie: 10, noiembrie: 11, decembrie: 12,
};

const pad = (n: number) => String(n).padStart(2, '0');

// Ora României: +03:00 între ultima duminică din martie și ultima din octombrie.
function offsetBucuresti(an: number, luna: number, zi: number): string {
  const ultimaDuminica = (l: number) => {
    const d = new Date(Date.UTC(an, l, 0));
    return d.getUTCDate() - d.getUTCDay();
  };
  const vara =
    (luna > 3 && luna < 10) ||
    (luna === 3 && zi >= ultimaDuminica(3)) ||
    (luna === 10 && zi < ultimaDuminica(10));
  return vara ? '+03:00' : '+02:00';
}

function faraDiacritice(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export function dateEvenimentIso(data?: string, ora?: string): { start: string; end?: string } | null {
  if (!data) return null;
  const m = faraDiacritice(data).match(/(\d{1,2})(?:\s*-\s*(\d{1,2}))?\s+([a-z]+)\s+(\d{4})/);
  if (!m) return null;
  const luna = LUNI[m[3]];
  if (!luna) return null;
  const an = Number(m[4]);
  const ziStart = Number(m[1]);
  const ziFinal = m[2] ? Number(m[2]) : undefined;
  const zi = (d: number) => `${an}-${pad(luna)}-${pad(d)}`;

  const ore = (ora || '').match(/(\d{1,2}):(\d{2})(?:\s*-\s*(\d{1,2}):(\d{2}))?/);
  if (!ore) {
    return { start: zi(ziStart), end: ziFinal ? zi(ziFinal) : undefined };
  }
  const off = offsetBucuresti(an, luna, ziStart);
  const start = `${zi(ziStart)}T${pad(Number(ore[1]))}:${ore[2]}:00${off}`;
  if (!ore[3]) return { start };
  // Ora de final mai mică decât cea de start = după miezul nopții.
  const trecePesteNoapte = Number(ore[3]) * 60 + Number(ore[4]) <= Number(ore[1]) * 60 + Number(ore[2]);
  const dFinal = new Date(Date.UTC(an, luna - 1, (ziFinal ?? ziStart) + (trecePesteNoapte ? 1 : 0)));
  const ziF = `${dFinal.getUTCFullYear()}-${pad(dFinal.getUTCMonth() + 1)}-${pad(dFinal.getUTCDate())}`;
  return { start, end: `${ziF}T${pad(Number(ore[3]))}:${ore[4]}:00${off}` };
}
