import { useState, useEffect } from "react";
import { getLocations, addLocation, deleteLocation, updateLocation } from "../services/locationService";

const useLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true); // Spinner için loading durumu

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true); // Veriler çekilirken loading aktif
      const data = await getLocations();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false); // İşlem bitince loading kapatılır
    }
  };

  const handleAdd = async (newLocation) => {
    try {
      const addedLocation = await addLocation(newLocation);
      setLocations((prev) => [...prev, addedLocation]);
      fetchLocations();
    } catch (error) {
      alert(Object.values(error).join("\n"));
    }
  };

  const handleDelete = async (id) => {
    await deleteLocation(id);
    fetchLocations();
  };

  const handleEdit = async (updatedLocation) => {
    await updateLocation(updatedLocation);
    fetchLocations();
  };

  return { locations, handleAdd, handleDelete, handleEdit, loading };
};

export default useLocations;
