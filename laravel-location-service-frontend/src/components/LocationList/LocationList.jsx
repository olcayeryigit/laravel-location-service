import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import LocationItem from "./LocationItem";
import EditForm from "./EditForm";

const LocationList = ({ locations, onDelete, onEdit }) => {
  const [editLocation, setEditLocation] = useState(null);

  const handleEditClick = (location) => {
    setEditLocation(location.id === editLocation?.id ? null : location);
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

  return (
    <div className="p-2 bg-gray-800 shadow-lg rounded-2xl w-full max-w-lg mx-auto space-y-4 border border-gray-700">
      <h2 className="text-xl font-semibold mb-5 text-center flex items-center justify-center text-white">
        <FaMapMarkerAlt className="mr-2" /> Location List
      </h2>
      <ul className="space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 px-2">
        {locations.map((location) => (
          <div key={location.id}>
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
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
