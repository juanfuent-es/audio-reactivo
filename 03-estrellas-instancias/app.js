import { Estrella } from './Estrella.js';

const NUM_ESTRELLAS = 256; // Igual al tamaño de la FFT: una estrella por valor.

new p5((p) => {
  let estrellas = [];
  let cancion, fft;

  p.setup = async () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.pixelDensity(1);
    fft = new p5.FFT(NUM_ESTRELLAS);
    poblar();
    cancion = await p.loadSound('../sound/locket.mp3');
    cancion.loop(true);
    cancion.connect(fft);
  };

  p.draw = () => {
    p.background(8, 10, 17);
    const espectro = fft.analyze();
    for (const estrella of estrellas) {
      estrella.actualizar(espectro);
      estrella.dibujar();
    }
  };

  // Click o toque en cualquier parte: alterna reproducir / pausar.
  p.mousePressed = async () => {
    if (!cancion) return;
    await p.userStartAudio();
    if (cancion.isPlaying()) cancion.pause();
    else cancion.play();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    poblar();
  };

  function poblar() {
    estrellas = Array.from({ length: NUM_ESTRELLAS }, (_, i) =>
      new Estrella(p, p.random(p.width), p.random(p.height), i));
  }
});
