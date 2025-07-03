import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/forgotpass', forgotPassword);
router.post('/resetpass/:token', resetPassword);

export default router;
