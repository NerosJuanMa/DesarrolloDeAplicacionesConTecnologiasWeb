// models/Producto.js
import mongoose from "mongoose";

/**
 * MODELO (M de MVC)
 * - Define la "forma" que tendrán los documentos de la colección productos.
 * - Aplica validaciones sencillas (required, min, default).
 * - timestamps: añade createdAt / updatedAt automáticamente.
 */
const productoSchema = new mongoose.Schema(
  {
    nombre:      { type: String, required: true, trim: true },      // "Camiseta React"
    precio:      { type: Number, required: true, min: 0 },           // 19.99
    stock:       { type: Number, default: 0, min: 0 },               // unidades disponibles
    categoria:   { type: String, default: "general", trim: true },   // "ropa", "accesorios", etc.
    descripcion: { type: String, trim: true },                       // texto libre
    activo:      { type: Boolean, default: true },                   // visible en tienda
    imagen:      { type: String, trim: true }                        // URL opcional
  },
  { timestamps: true }
);

// 3er parámetro fija el nombre EXACTO de la colección en Atlas
export default mongoose.model("Producto", productoSchema, "productos");
