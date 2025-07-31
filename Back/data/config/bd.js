import mongoose from "mongoose";
import {MONGO_DB} from "./config.js";
const connectDB = async () => {
  try {
    const uri = MONGO_DB;

    await mongoose.connect(uri);

    console.log('✅ Conexión exitosa a MongoDB con Mongoose');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1); // Finaliza el proceso si falla la conexión
  }
};

export default connectDB;
