// Configuración de la API
const API_URL = 'http://localhost:3000/api';

// Estado del carrito
let carrito = [];

// ==================== PRODUCTOS ====================

// Cargar productos
async function cargarProductos() {
  try {
    const res = await fetch(`${API_URL}/productos`);
    const data = await res.json();
    console.log('Datos recibidos:', data);
    
    if (data.data && data.data.length > 0) {
      mostrarProductos(data.data);
    } else {
      document.getElementById('productosList').innerHTML = '<p class="empty-message">No hay productos. Crea uno usando el formulario.</p>';
    }
  } catch (error) {
    console.error('Error al cargar productos:', error);
    document.getElementById('productosList').innerHTML = '<p class="empty-message">Error al cargar productos. Verifica que el servidor esté corriendo.</p>';
  }
}

// Mostrar productos en la lista
function mostrarProductos(productos) {
  const lista = document.getElementById('productosList');
  lista.innerHTML = '';
  
  productos.forEach(producto => {
    const div = document.createElement('div');
    div.className = 'producto-card';
    div.innerHTML = `
      <div class="producto-info">
        <h4>${producto.nombre}</h4>
        <p>Stock: ${producto.stock} | Activo: ${producto.activo ? 'Sí' : 'No'}</p>
        <span class="precio">$${producto.precio.toFixed(2)}</span>
      </div>
      <div class="producto-actions">
        <button class="btn-add" onclick="agregarAlCarrito('${producto._id}', '${producto.nombre}', ${producto.precio})">
          + Añadir
        </button>
        <button class="btn-delete" onclick="eliminarProducto('${producto._id}')">
          Eliminar
        </button>
      </div>
    `;
    lista.appendChild(div);
  });
}

// Crear producto
document.getElementById('productoForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const producto = {
    nombre: document.getElementById('nombre').value,
    precio: parseFloat(document.getElementById('precio').value),
    stock: parseInt(document.getElementById('stock').value),
    activo: true,
    imagen: document.getElementById('imagen').value || undefined
  };

  try {
    const res = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
    
    if (res.ok) {
      alert('Producto creado exitosamente');
      e.target.reset();
      cargarProductos();
    }
  } catch (error) {
    console.error('Error al crear producto:', error);
    alert('Error al crear producto');
  }
});

// Eliminar producto
async function eliminarProducto(id) {
  if (!confirm('¿Seguro que quieres eliminar este producto?')) return;
  
  try {
    const res = await fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE'
    });
    
    if (res.ok) {
      alert('Producto eliminado');
      cargarProductos();
    }
  } catch (error) {
    console.error('Error al eliminar producto:', error);
  }
}

// ==================== CARRITO ====================

// Agregar al carrito
function agregarAlCarrito(id, nombre, precio) {
  const existe = carrito.find(item => item.producto === id);
  
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({
      producto: id,
      nombre: nombre,
      precio: precio,
      cantidad: 1
    });
  }
  
  actualizarCarrito();
}

// Quitar del carrito
function quitarDelCarrito(id) {
  carrito = carrito.filter(item => item.producto !== id);
  actualizarCarrito();
}

// Actualizar vista del carrito
function actualizarCarrito() {
  const carritoDiv = document.getElementById('carrito');
  
  if (carrito.length === 0) {
    carritoDiv.innerHTML = '<p class="empty-message">Agrega productos desde la lista</p>';
    document.getElementById('totalPedido').textContent = '0.00';
    return;
  }
  
  carritoDiv.innerHTML = '';
  let total = 0;
  
  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    
    const div = document.createElement('div');
    div.className = 'carrito-item';
    div.innerHTML = `
      <div class="carrito-item-info">
        <strong>${item.nombre}</strong><br>
        <span>$${item.precio.toFixed(2)} x ${item.cantidad} = $${subtotal.toFixed(2)}</span>
      </div>
      <button onclick="quitarDelCarrito('${item.producto}')">Quitar</button>
    `;
    carritoDiv.appendChild(div);
  });
  
  document.getElementById('totalPedido').textContent = total.toFixed(2);
}

// ==================== PEDIDOS ====================

// Crear pedido
document.getElementById('crearPedido').addEventListener('click', async () => {
  const cliente = document.getElementById('cliente').value;
  
  if (!cliente) {
    alert('Por favor ingresa el nombre del cliente');
    return;
  }
  
  if (carrito.length === 0) {
    alert('El carrito está vacío');
    return;
  }
  
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  
  const pedido = {
    cliente: cliente,
    productos: carrito.map(item => ({
      producto: item.producto,
      cantidad: item.cantidad
    })),
    total: total,
    estado: 'pendiente'
  };

  try {
    const res = await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });
    
    if (res.ok) {
      alert('Pedido creado exitosamente');
      carrito = [];
      actualizarCarrito();
      document.getElementById('cliente').value = '';
      cargarPedidos();
    }
  } catch (error) {
    console.error('Error al crear pedido:', error);
    alert('Error al crear pedido');
  }
});

// Cargar pedidos
async function cargarPedidos() {
  try {
    const res = await fetch(`${API_URL}/pedidos`);
    const data = await res.json();
    mostrarPedidos(data.data);
  } catch (error) {
    console.error('Error al cargar pedidos:', error);
  }
}

// Mostrar pedidos
function mostrarPedidos(pedidos) {
  const lista = document.getElementById('pedidosList');
  lista.innerHTML = '';
  
  if (pedidos.length === 0) {
    lista.innerHTML = '<p class="empty-message">No hay pedidos aún</p>';
    return;
  }
  
  pedidos.forEach(pedido => {
    const div = document.createElement('div');
    div.className = 'pedido-card';
    
    const productosHTML = pedido.productos.map(p => 
      `<li>${p.producto?.nombre || 'Producto'} - Cantidad: ${p.cantidad}</li>`
    ).join('');
    
    div.innerHTML = `
      <h4>Cliente: ${pedido.cliente}</h4>
      <p><strong>Total: $${pedido.total.toFixed(2)}</strong></p>
      <p>Fecha: ${new Date(pedido.createdAt).toLocaleString()}</p>
      <span class="estado ${pedido.estado}">${pedido.estado.toUpperCase()}</span>
      <div class="pedido-productos">
        <strong>Productos:</strong>
        <ul>${productosHTML}</ul>
      </div>
    `;
    lista.appendChild(div);
  });
}

// ==================== INICIALIZACIÓN ====================

// Cargar datos al iniciar
cargarProductos();
cargarPedidos();
