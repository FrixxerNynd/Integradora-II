import express from 'express';
import { crearRegistro, obtenerRegistros, obtenerPorId, actualizarRegistro, eliminarRegistro } from '../Controller/data.controller.js';


const router = express.Router();
router.post('create/', crearRegistro);
router.get('/', obtenerRegistros);
router.get('search/:id', obtenerPorId);
router.put('update/:id', actualizarRegistro);
router.delete('delete/:id', eliminarRegistro);

export default router;
