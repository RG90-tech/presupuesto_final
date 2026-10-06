// Realizado por Randy García

class Dato {
  constructor(descripcion, valor) {
    this._descripcion = descripcion;
    this._valor = valor;
  }

  // GET descripcion
  get descripcion() {
    return this._descripcion;
  }

  // SET descripcion
  set descripcion(descripcion) {
    this._descripcion = descripcion;
  }

  // GET valor
  get valor() {
    return this._valor;
  }

  // SET valor
  set valor(valor) {
    this._valor = valor;
  }
}
