import express from 'express';
const { Router } = express;
import pedidosController from "../controllers/pedidosController.js";

const route = Router();

// READ
route.get("/", pedidosController.listarPedidos);
route.get("/:id", pedidosController.obtenerPedido);

// CREATE
route.post("/", pedidosController.crearPedido);

// UPDATE
route.patch("/:id", pedidosController.actualizarPedido);

// DELETE
route.delete("/:id", pedidosController.eliminarPedido);

export default route;
