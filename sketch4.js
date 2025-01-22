


/*-------Variable for drawing cinstellation------------*/
let stars = []; // Array for stars
let connections = []; // Array for connections
let numberOfStars = 200; // Number of stars
let lastSelectedStar = null; // Previously selected star
let showUI = true; // Flag to control visibility of UI elements
let clickCounter = 0; // Counter to track mouse clicks
let uiOpacity = 255; // Opacity for smooth fade-out transition
let transitioning = false; // Flag for transition state

/*-------Variable for starburst------------*/
let starburst = []; // Array für Sternenschauer
let isRPressed = false; // Zustand der Taste R
let isFixed = false; // Zustand, ob der Schauer fixiert ist
let direction = 1; // Richtung des Schauers: 1 = links oben nach rechts unten, -1 = oben rechts nach unten links
let colorMode = 0; // 0: Weiß, 1: Blau/Gelb, 2: Lila/Pink
let isPaused = false; // Zustand, ob der Sternenschauer gestoppt ist
let followMouse = false; // Zustand, ob der Schauer der Maus folgt

function setup() {
  createCanvas(windowWidth, windowHeight); // Full window size
  noStroke(); // No border for circles

  // Generate stars
  generateStars();

  // Hide UI elements initially
  const logo = document.getElementById("logo");
  const infoBox = document.getElementById("infoBox1");
  const spaceHint = document.getElementById("spacebar-hint");

  if (logo && infoBox && spaceHint) {
    logo.style.display = "block";
    infoBox.style.display = "block";
    spaceHint.style.display = "block";
  }

  // Hide constellation and star elements initially
  const constellationElements = document.getElementById("constellationContainer").children;
  const starElements = document.getElementById("starsContainer").children;

  for (let el of constellationElements) {
    el.style.opacity = 0;
  }
  for (let el of starElements) {
    el.style.opacity = 0;
  }
}

function draw() {
  if (showUI) {

    if (transitioning) {
      uiOpacity -= 10; // Reduce opacity for fade-out effect
      if (uiOpacity <= 0) {
        uiOpacity = 0;
        transitioning = false; // End transition
        showUI = false; // Hide UI completely
      }
    }

    // Display UI elements with fade-out effect
    const logo = document.getElementById("logo");
    const infoBox = document.getElementById("infoBox1");
    const spaceHint = document.getElementById("spacebar-hint");

    if (logo && infoBox && spaceHint) {
      logo.style.opacity = uiOpacity / 255;
      infoBox.style.opacity = uiOpacity / 255;
      spaceHint.style.opacity = uiOpacity / 255;

      if (uiOpacity === 0) {
        logo.style.display = "none";
        infoBox.style.display = "none";
        spaceHint.style.display = "none";
      }
    }

  } else {
    background("#000016"); // Set background color for interactive mode

    // Draw stars
    for (let star of stars) {
      if (star.isStar) {
        fill(255); // White color for stars
        drawingContext.shadowBlur = 20; // Add glow effect
        drawingContext.shadowColor = "white";
        drawStar(star.x, star.y, star.r, star.r * 2, 5); // Draw a star shape
      } else {
        if (star.glow) {
          fill(255);
          drawingContext.shadowBlur = 20; // Add glow effect
          drawingContext.shadowColor = "white";
        } else {
          fill(255);
          drawingContext.shadowBlur = 0; // No glow
        }

        if (star.isAnimating) {
          star.animationSize += 0.5;
          if (star.animationSize > star.r * 1.5) {
            star.animationSize = star.r;
            star.isAnimating = false;
          }
        }

        circle(star.x, star.y, star.animationSize * 2); // Draw animated star
      }
    }

    // Draw connections
    stroke(255); // White color for lines
    strokeWeight(1);
    for (let connection of connections) {
      line(connection[0].x, connection[0].y, connection[1].x, connection[1].y); // Draw line between stars
    }
    noStroke();
    drawingContext.shadowBlur = 0; // Reset shadow for other elements

    // Display text near constellations (bottom-right corner) with background
  // Hintergrund und Text zeichnen
    const textX = width - 220;
    const textY = height - 30;
    const textW = textWidth("PRESS  [Z-KEY] TO RESET,  [C-KEY] TO CHANGE PATTERNS") + 40; // Mehr Platz an den Seiten
    const textH = 50; // Höheres Rechteck

    // Rechteck zeichnen (ohne abgerundete Ecken)
    fill(255, 150); // Hintergrundfarbe (schwarz mit Transparenz)
    rect(textX - textW / 2, textY - textH / 2, textW, textH); // Rechteck ohne Rundungen

    // Text zeichnen (zentriert im Rechteck)
    fill(255); // Schriftfarbe
    textSize(14);
    textAlign(CENTER, CENTER); // Zentrierung des Texts
    text("PRESS  [Z-KEY] TO RESET,  [C-KEY] TO CHANGE PATTERNS", textX, textY); // Textposition

  }  








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

function mousePressed() {
  if (!showUI) {
    // Check if mouse is over a star
    let closestStar = null;

    for (let star of stars) {
      let d = dist(mouseX, mouseY, star.x, star.y);
      if (d < star.r * 2) {
        closestStar = star;
        break; // Stop after finding the first matching star
      }
    }

    if (closestStar) {
      closestStar.glow = true; // Make the star glow permanently
      closestStar.isAnimating = true; // Trigger the animation
      clickCounter++; // Increment the click counter

      if (clickCounter % 4 === 0) {
        closestStar.isStar = true; // Transform the circle into a glowing star
      }

      if (lastSelectedStar && lastSelectedStar !== closestStar) {
        // Connect to the previously selected star
        connections.push([lastSelectedStar, closestStar]);
      }
      lastSelectedStar = closestStar; // Update last selected star

      // Show corresponding constellation and star every second click
      if (clickCounter % 2 === 0) {
        const constellationElements = document.getElementById("constellationContainer").children;
        const starElements = document.getElementById("starsContainer").children;

        if ((clickCounter / 2) - 1 < constellationElements.length) {
          constellationElements[(clickCounter / 2) - 1].style.opacity = 1;
          constellationElements[(clickCounter / 2) - 1].style.transition = "opacity 0.5s ease-in-out";
          constellationElements[(clickCounter / 2) - 1].style.filter = "brightness(1.5)"; // Highlight constellation
        }

        if ((clickCounter / 2) - 1 < starElements.length) {
          starElements[(clickCounter / 2) - 1].style.opacity = 1;
          starElements[(clickCounter / 2) - 1].style.transition = "opacity 0.5s ease-in-out";
          starElements[(clickCounter / 2) - 1].style.filter = "brightness(1.5)"; // Highlight star
        }
      }
    }
  }
}

function keyPressed() {
  if (key === ' ') { // Check if spacebar is pressed
    if (showUI) {
      transitioning = true; // Start fade-out transition
    } else {
      uiOpacity = 255; // Reset opacity for fade-in
      showUI = true; // Show UI
      const logo = document.getElementById("logo");
      const infoBox = document.getElementById("infoBox1");
      const spaceHint = document.getElementById("spacebar-hint");

      if (logo && infoBox && spaceHint) {
        logo.style.display = "block";
        infoBox.style.display = "block";
        spaceHint.style.display = "block";
        logo.style.opacity = 1;
        infoBox.style.opacity = 1;
        spaceHint.style.opacity = 1;
      }
    }
  } else if (key === 'z' || key === 'Z') { // Reset the drawing on 'Z'
    connections = []; // Clear all connections
    lastSelectedStar = null; // Reset the last selected star
    clickCounter = 0; // Reset the click counter
    for (let star of stars) {
      star.glow = false; // Reset glow
      star.isStar = false; // Reset to circle
      star.isAnimating = false; // Stop any animation
      star.animationSize = star.r; // Reset size
    }

    // Reset constellation and star visibility
    const constellationElements = document.getElementById("constellationContainer").children;
    const starElements = document.getElementById("starsContainer").children;

    for (let el of constellationElements) {
      el.style.opacity = 0;
      el.style.filter = "brightness(1)";
    }
    for (let el of starElements) {
      el.style.opacity = 0;
      el.style.filter = "brightness(1)";
    }
  } else if (key === 'c' || key === 'C') { // Regenerate star positions on 'C'
    generateStars();
  }





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









function generateStars() {
  stars = [];
  for (let i = 0; i < numberOfStars; i++) {
    let x = random(width); // Random x-position
    let y = random(height); // Random y-position
    let r = random(2, 6); // Random size (radius)
    stars.push({ x: x, y: y, r: r, glow: false, isAnimating: false, animationSize: r, isStar: false });
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}




const audio = document.getElementById("backgroundSound");
const soundButton = document.getElementById("sound-button");
const soundIcon = document.getElementById("sound-icon");

// Icons für Mute und Unmute
const muteIconSrc = "graphics/webp/icon/mute_icon.webp";
const unmuteIconSrc = "graphics/webp/icon/unmute_icon.webp";

soundButton.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    soundIcon.src = muteIconSrc; // Wechsel zu Unmute-Icon
  } else {
    audio.muted = true;
    soundIcon.src = unmuteIconSrc; // Wechsel zu Mute-Icon
  }
});






const modal = document.getElementById("interaction-modal");
  const infoButton = document.getElementById("info-button");
  const closeButton = document.querySelector(".close-button");

  // Öffnet das Modal, wenn auf den Info-Button geklickt wird
  infoButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Schließt das Modal, wenn der Close-Button angeklickt wird
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Schließt das Modal, wenn außerhalb des Fensters geklickt wird
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });




  const homeButton = document.getElementById("home-button");

  // Klickereignis für den Home-Button
  homeButton.addEventListener("click", () => {
    window.location.href = "index.html"; // Link zur Startseite
  });




