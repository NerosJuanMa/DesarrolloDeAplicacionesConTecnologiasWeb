function comprobarPedido() {
  return new Promise((resolve, reject) => {
    const entregado = Math.random() > 0.5; // 50% de éxito o error

    setTimeout(() => {
      if (entregado) {
        resolve("📦 Pedido entregado con éxito");
      } else {
        reject("🚫 Error: el pedido no llegó a tiempo");
      }
    }, 2000);
  });
}

// 👉 Completa aquí el consumo con .then() y .catch()
comprobarPedido()
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.error(error))
  .finally(() => console.log("🔚 Comprobación finalizada"));
