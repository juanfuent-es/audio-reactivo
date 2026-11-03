/*
    Arreglos
    Los arreglos son una estructura de datos que nos permiten almacenar múltiples valores en una sola variable. En JavaScript, los arreglos son objetos que pueden contener cualquier tipo de dato, incluyendo otros arreglos.
    // Se declaran utilizando corchetes [] y los elementos se separan por comas. Por ejemplo:
    let miArreglo = [1, 'Hola', true, [2, 3], {nombre: 'Juan'}];
    let arreglo = ["Guayaba", "Mango", "Piña", "Fresa"];
*/

const PALETTE = ['#FF5733', '#33FF57', '#3357FF', '#F333FF'];
const RADIO = 100;
let half_height = window.innerHeight / 2;
let offset = 0;
let frequency = 0.02;

function setup() {
    createCanvas(windowWidth, windowHeight);
}
function draw() {
    background(PALETTE[0]); // [i] Cambia el fondo usando un color de la paleta
    noFill();
    strokeWeight(2);
    stroke(PALETTE[2]);
    for (let x = 0; x < width; x++) {
        let angle = (x * frequency) + offset;
        let y = sin(angle) * RADIO + half_height; // [ii] Onda senoidal centrada
        rect(x, y, 1, 1);
    }
    offset += 0.01; // [iii] Incrementa el offset para animar la onda
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    half_height = window.innerHeight / 2; // [iv] Actualiza la mitad de la altura al redimensionar
}