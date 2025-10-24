const miPromesa = new Promise((resolve, reject) => {
    const exito = true; // cambiamos a false para probar el error
    if (exito) {
        resolve("✅ Operación completada con éxito");
    } else {
        reject("❌ Ha ocurrido un error");
    }
});
//aqui estamos consumiendo la promesa fijate bien que no se cierran las sentencias de la promesa
miPromesa
    .then((resultado) => console.log(resultado)) // si todo sale bien
    .catch((error) => console.error(error)) // si algo falla
    .finally(() => console.log("🎬 Soy el final, pase lo que pase"));//aunque haya error o éxito finally se ejecuta


    //--------------------------------------------//


// Función que devuelve una promesa (simula tarea con retardo) 
function tareaConRetardo() {
  return new Promise((resolve) => {
    console.log("⏳ Iniciando tarea con retardo...");
    setTimeout(() => {
resolve("🎯 Tarea completada tras 2 segundos");
    }, 2000);
  });
}

// ⚡ Función async que espera con await
async function ejecutarEsperando() {
  console.log("🚀 Yo ya me he ejecutado, no tengo await");
 
 
  const resultado = await tareaConRetardo(); // 👈 aquí espera
  console.log(resultado);
 
 
  console.log("⚡ Soy la segunda tarea y espero a la primera");
  console.log("✅ Fin del proceso con espera");
}
 
 
// 🚀 Ejecutamos
ejecutarEsperando();
 
 