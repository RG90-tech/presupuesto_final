let ingresos = [
  new Ingreso("Salario", 3000),
  new Ingreso("Venta auto", 600),
  new Ingreso("Prueba", 5000),
];

let egresos = [
  new Egreso("Renta", 900),
  new Egreso("Ropa", 400),
  new Egreso("Prueba2", 6000),
];

// Función para cargar el cabecero

const cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();

  let porcentajeEgreso = totalEgresos() / totalIngresos();

  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML =
    formatoMoneda(totalIngresos());
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

// Función para dar formato de moneda

const formatoMoneda = (valor) => {
  return valor.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
};

// Función para dar formato de porcentaje

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("es-MX", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

// Ejecutar función

cargarCabecero();

const cargarIngresos = () => {
  let ingresosHTML = "";

  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }

  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">
                ${ingreso.descripcion}
            </div>

            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">
                    ${formatoMoneda(ingreso.valor)}
                </div>

                <div class="elemento_eliminar">
                    <ion-icon
                        name="close-circle-outline"
                        onclick="eliminarIngreso(${ingreso.id})">
                    </ion-icon>
                </div>
            </div>
        </div>
    `;

  return ingresoHTML;
};

const cargarEgresos = () => {
  let egresosHTML = "";

  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }

  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">
                ${egreso.descripcion}
            </div>

            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">
                    ${formatoMoneda(egreso.valor)}
                </div>

                <div class="elemento_eliminar">
                    <ion-icon
                        name="close-circle-outline"
                        onclick="eliminarEgreso(${egreso.id})">
                    </ion-icon>
                </div>
            </div>
        </div>
    `;

  return egresoHTML;
};

const cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

const eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);

  egresos.splice(indiceEliminar, 1);

  cargarCabecero();

  cargarEgresos();
};

const agregarDato = () => {
    let forma = document.getElementById("forma");
    let tipo = document.getElementById("tipo").value;
    let descripcion = document.getElementById("descripcion").value;
    let valor = document.getElementById("valor").value;

    if (descripcion !== "" && valor !== "") {

        if (tipo === "ingreso") {

            ingresos.push(
                new Ingreso(descripcion, parseFloat(valor))
            );

            cargarCabecero();
            cargarIngresos();

        } else if (tipo === "egreso") {

            egresos.push(
                new Egreso(descripcion, parseFloat(valor))
            );

            cargarCabecero();
            cargarEgresos();
        }
    }
};


