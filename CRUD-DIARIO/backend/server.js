import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// 🧭 __dirname y __filename para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
const ARCHIVO_DIARIO = path.join(__dirname, 'datosdiario.json');

// ========== Helpers ==========
async function leerDiario() {
    try {
        const contenido = await fs.readFile(ARCHIVO_DIARIO, 'utf8');
        const data = JSON.parse(contenido);
        return Array.isArray(data) ? data : []; // 💡 por si quedó mal escrito
    } catch {
        return [];
    }
}

async function escribirDiario(diarioArray) {
    // 💡 Siempre escribe un ARRAY completo, nunca un objeto suelto
    const seguro = Array.isArray(diarioArray) ? diarioArray : [];
    await fs.writeFile(ARCHIVO_DIARIO, JSON.stringify(seguro, null, 2), 'utf8');
}

// ========== Rutas ==========
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Listar todo
app.get('/api/diario', async (req, res) => {
    const diario = await leerDiario();
    res.json({
        exito: true,
        datos: diario,
        mensaje: `Se encontraron ${diario.length} entradas de diario`
    });
});

// Crear
app.post('/api/diario', async (req, res) => {
    try {
        const { dia, anotacion, estado } = req.body;
        if (!dia || !anotacion || !estado) {
            return res.status(400).json({
                exito: false,
                mensaje: 'Faltan datos (dia, anotacion, estado)'
            });
        }
        const diario = await leerDiario();
        // ID robusto
        const maxId = diario.reduce((max, e) => Math.max(max, Number(e.id) || 0), 0);
        const nueva = { id: maxId + 1, dia, anotacion, estado };

        diario.push(nueva);
        await escribirDiario(diario); // ✅ ahora guardas el ARRAY completo
        return res.status(201).json({
            exito: true,
            datos: nueva,
            mensaje: 'Entrada creada correctamente'
        });
    } catch (error) {
        console.error('❌ Error al guardar entrada:', error);
        return res.status(500).json({ exito: false, mensaje: 'Error al guardar entrada' });
    }
});

// Arranque
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('📔 DIARIO INICIADO');
    console.log('='.repeat(50));
    console.log(`🌐 http://localhost:${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api/diario`);
});

// Trampas por si algo se escapa
process.on('uncaughtException', e => console.error('❌ ERROR:', e.message));
process.on('unhandledRejection', r => console.error('❌ PROMESA:', r));

