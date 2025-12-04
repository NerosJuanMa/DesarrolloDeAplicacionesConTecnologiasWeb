// Archivo: server.js
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('¡Hola desde Node.js! 🚀\nTu primer servidor está funcionando.');
});

server.listen(3000, () => {
  console.log('🌐 Servidor ejecutándose en http://localhost:3000');
  console.log('💡 Presiona Ctrl+C para detener el servidor');
});
