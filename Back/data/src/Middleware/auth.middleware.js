import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { SECRET_KEY } from '../../config/config.js';

config();

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token Recibido',token)
    
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    console.log('Payload',decoded)
    next();
  } catch (error) {
    console.log('Error',error)
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
