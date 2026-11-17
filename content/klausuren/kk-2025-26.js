// AP2 Kundenkommunikation Winter 2025/26
// Fragen und Musterlösungen aus der Vorlage, automatisch übernommen
// (Konverter: tools/import). Frage-ids nicht ändern.
export default {
  id: 'kk-2025-26',
  titel: 'Winter 2025/26',
  bereich: 'kk',
  sortierung: 2025.5,
  quelle: 'Musterlösung',
  aufgaben: [
    {
      nr: '1',
      titel: `Verträge aus dem Online-Vertrieb abwickeln`,
      fragen: [
        {
          id: 'kk-2025-26-01',
          nr: '1.1',
          typ: 'offen',
          art: 'anwenden',
          thema: 'stoerungen',
          frage: `Welche Kaufvertragsstörungen werden durch den Käufer und welche durch den Verkäufer verursacht?`,
          loesung: `| Kaufvertragsstörung | Verursacht durch | Erklärung |
|---|---|---|
| Zahlungsverzug | Käufer | Er bezahlt nicht rechtzeitig. |
| Lieferungsverzug | Verkäufer | Er liefert nicht rechtzeitig. |
| Mangelhafte Lieferung | Verkäufer | Er liefert eine Ware mit Mängeln. |
| Annahmeverzug | Käufer | Er nimmt die ordnungsgemäß angebotene Ware nicht an. |

**Merksatz:** Der Verkäufer muss ordnungsgemäß liefern. Der Käufer muss bezahlen und die Ware annehmen.`,
        },
        {
          id: 'kk-2025-26-02',
          nr: '1.2.1',
          typ: 'offen',
          art: 'anwenden',
          thema: 'maengel',
          frage: `Kann die Globetrader GmbH bei mangelhaften Fahrradanhängern sofort vom Kaufvertrag zurücktreten? Besteht ein Recht auf Nacherfüllung?

**Situation:** Von zehn gelieferten Fahrradanhängern haben zwei eine nicht reparierbare Federung. Zwei weitere weisen kleine Kratzer auf.`,
          loesung: `Ein **sofortiger Rücktritt vom gesamten Kaufvertrag ist im beschriebenen Fall grundsätzlich nicht möglich**. Zunächst muss der Verkäufer die Möglichkeit zur Nacherfüllung erhalten.

Die Globetrader GmbH kann **Nacherfüllung** verlangen. Diese umfasst:

- **Nachbesserung:** Der Verkäufer beseitigt den Mangel.
- **Ersatzlieferung:** Der Verkäufer liefert eine mangelfreie Ware.

Bei der nicht reparierbaren Federung kommt eine **Ersatzlieferung** infrage. Bei kleinen Kratzern ist eine **Nachbesserung** möglich.

**Wichtig:** Eine nicht mögliche Reparatur bedeutet nicht automatisch, dass auch eine Ersatzlieferung unmöglich ist.`,
        },
        {
          id: 'kk-2025-26-03',
          nr: '1.2.2',
          typ: 'offen',
          art: 'anwenden',
          thema: 'maengel',
          frage: `Welche Voraussetzung muss die Globetrader GmbH erfüllen, damit sie ihre Mängelrechte gegenüber dem Lieferanten behält?`,
          loesung: `Da beide Unternehmen Kaufleute sind und der Kauf zu ihrem Handelsgeschäft gehört, gilt die **Untersuchungs- und Rügeobliegenheit nach § 377 HGB**.

Die Globetrader GmbH muss:

1. Die Ware **unverzüglich nach der Lieferung angemessen untersuchen**.
1. Dabei erkennbare Mängel **unverzüglich beim Verkäufer anzeigen**.
1. Versteckte Mängel **unverzüglich nach ihrer Entdeckung anzeigen**.

Wird ein Mangel nicht rechtzeitig gerügt, gilt die Ware hinsichtlich dieses Mangels grundsätzlich als genehmigt. Die entsprechenden Mängelrechte können verloren gehen.

**Merksatz:** Ware prüfen – Mangel entdecken – unverzüglich rügen.

**Genauer als in deiner Lösung:** Eine Mängelrüge muss gesetzlich nicht zwingend schriftlich erfolgen. Eine schriftliche Anzeige ist aber zur Beweissicherung sinnvoll.`,
        },
        {
          id: 'kk-2025-26-04',
          nr: '1.2.3',
          typ: 'offen',
          art: 'anwenden',
          thema: 'maengel',
          frage: `Welche Rechte sollte die Globetrader GmbH bei der defekten Federung und bei den Kratzern verlangen? Begründe deine Vorschläge.`,
          loesung: `**Defekte, nicht reparierbare Federung:**

Die Globetrader GmbH sollte eine **Ersatzlieferung von zwei mangelfreien Fahrradanhängern** verlangen.

**Begründung:** Eine Reparatur ist ausgeschlossen. Die Anhänger müssen für den vereinbarten Offroad-Einsatz geeignet sein.

**Kleine Kratzer:**

Die Globetrader GmbH sollte zunächst eine **Nachbesserung**, beispielsweise die Ausbesserung der beschädigten Oberfläche, verlangen.

**Begründung:** Die Kratzer sind ein geringfügiger Mangel, der möglicherweise behoben werden kann. Alternativ kann mit dem Verkäufer ein **Preisnachlass** vereinbart werden.

Ein gesetzlicher Anspruch auf **Minderung** besteht, wenn die dafür erforderlichen Voraussetzungen erfüllt sind, etwa nach erfolgloser Nacherfüllung. Ein Rücktritt allein wegen unerheblicher Kratzer ist ausgeschlossen.`,
        },
        {
          id: 'kk-2025-26-05',
          nr: '1.3.1',
          typ: 'offen',
          art: 'anwenden',
          thema: 'zahlung',
          frage: `Ab wann befindet sich der Kunde Michael Kruse im Zahlungsverzug?

**Situation:**

- Lieferung und Rechnungszugang: **8. Oktober 2025**
- Rechnungsbetrag: **10.000 € brutto**
- Zahlungsziel: **22. Oktober 2025**
- Zahlung ist nicht erfolgt.`,
          loesung: `**Nach der vorliegenden Lösung befindet sich der Kunde ab dem 23. Oktober 2025 im Zahlungsverzug.**

Die Lösung behandelt den 22. Oktober als verbindlich festgelegten Zahlungstermin. Bei einem verbindlich nach dem Kalender bestimmten Zahlungstermin ist grundsätzlich keine Mahnung erforderlich.

**Merksatz:** Verbindlicher Zahlungstermin überschritten → Verzug grundsätzlich ab dem nächsten Tag.

**Für die allgemeine Rechtsregel:** Ein lediglich einseitig auf die Rechnung gedrucktes Datum ist nicht automatisch ein vereinbarter Zahlungstermin. Die Prüfungslösung setzt die Verbindlichkeit hier voraus.`,
        },
        {
          id: 'kk-2025-26-06',
          nr: '1.3.2',
          typ: 'offen',
          art: 'rechnen',
          thema: 'zahlung',
          frage: `Wie hoch ist der Verzugszinssatz bei einem Basiszinssatz von 1,27 %, wenn beide Beteiligten Unternehmer sind?`,
          loesung: `Bei einer Entgeltforderung ohne Verbraucherbeteiligung beträgt der gesetzliche Zuschlag **neun Prozentpunkte über dem Basiszinssatz**.

> Verzugszinssatz = Basiszinssatz + 9 Prozentpunkte
> 1,27 % + 9 Prozentpunkte = **10,27 % pro Jahr**

**Merksatz:**

- Verbraucher beteiligt: **fünf Prozentpunkte** über dem Basiszinssatz.
- Kein Verbraucher beteiligt: bei Entgeltforderungen **neun Prozentpunkte** über dem Basiszinssatz.

Die **1,27 % sind die Vorgabe dieser Prüfungsaufgabe**.`,
        },
        {
          id: 'kk-2025-26-07',
          nr: '1.4',
          typ: 'offen',
          art: 'rechnen',
          thema: 'zahlung',
          frage: `Wie berechnet man die Verzugszinsen für 10.000 € bei einem Zinssatz von 10,27 % und 35 Verzugstagen?`,
          loesung: `Bei der vorgegebenen taggenauen Berechnung mit 365 Tagen gilt:

> Verzugszinsen = Rechnungsbetrag × Zinssatz × Verzugstage ÷ (100 × 365)

Werte einsetzen:

> Verzugszinsen = 10.000 × 10,27 × 35 ÷ (100 × 365)
> Verzugszinsen = **98,48 €**

**Wichtig:** Erst das Endergebnis auf zwei Nachkommastellen runden.`,
        },
        {
          id: 'kk-2025-26-08',
          nr: '1.5',
          typ: 'offen',
          art: 'anwenden',
          thema: 'zahlung',
          frage: `Wie läuft ein dreistufiges außergerichtliches Mahnverfahren ab?`,
          loesung: `**1. Stufe: Freundliche Zahlungserinnerung**

Der Kunde wird höflich auf die offene Rechnung hingewiesen und um Zahlung gebeten.

**Inhalt:**

- Rechnungsnummer und Rechnungsdatum
- Offener Betrag
- Freundliche Zahlungsaufforderung

**Ziel:** Ein mögliches Versehen klären und die Kundenbeziehung erhalten.

**2. Stufe: Deutliche Mahnung**

Der Kunde wird bestimmt zur Zahlung aufgefordert.

**Inhalt:**

- Hinweis auf die weiterhin offene Rechnung
- Konkrete Zahlungsfrist
- Gegebenenfalls Hinweis auf Verzugszinsen und erstattungsfähige Kosten

**Ziel:** Die Dringlichkeit verdeutlichen.

**3. Stufe: Letzte Zahlungsaufforderung**

Dem Kunden wird eine letzte Frist gesetzt.

**Inhalt:**

- Eindeutige letzte Zahlungsaufforderung
- Letzter Zahlungstermin
- Ankündigung weiterer Schritte, beispielsweise eines gerichtlichen Mahnverfahrens

**Ziel:** Die Forderung möglichst noch außergerichtlich durchsetzen.

**Merksatz:** Freundlich erinnern → deutlich mahnen → letzte Frist setzen.

**Wichtig:** Drei Mahnstufen sind eine betriebliche Vorgehensweise und keine allgemeine gesetzliche Pflicht.`,
        },
        {
          id: 'kk-2025-26-09',
          nr: '1.6',
          typ: 'offen',
          art: 'anwenden',
          thema: 'zahlung',
          frage: `Welche zwei Voraussetzungen müssen für ein gerichtliches Mahnverfahren vorliegen?`,
          loesung: `1. **Eine bestimmte Geldforderung in Euro liegt vor.** Die Forderung muss für ihre Durchsetzung fällig sein. Im Prüfungsfall geht es um die unbezahlten **10.000 €**.
1. **Es steht keine noch zu erbringende Gegenleistung entgegen.** Der Anspruch darf nicht von einer Gegenleistung abhängen, die der Antragsteller noch nicht erbracht hat. Im Fall wurde die Ware bereits geliefert.

**Merksatz:** Bestimmte Geldforderung – fällig – eigene Leistung erbracht.`,
        },
      ],
    },
    {
      nr: '2',
      titel: `Kundenkommunikation gestalten`,
      fragen: [
        {
          id: 'kk-2025-26-10',
          nr: '2.1',
          typ: 'offen',
          art: 'anwenden',
          thema: 'kanaele',
          frage: `Welche drei Erfolgsfaktoren sollte ein Unternehmen bei der Auswahl eines Kommunikationskanals berücksichtigen?`,
          loesung: `**1. Eignung für die Zielgruppe**

Der Kanal muss von den gewünschten Kunden genutzt werden.

**Beispiel:** Geschäftskunden können über E-Mail angesprochen werden. Für eine Zielgruppe, die sich auf Instagram informiert, kann dort ein Serviceangebot sinnvoll sein.

**Begründung:** Nur über einen passenden Kanal erreicht das Unternehmen seine Kunden zuverlässig.

**2. Eignung für Kommunikationsziel und Inhalt**

Der Kanal muss zur Botschaft und zum gewünschten Ergebnis passen.

**Beispiel:** Eine ausführliche Anleitung eignet sich für die Website. Eine kurze Versandinformation lässt sich direkt per E-Mail oder App-Nachricht übermitteln.

**Begründung:** Die Information soll verständlich und passend vermittelt werden.

**3. Wirtschaftlichkeit und verfügbare Ressourcen**

Kosten, Zeitaufwand und Personalbedarf müssen berücksichtigt werden.

**Beispiel:** Ein Live-Chat benötigt Mitarbeiter, die während der angegebenen Servicezeiten reagieren können.

**Begründung:** Der Kanal muss dauerhaft zuverlässig betreut werden können.

**Merksatz:** Passt der Kanal zu den Kunden, zur Botschaft und zu unseren Möglichkeiten?`,
        },
        {
          id: 'kk-2025-26-11',
          nr: '2.2.1',
          typ: 'offen',
          art: 'erklaeren',
          thema: 'kanaele',
          frage: `Was unterscheidet Push- und Pull-Kommunikation hinsichtlich des Initiators?`,
          loesung: `| Kommunikationsart | Wer beginnt? | Erklärung | Beispiel |
|---|---|---|---|
| **Push** | Unternehmen | Das Unternehmen übermittelt Informationen aktiv an Kunden. | Versand einer Lieferstatusmeldung |
| **Pull** | Kunde | Der Kunde ruft Informationen selbst ab oder fragt sie an. | Aufrufen einer FAQ-Seite |

**Merksatz:**
**Push = Unternehmen schickt.**
**Pull = Kunde holt.**`,
        },
        {
          id: 'kk-2025-26-12',
          nr: '2.2.2',
          typ: 'offen',
          art: 'anwenden',
          thema: 'kanaele',
          frage: `Nenne und beschreibe jeweils eine Möglichkeit für Pull- und Push-Kommunikation bei der Globetrader GmbH.`,
          loesung: `**Pull-Kommunikation: Servicebereich auf der Website**

Die Globetrader GmbH stellt dort Bedienungsanleitungen, Pflegehinweise und FAQs zu Outdoor-Produkten bereit.

Kunden rufen diese Informationen **selbstständig bei Bedarf** ab.

**Push-Kommunikation: Automatische Versandinformation**

Die Globetrader GmbH informiert Kunden nach dem Versand aktiv per E-Mail über den Lieferstatus und stellt einen Trackinglink bereit.

Kunden erhalten die Information, **ohne vorher danach fragen zu müssen**.`,
        },
        {
          id: 'kk-2025-26-13',
          nr: '2.3',
          typ: 'offen',
          art: 'anwenden',
          thema: 'servicekennzahlen',
          frage: `Mit welchen Kennzahlen lässt sich der Erfolg einer proaktiven Servicestrategie messen?`,
          loesung: `**a) Kundenzufriedenheit und Feedback: Customer Satisfaction Score – CSAT**

Nach einem Servicekontakt werden Kunden gefragt, wie zufrieden sie waren, beispielsweise auf einer Skala von 1 bis 5.

**Aussage:** Die Kennzahl zeigt, wie zufrieden Kunden mit dem Service beziehungsweise der Kommunikation sind.

Bei der Auswertung als Anteil zufriedener Kunden gilt:

> CSAT in % = zufriedene Kunden ÷ alle antwortenden Kunden × 100

Welche Bewertungen als „zufrieden“ zählen, wird vorher festgelegt.

**b) Engagement der Zielgruppe: Interaktionsrate**

Sie setzt Interaktionen wie Likes, Kommentare und geteilte Beiträge ins Verhältnis zu einer festgelegten Bezugsgröße, beispielsweise der Reichweite.

> Interaktionsrate in % = Interaktionen ÷ Reichweite × 100

**Aussage:** Sie zeigt, wie stark die erreichten Personen auf Inhalte reagieren.

**c) Kostenreduzierung: Rückgang der Serviceanfragen**

Das Unternehmen vergleicht die Anzahl der Serviceanfragen vor und nach Einführung der proaktiven Kommunikation.

**Beispiel:** Durch automatische Versandinformationen gehen weniger Nachfragen zum Lieferstatus ein.

**Aussage:** Weniger vermeidbare Anfragen können den Bearbeitungsaufwand und damit Kosten senken. Für den Vergleich müssen Zeitraum und Geschäftsvolumen berücksichtigt werden.`,
        },
        {
          id: 'kk-2025-26-14',
          nr: '2.4',
          typ: 'offen',
          art: 'anwenden',
          thema: 'socialservice',
          frage: `Mit welchen drei Maßnahmen kann die Globetrader GmbH das Teilen ihrer Inhalte in sozialen Medien fördern?`,
          loesung: `1. **Nützliche Inhalte veröffentlichen:** Beispielsweise eine Packliste für Wanderungen oder Pflegetipps für Outdoor-Ausrüstung. Hilfreiche Inhalte geben Nutzern einen Anlass, sie weiterzuempfehlen.
1. **Zum Teilen auffordern:** Beispielsweise mit dem Hinweis: „Teile diese Checkliste mit deinem nächsten Wanderpartner.“ Die Aufforderung macht die gewünschte Handlung deutlich.
1. **Das Teilen einfach machen:** Beispielsweise durch gut sichtbare Teilen-Buttons auf der Website oder im Blog. Wenige Schritte erleichtern die Weiterverbreitung.

**Merksatz:** Mehrwert bieten – zum Teilen auffordern – Teilen erleichtern.`,
        },
        {
          id: 'kk-2025-26-15',
          nr: '2.5',
          typ: 'offen',
          art: 'erklaeren',
          thema: 'socialservice',
          frage: `Was sind ein Kundenforum und ein Unternehmensblog? Welche Interaktionen ermöglichen sie?`,
          loesung: `**Kundenforum**

Ein Kundenforum ist eine **Online-Plattform zum Austausch zwischen Kunden und gegebenenfalls Mitarbeitern**. Viele Inhalte werden von den Nutzern selbst erstellt.

**Möglichkeiten der Interaktion:**

- Fragen zu Produkten stellen
- Auf Fragen anderer Kunden antworten
- Erfahrungen und Anwendungstipps austauschen
- Probleme und Lösungsmöglichkeiten diskutieren
- Dem Unternehmen Rückmeldungen geben

**Beispiel:** Ein Kunde fragt, wie er einen Fahrradanhänger montiert. Andere Kunden oder Mitarbeiter helfen ihm.

**Nutzen:** Das Forum stärkt die Gemeinschaft und kann den Kundenservice entlasten.

**Unternehmensblog**

Ein Unternehmensblog ist ein **redaktioneller Bereich, in dem das Unternehmen regelmäßig Beiträge veröffentlicht**.

**Mögliche Inhalte:**

- Ratgeber und Anwendungstipps
- Produktvorstellungen
- Fachwissen
- Unternehmensneuigkeiten

**Möglichkeiten der Interaktion:**

- Beiträge kommentieren, sofern Kommentare freigeschaltet sind
- Rückfragen stellen
- In der Kommentarspalte diskutieren
- Beiträge in sozialen Medien teilen

**Beispiel:** Unter einem Beitrag zur Zeltpflege stellen Kunden Fragen zur Reinigung.

**Merksatz:**
**Forum = Nutzer tauschen sich aus.**
**Blog = Unternehmen veröffentlicht Beiträge, auf die Leser reagieren können.**`,
        },
        {
          id: 'kk-2025-26-16',
          nr: '2.6',
          typ: 'offen',
          art: 'anwenden',
          thema: 'socialservice',
          frage: `Welche drei Kommunikationsregeln sollten Mitarbeiter im Kundenforum beachten?`,
          loesung: `1. **Freundlich, respektvoll und sachlich bleiben:** Auch bei Kritik höflich antworten, Kunden ernst nehmen und persönliche Angriffe vermeiden.
1. **Zeitnah, ehrlich und verbindlich antworten:** Korrekte Informationen geben, nächste Schritte erklären und nur Zusagen machen, die eingehalten werden können.
1. **Vertrauliche Daten schützen:** Keine Kundendaten, Bestellinformationen oder internen Informationen öffentlich nennen. Persönliche Einzelfälle über einen geeigneten privaten Kontaktweg klären.

**Merksatz:** Freundlich bleiben – zuverlässig antworten – vertrauliche Daten schützen.`,
        },
      ],
    },
  ],
};
