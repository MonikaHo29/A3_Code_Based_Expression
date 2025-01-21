let stars = [];
let lines = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < width * 0.22; i++) {
    stars.push(new Constellation());
  }
    // Hier erstellst du die Sternbilder mit IDs und den entsprechenden Sternen
    stars.push(new Constellation('cassiopea', 'star1', 'cassiopea'));
    stars.push(new Constellation('orion', 'star2', 'orion'));
    stars.push(new Constellation('pegasus', 'star3', 'pegasus'));
    stars.push(new Constellation('const1', 'star4', 'const1'));
    stars.push(new Constellation('const2', 'star5', 'const2'));
    stars.push(new Constellation('const3', 'star6', 'const3'));
    stars.push(new Constellation('virgo', 'star7', 'virgo'));
    stars.push(new Constellation('const4', 'star8', 'const4'));
    stars.push(new Constellation('delphinus', 'star9', 'delphinus'));
  }
  

  function draw() {
    for (let i = 0; i < stars.length; i++) {
      stars[i].display();
    }
  }
// Funktion, um die Deckkraft der Sterne und Sternbilder zu ändern
function toggleStarVisibility(starId, constellationId) {
  const starElement = document.getElementById(starId);
  const constellationElement = document.getElementById(constellationId);

  // Wenn der Stern angeklickt wurde, ändere die Deckkraft auf 100%
  if (starElement && constellationElement) {
    starElement.style.opacity = 1;  // Voll sichtbar
    constellationElement.style.opacity = 1;  // Voll sichtbar
  }
}


function mousePressed() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].starClick(mouseX, mouseY);
    stars[i].lineDraw();
  }
}

function keyPressed() {
  // Überprüfen, ob die Leertaste gedrückt wurde
  if (key === ' ' || key === 'Spacebar') {
    // Elemente verstecken
    document.getElementById('infoBox1').style.display = 'none';
    document.getElementById('spacebar-hint').style.display = 'none';
    document.getElementById('loader').style.display = 'none';

    // Hier kannst du neue Elemente einblenden oder eine andere Logik auslösen
    document.getElementById('myDiv').style.display = 'block'; // Das neue Design wird sichtbar
  }
}


// Funktion, um die Deckkraft der Sterne und Sternbilder zu ändern
function toggleStarVisibility(starId, constellationId) {
  const starElement = document.getElementById(starId);
  const constellationElement = document.getElementById(constellationId);

  // Wenn der Stern angeklickt wurde, ändere die Deckkraft auf 100%
  if (starElement && constellationElement) {
    starElement.style.opacity = 1;  // Voll sichtbar
    constellationElement.style.opacity = 1;  // Voll sichtbar
  }
}


let fallingStars = [];  // Array für die fallenden Sterne
let starRainActive = false;  // Zustand, ob der Sternenregen aktiv ist

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialisiere die fallenden Sterne
  for (let i = 0; i < 50; i++) {
    fallingStars.push(new FallingStar());  // 50 fallende Sterne
  }
}

function draw() {
  background(0);  // Dunkler Hintergrund für den Sternenhimmel

  // Sterne anzeigen und aktualisieren, wenn der Sternenregen aktiv ist
  if (starRainActive) {
    for (let i = 0; i < fallingStars.length; i++) {
      fallingStars[i].update();  // Position der Sterne ändern
      fallingStars[i].display(); // Zeichne den Stern
    }
  }

  // Deine anderen Zeichnungsfunktionen für Sterne und Sternbilder
  for (let i = 0; i < stars.length; i++) {
    stars[i].display();
  }
}

function keyPressed() {
  // Wenn die Taste 'S' gedrückt wird, aktiviere oder deaktiviere den Sternenregen
  if (key === 'S' || key === 's') {
    starRainActive = !starRainActive;  // Toggle den Zustand
  }
}
