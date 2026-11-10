// La ruta depende de este script, por lo que funciona también en subdirectorios.
(() => {
  const defaultUrl = new URL('../sound/locket.mp3', document.currentScript.src).href;

  window.audioPlayback = {
    defaultUrl,

    async load(p = window, source = defaultUrl) {
      let bytes;
      if (source instanceof File) {
        bytes = await source.arrayBuffer();
      } else {
        const response = await fetch(source);
        if (!response.ok) throw new Error(`No se pudo cargar la pista (${response.status}).`);
        bytes = await response.arrayBuffer();
      }

      // Decodificar primero permite reportar archivos inválidos: loadSound() no
      // rechaza su Promise si falla la descarga en p5.sound 0.4.2.
      let buffer;
      try {
        buffer = await p.getAudioContext().decodeAudioData(bytes);
      } catch {
        throw new Error('El archivo no contiene audio compatible. Prueba con un MP3 o WAV.');
      }
      const sound = new p5.SoundFile(buffer);
      sound.loop(true);
      return sound;
    },

    async toggle(sound, p = window) {
      if (!sound) return false;
      await p.userStartAudio();
      if (sound.isPlaying()) {
        sound.pause();
        return false;
      }
      // loop(true) configura la repetición; play() inicia o reanuda la pista.
      sound.play();
      return true;
    }
  };
})();
