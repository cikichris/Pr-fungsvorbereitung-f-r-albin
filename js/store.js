// =====================================================================
//  Lernstand
//
//  Alles liegt nur in diesem Browser (localStorage). Über „Daten“ lässt
//  sich der Stand als Datei sichern und wieder einlesen, auch auf einem
//  anderen Gerät.
//
//  log:    frage_id -> [[zeit_ms, anteil 0..1, modus], ...] (letzte Versuche)
//  runs:   abgeschlossene Klausuren und Übungsrunden
//  active: laufende Sitzung, damit nichts verloren geht, wenn das Handy
//          die Seite neu lädt
// =====================================================================

const KEY = 'pruefung-ecom.v1';
export const APP_ID = 'pruefung-ecom';
const MAX_LOG = 20;
const MAX_RUNS = 100;

function blank() {
  return {
    v: 1,
    log: {},
    runs: [],
    active: null,
    settings: { examDate: '' },
    backup: { last: 0 },
    changed: 0,
  };
}

let state = blank();
let memoryOnly = false;

export function load() {
  try {
    const raw = globalThis.localStorage.getItem(KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      state = { ...blank(), ...saved, settings: { ...blank().settings, ...saved.settings } };
    }
  } catch {
    memoryOnly = true;
  }
  return state;
}

function save(changed = true) {
  if (changed) state.changed = Date.now();
  try {
    globalThis.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    memoryOnly = true;
  }
}

export const isMemoryOnly = () => memoryOnly;
export const settings = () => state.settings;

export function setSettings(patch) {
  state.settings = { ...state.settings, ...patch };
  save();
}

// ---------------------------------------------------------------------
//  Versuche
// ---------------------------------------------------------------------

export function record(qid, score, mode, t = Date.now()) {
  const list = (state.log[qid] ||= []);
  list.push([t, Math.round(score * 1000) / 1000, mode]);
  if (list.length > MAX_LOG) list.splice(0, list.length - MAX_LOG);
  save();
}

export const attempts = (qid) => state.log[qid] || [];

export function last(qid) {
  const list = state.log[qid];
  return list?.length ? list[list.length - 1] : null;
}

/** Fragen, deren letzter Versuch nicht voll richtig war. */
export const wrongIds = () => Object.keys(state.log).filter((id) => last(id)[1] < 1);

export const attemptCount = () => Object.values(state.log).reduce((s, l) => s + l.length, 0);

// ---------------------------------------------------------------------
//  Ergebnisse und laufende Sitzung
// ---------------------------------------------------------------------

export function addRun(run) {
  state.runs = [run, ...state.runs.filter((r) => r.id !== run.id)].slice(0, MAX_RUNS);
  save();
}

export const runs = () => state.runs;
export const runById = (id) => state.runs.find((r) => r.id === id);

export const active = () => state.active;

export function setActive(session) {
  state.active = session;
  save(false);
}

/** Änderungen an der laufenden Sitzung speichern. */
export const saveActive = () => save(false);

// ---------------------------------------------------------------------
//  Sicherung
// ---------------------------------------------------------------------

export const lastBackup = () => state.backup.last;
export const needsBackup = () => state.changed > state.backup.last;

export function exportData(now = new Date()) {
  return JSON.stringify({
    app: APP_ID,
    v: 1,
    exportiert: now.toISOString(),
    log: state.log,
    runs: state.runs,
    settings: state.settings,
  });
}

export function markExported() {
  state.backup.last = Date.now();
  save(false);
}

/**
 * Liest eine Sicherung ein. Standard: zusammenführen (nichts geht
 * verloren). Mit replace = true ersetzt die Datei den Stand komplett.
 */
export function importData(text, replace = false) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Die Datei ist keine gültige Sicherung (kein JSON).');
  }
  if (data?.app !== APP_ID || typeof data.log !== 'object' || !Array.isArray(data.runs)) {
    throw new Error('Die Datei ist keine Sicherung dieser App.');
  }
  const log = {};
  for (const [id, list] of Object.entries(data.log)) {
    if (Array.isArray(list)) log[id] = list.filter((e) => Array.isArray(e) && typeof e[0] === 'number' && typeof e[1] === 'number');
  }

  if (replace) {
    state = {
      ...blank(),
      log,
      runs: data.runs.slice(0, MAX_RUNS),
      settings: { ...blank().settings, ...data.settings },
      active: state.active,
    };
  } else {
    for (const [id, list] of Object.entries(log)) {
      const merged = new Map((state.log[id] || []).map((e) => [`${e[0]}|${e[2]}`, e]));
      for (const e of list) merged.set(`${e[0]}|${e[2]}`, e);
      state.log[id] = [...merged.values()].sort((a, b) => a[0] - b[0]).slice(-MAX_LOG);
    }
    const byId = new Map(state.runs.map((r) => [r.id, r]));
    for (const r of data.runs) if (r?.id && !byId.has(r.id)) byId.set(r.id, r);
    state.runs = [...byId.values()].sort((a, b) => b.start - a.start).slice(0, MAX_RUNS);
    if (!state.settings.examDate && data.settings?.examDate) state.settings.examDate = data.settings.examDate;
  }
  // Der eingelesene Stand ist gesichert, solange danach nichts Neues dazukommt
  state.backup.last = Date.now();
  state.changed = state.backup.last;
  save(false);
  return { fragen: Object.keys(log).length, runs: data.runs.length };
}

export function resetAll() {
  state = blank();
  save(false);
}
