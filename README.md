# CENTRO.audio-reactive

Ejemplos con `p5@2.3.4` y `p5.sound@0.4.2`, incluidos en `js/vendor/`.
Las vistas de p5 funcionan sin conexión a un CDN; el ejemplo de trayectoria SVG
conserva su dependencia de GSAP desde cdnjs.

Ejecuta desde un servidor HTTP, por ejemplo:

```sh
python3 -m http.server 8000
```

Abre `http://localhost:8000`. No uses `file://`: los módulos y la carga de audio
requieren HTTP. Pulsa Reproducir o haz clic en el canvas en los ejemplos de
pantalla completa para iniciar la canción.

- `sound/locket.mp3` es la canción predeterminada de todas las vistas con audio.
- `js/audio-playback.js` centraliza la ruta, la decodificación y reproducir/pausar.
  La ruta se resuelve respecto al script para admitir subdirectorios de hosting.
- `css/style.css` es la única hoja de estilos del sitio.
- El índice enlaza la secuencia de frecuencias, clases, estrellas y bulbo,
  además de los ejemplos de amplitud, barras y ondas.

En p5.sound 0.4.2, `sound.loop(true)` configura la repetición y `sound.play()`
inicia o reanuda la pista. Los analizadores reciben la fuente con
`sound.connect(fft)` o `sound.connect(amplitude)`; la FFT devuelve valores de 0 a 1.
La carga usa `fetch` y decodifica antes de construir `p5.SoundFile`, para poder
mostrar errores de red o archivos inválidos sin dejar los controles bloqueados.
