import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri ='mongodb+srv://julifer2435:Fercho23dic04@clusterintegradora.p1kmcdn.mongodb.net/?retryWrites=true&w=majority&appName=ClusterIntegradora';

    await mongoose.connect(uri);

    console.log('✅ Conexión exitosa a MongoDB con Mongoose');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1); // Finaliza el proceso si falla la conexión
  }
};

export default connectDB;
