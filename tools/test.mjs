// Tests für Auswertung, Statistik und Sicherung.
//
//   node --test tools/test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';

// Einfacher Ersatz für localStorage
const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
};

const { grade, parseNumber, isAnswered, note } = await import('../js/grade.js');
const { analyse, progress } = await import('../js/stats.js');
const store = await import('../js/store.js');
const { fragen } = await import('../js/content.js');

test('Zahlen in deutscher Schreibweise', () => {
  assert.equal(parseNumber('2,5'), 2.5);
  assert.equal(parseNumber('2.5'), 2.5);
  assert.equal(parseNumber('1.234,56 €'), 1234.56);
  assert.equal(parseNumber('48.000'), 48000);
  assert.equal(parseNumber(' 15 % '), 15);
  assert.equal(parseNumber('−3,2'), -3.2);
  assert.equal(parseNumber('abc'), null);
  assert.equal(parseNumber(''), null);
});

test('Multiple Choice: nur ganz oder gar nicht', () => {
  const q = { typ: 'mc', optionen: ['a', 'b', 'c', 'd'], richtig: [1, 3] };
  assert.equal(grade(q, [3, 1]), 1);
  assert.equal(grade(q, [1]), 0);
  assert.equal(grade(q, [1, 2, 3]), 0);
  assert.equal(grade(q, undefined), 0);
  assert.equal(isAnswered(q, []), false);
});

test('Zuordnung und Reihenfolge', () => {
  const z = { typ: 'zuordnung', optionen: ['x', 'y'], aussagen: [{ text: 'a', richtig: 1 }, { text: 'b', richtig: 0 }] };
  assert.equal(grade(z, [1, 0]), 1);
  assert.equal(grade(z, [1, 1]), 0);
  assert.equal(isAnswered(z, [1, null]), false);
  const r = { typ: 'reihenfolge', schritte: [{ text: 'a', pos: 2 }, { text: 'b', pos: 1 }] };
  assert.equal(grade(r, [2, 1]), 1);
  assert.equal(grade(r, [1, 2]), 0);
});

test('Rechenaufgabe mit Toleranz', () => {
  const q = { typ: 'zahl', ergebnis: 184.8, toleranz: 0.01 };
  assert.equal(grade(q, '184,80'), 1);
  assert.equal(grade(q, '184,81'), 1);
  assert.equal(grade(q, '184,9'), 0);
  assert.equal(grade({ typ: 'offen' }, 'x'), null);
});

test('IHK-Notenschlüssel', () => {
  assert.equal(note(92).n, 1);
  assert.equal(note(91.9).n, 2);
  assert.equal(note(67).n, 3);
  assert.equal(note(50).n, 4);
  assert.equal(note(49.9).n, 5);
  assert.equal(note(29).n, 6);
});

test('Analyse: Anteile ergeben 100 %', () => {
  const k = { id: 'k1' };
  const list = [
    { klausur: k, typ: 'mc', themen: ['a'], punkte: 2 },
    { klausur: k, typ: 'offen', themen: ['a', 'b'], punkte: 4 },
    { klausur: { id: 'k2' }, typ: 'mc', themen: ['b'], punkte: 2 },
  ];
  const a = analyse(list);
  assert.equal(a.punkte, 8);
  assert.equal(a.klausuren, 2);
  const sum = a.themen.reduce((s, t) => s + t.anteilPunkte, 0);
  assert.ok(Math.abs(sum - 1) < 1e-9);
  const b = a.themen.find((t) => t.id === 'b');
  assert.equal(b.fragen, 2);
  assert.equal(b.punkte, 4);
  assert.equal(b.klausuren, 2);
  assert.equal(a.typen[0].id, 'mc');
});

test('Eigener Stand', () => {
  const list = [{ id: 'x', punkte: 2 }, { id: 'y', punkte: 2 }, { id: 'z' }];
  const last = (id) => ({ x: [0, 1, 'thema'], y: [0, 0.5, 'thema'] }[id] || null);
  const p = progress(list, last);
  assert.equal(p.richtig, 1);
  assert.equal(p.teilweise, 1);
  assert.equal(p.neu, 1);
  assert.equal(p.quote, 0.75);
});

test('Lernstand: falsche Fragen, Sicherung und Zusammenführen', () => {
  store.load();
  store.resetAll();
  store.record('q1', 0, 'thema', 1000);
  store.record('q2', 1, 'thema', 1000);
  assert.deepEqual(store.wrongIds(), ['q1']);
  store.record('q1', 1, 'wdh', 2000);
  assert.deepEqual(store.wrongIds(), []);
  store.addRun({ id: 'r1', start: 1000, end: 2000, qids: ['q1'], scores: {}, answers: {}, punkte: 1, max: 1 });
  assert.equal(store.needsBackup(), true);

  const backup = store.exportData();
  store.markExported();
  assert.equal(store.needsBackup(), false);

  // Auf einem anderen Gerät ist etwas anderes passiert
  store.resetAll();
  store.record('q3', 0, 'thema', 3000);
  store.record('q1', 0, 'thema', 500);
  const res = store.importData(backup);
  assert.equal(res.fragen, 2);
  assert.deepEqual(store.attempts('q1').map((e) => e[0]), [500, 1000, 2000]);
  assert.equal(store.last('q3')[1], 0);
  assert.equal(store.runs().length, 1);

  // Zweimal einlesen erzeugt keine Doppelten
  store.importData(backup);
  assert.equal(store.attempts('q1').length, 3);
  assert.equal(store.runs().length, 1);

  // Ersetzen
  store.importData(backup, true);
  assert.equal(store.last('q3'), null);

  assert.throws(() => store.importData('{"foo":1}'), /keine Sicherung/);
  assert.throws(() => store.importData('kein json'), /kein JSON/);
});

test('Beispielklausur: jede Musterlösung ergibt volle Punkte', () => {
  for (const q of fragen) {
    if (q.typ === 'offen') continue;
    let a;
    if (q.typ === 'mc') a = q.richtig;
    if (q.typ === 'zuordnung') a = q.aussagen.map((s) => s.richtig);
    if (q.typ === 'reihenfolge') a = q.schritte.map((s) => s.pos);
    if (q.typ === 'zahl') a = String(q.ergebnis).replace('.', ',');
    assert.equal(grade(q, a), 1, q.id);
  }
});
