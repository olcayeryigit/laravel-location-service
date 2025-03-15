import { useEffect, useState } from "react";
import LocationForm from "./components/LocationForm";
import LocationList from "./components/LocationList";
import Map from "./components/Map";
import axios from "axios";

function App() {
  const [locations, setLocations] = useState([]);

  // Konumları API'den çek
  const fetchLocations = () => {
    axios
      .get("http://localhost:8000/api/locations")
      .then((response) => setLocations(response.data))
      .catch((error) => console.error("Veri çekme hatası:", error));
  };

  useEffect(() => {
    fetchLocations();
  }, []);


  // **Eklemeişlemi**
  const handleAdd = async (newLocation) => {
    try {
      const response = await axios.post("http://localhost:8000/api/locations", newLocation);

      // UI'de anında güncelleme
      setLocations((prevLocations) => [...prevLocations, response.data]);
      // API'den tekrar veri çekerek güncel listeyi al
      fetchLocations();
    } catch (error) {
      console.error("Ekleme hatası:", error);
    }
  };


  // **Silme işlemi**
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/locations/${id}`);
      fetchLocations(); // Güncellenmiş veriyi çek
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  // **Güncelleme işlemi**
 const handleEdit = async (updatedLocation) => {
  try {
    // Önce UI'de hemen değişikliği göster
    setLocations((prevLocations) =>
      prevLocations.map((loc) =>
        loc.id === updatedLocation.id ? updatedLocation : loc
      )
    );

    // API'ye PUT isteği gönder
    await axios.put(
      `http://localhost:8000/api/locations/${updatedLocation.id}`,
      updatedLocation
    );

    // API'den en güncel verileri tekrar al
    fetchLocations();
  } catch (error) {
    console.error("Güncelleme hatası:", error);
  }
};


  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-2">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <Map locations={locations} />
      </div>
  
      <div className="flex flex-col gap-4">
        <LocationForm onAdd={handleAdd} />
        <LocationList locations={locations} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  </div>
  
  );
}

export default App;
