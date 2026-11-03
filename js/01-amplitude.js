let mic;
let amplitude;
let micActive = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  amplitude = new p5.Amplitude(0.9);
  mic.connect(amplitude);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  if (!micActive) {
    fill(255);
    noStroke();
    text("Haz clic para activar el micrófono", width / 2, height / 2);
    return;
  }

  const level = amplitude.getLevel();
  const diameter = map(level, 0, 0.25, 10, min(width, height), true);
  noFill();
  stroke(255, 0, 255);
  strokeWeight(map(level, 0, 0.25, 1, 40, true));
  circle(width / 2, height / 2, diameter);
}

async function mousePressed() {
  if (micActive) return;
  await userStartAudio();
  mic.start();
  micActive = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
