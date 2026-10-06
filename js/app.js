// Realizado por Randy García

const ingresos = [new Ingreso("Salario", 3000), new Ingreso("Venta auto", 600)];

const egresos = [new Egreso("Renta", 900), new Egreso("Ropa", 400)];

// Función para cargar el cabecero
const cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();

  // Validamos si totalIngresos() es mayor a 0 para evitar divisiones entre cero (NaN)
  let porcentajeEgreso =
    totalIngresos() > 0 ? totalEgresos() / totalIngresos() : 0;

  // Signo + para presupuesto positivo
  document.getElementById("presupuesto").innerHTML =
    `+ ${formatoMoneda(presupuesto)}`;

  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);

  // Signo + para ingresos
  document.getElementById("ingresos").innerHTML =
    `+ ${formatoMoneda(totalIngresos())}`;

  // Signo - para egresos
  document.getElementById("egresos").innerHTML =
    `- ${formatoMoneda(totalEgresos())}`;
};

// Función para dar formato de porcentaje con protección NaN
const formatoPorcentaje = (valor) => {
  if (isNaN(valor) || !isFinite(valor)) {
    return "0%";
  }
  return valor.toLocaleString("es-MX", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

// Función para dar formato de moneda

const formatoMoneda = (valor) => {
  return valor.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
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
  return `
    <div class="elemento limpiarfix" id="ingreso-${ingreso.id}">
        <div class="elemento__descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarfix">
            <!-- Agregamos la clase ingreso--color y el signo + -->
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

const cargarEgresos = () => {
  let egresosHTML = "";
  const totalIng = totalIngresos(); // Obtiene el total acumulado

  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso, totalIng);
  }

  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso, totalIngresos) => {
  // Calculamos porcentaje sin decimales usando Math.round() o .toFixed(0)
  const porcentaje =
    totalIngresos > 0
      ? Math.round((Math.abs(egreso.valor) / totalIngresos) * 100) + "%"
      : "0%";

  return `
    <div class="elemento limpiarfix" id="egreso-${egreso.id}">
        <div class="elemento__descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarfix">
            <!-- Usamos Math.abs() para que formatearValor no agregue otro signo "-" -->
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

const cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

const eliminarIngreso = (id) => {
  // Busca el índice del ingreso a eliminar
  const indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);

  if (indiceEliminar !== -1) {
    ingresos.splice(indiceEliminar, 1);

    // Llama a la función correcta de la cabecera
    cargarCabecero();
    cargarIngresos();
    cargarEgresos(); // Actualiza porcentajes al cambiar el total
  }
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
      ingresos.push(new Ingreso(descripcion, parseFloat(valor)));

      cargarCabecero();
      cargarIngresos();
    } else if (tipo === "egreso") {
      egresos.push(new Egreso(descripcion, parseFloat(valor)));

      cargarCabecero();
      cargarEgresos();
    }
  }
};

// Función para dar formato de moneda/valor a los números
const formatearValor = (valor) => {
  return valor.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
};
