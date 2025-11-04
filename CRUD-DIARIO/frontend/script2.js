const URL_API = 'http://localhost:3000/api/diario';

let entradaQueEstamosEditando = null;

// Elementos del formulario
const formulario = document.getElementById('formulario-diario');
const campoDia = document.getElementById('dia');
const campoAnotacion = document.getElementById('anotacion');
const campoEstado = document.getElementById('estado');
// Botones
const botonGuardar = document.getElementById('btn-guardar');
const botonCancelar = document.getElementById('btn-cancelar');
const botonCargar = document.getElementById('btn-cargar');
const botoneditar = document.getElementById('botoneditar');
const botonborrar = document.getElementById('botonborrar');
// Elementos para mostrar información
const listadiario = document.getElementById('lista-diario');
const mensajes = document.getElementById('mensaje');
const indicadorCarga = document.getElementById('loading');
const contadordiario = document.getElementById('total-diario');
const tituloFormulario = document.getElementById('titulo-formulario');

// Modal de confirmación (ventana para confirmar eliminar)
const modalConfirmar = document.getElementById('modal-confirmar');
const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
const botonConfirmarEliminar = document.getElementById('btn-confirmar-eliminar');
const botonCancelarEliminar = document.getElementById('btn-cancelar-eliminar');

//Metodo de Roberto---
const botonMostrar = document.getElementById("botonMostrar");
const resultados = document.getElementById("resultados");


botonMostrar.addEventListener ("click",()=>{
    fetch(URL_API)
        .then ((res)=> res.json())
            .then((data)=>{
                resultados.innerHTML = data.datos
                    .map(item => `<li>${item.Dia}-${item.Anotacion}-${item.Estado}</li>`)
                    .join("");
            });
});
// Fin Metodo de Roberto--

//**********************************************************************************
// METODO JAIME */
async function cargarentradaDiario() {
      try {
        const res = await fetch('http://localhost:3000/api/diario');
        const entradaDiario = await res.json();
 
        const contenedor = document.getElementById('diarioList');
        contenedor.innerHTML = '';
 
        entradaDiario.datos.forEach(diario => {
          const card = document.createElement('div');
          card.className = 'diario-card';
          card.innerHTML = `
            <h3>${diario.Dia}</h3>
            <p><strong>Anotacion:</strong> ${diario.Anotacion}</p>
            <p><strong>Estado:</strong> ${diario.Estado}</p>
            <button class="botoneditar" onclick="editarEntrada(${diario.id})"> ✏️ Editar</button>
            <button class="botonborrar" onclick="borrarEntrada(${diario.id}, '${diario.dia}')"> 🗑️ Eliminar</button>
          `;
          contenedor.appendChild(card);
        });
      } catch (error) {
        console.error('Error cargando diario:', error);
        document.getElementById('diarioList').innerHTML =
          '<p>Error al cargar los datos 😢</p>';
      }
    }
 
    cargarentradaDiario();

//******************************************************** */
/**
 * MOSTRAR DIARIO EN PANTALLA
 * =============================
 * 
 * @param {array} diario - Array de objetos diario
 */
function mostrarEntradasEnPantalla(diario) {
    console.log(`🎵 Mostrando ${diario.length} diario en pantalla`);
    
    // Si no hay diario, mostrar mensaje
    if (diario.length === 0) {
        listadiario.innerHTML = '<p class="vacio">No hay diario. ¡Agrega la primera!</p>';
        return;
    }
    
    // Crear HTML para cada entrada de diario
    let htmlCompleto = '';
    
    diario.forEach(diario => {
        const htmldiario = `
            <div class="diario-item" data-id="${diario.id}">
                <div class="diario-info">
                    <h3 class="dia">${diario.dia}</h3>
                    <p class="anotacion">🎤 ${diario.anotacion}</p>
                    <p class="estado">� Año: ${diario.estado}</p>
                </div>
                <div class="diario-acciones">
                    <button class="btn-editar" onclick="prepararEdicion(${diario.id})">
                        ✏️ Editar
                    </button>
                    <button class="btn-eliminar" onclick="preguntarSiEliminar(${diario.id}, '${diario.dia}')">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `;
        htmlCompleto += htmldiario;
    });
    
    // Poner todo el HTML en la página
    listadiario.innerHTML = htmlCompleto;
}

async function obtenerTodasLasEntradas() {
    try {
        console.log('📡 Solicitando diario al servidor...');
        mostrarIndicadorCarga(true);
        // FETCH: Es como hacer una llamada telefónica al servidor
        // Le decimos "dame todas las diario"
        const respuesta = await fetch(URL_API);
        
        // Convertir la respuesta a JSON (formato que entendemos)
        const datos = await respuesta.json();
        
        console.log('📦 Datos recibidos del servidor:', datos);
        
        // Verificar si todo salió bien
        if (datos.exito) {
            mostrarEntradasEnPantalla(datos.datos);
            actualizarContador(datos.datos.length);
            mostrarMensaje(datos.mensaje, 'exito');
        } else {
            mostrarMensaje('Error al obtener diario del servidor', 'error');
        }
        
    } catch (error) {
        // Si algo sale mal (no hay internet, servidor apagado, etc.)
        console.error('❌ Error al obtener diario:', error);
        mostrarMensaje('No se puede conectar con el servidor', 'error');
    } finally {
        // Siempre ocultar el indicador de carga, sin importar qué pasó
        mostrarIndicadorCarga(false);
    }
}
// Crear objeto con los datos
    // const datosdiario = {
    //     Dia: dia,
    //     Anotacion: anotacion,
    //     Estado: estado
    // };
/* CREAR NUEVA CANCIÓN
 * ===================
 * Envía los datos de una nueva canción al servidor para que la guarde
 * 
 * @param {object} datosdiario - Objeto con titulo, artista, año
 */
// function generarIdUnico() {
//     // timestamp + número aleatorio para minimizar colisiones
//     return Date.now() + Math.floor(Math.random() * 1000);
// }
// function obtenerSiguienteId(diario) {
//     // Si no hay canciones, el primer ID es 1
//     if (diario.length === 0) {
//         return 1;
//     }
//     // Buscar el ID más alto y sumarle 1
//     const ids = diario.map(diario => diario.id); // Extraer solo los IDs
//     const idMasAlto = Math.max(...ids); // Encontrar el mayor
//     return idMasAlto + 1;
// }
async function crearNuevaEntrada(datosdiario) {
    try {
        const respuesta = await fetch('http://localhost:3000/api/diario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosdiario)
        });
        const resultado = await respuesta.json();

        if (resultado.exito) {
            alert('✅ Entrada guardada correctamente');
            formulario.reset();
        } else {
            alert('❌ Error al guardar la entrada');
        }
    } catch (error) {
        console.error('Error al crear entrada:', error);
        alert('No se pudo guardar la entrada');
    }
}


/**
 * ESCUCHAR EL FORMULARIO
 * =====================
 * Cuando el usuario hace clic en "Guardar", esta función se ejecuta
 */
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault(); // Evita recargar la página
    
    console.log('📝 Usuario envió el formulario');
    
    // Obtener los datos que escribió el usuario
    const dia = campoDia.value.trim();
    const anotacion = campoAnotacion.value.trim();
    const estado = campoEstado.value.trim(); 
    
    // Validar campos
    if (!dia || !anotacion || !estado) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Crear objeto con los datos
    const datosdiario = {
        Dia: dia,
        Anotacion: anotacion,
        Estado: estado
    };
    
    // Llamar a la función que guarda la nueva entrada
    await crearNuevaEntrada(datosdiario);
});

/**
 * ACTUALIZAR CANCIÓN EXISTENTE
 * ============================
 * Envía cambios de una canción al servidor
 * 
 * @param {number} id - ID de la canción a actualizar
 * @param {object} datosdiario - Nuevos datos del diario
 */
// async function actualizarEntradaExistente(id, datosdiario) {
//     try {
//         console.log(`📡 Actualizando Diario ${id}:`, datosdiario);
        
//         // FETCH con método PUT: Significa "actualizar algo existente"
//         const respuesta = await fetch(`${URL_API}/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(datosdiario)
//         });
        
//         const datos = await respuesta.json();
//         console.log('📦 Respuesta del servidor:', datos);
        
//         if (datos.exito) {
//             mostrarMensaje(datos.mensaje, 'exito');
//             limpiarFormulario();
//             obtenerTodasLasEntradas(); // Actualizar la lista
//         } else {
//             mostrarMensaje(datos.mensaje, 'error');
//         }
        
//     } catch (error) {
//         console.error('❌ Error al actualizar la entrada al diario:', error);
//         mostrarMensaje('Error al actualizar la entrada al diario', 'error');
//     }
// }
// //TOTAL ENTRADAS al DIARIO
// function actualizarContador(total) {
//     contadorDiario.textContent = total;
//     console.log(`📊 Contador actualizado: ${total} entradas al diario`);
// }
