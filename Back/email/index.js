import app from './src/app.js';
import connectDB from './config/bd.js';

const PORT = 3002;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servicio en el puerto ${PORT}`);
    console.log(`La ruta es: http://localhost:${PORT}`);
  });
});
