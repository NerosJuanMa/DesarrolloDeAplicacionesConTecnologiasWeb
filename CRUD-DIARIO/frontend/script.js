// script.js (cliente) - variables globales y elementos
const URL_API = 'http://localhost:3000/api/diario';
let entradaQueEstamosEditando = null;

const formulario = document.getElementById('formulario-diario');
const campodia = document.getElementById('dia');
const campoanotacion = document.getElementById('anotacion');
const campoestado = document.getElementById('estado');

const botonGuardar = document.getElementById('botonGuardar');
const botonMostrar = document.getElementById('botonMostrar');
const resultados = document.getElementById('resultados');

const contenedorLista = document.getElementById('diarioList'); // usa este ID en el HTML
const indicadorCarga = document.getElementById('loading');
const contadordiario = document.getElementById('total-diario'); // usa este ID en el HTML
const mensajeElem = document.getElementById('mensaje');

// Mostrar mediante botón (método simple)
botonMostrar.addEventListener('click', async () => {
  try {
    const res = await fetch(URL_API);
    const data = await res.json();
    resultados.innerHTML = data.datos.map(item => `<li>${item.dia} - ${item.anotacion} - ${item.estado}</li>`).join('');
  } catch (e) {
    console.error(e);
    resultados.textContent = 'Error al cargar resultados';
  }
});

// Cargar entradas y pintar tarjetas
async function cargarEntradas() {
  try {
    const res = await fetch(URL_API);
    const datos = await res.json();
    if (!datos.exito) throw new Error('Error en respuesta API');

    contenedorLista.innerHTML = '';
    datos.datos.forEach(item => {
      const card = document.createElement('div');
      card.className = 'diario-card';
      card.innerHTML = `
        <h3>${item.dia}</h3>
        <p><strong>anotacion:</strong> ${item.anotacion}</p>
        <p><strong>estado:</strong> ${item.estado}</p>
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
  const anotacion = campoanotacion.value.trim();
  const estado = campoestado.value.trim();
  
  // Validar campos
  if (!dia || !anotacion || !estado) {
    alert('Por favor completa todos los campos');
    return;
  }

  const datosdiario = { dia: dia, anotacion: anotacion, estado: estado };
  await crearNuevaEntrada(datosdiario);
});

// Crear nueva entrada
async function crearNuevaEntrada(datosdiario) {
     console.log('Enviando a API:', datosdiario);
  try {
    
    const respuesta = await fetch(URL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosdiario)
    });
   const resultado = await respuesta.json();
    
    if (resultado.exito) {
      alert('Entrada guardada');
      formulario.reset();
      await cargarEntradas();
    } else {
      alert('Error: ' + (resultado.mensaje || 'no se guardó'));
    }
    
  } catch (error) {
    console.error('Error al crear entrada:', error);
    alert('No se pudo guardar la entrada');
  }
}



