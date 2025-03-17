import { useState, useEffect } from "react";
import { getLocations, addLocation, deleteLocation, updateLocation } from "../services/locationService";

const useLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const data = await getLocations();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
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
    setLocations((prev) =>
      prev.map((loc) => (loc.id === updatedLocation.id ? updatedLocation : loc))
    );
    await updateLocation(updatedLocation);
    fetchLocations();
  };

  return { locations, handleAdd, handleDelete, handleEdit };
};

export default useLocations;
