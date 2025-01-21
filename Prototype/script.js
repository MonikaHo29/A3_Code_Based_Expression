let fallingStars = [];
let isSKeyPressed = false;
let starGenerationSpeed = 0; // Variable für die Geschwindigkeit, mit der Sterne erzeugt werden

class FallingStar {
  constructor() {
    // Startposition des fallenden Sterns (über den gesamten Bildschirmbereich)
    this.x = random(0, width);  // Zufällige x-Position über den gesamten Bildschirm
    this.y = random(0, height / 2); // Startet von oben, aber nicht zu weit oben
    this.size = random(20, 40);  // Länge der Sternschnuppe
    this.speedX = random(5, 10);  // Anfangsgeschwindigkeit in x-Richtung
    this.speedY = random(10, 15); // Anfangsgeschwindigkeit in y-Richtung
    this.alpha = random(150, 255); // Zufällige Transparenz für den Glimmer-Effekt
  }

  // Funktion, um den fallenden Stern zu zeichnen
  display() {
    // Definiere die Start- und Endpunkte der Linie, die den Stern darstellt
    let startX = this.x;
    let startY = this.y;
    let endX = this.x + this.size * cos(PI / 4);  // Berechnet den Endpunkt der Linie in x-Richtung
    let endY = this.y + this.size * sin(PI / 4);  // Berechnet den Endpunkt der Linie in y-Richtung

    // Zeichne eine Linie, die den Stern darstellt
    stroke(255, this.alpha);  // Weiße Farbe mit Transparenz
    strokeWeight(2);  // Linienbreite
    line(startX, startY, endX, endY);  // Zeichne die Linie (Sternschnuppe)

    // Verringere die Transparenz (um den leuchtenden Effekt zu erzeugen)
    this.alpha -= 5;  // Transparenz wird bei jedem Schritt verringert

    // Wenn die Transparenz zu niedrig wird, setze die Position zurück
    if (this.alpha <= 0) {
      this.x = random(0, width);  // Setzt die x-Position zurück
      this.y = random(0, height / 2); // Setzt die y-Position zurück
      this.alpha = random(150, 255); // Setzt die Transparenz zurück
    }
  }

  // Funktion, die den Stern nach unten und seitlich bewegt
  update() {
    this.x += this.speedX;  // Verschiebt den Stern nach rechts
    this.y += this.speedY;  // Verschiebt den Stern nach unten

    // Wenn der Stern das untere oder rechte Ende erreicht hat, wird er zurückgesetzt
    if (this.x > width || this.y > height) {
      this.x = random(0, width);  // Setzt die x-Position zurück
      this.y = random(0, height / 2); // Setzt die y-Position zurück
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);  // Setze den Hintergrund auf schwarz

  // Wenn die S-Taste gedrückt wird, füge ständig mehr Sterne hinzu
  if (isSKeyPressed) {
    starGenerationSpeed += 0.1;  // Verringere die Rate der Sterne (weniger Sterne werden erzeugt)

    // Generiere neue Sterne (jetzt weniger Sterne, da die Rate verringert wurde)
    for (let i = 0; i < starGenerationSpeed; i++) {
      fallingStars.push(new FallingStar());
    }
  }

  // Aktualisiere und zeige alle fallenden Sterne
  for (let i = 0; i < fallingStars.length; i++) {
    fallingStars[i].update();
    fallingStars[i].display();
  }
}

// Funktion für die "S"-Taste
function keyPressed() {
  if (key === 'S' || key === 's') {
    isSKeyPressed = true;  // Markiere die S-Taste als gedrückt
  }
}

// Funktion, wenn die "S"-Taste losgelassen wird
function keyReleased() {
  if (key === 'S' || key === 's') {
    isSKeyPressed = false;  // Markiere die S-Taste als nicht gedrückt
  }
}
