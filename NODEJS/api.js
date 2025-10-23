import http from 'node:http';
const server = http.createServer((req, res) => {
// Cabeceras: CORS y tipo de respuesta JSON
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Content-Type', 'application/json; charset=utf-8');
// GET /api/saludo
if (req.url === '/api/saludo' && req.method === 'GET') {
const data = { ok: true, mensaje: 'Hola desde Node API 👋', modulo:
'UF1844' };
res.writeHead(200);
return res.end(JSON.stringify(data)); // objeto JS → texto JSON
}
// GET /api/hora
if (req.url === '/api/hora' && req.method === 'GET') {
const ahora = new Date();
const hh = String(ahora.getHours()).padStart(2, '0');
const mm = String(ahora.getMinutes()).padStart(2, '0');
res.writeHead(200);
return res.end(JSON.stringify({ ok: true, hora: `${hh}:${mm}` }));
}
// Cualquier otra ruta
res.writeHead(404);
res.end(JSON.stringify({ ok: false, error: 'No encontrado' }));
});
// Puerto 3000
server.listen(3000, () => {
    console.log('✅ API en http://localhost:3000 (GET /api/saludo, /api/hora)');
});


