import mongoose from 'mongoose';

// Definimos el esquema
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true, index: true }, // índice simple
  precio: { type: Number, required: true, min: 0 },
  stock:  { type: Number, default: 0, min: 0 },
  activo: { type: Boolean, default: true },
  imagen: { type: String }
}, { timestamps: true });



// Creamos el modelo
const Producto = mongoose.model('Producto', productoSchema);

export default Producto;