class Constellation {
    constructor() {
      this.x = random(width);
      this.y = random(height);
      this.d = random(2, 6.5);
      this.clicked = false;
    }
  
    display() {
      noStroke();
      if (this.clicked == true) {
        ellipse(this.x, this.y, this.d + 10);
      } else {
        ellipse(this.x, this.y, this.d);
      }
    }
  
    twinkle() {
      this.r = random(110, 255);
      this.g = random(207, 254);
      this.b = random(204, 255);
      fill(this.r, this.g, this.b);
    }
  
    starClick(mx, my) {
      if (dist(mx, my, this.x, this.y) < this.d / 2 + 3.8) {
        this.clicked = !this.clicked;
        lines.push(this.x, this.y);
      }
    }
  
    lineDraw() {
      if (lines.length == 4) {
        stroke(239, 255, 253, 95);
        line(lines[0], lines[1], lines[2], lines[3]);
        lines.splice(0, 2);
      }
    }
  }