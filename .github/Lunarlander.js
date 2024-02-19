let x = 250;
let y = 100;
let velocity = 0;
let acceleration = 0;
let gameOver = false;
let started = false;
let restart = false;
// Following three lines was adapted from chat gpt
let gravity = 0.12;
let thrust = 0.6;
let victory = false;

noStroke();
createCanvas(500, 500);

// Following 28 lines are inspired by following youtube-tutorial https://www.youtube.com/watch?v=cl5FW_zgY_Q
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
// Game over page
function endPage(x, y) {
  background(0);
  fill(250);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("You crashed!", x, y);
  textSize(15);
  text("PRESS ENTER TO RESTART GAME", x, y + 50);
}
// Start page
function startPage(x, y) {
  background(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Lunar Lander", x, y);
  textSize(15);
  text("PRESS ENTER TO START", x, y + 50);
}

//Victory page
function victoryPage(x, y) {
  background(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Rocket landed!", x, y);
  textSize(15);
  text("PRESS ENTER RESTART", x, y + 50);
}

function draw() {
  if (started) {
    // background
    background(0);
    // following 6 lines was adapted from chat gpt
    if (!victory) {
      flames(x, y);
    }
    rocket(x, y);
    velocity += acceleration;
    y += velocity;

    // Starting the game by pressing enter
    // Making the rocket fly with thrust
    if (keyIsDown(40) && y < 450) {
      // following 1 line below was adapted from chat pgt
      acceleration = -thrust;
      // adding flames
      victory = false;
    } else {
      // If key 40 is not pressed, there will be gravity
      // following 1 line below was adapted from chat pgt
      acceleration = gravity;
    }

    // Rocket will land correctly with velocity below 1.5
    if (y >= 450 && velocity < 1.5) {
      rocket(250, 450);
      velocity = 0;
      acceleration = 0;
      // remove flames
      victory = true;
      // show victory page
      restart = true;
    } else if (y >= 450 && velocity > 1.5) {
      velocity = 0;
      gameOver = true;
      y = 100;
      acceleration = 0;
    }

    // dont know if this is right ?????
  } else if (!started) {
    startPage(250, 100);
  }

  if (gameOver) {
    endPage(250, 100);
  } else if (restart) {
    victoryPage(250, 100);
  }
}
// restart and start game
function keyPressed() {
  if (!started && keyIsPressed && keyCode === ENTER) {
    started = true;
  } else if (gameOver && keyIsPressed && keyCode === ENTER) {
    gameOver = true;
  } else if (restart && keyIsPressed && keyCode === ENTER) {
    restart = true;
  }
}
