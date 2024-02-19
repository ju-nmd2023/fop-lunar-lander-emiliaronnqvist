let started = false;

noStroke();
createCanvas(500, 500);
if (started) {
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

  let x = 250;
  let y = 100;
  let velocity = 0;
  let acceleration = 0;
  let gravity = 0.12;
  let thrust = 0.6;
  let victory = false;

  function draw() {
    // background
    background(0);
    if (!victory) {
      flames(x, y);
    }
    rocket(x, y);

    velocity += acceleration;

    y += velocity;

    if (keyIsDown(40) && y < 450) {
      acceleration = -thrust;
      // flames
      victory = false;
    } else {
      acceleration = gravity;
    }

    if (y >= 450 && velocity < 1.5) {
      y = 450;
      velocity = 0;
      // remove flames
      victory = true;
    }
  }
} else {
  //start page
  background(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Lunar Lander", x, y);
  textSize(40);
  text("Press enter to start", x, y + 50);
}
if (keyIsPressed(13)) {
  started = true;
}

//button
/*
function button(x, y, w, h) {
    rect(x, y ,w ,h);
}
*/

// Stars
