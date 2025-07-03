import express from 'express';
import { crearRegistro, obtenerRegistros, obtenerPorId, actualizarRegistro, eliminarRegistrosA } from '../Controller/data.controller.js';
import { verifyToken } from '../Middleware/auth.middleware.js';

const router = express.Router();

// Rutas protegidas con token
router.post('/', verifyToken, crearRegistro);
router.get('/', verifyToken, obtenerRegistros);
router.get('/search/:id', verifyToken, obtenerPorId);
router.put('/update/:id', verifyToken, actualizarRegistro);
router.delete('/delete', verifyToken, eliminarRegistrosA);

export default router;
