export const loginApi = async (email, password) => {
    console.log('>>> Intentando llamar a loginApi con:', {email, password});
  
    try {
      const response = await fetch("https://gateway-production-82c6.up.railway.app/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
  
      const contentType = response.headers.get('content-type');
      const responseText = await response.text(); // <- obtenemos SIEMPRE el texto
  
      if (!contentType || !contentType.includes('application/json')) {
        console.error("Respuesta inesperada (no JSON):", responseText);
        throw new Error("Respuesta no es JSON válida");
      }
  
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Error al parsear JSON:", responseText);
        throw new Error("JSON inválido recibido desde el servidor");
      }
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }
  
      return data;
  
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message); 
      throw error;
    }
  };
  
  export const getData = async () => {
    try {
      const API_URL = 'https://gateway-production-82c6.up.railway.app/data/all';
  
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const contentType = response.headers.get('content-type');
      const responseText = await response.text();
  
      if (!contentType || !contentType.includes('application/json')) {
        console.error("Respuesta no JSON:", responseText);
        throw new Error("Respuesta inesperada del servidor");
      }
  
      const data = JSON.parse(responseText);
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener datos');
      }
  
      console.log("Datos obtenidos:", data);
      return data;
  
    } catch (error) {
      console.error("Error al obtener datos:", error.message);
      throw error;
    }
  };
  
  export function filterData(filters, rawData = [], field) {
    const { startDate, endDate } = filters;
  
    if (!startDate || !endDate || rawData.length === 0) {
      return {
        filteredData: [],
        formattedData: [],
        latestRecord: null,
      };
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Incluir el final del día
  
    const filtered = rawData.filter((record) => {
      const recordDate = new Date(record.fecha);
      return recordDate >= start && recordDate <= end;
    });
  
    const formatted = filtered.map((record) => {
      const date = new Date(record.fecha);
  
      // Evita problemas con toLocaleString que varía en Android/iOS
      const displayDateTime = `${String(date.getDate()).padStart(2, '0')}/` +
                              `${String(date.getMonth() + 1).padStart(2, '0')} ` +
                              `${String(date.getHours()).padStart(2, '0')}:` +
                              `${String(date.getMinutes()).padStart(2, '0')}`;
  
      let value = record[field];
  
      // Convertimos boolean a número (útil para gráficos)
      if (typeof value === 'boolean') {
        value = value ? 1 : 0;
      }
  
      // Si el campo no existe, opcional: filtrarlo o poner null
      if (value === undefined || value === null) {
        value = null;
      }
  
      return {
        time: displayDateTime,
        value,
      };
    });
  
    return {
      filteredData: filtered,
      formattedData: formatted,
      latestRecord: filtered.length > 0 ? filtered[filtered.length - 1] : null,
    };
  }
  