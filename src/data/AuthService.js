// La URL base de tu API, puede estar en un archivo de configuración .env
const API_URL = 'http://localhost:3000/user/login'; // Ajusta a la URL de tu gateway

export const loginApi = async (credentials) => {
    console.log('>>> Intentando llamar a loginApi con:', credentials);
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    // Si la respuesta no es exitosa (ej. 401 Unauthorized), lanza un error.
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al iniciar sesión');
    }

    // Si es exitosa, el backend ya estableció la cookie HttpOnly.
    // Aquí solo devolvemos los datos del usuario que vienen en el cuerpo.
    const data = await response.json();
    return data;

  } catch (error) {
    // Relanza el error para que el componente que llama lo pueda manejar.
    throw error;
  }
};