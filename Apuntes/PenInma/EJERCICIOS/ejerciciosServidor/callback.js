// 1️⃣ Definimos una función que recibe otra función como parámetro
function hacerTarea(nombre, callback) {
  console.log(`🧹 Empezando la tarea: ${nombre}...`);

  // Simulamos que la tarea tarda 2 segundos
  setTimeout(() => {
    console.log(`✅ Tarea "${nombre}" completada`);
   callback();
  }, 2000);
}

hacerTarea('Limpiar la casa', () => {
  console.log('🎉 ¡Ahora puedo relajarme después de limpiar!');
});

function hacerTarea(callback) {
  console.log("🧹 Haciendo la tarea...");
  callback(); // 👈 se ejecuta la función que se pasó como argumento
}

function aviso() {
  console.log("✅ Tarea completada.");
}

hacerTarea(aviso);
