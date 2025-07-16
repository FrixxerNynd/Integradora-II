import express from 'express';
import { createUser, getUsers, updateUser, deleteUser, getUserByEmail } from '../controller/user.controller.js';
import { verifyToken } from '../auth/auth.js';
import { login, resetPassword } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/createU', createUser);
router.get('/all',verifyToken, getUsers);
router.get('/get/:email', getUserByEmail);
router.put('/update/:email', updateUser);
router.delete('/delete/:email', deleteUser);
router.post('/login', login);
router.put('/resetpass', verifyToken, resetPassword)

export default router;
