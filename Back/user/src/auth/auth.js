import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../../config/config.js'

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Token Recibido',token)

  if (!token) return res.status(401).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};