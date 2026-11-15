// Regulile abonamentelor (lib/evidenta/abonament.ts): partea cu bani a evidenței.
// Rulează cu: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  acoperaZiua,
  alegeAbonament,
  avertizari,
  laSedintaNoua,
  perioada,
  ramase,
  sedinteDinTitlu,
  statusCursant,
  ultimaZi,
} from '../lib/evidenta/abonament';
import type { Abonament } from '../lib/evidenta/tipuri';

const actor = { uid: 'a', nume: 'Admin', rol: 'admin' as const };

function ab(p: Partial<Abonament> = {}): Abonament {
  return {
    id: 'x',
    cursantId: 'c1',
    cursantNume: 'Ana Pop',
    tarifId: 't8',
    tip: 'Abonament 8',
    categorie: 'adulti',
    pret: 260,
    sedinteTotal: 8,
    sedinteFolosite: 0,
    dataVanzare: '2026-11-02',
    dataStart: '2026-11-02',
    dataExpirare: '2026-11-30',
    anulat: false,
    createdAt: 1,
    createdBy: actor,
    ...p,
  };
}

test('numărul de ședințe se citește din titlul tarifului', () => {
  assert.equal(sedinteDinTitlu('Abonament 8'), 8);
  assert.equal(sedinteDinTitlu('Abonament 16'), 16);
  assert.equal(sedinteDinTitlu('Abonament Full Pass'), null);
  assert.equal(sedinteDinTitlu('Plata la ședință'), 1);
});

test('abonamentul ține 4 săptămâni; Full Pass nu are perioadă până la prima ședință', () => {
  assert.deepEqual(perioada({ sedinteTotal: 8 }, '2026-11-02'), { dataStart: '2026-11-02', dataExpirare: '2026-11-30' });
  assert.deepEqual(perioada({ sedinteTotal: null }, '2026-11-02'), { dataStart: null, dataExpirare: null });
  assert.equal(ultimaZi(ab()), '2026-11-29');
});

test('acoperă zilele din perioadă, nu și ziua expirării', () => {
  const a = ab();
  assert.equal(acoperaZiua(a, '2026-11-01'), false);
  assert.equal(acoperaZiua(a, '2026-11-02'), true);
  assert.equal(acoperaZiua(a, '2026-11-29'), true);
  assert.equal(acoperaZiua(a, '2026-11-30'), false);
});

test('nu acoperă abonamente anulate sau epuizate', () => {
  assert.equal(acoperaZiua(ab({ anulat: true }), '2026-11-10'), false);
  assert.equal(acoperaZiua(ab({ sedinteFolosite: 8 }), '2026-11-10'), false);
  assert.equal(ramase(ab({ sedinteFolosite: 3 })), 5);
  assert.equal(ramase(ab({ sedinteTotal: null })), Infinity);
});

test('Full Pass neînceput acoperă orice zi de la vânzare și pornește la prima ședință', () => {
  const fp = ab({ tip: 'Full Pass', sedinteTotal: null, dataStart: null, dataExpirare: null, dataVanzare: '2026-11-05' });
  assert.equal(acoperaZiua(fp, '2026-11-04'), false);
  assert.equal(acoperaZiua(fp, '2026-12-20'), true);
  assert.deepEqual(laSedintaNoua(fp, '2026-11-10'), { sedinteFolosite: 1, dataStart: '2026-11-10', dataExpirare: '2026-12-08' });
});

test('o ședință nouă pe abonament normal crește doar contorul', () => {
  assert.deepEqual(laSedintaNoua(ab({ sedinteFolosite: 2 }), '2026-11-10'), { sedinteFolosite: 3 });
});

test('se scade din abonamentul care expiră primul; Full Pass neînceput la final', () => {
  const tarziu = ab({ id: 'tarziu', dataStart: '2026-11-08', dataExpirare: '2026-12-06' });
  const devreme = ab({ id: 'devreme' });
  const fp = ab({ id: 'fp', sedinteTotal: null, dataStart: null, dataExpirare: null, dataVanzare: '2026-11-01' });
  assert.equal(alegeAbonament([fp, tarziu, devreme], '2026-11-10')?.id, 'devreme');
  assert.equal(alegeAbonament([fp, tarziu], '2026-11-10')?.id, 'tarziu');
  assert.equal(alegeAbonament([fp], '2026-11-10')?.id, 'fp');
  assert.equal(alegeAbonament([], '2026-11-10'), null);
});

test('statusul cursantului', () => {
  assert.equal(statusCursant([], '2026-11-10').cod, 'fara');
  assert.equal(statusCursant([ab()], '2026-11-10').cod, 'activ');
  // ≤ 2 ședințe rămase sau ≤ 3 zile până la expirare → la limită
  assert.equal(statusCursant([ab({ sedinteFolosite: 6 })], '2026-11-10').cod, 'la_limita');
  assert.equal(statusCursant([ab()], '2026-11-27').cod, 'la_limita');
  assert.equal(statusCursant([ab()], '2026-11-30').cod, 'expirat');
  assert.equal(statusCursant([ab({ sedinteFolosite: 8 })], '2026-11-10').cod, 'epuizat');
  assert.equal(statusCursant([ab({ dataStart: '2026-11-20', dataExpirare: '2026-12-18' })], '2026-11-10').cod, 'neinceput');
  assert.equal(statusCursant([ab({ anulat: true })], '2026-11-10').cod, 'fara');
});

test('avertizări: expirat, expiră curând, epuizat', () => {
  const tipuri = (abs: Abonament[], zi: string) => avertizari(abs, zi).map(a => a.tip).sort();
  assert.deepEqual(tipuri([ab()], '2026-11-10'), []);
  assert.deepEqual(tipuri([ab()], '2026-11-28'), ['abonament_expira']);
  assert.deepEqual(tipuri([ab()], '2026-12-01'), ['abonament_expirat']);
  assert.deepEqual(tipuri([ab({ sedinteFolosite: 8 })], '2026-11-10'), ['abonament_epuizat']);
  assert.deepEqual(tipuri([ab({ anulat: true })], '2026-12-01'), []);
});
