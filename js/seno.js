// desplazamiento temporal
let offset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(10);
  stroke(0, 255, 120);
  strokeWeight(2);
  noFill();
  beginShape();
  // recorremos horizontalmente
  for (let x = 0; x < width; x++) {
    // control de frecuencia
    let angle = (x * 0.02) + offset;
    // sin() genera oscilación
    let y = sin(angle) * 100;
    // centramos la onda
    y += height / 2;
    // dibujamos punto
    vertex(x, y);
  }
  endShape();
  // desplazamiento temporal
  offset += 0.01;
}
