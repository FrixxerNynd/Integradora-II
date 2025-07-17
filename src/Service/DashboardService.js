
export const getData = async () => {
    const API_URL = 'http://localhost:3000/data/all';
  
    const response = await fetch(import.meta.env.VITE_DATA_URL);
  
    if (!response.ok) {
      // Si la respuesta no es exitosa, lanza un error que será capturado en el componente.
      throw new Error('La respuesta de la red no fue exitosa');
    }
  
    // Si todo está bien, devuelve los datos en formato JSON.
    const data = await response.json();
    console.log(data);
    return data;
  };

/**
 * Filtra y formatea datos por fecha y tipo de medición.
 * @param {Object} filters - Filtros con startDate y endDate.
 * @param {Array} rawData - Datos a filtrar.
 * @param {string} field - Campo a extraer (ej: 'temperatura', 'humedad', 'movimiento').
 * @returns {Object} - { filteredData, formattedData, latestRecord }
 */
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
  console.log(filtered);

  const formatted = filtered.map((record) => {
    const displayDateTime = new Date(record.fecha).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    let value = record[field];

    // ✅ Convertimos booleans a números para el gráfico
    if (typeof value === 'boolean') {
      value = value ? 1 : 0;
    }

    return {
      time: displayDateTime,
      value: value, // Aquí se usa el campo dinámico
    };
  });



  return {
    filteredData: filtered,
    formattedData: formatted,
    latestRecord: filtered.length > 0 ? filtered[filtered.length - 1] : null,
  };
}
