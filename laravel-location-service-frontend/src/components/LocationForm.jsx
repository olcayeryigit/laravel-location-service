import { useState } from "react";

const LocationForm = ({ onAdd }) => {
  const [locationData, setLocationData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    marker_color: "#ff0000",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, latitude, longitude } = locationData;

    if (!name.trim() || !latitude.trim() || !longitude.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (isNaN(latitude) || isNaN(longitude)) {
      setError("Latitude and Longitude must be valid numbers.");
      return;
    }

    onAdd(locationData);
    setLocationData({ name: "", latitude: "", longitude: "", marker_color: "#ff0000" });
    setError(""); // Hata varsa temizle
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-gray-800 shadow-lg rounded-2xl w-full max-w-lg mx-auto space-y-4 border border-gray-700">
      <h3 className="text-center text-xl font-semibold text-indigo-400">Add New Location</h3>

      {error && <p className="text-red-500 text-sm font-medium text-center bg-red-900 p-2 rounded-lg">{error}</p>}

      {/* Name & Color Picker */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          name="name"
          value={locationData.name}
          onChange={handleChange}
          placeholder="Location Name"
          className="flex-1 p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400"
        />
        <input
          type="color"
          name="marker_color"
          value={locationData.marker_color}
          onChange={handleChange}
          className="w-12 h-12 cursor-pointer border border-gray-600 shadow-md"
        />
      </div>

      {/* Latitude & Longitude */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="latitude"
          value={locationData.latitude}
          onChange={handleChange}
          placeholder="Latitude"
          className="p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400"
        />
        <input
          type="text"
          name="longitude"
          value={locationData.longitude}
          onChange={handleChange}
          placeholder="Longitude"
          className="p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400"
        />
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full p-3 bg-indigo-700 text-white rounded-lg shadow-md hover:bg-indigo-600 transition font-semibold"
      >
        Save Location
      </button>
    </form>
  );
};

export default LocationForm;
