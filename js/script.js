let song;
let amplitude;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  song = await loadSound("./sound/locket.mp3");
  amplitude = new p5.Amplitude();
  song.connect(amplitude);
}

function mousePressed() {
    song.play();
}

function draw() {
  background(0);
  if (!amplitude) return;
  const level = amplitude.getLevel();
  const size = map(level, 0, 0.3, 50, min(width, height), true);
  circle(width / 2, height / 2, size);
}