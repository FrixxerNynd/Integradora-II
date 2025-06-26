import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controller/user.controller.js';
import { verifyToken } from '../auth/auth.js';
import { login } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/createU', verifyToken, createUser);
router.get('/all', verifyToken, getUsers);
router.get('/get/:id', verifyToken, getUserById);
router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/login', login);

export default router;
