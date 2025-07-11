import express from 'express';
import { obtenerRegistros, obtenerPorRangoFechas, eliminarData, InsertDataEsp } from '../Controller/data.controller.js';
import { verifyToken } from '../Middleware/auth.middleware.js';

const router = express.Router();

// Rutas protegidas con token
router.get('/all', obtenerRegistros);
router.get('/search', obtenerPorRangoFechas);
router.delete('/delete/:id', eliminarData);
router.post('/insert', InsertDataEsp);

export default router;
