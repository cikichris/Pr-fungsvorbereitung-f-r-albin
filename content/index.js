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

// Kundenkommunikation im E-Commerce
import kk2020s from './klausuren/kk-2020-sommer.js';
import kk2020_21w from './klausuren/kk-2020-21-winter.js';
import kk2021s from './klausuren/kk-2021-sommer.js';
import kk2021_22w from './klausuren/kk-2021-22-winter.js';
import kk2022s from './klausuren/kk-2022-sommer.js';
import kk2022_23w from './klausuren/kk-2022-23-winter.js';
import kk2023s from './klausuren/kk-2023-sommer.js';
import kk2023_24w from './klausuren/kk-2023-24-winter.js';
import kk2024s from './klausuren/kk-2024-sommer.js';
import kk2024_25w from './klausuren/kk-2024-25-winter.js';
import kk2025s from './klausuren/kk-2025-sommer.js';
import kk2025_26 from './klausuren/kk-2025-26.js';
import kk2026 from './klausuren/kk-2026.js';

export const KLAUSUREN = [
  gp2020s, gp2020w, gp2021s, gp2021w, gp2022s, gp2022w, gp2023s,
  gp2023w, gp2024s, gp2024w, gp2025s, gp2025w, gp2026,
  kk2020s, kk2020_21w, kk2021s, kk2021_22w, kk2022s, kk2022_23w, kk2023s,
  kk2023_24w, kk2024s, kk2024_25w, kk2025s, kk2025_26, kk2026,
];
