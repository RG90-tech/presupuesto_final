// Realizado por Randy García

const ingresos = [new Ingreso("Salario", 3000), new Ingreso("Venta auto", 600)];
const egresos = [new Egreso("Renta", 900), new Egreso("Ropa", 400)];

// Funciones de formato de texto
function formatearValor(valor) {
  return valor.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
}

function formatoMoneda(valor) {
  return valor.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
}

// Corrección para evitar mostrar 0% cuando la división da NaN o Infinity
function formatoPorcentaje(valor) {
  if (valor === null || isNaN(valor) || !isFinite(valor)) {
    return "N/A";
  }
  return valor.toLocaleString("es-MX", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// Funciones auxiliares para obtener los totales
const totalIngresos = () => {
  let total = 0;
  for (let ingreso of ingresos) {
    total += ingreso.valor;
  }
  return total;
};

const totalEgresos = () => {
  let total = 0;
  for (let egreso of egresos) {
    total += egreso.valor;
  }
  return total;
};

// Función para cargar el cabecero
const cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();

  // Si totalIngresos() es 0, asignamos null para que la función devuelva 'N/A'
  let porcentajeEgreso =
    totalIngresos() > 0 ? totalEgresos() / totalIngresos() : null;

  const signo = presupuesto >= 0 ? "+" : "";
  document.getElementById("presupuesto").innerHTML =
    `${signo} ${formatoMoneda(presupuesto)}`;

  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);

  document.getElementById("ingresos").innerHTML =
    `+ ${formatoMoneda(totalIngresos())}`;

  document.getElementById("egresos").innerHTML =
    `- ${formatoMoneda(totalEgresos())}`;
};

const crearIngresoHTML = (ingreso) => {
  return `
    <div class="elemento limpiarfix" id="ingreso-${ingreso.id}">
        <div class="elemento__descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarfix">
            <div class="elemento__valor ingreso--color">+ ${formatearValor(ingreso.valor)}</div>
            <div class="elemento__eliminar">
                <button class="elemento__eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
};

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearEgresoHTML = (egreso, totalIng) => {
  // Manejo de N/A en ítem individual cuando no hay ingresos
  const porcentaje =
    totalIng > 0
      ? Math.round((Math.abs(egreso.valor) / totalIng) * 100) + "%"
      : "N/A";

  return `
    <div class="elemento limpiarfix" id="egreso-${egreso.id}">
        <div class="elemento__descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarfix">
            <div class="elemento__valor egreso--color">- ${formatearValor(Math.abs(egreso.valor))}</div>
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

const cargarEgresos = () => {
  let egresosHTML = "";
  const totalIng = totalIngresos();

  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso, totalIng);
  }

  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

// Carga toda la aplicación al iniciar la página
cargarApp();

const eliminarIngreso = (id) => {
  const indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);

  if (indiceEliminar !== -1) {
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
  }
};

const eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);

  if (indiceEliminar !== -1) {
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
  }
};

const agregarDato = (e) => {
  if (e) e.preventDefault();

  let tipo = document.getElementById("tipo").value;
  let descripcion = document.getElementById("descripcion").value;
  let valorInput = document.getElementById("valor").value;
  let valor = parseFloat(valorInput);

  // Validación estricta: descripción no vacía, valor numérico y mayor a 0
  if (descripcion.trim() !== "" && !isNaN(valor) && valor > 0) {
    if (tipo === "ingreso") {
      ingresos.push(new Ingreso(descripcion, valor));
    } else if (tipo === "egreso") {
      egresos.push(new Egreso(descripcion, valor));
    }

    cargarCabecero();
    cargarIngresos();
    cargarEgresos();

    // Limpieza de campos
    document.getElementById("descripcion").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("tipo").value = "ingreso";
  }
};
