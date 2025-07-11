import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { SECRET_KEY } from '../auth/auth.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !user.status)
      return res.status(401).json({ message: 'Usuario no válido' });

    const isValid = await user.comparePassword(password);
    if (!isValid)
      return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      SECRET_KEY,
      { expiresIn: '40m' }
    );

    res.status(200).json({ token, user });
    console.log({message:'Acceso correcto', token: token, user: user})
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en login' });
  }
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isValid = await user.comparePassword(newPassword);
    if (!isValid)
      return res.status(401).json({ message: 'Contraseña incorrecta' });


    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: 'Contraseña actualizada con éxito' });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la contraseña' });
  }
};
