let song;
let amplitude;
let fft;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  song = await audioPlayback.load();
  amplitude = new p5.Amplitude();
  song.connect(amplitude);
  fft = new p5.FFT(32);
  song.connect(fft);
}
async function mousePressed() {
  await audioPlayback.toggle(song);
}
function draw() {
  background(0);
  if (!amplitude || !fft) return;
  const level = amplitude.getLevel();
  const waveform = fft.waveform();
  noFill();
  strokeWeight(level * 10);
  stroke(0, 255, 120);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    const x = map(i, 0, waveform.length - 1, 0, width);
    const y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
