import Data from '../Models/data.model.js';

// Crear un nuevo registro de sensor
export const crearRegistro = async (req, res) => {
  try {
    const nuevoDato = new Data(req.body);
    await nuevoDato.save();
    res.status(201).json({ mensaje: 'Registro creado exitosamente', data: nuevoDato });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear registro', error });
  }
};

// Obtener todos los registros
export const obtenerRegistros = async (req, res) => {
  try {
    const datos = await Data.find().sort({ fecha: -1 });
    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener registros', error });
  }
};

// Obtener un registro por ID
export const obtenerPorId = async (req, res) => {
  try {
    const dato = await Data.findById(req.params.id);
    if (!dato) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.status(200).json(dato);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar el registro', error });
  }
};

// Actualizar un registro
export const actualizarRegistro = async (req, res) => {
  try {
    const actualizado = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.status(200).json({ mensaje: 'Registro actualizado', data: actualizado });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el registro', error });
  }
};

// Eliminar un registro
export const eliminarRegistro = async (req, res) => {
  try {
    const eliminado = await Data.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.status(200).json({ mensaje: 'Registro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el registro', error });
  }
};
