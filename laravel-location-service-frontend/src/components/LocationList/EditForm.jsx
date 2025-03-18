import { useState, useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { SketchPicker } from "react-color";

const EditForm = ({ editLocation, onChange, onSubmit, onCancel }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (color) => {
    onChange({ target: { name: "marker_color", value: color.hex } });
    // Picker artık kapanmayacak!
  };

  // Dışarı tıklanınca picker'ı kapatma
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".color-picker-container")) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <form
      onSubmit={onSubmit}
      className="mt-4 bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 max-w-md mx-auto space-y-3"
    >
      <h3 className="text-lg font-medium text-center text-green-400">Edit Location</h3>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center gap-2">
          {/* Konum Adı */}
          <input
            type="text"
            name="name"
            value={editLocation.name}
            onChange={onChange}
            className="w-full p-2 bg-gray-700 text-white border-none focus:ring-2 focus:ring-green-500 rounded-lg text-sm"
            placeholder="Location Name"
            required
          />
          {/* Renk Seçici Kutusu */}
          <div className="flex flex-col items-center relative color-picker-container">
            <div
              className="w-10 h-10 rounded-md border-2 border-gray-300 cursor-pointer shadow-md"
              style={{ backgroundColor: editLocation.marker_color }}
              onClick={() => setShowPicker(!showPicker)}
            />
            {showPicker && (
              <div className="absolute top-8 right-0 z-50">
                <SketchPicker color={editLocation.marker_color} onChange={handleColorChange} />
              </div>
            )}
          </div>
        </div>

        {/* Latitude ve Longitude */}
        <div className="flex items-center justify-between">
          <input
            type="number"
            name="latitude"
            value={editLocation.latitude}
            onChange={onChange}
            className="w-[48%] p-2 bg-gray-700 text-white border-none focus:ring-2 focus:ring-green-500 rounded-lg text-sm"
            placeholder="Latitude"
            step="any"
            required
          />
          <input
            type="number"
            name="longitude"
            value={editLocation.longitude}
            onChange={onChange}
            className="w-[48%] p-2 bg-gray-700 text-white border-none focus:ring-2 focus:ring-green-500 rounded-lg text-sm"
            placeholder="Longitude"
            step="any"
            required
          />
        </div>
      </div>

      {/* Butonlar */}
      <div className="flex justify-end gap-2 mt-3 text-sm">
        <button
          type="button"
          onClick={onCancel}
          className="p-2 flex items-center gap-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
        >
          <FaTimes size={16} /> Cancel
        </button>
        <button
          type="submit"
          className="p-2 flex items-center gap-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition"
        >
          <FaSave size={16} /> Save
        </button>
      </div>
    </form>
  );
};

export default EditForm;
