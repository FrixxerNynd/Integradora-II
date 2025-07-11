import bcrypt from 'bcryptjs';
import User from '../model/User.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User no encontrado' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const { email } = req.params;

    const user = await User.findOneAndUpdate(
      { email }, // criterio de búsqueda
      { name }, // campos a actualizar
      { new: true } // retorna el documento actualizado
    );

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ mensaje: "Usuario actualizado", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndUpdate(
      { email },
      { status: false },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User no encontrado" });
    
    res.json({ message: "User dado de baja", user });
  } catch (err) {
    res.status(400).json({ error: "Email invalido" });
  }
};
