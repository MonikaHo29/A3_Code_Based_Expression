var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 3000);
}
function showPage() {
  document.getElementById("myDiv").style.display = "block";
}

function keyPressed() {
  if (key === ' ' || key === 'Spacebar') {
    // Elemente verstecken
    document.getElementById('loader').style.display = 'none';
    document.querySelector('h1').style.display = 'none';
    document.getElementById('infoBox1').style.display = 'none';
    document.getElementById('spacebar-hint').style.display = 'none';

    // Neue Elemente einblenden
    document.getElementById('newContent').style.display = 'block';
  }

  if (key === 'r' || key === 'R') {
    // Ursprüngliche Elemente einblenden
    document.getElementById('loader').style.display = 'block';
    document.querySelector('h1').style.display = 'block';
    document.getElementById('infoBox1').style.display = 'block';
    document.getElementById('spacebar-hint').style.display = 'block';

    // Neue Elemente ausblenden
    document.getElementById('newContent').style.display = 'none';
  }
}


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