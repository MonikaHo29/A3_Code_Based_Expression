let points = []; // Speichert Punkte für das Sternenbild
let canvas, ctx;

document.addEventListener("DOMContentLoaded", () => {
  // Initialisiere den Canvas
  canvas = document.getElementById("starCanvas");
  ctx = canvas.getContext("2d");

  // Setze die tatsächliche Größe des Canvas
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  // Hintergrund füllen
  clearCanvas();

  // Mausinteraktion: Punkt setzen
  canvas.addEventListener("mousedown", (event) => {
    handleCanvasClick(event);
  });
});

function clearCanvas() {
  ctx.fillStyle = "black"; // Vollständig schwarzer Hintergrund
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleCanvasClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  addPoint(x, y);
  draw();
}

function addPoint(x, y) {
  points.push({ x, y });
}

function draw() {
  // Canvas leeren und Hintergrund neu zeichnen
  clearCanvas();

  // Setze Leuchteffekte
  ctx.shadowBlur = 15; // Intensität des Glows
  ctx.shadowColor = "rgba(255, 255, 255, 0.8)"; // Glow-Farbe

  // Punkte und Linien zeichnen
  ctx.strokeStyle = "white"; // Farbe der Linien
  ctx.fillStyle = "white"; // Farbe der Punkte
  ctx.lineWidth = 2; // Breite der Linien

  for (let i = 0; i < points.length; i++) {
    // Punkt zeichnen
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, 6, 0, Math.PI * 2); // Größerer Punkt für besseren Glow
    ctx.fill();

    // Linie zum vorherigen Punkt zeichnen
    if (i > 0) {
      ctx.beginPath();
      ctx.moveTo(points[i - 1].x, points[i - 1].y);
      ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
    }
  }

  // Glow-Effekte zurücksetzen, um zukünftige Zeichnungen nicht zu beeinflussen
  ctx.shadowBlur = 0;
}
