import app from './src/app.js';
import connectDB from './config/bd.js';

const PORT = 3003;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servicio Inicialidado correctamente puerto: ${PORT}`)
  });
});
