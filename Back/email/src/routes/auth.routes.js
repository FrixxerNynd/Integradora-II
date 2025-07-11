import express from 'express';
import { forgotPassword } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/forgotpass', forgotPassword);

export default router;
