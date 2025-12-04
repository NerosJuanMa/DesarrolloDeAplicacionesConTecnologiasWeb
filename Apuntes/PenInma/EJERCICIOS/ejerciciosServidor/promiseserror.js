function tareaRemota() {
  return new Promise((resolve, reject) => {
    const ok = Math.random() > 0.5;

    setTimeout(() => {
      if (ok) resolve({ ok: true, data: { id: 123 } });
      else reject(new Error("Servidor no disponible"));
    }, 800);
  });
}

async function ejecutar() {
  try {
    console.log("🚀 Iniciando...");
    const respuesta = await tareaRemota();   // <- fulfilled o rejected
    console.log("✅ Éxito:", respuesta.data);
  } catch (err) {
    console.error("❌ Capturado en catch:", err.message);
  } finally {
    console.log("🧹  libero recursos");
  }
}

ejecutar();
