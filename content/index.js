// =====================================================================
//  Verzeichnis aller Klausuren
//
//  Neue Klausur einpflegen:
//    1. Datei content/klausuren/<id>.js anlegen (Aufbau siehe README.md),
//       Musterlösungen als PDF lassen sich mit tools/import/ umwandeln
//    2. hier importieren und in KLAUSUREN eintragen
//    3. node tools/check-content.mjs ausführen
//
//  Wichtig: Die id einer Frage nie nachträglich ändern. An ihr hängt der
//  gespeicherte Lernstand.
// =====================================================================

// Geschäftsprozesse im E-Commerce
import gp2020s from './klausuren/gp-2020-sommer.js';
import gp2020w from './klausuren/gp-2020-21-winter.js';
import gp2021s from './klausuren/gp-2021-sommer.js';
import gp2021w from './klausuren/gp-2021-22-winter.js';
import gp2022s from './klausuren/gp-2022-sommer.js';
import gp2022w from './klausuren/gp-2022-23-winter.js';
import gp2023s from './klausuren/gp-2023-sommer.js';
import gp2023w from './klausuren/gp-2023-24-winter.js';
import gp2024s from './klausuren/gp-2024-sommer.js';
import gp2024w from './klausuren/gp-2024-25-winter.js';
import gp2025s from './klausuren/gp-2025-sommer.js';
import gp2025w from './klausuren/gp-2025-26.js';
import gp2026 from './klausuren/gp-2026.js';

export const KLAUSUREN = [
  gp2020s, gp2020w, gp2021s, gp2021w, gp2022s, gp2022w, gp2023s,
  gp2023w, gp2024s, gp2024w, gp2025s, gp2025w, gp2026,
];
