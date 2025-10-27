// 🔑 Clave GIPHY
const API_KEY = "u3mZu89ro8VFyihqQOMG03M3CwI0DD7Y";
const LIMIT = 10; // nº de GIFs por página

// 🔗 Enlaces con el HTML 
const form   = document.getElementById("formulario-busqueda");
const input  = document.getElementById("campo-busqueda");
const estado = document.getElementById("mensaje-estado");
const grid   = document.getElementById("zona-resultados");
const btnTop = document.getElementById("boton-tendencias");

// 🧩 Render mínimo
function render(items) {
  if (!Array.isArray(items) || items.length === 0) {
    grid.innerHTML = `<p class="mini">Sin resultados. Prueba otra palabra.</p>`;
    return;
  }
  grid.innerHTML = items.map(it => {
    const src = it.images?.downsized_medium?.url || it.images?.original?.url;
    const titulo = it.title || "GIF";
    const link = it.url;
    return `
      <article class="card">
        <img src="${src}" alt="${titulo}" loading="lazy" referrerpolicy="no-referrer">
        <div class="info">
          <h3 class="title" title="${titulo}">${titulo}</h3>
          
        </div>
      </article>
    `;
  }).join("");
}

// 🌐 Petición genérica
async function cargar(url) {
  try {
    estado.textContent = "Cargando…";
    grid.setAttribute("aria-busy", "true");
    grid.innerHTML = "";

    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);

    const json = await res.json();
    render(json.data);

    const mostrados = Math.min(LIMIT, json.pagination?.count || json.data?.length || 0);
    estado.textContent = `Listo. Mostrando ${mostrados} GIFs.`;
  } catch (e) {
    console.error(e);
    estado.textContent = "❌ Error al cargar los GIFs.";
    grid.innerHTML = `<p class="mini">Revisa la consola para más detalles.</p>`;
  } finally {
    grid.setAttribute("aria-busy", "false");
  }
}

// 📦 URLs rápidas
const urlBuscar   = q => `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(q)}&limit=${LIMIT}&rating=pg`;
const urlTendencias =   `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${LIMIT}&rating=pg`;

// 🖱️ Eventos
form.addEventListener("submit", e => {
  e.preventDefault();
  const q = input.value.trim();
  if (!q) { estado.textContent = "Escribe una palabra para buscar."; return; }
  cargar(urlBuscar(q));
});

btnTop.addEventListener("click", () => {
  input.value = "";
  cargar(urlTendencias);
});

// 🚀 Al cargar la página: tendencias
window.addEventListener("DOMContentLoaded", () => cargar(urlTendencias));
