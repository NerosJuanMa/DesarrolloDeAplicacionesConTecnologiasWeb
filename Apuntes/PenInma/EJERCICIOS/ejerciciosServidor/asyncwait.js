async function ejemploPromesa() {
  const promesa = new Promise((resolve) => {
    setTimeout(() => resolve(), 2000);
  });

  console.log("Esperando...");
  const resultado = await promesa; // 👈 espera 2 segundos
  console.log(resultado);
}

ejemploPromesa();

// Primera función con retardo
function tareaConRetardo() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("⏳ Primera tarea completada después de 3 segundos"), 3000);
  });
}


  // Segunda función asíncrona usando await
async function ejecutarEsperando() {
  console.log("🚀 Yo ya me he ejecutado no tengo await");

  const resultado = await tareaConRetardo(); // Espera a que termine
  console.log(resultado);

  console.log("⚡soy la segunda tarea y espero a la primera");
  console.log("✅ Fin del proceso con espera");
}

ejecutarEsperando()

