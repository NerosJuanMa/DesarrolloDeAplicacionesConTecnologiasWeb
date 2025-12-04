const URL_API = '/api/reservas';
let reservaEditando = null;

// Elementos
const formulario = document.getElementById('formulario-reserva');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const asientos = document.getElementById('asientos');
const fecha = document.getElementById('fecha');
const lista = document.getElementById('lista-reservas');
const mensaje = document.getElementById('mensaje');
const loading = document.getElementById('loading');
const total = document.getElementById('total-reservas');
const tituloFormulario = document.getElementById('titulo-formulario');
const btnCancelar = document.getElementById('btn-cancelar');

function mostrarMensaje(texto, tipo='info'){
  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`;
  mensaje.classList.remove('oculto');
  setTimeout(()=> mensaje.classList.add('oculto'), 4000);
}

function mostrarCarga(m){
  if(m) loading.classList.remove('oculto'); else loading.classList.add('oculto');
}

async function obtenerReservas(){
  try{
    mostrarCarga(true);
    const r = await fetch(URL_API);
    const datos = await r.json();
    if(datos.exito){
      mostrarReservas(datos.datos);
      total.textContent = datos.datos.length;
      mostrarMensaje(datos.mensaje, 'exito');
    } else mostrarMensaje('Error al obtener reservas','error');
  }catch(e){
    mostrarMensaje('No se puede conectar al servidor','error');
  }finally{ mostrarCarga(false); }
}

function crearHTMLReserva(reserva){
  return `
    <div class="reserva-item" data-id="${reserva._id}">
      <div>
        <h3>${reserva.nombre}</h3>
        <p>${reserva.email} • Asientos: ${reserva.asientos} • Fecha: ${reserva.fecha}</p>
      </div>
      <div>
        <button onclick="prepararEdicion('${reserva._id}')">✏️ Editar</button>
        <button onclick="preguntarSiEliminar('${reserva._id}','${reserva.nombre}')">🗑️ Eliminar</button>
      </div>
    </div>
  `;
}

function mostrarReservas(reservas){
  if(reservas.length===0){ lista.innerHTML='<p class="vacio">No hay reservas</p>'; return; }
  lista.innerHTML = reservas.map(r=>crearHTMLReserva(r)).join('');
}

function limpiarFormulario(){
  formulario.reset();
  reservaEditando = null;
  tituloFormulario.textContent = '➕ Crear Nueva Reserva';
  btnCancelar.classList.add('oculto');
}

formulario.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const datos = { nombre: nombre.value.trim(), email: email.value.trim(), asientos: parseInt(asientos.value), fecha: fecha.value.trim() };
  if(!datos.nombre||!datos.email||!datos.asientos||!datos.fecha){ mostrarMensaje('Completa todos los campos','error'); return; }

  try{
    if(reservaEditando){
      const r = await fetch(`${URL_API}/${reservaEditando}`,{ method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(datos)});
      const resJson = await r.json();
      if(resJson.exito) mostrarMensaje(resJson.mensaje,'exito'); else mostrarMensaje('Error al actualizar','error');
    } else {
      const r = await fetch(URL_API,{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(datos)});
      const resJson = await r.json();
      if(resJson.exito) mostrarMensaje(resJson.mensaje,'exito'); else mostrarMensaje('Error al crear','error');
    }
    limpiarFormulario();
    obtenerReservas();
  }catch(e){ mostrarMensaje('Error de red','error'); }
});

function prepararEdicion(id){
  const el = document.querySelector(`[data-id="${id}"]`);
  if(!el){ mostrarMensaje('Reserva no encontrada','error'); return; }
  const nombreText = el.querySelector('h3').textContent;
  const info = el.querySelector('p').textContent; // email • Asientos: X • Fecha: YYYY
  const parts = info.split('•').map(s=>s.trim());
  const emailText = parts[0];
  const asientosText = parts[1].replace('Asientos: ','');
  const fechaText = parts[2].replace('Fecha: ','');

  nombre.value = nombreText; email.value = emailText; asientos.value = asientosText; fecha.value = fechaText;
  reservaEditando = id;
  tituloFormulario.textContent = '✏️ Editar Reserva';
  btnCancelar.classList.remove('oculto');
}

btnCancelar.addEventListener('click', ()=>{ limpiarFormulario(); mostrarMensaje('Edición cancelada','info'); });

async function eliminarReserva(id){
  try{
    const r = await fetch(`${URL_API}/${id}`,{ method:'DELETE' });
    const resJson = await r.json();
    if(resJson.exito) mostrarMensaje(resJson.mensaje,'exito'); else mostrarMensaje('Error al eliminar','error');
    obtenerReservas();
  }catch(e){ mostrarMensaje('Error de red','error'); }
}

function preguntarSiEliminar(id,nombre){
  const modal = document.getElementById('modal-confirmar');
  const mensajeConfirm = document.getElementById('mensaje-confirmacion');
  const btnConfirm = document.getElementById('btn-confirmar-eliminar');
  const btnCancel = document.getElementById('btn-cancelar-eliminar');
  mensajeConfirm.textContent = `¿Eliminar reserva de ${nombre}?`;
  modal.classList.remove('oculto');
  btnConfirm.onclick = ()=>{ eliminarReserva(id); modal.classList.add('oculto'); };
  btnCancel.onclick = ()=>{ modal.classList.add('oculto'); };
}

// Inicializar
window.addEventListener('DOMContentLoaded', ()=>{ obtenerReservas(); const cargar = document.getElementById('btn-cargar'); if(cargar) cargar.addEventListener('click', obtenerReservas); });
