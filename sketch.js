/*------------------------------------------FOR LOADING PAGE--------------------------------------------------*/
var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 3000);
}
function showPage() {
  document.getElementById("myDiv").style.display = "block";
}


// Variablen für den Sternenhimmel
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
    stars[i].twinkle();
    stars[i].display();
  }
}

function mousePressed() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].starClick(mouseX, mouseY);
    stars[i].lineDraw();
  }
}

function fadeOutElement(elementId) {
    const element = document.getElementById(elementId) || document.querySelector(`.${elementId}`);
    if (!element) return;

    let opacity = 1; // Start-Opacity
    const fadeInterval = setInterval(() => {
        if (opacity <= 0) {
            clearInterval(fadeInterval); // Stop the interval when opacity reaches 0
            element.style.display = "none"; // Remove element from the layout
        } else {
            opacity -= 0.02; // Reduce opacity gradually
            element.style.opacity = opacity; // Set new opacity
        }
    }, 30); // Reduce opacity every 30ms
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    // Sterne aktualisieren
    skyHeight = height * 0.8;
    stars = [];
    for (let i = 0; i < 300; i++) {
        stars.push({
            x: random(width),
            y: random(skyHeight),
            size: random([2, 4])
        });
    }
}



function keyPressed() {
    if (keyCode === 32) { // 32 = Leertaste
        // Elemente ausblenden
        fadeOutElement("loader");
        fadeOutElement("title");
        fadeOutElement("spacebar-hint");
        fadeOutElement("infoBox");

        // Zeige Rechteck, Text und Buttons nach dem Ausblenden
        setTimeout(() => {
            const rectangle = document.getElementById("rectangle");
            const newText = document.getElementById("infoBox2");
            const buttonContainer = document.getElementById("button-container");
            const constellationContainer = document.getElementById("constellationContainer");
            const starsContainer = document.getElementById("starsContainer");
            const canvaText = document.getElementById("canvaText");
            const starCanvas = document.getElementById("starCanvas");

            // Elemente einblenden
            rectangle.style.display = "block";
            newText.style.display = "block";
            buttonContainer.style.display = "flex";
            canvaText.style.display = "flex";
            constellationContainer.style.display = "flex";
            starsContainer.style.display = "flex";
            starCanvas.style.display = "flex";

            rectangle.style.transition = "opacity 1s ease-in-out";
            newText.style.transition = "opacity 1s ease-in-out";
            buttonContainer.style.transition = "opacity 1s ease-in-out";
            canvaText.style.transition = "opacity 1s ease-in-out";
            constellationContainer.style.display = "opacity 1s ease-in-out";
            starsContainer.style.display = "opacity 1s ease-in-out";
            starCanvas.style.display = "opacity 1s ease-in-out";

            rectangle.style.opacity = 1;
            newText.style.opacity = 1;
            buttonContainer.style.opacity = 1;
            canvaText.style.opacity = 1;
            constellationContainer.style.opacity = 0.1;
            starsContainer.style.opacity = 0.1;
            starCanvas.style.display =  0.1;

            setupButtonFunctions();
        }, 2000); // Nach 2 Sekunden
    }
}

function keyPressed() {
    if (keyCode === 32) { // Spacebar pressed
        isSpacePressed = true;

        // Hide elements using fade-out
        fadeOutElement("loader");
        fadeOutElement("title");
        fadeOutElement("spacebar-hint");
        fadeOutElement("infoBox");

        // After fade-out completes, show the homepage elements
        setTimeout(() => {
            const rectangle = document.getElementById("rectangle");
            const newText = document.getElementById("infoBox2");
            const buttonContainer = document.getElementById("button-container");
            const constellationContainer = document.getElementById("constellationContainer");
            const starsContainer = document.getElementById("starsContainer");

            // Display the homepage elements
            rectangle.style.display = "block";
            newText.style.display = "block";
            buttonContainer.style.display = "flex";
            constellationContainer.style.display = "flex";
            starsContainer.style.display = "flex";
        }, 500); // Wait for the fade-out effect before showing new content
    }
}
