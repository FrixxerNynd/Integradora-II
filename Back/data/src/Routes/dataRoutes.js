import express from 'express';
import { crearRegistro, obtenerRegistros, obtenerPorRangoFechas, eliminarRegistrosA, eliminarPorFecha } from '../Controller/data.controller.js';
import { verifyToken } from '../Middleware/auth.middleware.js';

const router = express.Router();

// Rutas protegidas con token
router.post('/', verifyToken, crearRegistro);
router.get('/', verifyToken, obtenerRegistros);
router.get('/search', verifyToken, obtenerPorRangoFechas);
router.delete('/delete', verifyToken, eliminarRegistrosA);
router.delete('/deleteA', verifyToken, eliminarPorFecha);

export default router;
