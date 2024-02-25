function setup() {
  createCanvas(500, 500);
  // Following 1 line was adapted from https://p5js.org/reference/#/p5/textStyle
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  noStroke();
}
let x = 250;
let y = 100;
let velocity = 0;
let acceleration = 0;
let gameOver = false;
let started = false;
let restart = false;
// Following three lines was adapted from chat gpt
let gravity = 0.1;
let thrust = 0.6;
let flamesOn = false;

// Following 28 lines was inspired by following youtube-tutorial https://www.youtube.com/watch?v=cl5FW_zgY_Q
function rocket(x, y) {
  // side fins
  fill(194, 116, 185);
  arc(x, y + 35, 60, 40, PI, 0);
  // body
  fill(170, 111, 199);
  ellipse(x, y, 30, 80);
  // top
  fill(194, 116, 185);
  beginShape();
  vertex(287, 470);
  arc(x, y - 15, 26, 50, PI, 0);
  endShape();
  // front fin
  fill(194, 116, 185);
  ellipse(x, y + 33, 5, 30);
  // window
  fill(190, 198, 204);
  ellipse(x, y - 10, 18, 20);
  fill(220, 221, 222);
  ellipse(x + 4, y - 10, 5, 8);
}
//flames
function flames(x, y) {
  fill(255, 185, 0);
  ellipse(x, y + random(35, 55), 20, 60);
  fill(255, 255, 0);
  ellipse(x, y + random(35, 50), 15, 40);
}

// Game Over page
function endPage(x, y) {
  // background and text
  background(21, 19, 46);
  textSize(40);
  fill(239, 210, 250);
  text("You crashed!", x, y);
  textSize(15);
  fill(243, 139, 252);
  text("PRESS ENTER TO RESTART GAME", x, y + 50);

  // body & top crashed
  push();
  translate(160, 200);
  rotate(1.1);
  // body
  fill(170, 111, 199);
  ellipse(x, y, 30, 80);
  // top
  fill(194, 116, 185);
  beginShape();
  vertex(287, 470);
  arc(x, y - 15, 26, 50, PI, 0);
  // window missing
  fill(21, 19, 46);
  ellipse(x, y - 10, 18, 20);
  ellipse(x + 4, y - 10, 5, 8);
  pop();
  // window crashed
  fill(190, 198, 204);
  ellipse(x + 30, y + 380, 18, 20);
  // side fins
  fill(194, 116, 185);
  arc(x + 100, y + 380, 60, 40, TWO_PI, PI / 2);
  push();
  translate(-10, 200);
  rotate(1, 2);
  arc(x, y, 60, 40, TWO_PI, PI / 2);
  pop();
}

// Start page
function startPage(x, y) {
  // background and text
  background(21, 19, 46);
  fill(239, 210, 250);
  textSize(40);
  text("Lunar Lander", x, y);
  textSize(15);
  fill(243, 139, 252);
  text("PRESS ENTER TO START", x, y + 50);
  // Big rocket with flames
  push();
  translate(160, -250);
  rotate(1);
  scale(2);
  flames(x, y);
  rocket(x, y);
  pop();
}

//Victory page
function victoryPage(x, y) {
  // background and text
  background(21, 19, 46);
  textSize(40);
  fill(239, 210, 250);
  text("Rocket landed!", x, y);
  textSize(15);
  fill(243, 139, 252);
  text("PRESS ENTER TO RESTART", x, y + 50);
  // Rocket landed successfully
  rocket(250, 450);
}
// Game when started
function draw() {
  if (started) {
    // Background
    background(21, 19, 46);

    // Draw flames
    // following 1 line was adapted from chat gpt
    if (!flamesOn) {
      flames(x, y);
    }

    // Draw rocket
    rocket(x, y);

    // following 2 lines was adapted from chat gpt
    // The rockets velocity changes over time because of the added acceleration
    velocity = velocity + acceleration;
    // The rockets y-coordinate changes over time because of velocity
    y = y + velocity;

    // Making the rocket fly with thrust
    if (keyIsDown(40)) {
      // following 1 line below was adapted from chat pgt
      acceleration = -thrust;
      // adding flames
      flamesOn = false;
    } else {
      // If key 40 is not pressed, there will be gravity & no flames
      // following 1 line below was adapted from chat pgt
      acceleration = gravity;
      flamesOn = true;
    }

    // Rocket will land correctly with velocity below 1.8 velocity
    if (y >= 450 && velocity < 1.6) {
      // show victory page
      restart = true;
      rocket(250, 450);
      // remove flames
      flamesOn = true;
    }
    if (y >= 450 && velocity > 1.5) {
      // stop the rocket from moving
      velocity = 0;
      acceleration = 0;
      // Show the gameOver page
      gameOver = true;
      // Where the rocket should restart after gameOver
      y = 100;
    }
  }
  // if game not started, show startPage
  if (!started) {
    startPage(250, 100);
  }
  // if gameOver show endpage
  if (gameOver) {
    endPage(250, 100);
  }
  // if restart(victory) show victoryPage
  if (restart) {
    victoryPage(250, 100);
  }
}
// Restart and start game
// following lines inspired from cheat sheets
function keyPressed() {
  if (!started && keyCode === ENTER) {
    started = true;
  }

  if (gameOver && keyCode === ENTER) {
    gameOver = false;
  }

  if (restart && keyCode === ENTER) {
    restart = false;
  }
}
