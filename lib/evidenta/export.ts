'use client';

import { ramase, statusCursant, ultimaZi } from './abonament';
import { azi, dataScurta, oraDin } from './date';
import { cheie, predaInstructorul } from './instructori-grupe';
import { statisticaPrezenta } from './statistici';
import { incarcaAbonamente, incarcaConturi, incarcaCursanti, incarcaGrupe, incarcaJurnal, incarcaPrezente } from './repo';
import type { Abonament, Cursant, GrupaEvidenta, Prezenta } from './tipuri';

// Rapoarte și backup: PDF, Excel, CSV. Bibliotecile grele se încarcă doar la export.

export type FiltruRaport = {
  tip: 'cursant' | 'grupa' | 'luna' | 'complet';
  cursantId?: string;
  grupaId?: string;
  /** „YYYY-MM" */
  luna?: string;
  deLa?: string;
  panaLa?: string;
  /** doar grupele unui instructor (numele din grupa) */
  instructor?: string;
};

type Tabel = { nume: string; coloane: string[]; randuri: (string | number)[][]; latimi?: number[] };

export type Raport = { titlu: string; subtitlu: string; tabele: Tabel[]; numeFisier: string };

const ultimaZiLuna = (luna: string) => {
  const [y, m] = luna.split('-').map(Number);
  return new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
};

const slug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function stareAbonament(a: Abonament) {
  if (a.anulat) return 'anulat';
  if (a.dataExpirare && a.dataExpirare <= azi()) return 'expirat';
  if (ramase(a) <= 0) return 'epuizat';
  if (a.dataStart === null) return 'neînceput';
  return 'valabil';
}

export async function construiesteRaport(f: FiltruRaport): Promise<Raport> {
  const [grupe, cursantiToti, abonamenteToate] = await Promise.all([incarcaGrupe(), incarcaCursanti(), incarcaAbonamente()]);
  const grupa = (id: string) => grupe.find(g => g.id === id);

  let deLa = f.deLa;
  let panaLa = f.panaLa;
  if (f.tip === 'luna' && f.luna) {
    deLa = `${f.luna}-01`;
    panaLa = ultimaZiLuna(f.luna);
  }

  let grupeRaport: GrupaEvidenta[] = grupe;
  if (f.grupaId) grupeRaport = grupe.filter(g => g.id === f.grupaId);
  if (f.instructor) grupeRaport = grupeRaport.filter(g => predaInstructorul(g, cheie(f.instructor!)));
  const idGrupe = new Set(grupeRaport.map(g => g.id));
  const filtruGrupa = !!(f.grupaId || f.instructor);

  let prezente: Prezenta[];
  let cursanti: Cursant[];
  if (f.tip === 'cursant' && f.cursantId) {
    prezente = await incarcaPrezente({ cursantId: f.cursantId, deLa, panaLa });
    cursanti = cursantiToti.filter(c => c.id === f.cursantId);
  } else {
    prezente = await incarcaPrezente({ deLa, panaLa });
    if (filtruGrupa) prezente = prezente.filter(p => idGrupe.has(p.grupaId));
    cursanti = filtruGrupa
      ? cursantiToti.filter(c => c.grupe.some(g => idGrupe.has(g)) || prezente.some(p => p.cursantId === c.id))
      : f.tip === 'luna'
        ? cursantiToti.filter(c => prezente.some(p => p.cursantId === c.id) || abonamenteToate.some(a => a.cursantId === c.id && a.dataVanzare >= deLa! && a.dataVanzare <= panaLa!))
        : cursantiToti;
  }
  const idCursanti = new Set(cursanti.map(c => c.id));
  let abonamente = abonamenteToate.filter(a => idCursanti.has(a.cursantId));
  if (deLa || panaLa) {
    // abonamentele care se suprapun cu perioada
    abonamente = abonamente.filter(a => {
      const start = a.dataStart ?? a.dataVanzare;
      const final = a.dataExpirare ?? '9999-12-31';
      return (!panaLa || start <= panaLa) && (!deLa || final > deLa);
    });
  }
  const tipAb = new Map(abonamenteToate.map(a => [a.id, a.tip]));

  // ── Titlu
  const perioada = deLa || panaLa ? `${deLa ? dataScurta(deLa) : 'început'} – ${panaLa ? dataScurta(panaLa) : 'azi'}` : 'toată perioada';
  let titlu = 'Evidență completă';
  if (f.tip === 'cursant') titlu = `Fișa cursantului: ${cursanti[0]?.nume ?? ''}`;
  else if (f.grupaId) titlu = `Grupa: ${grupa(f.grupaId)?.titlu ?? ''}`;
  else if (f.tip === 'luna' && f.luna) titlu = `Raport lunar: ${new Date(`${f.luna}-15`).toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' })}`;
  if (f.instructor) titlu += ` · instructor ${f.instructor}`;

  // ── Tabele
  const tPrezente: Tabel = {
    nume: 'Prezențe',
    coloane: ['Data', 'Cursant', 'Grupă', 'Abonament', 'Recuperare', 'Marcat de'],
    latimi: [12, 26, 30, 24, 12, 18],
    randuri: [...prezente]
      .sort((a, b) => a.data.localeCompare(b.data) || a.cursantNume.localeCompare(b.cursantNume, 'ro'))
      .map(p => [
        p.data,
        p.cursantNume,
        p.grupaTitlu,
        p.abonamentId ? tipAb.get(p.abonamentId) ?? 'abonament șters' : 'FĂRĂ ABONAMENT',
        p.recuperare ? 'da' : '',
        p.createdBy?.nume ?? '',
      ]),
  };

  const tAbonamente: Tabel = {
    nume: 'Abonamente',
    coloane: ['Cursant', 'Tip', 'Categorie', 'Preț (lei)', 'Vândut pe', 'Start', 'Ultima zi', 'Ședințe', 'Stare', 'Vândut de'],
    latimi: [24, 22, 10, 10, 12, 12, 12, 10, 11, 16],
    randuri: [...abonamente]
      .sort((a, b) => a.dataVanzare.localeCompare(b.dataVanzare))
      .map(a => [
        a.cursantNume,
        a.tip,
        a.categorie === 'copii' ? 'copii' : 'adulți',
        a.anulat ? 0 : a.pret,
        a.dataVanzare,
        a.dataStart ?? '—',
        ultimaZi(a) ?? '—',
        a.sedinteTotal === null ? `${a.sedinteFolosite} (nelimitat)` : `${a.sedinteFolosite} / ${a.sedinteTotal}`,
        stareAbonament(a),
        a.createdBy?.nume ?? '',
      ]),
  };

  const tCursanti: Tabel = {
    nume: 'Cursanți',
    coloane: ['Nume', 'Telefon', 'Email', 'Grupe', 'Status azi', 'Prezențe', 'Prezență la grupele lui', 'Fără abonament', 'Abonamente', 'Total plătit (lei)'],
    latimi: [24, 14, 24, 34, 24, 10, 16, 12, 11, 14],
    randuri: cursanti.map(c => {
      const ab = abonamente.filter(a => a.cursantId === c.id && !a.anulat);
      const pr = prezente.filter(p => p.cursantId === c.id);
      const st = statusCursant(abonamenteToate.filter(a => a.cursantId === c.id));
      return [
        c.nume,
        c.telefon ?? '',
        c.email ?? '',
        c.grupe.map(g => grupa(g)?.titlu ?? '').filter(Boolean).join(', '),
        `${st.eticheta}${st.abonament ? ` (${st.detaliu})` : ''}`,
        pr.length,
        (() => {
          const s = statisticaPrezenta(prezente, c.id, c.grupe, deLa ?? '0000-00-00', panaLa ?? '9999-12-31');
          return s.tinute ? `${s.venit} din ${s.tinute} (${s.procent}%)` : '—';
        })(),
        pr.filter(p => !p.abonamentId).length,
        ab.length,
        ab.reduce((s, a) => s + (a.pret || 0), 0),
      ];
    }),
  };

  const totalIncasat = abonamente.filter(a => !a.anulat).reduce((s, a) => s + (a.pret || 0), 0);
  const tRezumat: Tabel = {
    nume: 'Rezumat',
    coloane: ['Indicator', 'Valoare'],
    latimi: [40, 20],
    randuri: [
      ['Perioadă', perioada],
      ['Cursanți', cursanti.length],
      ['Prezențe', prezente.length],
      ['Ședințe fără abonament', prezente.filter(p => !p.abonamentId).length],
      ['Recuperări', prezente.filter(p => p.recuperare).length],
      ['Abonamente', abonamente.filter(a => !a.anulat).length],
      ['Total abonamente (lei)', totalIncasat],
      ...grupeRaport
        .filter(g => prezente.some(p => p.grupaId === g.id))
        .map(g => [`Prezențe · ${g.titlu} (${g.zile.join(', ')} ${g.ora})`, prezente.filter(p => p.grupaId === g.id).length] as [string, number]),
    ],
  };

  const tabele = f.tip === 'cursant' ? [tAbonamente, tPrezente] : [tRezumat, tCursanti, tAbonamente, tPrezente];
  const nume = f.tip === 'cursant' ? cursanti[0]?.nume ?? 'cursant' : f.grupaId ? grupa(f.grupaId)?.titlu ?? 'grupa' : f.luna ?? 'complet';
  return {
    titlu,
    subtitlu: `În Pași de Dans · ${perioada} · generat pe ${dataScurta(azi())} la ${oraDin(Date.now())}`,
    tabele,
    numeFisier: `evidenta-${slug(nume)}-${azi()}`,
  };
}

function descarca(blob: Blob, nume: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nume;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function exportExcel(r: Raport) {
  const { default: ExcelJS } = await import('exceljs');
  const wb = new ExcelJS.Workbook();
  wb.creator = 'În Pași de Dans';
  wb.created = new Date();
  for (const t of r.tabele) {
    const ws = wb.addWorksheet(t.nume, { views: [{ state: 'frozen', ySplit: 3 }] });
    ws.addRow([r.titlu]).font = { bold: true, size: 14 };
    ws.addRow([r.subtitlu]).font = { color: { argb: 'FF64748B' }, size: 10 };
    const cap = ws.addRow(t.coloane);
    cap.eachCell(c => {
      c.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDC2626' } };
    });
    t.randuri.forEach(rand => {
      const row = ws.addRow(rand);
      if (rand.includes('FĂRĂ ABONAMENT')) row.font = { color: { argb: 'FFB91C1C' } };
    });
    t.coloane.forEach((_, i) => (ws.getColumn(i + 1).width = t.latimi?.[i] ?? 16));
    ws.autoFilter = { from: { row: 3, column: 1 }, to: { row: 3, column: t.coloane.length } };
  }
  const buf = await wb.xlsx.writeBuffer();
  descarca(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), `${r.numeFisier}.xlsx`);
}

async function fontBase64(url: string) {
  const buf = await (await fetch(url)).arrayBuffer();
  let bin = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

export async function exportPdf(r: Raport) {
  const [{ jsPDF }, { autoTable }, regular, bold] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
    fontBase64('/fonts/Roboto-Regular.ttf'),
    fontBase64('/fonts/Roboto-Bold.ttf'),
  ]);
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  // fontul implicit nu are ș/ț; Roboto are diacriticele românești
  pdf.addFileToVFS('Roboto-Regular.ttf', regular);
  pdf.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  pdf.addFileToVFS('Roboto-Bold.ttf', bold);
  pdf.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
  pdf.setFont('Roboto', 'bold');
  pdf.setFontSize(15);
  pdf.text(r.titlu, 14, 15);
  pdf.setFont('Roboto', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(100);
  pdf.text(r.subtitlu, 14, 21);
  pdf.setTextColor(0);

  let y = 27;
  for (const t of r.tabele) {
    if (!t.randuri.length) continue;
    pdf.setFont('Roboto', 'bold');
    pdf.setFontSize(11);
    if (y > 180) {
      pdf.addPage();
      y = 15;
    }
    pdf.text(t.nume, 14, y + 4);
    autoTable(pdf, {
      startY: y + 7,
      head: [t.coloane],
      body: t.randuri.map(r => r.map(String)),
      styles: { font: 'Roboto', fontSize: 8, cellPadding: 1.5 },
      headStyles: { font: 'Roboto', fontStyle: 'bold', fillColor: [220, 38, 38] },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      didParseCell: d => {
        if (d.section === 'body' && d.cell.raw === 'FĂRĂ ABONAMENT') d.cell.styles.textColor = [185, 28, 28];
      },
      margin: { left: 14, right: 14 },
    });
    y = ((pdf as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y) + 10;
  }
  const pagini = pdf.getNumberOfPages();
  for (let i = 1; i <= pagini; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(150);
    pdf.text(`Pagina ${i} din ${pagini}`, pdf.internal.pageSize.getWidth() - 14, pdf.internal.pageSize.getHeight() - 8, { align: 'right' });
  }
  pdf.save(`${r.numeFisier}.pdf`);
}

export function exportCsv(r: Raport) {
  const esc = (v: string | number) => {
    const s = String(v);
    return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  // un singur fișier: tabelele una sub alta; „;" și BOM ca să-l deschidă corect Excel în română
  const linii: string[] = [esc(r.titlu), esc(r.subtitlu), ''];
  for (const t of r.tabele) {
    linii.push(esc(t.nume), t.coloane.map(esc).join(';'), ...t.randuri.map(rand => rand.map(esc).join(';')), '');
  }
  descarca(new Blob(['﻿' + linii.join('\r\n')], { type: 'text/csv;charset=utf-8' }), `${r.numeFisier}.csv`);
}

/** Copie completă a evidenței (JSON), pentru arhivă sau restaurare manuală. */
export async function backupComplet() {
  const [cursanti, abonamente, prezente, jurnal, conturi, grupe] = await Promise.all([
    incarcaCursanti(),
    incarcaAbonamente(),
    incarcaPrezente({}),
    incarcaJurnal(10000),
    incarcaConturi(),
    incarcaGrupe(),
  ]);
  const date = {
    generat: new Date().toISOString(),
    zi: azi(),
    cursanti,
    abonamente,
    prezente,
    jurnal,
    conturiInstructori: conturi,
    grupe,
  };
  descarca(new Blob([JSON.stringify(date, null, 2)], { type: 'application/json' }), `backup-evidenta-${azi()}.json`);
  return { cursanti: cursanti.length, abonamente: abonamente.length, prezente: prezente.length, jurnal: jurnal.length };
}

