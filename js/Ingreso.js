const totalIngresos = () => {
  let totalIngreso = 0;

  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }

  return totalIngreso;
};

class Ingreso extends Dato {
  static contadorIngresos = 0;

  constructor(descripcion, valor) {
    super(descripcion, valor);

    this._id = ++Ingreso.contadorIngresos;
  }

  get id() {
    return this._id;
  }
}
