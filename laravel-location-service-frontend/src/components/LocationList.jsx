import { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes, FaMapMarkerAlt } from "react-icons/fa";

const LocationList = ({ locations, onDelete, onEdit }) => {
  const [editLocation, setEditLocation] = useState(null);

  const handleEditClick = (location) => setEditLocation(location);
  const handleEditChange = (e) => {
    setEditLocation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editLocation);
    setEditLocation(null);
  };

  return (
    <div className="bg-gray-900 text-white mx-auto w-full p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-5 text-center flex items-center justify-center text-white">
        <FaMapMarkerAlt className="mr-2" /> Location List
      </h2>

      {/* 📌 Scroll için max yükseklik sınırı ve overflow ekledik */}
      <ul className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 px-2">
      {locations.map((location) => (
          <LocationItem
            key={location.id}
            location={location}
            onEdit={handleEditClick}
            onDelete={onDelete}
          />
        ))}
      </ul>

      {editLocation && (
        <EditForm
          editLocation={editLocation}
          onChange={handleEditChange}
          onSubmit={handleSubmit}
          onCancel={() => setEditLocation(null)}
        />
      )}
    </div>
  );
};

const LocationItem = ({ location, onEdit, onDelete }) => (
  <li className="flex justify-between items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition  ">
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full shadow-md" style={{ backgroundColor: location.marker_color }} />
      <div>
        <p className="text-base font-medium text-white">{location.name}</p>
        <p className="text-xs text-gray-400">{location.latitude}, {location.longitude}</p>
      </div>
    </div>
    <div className="flex gap-2">
      <button onClick={() => onEdit(location)} className="text-blue-400 hover:text-blue-300 transition">
        <FaEdit size={16} />
      </button>
      <button onClick={() => onDelete(location.id)} className="text-red-400 hover:text-red-300 transition">
        <FaTrash size={16} />
      </button>
    </div>
  </li>
);

const EditForm = ({ editLocation, onChange, onSubmit, onCancel }) => (
  <form onSubmit={onSubmit} className="mt-4 bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-green-400 text-center mb-3">✍️ Lokasyon Düzenle</h3>
    <div className="space-y-2">
      <input
        type="text"
        name="name"
        value={editLocation.name}
        onChange={onChange}
        className="w-full p-2 bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 rounded-md"
        placeholder="Konum Adı"
      />
      <input
        type="text"
        name="latitude"
        value={editLocation.latitude}
        onChange={onChange}
        className="w-full p-2 bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 rounded-md"
        placeholder="Enlem"
      />
      <input
        type="text"
        name="longitude"
        value={editLocation.longitude}
        onChange={onChange}
        className="w-full p-2 bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 rounded-md"
        placeholder="Boylam"
      />
    </div>
    <div className="flex justify-end gap-2 mt-3">
      <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-300 transition">
        <FaTimes size={18} />
      </button>
      <button type="submit" className="text-green-400 hover:text-green-300 transition">
        <FaSave size={18} />
      </button>
    </div>
  </form>
);

export default LocationList;
