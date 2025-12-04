// Ejemplo: uso del módulo timers en Node.js

console.log("⏰ Inicio del programa");

// Ejecuta una función después de 2 segundos
setTimeout(() => {
  console.log("⌛ Han pasado 2 segundos");
}, 2000);

// Ejecuta una función cada segundo
let contador = 0;
const intervalo = setInterval(() => {
  contador++;
  console.log(`🕐 Segundo ${contador}`);
  if (contador === 5) {
    clearInterval(intervalo); // Detiene el intervalo después de 5 repeticiones
    console.log("✅ Fin del intervalo");
  }
}, 1000);

// Se ejecuta cuando el ciclo de eventos esté libre
setImmediate(() => {
  console.log("🚀 Este mensaje se ejecuta de inmediato tras el código principal");
});

console.log("➡️ Fin del código principal");
