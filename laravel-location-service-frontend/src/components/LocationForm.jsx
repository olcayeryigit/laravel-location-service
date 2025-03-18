import { useState } from "react";
import { SketchPicker } from "react-color";

const LocationForm = ({ onAdd }) => {
  const [locationData, setLocationData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    marker_color: "#ff0000",
  });

  const [error, setError] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color) => {
    setLocationData((prev) => ({ ...prev, marker_color: color.hex }));
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
    setError(""); 
  };

  return (
    <form className="p-5 bg-gray-800 shadow-lg rounded-2xl w-full max-w-lg mx-auto space-y-3 border border-gray-700" onSubmit={handleSubmit}>
      <h3 className="text-center text-lg font-semibold text-white">Add New Location</h3>

      {error && <p className="text-red-500 text-sm font-medium text-center bg-red-900 p-2 rounded-lg">{error}</p>}

      <div className="flex gap-3 items-center relative">
        <input
          type="text"
          name="name"
          value={locationData.name}
          onChange={handleChange}
          placeholder="Location Name"
          className="flex-1 p-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400 text-sm"
        />
        
        <div className="relative">
          <button
            type="button"
            className="flex items-center  border  bg-gray-800 text-white rounded hover:bg-gray-700 transition-all duration-200"
            onClick={() => setShowPicker(!showPicker)}
          >
            <div
              className="w-9 h-9 rounded  shadow"
              style={{ backgroundColor: locationData.marker_color }}
            />
          </button>

          {showPicker && (
            <div className="absolute z-10 mt-2 right-0 bg-white p-3 rounded-lg shadow-lg">
              <SketchPicker color={locationData.marker_color} onChange={handleColorChange} />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="latitude"
          value={locationData.latitude}
          onChange={handleChange}
          placeholder="Latitude"
          className="p-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400 text-sm"
        />
        <input
          type="text"
          name="longitude"
          value={locationData.longitude}
          onChange={handleChange}
          placeholder="Longitude"
          className="p-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none placeholder-gray-400 text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-indigo-700 text-white rounded-lg shadow-md hover:bg-indigo-600 transition font-semibold text-sm"
      >
        Save Location
      </button>
    </form>
  );
};

export default LocationForm;
