import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/createU', createUser);
router.get('/all', getUsers);
router.get('/get/:id', getUserById);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
