// =====================================================================
//  Prüfungsvorbereitung E-Commerce: Oberfläche
//
//  Ansichten (Teil hinter # in der Adresse):
//    #/                      Start
//    #/klausuren             alle Altklausuren
//    #/klausuren/<id>        Klausur starten (Modus, Zeitlimit)
//    #/themen                Themen mit eigenem Stand
//    #/themen/<id>           Fragen eines Themas
//    #/wiederholen           falsch beantwortete Fragen
//    #/formeln               Formelsammlung (Suche, Abfragemodus)
//    #/analyse               Häufigkeit von Themen und Fragetypen
//    #/daten                 Prüfungstermin, Sicherung, Zurücksetzen
//    #/lernen                laufende Sitzung
//    #/ergebnis/<id>         Ergebnis einer Runde (…/antworten: alle Antworten)
// =====================================================================
import * as store from './store.js';
import {
  klausuren, fragen, frageById, klausurById, themaById, bereichById, BEREICHE,
  TYPEN, ARTEN, ARTEN_INFO, themaName, fragenIn, bereicheMitInhalt, klausurLabel, klausurenIn,
} from './content.js';
import { grade, isAnswered, isTouched, rowCorrect, formatNumber, note, pts, hatPunkte } from './grade.js';
import { analyse, progress } from './stats.js';
import { fmt, esc, firstLine } from './render.js';
import { FORMELN } from '../content/formeln.js';

const view = document.getElementById('view');
let timer = null;
let bereichFilter = '';

// ---------------------------------------------------------------------
//  Hilfen
// ---------------------------------------------------------------------

const plural = (n, one, many) => `${formatNumber(n)} ${n === 1 ? one : many}`;
const pctText = (x) => `${Math.round(x * 100)} %`;
const pointsText = (n) => formatNumber(Math.round(n * 10) / 10, Number.isInteger(Math.round(n * 10) / 10) ? 0 : 1);

function uid() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function daysBetween(a, b) {
  const [y1, m1, d1] = a.split('-').map(Number);
  const [y2, m2, d2] = b.split('-').map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
}

function dateText(ms) {
  return new Date(ms).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function dateTimeText(ms) {
  return new Date(ms).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function clock(ms) {
  const total = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(h ? 2 : 1, '0');
  return `${h ? `${h}:` : ''}${mm}:${String(s).padStart(2, '0')}`;
}

function minutesText(ms) {
  const min = Math.round(ms / 60000);
  return min < 1 ? 'unter 1 Minute' : plural(min, 'Minute', 'Minuten');
}

function show(html) {
  view.innerHTML = html;
}

function go(hash) {
  if (location.hash === hash) route();
  else location.hash = hash;
}

const NUM_WORT = ['keine', 'eine', 'zwei', 'drei', 'vier', 'fünf', 'sechs'];

function progressBar(c) {
  const total = c.total || 1;
  const w = (n) => `${(n / total) * 100}%`;
  return `<span class="bar" role="img" aria-label="${c.richtig} richtig, ${c.teilweise} teilweise, ${c.falsch} falsch, ${c.neu} neu">`
    + `<span class="bar-ok" style="width:${w(c.richtig)}"></span>`
    + `<span class="bar-part" style="width:${w(c.teilweise)}"></span>`
    + `<span class="bar-bad" style="width:${w(c.falsch)}"></span></span>`;
}

const legend = `<div class="legend">
  <span><i class="dot dot-ok"></i>richtig</span>
  <span><i class="dot dot-part"></i>teilweise</span>
  <span><i class="dot dot-bad"></i>falsch</span>
  <span><i class="dot dot-new"></i>noch nicht bearbeitet</span>
</div>`;

function statusDot(qid) {
  const l = store.last(qid);
  if (!l) return '<i class="dot dot-new" title="noch nicht bearbeitet"></i>';
  if (l[1] >= 1) return '<i class="dot dot-ok" title="zuletzt richtig"></i>';
  if (l[1] > 0) return '<i class="dot dot-part" title="zuletzt teilweise richtig"></i>';
  return '<i class="dot dot-bad" title="zuletzt falsch"></i>';
}

function bereichChips() {
  const list = bereicheMitInhalt();
  if (list.length < 2) return '';
  const chip = (id, name) => `<button class="chip${bereichFilter === id ? ' is-current' : ''}" data-action="bereich" data-id="${id}"">${esc(name)}</button>`;
  return `<div class="chip-row">${chip('', 'Alle')}${list.map((b) => chip(b.id, b.kurz)).join('')}</div>`;
}


// ---------------------------------------------------------------------
//  Eine Frage darstellen
//
//  o.interactive  Antworten möglich
//  o.reveal       Lösung zeigen (mit o.score: eigenes Ergebnis 0..1)
//  o.context      Ausgangssituation anzeigen ('open' | 'closed' | false)
//  o.source       Klausur und Nummer in der Kopfzeile nennen
// ---------------------------------------------------------------------

function contextHtml(q, mode) {
  if (!mode) return '';
  const k = q.klausur;
  const a = q.aufgabe;
  let html = '';
  if (k.situation) {
    html += `<details class="context"><summary>Ausgangssituation der Prüfung</summary><div class="context-body">${fmt(k.situation)}</div></details>`;
  }
  if (a.situation) {
    html += `<details class="context"${mode === 'open' ? ' open' : ''}><summary>Aufgabe ${esc(a.nr)}${a.titel ? `: ${esc(a.titel)}` : ''}</summary><div class="context-body">${fmt(a.situation)}</div></details>`;
  } else if (a.titel) {
    html += `<p class="context-title">Aufgabe ${esc(a.nr)}: ${esc(a.titel)}</p>`;
  }
  for (const anl of k.anlagen || []) {
    html += `<details class="context"><summary>${esc(anl.titel)}</summary><div class="context-body">${fmt(anl.text)}</div></details>`;
  }
  return html;
}

function questionHead(q, o) {
  const themen = q.themen.map((t) => `<a class="q-thema" href="#/themen/${t}">${esc(themaName(t))}</a>`).join('');
  return `<header class="q-head">
    <span class="q-nr">${o.source ? `${esc(klausurLabel(q.klausur))} · ` : ''}Aufgabe ${esc(q.nr)}</span>
    ${q.art ? `<span class="badge badge-${q.art}">${ARTEN[q.art]}</span>` : `<span class="badge badge-${q.typ}">${TYPEN[q.typ]}</span>`}
    ${hatPunkte(q) ? `<span class="q-pts">${plural(pts(q), 'Punkt', 'Punkte')}</span>` : ''}
    <span class="q-themen">${themen}</span>
  </header>`;
}

function mcHtml(q, ans, o) {
  const picked = new Set(Array.isArray(ans) ? ans : []);
  const n = q.richtig.length;
  const wort = String(NUM_WORT[n] || n);
  const hint = n === 1 ? 'Eine Antwort ist richtig.' : `${wort[0].toUpperCase()}${wort.slice(1)} Antworten sind richtig.`;
  let html = `<p class="q-hint">${hint}</p><div class="options">`;
  q.optionen.forEach((text, i) => {
    let cls = 'option';
    if (picked.has(i)) cls += ' is-picked';
    if (o.reveal && q.richtig.includes(i)) cls += ' is-right';
    else if (o.reveal && picked.has(i)) cls += ' is-wrong';
    html += `<button class="${cls}" data-action="mc" data-i="${i}" ${o.interactive ? '' : 'disabled'} aria-pressed="${picked.has(i)}">
      <span class="option-key">${i + 1}</span><span class="option-text">${fmt(text)}</span></button>`;
  });
  return `${html}</div>`;
}

function rowsHtml(q, ans, o) {
  const isOrder = q.typ === 'reihenfolge';
  const rows = isOrder ? q.schritte : q.aussagen;
  const values = isOrder ? rows.map((_, i) => i + 1) : q.optionen.map((_, i) => i);
  const a = Array.isArray(ans) ? ans : [];
  let html = '';
  if (!isOrder) {
    html += `<ol class="match-legend">${q.optionen.map((t) => `<li>${fmt(t)}</li>`).join('')}</ol>`;
  } else {
    html += '<p class="q-hint">Ordne jedem Schritt seine Nummer zu: 1 = zuerst.</p>';
  }
  html += '<div class="match-rows">';
  rows.forEach((row, i) => {
    const right = isOrder ? row.pos : row.richtig;
    const ok = o.reveal ? rowCorrect(q, a, i) : null;
    const buttons = values.map((v) => {
      let cls = 'num';
      if (a[i] === v) cls += ' is-picked';
      if (o.reveal && v === right) cls += ' is-right';
      else if (o.reveal && a[i] === v) cls += ' is-wrong';
      return `<button class="${cls}" data-action="row" data-row="${i}" data-v="${v}" ${o.interactive ? '' : 'disabled'} aria-pressed="${a[i] === v}">${isOrder ? v : v + 1}</button>`;
    }).join('');
    html += `<div class="match-row${ok === true ? ' row-ok' : ok === false ? ' row-bad' : ''}">
      <div class="match-text">${fmt(row.text)}</div>
      <div class="nums" role="group" aria-label="Nummer für Zeile ${i + 1}">${buttons}</div>
    </div>`;
  });
  return `${html}</div>`;
}

function zahlHtml(q, ans, o) {
  const val = typeof ans === 'string' ? ans : '';
  let html = `<label class="num-input"><span class="sr-only">Ergebnis</span>
    <input type="text" inputmode="decimal" autocomplete="off" data-input="zahl" value="${esc(val)}" placeholder="Ergebnis" ${o.interactive ? '' : 'disabled'}>
    ${q.einheit ? `<span class="unit">${esc(q.einheit)}</span>` : ''}</label>`;
  if (o.reveal) {
    const digits = q.nachkomma ?? (Number.isInteger(q.ergebnis) ? 0 : 2);
    html += `<div class="result"><span class="label">Lösung</span>${formatNumber(q.ergebnis, digits)}${q.einheit ? ` ${esc(q.einheit)}` : ''}</div>`;
  }
  return html;
}

function offenHtml(q, ans, o) {
  const val = typeof ans === 'string' ? ans : '';
  let html = '';
  if (o.interactive) {
    html += `<textarea data-input="offen" rows="4" placeholder="Deine Antwort, optional (Stichpunkte reichen)">${esc(val)}</textarea>`;
  } else if (val.trim()) {
    html += `<div class="own-answer"><span class="label">Deine Antwort</span>${fmt(val)}</div>`;
  }
  if (o.reveal) html += `<div class="loesung"><span class="label">${q.klausur.quelle === 'Musterlösung' ? 'Musterlösung' : 'Lösungsvorschlag'}</span>${fmt(q.loesung)}</div>`;
  return html;
}

function verdictHtml(q, score) {
  if (score === undefined || score === null) return '';
  if (!hatPunkte(q)) {
    if (score >= 1) return '<p class="verdict verdict-ok">Gewusst</p>';
    if (score > 0) return '<p class="verdict verdict-part">Teilweise gewusst</p>';
    return '<p class="verdict verdict-bad">Nicht gewusst</p>';
  }
  const got = pointsText(score * pts(q));
  if (score >= 1) return `<p class="verdict verdict-ok">Richtig · ${got} von ${pointsText(pts(q))} Punkten</p>`;
  if (score > 0) return `<p class="verdict verdict-part">Teilweise richtig · ${got} von ${pointsText(pts(q))} Punkten</p>`;
  const hint = q.typ === 'offen' ? '' : ' Die richtige Lösung ist markiert.';
  return `<p class="verdict verdict-bad">Falsch · 0 von ${pointsText(pts(q))} Punkten.${hint}</p>`;
}

function questionHtml(q, ans, o = {}) {
  let html = questionHead(q, o) + contextHtml(q, o.context);
  html += `<div class="frage">${fmt(q.frage)}</div>`;
  if (q.typ === 'mc') html += mcHtml(q, ans, o);
  else if (q.typ === 'zuordnung' || q.typ === 'reihenfolge') html += rowsHtml(q, ans, o);
  else if (q.typ === 'zahl') html += zahlHtml(q, ans, o);
  else if (q.typ === 'offen') html += offenHtml(q, ans, o);
  if (o.reveal) {
    html += verdictHtml(q, o.score);
    if (q.erklaerung) html += `<div class="erklaerung"><span class="label">Erklärung</span>${fmt(q.erklaerung)}</div>`;
  }
  return `<article class="question q-${q.typ}">${html}</article>`;
}

function pointButtons(q) {
  if (!hatPunkte(q)) {
    return `<p class="rating-q">Vergleiche mit der Musterlösung: Wie gut wusstest du es?</p>
      <div class="points self">
        <button class="pt pt-0" data-action="selfrate" data-p="0">Nicht gewusst</button>
        <button class="pt" data-action="selfrate" data-p="0.5">Teilweise</button>
        <button class="pt pt-max" data-action="selfrate" data-p="1">Gewusst</button>
      </div>`;
  }
  const max = pts(q);
  const steps = [];
  for (let p = 0; p <= max; p += 1) steps.push(p);
  if (!Number.isInteger(max)) steps.push(max);
  return `<p class="rating-q">Vergleiche mit dem Lösungsvorschlag: Wie viele Punkte gibst du dir?</p>
    <div class="points" style="--n:${Math.min(steps.length, 6)}">${steps.map((p) => `<button class="pt${p === 0 ? ' pt-0' : p === max ? ' pt-max' : ''}" data-action="selfrate" data-p="${p}">${pointsText(p)}</button>`).join('')}</div>`;
}

// ---------------------------------------------------------------------
//  Sitzungen
//
//  Eine Sitzung ist entweder eine Prüfung (mode 'pruefung': Auswertung
//  erst nach dem Abgeben, optional mit Zeitlimit) oder eine Übungsrunde
//  (mode 'ueben': Lösung direkt nach jeder Frage).
// ---------------------------------------------------------------------

function startSession(cfg) {
  const running = store.active();
  if (running && !confirm(`„${running.titel}“ ist noch nicht beendet. Verwerfen und neu starten?`)) return;
  if (!cfg.qids.length) return;
  store.setActive({
    id: uid(),
    start: Date.now(),
    pausedMs: 0,
    pausedAt: null,
    idx: 0,
    answers: {},
    scores: {},
    shown: {},
    flags: {},
    phase: 'run',
    ...cfg,
  });
  go('#/lernen');
}

function elapsed(s, now = Date.now()) {
  return now - s.start - (s.pausedMs || 0) - (s.pausedAt ? now - s.pausedAt : 0);
}

function remaining(s) {
  return s.limitMin ? s.limitMin * 60000 - elapsed(s) : null;
}

function pauseActive() {
  const s = store.active();
  if (s && !s.pausedAt && s.phase === 'run') {
    s.pausedAt = Date.now();
    store.saveActive();
  }
}

function resumeActive(s) {
  if (s.pausedAt) {
    s.pausedMs = (s.pausedMs || 0) + Date.now() - s.pausedAt;
    s.pausedAt = null;
    store.saveActive();
  }
}

const currentQ = (s) => frageById.get(s.qids[s.idx]);

function renderSession() {
  const s = store.active();
  if (!s) {
    show(`<section class="empty"><h1>Keine laufende Sitzung</h1>
      <p class="muted">Starte eine Klausur oder übe ein Thema.</p>
      <div class="action-row"><a class="btn btn-primary" href="#/klausuren">Klausuren</a><a class="btn" href="#/themen">Themen</a></div></section>`);
    return;
  }
  // Fragen, die es nicht mehr gibt (Inhalte geändert), überspringen
  s.qids = s.qids.filter((id) => frageById.has(id));
  if (!s.qids.length) { store.setActive(null); renderSession(); return; }
  s.idx = Math.min(s.idx, s.qids.length - 1);
  document.body.classList.add('in-session');
  resumeActive(s);
  if (s.phase === 'bewertung') renderBewertung(s);
  else if (s.mode === 'pruefung') renderPruefung(s);
  else renderUeben(s);
}

// ----- Prüfungsmodus -----

function timerText(s) {
  const rest = remaining(s);
  if (rest === null) return `<span class="timer" aria-label="Verstrichene Zeit">${clock(elapsed(s))}</span>`;
  const low = rest < 5 * 60000 ? ' timer-low' : '';
  return `<span class="timer${low}" aria-label="Restzeit">${clock(rest)}</span>`;
}

function startTimer(s) {
  clearInterval(timer);
  timer = setInterval(() => {
    const el = view.querySelector('.timer');
    if (!el || store.active()?.id !== s.id) { clearInterval(timer); return; }
    const rest = remaining(s);
    el.outerHTML = timerText(s);
    if (rest !== null && rest <= 0) {
      clearInterval(timer);
      s.timeUp = true;
      submitExam(s, true);
    }
  }, 1000);
}

function renderPruefung(s) {
  if (s.limitMin && remaining(s) <= 0) { s.timeUp = true; submitExam(s, true); return; }
  const q = currentQ(s);
  const answered = s.qids.filter((id) => isAnswered(frageById.get(id), s.answers[id])).length;
  const grid = s.qids.map((id, i) => {
    const f = frageById.get(id);
    let cls = 'qcell';
    if (isTouched(f, s.answers[id])) cls += ' is-answered';
    if (s.flags[id]) cls += ' is-flagged';
    if (i === s.idx) cls += ' is-current';
    return `<button class="${cls}" data-action="goto" data-i="${i}" aria-label="Aufgabe ${esc(f.nr)}">${esc(f.nr)}</button>`;
  }).join('');
  const last = s.idx === s.qids.length - 1;
  show(`<section class="session">
    <div class="session-bar">
      <button class="session-close" data-action="leave">Unterbrechen</button>
      <div class="session-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${s.qids.length}" aria-valuenow="${answered}"><span style="width:${(answered / s.qids.length) * 100}%"></span></div>
      ${timerText(s)}
    </div>
    <details class="qnav"${s.navOpen ? ' open' : ''}>
      <summary>Frage ${s.idx + 1} von ${s.qids.length} · ${answered} beantwortet</summary>
      <div class="qgrid">${grid}</div>
      <p class="muted small"><i class="dot dot-answered"></i> beantwortet <i class="dot dot-flag"></i> markiert</p>
    </details>
    ${questionHtml(q, s.answers[q.id], { interactive: true, context: q.ersteImBlock ? 'open' : 'closed' })}
    <div class="exam-actions">
      <button class="btn" data-action="prev" ${s.idx === 0 ? 'disabled' : ''}>Zurück</button>
      <button class="btn btn-quiet${s.flags[q.id] ? ' is-flagged' : ''}" data-action="flag" aria-pressed="${!!s.flags[q.id]}">${s.flags[q.id] ? 'Markiert' : 'Markieren'}</button>
      ${last ? '<button class="btn btn-primary" data-action="submit">Abgeben</button>' : '<button class="btn btn-primary" data-action="next">Weiter</button>'}
    </div>
    ${last ? '' : '<p class="submit-early"><button class="btn btn-quiet" data-action="submit">Prüfung abgeben</button></p>'}
  </section>`);
  startTimer(s);
}

function submitExam(s, forced = false) {
  if (!forced) {
    const open = s.qids.filter((id) => !isAnswered(frageById.get(id), s.answers[id])).length;
    const msg = open
      ? `${plural(open, 'Frage ist', 'Fragen sind')} noch nicht beantwortet. Trotzdem abgeben?`
      : 'Prüfung jetzt abgeben?';
    if (!confirm(msg)) return;
  }
  clearInterval(timer);
  s.end = Date.now() - (s.pausedAt ? Date.now() - s.pausedAt : 0);
  s.dauerMs = elapsed(s);
  s.phase = 'bewertung';
  store.saveActive();
  if (forced) alert('Die Zeit ist abgelaufen. Die Prüfung wurde abgegeben.');
  if (location.hash === '#/lernen') renderSession();
  else go('#/lernen');
}

// ----- Selbstbewertung der freien Antworten nach dem Abgeben -----

function renderBewertung(s) {
  const open = s.qids.filter((id) => frageById.get(id).typ === 'offen');
  const todo = open.filter((id) => s.scores[id] === undefined);
  if (!todo.length) { finish(s); return; }
  const q = frageById.get(todo[0]);
  const done = open.length - todo.length;
  show(`<section class="session">
    <div class="session-bar">
      <span class="session-title">Freie Antworten bewerten</span>
      <span class="session-count">${done + 1} / ${open.length}</span>
    </div>
    <p class="muted small rate-intro">Die Aufgaben mit festen Antworten sind schon ausgewertet. Bewerte jetzt deine freien Antworten so streng wie ein Prüfer.</p>
    ${questionHtml(q, s.answers[q.id], { reveal: true, context: 'closed' })}
    <div class="actions">${pointButtons(q)}</div>
  </section>`);
}

// ----- Übungsmodus -----

function renderUeben(s) {
  const q = currentQ(s);
  const score = s.scores[q.id];
  const done = Object.keys(s.scores).length;
  const reveal = score !== undefined || !!s.shown[q.id];
  const last = s.idx === s.qids.length - 1;
  let actions;
  if (score !== undefined) {
    actions = last
      ? '<button class="btn btn-primary btn-wide" data-action="finish">Ergebnis ansehen</button>'
      : '<button class="btn btn-primary btn-wide" data-action="next">Weiter</button>';
  } else if (q.typ === 'offen') {
    actions = s.shown[q.id]
      ? pointButtons(q)
      : '<button class="btn btn-primary btn-wide" data-action="show">Lösung zeigen</button>';
  } else {
    actions = `<div class="action-row">
      <button class="btn btn-quiet" data-action="dontknow">Weiß ich nicht</button>
      <button class="btn btn-primary" data-action="check" ${isAnswered(q, s.answers[q.id]) ? '' : 'disabled'}>Prüfen</button>
    </div>`;
  }
  show(`<section class="session">
    <div class="session-bar">
      <button class="session-close" data-action="end">Beenden</button>
      <div class="session-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${s.qids.length}" aria-valuenow="${done}"><span style="width:${(done / s.qids.length) * 100}%"></span></div>
      <span class="session-count">${s.idx + 1} / ${s.qids.length}</span>
    </div>
    ${questionHtml(q, s.answers[q.id], {
      interactive: !reveal,
      reveal,
      score,
      context: s.kind === 'klausur' && !q.ersteImBlock ? 'closed' : 'open',
      source: s.kind !== 'klausur',
    })}
    <div class="actions">${actions}</div>
  </section>`);
}

function checkCurrent(s, dontKnow = false) {
  const q = currentQ(s);
  const score = dontKnow ? 0 : grade(q, s.answers[q.id]);
  s.scores[q.id] = score;
  store.record(q.id, score, s.kind);
  store.saveActive();
  renderSession();
}

// ----- Abschluss -----

function finish(s) {
  clearInterval(timer);
  const qids = s.mode === 'pruefung' ? s.qids : s.qids.filter((id) => s.scores[id] !== undefined);
  if (!qids.length) {
    store.setActive(null);
    go(s.back || '#/');
    return;
  }
  const scores = {};
  let punkte = 0;
  let max = 0;
  for (const id of qids) {
    const q = frageById.get(id);
    const sc = s.mode === 'pruefung' && q.typ !== 'offen' ? grade(q, s.answers[id]) : (s.scores[id] ?? 0);
    scores[id] = sc;
    punkte += sc * pts(q);
    max += pts(q);
    if (s.mode === 'pruefung') store.record(id, sc, 'klausur', s.end);
  }
  const answers = {};
  for (const id of qids) if (s.answers[id] !== undefined) answers[id] = s.answers[id];
  const run = {
    id: s.id,
    kind: s.kind,
    mode: s.mode,
    titel: s.titel,
    klausurId: s.klausurId || null,
    start: s.start,
    end: s.end || Date.now(),
    dauerMs: s.dauerMs ?? elapsed(s),
    limitMin: s.limitMin || 0,
    timeUp: !!s.timeUp,
    qids,
    answers,
    scores,
    punkte,
    max,
  };
  store.addRun(run);
  store.setActive(null);
  go(`#/ergebnis/${run.id}`);
}

// ---------------------------------------------------------------------
//  Start
// ---------------------------------------------------------------------

function examChip() {
  const exam = store.settings().examDate;
  if (!exam) return '<a class="chip chip-link" href="#/daten">Prüfungstermin eintragen</a>';
  const left = daysBetween(today(), exam);
  if (left < 0) return '<span class="chip">Prüfung ist vorbei</span>';
  if (left === 0) return '<span class="chip chip-strong">Heute ist Prüfung. Viel Erfolg!</span>';
  return `<span class="chip chip-strong">Noch ${plural(left, 'Tag', 'Tage')} bis zur Prüfung</span>`;
}

function backupNudge() {
  if (!store.needsBackup()) return '';
  const lastB = store.lastBackup();
  const count = store.attemptCount();
  if (!lastB && count < 10) return '';
  if (lastB && Date.now() - lastB < 7 * 86400000) return '';
  return `<div class="panel nudge">
    <p><strong>Lernstand sichern</strong><br><span class="muted">${lastB ? `Letzte Sicherung am ${dateText(lastB)}.` : 'Du hast noch keine Sicherung.'} Der Stand liegt nur in diesem Browser.</span></p>
    <button class="btn" data-action="export">Sicherung herunterladen</button>
  </div>`;
}

function resumePanel() {
  const s = store.active();
  if (!s) return '';
  let info;
  if (s.phase === 'bewertung') info = 'Abgegeben, freie Antworten noch bewerten';
  else if (s.mode === 'pruefung') {
    const rest = remaining(s);
    info = `Frage ${s.idx + 1} von ${s.qids.length}${rest !== null ? ` · noch ${clock(rest)} Zeit` : ''}`;
  } else info = `${Object.keys(s.scores).length} von ${s.qids.length} Fragen bearbeitet`;
  return `<div class="panel resume">
    <p class="eyebrow">Nicht beendet</p>
    <p class="resume-title">${esc(s.titel)}</p>
    <p class="muted small">${info}</p>
    <div class="action-row">
      <a class="btn btn-primary" href="#/lernen">Fortsetzen</a>
      <button class="btn btn-quiet btn-danger" data-action="discard">Verwerfen</button>
    </div>
  </div>`;
}

function runRow(r) {
  const pct = r.max ? r.punkte / r.max : 0;
  const label = r.mode === 'pruefung' ? 'Prüfung' : r.kind === 'klausur' ? 'Klausur geübt' : r.kind === 'wdh' ? 'Wiederholung' : 'Übung';
  return `<a class="list-row" href="#/ergebnis/${r.id}">
    <span class="list-main"><strong>${esc(r.titel)}</strong><small>${label} · ${dateTimeText(r.end)} · ${plural(r.qids.length, 'Frage', 'Fragen')}</small></span>
    <span class="score-pill ${scoreClass(pct)}">${pctText(pct)}</span>
  </a>`;
}

const scoreClass = (pct) => (pct >= 0.67 ? 'is-ok' : pct >= 0.5 ? 'is-part' : 'is-bad');

function fachCard(b) {
  const ks = klausurenIn(b.id);
  if (!ks.length) {
    return `<div class="fach fach-empty">
      <span class="fach-name">${esc(b.name)}</span>
      <span class="fach-meta">Kommt bald</span>
    </div>`;
  }
  const qs = fragenIn(b.id);
  const p = progress(qs, store.last);
  return `<a class="fach" href="#/fach/${b.id}">
    <span class="fach-name">${esc(b.name)}</span>
    <span class="fach-meta">${plural(ks.length, 'Klausur', 'Klausuren')} · ${plural(qs.length, 'Frage', 'Fragen')} · ${p.bearbeitet} bearbeitet</span>
    ${progressBar(p)}
    <span class="go">›</span>
  </a>`;
}

function renderHome() {
  const c = progress(fragen, store.last);
  const wrong = wrongQuestions();
  const runs = store.runs().slice(0, 5);
  const mehrereFaecher = bereicheMitInhalt().length > 1;
  const themen = themaProgress('').filter((t) => t.p.bearbeitet >= 2 && t.p.quote !== null)
    .sort((a, b) => a.p.quote - b.p.quote).slice(0, 3);

  show(`<section>
    <header class="page-head">
      <p class="eyebrow">Abschlussprüfung Kaufleute im E-Commerce</p>
      <h1>Prüfungsvorbereitung</h1>
      ${examChip()}
    </header>
    ${resumePanel()}
    ${backupNudge()}
    <div class="tiles">
      <div><strong>${c.bearbeitet}<small> / ${c.total}</small></strong><span>Fragen bearbeitet</span></div>
      <div><strong>${c.quote === null ? '–' : pctText(c.quote)}</strong><span>zuletzt gewusst</span></div>
      <a href="#/wiederholen"><strong>${wrong.length}</strong><span>zum Wiederholen</span></a>
    </div>
    ${wrong.length ? `<button class="btn btn-primary btn-wide" data-action="start-wdh">Falsche Fragen wiederholen (${wrong.length})</button>` : ''}
    <h2>Fächer</h2>
    <div class="list">${BEREICHE.map(fachCard).join('')}</div>
    ${mehrereFaecher ? `<h2>Alles zusammen</h2>
      <div class="action-row stack">
        <button class="btn" data-action="start-mix" data-bereich="">Alle Fächer gemischt üben</button>
        <button class="btn" data-action="start-random" data-bereich="">Zufallsprüfung aus allen Fächern</button>
      </div>` : ''}
    ${themen.length ? `<h2>Schwächste Themen</h2><div class="list">${themen.map((t) => `<a class="list-row" href="#/themen/${t.id}">
      <span class="list-main"><strong>${esc(t.name)}</strong><small>${t.p.bearbeitet} von ${t.p.total} Fragen bearbeitet</small></span>
      <span class="score-pill ${scoreClass(t.p.quote)}">${pctText(t.p.quote)}</span></a>`).join('')}</div>` : ''}
    ${runs.length ? `<h2>Letzte Ergebnisse</h2><div class="list">${runs.map(runRow).join('')}</div>` : ''}
    ${store.isMemoryOnly() ? '<p class="warn">Dieser Browser erlaubt kein Speichern (privater Modus?). Dein Lernstand geht beim Schließen verloren.</p>' : ''}
  </section>`);
}

// ---------------------------------------------------------------------
//  Fach und Klausuren
// ---------------------------------------------------------------------

function klausurMeta(k) {
  const parts = [plural(k.fragen.length, 'Frage', 'Fragen')];
  if (k.fragen.some(hatPunkte)) parts.push(plural(k.fragen.reduce((s, f) => s + pts(f), 0), 'Punkt', 'Punkte'));
  if (k.dauer) parts.push(`${k.dauer} Min.`);
  return parts.join(' · ');
}

function bestRun(kid) {
  return store.runs().filter((r) => r.klausurId === kid && r.mode === 'pruefung')
    .sort((a, b) => b.punkte / b.max - a.punkte / a.max)[0];
}

function klausurRow(k, label = k.titel) {
  const best = bestRun(k.id);
  const p = progress(k.fragen, store.last);
  return `<a class="list-row" href="#/klausuren/${k.id}">
    <span class="list-main"><strong>${esc(label)}</strong>
    <small>${esc(klausurMeta(k))} · ${p.bearbeitet} bearbeitet</small>${progressBar(p)}</span>
    ${best ? `<span class="score-pill ${scoreClass(best.punkte / best.max)}" title="Bestes Prüfungsergebnis">${pctText(best.punkte / best.max)}</span>` : '<span class="go">›</span>'}
  </a>`;
}

function renderFach(id) {
  const b = bereichById.get(id);
  if (!b) { renderNotFound(); return; }
  const ks = klausurenIn(id);
  const qs = fragenIn(id);
  const p = progress(qs, store.last);
  const wrong = wrongQuestions(id);
  const themen = themaProgress(id);
  show(`<section>
    <a class="back" href="#/">Start</a>
    <header class="page-head">
      <p class="eyebrow">Fach</p>
      <h1>${esc(b.name)}</h1>
      <p class="muted">${plural(ks.length, 'Klausur', 'Klausuren')} · ${plural(qs.length, 'Frage', 'Fragen')} · ${p.bearbeitet} bearbeitet${p.quote !== null ? ` · zuletzt ${pctText(p.quote)} gewusst` : ''}</p>
    </header>
    ${ks.length ? `${legend}${progressBar(p)}
    <div class="action-row stack fach-actions">
      <button class="btn btn-primary" data-action="start-mix" data-bereich="${id}">Gemischt üben</button>
      <button class="btn" data-action="start-random" data-bereich="${id}">Zufallsprüfung (${Math.min(20, qs.length)} Fragen)</button>
      ${wrong.length ? `<button class="btn" data-action="start-wdh" data-bereich="${id}">Falsche wiederholen (${wrong.length})</button>` : ''}
    </div>
    <h2>Klausuren nach Jahren</h2>
    <div class="list">${ks.map((k) => klausurRow(k)).join('')}</div>
    <h2>Themen</h2>
    <div class="list">${themen.map(themaRow).join('')}</div>
    <div class="action-row stack fach-links">
      ${FORMELN.some((f) => f.bereich === id) ? `<a class="btn" href="#/formeln" data-action="bereich" data-id="${id}" data-go="#/formeln">Formelsammlung</a>` : ''}
      <a class="btn" href="#/analyse" data-action="bereich" data-id="${id}" data-go="#/analyse">Was kommt wie oft dran?</a>
    </div>`
    : '<p class="note">Für dieses Fach sind noch keine Klausuren eingepflegt.</p>'}
  </section>`);
}

function renderKlausuren() {
  const groups = bereicheMitInhalt().map((b) => `<h2>${esc(b.name)}</h2>
    <div class="list">${klausurenIn(b.id).map((k) => klausurRow(k)).join('')}</div>`).join('');
  show(`<section>
    <header class="page-head">
      <h1>Klausuren</h1>
      <p class="muted">Alle Altklausuren nach Fach und Jahr, die neueste zuerst. Geh eine Klausur komplett durch, zum Üben mit der Musterlösung nach jeder Frage oder als Prüfung mit Auswertung am Ende.</p>
    </header>
    ${groups || '<p class="note">Noch keine Klausuren eingepflegt.</p>'}
  </section>`);
}

function renderKlausurSetup(id) {
  const k = klausurById.get(id);
  if (!k) { renderNotFound(); return; }
  const a = analyse(k.fragen);
  const runs = store.runs().filter((r) => r.klausurId === id);
  const nurOffen = k.fragen.every((f) => f.typ === 'offen');
  const mode = sessionStorage.getItem('setup-mode') || (nurOffen ? 'ueben' : 'pruefung');
  const p = progress(k.fragen, store.last);
  show(`<section>
    <a class="back" href="#/fach/${k.bereich}">${esc(bereichById.get(k.bereich)?.kurz || 'Klausuren')}</a>
    <header class="page-head">
      <p class="eyebrow">${esc(bereichById.get(k.bereich)?.name || '')}</p>
      <h1>${esc(k.titel)}</h1>
      <p class="muted">${esc(klausurMeta(k))} · ${p.bearbeitet} bearbeitet</p>
    </header>
    <form class="panel setup" data-form="setup" data-id="${k.id}">
      <fieldset>
        <legend>Modus</legend>
        <label class="choice"><input type="radio" name="mode" value="ueben" ${mode === 'ueben' ? 'checked' : ''}>
          <span><strong>Üben</strong><small>Frage lesen, selbst überlegen, dann Musterlösung aufdecken und einschätzen.</small></span></label>
        <label class="choice"><input type="radio" name="mode" value="pruefung" ${mode === 'pruefung' ? 'checked' : ''}>
          <span><strong>Prüfung</strong><small>Alle Fragen am Stück bearbeiten, Antworten notieren, erst am Ende mit den Musterlösungen vergleichen.</small></span></label>
      </fieldset>
      <fieldset class="limit" ${mode === 'ueben' ? 'disabled' : ''}>
        <legend>Zeit</legend>
        <label class="choice"><input type="checkbox" name="limit" ${k.dauer ? 'checked' : ''}>
          <span><strong>Mit Zeitlimit</strong><small>Bei Ablauf wird automatisch abgegeben. Unterbrechen hält die Uhr an.</small></span></label>
        <label class="inline-field">Minuten <input type="number" name="minutes" min="1" max="600" inputmode="numeric" value="${k.dauer || 90}"></label>
      </fieldset>
      <button class="btn btn-primary btn-wide" type="submit">Starten</button>
    </form>
    ${k.situation ? `<h2>Ausgangssituation</h2><div class="panel prose">${fmt(k.situation)}</div>` : ''}
    <h2>Was drankommt</h2>
    <div class="panel">
      <div class="chips">${a.themen.map((t) => `<a class="chip" href="#/themen/${t.id}">${esc(themaName(t.id))} <span>${t.fragen}</span></a>`).join('')}</div>
      ${a.arten.length ? `<div class="chips">${a.arten.map((t) => `<span class="chip">${ARTEN[t.id]} <span>${t.fragen}</span></span>`).join('')}</div>` : ''}
    </div>
    <h2>Alle Fragen mit Musterlösung</h2>
    ${browseList(k.fragen, false)}
    ${runs.length ? `<h2>Deine Ergebnisse</h2><div class="list">${runs.map(runRow).join('')}</div>` : ''}
  </section>`);
}

// ---------------------------------------------------------------------
//  Themen und Wiederholen
// ---------------------------------------------------------------------

function themaProgress(bereich) {
  const list = fragenIn(bereich);
  const ids = new Set(list.flatMap((f) => f.themen));
  return [...ids].map((id) => {
    const qs = list.filter((f) => f.themen.includes(id));
    return { id, name: themaName(id), qs, p: progress(qs, store.last) };
  }).sort((a, b) => b.qs.length - a.qs.length || a.name.localeCompare(b.name, 'de'));
}

function themaRow(t) {
  return `<a class="list-row" href="#/themen/${t.id}">
    <span class="list-main"><strong>${esc(t.name)}</strong>
    <small>${plural(t.qs.length, 'Frage', 'Fragen')} · ${t.p.bearbeitet} bearbeitet${t.p.falsch + t.p.teilweise ? ` · ${t.p.falsch + t.p.teilweise} zum Wiederholen` : ''}</small>
    ${progressBar(t.p)}</span>
    <span class="go">›</span></a>`;
}

function wrongQuestions(bereich = '') {
  return store.wrongIds().map((id) => frageById.get(id))
    .filter((q) => q && (!bereich || q.klausur.bereich === bereich));
}

function renderThemen() {
  const list = themaProgress(bereichFilter);
  const all = fragenIn(bereichFilter);
  show(`<section>
    <header class="page-head">
      <h1>Themen</h1>
      <p class="muted">Fragen aus allen Klausuren, nach Thema sortiert. Beim Üben siehst du die Musterlösung direkt nach jeder Frage.</p>
    </header>
    ${bereichChips()}
    <button class="btn btn-wide" data-action="start-mix" data-bereich="${bereichFilter}">Alles gemischt üben (${all.length})</button>
    <h2>${plural(list.length, 'Thema', 'Themen')}</h2>
    ${legend}
    <div class="list">${list.map(themaRow).join('')}</div>
  </section>`);
}

function browseList(list, withSource = true) {
  return `<div class="browse">${list.map((q) => `<details class="browse-q">
    <summary>${statusDot(q.id)}<span class="browse-src">${withSource ? `${esc(klausurLabel(q.klausur))} · ` : ''}Aufgabe ${esc(q.nr)}</span><span class="browse-text">${esc(firstLine(q.frage))}</span></summary>
    <div class="browse-body">${questionHtml(q, undefined, { reveal: true, context: 'closed' })}</div>
  </details>`).join('')}</div>`;
}

function renderThema(id) {
  const list = fragen.filter((f) => f.themen.includes(id))
    .sort((a, b) => (b.klausur.sortierung ?? 0) - (a.klausur.sortierung ?? 0));
  if (!list.length && !themaById.has(id)) { renderNotFound(); return; }
  const p = progress(list, store.last);
  const fresh = list.filter((f) => !store.last(f.id));
  const wrong = list.filter((f) => store.last(f.id) && store.last(f.id)[1] < 1);
  const nKlausuren = new Set(list.map((f) => f.klausur.id)).size;
  show(`<section>
    <a class="back" href="#/themen">Themen</a>
    <header class="page-head">
      <h1>${esc(themaName(id))}</h1>
      <p class="muted">${plural(list.length, 'Frage', 'Fragen')} aus ${plural(nKlausuren, 'Klausur', 'Klausuren')}${p.quote !== null ? ` · zuletzt ${pctText(p.quote)} gewusst` : ''}</p>
    </header>
    ${list.length ? `<div class="action-row stack">
      <button class="btn btn-primary" data-action="start-thema" data-id="${id}" data-set="alle">Alle üben (${list.length})</button>
      ${fresh.length && fresh.length < list.length ? `<button class="btn" data-action="start-thema" data-id="${id}" data-set="neu">Nur neue (${fresh.length})</button>` : ''}
      ${wrong.length ? `<button class="btn" data-action="start-thema" data-id="${id}" data-set="falsch">Nur falsche (${wrong.length})</button>` : ''}
    </div>
    <h2>Fragen mit Musterlösung</h2>
    ${browseList(list)}` : '<p class="note">Zu diesem Thema gibt es noch keine Fragen.</p>'}
  </section>`);
}

function renderWiederholen() {
  const wrong = wrongQuestions();
  const byThema = new Map();
  for (const q of wrong) for (const t of q.themen) byThema.set(t, [...(byThema.get(t) || []), q]);
  show(`<section>
    <header class="page-head">
      <h1>Wiederholen</h1>
      <p class="muted">Hier landet jede Frage, die du zuletzt nicht oder nur teilweise wusstest. Sobald du sie einmal voll gewusst hast, verschwindet sie.</p>
    </header>
    ${wrong.length ? `<button class="btn btn-primary btn-wide" data-action="start-wdh">Alle wiederholen (${wrong.length})</button>
      <h2>Nach Thema</h2>
      <div class="list">${[...byThema.entries()].sort((a, b) => b[1].length - a[1].length).map(([t, qs]) => `<button class="list-row" data-action="start-wdh" data-thema="${t}">
        <span class="list-main"><strong>${esc(themaName(t))}</strong><small>${plural(qs.length, 'Frage', 'Fragen')}</small></span><span class="go">›</span></button>`).join('')}</div>
      <h2>Alle Fragen</h2>
      ${browseList(wrong)}`
    : '<p class="note">Nichts zu wiederholen. Alles, was du bisher bearbeitet hast, wusstest du zuletzt.</p>'}
  </section>`);
}

// ---------------------------------------------------------------------
//  Formeln
// ---------------------------------------------------------------------

let formelnVerdeckt = false;
try { formelnVerdeckt = localStorage.getItem('formeln-verdeckt') === '1'; } catch { /* egal */ }

function renderFormeln() {
  const list = FORMELN.filter((f) => !bereichFilter || f.bereich === bereichFilter);
  const reihenfolge = new Map([...themaById.keys()].map((id, i) => [id, i]));
  const gruppen = new Map();
  for (const f of list) gruppen.set(f.thema, [...(gruppen.get(f.thema) || []), f]);
  const sortiert = [...gruppen.entries()].sort((a, b) => (reihenfolge.get(a[0]) ?? 99) - (reihenfolge.get(b[0]) ?? 99));
  show(`<section class="formeln${formelnVerdeckt ? ' is-verdeckt' : ''}">
    <header class="page-head">
      <h1>Formeln</h1>
      <p class="muted">Das Formelblatt für Geschäftsprozesse und die Formeln aus den Musterlösungen für Kundenkommunikation, nach Thema geordnet.</p>
    </header>
    ${bereichChips()}
    <div class="formel-tools">
      <label class="sr-only" for="formelsuche">Formel suchen</label>
      <input type="search" id="formelsuche" data-input="formelsuche" placeholder="Suchen, z. B. Deckungsbeitrag" autocomplete="off">
      <button class="btn${formelnVerdeckt ? ' btn-primary' : ''}" data-action="formeln-verdecken" aria-pressed="${formelnVerdeckt}">${formelnVerdeckt ? 'Alle zeigen' : 'Abfragen'}</button>
    </div>
    ${formelnVerdeckt ? '<p class="muted small">Abfragemodus: Überleg dir die Formel und tippe dann auf die Karte.</p>' : ''}
    ${sortiert.map(([thema, fs]) => `<section class="formel-gruppe">
      <h2><span>${esc(themaName(thema))}</span><a class="small" href="#/themen/${thema}">Fragen ›</a></h2>
      ${fs.map((f) => `<div class="formel" data-action="formel-zeigen" data-suche="${esc(`${f.name} ${f.zeilen.join(' ')}`.toLowerCase())}">
        <p class="formel-name">${esc(f.name)}</p>
        <div class="formel-body">${fmt(f.zeilen.map((z) => `> ${z}`).join('\n'))}${f.quelle ? `<p class="formel-quelle">Aus den Musterlösungen: ${esc(f.quelle)}</p>` : ''}</div>
        <p class="formel-hint">Antippen zum Aufdecken</p>
      </div>`).join('')}
    </section>`).join('')}
    <p class="note formel-leer" hidden>Keine Formel gefunden.</p>
  </section>`);
}

function filterFormeln(text) {
  const q = text.trim().toLowerCase();
  let treffer = 0;
  view.querySelectorAll('.formel-gruppe').forEach((g) => {
    let sichtbar = 0;
    g.querySelectorAll('.formel').forEach((f) => {
      const ok = !q || f.dataset.suche.includes(q);
      f.hidden = !ok;
      if (ok) sichtbar += 1;
    });
    g.hidden = !sichtbar;
    treffer += sichtbar;
  });
  view.querySelector('.formel-leer').hidden = treffer > 0;
}

// ---------------------------------------------------------------------
//  Analyse
// ---------------------------------------------------------------------

function barRows(rows, label, href, mitPunkten) {
  const share = (r) => (mitPunkten ? r.anteilPunkte : r.anteilFragen);
  const maxShare = Math.max(...rows.map(share), 0.0001);
  return rows.map((r) => {
    const inner = `<span class="stat-name">${esc(label(r))}</span>
      <span class="stat-val">${pctText(share(r))}</span>
      <span class="stat-bar"><span style="width:${(share(r) / maxShare) * 100}%"></span></span>
      <span class="stat-meta">${plural(r.fragen, 'Frage', 'Fragen')}${mitPunkten ? ` · ${pointsText(r.punkte)} Punkte` : ''} · in ${r.klausuren} von ${analyseCache.klausuren} Klausuren</span>`;
    return href ? `<a class="stat-row" href="${href(r)}">${inner}</a>` : `<div class="stat-row">${inner}</div>`;
  }).join('');
}

let analyseCache = null;

function renderAnalyse() {
  const list = fragenIn(bereichFilter);
  const a = analyse(list);
  analyseCache = a;
  const mitPunkten = list.some(hatPunkte);
  const sortiert = (rows) => [...rows].sort((x, y) => (mitPunkten ? y.punkte - x.punkte : y.fragen - x.fragen) || y.klausuren - x.klausuren);
  const table = (rows, label) => `<details class="table-toggle"><summary>Als Tabelle</summary><div class="table-wrap"><table>
    <thead><tr><th></th><th class="is-num">Fragen</th>${mitPunkten ? '<th class="is-num">Punkte</th>' : ''}<th class="is-num">Anteil</th><th class="is-num">Klausuren</th></tr></thead>
    <tbody>${rows.map((r) => `<tr><td>${esc(label(r))}</td><td class="is-num">${r.fragen}</td>${mitPunkten ? `<td class="is-num">${pointsText(r.punkte)}</td>` : ''}<td class="is-num">${pctText(mitPunkten ? r.anteilPunkte : r.anteilFragen)}</td><td class="is-num">${r.klausuren}</td></tr>`).join('')}</tbody>
  </table></div></details>`;
  const themen = sortiert(a.themen);
  const arten = sortiert(a.arten);
  const typen = sortiert(a.typen);
  const bezug = mitPunkten ? 'dem Anteil an allen Punkten' : 'dem Anteil an allen Fragen';
  show(`<section>
    <header class="page-head">
      <h1>Analyse</h1>
      <p class="muted">Welche Themen und Aufgabenarten kommen in den Altklausuren wie oft vor? Sortiert nach ${bezug}.</p>
    </header>
    ${bereichChips()}
    <div class="tiles">
      <div><strong>${a.klausuren}</strong><span>${a.klausuren === 1 ? 'Klausur' : 'Klausuren'}</span></div>
      <div><strong>${a.fragen}</strong><span>Fragen</span></div>
      <div><strong>${a.themen.length}</strong><span>Themen</span></div>
    </div>
    <h2>Themen</h2>
    <div class="stats">${barRows(themen, (r) => themaName(r.id), (r) => `#/themen/${r.id}`, mitPunkten)}</div>
    ${table(themen, (r) => themaName(r.id))}
    ${arten.length ? `<h2>Aufgabenarten</h2>
      <div class="stats">${barRows(arten, (r) => ARTEN[r.id], null, mitPunkten)}</div>
      <dl class="arten-info">${arten.map((r) => `<dt>${ARTEN[r.id]}</dt><dd>${esc(ARTEN_INFO[r.id])}</dd>`).join('')}</dl>
      ${table(arten, (r) => ARTEN[r.id])}` : ''}
    ${typen.length > 1 ? `<h2>Auswertung in der App</h2>
      <p class="muted small">Multiple Choice, Zuordnung, Reihenfolge und Rechenaufgaben mit Ergebnisfeld wertet die App automatisch aus. Freie Antworten bewertest du selbst.</p>
      <div class="stats">${barRows(typen, (r) => TYPEN[r.id], null, mitPunkten)}</div>` : ''}
  </section>`);
}

// ---------------------------------------------------------------------
//  Ergebnis
// ---------------------------------------------------------------------

function renderErgebnis(id, sub) {
  const r = store.runById(id);
  if (!r) { renderNotFound(); return; }
  const qs = r.qids.map((q) => frageById.get(q)).filter(Boolean);
  const pct = r.max ? r.punkte / r.max : 0;

  if (sub === 'antworten') {
    show(`<section>
      <a class="back" href="#/ergebnis/${r.id}">Ergebnis</a>
      <header class="page-head"><h1>Deine Antworten</h1><p class="muted">${esc(r.titel)} · ${dateTimeText(r.end)}</p></header>
      <div class="review">${qs.map((q) => questionHtml(q, r.answers[q.id], { reveal: true, score: r.scores[q.id], context: 'closed', source: r.kind !== 'klausur' })).join('')}</div>
    </section>`);
    return;
  }

  // Punkte je Thema, schwächste zuerst
  const byThema = new Map();
  for (const q of qs) {
    for (const t of q.themen) {
      const e = byThema.get(t) || { got: 0, max: 0 };
      e.got += (r.scores[q.id] || 0) * pts(q) / q.themen.length;
      e.max += pts(q) / q.themen.length;
      byThema.set(t, e);
    }
  }
  const themen = [...byThema.entries()].sort((a, b) => a[1].got / a[1].max - b[1].got / b[1].max);
  const wrong = qs.filter((q) => (r.scores[q.id] ?? 0) < 1);
  const n = note(pct * 100);
  const isExam = r.mode === 'pruefung';
  const mitPunkten = qs.some(hatPunkte);
  show(`<section>
    <header class="page-head result-head">
      <p class="eyebrow">${esc(r.titel)}</p>
      <h1 class="big">${pctText(pct)}</h1>
      <p class="result-sub">${mitPunkten ? `${pointsText(r.punkte)} von ${pointsText(r.max)} Punkten` : `${pointsText(r.punkte)} von ${plural(r.max, 'Frage', 'Fragen')} gewusst`}${isExam ? ` · Note ${n.n} (${n.text})${mitPunkten ? '' : ', Richtwert'}` : ''}</p>
      <p class="muted small">${dateTimeText(r.end)} · ${minutesText(r.dauerMs)}${r.limitMin ? ` von ${r.limitMin} Minuten` : ''}${r.timeUp ? ' · Zeit abgelaufen' : ''}</p>
    </header>
    <div class="action-row stack">
      ${wrong.length ? `<button class="btn btn-primary" data-action="start-run-wrong" data-id="${r.id}">Falsche üben (${wrong.length})</button>` : ''}
      <a class="btn" href="#/ergebnis/${r.id}/antworten">Antworten durchsehen</a>
      ${r.klausurId ? `<a class="btn" href="#/klausuren/${r.klausurId}">Klausur neu starten</a>` : ''}
    </div>
    <h2>Nach Thema</h2>
    <div class="stats">${themen.map(([t, e]) => `<a class="stat-row" href="#/themen/${t}">
      <span class="stat-name">${esc(themaName(t))}</span>
      <span class="stat-val">${pointsText(e.got)} / ${pointsText(e.max)}</span>
      <span class="stat-bar stat-bar-score ${scoreClass(e.got / e.max)}"><span style="width:${(e.got / e.max) * 100}%"></span></span>
    </a>`).join('')}</div>
    ${isExam ? `<p class="muted small">Notenschlüssel der IHK: ab 92 % sehr gut, ab 81 % gut, ab 67 % befriedigend, ab 50 % ausreichend, ab 30 % mangelhaft.${mitPunkten ? '' : ' Weil die Musterlösungen keine Punkte nennen, zählt jede Frage gleich viel: gewusst ganz, teilweise halb.'}</p>` : ''}
    <p class="center"><a class="btn btn-quiet" href="#/">Zur Startseite</a></p>
  </section>`);
}

// ---------------------------------------------------------------------
//  Daten
// ---------------------------------------------------------------------

function renderDaten(msg = '') {
  const lastB = store.lastBackup();
  show(`<section>
    <header class="page-head"><h1>Daten</h1></header>

    <h2>Prüfungstermin</h2>
    <div class="panel">
      <label class="field">Datum der schriftlichen Prüfung
        <input type="date" data-input="examDate" value="${esc(store.settings().examDate)}"></label>
    </div>

    <h2>Sicherung</h2>
    <div class="panel prose">
      <p>Dein Lernstand liegt nur in diesem Browser auf diesem Gerät. Lade ab und zu eine Sicherung herunter. Damit kannst du ihn auch auf ein anderes Gerät übertragen.</p>
      <p class="muted small">${lastB ? `Letzte Sicherung: ${dateTimeText(lastB)}${store.needsBackup() ? ', seitdem hat sich etwas geändert' : ''}.` : 'Noch keine Sicherung.'}</p>
      <div class="action-row">
        <button class="btn btn-primary" data-action="export">Sicherung herunterladen</button>
        <label class="btn">Sicherung einlesen<input type="file" accept=".json,application/json" data-input="import" hidden></label>
      </div>
      <label class="check"><input type="checkbox" data-input="replace"> Beim Einlesen den jetzigen Stand ersetzen statt zusammenführen</label>
      ${msg ? `<p class="flash" role="status">${msg}</p>` : ''}
    </div>

    <h2>Gespeichert</h2>
    <div class="panel prose">
      <p>${plural(fragen.filter((f) => store.last(f.id)).length, 'Frage', 'Fragen')} bearbeitet, ${plural(store.attemptCount(), 'Antwort', 'Antworten')}, ${plural(store.runs().length, 'Ergebnis', 'Ergebnisse')}.</p>
      <p class="muted small">Tipp fürs iPhone: Safari löscht Daten von Webseiten, die sieben Tage lang nicht geöffnet wurden. Füge die Seite über „Teilen → Zum Home-Bildschirm“ hinzu und öffne sie von dort. Dann bleibt der Stand erhalten.</p>
    </div>

    <h2>Zurücksetzen</h2>
    <div class="panel">
      <p class="muted small">Löscht alle Antworten und Ergebnisse in diesem Browser.</p>
      <button class="btn btn-danger" data-action="reset">Lernstand löschen</button>
    </div>
  </section>`);
}

function downloadBackup() {
  const text = store.exportData();
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `lernstand-${today()}.json`;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  store.markExported();
}

function renderNotFound() {
  show(`<section class="empty"><h1>Nicht gefunden</h1>
    <p class="muted">Diese Seite gibt es nicht (mehr).</p>
    <a class="btn btn-primary" href="#/">Zur Startseite</a></section>`);
}

// ---------------------------------------------------------------------
//  Ereignisse
// ---------------------------------------------------------------------

function startThema(id, set) {
  let list = fragen.filter((f) => f.themen.includes(id));
  if (set === 'neu') list = list.filter((f) => !store.last(f.id));
  if (set === 'falsch') list = list.filter((f) => store.last(f.id) && store.last(f.id)[1] < 1);
  startSession({ kind: 'thema', mode: 'ueben', titel: themaName(id), qids: shuffle(list.map((f) => f.id)), back: `#/themen/${id}` });
}

const actions = {
  bereich(el) {
    bereichFilter = el.dataset.id;
    if (el.dataset.go) go(el.dataset.go);
    else route();
  },
  export() { downloadBackup(); route(); },
  discard() {
    if (!confirm('Laufende Sitzung verwerfen? Antworten daraus werden nicht gespeichert.')) return;
    store.setActive(null);
    route();
  },
  'start-wdh'(el) {
    let list = wrongQuestions(el.dataset.bereich || '');
    if (el.dataset.thema) list = list.filter((q) => q.themen.includes(el.dataset.thema));
    const titel = el.dataset.thema ? `Wiederholen: ${themaName(el.dataset.thema)}` : 'Falsche Fragen wiederholen';
    startSession({ kind: 'wdh', mode: 'ueben', titel, qids: shuffle(list.map((q) => q.id)), back: '#/wiederholen' });
  },
  'start-mix'(el) {
    const bereich = el.dataset.bereich ?? bereichFilter;
    const list = fragenIn(bereich);
    const titel = bereich ? `${bereichById.get(bereich).kurz}: gemischt` : 'Alle Fächer gemischt';
    startSession({ kind: 'mix', mode: 'ueben', titel, qids: shuffle(list.map((q) => q.id)), back: bereich ? `#/fach/${bereich}` : '#/' });
  },
  'start-random'(el) {
    const bereich = el.dataset.bereich || '';
    const ids = shuffle(fragenIn(bereich).map((q) => q.id)).slice(0, 20);
    const titel = `Zufallsprüfung${bereich ? ` ${bereichById.get(bereich).kurz}` : ''}`;
    startSession({ kind: 'mix', mode: 'pruefung', titel, qids: ids, limitMin: 0, back: bereich ? `#/fach/${bereich}` : '#/' });
  },
  'start-thema'(el) { startThema(el.dataset.id, el.dataset.set); },
  'start-run-wrong'(el) {
    const r = store.runById(el.dataset.id);
    const ids = r.qids.filter((id) => (r.scores[id] ?? 0) < 1 && frageById.has(id));
    startSession({ kind: 'wdh', mode: 'ueben', titel: `Falsche aus: ${r.titel}`, qids: ids, back: `#/ergebnis/${r.id}` });
  },
  'formeln-verdecken'() {
    formelnVerdeckt = !formelnVerdeckt;
    try { localStorage.setItem('formeln-verdeckt', formelnVerdeckt ? '1' : '0'); } catch { /* egal */ }
    const suche = view.querySelector('[data-input="formelsuche"]')?.value || '';
    renderFormeln();
    if (suche) { view.querySelector('[data-input="formelsuche"]').value = suche; filterFormeln(suche); }
  },
  'formel-zeigen'(el) {
    if (formelnVerdeckt) el.classList.toggle('is-offen');
  },
  reset() {
    if (!confirm('Wirklich den kompletten Lernstand löschen? Das lässt sich nur mit einer Sicherung rückgängig machen.')) return;
    store.resetAll();
    renderDaten('Lernstand gelöscht.');
  },

  // --- in der Sitzung ---
  mc(el, s) {
    const q = currentQ(s);
    const i = Number(el.dataset.i);
    let a = Array.isArray(s.answers[q.id]) ? [...s.answers[q.id]] : [];
    if (q.richtig.length === 1) a = a[0] === i ? [] : [i];
    else a = a.includes(i) ? a.filter((x) => x !== i) : [...a, i].sort();
    s.answers[q.id] = a;
    store.saveActive();
    renderSession();
  },
  row(el, s) {
    const q = currentQ(s);
    const row = Number(el.dataset.row);
    const v = Number(el.dataset.v);
    const n = (q.typ === 'reihenfolge' ? q.schritte : q.aussagen).length;
    const a = Array.isArray(s.answers[q.id]) ? [...s.answers[q.id]] : Array(n).fill(null);
    if (a[row] === v) a[row] = null;
    else {
      // In einer Reihenfolge kommt jede Nummer nur einmal vor
      if (q.typ === 'reihenfolge') a.forEach((x, i) => { if (x === v) a[i] = null; });
      a[row] = v;
    }
    s.answers[q.id] = a;
    store.saveActive();
    renderSession();
  },
  next(el, s) { s.idx = Math.min(s.idx + 1, s.qids.length - 1); store.saveActive(); renderSession(); window.scrollTo(0, 0); },
  prev(el, s) { s.idx = Math.max(s.idx - 1, 0); store.saveActive(); renderSession(); window.scrollTo(0, 0); },
  goto(el, s) { s.idx = Number(el.dataset.i); s.navOpen = false; store.saveActive(); renderSession(); window.scrollTo(0, 0); },
  flag(el, s) { const id = currentQ(s).id; s.flags[id] = !s.flags[id]; store.saveActive(); renderSession(); },
  submit(el, s) { submitExam(s); },
  leave() { pauseActive(); go('#/'); },
  check(el, s) { checkCurrent(s); },
  dontknow(el, s) { checkCurrent(s, true); },
  show(el, s) { s.shown[currentQ(s).id] = true; store.saveActive(); renderSession(); },
  selfrate(el, s) {
    const p = Number(el.dataset.p);
    const q = s.phase === 'bewertung'
      ? frageById.get(s.qids.find((id) => frageById.get(id).typ === 'offen' && s.scores[id] === undefined))
      : currentQ(s);
    const score = pts(q) ? p / pts(q) : 0;
    s.scores[q.id] = score;
    if (s.phase !== 'bewertung') store.record(q.id, score, s.kind);
    store.saveActive();
    renderSession();
    window.scrollTo(0, 0);
  },
  finish(el, s) { finish(s); },
  end(el, s) {
    const done = Object.keys(s.scores).length;
    if (done && done < s.qids.length && !confirm(`Runde beenden? ${plural(done, 'Frage', 'Fragen')} gehen in die Auswertung ein.`)) return;
    finish(s);
  },
};

view.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el || el.disabled) return;
  const fn = actions[el.dataset.action];
  if (!fn) return;
  e.preventDefault();
  fn(el, store.active());
});

view.addEventListener('toggle', (e) => {
  if (e.target.classList?.contains('qnav')) {
    const s = store.active();
    if (s) { s.navOpen = e.target.open; store.saveActive(); }
  }
}, true);

view.addEventListener('input', (e) => {
  const el = e.target;
  const kind = el.dataset?.input;
  if (kind === 'formelsuche') { filterFormeln(el.value); return; }
  if (kind === 'zahl' || kind === 'offen') {
    const s = store.active();
    const q = currentQ(s);
    s.answers[q.id] = el.value;
    store.saveActive();
    view.querySelector('[data-action="check"]')?.toggleAttribute('disabled', !isAnswered(q, el.value));
    const cell = view.querySelector('.qcell.is-current');
    cell?.classList.toggle('is-answered', isTouched(q, el.value));
  }
});

view.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.dataset?.input === 'zahl') {
    e.preventDefault();
    const btn = view.querySelector('[data-action="check"]:not([disabled]), [data-action="next"]');
    btn?.click();
  }
});

view.addEventListener('change', async (e) => {
  const el = e.target;
  if (el.dataset?.input === 'examDate') {
    store.setSettings({ examDate: el.value });
  }
  if (el.matches('[data-form="setup"] input[name="mode"]')) {
    sessionStorage.setItem('setup-mode', el.value);
    el.form.querySelector('.limit').disabled = el.value === 'ueben';
  }
  if (el.dataset?.input === 'import' && el.files?.[0]) {
    const replace = view.querySelector('[data-input="replace"]')?.checked;
    if (replace && !confirm('Den jetzigen Lernstand durch die Sicherung ersetzen?')) { el.value = ''; return; }
    try {
      const res = store.importData(await el.files[0].text(), replace);
      renderDaten(`Sicherung eingelesen: ${plural(res.fragen, 'Frage', 'Fragen')}, ${plural(res.runs, 'Ergebnis', 'Ergebnisse')}.`);
    } catch (err) {
      renderDaten(esc(err.message));
    }
  }
});

view.addEventListener('submit', (e) => {
  const form = e.target;
  if (form.dataset.form !== 'setup') return;
  e.preventDefault();
  const k = klausurById.get(form.dataset.id);
  const data = new FormData(form);
  const mode = data.get('mode');
  const minutes = Number(data.get('minutes'));
  const limitMin = mode === 'pruefung' && data.get('limit') && minutes > 0 ? minutes : 0;
  startSession({
    kind: 'klausur',
    mode,
    titel: k.titel,
    klausurId: k.id,
    limitMin,
    qids: k.fragen.map((f) => f.id),
    back: `#/klausuren/${k.id}`,
  });
});

// ---------------------------------------------------------------------
//  Navigation
// ---------------------------------------------------------------------

const TAB_FOR = { '': '', fach: '', klausuren: 'klausuren', ergebnis: 'klausuren', themen: 'themen', wiederholen: 'themen', formeln: 'formeln', analyse: 'analyse', daten: 'daten' };

function route() {
  clearInterval(timer);
  const [, page = '', arg, sub] = location.hash.split('/');
  if (page !== 'lernen') {
    pauseActive();
    document.body.classList.remove('in-session');
  }
  const tab = TAB_FOR[page];
  document.querySelectorAll('.tabs a').forEach((a) => {
    a.classList.toggle('is-active', a.getAttribute('href') === `#/${tab ?? '-'}`);
  });
  switch (page) {
    case '': renderHome(); break;
    case 'fach': renderFach(arg); break;
    case 'klausuren': if (arg) renderKlausurSetup(arg); else renderKlausuren(); break;
    case 'themen': if (arg) renderThema(arg); else renderThemen(); break;
    case 'wiederholen': renderWiederholen(); break;
    case 'formeln': renderFormeln(); break;
    case 'analyse': renderAnalyse(); break;
    case 'daten': renderDaten(); break;
    case 'lernen': renderSession(); break;
    case 'ergebnis': renderErgebnis(arg, sub); break;
    default: renderNotFound();
  }
  if (page !== 'lernen') window.scrollTo(0, 0);
}

store.load();
// Bittet den Browser, die Daten nicht automatisch zu löschen
navigator.storage?.persist?.().catch(() => {});
window.addEventListener('hashchange', route);
window.addEventListener('pagehide', pauseActive);
window.addEventListener('pageshow', (e) => { if (e.persisted) route(); });
route();
