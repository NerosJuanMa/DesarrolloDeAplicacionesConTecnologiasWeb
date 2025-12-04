const args = process.argv.slice(2);

const nombre = args[0] || 'Invitado';




const edad = parseInt(args[1]) || 0;


console.log(`Hola, ${nombre}. Tienes ${edad} años.`);