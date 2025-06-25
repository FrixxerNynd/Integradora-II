import app from './src/app.js';
import connectBD from './config/bd.js'



const PORT = 3001;


connectBD().then(() => {
  app.listen(PORT, () => {
    console.log(`Servicio en el puerto ${PORT}`);
    console.log(`La ruta es: http://localhost:${PORT}`);
  });
});
