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
let skyHeight;
let isSpacePressed = false; // Status für Spacebar-Interaktion

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");
    canvas.style("position", "absolute");

    skyHeight = height * 0.8;

    // Generiere Sterne
    for (let i = 0; i < 300; i++) {
        stars.push({
            x: random(width),
            y: random(skyHeight),
            size: random([2, 4])
        });
    }
}

function draw() {
    if (!isSpacePressed) {
        noStroke();

        // Zeichne Sterne
        for (let star of stars) {
            fill(255);
            circle(star.x, star.y, star.size);
        }
    }
}

function keyPressed() {
    if (keyCode === 32) { // Leertaste gedrückt
        isSpacePressed = true;

        // Elemente ausblenden mit Fade-Out
        fadeOutElement("loader");
        fadeOutElement("title");
        fadeOutElement("spacebar-hint");
        fadeOutElement("infoBox");
    }
}

// Funktion für flüssiges Ausblenden (Fade-Out)
function fadeOutElement(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let opacity = 1; // Start-Opacity
    const fadeInterval = setInterval(() => {
        if (opacity <= 0) {
            clearInterval(fadeInterval); // Stoppe das Intervall, wenn Opacity 0 ist
            element.style.display = "none"; // Entferne Element aus dem Layout
        } else {
            opacity -= 0.0; // Reduziere die Opacity schrittweise
            element.style.opacity = opacity; // Setze die neue Opacity
        }
    }, 30); // Alle 30ms wird die Opacity reduziert
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


function fadeOutElement(elementId) {
  const element = document.getElementById(elementId) || document.querySelector(`.${elementId}`);
  if (!element) return;

  let opacity = 1; // Start-Opacity
  const fadeInterval = setInterval(() => {
      if (opacity <= 0) {
          clearInterval(fadeInterval); // Stoppe das Intervall, wenn Opacity 0 ist
          element.style.display = "none"; // Entferne Element aus dem Layout
      } else {
          opacity -= 0.02; // Reduziere die Opazität schrittweise
          element.style.opacity = opacity; // Setze die neue Opazität
      }
  }, 30); // Alle 30ms
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

            // Elemente einblenden
            rectangle.style.display = "block";
            newText.style.display = "block";
            buttonContainer.style.display = "flex";
            canvaText.style.display = "flex";
            constellationContainer.style.display = "flex";
            starsContainer.style.display = "flex";

            rectangle.style.transition = "opacity 1s ease-in-out";
            newText.style.transition = "opacity 1s ease-in-out";
            buttonContainer.style.transition = "opacity 1s ease-in-out";
            canvaText.style.transition = "opacity 1s ease-in-out";
            constellationContainer.style.display = "opacity 1s ease-in-out";
            starsContainer.style.display = "opacity 1s ease-in-out";

            rectangle.style.opacity = 1;
            newText.style.opacity = 1;
            buttonContainer.style.opacity = 1;
            canvaText.style.opacity = 1;
            constellationContainer.style.opacity = 0.1;
            starsContainer.style.opacity = 0.1;

            setupButtonFunctions();
        }, 2000); // Nach 2 Sekunden
    }
}


// Funktion für die spezifischen Aktionen der Buttons
function setupButtonFunctions() {
    // Home-Button: Zurück zur Startseite
    document.getElementById("home-button").onclick = () => {
        window.location.href = "index.html"; // Ersetze durch die URL der Startseite
    };

    // Info-Button: Zeige ein Info-Popup
    document.getElementById("info-button").onclick = () => {
        alert("This is an information popup. Add your details here!");
    };

    // Sound-Button: Hintergrundsound stumm schalten oder aktivieren
    let soundMuted = false; // Status des Sounds
    document.getElementById("sound-button").onclick = () => {
        soundMuted = !soundMuted; // Toggle den Soundstatus
        if (soundMuted) {
            console.log("Sound muted"); // Hier kannst du den Sound stummschalten
        } else {
            console.log("Sound unmuted"); // Hier kannst du den Sound aktivieren
        }
    };
}