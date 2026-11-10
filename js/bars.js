let song;
let barsFft;
let barsAmplitude;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  song = await audioPlayback.load();
  barsFft = new p5.FFT(64);
  song.connect(barsFft);
  barsAmplitude = new p5.Amplitude(0.9);
  song.connect(barsAmplitude);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  if (!song || !barsFft || !song.isPlaying()) {
    fill(255);
    noStroke();
    text("Haz clic para reproducir", width / 2, height / 2);
    return;
  }

  const spectrum = barsFft.analyze();
  const level = barsAmplitude.getLevel();
  const margin = width * 0.08;
  const barWidth = (width - margin * 2) / spectrum.length;

  for (let i = 0; i < spectrum.length; i++) {
    const energy = spectrum[i];
    const heightScale = map(level, 0, 0.5, 0.8, 1.3, true);
    const barHeight = map(energy, 0, 1, 2, height * 0.42, true) * heightScale;
    const x = margin + i * barWidth;
    fill(energy * 255, 255, (1 - energy) * 255);
    rect(x, height / 2 - barHeight, barWidth * 0.8, barHeight * 2);
  }
}

async function mousePressed() {
  if (!song) return;
  await audioPlayback.toggle(song);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
