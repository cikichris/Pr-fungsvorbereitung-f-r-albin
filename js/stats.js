// =====================================================================
//  Auswertungen ohne Oberfläche (auch in tools/test.mjs geprüft)
// =====================================================================
import { pts } from './grade.js';

/**
 * Wie oft kommen Themen und Fragetypen in den Klausuren vor?
 * Gehört eine Frage zu mehreren Themen, zählt sie bei jedem Thema als
 * Frage, ihre Punkte werden aber aufgeteilt (die Anteile ergeben 100 %).
 */
export function analyse(list) {
  const totalPunkte = list.reduce((s, f) => s + pts(f), 0);
  const klausurIds = new Set(list.map((f) => f.klausur.id));
  const themen = new Map();
  const typen = new Map();
  const arten = new Map();
  const entry = (map, id) => {
    if (!map.has(id)) map.set(id, { id, fragen: 0, punkte: 0, klausuren: new Set() });
    return map.get(id);
  };
  for (const f of list) {
    const ts = f.themen.length ? f.themen : ['ohne'];
    for (const t of ts) {
      const e = entry(themen, t);
      e.fragen += 1;
      e.punkte += pts(f) / ts.length;
      e.klausuren.add(f.klausur.id);
    }
    for (const [map, key] of [[typen, f.typ], [arten, f.art]]) {
      if (!key) continue;
      const e = entry(map, key);
      e.fragen += 1;
      e.punkte += pts(f);
      e.klausuren.add(f.klausur.id);
    }
  }
  const finish = (map) => [...map.values()]
    .map((e) => ({
      ...e,
      klausuren: e.klausuren.size,
      anteilPunkte: totalPunkte ? e.punkte / totalPunkte : 0,
      anteilFragen: list.length ? e.fragen / list.length : 0,
    }))
    .sort((a, b) => b.punkte - a.punkte || b.fragen - a.fragen);
  return {
    fragen: list.length,
    punkte: totalPunkte,
    klausuren: klausurIds.size,
    themen: finish(themen),
    typen: finish(typen),
    arten: finish(arten),
  };
}

/**
 * Eigener Stand für eine Liste von Fragen.
 * last(id) liefert den letzten Versuch [zeit, anteil, modus] oder null.
 */
export function progress(list, last) {
  const c = { neu: 0, richtig: 0, teilweise: 0, falsch: 0, total: list.length };
  for (const f of list) {
    const l = last(f.id);
    if (!l) c.neu += 1;
    else if (l[1] >= 1) c.richtig += 1;
    else if (l[1] > 0) c.teilweise += 1;
    else c.falsch += 1;
  }
  c.bearbeitet = c.total - c.neu;
  // Quote: erreichter Anteil der Punkte beim jeweils letzten Versuch
  let got = 0;
  let max = 0;
  for (const f of list) {
    const l = last(f.id);
    if (!l) continue;
    got += l[1] * pts(f);
    max += pts(f);
  }
  c.quote = max ? got / max : null;
  return c;
}
