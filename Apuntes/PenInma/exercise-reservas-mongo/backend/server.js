import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Mongoose connection (very simple for learning)
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/reservasdb';

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err.message));

// Importar modelo Reserva (definido en backend/models/Reserva.js)
import Reserva from './models/Reserva.js';

// Rutas CRUD
app.get('/api/reservas', async (req, res) => {
  try {
    const reservas = await Reserva.find().lean();
    res.json({ exito: true, datos: reservas, mensaje: `Se encontraron ${reservas.length} reservas` });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: 'Error al obtener reservas' });
  }
});

app.post('/api/reservas', async (req, res) => {
  try {
    const { nombre, email, asientos, fecha } = req.body;
    if (!nombre || !email || !asientos || !fecha) {
      return res.status(400).json({ exito: false, mensaje: 'Faltan datos' });
    }

    const nueva = new Reserva({ nombre: nombre.trim(), email: email.trim(), asientos: parseInt(asientos), fecha: fecha.trim() });
    const saved = await nueva.save();
    res.status(201).json({ exito: true, datos: saved, mensaje: 'Reserva creada' });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: 'Error al crear reserva' });
  }
});

app.put('/api/reservas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, email, asientos, fecha } = req.body;
    const updated = await Reserva.findByIdAndUpdate(id, { nombre, email, asientos, fecha }, { new: true });
    if (!updated) return res.status(404).json({ exito: false, mensaje: 'No encontrada' });
    res.json({ exito: true, datos: updated, mensaje: 'Reserva actualizada' });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: 'Error al actualizar' });
  }
});

app.delete('/api/reservas/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const removed = await Reserva.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ exito: false, mensaje: 'No encontrada' });
    res.json({ exito: true, datos: removed, mensaje: 'Reserva eliminada' });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: 'Error al eliminar' });
  }
});

// Servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor reservas iniciado en http://localhost:${PORT}`);
});
