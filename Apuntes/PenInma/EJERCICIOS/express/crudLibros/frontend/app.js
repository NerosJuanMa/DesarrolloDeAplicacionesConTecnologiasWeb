// frontend/app.js
const API = "http://localhost:3001/api/libros";

const tbody = document.getElementById("tbody");
const estado = document.getElementById("estado");

const form = document.getElementById("form-libro");
const formTitle = document.getElementById("form-title");
const idInput = document.getElementById("id");
const tituloInput = document.getElementById("titulo");
const autorInput = document.getElementById("autor");
const anioInput = document.getElementById("anio");
const btnCancelar = document.getElementById("btn-cancelar");

document.getElementById("btn-recargar").addEventListener("click", cargar);

// ===== CRUD =====
async function cargar(){
  setEstado("Cargando...");
  try{
    const res = await fetch(API);
    if(!res.ok) throw new Error("Error al cargar");
    const libros = await res.json();
    pintarTabla(libros);
    setEstado(`Cargados ${libros.length} libros.`);
  }catch(err){
    console.error(err);
    setEstado("❌ Error cargando datos");
  }
}

async function crear(libro){
  const res = await fetch(API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(libro)
  });
  if(!res.ok) throw new Error("Error creando");
  return res.json();
}

async function actualizar(id, libro){
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(libro)
  });
  if(!res.ok) throw new Error("Error actualizando");
  return res.json();
}

async function eliminar(id){
  const res = await fetch(`${API}/${id}`, { method:"DELETE" });
  if(!res.ok && res.status !== 204) throw new Error("Error eliminando");
}

// ===== UI =====
function pintarTabla(libros){
  tbody.innerHTML = libros.map(l => `
    <tr>
      <td>${l.id}</td>
      <td>${escapeHtml(l.titulo)}</td>
      <td>${escapeHtml(l.autor)}</td>
      <td>${l.anio ?? ""}</td>
      <td>
        <div class="acciones">
          <button class="btn-small" data-edit="${l.id}">✏️ Editar</button>
          <button class="btn-small btn-danger" data-del="${l.id}">🗑️ Borrar</button>
        </div>
      </td>
    </tr>
  `).join("");

  // Delegación de eventos
  tbody.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => iniciarEdicion(Number(btn.dataset.edit)));
  });
  tbody.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = Number(btn.dataset.del);
      if(confirm(`¿Seguro que quieres borrar el libro #${id}?`)){
        try{
          await eliminar(id);
          cargar();
        }catch(e){
          alert("No se pudo borrar");
        }
      }
    });
  });
}

function iniciarEdicion(id){
  // Buscamos los valores en la fila de la tabla para precargar el formulario
  const tr = [...tbody.querySelectorAll("tr")].find(r => Number(r.children[0].textContent) === id);
  if(!tr) return;
  const [ , titulo, autor, anio ] = [...tr.children].map(td => td.textContent);

  idInput.value = id;
  tituloInput.value = titulo;
  autorInput.value = autor;
  anioInput.value = anio || "";

  formTitle.textContent = "✏️ Editar libro";
  btnCancelar.hidden = false;
  tituloInput.focus();
}

btnCancelar.addEventListener("click", () => {
  form.reset();
  idInput.value = "";
  formTitle.textContent = "➕ Añadir libro";
  btnCancelar.hidden = true;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    titulo: tituloInput.value.trim(),
    autor:  autorInput.value.trim(),
    anio:   anioInput.value ? Number(anioInput.value) : null
  };
  if(!payload.titulo || !payload.autor){
    alert("Título y autor son obligatorios.");
    return;
  }

  try{
    if(idInput.value){
      await actualizar(Number(idInput.value), payload);
    }else{
      await crear(payload);
    }
    form.reset();
    idInput.value = "";
    formTitle.textContent = "➕ Añadir libro";
    btnCancelar.hidden = true;
    cargar();
  }catch(err){
    console.error(err);
    alert("❌ Hubo un problema guardando el libro.");
  }
});

function setEstado(msg){ estado.textContent = msg; }

function escapeHtml(str){
  return String(str).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

// Cargar al entrar
cargar();
