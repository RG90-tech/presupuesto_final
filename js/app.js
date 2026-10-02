const ingresos = [
  new Ingreso("Salario", 3000),
  new Ingreso("Venta auto", 600),
];

const egresos = [
  new Egreso("Renta", -900),
  new Egreso("Ropa", -400),
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
    signDisplay: "always" //
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
    let egresosHTML = '';
    const totalIng = totalIngresos(); // Obtiene el total acumulado

    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso, totalIng);
    }

    document.getElementById('lista-egresos').innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso, totalIngresos) => {
    const porcentaje = totalIngresos > 0 
        ? ((egreso.valor / totalIngresos) * 100).toFixed(2) + '%' 
        : '0%';

    return `
    <div class="elemento limpiarfix" id="egreso-${egreso.id}">
        <div class="elemento__descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarfix">
            <div class="elemento__valor">${formatearValor(egreso.valor)}</div>
            <div class="elemento__porcentaje">${porcentaje}</div>
            <div class="elemento__eliminar">
                <button class="elemento__eliminar--btn" onclick="eliminarEgreso(${egreso.id})">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
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

// Función para dar formato de moneda/valor a los números
const formatearValor = (valor) => {
    return valor.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2
    });
};
