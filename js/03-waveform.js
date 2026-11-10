let waveSong;
let waveFft;
let waveAmplitude;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  waveSong = await audioPlayback.load();
  waveFft = new p5.FFT(1024);
  waveSong.connect(waveFft);
  waveAmplitude = new p5.Amplitude(0.9);
  waveSong.connect(waveAmplitude);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(7, 10, 18);

  if (!waveSong || !waveFft || !waveSong.isPlaying()) {
    fill(255);
    noStroke();
    text("Haz clic para reproducir", width / 2, height / 2);
    return;
  }

  const waveform = waveFft.waveform();
  const level = waveAmplitude.getLevel();
  noFill();
  stroke(83, 214, 200);
  strokeWeight(map(level, 0, 0.5, 1, 12, true));
  beginShape();

  for (let i = 0; i < waveform.length; i++) {
    const x = map(i, 0, waveform.length - 1, 0, width);
    const y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }

  endShape();
}

async function mousePressed() {
  if (!waveSong) return;
  await audioPlayback.toggle(waveSong);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
