// =================================================================
// CONFIGURACIÓN Y SELECTORES
// =================================================================
const API = "http://localhost:3000/api/libros";

const GRID  = document.getElementById("grid");
const BTN   = document.getElementById("recargar");
const FORM  = document.getElementById("form-libro");
const MSG   = document.getElementById("msg");

// =================================================================
// UTILIDADES (Mensajes y Sanitización)
// =================================================================

function setMsg(texto, isError = false) {
    MSG.textContent = texto;
    MSG.className = "msg " + (isError ? "error" : "ok");
}

function limpiarMsg() { 
    setMsg(""); 
}

function escapeHtml(s="") {
    // Escapa caracteres especiales para evitar XSS
    return s.replace(/[&<>"']/g, c => ({
        '&':'&amp;',
        '<':'&lt;',
        '>':'&gt;',
        '"':'&quot;',
        "'":'&#39;'
    }[c]));
}

// =================================================================
// RENDERIZADO DEL DOM
// =================================================================

function cardLibro(libro) {
    // Genera la tarjeta HTML para un libro, incluyendo el botón de eliminar
    const anio = (libro.anio ?? "") !== "" ? `<p><strong>Año:</strong> ${libro.anio}</p>` : "";
    return `
        <article class="card" data-id="${libro.id}">
           
            <h3>${escapeHtml(libro.titulo ?? "Sin título")}</h3>
            <p><strong>Autor:</strong> ${escapeHtml(libro.autor ?? "Desconocido")}</p>
            ${anio}
            <button class="btn-delete" data-id="${libro.id}" aria-label="Eliminar ${escapeHtml(libro.titulo)}">
                Eliminar
            </button>
        </article>
    `;
}

// =================================================================
// LÓGICA CRUD (CREATE, READ, DELETE)
// =================================================================

/**
 * READ: Carga todos los libros de la API y refresca la cuadrícula.
 */
async function cargarLibros() {
    GRID.innerHTML = `<p class="empty">Cargando libros…</p>`;
    try {
        const r = await fetch(API);
        if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
        const libros = await r.json();

        if (!Array.isArray(libros) || libros.length === 0) {
            GRID.innerHTML = `<p class="empty">📭 No hay libros todavía.</p>`;
            return;
        }

        // Mapea y une las tarjetas
        GRID.innerHTML = libros.map(l => cardLibro(l)).join("");
    } catch (e) {
        GRID.innerHTML = `<p class="empty error">❌ Error al cargar: ${e.message}</p>`;
    }
}

/**
 * DELETE: Llama a la API para eliminar un libro y recarga la lista.
 * @param {string|number} id - El ID del libro a eliminar.
 */
async function eliminarLibro(id) {
    limpiarMsg();

    if (!confirm(`¿Estás seguro de que quieres eliminar el libro con ID ${id}?`)) {
        return;
    }

    try {
        const res = await fetch(`${API}/${id}`, {
            method: "DELETE",
        });

        if (res.status === 404) {
            throw new Error("Libro no encontrado.");
        }
        if (!res.ok) {
            // Intenta leer el mensaje de error del backend si existe
            const errorData = await res.json();
            throw new Error(errorData.error || "Error desconocido al eliminar el libro.");
        }

        setMsg(`Libro con ID ${id} eliminado correctamente. ✅`);
        await cargarLibros(); // Refresca el grid
    } catch (err) {
        setMsg("❌ Error: " + err.message, true);
    }
}

// =================================================================
// LISTENERS DE EVENTOS
// =================================================================

// 1. Carga inicial y Recargar
BTN.addEventListener("click", cargarLibros);
window.addEventListener("DOMContentLoaded", cargarLibros);

// 2. CREATE (Envío del Formulario)
FORM.addEventListener("submit", async (e) => {
    e.preventDefault();
    limpiarMsg();

    const titulo = document.getElementById("titulo").value.trim();
    const autor  = document.getElementById("autor").value.trim();
    const anio   = document.getElementById("anio").value.trim();

    if (!titulo || !autor) {
        setMsg("Título y autor son obligatorios", true);
        return;
    }

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                titulo, autor,
                // Convierte a número solo si hay valor
                anio: anio ? Number(anio) : undefined 
            })
        });
        
        if (!res.ok) throw new Error("No se pudo crear el libro.");

        FORM.reset();
        setMsg("Libro añadido correctamente. ✅");
        await cargarLibros(); // Refresca el grid
    } catch (err) {
        setMsg("❌ Error al crear: " + err.message, true);
    }
});

// 3. DELETE (Delegación de Eventos en el GRID)
GRID.addEventListener("click", (e) => {
    // Usamos .closest() para encontrar el botón de eliminación, sin importar dónde se hizo clic dentro de él
    const deleteButton = e.target.closest(".btn-delete");

    if (deleteButton) {
        const libroId = deleteButton.dataset.id;
        
        if (libroId) {
            eliminarLibro(libroId);
        }
    }
});