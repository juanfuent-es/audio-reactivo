// Una CLASE es una plantilla para construir objetos con atributos y métodos.
export class Persona {
  // El constructor recibe los datos particulares de cada instancia.
  constructor(nombre, edad) {
    this.nombre = nombre; // Propiedad
    this.edad = edad;     // Propiedad
  }

  // Un MÉTODO es una función que pertenece a los objetos de esta clase.
  presentarse() {
    return `Soy ${this.nombre} y tengo ${this.edad} años.`;
  }

  cumplirAnios() {
    this.edad += 1; // Cambia el estado de ESTA instancia.
  }
}
