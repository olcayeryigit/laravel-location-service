import LocationForm from "./components/LocationForm";
import LocationList from "./components/LocationList/LocationList";
import Map from "./components/Map/Map";
import useLocations from "./hooks/useLocations";

function App() {
  const { locations, handleAdd, handleDelete, handleEdit } = useLocations();

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
