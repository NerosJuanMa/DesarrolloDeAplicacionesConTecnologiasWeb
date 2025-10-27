// Promesa normal
function pedidos() {
return new Promise((resolve, reject) => {
const ok = Math.random() > 0.5;
if (ok) {
resolve("✅ pedido entregado con exito");
} else {
reject(new Error("🚫 pedido NO entregado"));
}
});
}
// ⚡ Top-level await (sin async)
try {
console.log("⏳ Verificando pedido...");
const resultado = await pedidos(); // await directamente en el nivel superior
console.log(resultado);
} catch (error) {
console.error(error.message);
} finally {
console.log("🔚 Verificación finalizada (top-level await)");
}
