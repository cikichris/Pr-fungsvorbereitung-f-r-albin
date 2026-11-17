// Bereitet die Klausuren aus content/ für die App auf.
import { KLAUSUREN } from '../content/index.js';
import { BEREICHE, THEMEN, TYPEN, ARTEN, ARTEN_INFO } from '../content/themen.js';

export { BEREICHE, THEMEN, TYPEN, ARTEN, ARTEN_INFO };

/** Klausuren je Fach, die neueste zuerst. */
export const klausuren = [...KLAUSUREN].sort((a, b) => (b.sortierung ?? 0) - (a.sortierung ?? 0));
export const fragen = [];
export const frageById = new Map();
export const klausurById = new Map();
export const themaById = new Map(THEMEN.map((t) => [t.id, t]));
export const bereichById = new Map(BEREICHE.map((b) => [b.id, b]));

for (const k of KLAUSUREN) {
  klausurById.set(k.id, k);
  k.fragen = [];
  for (const a of k.aufgaben) {
    a.fragen.forEach((f, i) => {
      f.klausur = k;
      f.aufgabe = a;
      f.ersteImBlock = i === 0;
      f.themen = [].concat(f.thema || []);
      k.fragen.push(f);
      fragen.push(f);
      if (frageById.has(f.id)) console.warn('Doppelte Fragen-ID:', f.id);
      frageById.set(f.id, f);
    });
  }
}

export const themaName = (id) => themaById.get(id)?.name || id;

/** "Geschäftsprozesse Sommer 2020" – für Listen, in denen Fächer gemischt sind. */
export const klausurLabel = (k) => `${bereichById.get(k.bereich)?.kurz || ''} ${k.titel}`.trim();

export const klausurenIn = (bereich) => (bereich ? klausuren.filter((k) => k.bereich === bereich) : klausuren);

/** Fragen eines Prüfungsbereichs ('' = alle). */
export const fragenIn = (bereich) => (bereich ? fragen.filter((f) => f.klausur.bereich === bereich) : fragen);

/** Prüfungsbereiche, zu denen es schon Klausuren gibt. */
export const bereicheMitInhalt = () => BEREICHE.filter((b) => klausuren.some((k) => k.bereich === b.id));
