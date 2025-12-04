app.use((req, res) => {
  res.status(404).send(`
    <h1>❌ Error 404</h1>
    <p>La página que buscas no existe.</p>
    <a href="/">Volver al inicio</a>