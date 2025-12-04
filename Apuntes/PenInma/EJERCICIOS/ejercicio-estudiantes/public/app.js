// ====================================
// APLICACIÓN FRONTEND - GESTIÓN DE ESTUDIANTES
// ====================================

// VARIABLES GLOBALES
const API_URL = 'http://localhost:3000/api/estudiantes';
let estudiantes = [];
let estudianteEditando = null;

// ELEMENTOS DOM
const formulario = document.getElementById('formularioEstudiante');
const listaEstudiantes = document.getElementById('listaEstudiantes');
const mensajes = document.getElementById('mensajes');
const totalEstudiantes = document.getElementById('totalEstudiantes');

// Campos del formulario
const estudianteId = document.getElementById('estudianteId');
const nombre = document.getElementById('nombre');
const edad = document.getElementById('edad');
const carrera = document.getElementById('carrera');
const promedio = document.getElementById('promedio');

// Botones
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');
const btnCargarEstudiantes = document.getElementById('btnCargarEstudiantes');
const btnLimpiarLista = document.getElementById('btnLimpiarLista');

// Modal
const modal = document.getElementById('modalConfirmacion');
const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
const btnCancelarEliminar = document.getElementById('btnCancelarEliminar');

// ====================================
// FUNCIONES DE UTILIDAD
// ====================================

/**
 * Muestra un mensaje al usuario
 * @param {string} mensaje - El mensaje a mostrar
 * @param {string} tipo - Tipo de mensaje: 'success' o 'error'
 */
function mostrarMensaje(mensaje, tipo = 'success') {
    mensajes.textContent = mensaje;
    mensajes.className = `mensajes ${tipo}`;
    mensajes.classList.remove('hidden');
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        mensajes.classList.add('hidden');
    }, 5000);
    
    console.log(`📢 ${tipo.toUpperCase()}: ${mensaje}`);
}

/**
 * Limpia el formulario y resetea el estado de edición
 */
function limpiarFormulario() {
    formulario.reset();
    estudianteId.value = '';
    estudianteEditando = null;
    btnGuardar.textContent = '💾 Guardar Estudiante';
    btnCancelar.classList.add('hidden');
    console.log('🧹 Formulario limpiado');
}

/**
 * Obtiene la clase CSS para el promedio según su valor
 * @param {number} promedioValor - El valor del promedio
 * @returns {string} - La clase CSS correspondiente
 */
function obtenerClasePromedio(promedioValor) {
    if (promedioValor >= 9) return 'excelente';
    if (promedioValor >= 8) return 'bueno';
    if (promedioValor >= 7) return 'regular';
    return 'bajo';
}

/**
 * Actualiza el contador de estudiantes
 */
function actualizarContador() {
    totalEstudiantes.textContent = estudiantes.length;
}

// ====================================
// FUNCIONES DE API
// ====================================

/**
 * Realiza una petición HTTP al servidor
 * @param {string} url - URL de la petición
 * @param {object} opciones - Opciones de la petición (método, headers, body)
 * @returns {Promise} - Promesa con la respuesta
 */
async function hacerPeticion(url, opciones = {}) {
    try {
        console.log(`🌐 Realizando petición ${opciones.method || 'GET'} a: ${url}`);
        
        const respuesta = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...opciones.headers
            },
            ...opciones
        });
        
        const datos = await respuesta.json();
        
        if (!respuesta.ok) {
            throw new Error(datos.mensaje || 'Error en la petición');
        }
        
        console.log('✅ Petición exitosa:', datos);
        return datos;
        
    } catch (error) {
        console.error('❌ Error en petición:', error);
        throw error;
    }
}

/**
 * Obtiene todos los estudiantes del servidor
 */
async function cargarEstudiantes() {
    try {
        btnCargarEstudiantes.disabled = true;
        btnCargarEstudiantes.textContent = '⏳ Cargando...';
        
        const respuesta = await hacerPeticion(API_URL);
        estudiantes = respuesta.data;
        
        mostrarEstudiantes();
        mostrarMensaje(`✅ Se cargaron ${estudiantes.length} estudiantes correctamente`);
        
    } catch (error) {
        mostrarMensaje(`❌ Error al cargar estudiantes: ${error.message}`, 'error');
        estudiantes = [];
        mostrarEstudiantes();
    } finally {
        btnCargarEstudiantes.disabled = false;
        btnCargarEstudiantes.textContent = '🔄 Cargar Estudiantes';
    }
}

/**
 * Guarda un estudiante (crear o actualizar)
 * @param {object} datosEstudiante - Datos del estudiante
 */
async function guardarEstudiante(datosEstudiante) {
    try {
        btnGuardar.disabled = true;
        btnGuardar.textContent = '⏳ Guardando...';
        
        let respuesta;
        
        if (estudianteEditando) {
            // Actualizar estudiante existente
            respuesta = await hacerPeticion(`${API_URL}/${estudianteEditando.id}`, {
                method: 'PUT',
                body: JSON.stringify(datosEstudiante)
            });
        } else {
            // Crear nuevo estudiante
            respuesta = await hacerPeticion(API_URL, {
                method: 'POST',
                body: JSON.stringify(datosEstudiante)
            });
        }
        
        mostrarMensaje(respuesta.mensaje);
        limpiarFormulario();
        await cargarEstudiantes(); // Recargar la lista
        
    } catch (error) {
        mostrarMensaje(`❌ Error al guardar: ${error.message}`, 'error');
    } finally {
        btnGuardar.disabled = false;
        btnGuardar.textContent = estudianteEditando ? '📝 Actualizar' : '💾 Guardar Estudiante';
    }
}

/**
 * Elimina un estudiante
 * @param {number} id - ID del estudiante a eliminar
 */
async function eliminarEstudiante(id) {
    try {
        const respuesta = await hacerPeticion(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        mostrarMensaje(respuesta.mensaje);
        await cargarEstudiantes(); // Recargar la lista
        
    } catch (error) {
        mostrarMensaje(`❌ Error al eliminar: ${error.message}`, 'error');
    }
}

// ====================================
// FUNCIONES DE INTERFAZ
// ====================================

/**
 * Muestra la lista de estudiantes en el DOM
 */
function mostrarEstudiantes() {
    actualizarContador();
    
    if (estudiantes.length === 0) {
        listaEstudiantes.innerHTML = `
            <p class="mensaje-vacio">
                📚 No hay estudiantes registrados. 
                <br>¡Agrega el primer estudiante usando el formulario!
            </p>
        `;
        return;
    }
    
    const html = estudiantes.map(estudiante => {
        const clasePromedio = obtenerClasePromedio(estudiante.promedio);
        
        return `
            <div class="estudiante-card" data-id="${estudiante.id}">
                <div class="estudiante-info">
                    <h3>👤 ${estudiante.nombre}</h3>
                    <p><strong>🎂 Edad:</strong> ${estudiante.edad} años</p>
                    <p><strong>🎓 Carrera:</strong> ${estudiante.carrera}</p>
                    <p><strong>📊 Promedio:</strong> 
                        <span class="promedio ${clasePromedio}">${estudiante.promedio}</span>
                    </p>
                </div>
                <div class="estudiante-acciones">
                    <button class="btn btn-edit" onclick="editarEstudiante(${estudiante.id})">
                        📝 Editar
                    </button>
                    <button class="btn btn-danger" onclick="confirmarEliminar(${estudiante.id}, '${estudiante.nombre}')">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    listaEstudiantes.innerHTML = html;
    console.log(`📋 Mostrando ${estudiantes.length} estudiantes`);
}

/**
 * Prepara el formulario para editar un estudiante
 * @param {number} id - ID del estudiante a editar
 */
function editarEstudiante(id) {
    estudianteEditando = estudiantes.find(est => est.id === id);
    
    if (!estudianteEditando) {
        mostrarMensaje('❌ Estudiante no encontrado', 'error');
        return;
    }
    
    // Llenar el formulario con los datos del estudiante
    estudianteId.value = estudianteEditando.id;
    nombre.value = estudianteEditando.nombre;
    edad.value = estudianteEditando.edad;
    carrera.value = estudianteEditando.carrera;
    promedio.value = estudianteEditando.promedio;
    
    // Cambiar el texto del botón y mostrar cancelar
    btnGuardar.textContent = '📝 Actualizar Estudiante';
    btnCancelar.classList.remove('hidden');
    
    // Scroll al formulario
    document.querySelector('.formulario-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    mostrarMensaje(`📝 Editando: ${estudianteEditando.nombre}`, 'success');
    console.log('📝 Modo edición activado para:', estudianteEditando);
}

/**
 * Muestra el modal de confirmación para eliminar
 * @param {number} id - ID del estudiante
 * @param {string} nombreEstudiante - Nombre del estudiante
 */
function confirmarEliminar(id, nombreEstudiante) {
    mensajeConfirmacion.textContent = `¿Estás seguro de que deseas eliminar a "${nombreEstudiante}"?`;
    modal.classList.remove('hidden');
    
    // Configurar el botón de confirmación
    btnConfirmarEliminar.onclick = () => {
        eliminarEstudiante(id);
        modal.classList.add('hidden');
    };
}

/**
 * Limpia la lista visual de estudiantes
 */
function limpiarLista() {
    if (estudiantes.length === 0) {
        mostrarMensaje('ℹ️ La lista ya está vacía', 'error');
        return;
    }
    
    estudiantes = [];
    mostrarEstudiantes();
    mostrarMensaje('🧹 Lista limpiada correctamente');
    console.log('🧹 Lista de estudiantes limpiada');
}

// ====================================
// EVENT LISTENERS
// ====================================

// Envío del formulario
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validar datos
    const datosEstudiante = {
        nombre: nombre.value.trim(),
        edad: parseInt(edad.value),
        carrera: carrera.value.trim(),
        promedio: parseFloat(promedio.value)
    };
    
    // Validaciones adicionales
    if (!datosEstudiante.nombre) {
        mostrarMensaje('❌ El nombre es requerido', 'error');
        nombre.focus();
        return;
    }
    
    if (datosEstudiante.edad < 16 || datosEstudiante.edad > 100) {
        mostrarMensaje('❌ La edad debe estar entre 16 y 100 años', 'error');
        edad.focus();
        return;
    }
    
    if (!datosEstudiante.carrera) {
        mostrarMensaje('❌ La carrera es requerida', 'error');
        carrera.focus();
        return;
    }
    
    if (datosEstudiante.promedio < 0 || datosEstudiante.promedio > 10) {
        mostrarMensaje('❌ El promedio debe estar entre 0 y 10', 'error');
        promedio.focus();
        return;
    }
    
    await guardarEstudiante(datosEstudiante);
});

// Botón cancelar
btnCancelar.addEventListener('click', () => {
    limpiarFormulario();
    mostrarMensaje('✅ Edición cancelada');
});

// Botón cargar estudiantes
btnCargarEstudiantes.addEventListener('click', cargarEstudiantes);

// Botón limpiar lista
btnLimpiarLista.addEventListener('click', limpiarLista);

// Botón cancelar eliminación
btnCancelarEliminar.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Cerrar modal al hacer clic fuera
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
    }
});

// ====================================
// INICIALIZACIÓN
// ====================================

/**
 * Inicializa la aplicación
 */
function iniciarApp() {
    console.log('🚀 Iniciando aplicación de gestión de estudiantes...');
    console.log('📍 API URL:', API_URL);
    
    // Mostrar mensaje de bienvenida
    mostrarMensaje('👋 ¡Bienvenido! Haz clic en "Cargar Estudiantes" para comenzar');
    
    // Auto-cargar estudiantes al iniciar
    setTimeout(() => {
        cargarEstudiantes();
    }, 2000);
    
    console.log('✅ Aplicación iniciada correctamente');
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', iniciarApp);

// ====================================
// FUNCIONES GLOBALES (para los botones inline)
// ====================================

// Hacer las funciones disponibles globalmente para los event handlers inline
window.editarEstudiante = editarEstudiante;
window.confirmarEliminar = confirmarEliminar;
