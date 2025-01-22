// Sternenschauer mit HTML, JavaScript und p5.js

let starburst = []; // Array für Sternenschauer
let isRPressed = false; // Zustand der Taste R
let isFixed = false; // Zustand, ob der Schauer fixiert ist
let direction = 1; // Richtung des Schauers: 1 = links oben nach rechts unten, -1 = oben rechts nach unten links
let colorMode = 0; // 0: Weiß, 1: Blau/Gelb, 2: Lila/Pink
let isPaused = false; // Zustand, ob der Sternenschauer gestoppt ist
let followMouse = false; // Zustand, ob der Schauer der Maus folgt

function draw() {
  if (isPaused) return; // Wenn pausiert, nichts zeichnen

  // Hintergrund mit einem leichten Fade-Effekt aktualisieren
  fill(0, 50);
  rect(0, 0, width, height);

  // Sterne hinzufügen, wenn R gedrückt wird oder der Schauer fixiert ist
  if (isRPressed || isFixed) {
    for (let i = 0; i < 5; i++) {
      starburst.push(createStar());
    }
  }

  // Sterne aktualisieren und zeichnen
  for (let i = starburst.length - 1; i >= 0; i--) {
    let star = starburst[i];
    star.opacity += 10; // Erhöhe die Opazität für den Leuchteffekt
    if (star.opacity > 255) star.opacity = 255;

    // Farbe basierend auf dem aktuellen Farbmodus
    switch (colorMode) {
      case 1:
        stroke(random(0, 100), random(100, 200), random(200, 255), star.opacity); // Blaue/Gelbe Töne
        break;
      case 2:
        stroke(random(200, 255), random(0, 100), random(100, 200), star.opacity); // Lila/Pinke Töne
        break;
      default:
        stroke(255, 255, 255, star.opacity); // Weiße Farbe
    }

    strokeWeight(2);
    line(star.x, star.y, star.x + star.size * 3 * direction, star.y + star.size * 3); // Schauer zeichnen

    // Bewegung der Sterne
    if (followMouse) {
      // Sterne bewegen sich in Richtung der Maus
      let angle = atan2(mouseY - star.y, mouseX - star.x);
      star.x += star.speed * cos(angle);
      star.y += star.speed * sin(angle);
    } else {
      // Standardbewegung
      star.x += star.speed * direction;
      star.y += star.speed;
    }

    // Entferne den Stern, wenn er außerhalb des Bildschirms ist
    if (star.x < -50 || star.x > width + 50 || star.y > height + 50) {
      starburst.splice(i, 1);
    }
  }
}

function keyPressed() {
  if (key === 'R' || key === 'r') {
    isRPressed = true;
  }
  if (key === 'F' || key === 'f') {
    isFixed = !isFixed;
  }
  if (key === 'Q' || key === 'q') {
    colorMode = (colorMode === 1) ? 0 : 1; // Toggle zwischen Weiß und Blau/Gelb
  }
  if (key === 'E' || key === 'e') {
    colorMode = (colorMode === 2) ? 0 : 2; // Toggle zwischen Weiß und Lila/Pink
  }
  if (key === 'S' || key === 's') {
    isPaused = !isPaused; // Sternenschauer pausieren oder fortsetzen
  }
  if (key === 'A' || key === 'a') {
    direction = -1; // Richtung ändern: oben rechts nach unten links
  }
  if (key === 'D' || key === 'd') {
    direction = 1; // Richtung ändern: oben links nach unten rechts
  }
  if (key === 'W' || key === 'w') {
    followMouse = !followMouse; // Schauer folgt der Maus oder nicht
  }
}

function keyReleased() {
  if (key === 'R' || key === 'r') {
    isRPressed = false;
  }
}

function createStar() {
  return {
    x: random(-50, width + 50), // Startpunkt zufällig über die gesamte Breite
    y: random(-50, height + 50), // Startpunkt zufällig über die gesamte Höhe
    size: random(1, 2), // Kleinere Striche
    speed: random(2, 4), // Geschwindigkeit der Sterne
    opacity: 0 // Anfangs unsichtbar
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




