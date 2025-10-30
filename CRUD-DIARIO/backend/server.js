import express from express;
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

//Declaramos servidor y puerto
const app = express();
const PORT = 3000;
//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
//Path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ARCHIVO_DIARIO = path.join(__dirname, 'datosdiario.json');

