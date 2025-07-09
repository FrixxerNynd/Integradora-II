import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  temperatura: {
    type: Number,
    required: true
  },
  humedad: {
    type: Number,
    required: true
  },
  iluminacion: {
    type: Number,
    required: true
  },
  movimiento: {
    type: Boolean,
    required: true
  },
  fecha: {
    type: Date,
    expires: '30d'
  }
});

const Data = mongoose.model('data', dataSchema);

export default Data;
