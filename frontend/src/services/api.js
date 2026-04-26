const API_URL = import.meta.env.VITE_API_URL;

export const apiService = {
  // GET: Obtener Hubs dinámicos según ubicación real
  getNearbyHubs: async (lat, lng) => {
  // 🔍 Validación preventiva
  if (lat === undefined || lng === undefined) {
    console.warn("Esperando coordenadas GPS...");
    return { hubs: [] };
  }

  const response = await fetch(`${API_URL}/map/nearby?lat=${lat}&lng=${lng}`);
  
  if (!response.ok) {
    // Esto te dirá si es 404 (ruta mal) o 422 (datos mal)
    const errorText = await response.text();
    console.error(`Error ${response.status}:`, errorText);
    throw new Error("Error al obtener hubs");
  }
  return await response.json();
},
  // GET: Perfil del usuario
  getUserProfile: async (userId) => {
    const response = await fetch(`${API_URL}/user/profile?user_id=${userId}`);
    return await response.json();
  },

  // POST: Iniciar un viaje (envía datos al back)
  startTrip: async (tripData) => {
    const response = await fetch(`${API_URL}/trip/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripData),
    });
    return await response.json();
  }
};