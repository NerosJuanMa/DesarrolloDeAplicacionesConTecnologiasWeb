// script.js — versión simple y didáctica
// - Carga senderos con GET /api/senderos
// - Pinta tarjetas sencillas
// - Envía el formulario a POST /api/senderos

// Usar URL absoluta para evitar problemas de CORS/404
const API_URL = 'http://localhost:3001/api/senderos';

// Elementos del DOM
const contenedor = document.getElementById('senderosList');
const form = document.getElementById('formulario-sendero');

// Crear tarjeta simple con botones de editar/borrar
function crearTarjeta(s) {
  const card = document.createElement('article');
  card.className = 'sendero-card';

  const titulo = document.createElement('h3');
  titulo.textContent = s.nombre;

  const zona = document.createElement('p');
  zona.textContent = `📍 Zona: ${s.zona}`;

  const desc = document.createElement('p');
  desc.textContent = s.descripcion;

  const meta = document.createElement('small');
  meta.style.opacity = '0.8';
  meta.textContent = `ID: ${s.id}`;

  // Botones de acción 
  const botones = document.createElement('div');
  botones.style.marginTop = '10px';
  
  const btnEditar = document.createElement('button');
  btnEditar.textContent = '✏️ Editar';
  btnEditar.className = 'btn-editar';
  btnEditar.onclick = () => editarSendero(s);

  const btnBorrar = document.createElement('button');
  btnBorrar.textContent = '🗑️ Borrar';
  btnBorrar.className = 'btn-borrar';
  btnBorrar.onclick = () => borrarSendero(s.id);

  botones.appendChild(btnEditar);
  botones.appendChild(btnBorrar);

  card.appendChild(titulo);
  card.appendChild(zona);
  card.appendChild(desc);
  card.appendChild(meta);
  card.appendChild(botones);

  return card;
}

// Pintar lista
function pintarLista(lista) {
  contenedor.innerHTML = '';
  if (!Array.isArray(lista) || lista.length === 0) {
    contenedor.textContent = 'No hay senderos. Añade uno con el formulario.';
    return;
  }

  const frag = document.createDocumentFragment();
  lista.forEach(s => frag.appendChild(crearTarjeta(s)));
  contenedor.appendChild(frag);
}

// Variable global para saber si estamos editando
let senderoEnEdicion = null;

// Editar sendero - MUY SIMPLE (rellena el formulario)
function editarSendero(sendero) {
  // Rellenar el formulario con los datos actuales
  document.getElementById('nombre').value = sendero.nombre;
  document.getElementById('zona').value = sendero.zona;
  document.getElementById('descripcion').value = sendero.descripcion;

  // Cambiar el título y guardar que estamos editando
  document.getElementById('titulo-formulario').textContent = '✏️ Editando sendero';
  senderoEnEdicion = sendero;

  // Hacer scroll al formulario
  document.getElementById('formulario-sendero').scrollIntoView({ behavior: 'smooth' });
}

// Borrar sendero - MUY SIMPLE
async function borrarSendero(id) {
  if (!confirm('¿Estás seguro de que quieres borrar este sendero?')) {
    return; // Si cancela, no hace nada
  }

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      alert('Error al borrar el sendero');
      return;
    }

    alert('Sendero borrado correctamente');
    cargar(); // Recargar la lista
  } catch (err) {
    alert('No se pudo conectar con el servidor');
    console.error(err);
  }
}

// Cargar desde backend
async function cargar() {
  contenedor.textContent = 'Cargando senderos...';
  try {
    console.log('🔄 Intentando cargar senderos desde:', API_URL);
    const res = await fetch(API_URL);
    console.log('📡 Respuesta del servidor:', res.status, res.statusText);
    
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('📦 Datos recibidos:', data);
    pintarLista(data);
  } catch (e) {
    console.error('❌ Error al cargar:', e);
    contenedor.innerHTML = `
      <div style="color: red; padding: 20px; border: 1px solid red; border-radius: 5px;">
        <h3>❌ Error al cargar senderos</h3>
        <p><strong>Mensaje:</strong> ${e.message}</p>
        <p><strong>Posibles causas:</strong></p>
        <ul>
          <li>El servidor no está iniciado (ejecuta <code>iniciar-servidor.bat</code>)</li>
          <li>El servidor no está en el puerto 3001</li>
          <li>Problema de CORS o conexión</li>
        </ul>
        <p><strong>URL intentada:</strong> ${API_URL}</p>
      </div>
    `;
  }
}
// Enviar formulario (CREAR o EDITAR)
form.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  // Sacar valores del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const zona = document.getElementById('zona').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();

  // Validación básica
  if (!nombre || !zona || !descripcion) {
    alert('Por favor rellena nombre, zona y descripción.');
    return;
  }

  const datos = { nombre, zona, descripcion };

  try {
    let res;
    
    if (senderoEnEdicion) {
      // MODO EDICIÓN - PUT
      res = await fetch(`${API_URL}/${senderoEnEdicion.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
    } else {
      // MODO CREACIÓN - POST
      res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
    }

    if (!res.ok) {
      const texto = await res.text();
      alert('Error: ' + (texto || res.status));
      return;
    }

    // Éxito: limpiar y resetear
    alert(senderoEnEdicion ? 'Sendero actualizado' : 'Sendero creado');
    form.reset();
    senderoEnEdicion = null; // Resetear modo edición
    document.getElementById('titulo-formulario').textContent = '🌳¿Conoces algún sendero que quieras compartir?';
    cargar();

  } catch (err) {
    alert('No se pudo conectar con el servidor.');
    console.error(err);
  }
});
window.addEventListener('DOMContentLoaded', cargar);
