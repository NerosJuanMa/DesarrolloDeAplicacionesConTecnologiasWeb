import http from 'node:http';
const server=http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hola desde node.js. Tu primer servidor está funcionando correctamente');
});
server.listen(3000,()=>{
    console.log('Servidor escuchando en http://localhost:3000');
    console.log ("para cerrar el puerto dale a ctrl + c");
});


