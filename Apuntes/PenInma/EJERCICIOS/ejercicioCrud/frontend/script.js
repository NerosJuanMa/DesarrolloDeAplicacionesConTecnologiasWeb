const API = "http://localhost:3000/api/libros";

const grid = document.getElementById("grid");
const btnRecargar = document.getElementById("recargar");
const form = document.getElementById("form-libro");
const msg = document.getElementById("msg");

// Event listeners
btnRecargar.addEventListener("click", cargarLibros);
window.addEventListener("DOMContentLoaded", cargarLibros);
form.addEventListener("submit", crearLibro);

// Delegación de eventos para botones dinámicos
grid.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = e.target.dataset.id;
    eliminarLibro(id);
  }
});

// Crear nuevo libro
async function crearLibro(e) {
  e.preventDefault();
  limpiarMsg();

  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();
  const anio = document.getElementById("anio").value.trim();

  if (!titulo || !autor) {
    mostrarMsg("Título y autor son obligatorios", true);
    return;
  }

  try {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        autor,
        anio: anio ? Number(anio) : null
      })
    });

    if (!response.ok) {
      throw new Error("Error al crear el libro");
    }

    form.reset();
    mostrarMsg("Libro añadido correctamente ✅");
    await cargarLibros();
  } catch (error) {
    mostrarMsg("❌ " + error.message, true);
  }
}

// Cargar lista de libros
async function cargarLibros() {
  grid.innerHTML = `<p class="empty">Cargando libros...</p>`;
  
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Error al cargar los libros");
    }
    
    const libros = await response.json();

    if (libros.length === 0) {
      grid.innerHTML = `<p class="empty">📭 No hay libros todavía.</p>`;
      return;
    }

    grid.innerHTML = libros.map(crearTarjetaLibro).join("");
  } catch (error) {
    grid.innerHTML = `<p class="empty error">❌ ${error.message}</p>`;
  }
}

// Crear HTML para cada libro
function crearTarjetaLibro(libro) {
  const anio = libro.anio ? `<p><strong>Año:</strong> ${libro.anio}</p>` : "";
  
  return `
    <article class="card" data-id="${libro.id}">
      <img src="libro.png" alt="Portada del libro">
      <h3>${libro.titulo}</h3>
      <p><strong>Autor:</strong> ${libro.autor}</p>
      ${anio}
      <button class="btn-delete" data-id="${libro.id}">🗑️ Eliminar</button>
    </article>
  `;
}

// Eliminar libro
async function eliminarLibro(id) {
  if (!confirm(`¿Estás seguro de eliminar el libro con ID ${id}?`)) {
    return;
  }

  try {
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    if (response.status === 404) {
      throw new Error("Libro no encontrado");
    }
    
    if (!response.ok) {
      throw new Error("Error al eliminar el libro");
    }

    mostrarMsg(`Libro eliminado correctamente ✅`);
    await cargarLibros();
  } catch (error) {
    mostrarMsg("❌ " + error.message, true);
  }
}

// Funciones auxiliares
function mostrarMsg(texto, isError = false) {
  msg.textContent = texto;
  msg.className = "msg " + (isError ? "error" : "ok");
}

function limpiarMsg() {
  msg.textContent = "";
  msg.className = "msg";
}