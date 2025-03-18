import { useState, useMemo } from "react";
import { FaLocationDot } from "react-icons/fa6";
import LocationItem from "./LocationItem";
import EditForm from "./EditForm";

const LocationList = ({ locations, onDelete, onEdit }) => {
  const [editLocation, setEditLocation] = useState(null);

  const handleEditClick = (location) => {
    setEditLocation(editLocation?.id === location.id ? null : location);
  };

  const handleChange = (e) => {
    setEditLocation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editLocation.name.trim()) return;
    onEdit(editLocation);
    setEditLocation(null);
  };

  // Locations listesini optimize etmek için useMemo kullanımı
  const memoizedLocations = useMemo(() => {
    return locations.map((location) => (
      <div key={location.id} className="transition-all">
        <LocationItem location={location} onEdit={handleEditClick} onDelete={onDelete} />
        {editLocation?.id === location.id && (
          <EditForm
            editLocation={editLocation}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => setEditLocation(null)}
          />
        )}
      </div>
    ));
  }, [locations, editLocation]); // Sadece locations veya editLocation değiştiğinde yeniden hesaplanır.

  return (
    <div className="p-4 bg-gray-900 shadow-lg rounded-2xl w-full max-w-md mx-auto border border-gray-700">
      {/* Başlık */}
      <h2 className="text-lg font-semibold text-white flex items-center justify-center gap-2 mb-4">
        <FaLocationDot className="text-white text-xl" /> Location List
      </h2>

      {/* Konum Listesi */}
      <ul className="space-y-3">{memoizedLocations}</ul>
    </div>
  );
};

export default LocationList;
