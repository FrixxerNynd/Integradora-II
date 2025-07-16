export const getData = async () => {
    // Reemplaza esta URL con la URL real de tu servicio/API
    const API_URL = 'http://localhost:3000/data/all';
  
    const response = await fetch(API_URL);
  
    if (!response.ok) {
      // Si la respuesta no es exitosa, lanza un error que será capturado en el componente.
      throw new Error('La respuesta de la red no fue exitosa');
    }
  
    // Si todo está bien, devuelve los datos en formato JSON.
    const data = await response.json();
    console.log(data);
    return data;
  };

