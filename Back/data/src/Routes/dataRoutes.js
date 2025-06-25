import express from 'express';
import { crearRegistro, obtenerRegistros, obtenerPorId, actualizarRegistro, eliminarRegistrosA } from '../Controller/data.controller.js';


const router = express.Router();
router.post('/', crearRegistro);
router.get('/', obtenerRegistros);
router.get('search/:id', obtenerPorId);
router.put('update/:id', actualizarRegistro);
router.delete('delete', eliminarRegistrosA);

export default router;
