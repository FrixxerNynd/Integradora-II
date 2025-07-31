
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

export const getUser = async (token) => {
  console.log('Intentando llamar a getUsers: ');
  try {
    const response = await fetch(import.meta.env.VITE_USER_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener los usuarios');
    }

    const data = await response.json();
    const filtered = data.map(({name, email, rol, status, createdAt}) => ({name, email, rol, status, createdAt}));
    return filtered;
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    throw error;
  }
};

export const deleteUser = async(token, email) => {
  console.log('Intentando llamar a deleteUser: ');
  try {
    const response = await fetch(`${import.meta.env.VITE_USER_DELETE}/${encodeURIComponent(email)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al eliminar el usuario');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error.message);
    throw error;
  }
}

export const registerUser = async (token, user) => {
  console.log('Intentando llamar a registerUser: ');
  try {
    const response = await fetch(import.meta.env.VITE_USER_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        rol: user.rol,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar el usuario');
    };
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al registrar el usuario:', error.message);
    throw error;
  }
}

export const changePassword = async (token, user) => {
  console.log('Intentando llamar a changePassword: ');
  try {
    const response = await fetch(import.meta.env.VITE_USER_CHANGE_PASSWORD, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al cambiar la contraseña');
    };
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error.message);
    throw error;
  }
};

export const changeUser = async (token, user) => {
  console.log('Intentando llamar a changeUser: ');
  try {
    const response = await fetch(`${import.meta.env.VITE_USER_CHANGE}/${encodeURIComponent(user.email)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al cambiar el usuario');
    };
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cambiar el usuario:', error.message);
    throw error;
  }
};
  