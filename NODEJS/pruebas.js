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
 