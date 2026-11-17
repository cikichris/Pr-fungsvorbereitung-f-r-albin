// Prüft alle Klausurdateien: Pflichtfelder, eindeutige IDs, gültige
// Themen und Fragetypen, Lösungen im erlaubten Bereich.
//
//   node tools/check-content.mjs
import { KLAUSUREN } from '../content/index.js';
import { BEREICHE, THEMEN, TYPEN } from '../content/themen.js';

const errors = [];
const warnings = [];
const klausurIds = new Set();
const frageIds = new Set();
const themen = new Set(THEMEN.map((t) => t.id));
const bereiche = new Set(BEREICHE.map((b) => b.id));
const counts = { klausuren: 0, fragen: 0, punkte: 0 };

const isText = (x) => typeof x === 'string' && x.trim() !== '';

function checkText(where, text) {
  if (text === undefined) return;
  if (!isText(text)) errors.push(`${where}: kein Text`);
  else if (/undefined|\[object Object\]/.test(text)) errors.push(`${where}: enthält "undefined" (\${...} im Text?)`);
}

for (const id of THEMEN.map((t) => t.id)) {
  if (THEMEN.filter((t) => t.id === id).length > 1) errors.push(`themen.js: Thema "${id}" doppelt`);
}

for (const k of KLAUSUREN) {
  const kw = k.id || '(Klausur ohne id)';
  counts.klausuren += 1;
  for (const key of ['id', 'titel', 'bereich', 'aufgaben']) if (k[key] === undefined) errors.push(`${kw}: Feld "${key}" fehlt`);
  if (k.id && !/^[a-z0-9-]+$/.test(k.id)) errors.push(`${kw}: id nur aus a-z, 0-9 und - bilden`);
  if (klausurIds.has(k.id)) errors.push(`${kw}: Klausur-id doppelt`);
  klausurIds.add(k.id);
  if (!bereiche.has(k.bereich)) errors.push(`${kw}: unbekannter bereich "${k.bereich}"`);
  if (k.dauer !== undefined && !(Number.isInteger(k.dauer) && k.dauer > 0)) errors.push(`${kw}: dauer muss eine ganze Zahl (Minuten) sein`);
  checkText(`${kw}.situation`, k.situation);
  for (const [i, a] of (k.anlagen || []).entries()) {
    if (!isText(a.titel)) errors.push(`${kw}.anlagen[${i}]: titel fehlt`);
    checkText(`${kw}.anlagen[${i}].text`, a.text);
  }

  for (const a of k.aufgaben || []) {
    const aw = `${kw}/Aufgabe ${a.nr}`;
    if (!a.nr) errors.push(`${aw}: nr fehlt`);
    checkText(`${aw}.situation`, a.situation);
    if (!Array.isArray(a.fragen) || !a.fragen.length) { errors.push(`${aw}: keine fragen`); continue; }

    for (const f of a.fragen) {
      const w = f.id || `${aw}/(ohne id)`;
      counts.fragen += 1;
      counts.punkte += f.punkte ?? 1;
      if (!f.id) errors.push(`${w}: id fehlt`);
      else if (!f.id.startsWith(`${k.id}-`)) errors.push(`${w}: id muss mit "${k.id}-" beginnen`);
      if (frageIds.has(f.id)) errors.push(`${w}: id doppelt vergeben`);
      frageIds.add(f.id);
      if (!f.nr) errors.push(`${w}: nr fehlt`);
      if (!TYPEN[f.typ]) errors.push(`${w}: unbekannter typ "${f.typ}"`);
      if (!isText(f.frage)) errors.push(`${w}: frage fehlt`);
      checkText(`${w}.frage`, f.frage);
      checkText(`${w}.erklaerung`, f.erklaerung);
      if (f.punkte !== undefined && !(typeof f.punkte === 'number' && f.punkte > 0)) errors.push(`${w}: punkte muss eine positive Zahl sein`);
      const ts = [].concat(f.thema || []);
      if (!ts.length) errors.push(`${w}: thema fehlt`);
      for (const t of ts) if (!themen.has(t)) errors.push(`${w}: unbekanntes thema "${t}" (in content/themen.js ergänzen)`);
      if (!f.erklaerung && f.typ !== 'offen') warnings.push(`${w}: keine erklaerung`);

      if (f.typ === 'mc') {
        if (!Array.isArray(f.optionen) || f.optionen.length < 2) errors.push(`${w}: mindestens zwei optionen nötig`);
        if (!Array.isArray(f.richtig) || !f.richtig.length) errors.push(`${w}: richtig muss eine Liste sein, z. B. [2]`);
        else {
          for (const r of f.richtig) if (!Number.isInteger(r) || r < 0 || r >= (f.optionen?.length || 0)) errors.push(`${w}: richtig enthält ungültigen Index ${r} (Zählung ab 0)`);
          if (new Set(f.richtig).size !== f.richtig.length) errors.push(`${w}: richtig enthält Doppelte`);
        }
        (f.optionen || []).forEach((o, i) => checkText(`${w}.optionen[${i}]`, o));
      }
      if (f.typ === 'zuordnung') {
        if (!Array.isArray(f.optionen) || f.optionen.length < 2) errors.push(`${w}: mindestens zwei optionen nötig`);
        if (!Array.isArray(f.aussagen) || !f.aussagen.length) errors.push(`${w}: aussagen fehlen`);
        for (const [i, s] of (f.aussagen || []).entries()) {
          if (!isText(s.text)) errors.push(`${w}.aussagen[${i}]: text fehlt`);
          if (!Number.isInteger(s.richtig) || s.richtig < 0 || s.richtig >= (f.optionen?.length || 0)) errors.push(`${w}.aussagen[${i}]: richtig muss ein Index in optionen sein (ab 0)`);
        }
      }
      if (f.typ === 'reihenfolge') {
        const n = f.schritte?.length || 0;
        if (n < 2) errors.push(`${w}: mindestens zwei schritte nötig`);
        const pos = (f.schritte || []).map((s) => s.pos).sort((x, y) => x - y);
        if (pos.some((p, i) => p !== i + 1)) errors.push(`${w}: pos der schritte muss genau 1 bis ${n} enthalten`);
        for (const [i, s] of (f.schritte || []).entries()) if (!isText(s.text)) errors.push(`${w}.schritte[${i}]: text fehlt`);
      }
      if (f.typ === 'zahl') {
        if (typeof f.ergebnis !== 'number' || !Number.isFinite(f.ergebnis)) errors.push(`${w}: ergebnis muss eine Zahl sein`);
        if (f.toleranz !== undefined && !(typeof f.toleranz === 'number' && f.toleranz >= 0)) errors.push(`${w}: toleranz muss eine Zahl ≥ 0 sein`);
      }
      if (f.typ === 'offen') {
        if (!isText(f.loesung)) errors.push(`${w}: loesung fehlt`);
        checkText(`${w}.loesung`, f.loesung);
      }
    }
  }
}

for (const w of warnings) console.warn(`Hinweis: ${w}`);
if (errors.length) {
  console.error(`${errors.length} Fehler:\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(`OK: ${counts.klausuren} Klausuren, ${counts.fragen} Fragen, ${counts.punkte} Punkte.`);
