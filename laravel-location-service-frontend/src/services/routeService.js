import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const calculateRoute = async (startLocationId) => {
  try {
    const response = await axios.post(`${API_URL}/calculate-route`, {
      start_location_id: startLocationId,
    });

    return response.data.route || [];
  } catch (error) {
    console.error("Rota hesaplama hatası:", error);
    return [];
  }
};
