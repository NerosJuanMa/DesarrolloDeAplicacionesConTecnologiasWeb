// Archivo: server.js
const http = require('http');

const server = http.createServer((req, res) => {
    
    // IMPORTANTE: Cabeceras CORS (Cross-Origin Resource Sharing)
    // Esto es necesario para que el navegador (el index.html)
    // permita la comunicación entre dominios o puertos diferentes (3000 a 80/443).
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


    // Lógica principal: Responder a peticiones GET a la raíz
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('¡Hola desde Node.js!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});

server.listen(3000, () => {
    console.log('Servidor Node.js ejecutándose en http://localhost:3000');
});
// Nota: Añadí las cabeceras CORS (Access-Control-Allow-Origin: '*') 
// para que el navegador permita la conexión entre el frontend y el puerto 3000.
