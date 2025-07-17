
export const loginApi = async (credentials) => {
  console.log('>>> Intentando llamar a loginApi con:', credentials);
  console.log(import.meta.env.VITE_LOGIN_URL);
  try {
    const response = await fetch(import.meta.env.VITE_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al iniciar sesión');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error al iniciar sesión:', error.message); 
    throw error;
  }
};