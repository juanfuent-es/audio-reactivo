// El import trae la DEFINICIÓN de una clase desde otro archivo.
import { Persona } from './Persona.js';

// 'new' crea OBJETOS diferentes a partir de una misma CLASE.
const personas = [
  new Persona('Alex', 20),
  new Persona('Sol', 23),
  new Persona('Mar', 21)
];

const salida = document.querySelector('#personas');
function mostrar() {
  // Las propiedades de una persona no modifican a las demás.
  salida.replaceChildren();
  personas.forEach((persona, indice) => {
    const articulo = document.createElement('article');
    articulo.className = 'card';
    const titulo = document.createElement('h2');
    titulo.textContent = `Instancia ${indice + 1}: ${persona.nombre}`;
    const mensaje = document.createElement('p');
    mensaje.textContent = persona.presentarse();
    const boton = document.createElement('button');
    boton.textContent = 'Cumplir años';
    boton.addEventListener('click', () => { persona.cumplirAnios(); mostrar(); });
    articulo.append(titulo, mensaje, boton);
    salida.append(articulo);
  });
}
mostrar();
