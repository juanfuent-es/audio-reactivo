// Una CLASE define qué propiedades y métodos tendrá cada estrella.
export class Estrella {
  constructor(p, x, y, indiceFrecuencia) {
    this.p = p;
    this.x = x;                         // Posición individual
    this.y = y;
    this.indiceFrecuencia = indiceFrecuencia; // Cada estrella escucha otro bin
    this.radio = p.random(2, 6);
    this.brillo = 0;                    // Estado que se actualiza en el tiempo
  }

  actualizar(spectrum) {
    // El valor obtenido del arreglo pertenece a esta estrella.
    const valor = spectrum[this.indiceFrecuencia] ?? 0;
    // Un poco de suavizado evita que parpadee demasiado.
    this.brillo = this.p.lerp(this.brillo, valor, 0.23);
  }

  dibujar() {
    const p = this.p;
    const intensidad = Math.min(1, this.brillo * 9);
    const radio = this.radio + intensidad * 6;
    const contexto = p.drawingContext;
    p.push();
    p.noStroke();
    contexto.shadowColor = 'rgba(255,255,255,0.95)';
    contexto.shadowBlur = 5 + intensidad * 23;
    p.fill(255, 255, 255, 75 + intensidad * 180);
    p.circle(this.x, this.y, radio * 2);
    p.pop();
    contexto.shadowBlur = 0;
  }
}
