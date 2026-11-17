// Text aus den Klausurdateien in HTML umwandeln.

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

function inline(s) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])_(.+?)_(?=[\s).,:;!?]|$)/g, '$1<em>$2</em>');
}

const isTableLine = (line) => /^\s*\|.*\|\s*$/.test(line);
const isSeparator = (line) => /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line);
const cells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
// Zahlen und Beträge rechtsbündig setzen
const numeric = (cell) => {
  const c = cell.replace(/\*\*/g, '').trim();
  return /^[-+−]?[\d.,\s]+\s*(€|%|Stück|Stk\.|m³)?$/.test(c) && /\d/.test(c);
};

function table(lines) {
  const rows = lines.filter((l) => !isSeparator(l)).map(cells);
  const hasHead = lines.length > 1 && isSeparator(lines[1]);
  const head = hasHead ? rows.shift() : null;
  const td = (tag) => (c) => `<${tag}${numeric(c) ? ' class="is-num"' : ''}>${inline(c)}</${tag}>`;
  return `<div class="table-wrap"><table>${head ? `<thead><tr>${head.map(td('th')).join('')}</tr></thead>` : ''}`
    + `<tbody>${rows.map((r) => `<tr>${r.map(td('td')).join('')}</tr>`).join('')}</tbody></table></div>`;
}

/**
 * Kleines Markdown: Absätze (Leerzeile), Listen ("- " und "1. "), Tabellen
 * mit senkrechten Strichen, Rechenblöcke ("> "), **fett**, _kursiv_ und
 * Zeilenumbrüche.
 */
export function fmt(text) {
  if (!text) return '';
  const blocks = String(text).trim().split(/\n\s*\n/);
  return blocks.map((block) => {
    const lines = block.split('\n');
    const out = [];
    let list = null;
    let para = [];
    let tbl = [];
    let calc = [];
    const flushList = () => {
      if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li>${i}</li>`).join('')}</${list.tag}>`);
      list = null;
    };
    const flushPara = () => {
      if (para.length) out.push(`<p>${para.join('<br>')}</p>`);
      para = [];
    };
    const flushTable = () => {
      if (tbl.length) out.push(table(tbl));
      tbl = [];
    };
    const flushCalc = () => {
      if (calc.length) out.push(`<div class="calc">${calc.join('<br>')}</div>`);
      calc = [];
    };
    for (const line of lines) {
      if (isTableLine(line)) {
        flushPara(); flushList();
        tbl.push(line);
        continue;
      }
      flushTable();
      const quote = line.match(/^\s*> ?(.*)$/);
      if (quote) {
        flushPara(); flushList();
        calc.push(inline(quote[1]));
        continue;
      }
      flushCalc();
      const ul = line.match(/^\s*[-•] (.*)$/);
      const ol = line.match(/^\s*\d+\. (.*)$/);
      if (ul || ol) {
        flushPara();
        const tag = ul ? 'ul' : 'ol';
        if (list && list.tag !== tag) flushList();
        list ||= { tag, items: [] };
        list.items.push(inline((ul || ol)[1]));
      } else {
        flushList();
        para.push(inline(line));
      }
    }
    flushTable(); flushCalc(); flushList(); flushPara();
    return out.join('');
  }).join('');
}

/** Erste Zeile eines Textes ohne Formatierung, für Listen. */
export function firstLine(text, max = 110) {
  const line = String(text || '').trim().split('\n')[0].replace(/\*\*/g, '').replace(/^> /, '');
  return line.length > max ? `${line.slice(0, max - 1).trimEnd()} …` : line;
}
