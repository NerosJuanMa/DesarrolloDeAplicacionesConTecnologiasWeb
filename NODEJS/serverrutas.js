// ✅ Importamos el módulo nativo HTTP
import http from 'node:http';

// 1️⃣ Creamos el servidor
const server = http.createServer((req, res) => {
  // Configuramos el tipo de contenido (texto con acentos y emojis)
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // 2️⃣ Analizamos la ruta que el cliente solicita
  if (req.url === '/' || req.url === '/inicio') {
    res.statusCode = 200; // código 200 = OK
    res.end('🏠 Bienvenido a la página principal');
  }

  // 📞 Ruta de contacto
  else if (req.url === '/contacto') {
    res.statusCode = 200;
    res.end('📞 Esta es la página de contacto.\nPuedes escribirnos a contacto@nodeejemplo.com');
  }

  // 🛒 Ruta de tienda
  else if (req.url === '/tienda') {
    res.statusCode = 200;
    res.end('🛍️ Bienvenido a la tienda online.\nPronto habrá ofertas y productos nuevos.');
  }

  // ❌ Si la ruta no existe
  else {
    res.statusCode = 404; // código 404 = No encontrado
    res.end('❌ Página no encontrada. Prueba con /contacto o /tienda');
  }
});

// 3️⃣ Escuchamos en el puerto 3000
server.listen(3000, () => {
  console.log('✅ Servidor activo en http://localhost:3000');

});




