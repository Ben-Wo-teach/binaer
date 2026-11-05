// ===== Einstellungen =====
const MAX_ZAHL = 0b10000000;   // größte Binärzahl: 10000000 (= 128 dezimal)
const PUNKTE_RICHTIG = 2;     // Pluspunkte bei richtiger Antwort
const PUNKTE_FALSCH = -2;     // Minuspunkte bei falscher Antwort
const ANZEIGEDAUER_MS = 1000; // so lange leuchtet das richtige Feld grün

// ===== Spielzustand =====
let punkte = 0;
let anzahlRichtig = 0;
let anzahlFalsch = 0;
let richtigeZahl = 0;
let gesperrt = false; // verhindert Mehrfachklicks während der Rückmeldung

// ===== HTML-Elemente =====
const elBinaer = document.getElementById("binaerzahl");
const elAntworten = document.getElementById("antworten");
const elPunkte = document.getElementById("punkte");
const elRichtig = document.getElementById("richtig");
const elFalsch = document.getElementById("falsch");
const elNeustart = document.getElementById("neustart");

// Zufallszahl von min bis max (jeweils einschließlich)
function zufall(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Liste zufällig mischen (Fisher-Yates)
function mischen(liste) {
  for (let i = liste.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [liste[i], liste[j]] = [liste[j], liste[i]];
  }
  return liste;
}

// Drei falsche, aber plausible Antworten erzeugen
function falscheAntworten(korrekt) {
  const falsche = new Set();

  // 1. Ideen: ein Bit der Binärzahl "umkippen" (typischer Rechenfehler)
  const bitstellen = mischen([0, 1, 2, 3, 4, 5, 6]);
  for (const stelle of bitstellen) {
    if (falsche.size >= 2) break;
    const kandidat = korrekt ^ (1 << stelle);
    if (kandidat !== korrekt && kandidat >= 0 && kandidat <= MAX_ZAHL) {
      falsche.add(kandidat);
    }
  }

  // 2. Mit Zahlen in der Nähe bzw. Zufallszahlen auffüllen
  while (falsche.size < 3) {
    const kandidat = Math.random() < 0.5
      ? korrekt + zufall(-5, 5)
      : zufall(0, MAX_ZAHL);
    if (kandidat !== korrekt && kandidat >= 0 && kandidat <= MAX_ZAHL) {
      falsche.add(kandidat);
    }
  }

  return [...falsche];
}

// Neue Aufgabe anzeigen
function neueAufgabe() {
  gesperrt = false;
  richtigeZahl = zufall(1, MAX_ZAHL);
  elBinaer.textContent = richtigeZahl.toString(2);

  const antworten = mischen([richtigeZahl, ...falscheAntworten(richtigeZahl)]);

  elAntworten.innerHTML = "";
  for (const zahl of antworten) {
    const knopf = document.createElement("button");
    knopf.className = "antwort";
    knopf.textContent = zahl;
    knopf.dataset.wert = zahl;
    knopf.addEventListener("click", () => antwortPruefen(knopf));
    elAntworten.appendChild(knopf);
  }
}

// Geklickte Antwort auswerten
function antwortPruefen(knopf) {
  if (gesperrt) return;
  gesperrt = true;

  const istRichtig = Number(knopf.dataset.wert) === richtigeZahl;

  if (istRichtig) {
    punkte += PUNKTE_RICHTIG;
    anzahlRichtig++;
  } else {
    punkte += PUNKTE_FALSCH;
    anzahlFalsch++;
  }
  anzeigeAktualisieren(istRichtig);

  // Rückmeldung: das richtige Antwortfeld leuchtet kurz grün auf
  const knoepfe = elAntworten.querySelectorAll(".antwort");
  knoepfe.forEach((k) => {
    k.disabled = true;
    if (Number(k.dataset.wert) === richtigeZahl) {
      k.classList.add("korrekt");
    }
  });

  setTimeout(neueAufgabe, ANZEIGEDAUER_MS);
}

// Punktestand und Statistik aktualisieren
function anzeigeAktualisieren(istRichtig) {
  elPunkte.textContent = punkte;
  elRichtig.textContent = anzahlRichtig;
  elFalsch.textContent = anzahlFalsch;

  if (istRichtig !== undefined) {
    elPunkte.classList.remove("plus", "minus");
    elPunkte.classList.add(istRichtig ? "plus" : "minus");
    setTimeout(() => elPunkte.classList.remove("plus", "minus"), ANZEIGEDAUER_MS);
  }
}

// Spiel zurücksetzen
function neuesSpiel() {
  punkte = 0;
  anzahlRichtig = 0;
  anzahlFalsch = 0;
  anzeigeAktualisieren();
  neueAufgabe();
}

elNeustart.addEventListener("click", neuesSpiel);
neuesSpiel();
