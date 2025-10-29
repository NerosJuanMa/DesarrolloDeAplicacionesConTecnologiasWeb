// Ajusta si tu API corre en otro puerto/origen:
const API = "http://localhost:3000/api/libros";

const GRID  = document.getElementById("grid");
const BTN   = document.getElementById("recargar");
const FORM  = document.getElementById("form-libro");
const MSG   = document.getElementById("msg");

BTN.addEventListener("click", cargarLibros);
window.addEventListener("DOMContentLoaded", cargarLibros);

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
        anio: anio ? Number(anio) : undefined
      })
    });
    if (!res.ok) throw new Error("No se pudo crear el libro");
    // Opcional: podrías leer el creado: const nuevo = await res.json();

    FORM.reset();
    setMsg("Libro añadido correctamente ✅");
    await cargarLibros(); // refresca el grid
  } catch (err) {
    setMsg("❌ " + err.message, true);
  }
});

async function cargarLibros() {
  GRID.innerHTML = `<p class="empty">Cargando libros…</p>`;
  try {
    const r = await fetch(API);
    if (!r.ok) throw new Error("Error al cargar");
    const libros = await r.json();

    if (!Array.isArray(libros) || libros.length === 0) {
      GRID.innerHTML = `<p class="empty">📭 No hay libros todavía.</p>`;
      return;
    }

    GRID.innerHTML = libros.map(l => cardLibro(l)).join("");
  } catch (e) {
    GRID.innerHTML = `<p class="empty error">❌ ${e.message}</p>`;
  }
}

function cardLibro(libro) {
  // El botón de eliminar necesita el ID para la API
  const anio = (libro.anio ?? "") !== "" ? `<p><strong>Año:</strong> ${libro.anio}</p>` : "";
  return `
    <article class="card" data-id="${libro.id}">
      <img src="libro.png" alt="Portada del libro por defecto">
      <h3>${escapeHtml(libro.titulo ?? "Sin título")}</h3>
      <p><strong>Autor:</strong> ${escapeHtml(libro.autor ?? "Desconocido")}</p>
      ${anio}
      <button class="btn-delete" data-id="${libro.id}">Eliminar</button>
    </article>
  `;
}

// utilidades simples
function setMsg(texto, isError = false) {
  MSG.textContent = texto;
  MSG.className = "msg " + (isError ? "error" : "ok");
}
function limpiarMsg() { setMsg(""); }
function escapeHtml(s="") {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// --- NUEVA FUNCIÓN ---

/**
 * ❌ Llama a la API para eliminar un libro y recarga la lista.
 * @param {number} id - El ID del libro a eliminar.
 */
async function eliminarLibro(id) {
    limpiarMsg();

    // Confirmación simple antes de borrar
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
            throw new Error("Error al eliminar el libro.");
        }

        setMsg(`Libro con ID ${id} eliminado correctamente.`);
        await cargarLibros(); // Refrescar el grid
    } catch (err) {
        setMsg("❌ Error: " + err.message, true);
    }
}
// Añade este listener DESPUÉS de definir la variable GRID
GRID.addEventListener("click", (e) => {
    // Usamos .closest() para encontrar el botón de eliminación, incluso si el clic fue en un icono dentro del botón
    const deleteButton = e.target.closest(".btn-delete");

    if (deleteButton) {
        // Obtenemos el ID del atributo data-id
        const libroId = deleteButton.dataset.id;
        
        if (libroId) {
            // Llama a la función de eliminación
            eliminarLibro(libroId);
        }
    }
});