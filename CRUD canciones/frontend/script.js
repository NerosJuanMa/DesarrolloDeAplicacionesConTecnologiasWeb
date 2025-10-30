/* 
 * SCRIPT.JS - LÓGICA DE LA APLICACIÓN WEB DE CANCIONES
 * ====================================================
 * 
 * Este archivo contiene todo el JAVASCRIPT que hace que nuestra aplicación funcione.
 * JavaScript es como el "cerebro" de la aplicación web:
 * 
 * - HTML es el esqueleto (estructura)
 * - CSS es la piel (apariencia)  
 * - JavaScript es el cerebro (comportamiento)
 * 
 * En este archivo vamos a:
 * 1. Conectarnos con el servidor para obtener datos
 * 2. Mostrar esos datos en la página
 * 3. Reaccionar cuando el usuario haga clic en botones
 * 4. Enviar datos al servidor cuando se creen/editen/eliminen canciones
 */

// ===== PASO 1: CONFIGURACIÓN INICIAL =====

/**
 * URL DE LA API - Dirección donde está nuestro servidor
 * =====================================================
 * Es como la dirección de una casa. Nuestro servidor "vive" en localhost:3000
 * y la API (donde están los datos) está en /api/canciones
 */
const URL_API = 'http://localhost:3000/api/canciones';

/**
 * VARIABLE GLOBAL - Para saber si estamos editando
 * ===============================================
 * null = no estamos editando nada
 * número = estamos editando la canción con ese ID
 */
let cancionQueEstamosEditando = null;

// ===== PASO 2: ENCONTRAR ELEMENTOS EN LA PÁGINA =====

/**
 * DOM - Document Object Model
 * ===========================
 * El DOM es como el "mapa" de nuestra página HTML. Con JavaScript podemos
 * encontrar elementos (botones, formularios, etc.) y trabajar con ellos.
 * 
 * document.getElementById() busca un elemento por su ID
 */

// Elementos del formulario
const formulario = document.getElementById('formulario-cancion');
const campoTitulo = document.getElementById('titulo');
const campoArtista = document.getElementById('artista');
const campoAño = document.getElementById('año');

// Botones
const botonGuardar = document.getElementById('btn-guardar');
const botonCancelar = document.getElementById('btn-cancelar');
const botonCargar = document.getElementById('btn-cargar');

// Elementos para mostrar información
const listaCanciones = document.getElementById('lista-canciones');
const mensajes = document.getElementById('mensaje');
const indicadorCarga = document.getElementById('loading');
const contadorCanciones = document.getElementById('total-canciones');
const tituloFormulario = document.getElementById('titulo-formulario');

// Modal de confirmación (ventana para confirmar eliminar)
const modalConfirmar = document.getElementById('modal-confirmar');
const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
const botonConfirmarEliminar = document.getElementById('btn-confirmar-eliminar');
const botonCancelarEliminar = document.getElementById('btn-cancelar-eliminar');

// ===== PASO 3: FUNCIONES AUXILIARES =====

/**
 * MOSTRAR MENSAJE AL USUARIO
 * ==========================
 * Esta función muestra mensajes bonitos al usuario (éxito, error, información)
 * 
 * @param {string} texto - El mensaje que queremos mostrar
 * @param {string} tipo - Tipo de mensaje: 'exito', 'error', 'info'
 */
function mostrarMensaje(texto, tipo = 'info') {
    console.log(`💬 Mostrando mensaje: ${texto}`);
    
    // Cambiar el texto del mensaje
    mensajes.textContent = texto;
    
    // Cambiar el estilo según el tipo
    mensajes.className = `mensaje ${tipo}`;
    
    // Hacer visible el mensaje (quitar la clase 'oculto')
    mensajes.classList.remove('oculto');
    
    // Después de 5 segundos, ocultar el mensaje automáticamente
    setTimeout(() => {
        mensajes.classList.add('oculto');
    }, 5000);
}

/**
 * MOSTRAR/OCULTAR INDICADOR DE CARGA
 * ==================================
 * Muestra "Cargando..." cuando estamos esperando respuesta del servidor
 * 
 * @param {boolean} mostrar - true para mostrar, false para ocultar
 */
function mostrarIndicadorCarga(mostrar) {
    if (mostrar) {
        indicadorCarga.classList.remove('oculto');
        console.log('⏳ Mostrando indicador de carga');
    } else {
        indicadorCarga.classList.add('oculto');
        console.log('✅ Ocultando indicador de carga');
    }
}



/**
 * ACTUALIZAR CONTADOR
 * ===================
 * Actualiza el número que muestra cuántas canciones hay
 * 
 * @param {number} total - Número total de canciones
 */
function actualizarContador(total) {
    contadorCanciones.textContent = total;
    console.log(`📊 Contador actualizado: ${total} canciones`);
}

// ===== PASO 4: COMUNICACIÓN CON EL SERVIDOR =====

/**
 * OBTENER TODAS LAS CANCIONES
 * ===========================
 * Esta función le pide al servidor la lista completa de canciones
 * y las muestra en la página
 */
async function obtenerTodasLasCanciones() {
    try {
        console.log('📡 Solicitando canciones al servidor...');
        mostrarIndicadorCarga(true);
        
        // FETCH: Es como hacer una llamada telefónica al servidor
        // Le decimos "dame todas las canciones"
        const respuesta = await fetch(URL_API);
        
        // Convertir la respuesta a JSON (formato que entendemos)
        const datos = await respuesta.json();
        
        console.log('📦 Datos recibidos del servidor:', datos);
        
        // Verificar si todo salió bien
        if (datos.exito) {
            mostrarCancionesEnPantalla(datos.datos);
            actualizarContador(datos.datos.length);
            mostrarMensaje(datos.mensaje, 'exito');
        } else {
            mostrarMensaje('Error al obtener canciones del servidor', 'error');
        }
        
    } catch (error) {
        // Si algo sale mal (no hay internet, servidor apagado, etc.)
        console.error('❌ Error al obtener canciones:', error);
        mostrarMensaje('No se puede conectar con el servidor', 'error');
    } finally {
        // Siempre ocultar el indicador de carga, sin importar qué pasó
        mostrarIndicadorCarga(false);
    }
}

 // Crear objeto con los datos
    const datosCancion = {
        titulo: titulo,
        artista: artista,
        año: año
    };

/**
 * CREAR NUEVA CANCIÓN
 * ===================
 * Envía los datos de una nueva canción al servidor para que la guarde
 * 
 * @param {object} datosCancion - Objeto con titulo, artista, año
 */
async function crearNuevaCancion(datosCancion) {
    try {
        console.log('📡 Enviando nueva canción al servidor:', datosCancion);
        
        // FETCH con método POST: Es como enviar una carta al servidor
        const respuesta = await fetch(URL_API, {
            method: 'POST', // POST significa "crear algo nuevo"
            headers: {
                'Content-Type': 'application/json' // Decimos que enviamos JSON
            },
            body: JSON.stringify(datosCancion) // Convertir objeto a texto JSON
        });
        
        const datos = await respuesta.json();
        console.log('📦 Respuesta del servidor:', datos);
        
        if (datos.exito) {
            mostrarMensaje(datos.mensaje, 'exito');
            limpiarFormulario();
            obtenerTodasLasCanciones(); // Actualizar la lista
        } else {
            mostrarMensaje(datos.mensaje, 'error');
        }
        
    } catch (error) {
        console.error('❌ Error al crear canción:', error);
        mostrarMensaje('Error al guardar la canción', 'error');
    }
}

/**
 * ACTUALIZAR CANCIÓN EXISTENTE
 * ============================
 * Envía cambios de una canción al servidor
 * 
 * @param {number} id - ID de la canción a actualizar
 * @param {object} datosCancion - Nuevos datos de la canción
 */
async function actualizarCancionExistente(id, datosCancion) {
    try {
        console.log(`📡 Actualizando canción ${id}:`, datosCancion);
        
        // FETCH con método PUT: Significa "actualizar algo existente"
        const respuesta = await fetch(`${URL_API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosCancion)
        });
        
        const datos = await respuesta.json();
        console.log('📦 Respuesta del servidor:', datos);
        
        if (datos.exito) {
            mostrarMensaje(datos.mensaje, 'exito');
            limpiarFormulario();
            obtenerTodasLasCanciones(); // Actualizar la lista
        } else {
            mostrarMensaje(datos.mensaje, 'error');
        }
        
    } catch (error) {
        console.error('❌ Error al actualizar canción:', error);
        mostrarMensaje('Error al actualizar la canción', 'error');
    }
}

/**
 * ELIMINAR CANCIÓN
 * ================
 * Le dice al servidor que borre una canción
 * 
 * @param {number} id - ID de la canción a eliminar
 */
async function eliminarCancion(id) {
    try {
        console.log(`📡 Eliminando canción ${id}`);
        
        // FETCH con método DELETE: Significa "borrar algo"
        const respuesta = await fetch(`${URL_API}/${id}`, {
            method: 'DELETE'
        });
        
        const datos = await respuesta.json();
        console.log('📦 Respuesta del servidor:', datos);
        
        if (datos.exito) {
            mostrarMensaje(datos.mensaje, 'exito');
            obtenerTodasLasCanciones(); // Actualizar la lista
        } else {
            mostrarMensaje(datos.mensaje, 'error');
        }
        
    } catch (error) {
        console.error('❌ Error al eliminar canción:', error);
        mostrarMensaje('Error al eliminar la canción', 'error');
    }
}

// ===== PASO 5: FUNCIONES DE INTERFAZ =====

/**
 * MOSTRAR CANCIONES EN PANTALLA
 * =============================
 * Toma una lista de canciones y las pone bonitas en la página
 * 
 * @param {array} canciones - Array de objetos canción
 */
function mostrarCancionesEnPantalla(canciones) {
    console.log(`🎵 Mostrando ${canciones.length} canciones en pantalla`);
    
    // Si no hay canciones, mostrar mensaje
    if (canciones.length === 0) {
        listaCanciones.innerHTML = '<p class="vacio">No hay canciones. ¡Agrega la primera!</p>';
        return;
    }
    
    // Crear HTML para cada canción
    let htmlCompleto = '';
    
    canciones.forEach(cancion => {
        const htmlCancion = `
            <div class="cancion-item" data-id="${cancion.id}">
                <div class="cancion-info">
                    <h3 class="titulo">${cancion.titulo}</h3>
                    <p class="artista">🎤 ${cancion.artista}</p>
                    <p class="año">� Año: ${cancion.año}</p>
                </div>
                <div class="cancion-acciones">
                    <button class="btn-editar" onclick="prepararEdicion(${cancion.id})">
                        ✏️ Editar
                    </button>
                    <button class="btn-eliminar" onclick="preguntarSiEliminar(${cancion.id}, '${cancion.titulo}')">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `;
        htmlCompleto += htmlCancion;
    });
    
    // Poner todo el HTML en la página
    listaCanciones.innerHTML = htmlCompleto;
}

/**
 * PREPARAR EDICIÓN
 * ================
 * Cuando el usuario hace clic en "Editar", esta función llena el formulario
 * con los datos de la canción a editar
 * 
 * @param {number} id - ID de la canción a editar
 */
function prepararEdicion(id) {
    console.log(`✏️ Preparando edición de canción ${id}`);
    
    // Buscar la canción en la página (una forma simple para este ejercicio)
    const elementoCancion = document.querySelector(`[data-id="${id}"]`);
    if (!elementoCancion) {
        mostrarMensaje('No se encontró la canción a editar', 'error');
        return;
    }
    
    // Extraer datos de la canción del HTML
    const titulo = elementoCancion.querySelector('.titulo').textContent;
    const artista = elementoCancion.querySelector('.artista').textContent.replace('🎤 ', '');
    const añoTexto = elementoCancion.querySelector('.año').textContent;
    const año = añoTexto.replace('📅 Año: ', '');
    
    // Llenar el formulario con estos datos
    campoTitulo.value = titulo;
    campoArtista.value = artista;
    campoAño.value = año;
    
    // Cambiar a modo edición
    cancionQueEstamosEditando = id;
    tituloFormulario.textContent = '✏️ Editar Canción';
    botonGuardar.textContent = '💾 Actualizar Canción';
    botonCancelar.classList.remove('oculto'); // Mostrar botón cancelar
    
    // Hacer scroll suave hacia el formulario
    document.querySelector('.formulario-seccion').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    mostrarMensaje('Editando canción. Modifica los campos y haz clic en "Actualizar"', 'info');
}

/**
 * PREGUNTAR SI ELIMINAR
 * =====================
 * Muestra el modal de confirmación antes de eliminar una canción
 * 
 * @param {number} id - ID de la canción a eliminar
 * @param {string} titulo - Título de la canción (para mostrar en el mensaje)
 */
function preguntarSiEliminar(id, titulo) {
    console.log(`🗑️ Preguntando si eliminar canción: ${titulo}`);
    
    // Cambiar el mensaje del modal
    mensajeConfirmacion.textContent = `¿Estás seguro de que quieres eliminar "${titulo}"?`;
    
    // Mostrar el modal
    modalConfirmar.classList.remove('oculto');
    
    // Configurar qué pasa cuando el usuario confirma
    botonConfirmarEliminar.onclick = () => {
        eliminarCancion(id);
        modalConfirmar.classList.add('oculto'); // Cerrar modal
    };
}

// ===== PASO 6: EVENT LISTENERS =====
// Los event listeners son como "oídos" que escuchan cuando el usuario hace algo

/**
 * ESCUCHAR EL FORMULARIO
 * =====================
 * Cuando el usuario hace clic en "Guardar", esta función se ejecuta
 */
formulario.addEventListener('submit', async (evento) => {
    // Prevenir que la página se recargue (comportamiento por defecto del formulario)
    evento.preventDefault();
    
    console.log('📝 Usuario envió el formulario');
    
    // Obtener los datos que escribió el usuario
    const titulo = campoTitulo.value.trim(); // trim() quita espacios extra
    const artista = campoArtista.value.trim();
    const año = parseInt(campoAño.value); // Convertir a número
    
    // Validar que todos los campos estén llenos
    if (!titulo || !artista || !año) {
        mostrarMensaje('Por favor, completa todos los campos', 'error');
        return; // Salir de la función sin hacer nada más
    }
    
   
    
    // Decidir si crear nueva canción o actualizar existente
    if (cancionQueEstamosEditando) {
        // Estamos editando: actualizar canción existente
        await actualizarCancionExistente(cancionQueEstamosEditando, datosCancion);
    } else {
        // No estamos editando: crear nueva canción
        await crearNuevaCancion(datosCancion);
    }
});

/**
 * ESCUCHAR BOTÓN CANCELAR
 * ======================
 * Cuando el usuario hace clic en "Cancelar" mientras edita
 */
botonCancelar.addEventListener('click', () => {
    console.log('❌ Usuario canceló la edición');
    limpiarFormulario();
    mostrarMensaje('Edición cancelada', 'info');
});

/**
 * ESCUCHAR BOTÓN CARGAR CANCIONES
 * ===============================
 */
botonCargar.addEventListener('click', () => {
    console.log('🔄 Usuario pidió cargar canciones');
    obtenerTodasLasCanciones();
});

/**
 * ESCUCHAR BOTONES DEL MODAL
 * ==========================
 */
botonCancelarEliminar.addEventListener('click', () => {
    console.log('❌ Usuario canceló la eliminación');
    modalConfirmar.classList.add('oculto');
});

// Cerrar modal si hacen clic fuera de él
modalConfirmar.addEventListener('click', (evento) => {
    if (evento.target === modalConfirmar) {
        console.log('❌ Usuario cerró modal haciendo clic fuera');
        modalConfirmar.classList.add('oculto');
    }
});

// Cerrar modal con la tecla Escape
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && !modalConfirmar.classList.contains('oculto')) {
        console.log('❌ Usuario cerró modal con Escape');
        modalConfirmar.classList.add('oculto');
    }
});

// ===== PASO 7: INICIALIZACIÓN =====

/**
 * CUANDO LA PÁGINA TERMINA DE CARGAR
 * ==================================
 * Esta función se ejecuta automáticamente cuando la página está lista
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 ¡Aplicación de canciones iniciada!');
    console.log('✅ Todos los elementos encontrados correctamente');
    
    // Asegurar que el modal esté oculto al iniciar
    if (modalConfirmar) {
        modalConfirmar.classList.add('oculto');
        console.log('✅ Modal de confirmación ocultado');
    }
    
    // Cargar las canciones automáticamente
    obtenerTodasLasCanciones();
    
    console.log('📚 Funciones disponibles:');
    console.log('  - Crear nuevas canciones');
    console.log('  - Ver todas las canciones');
    console.log('  - Editar canciones existentes');
    console.log('  - Eliminar canciones');
});

// ===== MANEJO DE ERRORES GLOBALES =====

/**
 * CAPTURAR ERRORES NO ESPERADOS
 * =============================
 */
window.addEventListener('error', (evento) => {
    console.error('❌ Error global capturado:', evento.error);
    mostrarMensaje('Ha ocurrido un error inesperado. Revisa la consola.', 'error');
});

/* 
 * ===== RESUMEN DE LO QUE HACE ESTE ARCHIVO =====
 * 
 * 1. CONECTAR: Se conecta con el servidor para obtener/enviar datos
 * 2. MOSTRAR: Muestra las canciones en una lista bonita
 * 3. CREAR: Permite agregar nuevas canciones
 * 4. EDITAR: Permite modificar canciones existentes
 * 5. ELIMINAR: Permite borrar canciones (con confirmación)
 * 6. INTERACTUAR: Responde a clicks, formularios, teclas, etc.
 * 
 * CONCEPTOS IMPORTANTES:
 * 
 * - DOM: El "mapa" de elementos HTML que podemos manipular
 * - Fetch: Forma de comunicarse con el servidor (como hacer llamadas telefónicas)
 * - Async/Await: Forma de esperar respuestas del servidor sin bloquear la página
 * - Event Listeners: "Oídos" que escuchan cuando el usuario hace algo
 * - JSON: Formato de datos que usan las aplicaciones web para comunicarse
 * 
 * FLUJO DE LA APLICACIÓN:
 * 
 * 1. La página carga → se ejecuta DOMContentLoaded
 * 2. Se cargan las canciones del servidor → se muestran en pantalla
 * 3. El usuario interactúa (click, escribir, etc.) → los event listeners responden
 * 4. Se envían datos al servidor → se actualiza la pantalla
 */