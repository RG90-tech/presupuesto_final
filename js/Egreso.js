// Realizado por Randy García

const totalEgresos = () => {
  let totalEgreso = 0;

  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }

  return totalEgreso;
};

class Egreso extends Dato {
  static contadorEgresos = 0;

  constructor(descripcion, valor) {
    super(descripcion, valor);

    this._id = ++Egreso.contadorEgresos;
  }

  get id() {
    return this._id;
  }
}
