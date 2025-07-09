import express from 'express';
import { obtenerRegistros, obtenerPorRangoFechas, eliminarRegistrosA, eliminarPorFecha, InsertDataEsp } from '../Controller/data.controller.js';
import { verifyToken } from '../Middleware/auth.middleware.js';

const router = express.Router();

// Rutas protegidas con token
router.get('/', verifyToken, obtenerRegistros);
router.get('/search', verifyToken, obtenerPorRangoFechas);
router.delete('/delete', verifyToken, eliminarRegistrosA);
router.delete('/deleteA', verifyToken, eliminarPorFecha);
router.post('/insert', InsertDataEsp);

export default router;
