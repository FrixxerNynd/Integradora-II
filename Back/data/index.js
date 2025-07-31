import app from './src/app.js';
import connectBD from './config/bd.js'
import { PORT } from './config/config.js';

connectBD().then(() => {
  app.listen(PORT, () => {
    console.log(`Servicio en el puerto ${PORT}`);
    console.log(`La ruta es: http://localhost:${PORT}`);
  });
});
