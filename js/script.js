let song;
let amplitude;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  song = await audioPlayback.load();
  amplitude = new p5.Amplitude();
  song.connect(amplitude);
}

async function mousePressed() {
  await audioPlayback.toggle(song);
}

function draw() {
  background(0);
  if (!amplitude) return;
  const level = amplitude.getLevel();
  const size = map(level, 0, 0.3, 50, min(width, height), true);
  circle(width / 2, height / 2, size);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
