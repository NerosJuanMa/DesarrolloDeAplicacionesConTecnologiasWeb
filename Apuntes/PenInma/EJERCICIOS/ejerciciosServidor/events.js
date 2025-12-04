const EventEmitter = require('events');
const emisor = new EventEmitter();

emisor.on('saludo', () => console.log('¡Evento saludo recibido!'));
emisor.emit('saludo');
