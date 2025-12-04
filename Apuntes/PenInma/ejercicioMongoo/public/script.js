// 📝 MANUAL: Frontend JavaScript para MongoDB
// Este archivo maneja la interacción entre el frontend y la API

class GestorCanciones {
    constructor() {
        this.baseURL = '/api/canciones';
        this.init();
    }

    // 🚀 Inicializar la aplicación
    init() {
        this.configurarEventListeners();
        this.verificarEstadoBD();
        this.cargarTodasLasCanciones();
    }

    // 🎯 Configurar event listeners
    configurarEventListeners() {
        // 📋 Botón ver todas las canciones
        document.getElementById('btnVerTodas').addEventListener('click', () => {
            this.cargarTodasLasCanciones();
        });

        // 🔍 Botón buscar por artista
        document.getElementById('btnBuscarArtista').addEventListener('click', () => {
            this.buscarPorArtista();
        });

        // ⌨️ Enter en el campo de búsqueda
        document.getElementById('inputBuscarArtista').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.buscarPorArtista();
            }
        });

        // ➕ Formulario nueva canción
        document.getElementById('formNuevaCancion').addEventListener('submit', (e) => {
            e.preventDefault();
            this.agregarCancion();
        });
    }

    // 🔍 Verificar estado de la base de datos
    async verificarEstadoBD() {
        try {
            const response = await fetch(this.baseURL);
            const data = await response.json();
            
            if (data.success) {
                this.actualizarEstadoBD('✅ Conectada', 'estado-conectado');
                this.actualizarTotalCanciones(data.count);
            } else {
                this.actualizarEstadoBD('❌ Error', 'estado-desconectado');
            }
        } catch (error) {
            console.error('Error verificando BD:', error);
            this.actualizarEstadoBD('❌ Sin conexión', 'estado-desconectado');
        }
    }

    // 📊 Actualizar estado en la UI
    actualizarEstadoBD(estado, clase) {
        const elemento = document.getElementById('dbStatus');
        elemento.textContent = estado;
        elemento.className = `status-value ${clase}`;
    }

    // 🔢 Actualizar total de canciones
    actualizarTotalCanciones(total) {
        document.getElementById('totalCanciones').textContent = total;
    }

    // 📋 Cargar todas las canciones
    async cargarTodasLasCanciones() {
        this.mostrarCargando();
        this.actualizarTituloResultados('📋 Todas las Canciones');

        try {
            const response = await fetch(this.baseURL);
            const data = await response.json();

            if (data.success) {
                this.mostrarCanciones(data.data);
                this.actualizarTotalCanciones(data.count);
                this.mostrarAlerta(`✅ ${data.count} canciones cargadas`, 'success');
            } else {
                this.mostrarError('Error al cargar las canciones');
            }
        } catch (error) {
            console.error('Error:', error);
            this.mostrarError('Error de conexión con el servidor');
        }
    }

    // 🔍 Buscar canciones por artista
    async buscarPorArtista() {
        const artista = document.getElementById('inputBuscarArtista').value.trim();
        
        if (!artista) {
            this.mostrarAlerta('⚠️ Ingresa el nombre de un artista', 'info');
            return;
        }

        this.mostrarCargando();
        this.actualizarTituloResultados(`🔍 Búsqueda: "${artista}"`);

        try {
            const response = await fetch(`${this.baseURL}/buscar/${encodeURIComponent(artista)}`);
            const data = await response.json();

            if (data.success) {
                this.mostrarCanciones(data.data);
                
                if (data.count === 0) {
                    this.mostrarAlerta(`❌ No se encontraron canciones de "${artista}"`, 'info');
                } else {
                    this.mostrarAlerta(`✅ ${data.count} canción(es) encontrada(s)`, 'success');
                }
            } else {
                this.mostrarError('Error en la búsqueda');
            }
        } catch (error) {
            console.error('Error:', error);
            this.mostrarError('Error de conexión con el servidor');
        }
    }

    // ➕ Agregar nueva canción
    async agregarCancion() {
        const formData = new FormData(document.getElementById('formNuevaCancion'));
        const cancion = Object.fromEntries(formData.entries());

        // 🧹 Limpiar campos vacíos
        Object.keys(cancion).forEach(key => {
            if (cancion[key] === '') {
                delete cancion[key];
            }
        });

        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cancion)
            });

            const data = await response.json();

            if (data.success) {
                this.mostrarAlerta('✅ Canción agregada exitosamente', 'success');
                document.getElementById('formNuevaCancion').reset();
                this.cargarTodasLasCanciones(); // Recargar la lista
            } else {
                if (data.errores) {
                    this.mostrarAlerta(`❌ Errores de validación:\n${data.errores.join('\n')}`, 'error');
                } else {
                    this.mostrarAlerta(`❌ ${data.message}`, 'error');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            this.mostrarError('Error al agregar la canción');
        }
    }

    // 🗑️ Eliminar canción
    async eliminarCancion(id, titulo) {
        if (!confirm(`¿Estás seguro de que deseas eliminar "${titulo}"?`)) {
            return;
        }

        try {
            const response = await fetch(`${this.baseURL}/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                this.mostrarAlerta('✅ Canción eliminada exitosamente', 'success');
                this.cargarTodasLasCanciones(); // Recargar la lista
            } else {
                this.mostrarAlerta(`❌ ${data.message}`, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            this.mostrarError('Error al eliminar la canción');
        }
    }

    // ✏️ Editar canción (implementación básica)
    editarCancion(id, cancion) {
        // 📝 Por simplicidad, rellenamos el formulario con los datos existentes
        document.getElementById('titulo').value = cancion.titulo || '';
        document.getElementById('artista').value = cancion.artista || '';
        document.getElementById('album').value = cancion.album || '';
        document.getElementById('año').value = cancion.año || '';
        document.getElementById('genero').value = cancion.genero || '';
        document.getElementById('duracion').value = cancion.duracion || '';

        // 📜 Scroll hacia el formulario
        document.querySelector('.form-section').scrollIntoView({ 
            behavior: 'smooth' 
        });

        this.mostrarAlerta('📝 Datos cargados en el formulario. Modifica y guarda.', 'info');
        
        // 💡 En una implementación más avanzada, cambiaríamos el formulario a modo "edición"
        // y manejaríamos PUT en lugar de POST
    }

    // 🎨 Mostrar canciones en la UI
    mostrarCanciones(canciones) {
        const container = document.getElementById('resultados');
        
        if (canciones.length === 0) {
            container.innerHTML = `
                <div class="alert alert-info">
                    📭 No hay canciones para mostrar
                </div>
            `;
            return;
        }

        const html = canciones.map(cancion => this.crearCardCancion(cancion)).join('');
        container.innerHTML = html;
        
        // 🎯 Configurar event listeners para los botones de acción
        this.configurarBotonesAccion();

        this.ocultarCargando();
    }

    // 🃏 Crear card de canción
    crearCardCancion(cancion) {
        const fechaCreacion = new Date(cancion.fechaCreacion).toLocaleDateString('es-ES');
        
        return `
            <div class="cancion-card">
                <div class="cancion-header">
                    <div class="cancion-title">
                        <h3>${cancion.titulo}</h3>
                        <div class="artista">👨‍🎤 ${cancion.artista}</div>
                    </div>
                    <div class="cancion-actions">
                        <button class="btn btn-edit" onclick="gestor.editarCancion('${cancion._id}', ${JSON.stringify(cancion).replace(/"/g, '&quot;')})">
                            ✏️ Editar
                        </button>
                        <button class="btn btn-danger" onclick="gestor.eliminarCancion('${cancion._id}', '${cancion.titulo}')">
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
                
                <div class="cancion-details">
                    ${cancion.album ? `
                        <div class="detail-item">
                            <div class="detail-label">💿 Álbum</div>
                            <div class="detail-value">${cancion.album}</div>
                        </div>
                    ` : ''}
                    
                    ${cancion.año ? `
                        <div class="detail-item">
                            <div class="detail-label">📅 Año</div>
                            <div class="detail-value">${cancion.año}</div>
                        </div>
                    ` : ''}
                    
                    ${cancion.genero ? `
                        <div class="detail-item">
                            <div class="detail-label">🎵 Género</div>
                            <div class="detail-value">${cancion.genero}</div>
                        </div>
                    ` : ''}
                    
                    ${cancion.duracion ? `
                        <div class="detail-item">
                            <div class="detail-label">⏱️ Duración</div>
                            <div class="detail-value">${cancion.duracion}</div>
                        </div>
                    ` : ''}
                    
                    <div class="detail-item">
                        <div class="detail-label">📅 Fecha Creación</div>
                        <div class="detail-value">${fechaCreacion}</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">🆔 ID MongoDB</div>
                        <div class="detail-value" style="font-family: monospace; font-size: 0.8rem;">${cancion._id}</div>
                    </div>
                </div>
            </div>
        `;
    }

    // 🎯 Configurar botones de acción (si es necesario)
    configurarBotonesAccion() {
        // Los event listeners se configuran inline en el HTML por simplicidad
        // En una app más compleja, usaríamos event delegation
    }

    // 🔄 Mostrar indicador de carga
    mostrarCargando() {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('resultados').innerHTML = '';
    }

    // ✅ Ocultar indicador de carga
    ocultarCargando() {
        document.getElementById('loading').style.display = 'none';
    }

    // 📝 Actualizar título de resultados
    actualizarTituloResultados(titulo) {
        document.getElementById('resultadosTitle').textContent = titulo;
    }

    // 🔔 Mostrar alerta
    mostrarAlerta(mensaje, tipo = 'info') {
        // Eliminar alertas existentes
        const alertasExistentes = document.querySelectorAll('.alert');
        alertasExistentes.forEach(alerta => alerta.remove());

        // Crear nueva alerta
        const alerta = document.createElement('div');
        alerta.className = `alert alert-${tipo}`;
        alerta.textContent = mensaje;

        // Insertar antes de los resultados
        const seccionResultados = document.querySelector('.results-section');
        seccionResultados.insertBefore(alerta, seccionResultados.firstChild);

        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            if (alerta.parentNode) {
                alerta.remove();
            }
        }, 5000);
    }

    // ❌ Mostrar error
    mostrarError(mensaje) {
        this.ocultarCargando();
        this.mostrarAlerta(mensaje, 'error');
        
        document.getElementById('resultados').innerHTML = `
            <div class="alert alert-error">
                ❌ ${mensaje}
            </div>
        `;
    }
}

// 🚀 Inicializar la aplicación cuando se carga la página
let gestor;

document.addEventListener('DOMContentLoaded', () => {
    gestor = new GestorCanciones();
    console.log('🎵 Aplicación MongoDB inicializada');
});

// 📝 MANUAL: Comparación con manejo de JSON
console.log(`
📚 MANUAL TÉCNICO - Comparación de Enfoques:

🔄 ANTES (con archivos JSON):
   const canciones = JSON.parse(fs.readFileSync('canciones.json'));
   // Modificar array
   fs.writeFileSync('canciones.json', JSON.stringify(canciones));

🗄️ AHORA (con MongoDB):
   const canciones = await Cancion.find();
   const nueva = new Cancion(datos);
   await nueva.save();

✅ VENTAJAS de MongoDB:
   • Operaciones CRUD más simples
   • Validación automática de datos
   • Consultas más potentes (buscar, filtrar, etc.)
   • Concurrencia (múltiples usuarios)
   • Escalabilidad
   • Índices para búsquedas rápidas
`);
