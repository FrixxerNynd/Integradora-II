import Data from '../Models/data.model.js';

// Crear un nuevo registro de sensor
export const crearRegistro = async (req, res) => {
  try {
    const { temperatura, humedad, iluminacion, movimiento } = req.body;

    // Verificación más robusta: permite 0 como valor válido
    if (
      temperatura === undefined ||
      humedad === undefined ||
      iluminacion === undefined ||
      movimiento === undefined
    ) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    // Crear instancia con la fecha actual
    const newData = new Data({
      temperatura,
      humedad,
      iluminacion,
      movimiento,
      fecha: new Date() // o Date.now()
    });

    await newData.save();

    res.status(201).json({
      mensaje: "Registro creado exitosamente",
      registro: newData
    });

  } catch (error) {
    console.error("Error al ingresar la información", error);
    res.status(500).json({
      mensaje: "Error al crear registro",
      error: error.message
    });
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
export const obtenerPorRangoFechas = async (req, res) => {
  try {
    const { inicio, fin } = req.body;

    if (!inicio || !fin) {
      return res.status(400).json({ mensaje: 'Debes proporcionar las fechas "inicio" y "fin".' });
    }

    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);

    // Validar fechas válidas
    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
      return res.status(400).json({ mensaje: 'Las fechas proporcionadas no son válidas.' });
    }

    // Validar que el rango no exceda 7 días
    const unaSemana = 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos
    if (fechaFin - fechaInicio > unaSemana) {
      return res.status(400).json({ mensaje: 'El rango de fechas no puede ser mayor a 7 días.' });
    }

    const datos = await Data.find({
      fecha: {
        $gte: fechaInicio,
        $lte: fechaFin
      }
    });

    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar registros por fechas', error });
  }
};

//Eliminar registros por fecha
export const eliminarPorFecha = async (req, res) => {
  try {
    const { fecha } = req.body;
    const fechaLimite = new Date(fecha);
    if (isNaN(fechaLimite.getTime())) {
      return res.status(400).json({ mensaje: 'Fecha proporcionada no es válida.' });
    }
    const resultado = await Data.deleteOne({
      fecha: { $lte: fechaLimite }
    });
    res.status(200).json({
      mensaje: 'Registro eliminado',
      eliminados: resultado.deletedCount
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar registros', error });
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
