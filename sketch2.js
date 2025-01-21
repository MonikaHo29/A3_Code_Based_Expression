let stars = [];
let lines = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < width * 0.22; i++) {
    stars.push(new Constellation());
  }
}

function draw() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].display();
  }
}

function mousePressed() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].starClick(mouseX, mouseY);
    stars[i].lineDraw();
  }
}