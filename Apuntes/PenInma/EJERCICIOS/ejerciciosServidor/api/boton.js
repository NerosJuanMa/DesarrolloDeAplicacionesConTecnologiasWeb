import http from 'http';

// Servidor básico con una sola ruta
const server = http.createServer((req, res) => {
  // Permitir CORS y definir formato JSON
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // Si la ruta es /api/saludo
  if (req.url === '/api/saludo' && req.method === 'GET') {
    const respuesta = { mensaje: '¡Hola desde Node.js 👋!', curso: 'Entorno Servidor' };
    res.writeHead(200);
    res.end(JSON.stringify(respuesta)); // enviamos texto JSON
  }
});

server.listen(3000, () => {
  console.log('✅ Servidor en http://localhost:3000');
});
