async function ejemploPromesa() {
  const promesa = new Promise((resolve) => {
    setTimeout(() => resolve("✅ Promesa resuelta tras 2s"), 2000);
  });

  console.log("Esperando...");
  const resultado = await promesa;   // ahora trae un string
  console.log(resultado);
}

ejemploPromesa(false);
