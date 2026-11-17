# Prüfungsvorbereitung E-Commerce

Lern-App für die Abschlussprüfung **Kaufmann/Kauffrau im E-Commerce** (Umschulung). Grundlage sind Altklausuren, die Aufgabe für Aufgabe eingepflegt werden. Die App ist fürs Handy gebaut und läuft komplett im Browser.

- **Start:** Stand auf einen Blick, Countdown zur Prüfung, falsche Fragen wiederholen, letzte Ergebnisse.
- **Klausuren:** eine Altklausur komplett durchgehen,
  - als **Prüfung**: alle Fragen beantworten, abgeben, danach Auswertung mit Punkten und IHK-Note, optional mit Zeitlimit,
  - oder zum **Üben**: Lösung und Erklärung nach jeder Frage.
- **Themen:** Fragen aus allen Klausuren nach Thema üben (alle, nur neue, nur falsche) oder mit Lösung durchblättern.
- **Wiederholen:** Jede Frage, die zuletzt falsch oder nur teilweise richtig war, landet hier, bis sie einmal voll richtig beantwortet ist.
- **Analyse:** Welche Themen und Fragetypen kommen wie oft vor, mit Anteil an den Punkten und in wie vielen Klausuren.
- **Daten:** Prüfungstermin, Sicherung herunterladen und einlesen, Lernstand löschen.

Multiple Choice, Zuordnung, Reihenfolge und Rechenaufgaben wertet die App automatisch aus (wie bei der IHK ganz oder gar nicht). Bei freien Antworten zeigt sie einen Lösungsvorschlag, und man vergibt sich die Punkte selbst.

## Wo liegt was?

| Teil | Ort |
|---|---|
| App und Klausuren (`content/`) | dieses Repository |
| Webseite | GitHub Pages, aus dem Zweig `main` |
| Lernstand | nur im Browser (localStorage) des jeweiligen Geräts |
| Original-PDFs | nicht im Repository (`*.pdf` steht in `.gitignore`) |

Es gibt keinen Server und keine Anmeldung. Der Lernstand lässt sich unter **Daten** als JSON-Datei sichern und auf demselben oder einem anderen Gerät wieder einlesen. Beim Einlesen wird standardmäßig zusammengeführt, es geht also nichts verloren. Die Startseite erinnert an eine Sicherung, wenn die letzte älter als eine Woche ist.

Wichtig fürs iPhone: Safari löscht Daten von Webseiten, die sieben Tage nicht geöffnet wurden. Deshalb die Seite über **Teilen → Zum Home-Bildschirm** hinzufügen und von dort öffnen.

## Suchmaschinen

Jede Seite enthält `<meta name="robots" content="noindex, nofollow, …">`. Suchmaschinen, die sich daran halten, nehmen die Seite nicht auf. Die `robots.txt` hilft zusätzlich nur, wenn die Seite unter einer eigenen Domain läuft. Bei `https://<name>.github.io/<repo>/` liest der Crawler nur die `robots.txt` der Hauptdomain.

Zwei Grenzen: Ein öffentliches Repository ist auf GitHub selbst sichtbar und kann dort gefunden werden. Und `noindex` verhindert nur die Aufnahme in Suchergebnisse, nicht den Aufruf. Wer die Adresse kennt, kann die Seite öffnen.

## Einrichten

1. Den Zweig mit der App per Pull Request nach `main` übernehmen.
2. Im Repository **Settings → Pages** öffnen.
3. Bei **Source** „Deploy from a branch“ wählen, Branch `main`, Ordner `/ (root)`, dann **Save**.
4. Nach etwa einer Minute ist die App unter `https://cikichris.github.io/Pr-fungsvorbereitung-f-r-albin/` erreichbar.

## Neue Klausur einpflegen

1. PDF im Chat hochladen (nicht ins Repository).
2. Claude legt `content/klausuren/<id>.js` an, zum Beispiel `gp-2024-sommer.js`, und trägt die Datei in `content/index.js` ein.
3. Prüfen: `node tools/check-content.mjs`
4. Pull Request nach `main` mergen.

Die `id` einer Frage darf danach nicht mehr geändert werden. An ihr hängt der gespeicherte Lernstand.

### Aufbau einer Klausurdatei

Ein vollständiges Beispiel mit allen Fragetypen steht in [`content/klausuren/beispiel.js`](content/klausuren/beispiel.js).

```js
export default {
  id: 'gp-2024-sommer',          // a-z, 0-9, -
  titel: 'Geschäftsprozesse Sommer 2024',
  bereich: 'gp',                 // siehe content/themen.js
  termin: 'Sommer 2024',
  dauer: 150,                    // Minuten, Vorschlag fürs Zeitlimit
  situation: '…',                // Ausgangssituation der ganzen Prüfung (optional)
  anlagen: [{ titel: 'Anlage 1', text: '…' }],   // optional
  aufgaben: [
    {
      nr: '1', titel: '…', situation: '…',       // Situation der Aufgabe (optional)
      fragen: [ /* siehe unten */ ],
    },
  ],
};
```

Jede Frage hat `id` (beginnt mit der Klausur-id), `nr`, `typ`, `thema` (eine id oder eine Liste), `punkte`, `frage` und meist eine `erklaerung`. Dazu je nach Typ:

| typ | Felder | Auswertung |
|---|---|---|
| `mc` | `optionen: [...]`, `richtig: [1]` (Zählung ab 0, mehrere möglich) | automatisch |
| `zuordnung` | `optionen: [...]`, `aussagen: [{ text, richtig: 2 }]` | automatisch |
| `reihenfolge` | `schritte: [{ text, pos: 3 }]` in der Reihenfolge der Prüfung | automatisch |
| `zahl` | `ergebnis: 184.8`, `einheit: '€'`, `toleranz: 0.01` | automatisch |
| `offen` | `loesung: '…'` (Lösungsvorschlag) | Selbstbewertung in Punkten |

Texte können Absätze, Listen (`- `), Tabellen mit `|` sowie `**fett**` enthalten.

Prüfungsbereiche und Themen stehen in [`content/themen.js`](content/themen.js). Neue Themen dort ergänzen. Die Analyse zählt nur echte Klausuren. Die Beispielklausur kann gelöscht werden, sobald welche eingepflegt sind.

## Entwicklung

Kein Build-Schritt. Zum lokalen Ansehen genügt ein einfacher Webserver:

```
python3 -m http.server 8000
```

Prüfungen:

```
node tools/check-content.mjs    # Klausurdateien
node --test tools/test.mjs      # Auswertung, Analyse, Sicherung
```
