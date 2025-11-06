document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const formTarea = document.getElementById('form-tarea');
    const nuevaTareaInput = document.getElementById('nueva-tarea');
    const listaTareas = document.getElementById('lista-tareas');
    const formMeta = document.getElementById('form-meta');
    const nuevaMetaInput = document.getElementById('nueva-meta');
    const progresoMetas = document.getElementById('progreso-metas');
    const toggleTheme = document.getElementById('toggle-theme');

    // Tareas
    formTarea.addEventListener('submit', (e) => {
        e.preventDefault();
        const tareaTexto = nuevaTareaInput.value.trim();
        if (tareaTexto) {
            añadirTarea(tareaTexto);
            nuevaTareaInput.value = '';
        }
    });

    function añadirTarea(texto) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${texto}</span>
            <button class="eliminar-tarea" aria-label="Eliminar tarea">❌</button>
        `;
        listaTareas.appendChild(li);

        // Eliminar tarea
        li.querySelector('.eliminar-tarea').addEventListener('click', () => {
            li.remove();
        });
    }

    // Metas
    let metas = [];

    formMeta.addEventListener('submit', (e) => {
        e.preventDefault();
        const metaTexto = nuevaMetaInput.value.trim();
        if (metaTexto) {
            añadirMeta(metaTexto);
            nuevaMetaInput.value = '';
        }
    });

    function añadirMeta(texto) {
        metas.push({ texto, completada: false });
        actualizarProgresoMetas();
    }

    function actualizarProgresoMetas() {
        progresoMetas.innerHTML = '';
        metas.forEach((meta, index) => {
            const metaElement = document.createElement('div');
            metaElement.className = 'meta';
            metaElement.innerHTML = `
                <input type="checkbox" id="meta-${index}" ${meta.completada ? 'checked' : ''}>
                <label for="meta-${index}">${meta.texto}</label>
            `;
            progresoMetas.appendChild(metaElement);

            // Actualizar estado de la meta
            metaElement.querySelector('input').addEventListener('change', (e) => {
                metas[index].completada = e.target.checked;
                actualizarProgresoMetas();
            });
        });
    }

    // Modo oscuro/claro
    toggleTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
