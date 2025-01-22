let starburst = []; // Array for starburst
let connections2 = []; // Array for connections
let numberOfstarburst2 = 200; // Number of starburst
let lastSelectedStar2 = null; // Previously selected star
let showUI = true;2 // Flag to control visibility of UI elements
let clickCounter = 0; // Counter to track mouse clicks
let uiOpacity = 255; // Opacity for smooth fade-out transition
let transitioning = false; // Flag for transition state
let meteorShowerParticles = []; // Array for meteor shower particles
let meteorShowerActive = false; // Flag to control meteor shower state

function setup() {
  createCanvas(windowWidth, windowHeight); // Full window size
  noStroke(); // No border for circles

  // Generate starburst
  generatestarburst();
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

    // Draw starburst
    for (let star of starburst) {
      if (star.isStar) {
        fill(255); // White color for starburst
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
    strokeWeight(2);
    for (let connection of connections) {
      line(connection[0].x, connection[0].y, connection[1].x, connection[1].y); // Draw line between starburst
    }
    noStroke();
    drawingContext.shadowBlur = 0; // Reset shadow for other elements

    // Draw Meteor Shower if active
    if (meteorShowerActive) {
      generateMeteorShowerParticles(); // Generate new particles for the meteor shower

      for (let particle of meteorShowerParticles) {
        fill(255, 255, 0, 150); // Yellow particles with some transparency
        noStroke();
        ellipse(particle.x, particle.y, particle.size, particle.size);
        
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Fade out the particle as it moves
        particle.size *= 0.98; // Slowly shrink the particles
        particle.alpha *= 0.98; // Fade out effect

        // Remove the particle when it's too small or faded
        if (particle.size < 1 || particle.alpha < 10) {
          meteorShowerParticles.splice(meteorShowerParticles.indexOf(particle), 1);
        }
      }
    }

    // Display text near constellations (bottom-right corner) with background
    const textX = width - 220;
    const textY = height - 30;
    const textW = textWidth("PRESS  [Z-KEY] TO RESET,  [C-KEY] TO CHANGE PATTERNS") + 40;
    const textH = 50;

    // Rectangle background
    fill(255, 150); // Background color with transparency
    rect(textX - textW / 2, textY - textH / 2, textW, textH); // Rectangle

    // Text
    fill(255); // Text color
    textSize(14);
    textAlign(CENTER, CENTER); // Center text
    text("PRESS  [Z-KEY] TO RESET,  [C-KEY] TO CHANGE PATTERNS", textX, textY);
  }
}

function keyPressed() {
  if (key === ' ') { // Check if spacebar is pressed
    if (showUI) {
      transitioning = true; // Start fade-out transition
    } else {
      uiOpacity = 255; // Reset opacity for fade-in
      showUI = true; // Show UI
    }
  } else if (key === 'z' || key === 'Z') { // Reset the drawing on 'Z'
    connections = []; // Clear all connections
    lastSelectedStar = null; // Reset the last selected star
    clickCounter = 0; // Reset the click counter
    for (let star of starburst) {
      star.glow = false; // Reset glow
      star.isStar = false; // Reset to circle
      star.isAnimating = false; // Stop any animation
      star.animationSize = star.r; // Reset size
    }

    // Reset constellation and star visibility
    const constellationElements = document.getElementById("constellationContainer").children;
    const starElements = document.getElementById("starburstContainer").children;

    for (let el of constellationElements) {
      el.style.opacity = 0; // Hide constellations on reset
      el.style.filter = "brightness(1)";
    }
    for (let el of starElements) {
      el.style.opacity = 0; // Hide starburst on reset
      el.style.filter = "brightness(1)";
    }
  } else if (key === 'c' || key === 'C') { // Regenerate star positions on 'C'
    generatestarburst();
  } else if (key === 'g' || key === 'G') { // Activate the meteor shower with 'G'
    meteorShowerActive = true;
  }
}

function keyReleased() {
  if (key === 'g' || key === 'G') { // Deactivate meteor shower when the key is released
    meteorShowerActive = false;
  }
}

function generatestarburst() {
  starburst = [];
  for (let i = 0; i < numberOfstarburst; i++) {
    let x = random(width); // Random x-position
    let y = random(height); // Random y-position
    let r = random(2, 6); // Random size (radius)
    starburst.push({ x: x, y: y, r: r, glow: false, isAnimating: false, animationSize: r, isStar: false });
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

// Function to generate meteor shower particles
function generateMeteorShowerParticles() {
  if (meteorShowerActive) {
    let particle = {
      x: random(width), // Random starting x position
      y: random(-100, -200), // Start above the screen
      size: random(5, 10), // Random size
      speedX: random(-2, 2), // Random horizontal speed
      speedY: random(3, 5), // Downward speed
      alpha: 255 // Full opacity
    };
    meteorShowerParticles.push(particle);
  }
}

function mousePressed() {
  if (!showUI) {
    // Check if mouse is over a star
    let closestStar = null;

    for (let star of starburst) {
      let d = dist(mouseX, mouseY, star.x, star.y);
      if (d < star.r * 2) {
        closestStar = star;
        break; // Stop after finding the first matching star
      }
    }

    if (closestStar) {
      closestStar
    }
  }
}