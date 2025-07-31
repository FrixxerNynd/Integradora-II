import mongoose from "mongoose";
import {MONGO_URL} from "./config.js";
const connectDB = async () => {
  try {
    const uri = MONGO_URL;

    await mongoose.connect(uri);

    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); 
  }
};

export default connectDB;
