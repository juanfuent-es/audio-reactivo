let song;
let amplitude;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  song = await audioPlayback.load();
  amplitude = new p5.Amplitude(0.9);
  song.connect(amplitude);
}

function draw() {
  background(0);
  if (!song || !amplitude || !song.isPlaying()) {
    fill(255);
    noStroke();
    text(song ? "Haz clic para reproducir" : "Cargando locket.mp3…", width / 2, height / 2);
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
  await audioPlayback.toggle(song);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
