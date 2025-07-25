import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { SECRET_KEY } from '../../../user/src/auth/auth.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'neodev.solutions.utd@gmail.com',
    pass: 'trho achd wqwm paur'
  }
});

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '15m' });

  const link = `http://localhost:3001/resetpass/${token}`;

  await transporter.sendMail({
    from: 'neodev.solutions.utd@gmail.com',
    to: email,
    subject: 'Recuperación de contraseña',
    html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${link}">${link}</a>`
  });

  res.json({ message: 'Correo de recuperación enviado' });
};

