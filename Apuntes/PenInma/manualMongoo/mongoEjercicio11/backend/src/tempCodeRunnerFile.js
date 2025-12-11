// src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productosRoutes from './routes/productos.js';
import productosController from './controllers/productosController.js';

dotenv.config(); // carga las variables del .env

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
await connectDB();

// Rutas principales
app.use('/api/productos', productosRoutes);

// Ruta de prueba
app.get('/', (_req, res) => res.json({ ok: true }));
app.get('/api/productos/:id', productosController.obtenerProducto);


// Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
