// 🧠 Función async SIN await
// Aunque no use await, async devuelve una PROMESA automáticamente
async function verificarUsuario() {
  const autorizado = Math.random() > 0.5; // 50% de éxito o error

  if (autorizado) {
    return "🔓 Acceso concedido"; // ✅ Esto equivale a resolve("...")
  } else {
    throw new Error("🚫 Acceso denegado"); // ❌ Esto equivale a reject(new Error(...))
  }
}

// 🚀 Consumimos la función como si fuera una promesa
verificarUsuario()
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.error("Error capturado:", error.message))
  .finally(() => console.log("🔚 Verificación finalizada"));
