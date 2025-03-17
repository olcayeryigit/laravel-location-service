import axios from "axios";

const API_URL = "http://localhost:8000/api/locations";

export const getLocations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Veri çekme hatası:", error);
    return [];
  }
};

export const addLocation = async (newLocation) => {
  try {
    const response = await axios.post(API_URL, newLocation);
    return response.data;
  } catch (error) {
    throw error.response?.data?.errors || "Bir hata oluştu";
  }
};

export const deleteLocation = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Silme hatası:", error);
  }
};

export const updateLocation = async (updatedLocation) => {
  try {
    await axios.put(`${API_URL}/${updatedLocation.id}`, updatedLocation);
  } catch (error) {
    console.error("Güncelleme hatası:", error);
  }
};
