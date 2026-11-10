import { Estrella } from './Estrella.js';

const FFT_SIZE = 256;
const escena = document.querySelector('#escena');
const boton = document.querySelector('#play');
const estado = document.querySelector('#estado');
const input = document.querySelector('#archivo');
let estrellas = []; // ARREGLO de INSTANCIAS de una misma CLASE.
let fft;
let audio;
let cargado = false;

new p5((p) => {
  p.setup = async () => {
    p.createCanvas(escena.clientWidth, escena.clientHeight).parent(escena);
    p.pixelDensity(1);
    // La FFT entrega FFT_SIZE valores; cada estrella tendrá uno de ellos.
    fft = new p5.FFT(FFT_SIZE);
    poblarEstrellas();
    try { await cargar(); }
    catch (error) { estado.textContent = 'Error al cargar: ' + error.message; }
  };

  function poblarEstrellas() {
    estrellas = [];
    for (let i = 0; i < FFT_SIZE; i++) {
      // 'new' genera una instancia con atributos propios.
      estrellas.push(new Estrella(p, p.random(p.width), p.random(p.height), i % FFT_SIZE));
    }
  }

  async function cargar(ruta) {
    boton.disabled = true;
    input.disabled = true;
    estado.textContent = 'Cargando audio…';
    try {
      const siguiente = await audioPlayback.load(p, ruta);
      // Conectar la fuente al analizador para leer sus frecuencias.
      siguiente.connect(fft);
      if (audio) { audio.stop(); audio.disconnect(); }
      audio = siguiente;
      cargado = true;
      estado.textContent = 'Listo · ' + (ruta?.name ?? 'locket.mp3');
    } finally {
      input.disabled = false;
      boton.disabled = !cargado;
      boton.textContent = audio?.isPlaying() ? 'Pausar' : 'Reproducir';
    }
  }

  p.draw = () => {
    p.background(8, 10, 17);
    const spectrum = cargado ? fft.analyze() : Array(FFT_SIZE).fill(0);
    // Cada objeto realiza el mismo método, pero usa datos diferentes.
    for (const estrella of estrellas) {
      estrella.actualizar(spectrum);
      estrella.dibujar();
    }
  };

  p.windowResized = () => { p.resizeCanvas(escena.clientWidth, escena.clientHeight); poblarEstrellas(); };

  boton.addEventListener('click', async () => {
    if (!cargado) return;
    try {
      const reproduciendo = await audioPlayback.toggle(audio, p);
      boton.textContent = reproduciendo ? 'Pausar' : 'Reproducir';
      estado.textContent = reproduciendo ? 'Reproduciendo' : 'Pausado';
    } catch (error) { estado.textContent = error.message; console.error(error); }
  });

  input.addEventListener('change', async (event) => {
    const archivo = event.target.files?.[0];
    if (!archivo) return;
    try { await cargar(archivo); }
    catch (error) { estado.textContent = error.message; }
    finally { input.value = ''; }
  });
});
