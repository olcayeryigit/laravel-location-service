import LocationForm from "./components/LocationForm";
import LocationList from "./components/LocationList/LocationList";
import Map from "./components/Map/Map";
import useLocations from "./hooks/useLocations";

function App() {
  const { locations, handleAdd, handleDelete, handleEdit, loading } = useLocations();

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col items-center p-6">
      {/* Yükleniyor Animasyonu */}
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full max-w-6xl">
          {/* Harita Alanı (Mobilde tam genişlik, büyük ekranda 3 sütun) */}
          <div className="lg:col-span-3">
            <Map locations={locations} />
          </div>

          {/* Form ve Liste Alanı (Mobilde tam genişlik, büyük ekranda 2 sütun) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <LocationForm onAdd={handleAdd} />
            <LocationList locations={locations} onDelete={handleDelete} onEdit={handleEdit} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

