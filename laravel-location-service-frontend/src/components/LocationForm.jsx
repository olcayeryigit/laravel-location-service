import { useState } from "react";

const LocationForm = ({ onAdd }) => {
  const [locationData, setLocationData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    marker_color: "#ff0000",
  });

  const handleChange = (e) => {
    setLocationData({ ...locationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!locationData.name || !locationData.latitude || !locationData.longitude) {
      alert("Please fill in all fields.");
      return;
    }

    onAdd(locationData);
    setLocationData({ name: "", latitude: "", longitude: "", marker_color: "#ff0000" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-gray-800 shadow-lg rounded-xl w-full mx-auto">
      {/* Name & Color */}
      <div className="flex gap-3">
        <input
          type="text"
          name="name"
          value={locationData.name}
          onChange={handleChange}
          placeholder="Location Name"
          className="flex-1 p-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Color:</span>
          <input
            type="color"
            name="marker_color"
            value={locationData.marker_color}
            onChange={handleChange}
            className="w-10 h-10 cursor-pointer"
          />
        </div>
      </div>

      {/* Latitude & Longitude */}
      <div className="flex gap-3">
        <input
          type="number"
          name="latitude"
          value={locationData.latitude}
          onChange={handleChange}
          placeholder="Latitude"
          className="flex-1 p-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="number"
          name="longitude"
          value={locationData.longitude}
          onChange={handleChange}
          placeholder="Longitude"
          className="flex-1 p-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full p-2 bg-indigo-800 text-white rounded-lg shadow-md hover:bg-indigo-600 transition"
      >
        Save
      </button>
    </form>
  );
};

export default LocationForm;
