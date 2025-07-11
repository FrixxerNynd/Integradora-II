import Data from '../Models/data.model.js';
import { sendTemperatureAlert } from '../services/rabbitmq.service.js';
import mongoose from 'mongoose';


export const InsertDataEsp = async (req, res) => {
  try {
    const datos = req.body;
    const TEMPERATURE_THRESHOLD = 50;
    // Verificar que sea un arreglo no vacío
    if (!Array.isArray(datos) || datos.length === 0) {
      return res.status(400).json({ mensaje: "Se esperaba un arreglo de registros." });
    }

    // Validar cada objeto dentro del arreglo
    const registrosValidados = datos.map((d, index) => {
      const { temperatura, humedad, iluminacion, movimiento } = d;

      if (
        temperatura === undefined ||
        humedad === undefined ||
        iluminacion === undefined ||
        movimiento === undefined
      ) {
        throw new Error(`Faltan campos en el registro #${index + 1}`);
      }

      // Verificar si la temperatura supera el umbral
      if (temperatura > TEMPERATURE_THRESHOLD) {
        sendTemperatureAlert({
          temperatura,
          humedad,
          iluminacion,
          movimiento,
          threshold: TEMPERATURE_THRESHOLD
        }).catch(console.error);
      }
      return {
        temperatura,
        humedad,
        iluminacion,
        movimiento,
        fecha: new Date()
      };
    });
    // Insertar múltiples documentos
    const registrosInsertados = await Data.insertMany(registrosValidados);

    res.status(201).json({
      mensaje: "Registros creados exitosamente",
      registros: registrosInsertados
    });

  } catch (error) {
    console.error("Error al crear registros:", error.message);
    res.status(400).json({ mensaje: "Error al crear registros", error: error.message });
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
    const { inicio, fin } = req.query;

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
export const eliminarData = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica si el id es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: 'ID no válido' });
    }

    const resultado = await Data.deleteOne({ _id: new mongoose.Types.ObjectId(id) });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Registro eliminado',
      eliminados: resultado.deletedCount
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar registro', error: error.message });
  }
};

