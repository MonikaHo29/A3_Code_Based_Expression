let cygnus, aquila; // Variablen für die Bilder
let cygnusAlpha = 50; // Anfangs geringe Deckkraft für Cygnus
let aquilaAlpha = 50; // Anfangs geringe Deckkraft für Aquila
let clickCount = 0; // Zähler für Klicks

function preload() {
  // Bilder vorab laden
  cygnus = loadImage("graphics/webp/const/const_cygnus.webp");
  aquila = loadImage("graphics/webp/const/const_aquila.webp");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0); // Schwarzer Hintergrund

  // Zeichne Cygnus mit aktueller Deckkraft
  tint(255, cygnusAlpha);
  image(cygnus, 100, 100, 200, 200);

  // Zeichne Aquila mit aktueller Deckkraft
  tint(255, aquilaAlpha);
  image(aquila, 300, 200, 200, 200);
}

function mousePressed() {
  // Erhöhe bei jedem Klick die Deckkraft eines Sternbilds
  if (clickCount % 2 === 0) {
    // Cygnus leuchtet stärker
    cygnusAlpha = min(cygnusAlpha + 50, 255); // Begrenze auf maximal 255
  } else {
    // Aquila leuchtet stärker
    aquilaAlpha = min(aquilaAlpha + 50, 255); // Begrenze auf maximal 255
  }
  clickCount++;
}












