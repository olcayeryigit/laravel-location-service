import { FaEdit, FaTrash } from "react-icons/fa";

const LocationItem = ({ location, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Bu konumu silmek istediğinize emin misiniz?")) {
      onDelete(location.id);
    }
  };

  return (
    <li className="flex justify-between items-center p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition shadow-lg border border-gray-700">
      <div className="flex items-center gap-4">
        {/* Konum rengi göstergesi */}
        <div
          className="w-8 h-8 rounded-full shadow-md border-2 border-gray-600"
          style={{ backgroundColor: location.marker_color }}
        />
        
        {/* Konum Bilgileri */}
        <div>
          <p className="text-lg font-semibold text-white">{location.name}</p>
          <p className="text-sm text-gray-400">
            {location.latitude}, {location.longitude}
          </p>
        </div>
      </div>

      {/* Düzenleme ve Silme Butonları */}
      <div className="flex gap-3">
        <button
          onClick={() => onEdit(location)}
          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-md"
        >
          <FaEdit size={18} />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition shadow-md"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </li>
  );
};

export default LocationItem;

