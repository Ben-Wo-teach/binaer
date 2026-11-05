# Binär-Quiz

Ein kleines Übungsspiel im Browser zum Umrechnen von Binärzahlen ins Dezimalsystem.

## Spielregeln

- Oben wird eine Binärzahl zwischen `1` und `1000000` (= 64 dezimal) angezeigt.
- Darunter stehen vier Dezimalzahlen. Nur eine davon ist richtig.
- **Richtige Antwort:** +2 Punkte
- **Falsche Antwort:** −2 Punkte
- Nach jedem Klick leuchtet das richtige Antwortfeld kurz grün auf, danach kommt die nächste Aufgabe.
- Mit „Neues Spiel“ wird der Punktestand zurückgesetzt.

Die falschen Antworten sind absichtlich ähnlich: Meist unterscheiden sie sich von der richtigen Zahl um genau ein Bit (z. B. 13 statt 9), also um einen typischen Rechenfehler.

## Starten

Einfach `index.html` im Browser öffnen. Es wird nichts installiert.

### Mit GitHub Pages veröffentlichen

1. Neues Repository auf GitHub anlegen und die Dateien `index.html`, `style.css`, `script.js` und `README.md` hochladen.
2. Im Repository auf **Settings → Pages** gehen.
3. Unter *Branch* `main` und den Ordner `/ (root)` auswählen und speichern.
4. Nach etwa einer Minute ist das Spiel unter `https://<benutzername>.github.io/<repository>/` erreichbar.

## Anpassen

Am Anfang von `script.js` lassen sich die Einstellungen ändern:

| Konstante          | Bedeutung                                  | Standard          |
|--------------------|--------------------------------------------|-------------------|
| `MAX_ZAHL`         | größte Zahl (binär geschrieben)            | `0b1000000` (64)  |
| `PUNKTE_RICHTIG`   | Punkte für eine richtige Antwort           | `2`               |
| `PUNKTE_FALSCH`    | Punkte für eine falsche Antwort            | `-2`              |
| `ANZEIGEDAUER_MS`  | Dauer des grünen Aufleuchtens in ms        | `1000`            |

## Dateien

```
index.html   Aufbau der Seite
style.css    Gestaltung und grüne Leucht-Animation
script.js    Spiellogik (Aufgaben, Antworten, Punkte)
README.md    diese Beschreibung
```
