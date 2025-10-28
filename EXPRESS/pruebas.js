import express from "express";
const app = express();

// a) Parseo de JSON del body (para POST/PUT)
app.use(express.json());

// b) Logger sencillo (cada petición)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`📥 ${req.method} ${req.url} → ${res.statusCode} (${ms}ms)`);
  });
  next();
});

// Ejemplo POST (usa Thunder Client o Postman)
app.post('/api/eco', (req, res) => {
  // req.body ya está disponible gracias a express.json()
  res.status(201).json({ recibido: req.body });
});

// c) Manejador de errores (último)
app.use((err, req, res, next) => {
  console.error('💥 Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(3000, () => console.log('🧩 Middleware en http://localhost:3000'));