// 1. Importar el módulo nativo HTTP
import http from 'node:http';

// 2. Crear el servidor
const server = http.createServer((req, res) => {
  // Cabeceras: permitir acceso y definir tipo de contenido
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // RUTA 1: /api/saludo
  if (req.url === '/api/saludo' && req.method === 'GET') {
    const data = { mensaje: '👋 Hola, bienvenido a mi primera API' };
    res.writeHead(200);
    return res.end(JSON.stringify(data));
  }

  // RUTA 2: /api/dia
  if (req.url === '/api/dia' && req.method === 'GET') {
    const data = { dia: 'Hoy es un gran día para programar 🌞' };
    res.writeHead(200);
    return res.end(JSON.stringify(data));
  }

  // RUTA 3: /api/nombre
  if (req.url === '/api/nombre' && req.method === 'GET') {
    const data = { nombre: 'Tu servidor Node.js está funcionando 🚀' };
    res.writeHead(200);
    return res.end(JSON.stringify(data));
  }

  // Si la ruta no existe
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
});

// 3. Escuchar en el puerto 3000
server.listen(3000, () => {
  console.log('✅ Servidor API funcionando en http://localhost:3000');
  console.log('👉 Rutas disponibles: /api/saludo, /api/dia, /api/nombre');
});
