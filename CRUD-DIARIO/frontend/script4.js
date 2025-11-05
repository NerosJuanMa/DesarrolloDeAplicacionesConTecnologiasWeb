// =======================
// 🔧 VARIABLES GLOBALES
// =======================
const API = 'http://localhost:3000/api/diario';

const formulario = document.getElementById('formulario-diario');
const campodia = document.getElementById('dia');
const campoestado = document.getElementById('estado');
const campoanotacion = document.getElementById('anotacion');

const botonMostrar = document.getElementById('botonMostrar');
const resultados = document.getElementById('resultados');

const contenedorLista = document.getElementById('diarioList');
const contadordiario = document.getElementById('total-diario');
const modalEdicion = document.getElementById('modal-edicion');
const modalConfirmar = document.getElementById('modal-confirmar');

// =======================
// 📋 MOSTRAR / CARGAR ENTRADAS
// =======================
async function cargarEntradas() {
  try {
    contenedorLista.innerHTML = '<p>Cargando...</p>';
    const res = await fetch(API);
    const datos = await res.json();
    if (!datos.exito) return (contenedorLista.innerHTML = '<p>Error al cargar.</p>');

    contenedorLista.innerHTML = '';
    datos.datos.forEach(item => {
      const card = document.createElement('div');
      card.className = 'diario-card';
      card.innerHTML = `
        <h3>${item.dia}</h3>
        <p><strong>Estado:</strong> ${item.estado}</p>
        <p><strong>Anotación:</strong> ${item.anotacion}</p>
        <button class="botoneditar" 
          onclick="mostrarModalEdicion(${item.id}, '${item.dia}', '${item.estado}', '${item.anotacion}')">
          ✏️ Editar
        </button>
        <button class="botonborrar" onclick="mostrarModalConfirmacion('¿Eliminar esta entrada?', ${item.id})">
          🗑️ Eliminar
        </button>
      `;
      contenedorLista.appendChild(card);
    });

    contadordiario.textContent = datos.datos.length;
  } catch (err) {
    console.error('Error cargando entradas:', err);
    contenedorLista.innerHTML = '<p>Error al cargar los datos</p>';
  }
}
cargarEntradas();

// =======================
// 🧩 CREAR NUEVA ENTRADA
// =======================
formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const dia = campodia.value.trim();
  const estado = campoestado.value.trim();
  const anotacion = campoanotacion.value.trim();

  if (!dia || !estado || !anotacion) {
    alert('Por favor completa todos los campos');
    return;
  }

  const datosdiario = { dia, estado, anotacion };

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosdiario)
    });
    const resultado = await res.json();

    if (resultado.exito) {
      alert('✅ Entrada agregada');
      formulario.reset();
      await cargarEntradas();
    } else {
      alert('⚠️ Error: ' + (resultado.mensaje || 'No se guardó'));
    }
  } catch (error) {
    console.error('Error al crear entrada:', error);
    alert('⚠️ No se pudo guardar la entrada');
  }
});

// =======================
// ✏️ EDITAR ENTRADA
// =======================
async function editarEntrada(id, dia, estado, anotacion) {
  const idNum = Number(id);
  if (Number.isNaN(idNum)) {
    alert('ID inválido. No se puede editar la entrada.');
    return;
  }

  try {
    const res = await fetch(`${API}/${idNum}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dia, estado, anotacion })
    });

    const data = await res.json();
    if (data.exito) {
      alert('✅ Entrada actualizada correctamente');
      cargarEntradas();
    } else {
      alert('⚠️ ' + data.mensaje);
    }
  } catch (error) {
    console.error('❌ Error de red al editar:', error);
    alert('❌ Error de red al intentar editar.');
  }
}

// =======================
// 🪟 MODAL DE EDICIÓN
// =======================
function mostrarModalEdicion(id, diaActual, estadoActual, anotacionActual) {
  //document.getElementById('mensaje-edicion').textContent = mensajeE;
  const btnGuardar = document.getElementById('btn-guardar-cambios');
  btnGuardar.dataset.id = String(id);

  // Rellenar los campos
  document.getElementById('edit-dia').value = diaActual;
  document.getElementById('edit-estado').value = estadoActual;
  document.getElementById('edit-anotacion').value = anotacionActual;

  console.log('🟢 Mostrar modal para ID:', id);
  modalEdicion.classList.remove('oculto');
}

function ocultarModalEdicion() {
  modalEdicion.classList.add('oculto');
}

document.getElementById('btn-cancelar-cambios').addEventListener('click', ocultarModalEdicion);

document.getElementById('btn-guardar-cambios').addEventListener('click', () => {
  const idString = document.getElementById('btn-guardar-cambios').dataset.id;
  const idNum = Number(idString);

  if (Number.isNaN(idNum)) {
    alert('ID inválido. No se puede editar la entrada.');
    ocultarModalEdicion();
    return;
  }

  const dia = document.getElementById('edit-dia').value.trim();
  const estado = document.getElementById('edit-estado').value.trim();
  const anotacion = document.getElementById('edit-anotacion').value.trim();

  editarEntrada(idNum, dia, estado, anotacion);
  ocultarModalEdicion();
});

// =======================
// 🗑️ BORRAR ENTRADA
// =======================
async function borrarEntrada(id) {
  const idNum = Number(id);
  if (Number.isNaN(idNum)) {
    alert('ID inválido. No se puede eliminar la entrada.');
    return;
  }

  try {
    const res = await fetch(`${API}/${idNum}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.exito) {
      alert('🗑️ Entrada eliminada');
      cargarEntradas();
    } else {
      alert('⚠️ ' + data.mensaje);
    }
  } catch (error) {
    console.error('❌ Error de red al borrar:', error);
    alert('❌ Error de red al intentar eliminar.');
  }
}

// =======================
// ⚠️ MODAL DE CONFIRMACIÓN
// =======================
function mostrarModalConfirmacion(mensaje, idElemento) {
  document.getElementById('mensaje-confirmacion').textContent = mensaje;
  document.getElementById('btn-confirmar-eliminar').dataset.id = String(idElemento);
  modalConfirmar.classList.remove('oculto');
}

function ocultarModalConfirmacion() {
  modalConfirmar.classList.add('oculto');
}

document.getElementById('btn-cancelar-eliminar').addEventListener('click', ocultarModalConfirmacion);
document.getElementById('btn-confirmar-eliminar').addEventListener('click', () => {
  const idString = document.getElementById('btn-confirmar-eliminar').dataset.id;
  const idNum = Number(idString);
  borrarEntrada(idNum);
  ocultarModalConfirmacion();
});

// =======================
// 🔄 AUTOREFRESCAR Y FECHA
// =======================
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
document.getElementById('dia').value = formattedDate;
