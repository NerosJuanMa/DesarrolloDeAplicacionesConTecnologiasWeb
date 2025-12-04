const miPromesa = new Promise((resolve, reject) => {
  const exito = false; // cambiamos a false para probar el error

  if (exito) {
    resolve("✅ Operación completada con éxito");
  } else {
    reject("❌ Ha ocurrido un error");
  }
});

miPromesa
  .then((resultado) => {
    console.log(resultado); // ✅ Si todo salió bien
  })
  .catch((error) => {
    console.error(error); // ❌ Si algo salió mal
  })

   .finally(() => {
          console.log("🔚 Operación finalizada"); // Siempre se ejecuta al final
        }); 

  //cambia exito a false para ver el manejo del error

//el valor de exito puede venir definido por alguna condición en tu código por ejemplo
/*let conectado = Math.random() > 0.5; // genera true o false aleatoriamente

const miPromesa = new Promise((resolve, reject) => {
  if (conectado) {
    resolve("📡 Conexión establecida correctamente");
  } else {
    reject("🚫 Error al conectar");
  }
});*/
