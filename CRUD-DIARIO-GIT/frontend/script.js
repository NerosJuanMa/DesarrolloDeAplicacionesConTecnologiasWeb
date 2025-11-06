// script.js (cliente) - variables globales y elementos
const API = 'http://localhost:3000/api/diario'

const formulario = document.getElementById('formulario-diario');
const campodia = document.getElementById('dia');
const campoestado = document.getElementById('estado');
const campoanotacion = document.getElementById('anotacion');

const botonMostrar = document.getElementById('botonMostrar');
const resultados = document.getElementById('resultados');

const contenedorLista = document.getElementById('diarioList'); // usa este ID en el HTML

const contadordiario = document.getElementById('total-diario'); // usa este ID en el HTML


// Mostrar mediante botón (método simple)
botonMostrar.addEventListener('click', async () => {
  try {
    const res = await fetch(API);
    const data = await res.json();
    resultados.innerHTML = data.datos.map(item => `<li>${item.dia} - ${item.estado} - ${item.anotacion}</li>`).join('');
  } catch (e) {
    console.error(e);
    resultados.textContent = 'Error al cargar resultados';
  }
});

// Cargar entradas y pintar tarjetas
async function cargarEntradas() {
  try {
    contenedorLista.innerHTML = '<p>Cargando...</p>';
    const res = await fetch(API);
    const datos = await res.json();
    //if (!datos.exito) throw new Error('Error en respuesta API');
    if (!datos.exito) return contenedorLista.innerHTML = '<p>Error al cargar.</p>';

    contenedorLista.innerHTML = '';
    datos.datos.forEach(item => {
      const card = document.createElement('div');
      card.className = 'diario-card';
      card.innerHTML = `
        <h3>${item.dia}</h3>
        <p><strong>estado:</strong> ${item.estado}</p>
        <p><strong>anotacion:</strong> ${item.anotacion}</p>
        <button class="botoneditar" onclick="mostrarModalEdicion(${item.id}, ${item.diaActual}, ${item.estadoActual}, ${item.anotacionActual},)"> ✏️ Editar</button>
        <button class="botonborrar" onclick="mostrarModalConfirmacion(${item.id}, '${item.id}')"> 🗑️ Eliminar</button>
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

// Listener del formulario (asegúrate async)
formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const dia = campodia.value.trim();
  const estado = campoestado.value.trim();
  const anotacion = campoanotacion.value.trim();


  // Validar campos
  if (!dia || !estado || !anotacion) {
    alert('Por favor completa todos los campos');
    return;
  }

  const datosdiario = { dia: dia, estado: estado, anotacion: anotacion };
  await crearNuevaEntrada(datosdiario);
});

// Crear nueva entrada
async function crearNuevaEntrada(datosdiario) {
  console.log('Enviando a API:', datosdiario);
  try {
    const respuesta = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosdiario)
    });
    const resultado = await respuesta.json();

    if (resultado.exito) {
      alert('✅ Entrada agregada');
      formulario.reset();
      await cargarEntradas();
    } else {
      alert('⚠️ Error: ' + (resultado.mensaje || 'no se guardó'));
    }

  } catch (error) {
    console.error('Error al crear entrada:', error);
    alert('⚠️ No se pudo guardar la entrada');
  }
}

// =======================
// 🧩 EDITAR ENTRADA
// =======================
async function editarEntrada(id, dia, estado, anotacion) {
  const idNum = Number(id);
  if (Number.isNaN(idNum)) {
    console.error('Intentando editar con id inválido:', id);
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
      cargarEntradas(); // O mostrarEntradas(), según tu nombre real
    } else {
      alert('⚠️ ' + data.mensaje);
    }
  } catch (error) {
    console.error('❌ Error de red al editar:', error);
    alert('❌ Error de red al intentar editar.');
  }
}

// =======================
// 🧩 MODAL DE EDICIÓN
// =======================
const modalEdicion = document.getElementById('modal-edicion');

function mostrarModalEdicion(id, dia, estado, anotacion) {
  //document.getElementById('mensaje-edicion').textContent = mensajeE;
  document.getElementById('btn-guardar-cambios').dataset.id = String(id);
  const btnGuardar = document.getElementById('btn-guardar-cambios');
  btnGuardar.dataset.id = String(id);
  // Rellenar los campos con los datos actuales
  document.getElementById('edit-id').value = id
  document.getElementById('edit-dia').value = dia;
  document.getElementById('edit-estado').value = estado;
  document.getElementById('edit-anotacion').value = anotacion;

  console.log('Mostrar modal para id:', id); // debug
  modalEdicion.classList.remove('oculto2'); // ✅ usar el modal correcto
}

function ocultarModalEdicion() {
  modalEdicion.classList.add('oculto2');
}

const btnCancelarCambios = document.getElementById('btn-cancelar-cambios');
btnCancelarCambios.addEventListener('click', ocultarModalEdicion);

const btnGuardarCambios = document.getElementById('btn-guardar-cambios');
btnGuardarCambios.addEventListener('click', () => {
  const idString = btnGuardarCambios.dataset.id;
  console.log('Confirmar guardar - dataset.id =', idString); // debug

  const idNum = Number(idString);
  if (Number.isNaN(idNum)) {
    alert('ID inválido. No se puede editar la entrada.');
    ocultarModalEdicion();
    return;
  }

  // ✅ Tomar los valores actuales desde los inputs del modal
  const id = document.getElementById('edit-id').value.trim();
  const dia = document.getElementById('edit-dia').value.trim();
  const estado = document.getElementById('edit-estado').value.trim();
  const anotacion = document.getElementById('edit-anotacion').value.trim();

  editarEntrada(id, dia, estado, anotacion);
  ocultarModalEdicion();
});

// BORRADO
async function borrarEntrada(id) {
  // convertir a número (por si viene como "123")
  const idNum = Number(id);
  if (Number.isNaN(idNum)) {
    console.error('Intentando borrar con id inválido:', id);
    alert('ID inválido. No se puede eliminar la entrada.');
    return;
  }

  try {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.exito) {
      alert('🗑️ Entrada eliminada');
      cargarEntradas();
      console.log('🗑️ Entrada eliminada:', data.datos);
    } else {
      alert('⚠️ ' + data.mensaje);
      console.warn('⚠️ No se pudo eliminar:', data.mensaje);
    }
  } catch (error) {
    console.error('❌ Error de red al borrar:', error);
    alert('❌ Error de red al intentar eliminar.');
  }
}

const modalConfirmar = document.getElementById('modal-confirmar');

function mostrarModalConfirmacion(mensaje, idElemento) {
  // Guardar siempre como string
  document.getElementById('mensaje-confirmacion').textContent = mensaje;
  document.getElementById('btn-confirmar-eliminar').dataset.id = String(idElemento);
  console.log('Mostrar modal para id:', idElemento); // debug
  modalConfirmar.classList.remove('oculto');
}

function ocultarModalConfirmacion() {
  modalConfirmar.classList.add('oculto');
}

const btnCancelar = document.getElementById('btn-cancelar-eliminar');
btnCancelar.addEventListener('click', ocultarModalConfirmacion);

const btnconfeliminar = document.getElementById('btn-confirmar-eliminar');
btnconfeliminar.addEventListener('click', () => {
  const idString = btnconfeliminar.dataset.id;
  console.log('Confirmar eliminar - dataset.id =', idString); // debug

  const idNum = Number(idString);
  if (Number.isNaN(idNum)) {
    alert('ID inválido. No se puede eliminar la entrada.');
    ocultarModalConfirmacion();
    return;
  }

  borrarEntrada(idNum);
  ocultarModalConfirmacion();
});




//REFRESCAR
// 🔄 Cargar al inicio
cargarEntradas();

// Obtener la fecha de hoy en formato YYYY-MM-DD
const today = new Date();
const year = today.getFullYear();
// getMonth() es base 0, por eso se suma 1
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

// Establecer el valor del campo de fecha
document.getElementById('dia').value = formattedDate;