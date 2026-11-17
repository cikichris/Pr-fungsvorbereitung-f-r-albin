// =====================================================================
//  Auswertung einer Antwort
//
//  Ergebnis ist ein Anteil zwischen 0 und 1 der erreichbaren Punkte.
//  Gebundene Aufgaben (mc, zuordnung, reihenfolge, zahl) werden wie in der
//  IHK-Prüfung nur ganz oder gar nicht gewertet. Freie Antworten bewertet
//  man selbst (Punkte), deshalb liefert grade() dort null.
// =====================================================================

export const pts = (q) => q.punkte ?? 1;

/** Ohne Punktangabe bewertet man sich mit gewusst / teilweise / nicht gewusst. */
export const hatPunkte = (q) => q.punkte !== undefined;

/** "1.234,56 €", "2,5", "2.5", "-3" -> Zahl; null, wenn keine Zahl erkennbar ist. */
export function parseNumber(input) {
  if (input === null || input === undefined) return null;
  let s = String(input).trim().replace(/[€%\s]|EUR/gi, '').replace(/[−–]/g, '-');
  if (!s) return null;
  if (s.includes(',')) {
    s = s.replace(/\./g, '').replace(',', '.');
  } else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) {
    s = s.replace(/\./g, ''); // 48.000 als Tausenderpunkt
  }
  if (!/^-?\d*\.?\d+$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function formatNumber(n, digits) {
  const d = digits ?? (Number.isInteger(n) ? 0 : 2);
  return n.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: Math.max(d, 4) });
}

/** Ist überhaupt etwas beantwortet? */
export function isAnswered(q, a) {
  switch (q.typ) {
    case 'mc': return Array.isArray(a) && a.length > 0;
    case 'zuordnung': return Array.isArray(a) && q.aussagen.every((_, i) => Number.isInteger(a[i]));
    case 'reihenfolge': return Array.isArray(a) && q.schritte.every((_, i) => Number.isInteger(a[i]));
    case 'zahl': return parseNumber(a) !== null;
    case 'offen': return typeof a === 'string' && a.trim() !== '';
    default: return false;
  }
}

/** Teilweise beantwortet (für die Übersicht in der Prüfung)? */
export function isTouched(q, a) {
  if (Array.isArray(a)) return a.some((x) => x !== null && x !== undefined);
  return typeof a === 'string' && a.trim() !== '';
}

/** Zeile i einer Zuordnung bzw. Reihenfolge richtig? */
export function rowCorrect(q, a, i) {
  if (!Array.isArray(a)) return false;
  return q.typ === 'zuordnung' ? a[i] === q.aussagen[i].richtig : a[i] === q.schritte[i].pos;
}

export function grade(q, a) {
  switch (q.typ) {
    case 'mc': {
      if (!Array.isArray(a)) return 0;
      const picked = new Set(a);
      return picked.size === q.richtig.length && q.richtig.every((i) => picked.has(i)) ? 1 : 0;
    }
    case 'zuordnung':
      return q.aussagen.every((_, i) => rowCorrect(q, a, i)) ? 1 : 0;
    case 'reihenfolge':
      return q.schritte.every((_, i) => rowCorrect(q, a, i)) ? 1 : 0;
    case 'zahl': {
      const v = parseNumber(a);
      if (v === null) return 0;
      return Math.abs(v - q.ergebnis) <= (q.toleranz ?? 0.01) + 1e-9 ? 1 : 0;
    }
    case 'offen':
      return null;
    default:
      return 0;
  }
}

/** IHK-Notenschlüssel (100-Punkte-Skala). */
export function note(pct) {
  if (pct >= 92) return { n: 1, text: 'sehr gut' };
  if (pct >= 81) return { n: 2, text: 'gut' };
  if (pct >= 67) return { n: 3, text: 'befriedigend' };
  if (pct >= 50) return { n: 4, text: 'ausreichend' };
  if (pct >= 30) return { n: 5, text: 'mangelhaft' };
  return { n: 6, text: 'ungenügend' };
}
