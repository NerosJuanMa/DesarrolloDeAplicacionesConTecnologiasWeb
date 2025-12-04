import express from 'express';
const { Router } = express;
import productosController from "../controllers/productosController.js";

const route = Router();

// READ
route.get("/", productosController.listarProductos);   
   // ?q=&activo=&minPrecio=&maxPrecio=&page=&limit=&sort=
      
route.get("/:id", productosController.obtenerProducto);         // por id

// CREATE
route.post("/", productosController.crearProducto);

// UPDATE
route.put("/:id", productosController.reemplazarProducto);      // reemplazo total (PUT)
route.patch("/:id", productosController.actualizarProducto);    // actualización parcial (PATCH)

// DELETE
route.delete("/:id", productosController.eliminarProducto);

export default route;