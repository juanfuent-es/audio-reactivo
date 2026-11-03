let mic;
let fft;
let micActive = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  fft = new p5.FFT(1024);
  fft.setInput(mic);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(10);

  if (!micActive) {
    fill(255);
    noStroke();
    text("Haz clic para activar el micrófono", width / 2, height / 2);
    return;
  }

  const waveform = fft.waveform();
  noFill();
  stroke(0, 255, 120);
  strokeWeight(2);
  beginShape();

  for (let i = 0; i < waveform.length; i++) {
    const x = map(i, 0, waveform.length - 1, 0, width);
    const y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }

  endShape();
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
