let x;
let y;
let speed;
function setup() {
  createCanvas(500, 500);
  x = 250;
  y = 450;
  speed = 0;
}

noStroke();

// Following 28 lines are inspired by following youtube-tutorial https://www.youtube.com/watch?v=cl5FW_zgY_Q
function draw() {
  // background
  background(0);
  // flames
  fill(255, 185, 0);
  ellipse(x, y + random(35, 55), 20, 60);
  fill(255, 255, 0);
  ellipse(x, y + random(35, 50), 15, 40);
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

  y = y - speed;