// routes/libros.routes.js
import { Router } from "express";
import { getAll, getOne, create, update, remove } from "../controllers/libros.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);

router.delete("/:id", remove);

export default router;
