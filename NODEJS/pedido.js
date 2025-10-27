

function pedido(){
    return new Promise((resolve,reject) => {
        const entregado = Math.random() > 0.5; // 50% de éxito o error
        setTimeout(() => {
            if (entregado) {
                resolve('el pedido fue entregado con exito');
                }
                else{
                    reject("Error: el pedido no llegó a tiempo");
                }
            }, 2000);
        });
    }


async function ejecutarpedido() {
try {
const resultado = await pedido(); // espera a que se resuelva
console.log(resultado);
} catch (error) {
console.error(error); // captura el reject
} finally {
console.log("🔚 Verificación finalizada (await)");
}
}

ejecutarpedido();

