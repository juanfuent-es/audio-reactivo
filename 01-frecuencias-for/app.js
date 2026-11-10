// Un valor de la FFT por celda. Todo el audio y los controles usan p5.
const NUM_FRECUENCIAS = 64;
const NUM_COLUMNAS = 8;

let cancion, fft, escena, boton, posicion, etiqueta;
let inicio = 0, referencia = 0, arrastrando = false;
let colores = [];

async function setup() {
  escena = select('#escena');
  createCanvas(escena.elt.clientWidth, escena.elt.clientHeight).parent(escena);
  colorMode(HSB, 360, 100, 100);
  textFont('monospace');
  textAlign(CENTER, CENTER);
  colores = Array.from({ length: NUM_FRECUENCIAS }, () => random(360));

  boton = createButton('Cargando…').parent('controles');
  boton.attribute('disabled', '');
  cancion = await loadSound('../sound/locket.mp3');
  cancion.loop(true); // En p5.sound 0.4.2, play() inicia la reproducción.
  fft = new p5.FFT(NUM_FRECUENCIAS);
  cancion.connect(fft);
  boton.removeAttribute('disabled');
  boton.html('Reproducir');
  boton.mousePressed(async () => {
    await userStartAudio();
    if (cancion.isPlaying()) {
      inicio = tiempo();
      cancion.pause();
    } else {
      referencia = getAudioContext().currentTime - inicio;
      cancion.play();
    }
    boton.html(cancion.isPlaying() ? 'Pausar' : 'Reproducir');
  });

  etiqueta = createElement('label', 'Escuchar desde el segundo: 0').parent('controles');
  etiqueta.attribute('for', 'posicion');
  posicion = createSlider(0, floor(cancion.duration()) - 1, 0, 1).parent('controles');
  posicion.id('posicion');
  // Al arrastrar solo se muestra el valor; el salto se hace al soltar.
  posicion.input(() => {
    arrastrando = true;
    etiqueta.html('Escuchar desde el segundo: ' + posicion.value());
  });
  posicion.elt.addEventListener('change', async () => {
    arrastrando = false;
    await userStartAudio();
    const t = Number(posicion.value());
    if (!cancion.isPlaying()) cancion.play();
    cancion.jump(t);
    inicio = t;
    referencia = getAudioContext().currentTime - t;
    boton.html('Pausar');
  });
}

// Posición actual en segundos (p5.sound 0.4.2 no la expone).
function tiempo() {
  if (!cancion.isPlaying()) return inicio;
  return (getAudioContext().currentTime - referencia) % cancion.duration();
}

function draw() {
  background(225, 45, 6);
  if (!fft) return;
  if (!arrastrando) {
    posicion.value(floor(tiempo()));
    etiqueta.html('Escuchar desde el segundo: ' + posicion.value());
  }
  const espectro = fft.analyze();
  const columnas = min(NUM_COLUMNAS, max(1, floor(width / 80)));
  const ancho = width / columnas;
  const alto = height / ceil(NUM_FRECUENCIAS / columnas);
  const hzPorBin = getAudioContext().sampleRate / (2 * NUM_FRECUENCIAS);

  for (let i = 0; i < NUM_FRECUENCIAS; i++) {
    const valor = cancion.isPlaying() ? espectro[i] : 0;
    const nivel = constrain(sqrt(valor) * 12, 0, 1); // Amplifica solo el dibujo.
    const x = (i % columnas) * ancho;
    const y = floor(i / columnas) * alto;
    noStroke();
    fill(colores[i], 65, 12 + nivel * 75);
    rect(x + 2, y + 2, ancho - 4, alto - 4, 3);
    fill(0, 0, 100);
    textSize(min(17, ancho * 0.16, alto * 0.3));
    text(valor.toFixed(5), x + ancho / 2, y + alto * 0.4);
    textSize(min(10, ancho * 0.1, alto * 0.22));
    text(round(i * hzPorBin) + ' Hz', x + ancho / 2, y + alto * 0.7);
    fill(colores[i], 45, 100);
    rect(x + 5, y + alto - 7, (ancho - 10) * nivel, 3);
  }
}

function windowResized() {
  resizeCanvas(escena.elt.clientWidth, escena.elt.clientHeight);
}
