class Constellation {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.d = random(2, 4); // Kleinere Kreise
        this.alpha = 100; // Anfangs geringere Deckkraft
        this.clicked = false;
    }

    display() {
        // Schattierung hinzufügen
        drawingContext.shadowBlur = this.clicked ? 15 : 0;
        drawingContext.shadowColor = 'rgba(255, 255, 255, 0.6)';

        // Keine Kontur
        noStroke();

        // Weiße Farbe mit variabler Deckkraft
        fill(255, 255, 255, this.alpha);
        ellipse(this.x, this.y, this.d);
        drawingContext.shadowBlur = 0;
    }

    starClick(mx, my) {
        if (dist(mx, my, this.x, this.y) < this.d / 2 + 3.8) {
            this.clicked = !this.clicked;
            this.alpha = 255; // Setze die Deckkraft auf 100%, um das Leuchten zu aktivieren
        }
    }
    lineDraw() {
        if (lines.length == 4) {
            stroke(239, 255, 253, 95);
            line(lines[0], lines[1], lines[2], lines[3]);
        }   lines.splice(0, 2);
    }



}