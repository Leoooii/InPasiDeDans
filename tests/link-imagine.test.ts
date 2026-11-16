import { test } from 'node:test';
import assert from 'node:assert/strict';
import { linkImagine } from '../lib/link-imagine';

const url = (t: string) => {
  const r = linkImagine(t);
  return 'url' in r ? r.url : null;
};

test('imgur: link direct rămâne neschimbat', () => {
  assert.equal(url('https://i.imgur.com/U9zoefH.jpeg'), 'https://i.imgur.com/U9zoefH.jpeg');
  assert.equal(url('  https://i.imgur.com/abc12XY.PNG '), 'https://i.imgur.com/abc12XY.png');
});

test('imgur: pagina pozei devine link direct', () => {
  assert.equal(url('https://imgur.com/U9zoefH'), 'https://i.imgur.com/U9zoefH.jpeg');
  assert.equal(url('http://www.imgur.com/U9zoefH'), 'https://i.imgur.com/U9zoefH.jpeg');
  assert.equal(url('https://m.imgur.com/U9zoefH'), 'https://i.imgur.com/U9zoefH.jpeg');
});

test('imgur: albumele sunt refuzate cu explicație', () => {
  assert.equal(url('https://imgur.com/a/Xyz12ab'), null);
  assert.equal(url('https://imgur.com/gallery/Xyz12ab'), null);
});

test('alte linkuri https trec; text fără link e refuzat', () => {
  assert.equal(url('https://firebasestorage.googleapis.com/v0/b/x/o/p.jpg?alt=media'), 'https://firebasestorage.googleapis.com/v0/b/x/o/p.jpg?alt=media');
  assert.equal(url('poza.jpg'), null);
  assert.equal(url(''), null);
  assert.equal(url('javascript:alert(1)'), null);
});
