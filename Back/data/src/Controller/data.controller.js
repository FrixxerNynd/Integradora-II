import Data from '../Models/data.model.js';

// Crear un nuevo registro de sensor
export const crearRegistro = async (req, res) => {
  try {
    //Verifica que los campos no vayan vacios
    const {temperatura, humedad, iluminacion, movimiento } = req.body;
    if (!temperatura || !humedad || !iluminacion || !movimiento) {
      return res.status(400).json({message: "Todos los campos son obligatorios"});
    }
    //Construye el objeto newData
    const newData = new Data ({
      temperatura,
      humedad,
      iluminacion,
      movimiento,
      fecha: Date.now()
    })
    //Guarda en la BD y envia respuesta satisfactoria
    await newData.save();
    res.status(201).json({ mensaje: 'Registro creado exitosamente', newData })
    /*
    const nuevoDato = new Data(req.body);
    await nuevoDato.save();
    ;*/
  } catch (error) {
    console.error("Error al ingresar la informacion", error )
    res.status(400).json({ mensaje: 'Error al crear registro', error: error.message });
  }
};

// Obtener todos los registros
export const obtenerRegistros = async (req, res) => {
  try {
    //Buscar los datos almacenados y organizarlos por fechas
    const datos = await Data.find().sort({ fecha: -1 });
    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener registros', error });
  }
};

// Obtener un registro por ID
export const obtenerPorId = async (req, res) => {
  try {
    //Localizar el dato mediante ID
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

    const { fecha, actualizacion } = req.params;
    const date = new Date(fecha);
    if (isNaN(date.getTime())){
      res.status(400).json({message: "Fecha Invalida, verifica que siga el formato YYYY-MM-DD: ", date });
    }
    const actualizado = await Data.findOneAndUpdate(
        date,
        actualizacion,
        {
          new: true,
          runValidators: true
        }
      );

    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.status(200).json({ mensaje: 'Registro actualizado', data: actualizado });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el registro', error });
  }
};

// Eliminar automáticamente registros con más de 30 días
export const eliminarRegistrosA = async (req, res) => {
  try {
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 30); // Resta 30 días a la fecha actual

    const resultado = await Data.deleteMany({
      fecha: { $lt: fechaLimite }
    });

    res.status(200).json({
      mensaje: 'Registros antiguos eliminados exitosamente',
      eliminados: resultado.deletedCount
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar registros antiguos', error });
  }
};
